import { CommunityComment, ItemEngagementStats, VoteDirection, UserProfile } from '../types';

const STORAGE_KEY_STATS = 'ddon_community_engagement_stats_v2';
const STORAGE_KEY_USER_VOTES = 'ddon_community_user_votes_v2';
const STORAGE_KEY_COMMENTS = 'ddon_community_item_comments_v2';
const STORAGE_KEY_COMMENT_VOTES = 'ddon_community_comment_votes_v2';

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

// Helper to get user item votes map: { [itemId]: 'up' | 'down' }
export function getUserVotesMap(): Record<string, VoteDirection> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_VOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Helper to get user comment votes map: { [commentId]: 'up' | 'down' }
export function getUserCommentVotesMap(): Record<string, VoteDirection> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMMENT_VOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Helper to get all comments from cache
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

// Save comments to local cache
export function setCachedComments(comments: CommunityComment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(comments));
  } catch (e) {
    // Ignore storage quota errors
  }
}

// Fetch comments from remote API (authoritative server sync)
export async function fetchRemoteComments(itemId?: string): Promise<CommunityComment[]> {
  try {
    const url = itemId ? `/api/comments?itemId=${encodeURIComponent(itemId)}` : '/api/comments';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch comments failed (${res.status})`);
    const data: CommunityComment[] = await res.json();
    if (Array.isArray(data)) {
      const cached = getAllComments();
      if (itemId) {
        // Authoritative replacement for this item: remove stale local comments for this item and apply server list
        const otherItemsComments = cached.filter(c => c.itemId !== itemId);
        const updated = [...otherItemsComments, ...data];
        setCachedComments(updated);
      } else {
        // Authoritative replacement for all comments
        setCachedComments(data);
      }
      return data;
    }
    return [];
  } catch (e) {
    console.warn('[Fetch Comments Warning]', e);
    const cached = getAllComments();
    return itemId ? cached.filter(c => c.itemId === itemId) : cached;
  }
}

// Get stats for a specific item
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

// Add a comment or reply to an item
export async function addCommunityComment(
  itemId: string,
  itemType: 'quest' | 'preset' | 'farm_spot' | 'guide' | 'feedback',
  content: string,
  parentId?: string | null,
  parentAuthorName?: string | null,
  user?: UserProfile | null
): Promise<CommunityComment> {
  const allComments = getAllComments();
  const authorName = user?.characterName || user?.username || 'Guest Arisen';
  const authorClan = user?.clanTag || undefined;
  const authorRole = user?.role || (user?.username?.toLowerCase() === 'otake7' ? 'owner' : 'user');
  const avatarIcon = user?.avatarIcon || 'flame';
  const avatarColor = user?.avatarColor || 'amber';

  const newComment: CommunityComment = {
    id: `comm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    itemId,
    parentId: parentId || null,
    parentAuthorName: parentAuthorName || null,
    itemType,
    authorId: user?.id,
    authorName,
    authorClan,
    authorRole,
    avatarIcon,
    avatarColor,
    content: content.trim(),
    createdAt: Date.now(),
    upvotes: 0,
    downvotes: 0
  };

  const updatedComments = [newComment, ...allComments];
  setCachedComments(updatedComments);

  // Sync to remote API
  try {
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    });
  } catch (err) {
    console.warn('[Post Comment API Warning]', err);
  }

  return newComment;
}

// Delete a comment (Reddit-style: preserve hierarchy if replies exist)
export async function deleteCommunityComment(commentId: string): Promise<boolean> {
  const allComments = getAllComments();
  const hasReplies = allComments.some((c) => c.parentId === commentId);

  if (hasReplies) {
    // Soft delete in local cache to keep ladder structure intact
    const updated = allComments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          isDeleted: true,
          content: '[deleted]',
          authorName: '[deleted]',
          authorClan: undefined,
          authorRole: 'user' as const
        };
      }
      return c;
    });
    setCachedComments(updated);
  } else {
    // Hard delete leaf comment
    const filtered = allComments.filter((c) => c.id !== commentId);
    setCachedComments(filtered);
  }

  try {
    await fetch(`/api/comments/${encodeURIComponent(commentId)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('[Delete Comment API Warning]', err);
  }

  return true;
}

// Upvote or Downvote a comment (single vote per user)
export async function voteComment(
  commentId: string,
  direction: VoteDirection,
  voterId: string
): Promise<{ upvotes: number; downvotes: number; userVote: VoteDirection | null }> {
  const commentVotes = getUserCommentVotesMap();
  const prevVote = commentVotes[commentId] || null;
  const allComments = getAllComments();
  const comment = allComments.find((c) => c.id === commentId);

  let curUp = comment ? (comment.upvotes || 0) : 0;
  let curDown = comment ? (comment.downvotes || 0) : 0;
  let nextVote: VoteDirection | null = direction;

  if (prevVote === direction) {
    // Untoggle
    if (direction === 'up') curUp = Math.max(0, curUp - 1);
    else curDown = Math.max(0, curDown - 1);
    delete commentVotes[commentId];
    nextVote = null;
  } else if (prevVote) {
    // Switch
    if (direction === 'up') {
      curUp += 1;
      curDown = Math.max(0, curDown - 1);
    } else {
      curDown += 1;
      curUp = Math.max(0, curUp - 1);
    }
    commentVotes[commentId] = direction;
  } else {
    // Fresh vote
    if (direction === 'up') curUp += 1;
    else curDown += 1;
    commentVotes[commentId] = direction;
  }

  if (comment) {
    comment.upvotes = curUp;
    comment.downvotes = curDown;
    setCachedComments(allComments);
  }

  try {
    localStorage.setItem(STORAGE_KEY_COMMENT_VOTES, JSON.stringify(commentVotes));
  } catch (e) {
    // ignore
  }

  // Sync to remote API
  try {
    const res = await fetch(`/api/comments/${encodeURIComponent(commentId)}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction, voterId })
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.upvotes === 'number') curUp = data.upvotes;
      if (typeof data.downvotes === 'number') curDown = data.downvotes;
      if (data.userVote !== undefined) nextVote = data.userVote;
      if (comment) {
        comment.upvotes = curUp;
        comment.downvotes = curDown;
        setCachedComments(allComments);
      }
    }
  } catch (e) {
    console.warn('[Vote Comment API Warning]', e);
  }

  return { upvotes: curUp, downvotes: curDown, userVote: nextVote };
}
