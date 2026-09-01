export type QuestType = 'main' | 'world' | 'personal' | 'board' | 'grand_mission' | 'repeatable_grind' | 'trial';

export type GameVersion = '3.1' | '3.2' | '3.3' | '3.4' | '95' | '100' | '120';

export interface GameVersionInfo {
  version: GameVersion;
  label: string;
  name: string;
  maxLevel: number;
  description: string;
  ringMaxLevel: number; // usually 90
  unlockedFeatures: string[];
}

export type Region =
  | 'White Dragon Temple'
  | 'Hidell Plains'
  | 'Breya Coast'
  | 'Mysree Forest'
  | 'Volden Mines'
  | 'Dowe Valley'
  | 'Mysree Grove'
  | 'Deenan Woods'
  | 'Bettland Plains'
  | 'Northen Bettland Plains'
  | 'Zandora Wastelands'
  | 'Eastern Zandora'
  | 'Mergoda Ruins'
  | 'Bloodbane Isle'
  | 'Elan Water Grove'
  | 'Farana Plains'
  | 'Morrow Forrest'
  | 'Kingal Canyon'
  | 'Rathnite Foothills'
  | 'Feryana Wilderness'
  | 'Megadosys Plateau'
  | 'Urteca Moutains'
  | 'Personal & Trials'
  | 'Season Events'
  | 'Special & Raids'
  | string;

export interface Quest {
  id: string;
  questCode?: string; // Official datamine quest code e.g. "q00020150"
  name: string;
  jpName?: string;
  region: Region;
  type: QuestType;
  minLevel: number;
  recommendedLevel?: number;
  baseXp: number;
  gold: number;
  rift?: number; // Rift Crystals (RC)
  ap?: number; // Area Points (AP)
  bloodOrbs?: number; // BO
  annotation?: string; // e.g. "1.0", "Hidell Plains", "Area Trials", "Job", "Seazon Events", "Usefull for Adventure"
  giver?: string;
  location?: string;
  targetEnemy?: string;
  objective?: string;
  fixedRewards?: string[];
  selectRewards?: string[];
  isRepeatable: boolean;
  notes?: string;
  recommendedParty?: string;
  minVersion?: GameVersion; // Minimum game version required for this quest/area
  authorName?: string; // Player who created or submitted this custom farm spot
  authorClan?: string; // Clan tag of the author
  server?: string; // Server origin e.g. 'Rising' | 'Revival' | 'Legacy' | 'Others'
  createdAt?: number;
}

export interface PlannedQuest {
  questId: string;
  customQuest?: Quest;
  quantity: number;
  addedAt: number;
}

export interface LevelData {
  level: number;
  xpToNext: number;
  cumulativeXp: number;
  jpGain: number; // Job Points gained on reaching this level (Ends at Lv 70)
  cumulativeJp: number; // Total cumulative JP gained from Lv 1 to this level
  unlockedFeatures?: string;
}

export interface BoosterSettings {
  useExpRing50: boolean; // +50% XP only active for Lv 1 to 89 (stops at Lv 90)
  passportCourseActive: boolean; // +100% Growth Course
  serverMultiplier: number; // 1.0x, 1.5x, 2.0x, etc.
  supportPawnActive: boolean; // +25%
  restedXpBonus: boolean; // +50%
}

export interface SimulationResult {
  startLevel: number;
  startCurrentXp: number;
  endLevel: number;
  endCurrentXp: number;
  totalXpGained: number;
  totalGoldGained: number;
  totalBloodOrbsGained: number;
  levelsGained: number;
  ringBonusXp: number;
  otherBonusXp: number;
  baseXp: number;
  remainingXpToTarget: number;
  targetReached: boolean;
  progressPercent: number;
  xpToNextLevelAfter: number;
}

export interface LevelPresetRoute {
  id: string;
  name: string;
  levelRange: string;
  description: string;
  region: string;
  minVersion?: GameVersion;
  quests: { questId: string; quantity: number }[];
}

// ==================== VOCATIONS & JOB TRAINING (ジョブ修練) ====================

export type VocationId =
  | 'fighter'
  | 'hunter'
  | 'priest'
  | 'shield_sage'
  | 'seeker'
  | 'sorcerer'
  | 'element_archer'
  | 'warrior'
  | 'alchemist'
  | 'spirit_lancer'
  | 'high_scepter';

export type VocationType = VocationId;

export type VocationRole = 'Tank' | 'Attacker (Physical)' | 'Attacker (Magick)' | 'Attacker (Physical & Magick)' | 'Healer / Support';

export interface JobTrainingTarget {
  targetRank: number; // What skill/augment rank this trial unlocks (e.g. Rank 6, 7, 8, 9, 10, EX)
  targetEnemy: string;
  count: number;
  minEnemyLevel: number;
  location?: string;
  notes?: string;
}

export interface VocationSkill {
  id: string;
  skillNo?: number;
  name: string;
  jpName?: string;
  type: 'custom' | 'normal';
  unlockLevel: number;
  maxRank: number;
  element?: 'Slash' | 'Strike' | 'Shot' | 'Pierce' | 'Fire' | 'Ice' | 'Thunder' | 'Holy' | 'Dark' | 'None';
  staminaCost?: string;
  description: string;
  levelingNotes?: string;
  reqLevelPerRank?: number[]; // [lv1, lv2, lv3, lv4, lv5, lv6, lv7, lv8, lv9, lv10]
  jpCostPerRank?: number[]; // JP cost for each rank (e.g. Rank 1 to 10)
  totalJpToMax?: number;
  jobTraining?: JobTrainingTarget[];
}

export interface VocationAugment {
  id: string;
  abilityNo?: number;
  skillNo?: number;
  name: string;
  jpName?: string;
  unlockLevel: number;
  maxRank: number;
  ppCost: number; // Passive Point cost
  description: string;
  effect: string;
  reqLevelPerRank?: number[];
  jpCostPerRank?: number[]; // JP cost for each rank (e.g. Rank 1 to 10)
  totalJpToMax?: number;
  jobTraining?: JobTrainingTarget[];
}

export interface VocationData {
  id: VocationId;
  name: string;
  jpName: string;
  role: VocationRole;
  weapon: string;
  secondaryWeapon?: string;
  masterNpc: string;
  masterLocation: string;
  unlockRequirement: string;
  minVersion: GameVersion;
  playstyle: string;
  customSkills: VocationSkill[];
  normalSkills: VocationSkill[];
  augments: VocationAugment[];
}

// --- Item Library Types ---
export type ItemCategory =
  | 'Accessory'
  | 'Arm Armor'
  | 'Body Armor'
  | 'Helm'
  | 'Leg Armor'
  | 'Consumable'
  | 'Jewelry'
  | 'Job Item'
  | 'Key Item'
  | 'Lantern'
  | 'Material'
  | 'Special'
  | 'Main Weapon'
  | 'Off Weapon'
  | 'Body Wear'
  | 'Leg Wear';

export interface ItemCraftMaterial {
  name: string;
  quantity: number;
}

export interface ItemUpgradeTier {
  grade: string; // e.g. "★1", "★2", "★3", "★4", "★5"
  costGold: number;
  materials: ItemCraftMaterial[];
  physAtkBonus?: number;
  magAtkBonus?: number;
  physDefBonus?: number;
  magDefBonus?: number;
  crestSlots?: number;
}

export interface ItemDropSource {
  type: 'monster' | 'gathering' | 'chest' | 'quest' | 'shop';
  name: string;
  area: string;
  rate?: string;
  stageName?: string;
}

export interface ItemData {
  id: string;
  itemId?: number | string;
  name: string;
  jpName?: string;
  category: ItemCategory;
  subType: string;
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Artifact';
  reqLevel: number;
  ir?: number | string;
  stars?: number;
  equipJobs?: string[];
  weight?: number;
  physAtk?: number;
  magAtk?: number;
  physDef?: number;
  magDef?: number;
  crestSlots?: number;
  element?: string;
  specialEffects?: string[];
  params?: Record<string, number | string>;
  description: string;
  
  // Bazaar Status & Cost
  bazaar: boolean; // Yes or No (Can list on Bazaar)
  sellPrice?: number; // NPC Sell Price in Gold

  // Crafting Requirements
  craftable: boolean;
  craftLevelReq?: number;
  craftFee?: number;
  craftMaterials?: ItemCraftMaterial[];
  craftTimeSeconds?: number;

  // Upgrade Requirements (★0 Base to ★4 Stars Max)
  upgradable: boolean;
  maxGrade?: number; // 4 (★4)
  upgradeTiers?: ItemUpgradeTier[]; // Array of 4 tiers: ★1, ★2, ★3, ★4

  // World Drop / Gathering info
  dropSources?: ItemDropSource[];
  questRewards?: string[];
  gradeupRecipes?: string[];
  gatheringLocations?: string[];
}

export type SpotSearchCategory = 'ENEMIES' | 'GATHERING' | 'ITEMS';
export type SpotSearchStageScope = 'THIS STAGE' | 'ALL STAGES';

export interface SpotSearchParams {
  query: string;
  category: SpotSearchCategory;
  stageScope: SpotSearchStageScope;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
}

export interface CommunityComment {
  id: string;
  itemId: string; // questId, presetId, farmSpotId, guideId, or feedbackId
  itemType: 'quest' | 'preset' | 'farm_spot' | 'guide' | 'feedback';
  parentId?: string | null;
  parentAuthorName?: string | null;
  authorId?: string;
  authorName: string;
  authorClan?: string;
  authorRole?: 'user' | 'moderator' | 'owner';
  avatarIcon?: string;
  avatarColor?: string;
  content: string;
  createdAt: number;
  upvotes?: number;
  downvotes?: number;
  isDeleted?: boolean;
}

export type VoteDirection = 'up' | 'down';

export type PlannerSortOption = 'most_used' | 'top_rated' | 'lowest_rated' | 'newest' | 'oldest';
export type GuideSortOption = 'top_rated' | 'lowest_rated' | 'newest' | 'oldest';

export interface ItemEngagementStats {
  upvotes: number;
  downvotes: number;
  score: number; // upvotes - downvotes
  timesPlanned: number; // How many times players added this quest/preset/spot into their quest planner
  commentsCount: number;
  createdAt: number;
}

export interface GuideSubPage {
  id: string;
  title: string;
  category: 'Progression' | 'Combat & Classes' | 'Pawns' | 'Crafting & Gear' | 'Raids & Bosses' | 'Server Rules' | 'Community';
  author: string;
  authorId?: string;
  authorClan?: string;
  summary: string;
  tags: string[];
  lastUpdated: string;
  createdAt?: number;
  upvotes?: number;
  downvotes?: number;
  isBuiltIn?: boolean;
  content: string;
  sections?: GuideSection[];
}

export type JournalCategory =
  | 'Installation & Setup'
  | 'Account & Login'
  | 'Gameplay Basics'
  | 'Crafting'
  | 'Pawns'
  | 'Bitterblack Maze (BBM)'
  | 'Endgame'
  | 'Classes & Skills'
  | 'Leveling'
  | 'Technical Issues'
  | 'Events & Cosmetics'
  | 'Quick Commands'
  | 'Miscellaneous'
  | 'Discord FAQ & Troubleshooting'
  | string;

export interface JournalQuestion {
  id: string;
  number?: number;
  question: string;
  answer: string;
  category: JournalCategory;
  tags: string[];
  source?: string;
  date?: string;
  discordLink?: string;
  attachments?: string[];
  relatedTab?: string;
  relatedActionText?: string;
  popularity?: number;
  author?: string;
  verified?: boolean;
}

// ==================== USER PROFILES & AUTHENTICATION ====================

export type DdonServer = 'Rising' | 'Revival' | 'Legacy' | 'Others';

export interface UserProfile {
  id: string;
  username: string;
  password?: string;
  characterName: string;
  mainVocation: VocationId; // Primary vocation (backward compatible)
  mainVocations: VocationId[]; // Up to 3 main vocations
  servers: string[]; // ['Rising', 'Revival', 'Legacy', 'Others']
  role?: 'user' | 'moderator' | 'owner';
  roles?: ('user' | 'moderator' | 'owner')[];
  clanTag?: string;
  title?: string; // e.g. "Veteran Arisen", "Dragonforged Master", "Rift Explorer"
  bio?: string;
  avatarIcon?: string; // 'flame' | 'shield' | 'swords' | 'crown' | 'sparkles' | 'compass' | 'wand' | 'trophy'
  avatarColor?: string; // 'amber' | 'emerald' | 'cyan' | 'purple' | 'rose' | 'blue'
  currentLevel?: number;
  progress?: {
    gameVersion?: GameVersion;
    selectedVocation?: VocationType;
    currentLevel?: number;
    currentXp?: number;
    targetLevel?: number;
    boosters?: BoosterSettings;
    completedTrials?: Record<string, boolean>;
    plannedQuests?: PlannedQuest[];
  };
  isGuest: boolean;
  createdAt: number;
  lastLoginAt: number;
}

export interface CommunityFarmSpot {
  id: string;
  name: string;
  region: Region;
  levelRange: string;
  minLevel: number;
  maxLevel: number;
  xpPerRun: number;
  goldPerRun: number;
  runsToLevel?: number;
  targetEnemies: string;
  description: string;
  recommendedVocations?: string[];
  server: string;
  authorId?: string;
  authorName: string;
  authorClan?: string;
  authorRole?: string;
  avatarIcon?: string;
  avatarColor?: string;
  verified?: boolean;
  upvotes: number;
  createdAt: number;
  quests: {
    questId: string;
    name: string;
    xp: number;
    gold: number;
    recommendedQuantity: number;
  }[];
}




