import { GameVersion, GameVersionInfo, LevelData } from '../types';

/**
 * Dragon's Dogma Online / Dogma Rising Version Metadata & Cap definitions
 */
export const GAME_VERSIONS: GameVersionInfo[] = [
  {
    version: '3.1',
    label: 'v3.1',
    name: 'Season 3.1: Megado Mainland & Acker Entry',
    maxLevel: 85,
    ringMaxLevel: 85,
    description: 'First chapter of the Season 3 continent. White Dragon warriors journey to Megado.',
    unlockedFeatures: ['Level Cap 85', 'Megado Mainland Area', 'Acker Island Outskirts', 'Tier 85 Gear Crafting']
  },
  {
    version: '3.2',
    label: 'v3.2',
    name: 'Season 3.2: High Scepter & Beast Realm',
    maxLevel: 88,
    ringMaxLevel: 88,
    description: 'Introduces the High Scepter (Magick Sword) hybrid vocation and deeper beast dungeons.',
    unlockedFeatures: ['Level Cap 88', 'High Scepter Vocation Unlocked', 'Megado Castle Depths', 'Beast Anomaly Quests']
  },
  {
    version: '3.3',
    label: 'v3.3',
    name: 'Season 3.3: Dark Continent & Leste Territory',
    maxLevel: 90,
    ringMaxLevel: 90,
    description: 'Expands into Leste territory with advanced EX skill passages and extreme raids.',
    unlockedFeatures: ['Level Cap 90', 'Leste Mainland Access', 'EX Custom Skills Tier 2', 'Rank 10 Job Trials']
  },
  {
    version: '3.4',
    label: 'v3.4 (Default)',
    name: 'Season 3.4: Finis & Dragon Climax (Dogma Rising Standard)',
    maxLevel: 93,
    ringMaxLevel: 90,
    description: 'Official Capcom finale & Dogma Rising Private Server baseline with Finis & Lv 93 endgame.',
    unlockedFeatures: ['Level Cap 93', 'Finis Realm & Dragon Climax', '50% XP Ring Active Lv 1–89', 'Endgame Crest Farming']
  },
  {
    version: '95',
    label: 'v3.4+ (Lv 95)',
    name: 'Dogma Rising Extended: Level 95 Cap',
    maxLevel: 95,
    ringMaxLevel: 90,
    description: 'Custom server progression milestone extending the level boundary to Lv 95.',
    unlockedFeatures: ['Level Cap 95', 'Enhanced Stat Thresholds', '50% XP Ring Active Lv 1–89', 'Heroic Boss Challenge']
  },
  {
    version: '100',
    label: 'v3.4+ (Lv 100)',
    name: 'Dogma Rising Extended: Level 100 Max Cap',
    maxLevel: 100,
    ringMaxLevel: 90,
    description: 'Ultimate private server power-leveling ceiling up to Level 100 Master Arisen.',
    unlockedFeatures: ['Level Cap 100', 'Maximum Master Arisen Stats', 'Extended Sphere Grid', 'Peak Endgame Tier']
  },
  {
    version: '120',
    label: 'v3.4+ (Lv 120)',
    name: 'Dogma Rising Extended: Level 120 Cap',
    maxLevel: 120,
    ringMaxLevel: 90,
    description: 'Ultimate extended level ceiling up to Level 120 Master Arisen.',
    unlockedFeatures: ['Level Cap 120', 'Ultimate Master Arisen Stats', 'Extended Sphere Grid & Endgame Raids', 'Peak Paragon Tier']
  }
];

export const DEFAULT_VERSION: GameVersion = '3.4';
export const STANDARD_MAX_LEVEL = 93;
export const ABSOLUTE_MAX_LEVEL = 120;
export const XP_RING_CAP_LEVEL = 90; // XP ring boosts from Lv 1 to 89 (stops at Lv 90)
export const JP_GAIN_MAX_LEVEL = 70; // In DDON, JP gain from leveling up ends at Level 70!

/**
 * Dragon's Dogma Online / Dogma Rising Level XP Table (Levels 1 to 120)
 */
export const BASE_LEVEL_XP: { [lvl: number]: number } = {
  1: 300,
  2: 500,
  3: 800,
  4: 1200,
  5: 1700,
  6: 2300,
  7: 3000,
  8: 3800,
  9: 4700,
  10: 5700,
  11: 6800,
  12: 8000,
  13: 9300,
  14: 10700,
  15: 12200,
  16: 13800,
  17: 15500,
  18: 17300,
  19: 19200,
  20: 21200,
  21: 23300,
  22: 25500,
  23: 27800,
  24: 30200,
  25: 32700,
  26: 35300,
  27: 38000,
  28: 40800,
  29: 43700,
  30: 46700,
  31: 49800,
  32: 53000,
  33: 56300,
  34: 59700,
  35: 63200,
  36: 66800,
  37: 70500,
  38: 74300,
  39: 78200,
  40: 152500,
  41: 187100,
  42: 210000,
  43: 235300,
  44: 263200,
  45: 267700,
  46: 272300,
  47: 277000,
  48: 281800,
  49: 286700,
  50: 291700,
  51: 296800,
  52: 302000,
  53: 307300,
  54: 312700,
  55: 318200,
  56: 323800,
  57: 329500,
  58: 335300,
  59: 341200,
  60: 756600,
  61: 762700,
  62: 768900,
  63: 775200,
  64: 781600,
  65: 788100,
  66: 985000,
  67: 1085000,
  68: 1185000,
  69: 1335000,
  70: 1535000,
  71: 1735000,
  72: 1935000,
  73: 2185000,
  74: 2435000,
  75: 2735000,
  76: 3035000,
  77: 3335000,
  78: 3685000,
  79: 4035000,
  80: 4200000,
  81: 4200000,
  82: 4200000,
  83: 4200000,
  84: 4200000,
  85: 4200000,
  86: 4200000,
  87: 4200000,
  88: 4200000,
  89: 4200000,
  90: 4200000,
  91: 4200000,
  92: 4200000,
  93: 4200000,
  94: 4200000,
  95: 4200000,
  96: 4200000,
  97: 4200000,
  98: 4200000,
  99: 4200000,
  100: 4461000,
  101: 5000000,
  102: 5000000,
  103: 5000000,
  104: 5000000,
  105: 5000000,
  106: 5000000,
  107: 5000000,
  108: 5000000,
  109: 5000000,
  110: 5000000,
  111: 5000000,
  112: 5000000,
  113: 5000000,
  114: 5000000,
  115: 5000000,
  116: 5000000,
  117: 5000000,
  118: 5000000,
  119: 5000000,
  120: 0 // Ultimate Level 120 Cap
};

/**
 * Job Points (JP) Gained on Each Level Up (Levels 1 to 70).
 * IMPORTANT: In Dragon's Dogma Online / Dogma Rising, Leveling JP gain ENDS at Level 70 (Total: 722,000 JP).
 */
export const BASE_LEVEL_JP: { [lvl: number]: number } = {
  1: 0,
  2: 200,
  3: 200,
  4: 300,
  5: 300,
  6: 400,
  7: 400,
  8: 500,
  9: 600,
  10: 700,
  11: 700,
  12: 800,
  13: 1000,
  14: 1200,
  15: 1400,
  16: 1600,
  17: 1800,
  18: 2000,
  19: 2300,
  20: 2600,
  21: 2900,
  22: 3300,
  23: 3500,
  24: 3800,
  25: 3800,
  26: 4000,
  27: 4000,
  28: 4500,
  29: 4500,
  30: 5000,
  31: 5000,
  32: 5500,
  33: 5800,
  34: 5800,
  35: 6500,
  36: 6500,
  37: 6800,
  38: 6800,
  39: 8000,
  40: 8000,
  41: 9000,
  42: 10000,
  43: 10000,
  44: 10000,
  45: 10000,
  46: 10000,
  47: 10000,
  48: 10000,
  49: 10000,
  50: 10000,
  51: 10000,
  52: 10000,
  53: 10000,
  54: 10000,
  55: 10000,
  56: 10000,
  57: 10000,
  58: 10000,
  59: 10000,
  60: 10000,
  61: 40000,
  62: 40000,
  63: 40000,
  64: 40000,
  65: 40000,
  66: 40000,
  67: 40000,
  68: 40000,
  69: 40000,
  70: 40000
  // Levels 71 to 100: 0 JP (JP gain from leveling ends at Level 70)
};

/**
 * Detailed Rank-by-Rank Job Points (JP) Costs for Custom Skills (Rank 1 to 10)
 */
export interface RankJpCostInfo {
  rank: number;
  jpCost: number;
  cumulativeJp: number;
  requirement: string;
  isTrialRequired: boolean;
}

export const CUSTOM_SKILL_JP_COSTS: RankJpCostInfo[] = [
  { rank: 1, jpCost: 0, cumulativeJp: 0, requirement: 'Skill Level Unlock', isTrialRequired: false },
  { rank: 2, jpCost: 100, cumulativeJp: 100, requirement: 'Job Master', isTrialRequired: false },
  { rank: 3, jpCost: 250, cumulativeJp: 350, requirement: 'Job Master', isTrialRequired: false },
  { rank: 4, jpCost: 450, cumulativeJp: 800, requirement: 'Job Master', isTrialRequired: false },
  { rank: 5, jpCost: 750, cumulativeJp: 1550, requirement: 'Job Master', isTrialRequired: false },
  { rank: 6, jpCost: 1200, cumulativeJp: 2750, requirement: 'Job Training Trial (Rank 6)', isTrialRequired: true },
  { rank: 7, jpCost: 1800, cumulativeJp: 4550, requirement: 'Job Training Trial (Rank 7)', isTrialRequired: true },
  { rank: 8, jpCost: 2600, cumulativeJp: 7150, requirement: 'Job Training Trial (Rank 8)', isTrialRequired: true },
  { rank: 9, jpCost: 3600, cumulativeJp: 10750, requirement: 'Job Training Trial (Rank 9)', isTrialRequired: true },
  { rank: 10, jpCost: 5000, cumulativeJp: 15750, requirement: 'Job Training Trial (Rank 10)', isTrialRequired: true }
];

/**
 * Detailed Rank-by-Rank Job Points (JP) Costs for Normal Skills (Rank 1 to 6)
 */
export const NORMAL_SKILL_JP_COSTS: RankJpCostInfo[] = [
  { rank: 1, jpCost: 0, cumulativeJp: 0, requirement: 'Skill Level Unlock', isTrialRequired: false },
  { rank: 2, jpCost: 100, cumulativeJp: 100, requirement: 'Job Master', isTrialRequired: false },
  { rank: 3, jpCost: 200, cumulativeJp: 300, requirement: 'Job Master', isTrialRequired: false },
  { rank: 4, jpCost: 350, cumulativeJp: 650, requirement: 'Job Master', isTrialRequired: false },
  { rank: 5, jpCost: 550, cumulativeJp: 1200, requirement: 'Job Master', isTrialRequired: false },
  { rank: 6, jpCost: 800, cumulativeJp: 2000, requirement: 'Job Master', isTrialRequired: false }
];

/**
 * Detailed Rank-by-Rank Job Points (JP) Costs for Augments (Rank 1 to 10)
 * Note: In DDON, Rank 5 and Rank 6 of Augments (Abilities) require Job Training Trials (ジョブ修練).
 */
export const AUGMENT_JP_COSTS: RankJpCostInfo[] = [
  { rank: 1, jpCost: 0, cumulativeJp: 0, requirement: 'Character Level Unlock', isTrialRequired: false },
  { rank: 2, jpCost: 150, cumulativeJp: 150, requirement: 'Job Master', isTrialRequired: false },
  { rank: 3, jpCost: 300, cumulativeJp: 450, requirement: 'Job Master', isTrialRequired: false },
  { rank: 4, jpCost: 550, cumulativeJp: 1000, requirement: 'Job Master', isTrialRequired: false },
  { rank: 5, jpCost: 900, cumulativeJp: 1900, requirement: 'Job Training Trial (Rank 5 Trial Required)', isTrialRequired: true },
  { rank: 6, jpCost: 1400, cumulativeJp: 3300, requirement: 'Job Training Trial (Rank 6 Trial Required)', isTrialRequired: true },
  { rank: 7, jpCost: 2100, cumulativeJp: 5400, requirement: 'Job Training Trial (Rank 7)', isTrialRequired: true },
  { rank: 8, jpCost: 3000, cumulativeJp: 8400, requirement: 'Job Training Trial (Rank 8)', isTrialRequired: true },
  { rank: 9, jpCost: 4200, cumulativeJp: 12600, requirement: 'Job Training Trial (Rank 9)', isTrialRequired: true },
  { rank: 10, jpCost: 5800, cumulativeJp: 18400, requirement: 'Job Training Trial (Rank 10)', isTrialRequired: true }
];

/**
 * Calculates the required vocation level for a custom skill rank.
 * Rank 1 is unlocked at unlockLevel; subsequent ranks require advancing vocation levels.
 */
export function getCustomSkillRankRequiredLevel(unlockLevel: number, rank: number, customReqs?: number[]): number {
  if (customReqs && customReqs.length >= rank && customReqs[rank - 1] > 0) {
    return customReqs[rank - 1];
  }
  if (rank <= 1) return unlockLevel;
  return Math.min(100, unlockLevel + (rank - 1));
}

/**
 * Normal skills require specific vocation level milestones for each rank.
 */
export function getNormalSkillRankRequiredLevel(rank: number): number {
  switch (rank) {
    case 1: return 1;
    case 2: return 6;
    case 3: return 12;
    case 4: return 18;
    case 5: return 25;
    case 6: return 30;
    default: return 1;
  }
}

/**
 * Calculates the required vocation level for an augment rank.
 * Rank 1 unlocked at unlockLevel; Rank 5 and Rank 6 require Job Training Trials.
 */
export function getAugmentRankRequiredLevel(unlockLevel: number, rank: number, customReqs?: number[]): number {
  if (customReqs && customReqs.length >= rank && customReqs[rank - 1] > 0) {
    return customReqs[rank - 1];
  }
  if (rank <= 1) return unlockLevel;
  return Math.min(100, unlockLevel + (rank - 1));
}

export const FEATURE_MILESTONES: { [lvl: number]: string } = {
  1: 'Game Start / Pawn Creation',
  6: 'Main Pawn Awakening & First Command Quest',
  10: 'Access to Brea Coast & Early Crafting',
  15: 'Area Master Quests & Misriu Forest Access',
  20: 'Second Pawn Slot / Advanced Skills Unlock',
  30: 'Volden Mine & Blood Orb Sphere Grid',
  40: 'Grand Missions / Season 1.0 Milestone',
  45: 'Dow Valley & Season 1.1 Equipment Tier',
  50: 'Deenan Deep Green / Extreme Missions',
  55: 'Season 1.3 Raids & Golden Weapons',
  60: 'Season 2.0 Mergoda / Third Pawn Slot',
  65: 'Zandora Forbidden Territory',
  70: 'Season 2.3 Ancient Raids & Ex Skills (PP Unlocked)',
  75: 'Season 3.0 Megado Mainland Access',
  80: 'Season 3.2 High-Grade Custom Skills',
  85: 'Season 3.1 & 3.3 Acker Territory Dominance',
  88: 'Season 3.2 Level Cap',
  90: 'XP Boost Ring Cap / Season 3.3 Cap / 3.4 Tier',
  93: 'Season 3.4 Official Finale Level Cap',
  95: 'Dogma Rising Custom Extended Lv 95 Milestone',
  100: 'Master Arisen Level 100 Milestone',
  110: 'Paragon Master Level 110 Tier',
  120: 'Ultimate Arisen Level 120 Grand Master Cap'
};

export function getVersionInfo(version: GameVersion): GameVersionInfo {
  return GAME_VERSIONS.find((v) => v.version === version) || GAME_VERSIONS[3]; // default 3.4
}

export function getMaxLevelForVersion(version: GameVersion): number {
  const info = getVersionInfo(version);
  return info.maxLevel;
}

// Build full level data with cumulative XP and cumulative JP pre-computed up to ABSOLUTE_MAX_LEVEL (100)
export const LEVEL_TABLE: LevelData[] = (() => {
  const table: LevelData[] = [];
  let cumulativeXp = 0;
  let cumulativeJp = 0;

  for (let lvl = 1; lvl <= ABSOLUTE_MAX_LEVEL; lvl++) {
    const xpToNext = BASE_LEVEL_XP[lvl] ?? 0;
    const jpGain = lvl <= JP_GAIN_MAX_LEVEL ? (BASE_LEVEL_JP[lvl] ?? 0) : 0;
    cumulativeJp += jpGain;

    table.push({
      level: lvl,
      xpToNext: xpToNext,
      cumulativeXp: cumulativeXp,
      jpGain: jpGain,
      cumulativeJp: cumulativeJp,
      unlockedFeatures: FEATURE_MILESTONES[lvl]
    });
    cumulativeXp += xpToNext;
  }

  return table;
})();

export function getLevelData(level: number, version: GameVersion = '3.4'): LevelData {
  const maxLvl = getMaxLevelForVersion(version);
  const clamped = Math.max(1, Math.min(maxLvl, level));
  return LEVEL_TABLE[clamped - 1];
}

export function getXpRequiredForLevel(level: number, version: GameVersion = '3.4'): number {
  const maxLvl = getMaxLevelForVersion(version);
  if (level >= maxLvl) return 0;
  return BASE_LEVEL_XP[level] || 0;
}

/**
 * Returns total Job Points (JP) earned solely from leveling up to `level` (capped at Lv 70).
 */
export function getJpEarnedByLevel(level: number): number {
  const clamped = Math.max(1, Math.min(JP_GAIN_MAX_LEVEL, level));
  return LEVEL_TABLE[clamped - 1]?.cumulativeJp || 0;
}

/**
 * Returns remaining Job Points (JP) that can still be gained from leveling up to the Lv 70 JP cap.
 */
export function getRemainingLevelingJp(currentLevel: number): number {
  if (currentLevel >= JP_GAIN_MAX_LEVEL) return 0;
  const currentJp = getJpEarnedByLevel(currentLevel);
  const maxLevelingJp = getJpEarnedByLevel(JP_GAIN_MAX_LEVEL);
  return Math.max(0, maxLevelingJp - currentJp);
}

/**
 * Calculates total JP needed to upgrade from one rank to another for a skill/augment.
 */
export function calculateSkillUpgradeJp(
  type: 'custom' | 'normal' | 'augment',
  currentRank: number,
  targetRank: number
): number {
  const costList =
    type === 'custom'
      ? CUSTOM_SKILL_JP_COSTS
      : type === 'normal'
      ? NORMAL_SKILL_JP_COSTS
      : AUGMENT_JP_COSTS;

  const from = Math.max(1, currentRank);
  const to = Math.min(costList.length, targetRank);

  if (from >= to) return 0;

  let totalJp = 0;
  for (let r = from + 1; r <= to; r++) {
    const item = costList.find((c) => c.rank === r);
    if (item) totalJp += item.jpCost;
  }
  return totalJp;
}

/**
 * Calculates remaining XP needed to jump from (startLevel, currentXp) to targetLevel.
 */
export function calculateXpNeeded(
  startLevel: number,
  currentXp: number,
  targetLevel: number,
  version: GameVersion = '3.4'
): number {
  const maxLvl = getMaxLevelForVersion(version);
  const clampedTarget = Math.min(maxLvl, targetLevel);

  if (startLevel >= clampedTarget) return 0;

  let totalNeeded = 0;

  // XP needed to finish startLevel
  const startLevelMax = getXpRequiredForLevel(startLevel, version);
  const clampedCurrentXp = Math.min(startLevelMax, Math.max(0, currentXp));
  totalNeeded += Math.max(0, startLevelMax - clampedCurrentXp);

  // Plus XP for all intervening levels
  for (let lvl = startLevel + 1; lvl < clampedTarget; lvl++) {
    totalNeeded += getXpRequiredForLevel(lvl, version);
  }

  return totalNeeded;
}

