import { CommunityComment, ItemEngagementStats, VoteDirection, UserProfile } from '../types';

const STORAGE_KEY_STATS = 'ddon_community_engagement_stats';
const STORAGE_KEY_USER_VOTES = 'ddon_community_user_votes';
const STORAGE_KEY_COMMENTS = 'ddon_community_item_comments';

// Seeded initial stats for quests, presets, and guides
const SEED_STATS: Record<string, Partial<ItemEngagementStats>> = {
  // Presets
  'starter_sprint_1_15': { upvotes: 142, downvotes: 4, timesPlanned: 389, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45 },
  'misriu_dread_ape_loop_15_30': { upvotes: 218, downvotes: 7, timesPlanned: 612, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 40 },
  'volden_miner_sweep_30_45': { upvotes: 189, downvotes: 6, timesPlanned: 520, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 35 },
  'north_bettland_chimera_45_60': { upvotes: 165, downvotes: 9, timesPlanned: 440, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30 },
  'bloodbane_gorgon_expedition_60_75': { upvotes: 274, downvotes: 5, timesPlanned: 780, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 25 },
  'feryana_warg_ruins_75_85': { upvotes: 198, downvotes: 8, timesPlanned: 495, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20 },
  'megado_enforcer_blitz_85_93': { upvotes: 312, downvotes: 11, timesPlanned: 920, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15 },

  // Guides
  'guide-general-fighter-endgame-build': { upvotes: 184, downvotes: 3, timesPlanned: 0, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 28 },
  'guide-rising-server-rules': { upvotes: 256, downvotes: 2, timesPlanned: 0, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 50 },
  'guide-bbm-black-knight-tactics': { upvotes: 147, downvotes: 5, timesPlanned: 0, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 22 },
  'guide-spirit-lancer-support': { upvotes: 129, downvotes: 4, timesPlanned: 0, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18 },
  'guide-alchemist-elemental-infusion': { upvotes: 163, downvotes: 6, timesPlanned: 0, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14 },
  'guide-speedrun-routes-1-93': { upvotes: 289, downvotes: 8, timesPlanned: 0, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10 },

  // Core Quests
  'q_misriu_ape_01': { upvotes: 98, downvotes: 2, timesPlanned: 340, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 35 },
  'q_tel_goblins_01': { upvotes: 76, downvotes: 1, timesPlanned: 260, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 40 },
  'q_volden_miners_01': { upvotes: 112, downvotes: 4, timesPlanned: 390, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30 },
  'q_megado_enforcers_01': { upvotes: 145, downvotes: 5, timesPlanned: 510, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18 },
  'q_bloodbane_gorgon_01': { upvotes: 130, downvotes: 3, timesPlanned: 420, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 25 },
};

// Seeded Initial Comments
const SEED_COMMENTS: CommunityComment[] = [
  {
    id: 'comm-1',
    itemId: 'starter_sprint_1_15',
    itemType: 'preset',
    authorName: 'Dr. Aven',
    authorClan: 'DDO',
    authorRole: 'moderator',
    avatarIcon: 'shield',
    avatarColor: 'cyan',
    content: 'Perfect sprint for brand new characters. Be sure to keep the 50% XP ring equipped from level 1!',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    upvotes: 24,
  },
  {
    id: 'comm-2',
    itemId: 'megado_enforcer_blitz_85_93',
    itemType: 'preset',
    authorName: 'Yukinari Flixia (Otake7)',
    authorClan: 'SUP',
    authorRole: 'owner',
    avatarIcon: 'flame',
    avatarColor: 'amber',
    content: 'The most efficient board loop in Season 3.4. Pairing a Sorcerer pawn with High Scepter clears the guards in under 45 seconds.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
    upvotes: 38,
  },
  {
    id: 'comm-3',
    itemId: 'guide-general-fighter-endgame-build',
    itemType: 'guide',
    authorName: 'Ser Daniel',
    authorClan: 'LestaniaGuard',
    authorRole: 'user',
    avatarIcon: 'swords',
    avatarColor: 'emerald',
    content: 'Pierce Slash climbing on Season 3 bosses is unbelievable with Furious Grip & Great Grasp! Awesome guide.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    upvotes: 19,
  },
  {
    id: 'comm-4',
    itemId: 'guide-rising-server-rules',
    itemType: 'guide',
    authorName: 'Otake7',
    authorClan: 'SUP',
    authorRole: 'owner',
    avatarIcon: 'flame',
    avatarColor: 'amber',
    content: 'Remember the 21-level pawn level threshold rule when building party compositions on Rising server!',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
    upvotes: 42,
  },
  {
    id: 'comm-5',
    itemId: 'bloodbane_gorgon_expedition_60_75',
    itemType: 'preset',
    authorName: 'Kallisto',
    authorClan: 'Aegis',
    authorRole: 'user',
    avatarIcon: 'wand',
    avatarColor: 'purple',
    content: 'Bring Petrification resistance crests or limit breaks before entering Bloodbane ruins.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    upvotes: 14,
  }
];

// Helper to get stats map from localStorage
export function getStatsMap(): Record<string, ItemEngagementStats> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    const custom = raw ? JSON.parse(raw) : {};
    const result: Record<string, ItemEngagementStats> = {};

    // Combine seeds with stored overrides
    Object.keys(SEED_STATS).forEach((id) => {
      const seed = SEED_STATS[id];
      result[id] = {
        upvotes: seed.upvotes || 0,
        downvotes: seed.downvotes || 0,
        score: (seed.upvotes || 0) - (seed.downvotes || 0),
        timesPlanned: seed.timesPlanned || 0,
        commentsCount: 0,
        createdAt: seed.createdAt || Date.now(),
        ...(custom[id] || {})
      };
    });

    Object.keys(custom).forEach((id) => {
      if (!result[id]) {
        result[id] = {
          upvotes: custom[id].upvotes || 0,
          downvotes: custom[id].downvotes || 0,
          score: (custom[id].upvotes || 0) - (custom[id].downvotes || 0),
          timesPlanned: custom[id].timesPlanned || 0,
          commentsCount: custom[id].commentsCount || 0,
          createdAt: custom[id].createdAt || Date.now(),
          ...custom[id]
        };
      }
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
      localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(SEED_COMMENTS));
      return SEED_COMMENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_COMMENTS;
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
      score: stats.upvotes - stats.downvotes,
      commentsCount,
      createdAt: stats.createdAt || defaultCreatedAt || Date.now()
    };
  }

  // Hash-based deterministic baseline for unseeded quests so numbers look realistic and varied
  let hash = 0;
  for (let i = 0; i < itemId.length; i++) {
    hash = (hash << 5) - hash + itemId.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);
  const baseUpvotes = (posHash % 45) + 12;
  const baseDownvotes = (posHash % 4);
  const basePlanned = (posHash % 120) + 30;

  return {
    upvotes: baseUpvotes,
    downvotes: baseDownvotes,
    score: baseUpvotes - baseDownvotes,
    timesPlanned: basePlanned,
    commentsCount,
    createdAt: defaultCreatedAt || (Date.now() - (posHash % (1000 * 60 * 60 * 24 * 30)))
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
