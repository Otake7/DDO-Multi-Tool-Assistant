import { CommunityComment, ItemEngagementStats, VoteDirection, UserProfile } from '../types';

const STORAGE_KEY_STATS = 'ddon_community_engagement_stats_v2';
const STORAGE_KEY_USER_VOTES = 'ddon_community_user_votes_v2';
const STORAGE_KEY_COMMENTS = 'ddon_community_item_comments_v2';

// Clean initial stats - starts strictly at 0 for genuine user engagement
const SEED_STATS: Record<string, Partial<ItemEngagementStats>> = {};

// Clean initial comments - starts empty for genuine user comments
const SEED_COMMENTS: CommunityComment[] = [];

// Helper to get stats map from localStorage
export function getStatsMap(): Record<string, ItemEngagementStats> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    const custom = raw ? JSON.parse(raw) : {};
    const result: Record<string, ItemEngagementStats> = {};

    Object.keys(custom).forEach((id) => {
      result[id] = {
        upvotes: custom[id].upvotes || 0,
        downvotes: custom[id].downvotes || 0,
        score: (custom[id].upvotes || 0) - (custom[id].downvotes || 0),
        timesPlanned: custom[id].timesPlanned || 0,
        commentsCount: custom[id].commentsCount || 0,
        createdAt: custom[id].createdAt || Date.now(),
        ...custom[id]
      };
    });

    return result;
  } catch (e) {
    return {};
  }
}

// Helper to get user votes map: { [itemId]: 'up' | 'down' }
export function getUserVotesMap(): Record<string, VoteDirection> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_VOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Helper to get all comments
export function getAllComments(): CommunityComment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMMENTS);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Get stats for a specific item - defaults purely to 0
export function getItemEngagementStats(itemId: string, defaultCreatedAt?: number): ItemEngagementStats {
  const map = getStatsMap();
  const allComments = getAllComments();
  const commentsCount = allComments.filter((c) => c.itemId === itemId).length;

  if (map[itemId]) {
    const stats = map[itemId];
    return {
      ...stats,
      score: (stats.upvotes || 0) - (stats.downvotes || 0),
      commentsCount,
      createdAt: stats.createdAt || defaultCreatedAt || Date.now()
    };
  }

  return {
    upvotes: 0,
    downvotes: 0,
    score: 0,
    timesPlanned: 0,
    commentsCount,
    createdAt: defaultCreatedAt || Date.now()
  };
}

// Upvote or Downvote an item
export function voteItem(
  itemId: string,
  direction: VoteDirection,
  userId?: string
): { stats: ItemEngagementStats; userVote: VoteDirection | null } {
  const userVotes = getUserVotesMap();
  const currentVote = userVotes[itemId] || null;
  const statsMap = getStatsMap();
  const currentStats = getItemEngagementStats(itemId);

  let newUp = currentStats.upvotes;
  let newDown = currentStats.downvotes;
  let nextUserVote: VoteDirection | null = direction;

  if (currentVote === direction) {
    // Undo existing vote
    if (direction === 'up') newUp = Math.max(0, newUp - 1);
    if (direction === 'down') newDown = Math.max(0, newDown - 1);
    delete userVotes[itemId];
    nextUserVote = null;
  } else {
    // If switching from up to down or vice versa
    if (currentVote === 'up') newUp = Math.max(0, newUp - 1);
    if (currentVote === 'down') newDown = Math.max(0, newDown - 1);

    if (direction === 'up') newUp += 1;
    if (direction === 'down') newDown += 1;

    userVotes[itemId] = direction;
  }

  const updatedStats: ItemEngagementStats = {
    ...currentStats,
    upvotes: newUp,
    downvotes: newDown,
    score: newUp - newDown,
  };

  statsMap[itemId] = updatedStats;
  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(statsMap));
  localStorage.setItem(STORAGE_KEY_USER_VOTES, JSON.stringify(userVotes));

  return { stats: updatedStats, userVote: nextUserVote };
}

// Track when a quest or preset is added to the Quest Planner ("Most Used" filter tracking)
export function incrementTimesPlanned(itemId: string): number {
  const statsMap = getStatsMap();
  const currentStats = getItemEngagementStats(itemId);
  const nextPlanned = (currentStats.timesPlanned || 0) + 1;

  statsMap[itemId] = {
    ...currentStats,
    timesPlanned: nextPlanned
  };

  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(statsMap));
  return nextPlanned;
}

// Add a comment to an item
export function addCommunityComment(
  itemId: string,
  itemType: 'quest' | 'preset' | 'farm_spot' | 'guide',
  content: string,
  user?: UserProfile | null
): CommunityComment {
  const allComments = getAllComments();
  const authorName = user?.characterName || user?.username || 'Guest Arisen';
  const authorClan = user?.clanTag || undefined;
  const authorRole = user?.role || (user?.username?.toLowerCase() === 'otake7' ? 'owner' : 'user');
  const avatarIcon = user?.avatarIcon || 'flame';
  const avatarColor = user?.avatarColor || 'amber';

  const newComment: CommunityComment = {
    id: `comm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    itemId,
    itemType,
    authorId: user?.id,
    authorName,
    authorClan,
    authorRole,
    avatarIcon,
    avatarColor,
    content: content.trim(),
    createdAt: Date.now(),
    upvotes: 1
  };

  const updatedComments = [newComment, ...allComments];
  localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(updatedComments));

  return newComment;
}

// Delete a comment
export function deleteCommunityComment(commentId: string): boolean {
  const allComments = getAllComments();
  const filtered = allComments.filter((c) => c.id !== commentId);
  localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(filtered));
  return true;
}

// Upvote a comment
export function upvoteComment(commentId: string): number {
  const allComments = getAllComments();
  const comment = allComments.find((c) => c.id === commentId);
  if (!comment) return 0;

  comment.upvotes = (comment.upvotes || 0) + 1;
  localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(allComments));
  return comment.upvotes;
}
