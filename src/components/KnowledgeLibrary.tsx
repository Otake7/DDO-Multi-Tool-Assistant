import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
  Clock,
  CheckCircle2,
  Users,
  Shield,
  Flame,
  Zap,
  Music,
  Heart,
  Droplets,
  Moon,
  Compass,
  AlertTriangle,
  ArrowUp,
  Table as TableIcon,
  MessageSquare,
  Bookmark,
  Share2,
  Tag,
  Info,
  FileSpreadsheet
} from 'lucide-react';
import {
  SECRET_AUGMENTS_DATA,
  SECRET_AUGMENT_CATEGORIES,
  SecretAugment
} from '../data/secretAugmentsData';
import {
  SPECIAL_ACCESSORIES_DATA,
  SPECIAL_ACCESSORIES_OVERVIEW,
  SpecialAccessory
} from '../data/specialAccessoriesData';
import {
  STATS_EXPLANATION_DATA,
  StatDetail
} from '../data/statsExplanationData';
import {
  STATUS_EFFECTS_DATA,
  STATUS_ACCUMULATION_OVERVIEW,
  StatusEffectDetail
} from '../data/statusEffectsData';
import {
  COMBAT_FLOW_DATA,
  CombatPhaseSystem,
  CombatMechanicState
} from '../data/combatFlowData';
import {
  PAWN_ORDERS_DATA,
  PAWN_ORDERS_OVERVIEW,
  PawnOrderEntry
} from '../data/pawnOrdersData';
import {
  LIMIT_BREAKS_DATA,
  LIMIT_BREAKS_OVERVIEW,
  LimitBreakOption
} from '../data/limitBreaksData';

interface ForumThread {
  id: string;
  subpage: 'secret-augments' | 'special-accessories' | 'stats-explanation' | 'status-effects' | 'flow-of-combat' | 'pawn-orders' | 'limit-breaks' | 'bo-tree' | 'consumables' | 'pawn-affinity' | 'debilitations' | 'bgm-audio';
  title: string;
  author: string;
  authorRank: string;
  authorAvatar: string;
  postDate: string;
  repliesCount: number;
  viewsCount: number;
  category: string;
  pinned?: boolean;
  content: string[];
  tips?: string[];
  tags: string[];
}

const FORUM_GUIDE_THREADS: ForumThread[] = [
  {
    id: 'thread-limit-breaks',
    subpage: 'limit-breaks',
    title: '[Master Guide] Equipment Limit Breaks: 4-Star Enhancements, Affix Stacking & Max Roll Strategies',
    author: 'BlacksmithArtisan',
    authorRank: 'Master Crafter • Lv.120',
    authorAvatar: '⚡',
    postDate: '2026-06-12',
    repliesCount: 148,
    viewsCount: 11420,
    category: 'Limit Breaks',
    pinned: true,
    content: [
      'Once your weapon or armor reaches 4-Star maximum enhancement level, standard upgrading ends and the Limit Break system is unlocked at Craig (Craft Room) or Suleiman (Megado Workshop).',
      '• Currency Warning: Rolling with Rift Crystals (RC) yields astronomically low odds for max rolls. Always prioritize Limit Break Tickets and Golden Gemstones whenever available.',
      '• Strategy Rule: It is virtually always better to go "all-in" stacking a single dominant stat (e.g., Knockdown Power +100 or Defense Down +100 on weapons, and 100 Recovery Limit on armor) rather than diluting rolls.',
      '• Weapon Priorities: Knockdown Power +100 is god-tier against Season 3 War-Ready armor. Physical/Magick Defense Down +100 grant +20% damage amplification. Poison +100 melts high-HP raid bosses.',
      '• Armor Priorities: Reach the 100 Recovery Limit cap first (95 from gear + 5 from Vocation Emblem). Then stack Endurance +30 to prevent stagger and uninterrupted spell/skill casting.'
    ],
    tips: [
      'Recovery Limit caps at 100 on your character sheet (5 from Vocation Emblem, 95 needed across gear pieces).',
      'Petrification and Golden grant +25% bonus Impact damage, but remember they instantly wipe all other active debuffs!',
      'Avoid Drenching, Tarring, Skill Stifling, and Element Resist Down rolls—Elemental Forces already cover these with far higher efficacy.',
      'Resist Debilitation caps at 100 for total immunity. Golden and Curse are the most impactful resistances to roll.'
    ],
    tags: ['Limit Breaks', '4-Star Gear', 'Craig', 'Suleiman', 'Knockdown Power', 'Recovery Limit', 'Defense Down', 'Endurance']
  },
  {
    id: 'thread-pawn-orders',
    subpage: 'pawn-orders',
    title: '[Master Guide] Pawn Orders & Tactical Directives: Shortcut Priority, Vocation Commands & Overrides',
    author: 'PawnTactician',
    authorRank: 'Veteran Legion Master • Lv.120',
    authorAvatar: '📢',
    postDate: '2026-06-08',
    repliesCount: 112,
    viewsCount: 9150,
    category: 'Pawn Orders',
    pinned: true,
    content: [
      'Pawn Orders allow the Arisen to dynamically control their party AI in real time. Knowing when to direct your Pawns transforms combat efficacy:',
      '• Accessing the Menu: Open the Main Menu, select the 1st Tab, and scroll down to the 5th Option ("Pawn Orders").',
      '• Multiplayer Scope: Orders strictly command your own personal Pawns. They do not alter the actions of other players\' Pawns in mixed co-op lobbies.',
      '• Essential Shortcut Mapping: Always map critical orders (Cancel Order, Attack, Follow, Shake Command, Expose Secret Core, and Enchant) to your radial shortcut wheel.',
      '• Cancellation Triggers: Orders are cancelled by issuing Cancel Order, by the death of the Arisen or Pawn, or if you stray too far away causing Pawns to teleport to you. Idle orders (Observe, Standby) expire after ~10-15 minutes.',
      '• Boss Phase Coordination: When Enraged, order "Expose Secret Core" + "Prioritize Secret Core Attacks". When Tired (blue stamina bar), immediately fire "Shake Command" for instantaneous stamina emptying. When Downed, fire "Attack" so all Pawns burst maximum DPS.'
    ],
    tips: [
      'Always have "Cancel Order" mapped on your primary shortcut wheel to quickly restore default AI positioning.',
      'Alchemist Pawns require Rex Elementa slotted to obey the "Enchant" command; Shield Sages use Force Enchantment directly.',
      'Special Priest Orders (Energy Spot, Quick Charge, Solid Riser) require the skill equipped and grant tremendous team utility.',
      'Linking Throw requires active combat and a Fighter, Warrior, or Seeker Pawn with the skill.'
    ],
    tags: ['Pawn Orders', 'Basic Orders', 'Advanced Orders', 'Special Orders', 'Shake Command', 'Cancel Order', 'Shortcuts', 'Enchant']
  },
  {
    id: 'thread-flow-of-combat',
    subpage: 'flow-of-combat',
    title: '[Master Guide] Flow of Combat: Enrage, Break Gauges, Seasons 1-3 Gimmicks & Down Phase DPS Windows',
    author: 'CombatDirector',
    authorRank: 'Veteran Raid Captain • Lv.120',
    authorAvatar: '⚔️',
    postDate: '2026-06-05',
    repliesCount: 94,
    viewsCount: 7820,
    category: 'Flow of Combat',
    pinned: true,
    content: [
      'Mastering boss combat in Dragon\'s Dogma Online requires understanding core phase transitions and unique seasonal mechanics:',
      '• Core Enrage Loop: Normal → Enraged (-70% damage, Break Gauge appears) → Tired (Break Gauge filled, blue stamina bar, climb & Shake) → Exhausted (0 stamina, wobbling in place, Chance Attack to topple) → Downed (+50% bonus damage for 10-20 seconds).',
      '• Struggle vs. Resist: When climbing an Enraged boss, time your Resist input to the monster\'s physical animation rather than the yellow UI icon to avoid wasting stamina.',
      '• Season 1 Alchemized: Golden stakes hold gold armor chunks in place. Green vocations cannot reveal gold coating—destroy the stakes directly to expose critical weak spots.',
      '• Season 2 Infected: Spore Aura deals passive infection and damage reduction (stripped by Knockdown stagger). Tentacles grant damage reduction per node (sealed by Green healing auras/core skills; Sprout Sealing augment extends duration). Shattering all Infection Spikes triggers an immediate Downed phase (~10s).',
      '• Season 3 War-Ready: Self-repairing armor takes Purple Blow Damage scaling with Knockdown Power (~3500 cap/hit). Green healing auras during extremity attacks trigger whistling sound + green hue for increased damage. Crumbling armor (crunch sound) loses self-repair. Breaking armor during Riled Up cancels lethal moves like Nightmare tornadoes.',
      '• Season 3 Blaze: Green healing auras cool and reveal fire weaknesses (small enemies on entry; large bosses on extremity attack). Emits a ringing chime and turns to a dull color for massive vulnerability.'
    ],
    tips: [
      'Exhaust Attack increases Shake potency and exposed core stamina damage during the Tired phase.',
      'Chance Attack determines how fast you can topple an Exhausted monster before it recovers.',
      'War-Ready armor damage displays in purple numbers and scales with Knockdown Power.',
      'Stationary cannons deal 2 x 3,500 Blow Damage or 2 x 300 normal damage plus Fire buildup.'
    ],
    tags: ['Flow of Combat', 'Enrage', 'Break Gauge', 'Tired', 'Shake', 'Exhausted', 'Downed', 'Alchemized', 'Infected', 'War-Ready', 'Blaze', 'Blow Damage']
  },
  {
    id: 'thread-status-effects',
    subpage: 'status-effects',
    title: '[Master Compendium] Status Effects & Debilitations Matrix: Player vs Foe Effects, Multipliers & Cleansing',
    author: 'DebuffTactician',
    authorRank: 'Grand Alchemist • Lv.120',
    authorAvatar: '🧪',
    postDate: '2026-06-02',
    repliesCount: 78,
    viewsCount: 6190,
    category: 'Status Effects',
    pinned: true,
    content: [
      'Debilitations and Status Effects in Dragon\'s Dogma Online have dramatically different effects when inflicted on the player versus when inflicted on monsters:',
      '• Hidden Accumulation Multipliers: Multi-hit rapid attacks deal low accumulation per hit, while heavy single strikes deliver high burst accumulation. Any weapon can build non-elemental debilitations if matching crests are equipped.',
      '• Dynamic Boss Resistances: Enemies build dynamic resistance after each successful trigger, eventually becoming immune.',
      '• Elemental Interactions: Catching Fire immediately cancels Frozen Solid. Tarred causes instant ignition if lanterns are lit. Drenched acts as an instant trigger primer for Frozen and Shock.',
      '• Max HP Scaling: Catching Fire and Poison scale with enemy maximum health—ticks on giant raid bosses can theoretically exceed 9,999.',
      '• Non-Cleanseable Afflictions: Cursed (halves max HP) and Weakness (+15% damage taken) cannot be removed with items or spells—they require an Inn rest, relog, or Innkeeper fee.'
    ],
    tips: [
      'Concoction of Light is vital because standard Panacea cannot cure Element Resist Down.',
      'Items Sealed blocks your inventory—only an ally casting a cleansing spell (Priest Cure Spot) can cure it.',
      'Never light your lantern while Tarred, or you will instantly combust in flames.'
    ],
    tags: ['Status Effects', 'Debilitations', 'Burning', 'Frozen', 'Shock', 'Holy Drain', 'Cursed', 'Infected', 'Tarred']
  },
  {
    id: 'thread-stats-explanation',
    subpage: 'stats-explanation',
    title: '[Master Compendium] Comprehensive Combat Stats Breakdown: Penetration Ratios, Soft Caps & Hidden Gauges',
    author: 'MathArisen',
    authorRank: 'Theorycrafter Guild • Lv.120',
    authorAvatar: '📊',
    postDate: '2026-05-30',
    repliesCount: 65,
    viewsCount: 5410,
    category: 'Stats Explanation',
    pinned: true,
    content: [
      'Understanding the combat math of Dragon\'s Dogma Online prevents countless wasted hours of inefficient build investments. Here are the core pillars of character stats:',
      '• Attack & Penetration Cap: Damage formula uses Penetration Rate (Attack vs Monster Defense) capped at a 1.0 ratio (~5 gear levels above enemy). Once capped, stacking raw attack does not add penetration scaling.',
      '• Strength & Magick Diminishing Returns: STR/MGK direct damage scaling softens at 200 (0.50%/pt) and 300 (0.26%/pt). In endgame, species anti-type augments/crests offer far superior multipliers.',
      '• Recovery Limit (Formerly Healing Power): Caps at 100, where 100% of damage taken is retained as recoverable gray HP. It is the #1 first choice for Armor Limit Break. It does NOT buff potion healing or spell tick power.',
      '• Knockdown & Stagger: Knockdown Power fills Enrage Break Gauges, strips Season 2 Infection Corruption Auras, and scales Season 3 War-Ready purple armor damage.',
      '• Weight & Stamina: Stamina regen is governed by Weight brackets (0-200 Very Light, 200-300 Light, etc.). Character height and body sliders have ZERO effect on stamina, sprint speed, or hitboxes.'
    ],
    tips: [
      'Max HP can exceed 9,999 to prevent lethal one-shots, but Weakness from regular revivals can cause incoming damage to break 9,999.',
      'Chance Attack (optimal 40 on Emblem + 10 Slayer Stone) accelerates toppling Exhausted bosses, while Exhaust Attack (~100 benchmark) shreds Enraged boss stamina.',
      'Stun does NOT pause or extend an enemy\'s Downed timer.'
    ],
    tags: ['Stats', 'Penetration Rate', 'Recovery Limit', 'Weight', 'STR/MGK Scaling', 'Knockdown', 'Chance Attack']
  },
  {
    id: 'thread-special-accessories',
    subpage: 'special-accessories',
    title: '[Master Guide] Special Accessories & Supreme Multi-Augment Crests: Emblem Rules & Meta Combos',
    author: 'SupremeCrafter',
    authorRank: 'Relic Artificer • Lv.120',
    authorAvatar: '💍',
    postDate: '2026-05-24',
    repliesCount: 48,
    viewsCount: 4230,
    category: 'Special Accessories',
    pinned: true,
    content: [
      'Special Accessories represent some of the highest-value equipment in Dragon\'s Dogma Online. These accessories come with built-in crests that grant 5 to 6 distinct augments simultaneously in a single item slot:',
      '• Job Emblem Implantation: You can either equip these accessories directly or slot their crests into your Job Emblem. When slotted into an Emblem, ALL 5–6 augments transfer over and remain active simultaneously!',
      '• Single Augment Cap: Despite granting an entire suite of augments, the accessory or implanted crest counts as ONLY ONE SINGLE augment towards your maximum augment limit.',
      '• Flat Stats vs Augment Transfer: If an accessory has flat baseline stats (e.g. Extreme accessories with +7 Phys/Mag Atk, +150 HP/Stamina, +30 Endurance), those raw stats do NOT carry over when implanted into a Job Emblem; only the passive augment effects transfer.',
      '• Supreme Myrmidon: Equipping this on your Arisen grants your Pawns +700 HP, +500 Stamina, +40 STR, +40 MGK, +40 Phys Def, and +40 Mag Def—a permanent staple for all solo/pawn play.',
      '• Supreme Inquiry: Combines Extended Springs, Flow, Efficacy (+80% potion healing), Safe Landing, and huge minimap detection for gathering nodes and treasure chests.'
    ],
    tips: [
      'Supreme Accessories drop as a random accessory piece (Ring, Earring, or Bracelet).',
      'Myrmidon and Inquiry must be equipped on the Arisen (they do not activate if equipped directly by a Pawn).',
      'Purge and Night Emperor work when equipped by either Arisen or Pawns.'
    ],
    tags: ['Special Accessories', 'Myrmidon', 'Inquiry', 'Purge', 'Night Emperor', 'Job Emblem']
  },
  {
    id: 'thread-bo-tree',
    subpage: 'bo-tree',
    title: '[Guide] Season 1 Blood Orb Tree: All Secret Augment Nodes & BO Cost Roadmap',
    author: 'GrandMasterArisen',
    authorRank: 'Veteran Arisen • Lv.120',
    authorAvatar: '🏛️',
    postDate: '2026-05-12',
    repliesCount: 42,
    viewsCount: 3890,
    category: 'Blood Orb Tree',
    pinned: true,
    content: [
      'The Season 1 Blood Orb (BO) tree located in the Great Temple contains some of the most critical universal augments in the game. Here is the optimal investment path to avoid wasting precious Blood Orbs:',
      '• Tier 1 (Low Cost): Immediately unlock "Effect Extension" (Bottom Left, 30 BO) and "Extended Springs" (Bottom Left, 30 BO). For just 60 BO total, you double both item buff durations and hot spring healing buffs! Unlock "Efficacy" (Top Left, 70 BO) for +60% potion healing.',
      '• Tier 2 (Utility & Stats): "Gathering" (Bottom Left, 250 BO) gives 5x minimap node detection range. "Soft Touch" (Top Left, 220 BO) helps with dungeon spike traps.',
      '• Tier 3 (Mid Game): "Flow" (Top Left, 1000 BO) is invaluable for deep swamp water and toxic sewers. "Featherfoot" (Bottom Left, 750 BO) cuts fall damage in half. ⚠️ WARNING: Avoid "Expert Excavator" (750 BO) as it currently does not work.',
      '• Tier 4 (Endgame / High Cost): "Treasure Eye" (Bottom Left, 2700 BO) multiplies chest minimap radius by 3x. "Willpower" (Top Left, 5000 BO) lets you cheat death with 1 HP when below 1200 HP threshold.'
    ],
    tips: [
      'Prioritize Tier 1 Effect Extension and Tier 3 Flow before spending BO on weather augments.',
      'If you have the "Inquiry" accessory, it already grants Extended Springs, Gathering, Efficacy, Flow, Treasure Eye, and Safe Landing!'
    ],
    tags: ['Blood Orb Tree', 'BO Optimization', 'Inquiry', 'Willpower', 'Effect Extension']
  },
  {
    id: 'thread-consumables',
    subpage: 'consumables',
    title: '[Deep Dive] The Consumable Buff Meta: Effect Extension vs Efficacy & Hot Springs',
    author: 'AlchemistPrime',
    authorRank: 'Potion Master • Seasoned Crafter',
    authorAvatar: '🧪',
    postDate: '2026-05-15',
    repliesCount: 28,
    viewsCount: 2450,
    category: 'Consumables & Buffs',
    content: [
      'In high-difficulty Extreme Missions (EXM) and Grand Missions (GM), consumable buff uptime is the difference between clearing before enrage or failing DPS checks:',
      '• Effect Extension (Cost 7 / 3 with item scroll): Doubles all consumable buff durations. Standard Tier-3 strength pots last 2.5 minutes; with this augment, they stay active for 5 full minutes, saving immense bag space and gold.',
      '• Efficacy (Cost 7 / 5): Multiplies HP restored by curatives by 1.6x (+60%). A standard 1000 HP tonic restores 1600 HP, allowing you to top off recoverable health instantly.',
      '• Extended Springs (Cost 5 / 2): Doubles the buff duration received from resting in Hot Springs from 15 minutes to 30 minutes. Always soak in a hot spring before starting your dungeon route!'
    ],
    tips: [
      'Consuming the Secret Scroll item for Effect Extension cuts its equip cost down from 7 points to 3 points.',
      'Buffs from food and potions stack multiplicatively with Priest elemental enchants.'
    ],
    tags: ['Effect Extension', 'Efficacy', 'Hot Springs', 'Potions', 'DPS Buffs']
  },
  {
    id: 'thread-pawn-affinity',
    subpage: 'pawn-affinity',
    title: '[Pawn Meta] Partner Pawn Relationship Level Unlocks & The "Myrmidon" Set',
    author: 'PawnCommander',
    authorRank: 'Guild Tactician',
    authorAvatar: '👥',
    postDate: '2026-05-18',
    repliesCount: 35,
    viewsCount: 3120,
    category: 'Pawn & Companion',
    pinned: true,
    content: [
      'Companion Augments are unique: they are equipped by the ARISEN, but grant massive baseline stat increases to ALL Pawns in your active party (they cannot be equipped directly onto Pawns and do not boost Arisen stats).',
      'You unlock them by building relationship affinity with your Partner Pawn in the Crafting Room:',
      '• Affinity Lv. 3: Companion Health (+600 Max HP to Pawns)',
      '• Affinity Lv. 4: Companion Attack (+30 STR to Pawns)',
      '• Affinity Lv. 9: Companion Defense (+30 Phys Defense to Pawns)',
      '• Affinity Lv. 13: Companion Stamina (+400 Max Stamina to Pawns)',
      '• Affinity Lv. 17: Companion Magick (+30 Magick Attack to Pawns)',
      '• Affinity Lv. 18: Companion Magick Defense (+30 Magick Defense to Pawns)',
      '• EXM Reward: Companion Healing (Recovers small green HP for pawns when an enemy is defeated).'
    ],
    tips: [
      'The "Myrmidon" combo accessory bundles Companion Health, Stamina, Attack, Magick, Defense, and Magick Defense all into a single slot!',
      'Gifting crafted equipment and conversing in the Crafting Room accelerates Partner Pawn relationship rank.'
    ],
    tags: ['Partner Pawn', 'Myrmidon', 'Companion Health', 'Pawn Stats', 'Affinity']
  },
  {
    id: 'thread-debilitations',
    subpage: 'debilitations',
    title: '[Combat Math] Debilitation Augments: "Resist" vs "Control" vs "Reduce"',
    author: 'DoctorSalvation',
    authorRank: 'Priest Council Member',
    authorAvatar: '🛡️',
    postDate: '2026-05-20',
    repliesCount: 19,
    viewsCount: 1980,
    category: 'Debilitations & Status',
    content: [
      'Debilitation Secret Augments fall into three distinct mechanical behaviors:',
      '1. "Resist" Augments (e.g. Resist Poison, Resist Petrification, Close to Fire): Add a flat +30 to your resistance stat against that ailment. This directly increases how many hits of an attack you can sustain before the status gauge fills.',
      '2. "Control" Augments (e.g. Control Poison, Control Slow, Control Sleep): Once you ARE afflicted, these augments drastically shorten the debuff duration so you recover faster.',
      '3. "Control Petrification / Gilded" (Special): These do not stop you from turning to stone/gold, but rather extend the grace period (delaying the 100% death freeze), giving your team time to throw Softener or cast Halidom.',
      '4. "Reduce" Augments (e.g. Reduce Burning, Reduce Freeze, Reduce Def Down): Specifically target damage-over-time durations and combat stat debuffs.'
    ],
    tips: [
      'When tackling Cockatrices or Medusa, equip Resist Petrification or Control Petrification to prevent instant wipeouts.',
      'Status resistances appear directly on your character Status Sheet in the pause menu.'
    ],
    tags: ['Petrification', 'Resist', 'Control', 'Status Effects', 'Cockatrice']
  },
  {
    id: 'thread-bgm-audio',
    subpage: 'bgm-audio',
    title: '[Capcom Soundtracks] Battle BGM Override Augments & Party Priority Rules',
    author: 'CapcomSoundArchivist',
    authorRank: 'Audio Enthusiast',
    authorAvatar: '🎵',
    postDate: '2026-05-22',
    repliesCount: 14,
    viewsCount: 1540,
    category: 'Battle Themes & Music',
    content: [
      'DDON features 5 iconic Capcom battle music overrides that cost only 1 augment point and are unlocked by default for all players:',
      '• Music Hunter (1): "Proof of a Hunter" (Monster Hunter theme)',
      '• Music May Cry (1): "Devils Never Cry" (Devil May Cry 3 theme)',
      '• Music Fighter (1): "Japan (Ryu)" (Street Fighter 2 theme)',
      '• Wily Music (1): "Dr. Wily Stage 1" (Mega Man 2 theme)',
      '• Music\'n Goblins (1): "Plains BGM" (Ghosts \'n Goblins theme)',
      'Combat Audio Rules: These tracks ONLY replace regular encounter combat music. Blood Orb encounters, seasonal raid bosses, and Extreme Missions (EXM) will retain their custom orchestral themes. In multiplayer parties, the party leader\'s topmost equipped music augment dictates the music for everyone.'
    ],
    tips: [
      'Equip your favorite theme in your first augment preset so your party hears it when you host quests.'
    ],
    tags: ['Music', 'Monster Hunter', 'Devil May Cry', 'Street Fighter', 'Mega Man']
  }
];

interface KnowledgeLibraryProps {
  onNavigateToTab?: (tab: string) => void;
}

export const KnowledgeLibrary: React.FC<KnowledgeLibraryProps> = ({ onNavigateToTab }) => {
  const [activeSubpage, setActiveSubpage] = useState<string>('secret-augments');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAugmentCategory, setSelectedAugmentCategory] = useState<string>('All');
  const [selectedSymbolFilter, setSelectedSymbolFilter] = useState<'All' | 'BO' | 'Item' | 'Combo'>('All');
  const [selectedAccessoryCategory, setSelectedAccessoryCategory] = useState<string>('All');
  const [selectedStatCategory, setSelectedStatCategory] = useState<string>('All');
  const [selectedStatusCategory, setSelectedStatusCategory] = useState<string>('All');
  const [selectedCombatSeason, setSelectedCombatSeason] = useState<string>('All');
  const [selectedPawnOrderCategory, setSelectedPawnOrderCategory] = useState<string>('All');
  const [onlyMustHaveOrders, setOnlyMustHaveOrders] = useState<boolean>(false);
  const [selectedLimitBreakCategory, setSelectedLimitBreakCategory] = useState<string>('All');
  const [selectedLimitBreakTier, setSelectedLimitBreakTier] = useState<string>('All');
  const [viewFormat, setViewFormat] = useState<'cards' | 'table'>('cards');
  const [expandedAugmentId, setExpandedAugmentId] = useState<string | null>(null);

  // Subpages menu
  const subpages = [
    { id: 'secret-augments', name: 'Secret Augments', icon: '✨', badge: `${SECRET_AUGMENTS_DATA.length} Entries` },
    { id: 'special-accessories', name: 'Special Accessories', icon: '💍', badge: `${SPECIAL_ACCESSORIES_DATA.length} Items` },
    { id: 'stats-explanation', name: 'Stats Explanation', icon: '📊', badge: `${STATS_EXPLANATION_DATA.length} Core Stats` },
    { id: 'status-effects', name: 'Status Effects', icon: '🛡️', badge: `${STATUS_EFFECTS_DATA.length} Effects` },
    { id: 'flow-of-combat', name: 'Flow of Combat', icon: '⚔️', badge: `${COMBAT_FLOW_DATA.length} Systems` },
    { id: 'pawn-orders', name: 'Pawn Orders', icon: '📢', badge: `${PAWN_ORDERS_DATA.length} Commands` },
    { id: 'limit-breaks', name: 'Limit Breaks', icon: '⚡', badge: `${LIMIT_BREAKS_DATA.length} Options` },
    { id: 'bo-tree', name: 'Blood Orb Tree Guide', icon: '🏛️', badge: 'Tier 1 - 4' },
    { id: 'consumables', name: 'Consumables & Buffs', icon: '🧪', badge: 'Meta Guide' },
    { id: 'pawn-affinity', name: 'Pawn Affinity & Myrmidon', icon: '👥', badge: 'Partner Pawn' },
    { id: 'debilitations', name: 'Debilitation Mechanics', icon: '🔥', badge: 'Status Math' },
    { id: 'bgm-audio', name: 'Battle Music Themes', icon: '🎵', badge: 'Capcom BGM' }
  ];

  // Filtered Secret Augments
  const filteredAugments = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SECRET_AUGMENTS_DATA.filter((aug) => {
      const matchesCategory =
        selectedAugmentCategory === 'All' || aug.category === selectedAugmentCategory;

      const matchesSymbol =
        selectedSymbolFilter === 'All' ||
        (selectedSymbolFilter === 'BO' && aug.symbols.bloodOrbTree) ||
        (selectedSymbolFilter === 'Item' && aug.symbols.itemConsumable) ||
        (selectedSymbolFilter === 'Combo' && aug.symbols.comboAccessory);

      if (!q) return matchesCategory && matchesSymbol;

      const inName = aug.name.toLowerCase().includes(q);
      const inDesc = aug.description.toLowerCase().includes(q);
      const inLevelUp = aug.levelUpEffect.toLowerCase().includes(q);
      const inDetails = aug.detailsAndUsage.toLowerCase().includes(q);
      const inAcq = aug.acquisition.toLowerCase().includes(q);
      const inCombo = (aug.comboName || '').toLowerCase().includes(q);
      const inTags = aug.tags.some((t) => t.toLowerCase().includes(q));

      return (
        matchesCategory &&
        matchesSymbol &&
        (inName || inDesc || inLevelUp || inDetails || inAcq || inCombo || inTags)
      );
    });
  }, [searchQuery, selectedAugmentCategory, selectedSymbolFilter]);

  // Filtered Special Accessories
  const filteredAccessories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SPECIAL_ACCESSORIES_DATA.filter((acc) => {
      const matchesCategory =
        selectedAccessoryCategory === 'All' || acc.category === selectedAccessoryCategory;

      if (!q) return matchesCategory;

      const inName = acc.name.toLowerCase().includes(q);
      const inExplanation = acc.explanation.toLowerCase().includes(q);
      const inNotes = acc.notes.toLowerCase().includes(q);
      const inType = acc.type.toLowerCase().includes(q);
      const inEffects = acc.effects.some(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.effect.toLowerCase().includes(q) ||
          e.detail.toLowerCase().includes(q)
      );
      const inTags = acc.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && (inName || inExplanation || inNotes || inType || inEffects || inTags);
    });
  }, [searchQuery, selectedAccessoryCategory]);

  // Filtered Stats Explanation
  const filteredStats = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return STATS_EXPLANATION_DATA.filter((stat) => {
      const matchesCategory =
        selectedStatCategory === 'All' || stat.category === selectedStatCategory;

      if (!q) return matchesCategory;

      const inName = stat.name.toLowerCase().includes(q);
      const inAliases = (stat.aliases || []).some((a) => a.toLowerCase().includes(q));
      const inShort = stat.shortDesc.toLowerCase().includes(q);
      const inFull = stat.fullExplanation.toLowerCase().includes(q);
      const inCap = stat.capOrScaling.toLowerCase().includes(q);
      const inVoc = stat.associatedVocations.some((v) => v.toLowerCase().includes(q));
      const inTactics = stat.keyTactics.some((t) => t.toLowerCase().includes(q));
      const inTags = stat.tags.some((t) => t.toLowerCase().includes(q));

      return (
        matchesCategory &&
        (inName || inAliases || inShort || inFull || inCap || inVoc || inTactics || inTags)
      );
    });
  }, [searchQuery, selectedStatCategory]);

  // Filtered Status Effects
  const filteredStatusEffects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return STATUS_EFFECTS_DATA.filter((status) => {
      const matchesCategory =
        selectedStatusCategory === 'All' || status.category === selectedStatusCategory;

      if (!q) return matchesCategory;

      const inName = status.name.toLowerCase().includes(q);
      const inCategory = status.category.toLowerCase().includes(q);
      const inAcc = status.accumulationMethod.toLowerCase().includes(q);
      const inAllies = status.effectOnAllies.toLowerCase().includes(q);
      const inFoes = status.effectOnFoes.toLowerCase().includes(q);
      const inCleanse = status.cleanseMethods.some((c) => c.toLowerCase().includes(q));
      const inTactics = status.tacticalNotes.toLowerCase().includes(q);
      const inTags = status.tags.some((t) => t.toLowerCase().includes(q));

      return (
        matchesCategory &&
        (inName || inCategory || inAcc || inAllies || inFoes || inCleanse || inTactics || inTags)
      );
    });
  }, [searchQuery, selectedStatusCategory]);

  // Filtered Flow of Combat
  const filteredCombatFlow = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return COMBAT_FLOW_DATA.filter((system) => {
      const matchesSeason =
        selectedCombatSeason === 'All' || system.seasonCategory === selectedCombatSeason;

      if (!q) return matchesSeason;

      const inName = system.name.toLowerCase().includes(q);
      const inOverview = system.overview.toLowerCase().includes(q);
      const inSeason = system.seasonCategory.toLowerCase().includes(q);
      const inStates = system.states.some(
        (s) =>
          s.stateName.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.mechanics.some((m) => m.toLowerCase().includes(q)) ||
          s.tacticalTips.some((t) => t.toLowerCase().includes(q))
      );
      const inStats = system.keyStatsAndSkills.some((s) => s.toLowerCase().includes(q));
      const inAudio = system.audioVisualCues.some((a) => a.toLowerCase().includes(q));
      const inTags = system.tags.some((t) => t.toLowerCase().includes(q));

      return (
        matchesSeason &&
        (inName || inOverview || inSeason || inStates || inStats || inAudio || inTags)
      );
    });
  }, [searchQuery, selectedCombatSeason]);

  // Filtered Pawn Orders
  const filteredPawnOrders = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PAWN_ORDERS_DATA.filter((order) => {
      const matchesCategory =
        selectedPawnOrderCategory === 'All' || order.category === selectedPawnOrderCategory;
      const matchesMustHave = !onlyMustHaveOrders || order.isMustHave;

      if (!q) return matchesCategory && matchesMustHave;

      const inName = order.name.toLowerCase().includes(q);
      const inCategory = order.category.toLowerCase().includes(q);
      const inEffect = order.effectAndUsage.toLowerCase().includes(q);
      const inVocation = order.targetVocation.toLowerCase().includes(q);
      const inReqs = (order.requirements || '').toLowerCase().includes(q);
      const inTactics = order.tacticalNotes.toLowerCase().includes(q);
      const inTags = order.tags.some((t) => t.toLowerCase().includes(q));

      return (
        matchesCategory &&
        matchesMustHave &&
        (inName || inCategory || inEffect || inVocation || inReqs || inTactics || inTags)
      );
    });
  }, [searchQuery, selectedPawnOrderCategory, onlyMustHaveOrders]);

  // Filtered Limit Breaks
  const filteredLimitBreaks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return LIMIT_BREAKS_DATA.filter((item) => {
      const matchesCategory =
        selectedLimitBreakCategory === 'All' || item.category === selectedLimitBreakCategory;
      const matchesTier =
        selectedLimitBreakTier === 'All' ||
        (selectedLimitBreakTier === 'Top Tier' && item.priorityTier.startsWith('Top Tier')) ||
        (selectedLimitBreakTier === 'Situational' && item.priorityTier.startsWith('Situational')) ||
        (selectedLimitBreakTier === 'Low Priority' && item.priorityTier.startsWith('Low Priority'));

      if (!q) return matchesCategory && matchesTier;

      const inName = item.name.toLowerCase().includes(q);
      const inCategory = item.category.toLowerCase().includes(q);
      const inValue = item.tierValue.toLowerCase().includes(q);
      const inTier = item.priorityTier.toLowerCase().includes(q);
      const inExpl = item.explanation.toLowerCase().includes(q);
      const inUsage = item.usageCasesAndSuggestions.toLowerCase().includes(q);
      const inImpact = (item.numericalImpact || '').toLowerCase().includes(q);
      const inSynergies = (item.synergies || []).some((s) => s.toLowerCase().includes(q));
      const inTags = item.tags.some((t) => t.toLowerCase().includes(q));

      return (
        matchesCategory &&
        matchesTier &&
        (inName || inCategory || inValue || inTier || inExpl || inUsage || inImpact || inSynergies || inTags)
      );
    });
  }, [searchQuery, selectedLimitBreakCategory, selectedLimitBreakTier]);

  // Filtered Forum Threads
  const filteredThreads = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FORUM_GUIDE_THREADS.filter((thread) => {
      const matchesSubpage =
        activeSubpage === 'secret-augments' ||
        activeSubpage === 'special-accessories' ||
        activeSubpage === 'stats-explanation' ||
        activeSubpage === 'status-effects' ||
        activeSubpage === 'flow-of-combat' ||
        activeSubpage === 'pawn-orders' ||
        activeSubpage === 'limit-breaks' ||
        thread.subpage === activeSubpage;
      if (!q) return matchesSubpage;

      const inTitle = thread.title.toLowerCase().includes(q);
      const inAuthor = thread.author.toLowerCase().includes(q);
      const inCategory = thread.category.toLowerCase().includes(q);
      const inContent = thread.content.some((c) => c.toLowerCase().includes(q));
      const inTags = thread.tags.some((t) => t.toLowerCase().includes(q));

      return inTitle || inAuthor || inCategory || inContent || inTags;
    });
  }, [searchQuery, activeSubpage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Forum Header Banner */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center text-slate-950 font-black text-2xl shrink-0">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-100 uppercase tracking-wider">
                  Knowledge Library & Forum Compendium
                </h1>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Secret Augments & Mechanics
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Official compendium of universal Secret Augments, Blood Orb nodes, consumable buff mechanics, partner pawn affinities & battle themes.
              </p>
            </div>
          </div>

          {/* Quick Bestiary Jump Button */}
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('bestiary')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>Explore Monster Bestiary</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Forum Subpages Tabs Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {subpages.map((sub) => {
            const isActive = activeSubpage === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSubpage(sub.id);
                  if (sub.id !== 'secret-augments') {
                    setSearchQuery('');
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {sub.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Data Source Annotation (CODEX Google Sheet) */}
      <div className="bg-gradient-to-r from-cyan-950/50 via-slate-900 to-amber-950/40 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-full bg-cyan-500/5 blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3.5 relative z-10">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0 mt-0.5 sm:mt-0 shadow-md">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Source Citation & Attribution
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-500/30">
                Community Reference
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Most of the comprehensive mechanics, secret augment values, stat calculations, status effects, and limit break tables in this Knowledge Library originate from the community <strong className="text-cyan-300 font-bold">Dragon&apos;s Dogma Online CODEX</strong>.
            </p>
          </div>
        </div>

        <a
          href="https://docs.google.com/spreadsheets/d/1SWRZOP25feCL8w9TmM82e_lTt7Ebizm9PMESEaWfboY/edit?gid=1867026220#gid=1867026220"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-md hover:shadow-cyan-500/20 cursor-pointer shrink-0 w-full sm:w-auto justify-center group relative z-10"
        >
          <span>Open CODEX Spreadsheet</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Global Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all Secret Augments, Blood Orb nodes (BO), Inquiry, Myrmidon, Resist Petrification, Flow, Effect Extension..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills for Secret Augments Subpage */}
        {activeSubpage === 'secret-augments' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 text-xs">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Category:</span>
              {SECRET_AUGMENT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedAugmentCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedAugmentCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Symbol & View Format Controls */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {/* Symbol Source Filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setSelectedSymbolFilter('All')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${
                    selectedSymbolFilter === 'All'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Sources
                </button>
                <button
                  onClick={() => setSelectedSymbolFilter('BO')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 ${
                    selectedSymbolFilter === 'BO'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Season 1 Blood Orb Tree Augments"
                >
                  <span>△ BO Tree</span>
                </button>
                <button
                  onClick={() => setSelectedSymbolFilter('Item')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 ${
                    selectedSymbolFilter === 'Item'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Consumable Item Scroll Augments"
                >
                  <span>◇ Scroll Item</span>
                </button>
                <button
                  onClick={() => setSelectedSymbolFilter('Combo')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 ${
                    selectedSymbolFilter === 'Combo'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Combo Accessories (Inquiry / Myrmidon / Night Emperor)"
                >
                  <span>⬠ Combo Ring</span>
                </button>
              </div>

              {/* View Toggle (Cards vs Table) */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewFormat('cards')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewFormat === 'cards'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Forum Card View"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewFormat('table')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewFormat === 'table'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Master Table View"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills for Special Accessories Subpage */}
        {activeSubpage === 'special-accessories' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 text-xs">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Filter:</span>
              {(['All', 'Supreme Multi-Augment', 'Leveling & Progression', 'Extreme Vocation-Locked', 'Universal Mobility'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedAccessoryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedAccessoryCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle (Cards vs Table) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewFormat('cards')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'cards'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Forum Card View"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewFormat('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'table'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Master Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Filter Pills for Stats Explanation Subpage */}
        {activeSubpage === 'stats-explanation' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 text-xs">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Filter:</span>
              {(['All', 'Vitality & Resources', 'Offensive Scaling', 'Defensive & Mitigation', 'Combat Gauges & CC', 'Healing & Status'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedStatCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedStatCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle (Cards vs Table) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewFormat('cards')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'cards'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cards View"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewFormat('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'table'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Master Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Filter Pills for Status Effects Subpage */}
        {activeSubpage === 'status-effects' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 text-xs">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Filter:</span>
              {(
                [
                  'All',
                  'Elemental Debilitations',
                  'Instant Death Effects',
                  'Stat Reduction Debilitations',
                  'Sealing Debuffs',
                  'Max Health Reduction',
                  'Damage Over Time',
                  'Mobility Reduction',
                  'Coating Status',
                  'Buffs & Enhancements'
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedStatusCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedStatusCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle (Cards vs Table) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewFormat('cards')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'cards'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cards View"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewFormat('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'table'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Master Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Filter Pills for Flow of Combat Subpage */}
        {activeSubpage === 'flow-of-combat' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 text-xs">
            {/* Season Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Season:</span>
              {(
                [
                  'All',
                  'Core Combat (All Seasons)',
                  'Season 1: Alchemized',
                  'Season 2: Infected',
                  'Season 3: War-Ready',
                  'Season 3: Blaze'
                ] as const
              ).map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedCombatSeason(season)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCombatSeason === season
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>

            {/* View Toggle (Cards vs Table) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewFormat('cards')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'cards'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cards View"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewFormat('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'table'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Master Matrix Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Filter Pills for Pawn Orders Subpage */}
        {activeSubpage === 'pawn-orders' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 text-xs">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Category:</span>
              {(
                [
                  'All',
                  'Basic Orders',
                  'Advanced Orders',
                  'Attribute Orders',
                  'Special Orders'
                ] as const
              ).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedPawnOrderCategory(category)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedPawnOrderCategory === category
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}

              {/* Must-Have Toggle */}
              <button
                onClick={() => setOnlyMustHaveOrders(!onlyMustHaveOrders)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ml-1 ${
                  onlyMustHaveOrders
                    ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-300'
                    : 'bg-slate-800/80 text-amber-400/80 border border-amber-500/30 hover:bg-amber-500/10'
                }`}
              >
                <span>⭐ Must-Have Only</span>
              </button>
            </div>

            {/* View Toggle (Cards vs Table) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewFormat('cards')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'cards'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cards View"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewFormat('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'table'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Master Orders Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Filter Pills for Limit Breaks Subpage */}
        {activeSubpage === 'limit-breaks' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 text-xs">
            {/* Category & Priority Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0 flex-wrap">
              <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Slot:</span>
              {(['All', 'Weapon', 'Armor'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedLimitBreakCategory(category)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedLimitBreakCategory === category
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {category === 'All' ? 'All Slots' : category}
                </button>
              ))}

              <span className="text-slate-500 font-mono text-[11px] uppercase ml-2 mr-1 shrink-0">Priority:</span>
              {(['All', 'Top Tier', 'Situational', 'Low Priority'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedLimitBreakTier(tier)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedLimitBreakTier === tier
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* View Toggle (Cards vs Table) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewFormat('cards')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'cards'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cards View"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewFormat('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewFormat === 'table'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Master Limit Breaks Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SUBPAGE 1: SECRET AUGMENTS COMPENDIUM                                      */}
      {/* ========================================================================= */}
      {activeSubpage === 'secret-augments' && (
        <div className="space-y-6">
          {/* Symbol Legend Reference Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Secret Augment Symbol Legend & Cost System</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <span className="text-base font-black text-amber-400 shrink-0">△</span>
                <div>
                  <h4 className="font-bold text-slate-200">Season 1 BO Tree</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Unlocked using Blood Orbs in the Great Temple tree.
                  </p>
                </div>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <span className="text-base font-black text-purple-400 shrink-0">◇</span>
                <div>
                  <h4 className="font-bold text-slate-200">Consumable Item Scroll</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Learned by consuming an item scroll. Often has a lower equip cost (e.g. 5 / 2).
                  </p>
                </div>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <span className="text-base font-black text-emerald-400 shrink-0">⬠</span>
                <div>
                  <h4 className="font-bold text-slate-200">Combo Accessory</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Built-in passive inside combo rings (e.g. <em>Inquiry</em>, <em>Myrmidon</em>, <em>Night Emperor</em>).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>Showing {filteredAugments.length} of {SECRET_AUGMENTS_DATA.length} Secret Augments</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* VIEW MODE 1: FORUM CARDS */}
          {viewFormat === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAugments.map((aug) => {
                return (
                  <article
                    key={aug.id}
                    className={`bg-slate-900/95 border rounded-2xl p-5 shadow-xl transition-all relative overflow-hidden flex flex-col justify-between ${
                      aug.isWorking === false
                        ? 'border-red-900/60 bg-red-950/20'
                        : 'border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
                              {aug.name}
                            </h3>
                            {/* Cost Pill */}
                            <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              Cost: {aug.costDisplay}
                            </span>
                            {/* Symbols */}
                            <div className="flex items-center gap-1 text-sm font-black">
                              {aug.symbols.bloodOrbTree && (
                                <span className="text-amber-400" title="Blood Orb Tree (△)">△</span>
                              )}
                              {aug.symbols.itemConsumable && (
                                <span className="text-purple-400" title="Item Consumable (◇)">◇</span>
                              )}
                              {aug.symbols.comboAccessory && (
                                <span className="text-emerald-400" title="Combo Accessory (⬠)">⬠</span>
                              )}
                            </div>
                            {aug.isWorking === false && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-900/80 text-red-300 border border-red-700">
                                ⚠️ Bugged
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-mono">
                            {aug.category}
                          </span>
                        </div>

                        {aug.comboName && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 shrink-0">
                            {aug.comboName}
                          </span>
                        )}
                      </div>

                      {/* Description & Level Up Effect */}
                      <div className="mt-3 space-y-2 text-xs sm:text-sm">
                        <p className="text-slate-200 leading-relaxed font-medium">
                          {aug.description}
                        </p>

                        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-400">Level Up Effect:</span>
                          <span className="text-amber-400 font-bold">{aug.levelUpEffect}</span>
                        </div>

                        {/* Details and Usage */}
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 mt-2">
                          <h4 className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-1">
                            Details & Usage:
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {aug.detailsAndUsage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Acquisition & Tags Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-300 font-semibold">Acquisition:</strong>{' '}
                        <span className="text-amber-300/90">{aug.acquisition}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-1 flex-wrap pt-1">
                        {aug.tags.map((tag, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => setSearchQuery(tag)}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30 transition-colors cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 2: MASTER TABLE */}
          {viewFormat === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                      <th className="p-3.5">Name & Cost</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5">Level Up Effect</th>
                      <th className="p-3.5">Details & Usage</th>
                      <th className="p-3.5">Acquisition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredAugments.map((aug) => (
                      <tr
                        key={aug.id}
                        className={`hover:bg-slate-850/80 transition-colors ${
                          aug.isWorking === false ? 'bg-red-950/20' : ''
                        }`}
                      >
                        <td className="p-3.5 align-top font-bold text-slate-100 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{aug.name}</span>
                            <span className="font-mono text-amber-400">({aug.costDisplay})</span>
                            <div className="flex items-center gap-0.5 text-xs">
                              {aug.symbols.bloodOrbTree && <span className="text-amber-400">△</span>}
                              {aug.symbols.itemConsumable && <span className="text-purple-400">◇</span>}
                              {aug.symbols.comboAccessory && <span className="text-emerald-400">⬠</span>}
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                            {aug.category}
                          </span>
                        </td>
                        <td className="p-3.5 align-top leading-relaxed max-w-xs">
                          {aug.description}
                        </td>
                        <td className="p-3.5 align-top font-mono text-amber-400 whitespace-nowrap">
                          {aug.levelUpEffect}
                        </td>
                        <td className="p-3.5 align-top leading-relaxed text-slate-300 max-w-sm">
                          {aug.detailsAndUsage}
                        </td>
                        <td className="p-3.5 align-top text-amber-300/90 text-[11px] max-w-xs">
                          {aug.acquisition}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredAugments.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">
                No Secret Augments found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;Effect Extension&rdquo;, &ldquo;Flow&rdquo;, &ldquo;Willpower&rdquo;, &ldquo;Inquiry&rdquo;, or &ldquo;BO Tree&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAugmentCategory('All');
                  setSelectedSymbolFilter('All');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 2: SPECIAL ACCESSORIES & CREST AUGMENTS COMPENDIUM                */}
      {/* ========================================================================= */}
      {activeSubpage === 'special-accessories' && (
        <div className="space-y-6">
          {/* Overview & Job Emblem Rules Banner */}
          <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Special Accessories & Job Emblem Crest System</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {SPECIAL_ACCESSORIES_OVERVIEW.description}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SPECIAL_ACCESSORIES_OVERVIEW.emblemRules.map((rule, rIdx) => (
                <div
                  key={rIdx}
                  className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
                >
                  <span className="text-amber-400 font-bold shrink-0">✦</span>
                  <span className="leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>Showing {filteredAccessories.length} of {SPECIAL_ACCESSORIES_DATA.length} Special Accessories</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* VIEW MODE 1: FORUM CARDS VIEW */}
          {viewFormat === 'cards' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredAccessories.map((acc) => (
                <article
                  key={acc.id}
                  className="bg-slate-900/95 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-slate-100">
                            {acc.name}
                          </h3>
                          <span className="text-emerald-400 font-black text-sm">{acc.symbol}</span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {acc.grade}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs font-mono text-slate-400 flex-wrap">
                          <span>{acc.category}</span>
                          <span>•</span>
                          <span className="text-slate-300">{acc.type}</span>
                        </div>
                      </div>

                      {/* Usability & Lock Badges */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {acc.vocationLocked ? (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800">
                            🔒 Vocation-Locked
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            🌐 Universal
                          </span>
                        )}

                        {acc.id === 'supreme-myrmidon' ? (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                            👑 Arisen Wears (Buffs Pawns)
                          </span>
                        ) : acc.id === 'supreme-inquiry' ? (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800">
                            🧭 Arisen Only
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                            🛡️ Arisen & Pawns Usable
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bonus Stats Bar (if applicable) */}
                    {acc.bonusStats && (
                      <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-1.5 text-xs">
                        <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                          <span className="font-bold text-amber-400">Accessory Bonus Stats:</span>
                          <span className="text-[10px] text-slate-500 italic">*Stats do not carry to Job Emblem</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                          {acc.bonusStats.physAtk && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-bold border border-slate-800">
                              +7 Phys Atk
                            </span>
                          )}
                          {acc.bonusStats.magAtk && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-blue-300 font-bold border border-slate-800">
                              +7 Mag Atk
                            </span>
                          )}
                          {acc.bonusStats.hp && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-300 font-bold border border-slate-800">
                              +{acc.bonusStats.hp} HP
                            </span>
                          )}
                          {acc.bonusStats.stamina && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-bold border border-slate-800">
                              +{acc.bonusStats.stamina} Stamina
                            </span>
                          )}
                          {acc.bonusStats.endurance && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-purple-300 font-bold border border-slate-800">
                              +{acc.bonusStats.endurance} Endurance
                            </span>
                          )}
                          {acc.bonusStats.chanceAttack && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-rose-300 font-bold border border-slate-800">
                              +{acc.bonusStats.chanceAttack} Chance Atk
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Included Effects List */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Included Augment Effects ({acc.effects.length} Effects / 1 Augment Slot):
                      </h4>
                      <div className="space-y-1.5">
                        {acc.effects.map((eff, eIdx) => (
                          <div
                            key={eIdx}
                            className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                          >
                            <span className="font-bold text-slate-200">{eff.name}</span>
                            <span className="text-amber-400 font-mono text-[11px] sm:text-right">
                              {eff.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explanation & Tactical Notes */}
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 space-y-2 text-xs">
                      <div>
                        <strong className="text-slate-300 font-semibold block mb-0.5">Explanation:</strong>
                        <p className="text-slate-300 leading-relaxed">{acc.explanation}</p>
                      </div>
                      <div>
                        <strong className="text-amber-400/90 font-semibold block mb-0.5">Notes & Rules:</strong>
                        <p className="text-slate-400 leading-relaxed">{acc.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer & Tags */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div className="flex items-center gap-1 flex-wrap">
                      {acc.tags.map((t, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setSearchQuery(t)}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30 transition-colors cursor-pointer"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigateToTab && onNavigateToTab('journal')}
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask Assistant</span>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: MASTER TABLE VIEW */}
          {viewFormat === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                      <th className="p-3.5">Name & Type</th>
                      <th className="p-3.5">Included Effects</th>
                      <th className="p-3.5">Explanation</th>
                      <th className="p-3.5">Notes & Stats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredAccessories.map((acc) => (
                      <tr key={acc.id} className="hover:bg-slate-850/80 transition-colors">
                        <td className="p-3.5 align-top font-bold text-slate-100 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{acc.name}</span>
                            <span className="text-emerald-400">⬠</span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-400 block mt-0.5">
                            {acc.type}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 block">
                            {acc.category}
                          </span>
                        </td>
                        <td className="p-3.5 align-top space-y-1 max-w-sm">
                          {acc.effects.map((eff, eIdx) => (
                            <div key={eIdx} className="text-xs">
                              <span className="font-semibold text-slate-200">{eff.name}:</span>{' '}
                              <span className="text-amber-300/90 font-mono text-[11px]">{eff.detail}</span>
                            </div>
                          ))}
                        </td>
                        <td className="p-3.5 align-top leading-relaxed text-slate-300 max-w-xs">
                          {acc.explanation}
                        </td>
                        <td className="p-3.5 align-top text-slate-400 text-xs leading-relaxed max-w-xs">
                          {acc.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredAccessories.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">
                No Special Accessories found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;Myrmidon&rdquo;, &ldquo;Inquiry&rdquo;, &ldquo;Purge&rdquo;, &ldquo;Night Emperor&rdquo;, &ldquo;Dashing&rdquo;, or &ldquo;Blessing&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAccessoryCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 3: STATS EXPLANATION & DAMAGE FORMULA COMPENDIUM                   */}
      {/* ========================================================================= */}
      {activeSubpage === 'stats-explanation' && (
        <div className="space-y-6">
          {/* Overview & Quick Formulas Banner */}
          <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Core Combat Stats & Penetration Mechanics Guide</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every stat in Dragon&apos;s Dogma Online interacts with specific hidden gauges, penetration caps, and diminishing return thresholds. Understanding these mechanics ensures you allocate Blood Orbs, Limit Breaks, and Vocation Emblem stats with maximum efficiency.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-amber-400 font-bold font-mono text-[11px] uppercase">Penetration Rate Cap</span>
                <span className="text-slate-300 leading-relaxed">Capped at 1.0 ratio (~5 levels above monster). Over-stacking raw attack past cap gives 0 penetration gain.</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-emerald-400 font-bold font-mono text-[11px] uppercase">Recovery Limit (Cap 100)</span>
                <span className="text-slate-300 leading-relaxed">#1 Armor Limit Break stat. Governs gray recoverable HP retention (100 = 100% damage retained).</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-cyan-400 font-bold font-mono text-[11px] uppercase">Weight & Stamina Regen</span>
                <span className="text-slate-300 leading-relaxed">Encumbrance tiers dictate stamina recovery. Height sliders have zero effect on stamina or speed.</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-purple-400 font-bold font-mono text-[11px] uppercase">STR / MGK Scaling</span>
                <span className="text-slate-300 leading-relaxed">Diminishing returns kick in past 200 and 300. Species Slayer multipliers outperform raw stats late-game.</span>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>Showing {filteredStats.length} of {STATS_EXPLANATION_DATA.length} Core Stats</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* VIEW MODE 1: FORUM CARDS VIEW */}
          {viewFormat === 'cards' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredStats.map((stat) => (
                <article
                  key={stat.id}
                  className="bg-slate-900/95 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-slate-100">
                            {stat.name}
                          </h3>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {stat.category}
                          </span>
                        </div>
                        {stat.aliases && stat.aliases.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-slate-400 flex-wrap">
                            <span className="text-slate-500">Also known as:</span>
                            {stat.aliases.map((alias, aIdx) => (
                              <span key={aIdx} className="text-slate-300 bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800">
                                {alias}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Associated Vocations */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {stat.associatedVocations[0]}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs text-amber-300 font-medium leading-relaxed">
                      {stat.shortDesc}
                    </div>

                    {/* Full Explanation */}
                    <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-200 font-semibold block">Full Explanation:</strong>
                      <p>{stat.fullExplanation}</p>
                    </div>

                    {/* Cap or Scaling Formula Callout */}
                    <div className="bg-slate-950/90 p-3 rounded-xl border border-amber-500/30 flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-[11px] uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Cap, Diminishing Returns & Scaling:</span>
                      </div>
                      <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                        {stat.capOrScaling}
                      </p>
                    </div>

                    {/* Brackets Table (if applicable, e.g. Weight or STR/MGK) */}
                    {stat.bracketsTable && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Thresholds & Progression Brackets:
                        </h4>
                        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                                <th className="p-2">Range / Bracket</th>
                                <th className="p-2">Effect / Tier</th>
                                <th className="p-2">Combat Impact</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80 text-slate-300 text-[11px]">
                              {stat.bracketsTable.map((bracket, bIdx) => (
                                <tr key={bIdx} className="hover:bg-slate-850/50">
                                  <td className="p-2 font-mono font-bold text-amber-400 whitespace-nowrap">
                                    {bracket.range}
                                  </td>
                                  <td className="p-2 font-semibold text-slate-200 whitespace-nowrap">
                                    {bracket.effect}
                                  </td>
                                  <td className="p-2 text-slate-400">
                                    {bracket.note}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Key Tactics & Rules */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Key Tactics & Rules:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {stat.keyTactics.map((tactic, tIdx) => (
                          <li key={tIdx} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">✦</span>
                            <span className="leading-relaxed">{tactic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Benchmark */}
                    <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60 flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">Recommended Benchmark:</span>
                      <span className="text-amber-300 font-mono font-bold text-[11px] text-right">
                        {stat.recommendedTargets}
                      </span>
                    </div>
                  </div>

                  {/* Footer & Tags */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div className="flex items-center gap-1 flex-wrap">
                      {stat.tags.map((t, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setSearchQuery(t)}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30 transition-colors cursor-pointer"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigateToTab && onNavigateToTab('journal')}
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask Assistant</span>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: MASTER TABLE VIEW */}
          {viewFormat === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                      <th className="p-3.5">Stat & Category</th>
                      <th className="p-3.5">Full In-Game Explanation</th>
                      <th className="p-3.5">Cap / Diminishing Returns</th>
                      <th className="p-3.5">Key Mechanics & Vocations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredStats.map((stat) => (
                      <tr key={stat.id} className="hover:bg-slate-850/80 transition-colors">
                        <td className="p-3.5 align-top font-bold text-slate-100 whitespace-nowrap">
                          <div className="text-sm font-black text-amber-300">{stat.name}</div>
                          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                            {stat.category}
                          </span>
                          {stat.aliases && (
                            <span className="text-[10px] font-mono text-slate-500 block">
                              {stat.aliases.join(', ')}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 align-top space-y-1.5 max-w-sm">
                          <p className="text-xs leading-relaxed text-slate-300">{stat.fullExplanation}</p>
                          {stat.bracketsTable && (
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] font-mono space-y-0.5">
                              {stat.bracketsTable.map((b, bIdx) => (
                                <div key={bIdx} className="text-slate-400">
                                  <span className="text-amber-400 font-bold">{b.range}:</span> {b.effect} ({b.note})
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5 align-top text-xs leading-relaxed text-amber-300/90 font-mono max-w-xs">
                          {stat.capOrScaling}
                        </td>
                        <td className="p-3.5 align-top text-slate-300 text-xs leading-relaxed max-w-xs space-y-1">
                          <div className="text-slate-400 font-mono text-[11px]">
                            <strong className="text-slate-300">Vocations:</strong> {stat.associatedVocations.join(', ')}
                          </div>
                          <div className="text-slate-400 font-mono text-[11px]">
                            <strong className="text-slate-300">Benchmark:</strong> {stat.recommendedTargets}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredStats.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">
                No Stats found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;Penetration&rdquo;, &ldquo;Weight&rdquo;, &ldquo;Stamina&rdquo;, &ldquo;Recovery Limit&rdquo;, &ldquo;Knockdown&rdquo;, &ldquo;Chance Attack&rdquo;, or &ldquo;Diminishing&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 4: STATUS EFFECTS & DEBILITATIONS COMPENDIUM                      */}
      {/* ========================================================================= */}
      {activeSubpage === 'status-effects' && (
        <div className="space-y-6">
          {/* Overview & Accumulation Rules Banner */}
          <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{STATUS_ACCUMULATION_OVERVIEW.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {STATUS_ACCUMULATION_OVERVIEW.description}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-amber-400 font-bold font-mono text-[11px] uppercase">Hit-Count Accumulation</span>
                <span className="text-slate-300 leading-relaxed">Multi-hit rapid skills apply low buildup per hit; heavy slow strikes deliver high burst accumulation.</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-emerald-400 font-bold font-mono text-[11px] uppercase">Equipped Crest Buildup</span>
                <span className="text-slate-300 leading-relaxed">All physical attacks accumulate non-elemental debuffs if the appropriate crest or augment is equipped.</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-cyan-400 font-bold font-mono text-[11px] uppercase">Dynamic Resistance</span>
                <span className="text-slate-300 leading-relaxed">Enemies build rising resistance thresholds after each trigger, eventually reaching temporary/full immunity.</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-purple-400 font-bold font-mono text-[11px] uppercase">Non-Cleanseable Debuffs</span>
                <span className="text-slate-300 leading-relaxed">Cursed (halves Max HP) and Weakness (+15% damage) cannot be item/skill cured—require Inn rest or relog.</span>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>Showing {filteredStatusEffects.length} of {STATUS_EFFECTS_DATA.length} Status Effects & Debilitations</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* VIEW MODE 1: FORUM CARDS VIEW */}
          {viewFormat === 'cards' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredStatusEffects.map((status) => (
                <article
                  key={status.id}
                  className="bg-slate-900/95 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0">
                          {status.icon}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-slate-100">
                            {status.name}
                          </h3>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-block mt-0.5">
                            {status.category}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                        {status.tags[0]}
                      </span>
                    </div>

                    {/* Accumulation Trigger Requirement */}
                    <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2 text-xs">
                      <span className="text-amber-400 font-mono font-bold text-[11px] uppercase shrink-0">Trigger / Gauge:</span>
                      <span className="text-slate-300 font-mono text-[11px]">{status.accumulationMethod}</span>
                    </div>

                    {/* Comparative Breakdown: Ally vs Foe */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {/* Effect on You & Allies */}
                      <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-3 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-rose-400 font-mono font-bold text-[11px] uppercase">
                          <span>🛡️ Effect on You & Allies:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {status.effectOnAllies}
                        </p>
                      </div>

                      {/* Effect on Foes */}
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-[11px] uppercase">
                          <span>⚔️ Effect on Foes:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {status.effectOnFoes}
                        </p>
                      </div>
                    </div>

                    {/* Cleansing & Remedies */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Cleansing & Remedies:
                      </h4>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {status.cleanseMethods.map((method, mIdx) => (
                          <span
                            key={mIdx}
                            className="text-[11px] font-mono px-2 py-0.8 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tactical Notes / Pro Advice */}
                    <div className="bg-slate-950/90 p-3 rounded-xl border border-amber-500/30 flex items-start gap-2 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-amber-400 font-mono font-bold text-[11px] uppercase block">Tactical Takeaway:</span>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {status.tacticalNotes}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer & Tags */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div className="flex items-center gap-1 flex-wrap">
                      {status.tags.map((t, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setSearchQuery(t)}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30 transition-colors cursor-pointer"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigateToTab && onNavigateToTab('journal')}
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask Assistant</span>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: MASTER TABLE VIEW */}
          {viewFormat === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                      <th className="p-3.5">Status & Category</th>
                      <th className="p-3.5">Trigger / Accumulation</th>
                      <th className="p-3.5">Effect on You & Allies</th>
                      <th className="p-3.5">Effect on Foes</th>
                      <th className="p-3.5">Cleansing & Remedies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredStatusEffects.map((status) => (
                      <tr key={status.id} className="hover:bg-slate-850/80 transition-colors">
                        <td className="p-3.5 align-top font-bold text-slate-100 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{status.icon}</span>
                            <div>
                              <div className="text-sm font-black text-amber-300">{status.name}</div>
                              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                                {status.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 align-top text-xs font-mono text-amber-300/90 max-w-xs leading-relaxed">
                          {status.accumulationMethod}
                        </td>
                        <td className="p-3.5 align-top space-y-1 max-w-xs text-xs text-rose-200/90 leading-relaxed">
                          <p>{status.effectOnAllies}</p>
                        </td>
                        <td className="p-3.5 align-top space-y-1 max-w-xs text-xs text-emerald-200/90 leading-relaxed">
                          <p>{status.effectOnFoes}</p>
                          <span className="text-[10px] font-mono text-amber-400 block mt-1">
                            ✦ {status.tacticalNotes}
                          </span>
                        </td>
                        <td className="p-3.5 align-top text-slate-300 text-xs leading-relaxed max-w-xs space-y-1">
                          <div className="flex items-center gap-1 flex-wrap">
                            {status.cleanseMethods.map((c, cIdx) => (
                              <span key={cIdx} className="text-[10px] font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredStatusEffects.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">
                No Status Effects found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;Burning&rdquo;, &ldquo;Frozen&rdquo;, &ldquo;Shock&rdquo;, &ldquo;Holy Drain&rdquo;, &ldquo;Cursed&rdquo;, &ldquo;Petrification&rdquo;, &ldquo;Torpor&rdquo;, &ldquo;Tarred&rdquo;, or &ldquo;Enhance&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatusCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 5: FLOW OF COMBAT & SEASONAL GIMMICKS                             */}
      {/* ========================================================================= */}
      {activeSubpage === 'flow-of-combat' && (
        <div className="space-y-6">
          {/* Overview & Combat Loop Sequence Banner */}
          <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Core Combat Progression & Season Gimmick Matrix</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Dragon&apos;s Dogma Online combat revolves around manipulating enemy states, staggering defenses, and executing coordinated burst phases during the Downed window.
            </p>

            {/* Step-by-Step Flow Ribbon */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 block">STEP 01</span>
                  <span className="font-bold text-slate-200 text-xs mt-0.5 block">Normal State</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-2">1.0x baseline damage intake. Burst HP to force Enrage.</span>
              </div>

              <div className="bg-rose-950/30 p-3 rounded-xl border border-rose-500/40 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-400 block">STEP 02</span>
                  <span className="font-bold text-rose-300 text-xs mt-0.5 block">Enraged Phase</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-2">~70% Damage Cut! Fill Break Gauge with Knockdown.</span>
              </div>

              <div className="bg-cyan-950/30 p-3 rounded-xl border border-cyan-500/40 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 block">STEP 03</span>
                  <span className="font-bold text-cyan-300 text-xs mt-0.5 block">Tired (Shake)</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-2">Blue stamina bar! Climb & Shake together with Exhaust Atk.</span>
              </div>

              <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/40 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 block">STEP 04</span>
                  <span className="font-bold text-amber-300 text-xs mt-0.5 block">Exhausted</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-2">0 Stamina wobble! Land Chance Attack blows to topple.</span>
              </div>

              <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/40 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 block">STEP 05</span>
                  <span className="font-bold text-emerald-300 text-xs mt-0.5 block">Downed (Burst)</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-2">+50% Bonus Damage from all attacks for 10–20 seconds!</span>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>Showing {filteredCombatFlow.length} of {COMBAT_FLOW_DATA.length} Combat Systems & Season Mechanics</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* VIEW MODE 1: FORUM CARDS VIEW */}
          {viewFormat === 'cards' && (
            <div className="space-y-6">
              {filteredCombatFlow.map((system) => (
                <article
                  key={system.id}
                  className="bg-slate-900/95 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl transition-all space-y-5"
                >
                  {/* System Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
                        {system.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-black text-slate-100">
                            {system.name}
                          </h3>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {system.seasonCategory}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                          {system.overview}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Stats & Audio Visual Cues Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                        ✦ Key Associated Stats & Skills:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {system.keyStatsAndSkills.map((stat, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                        🔊 Audio / Visual Signals & Alerts:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {system.audioVisualCues.map((cue, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300/90 border border-cyan-500/30"
                          >
                            {cue}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sequential States List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Phase & State Transitions:
                    </h4>

                    <div className="grid grid-cols-1 gap-3.5">
                      {system.states.map((state, stIdx) => (
                        <div
                          key={stIdx}
                          className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                                {stIdx + 1}
                              </span>
                              <h5 className="font-bold text-slate-100 text-sm">
                                {state.stateName}
                              </h5>
                            </div>
                            {state.badge && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 w-fit">
                                {state.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed font-medium">
                            {state.summary}
                          </p>

                          {/* Mechanics Bullets */}
                          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                              Detailed Mechanics & Rules:
                            </span>
                            <ul className="space-y-1">
                              {state.mechanics.map((m, mIdx) => (
                                <li key={mIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                                  <span className="text-amber-400 font-bold">•</span>
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tactical Tips */}
                          {state.tacticalTips && state.tacticalTips.length > 0 && (
                            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 space-y-1 text-xs">
                              <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-[11px] uppercase">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Tactical Advice / Execution:</span>
                              </div>
                              <ul className="space-y-0.5">
                                {state.tacticalTips.map((tip, tIdx) => (
                                  <li key={tIdx} className="text-slate-300 text-xs flex items-start gap-1.5">
                                    <span className="text-amber-400">✦</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Tags */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div className="flex items-center gap-1 flex-wrap">
                      {system.tags.map((t, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setSearchQuery(t)}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30 transition-colors cursor-pointer"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigateToTab && onNavigateToTab('journal')}
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask Assistant</span>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: MASTER MATRIX TABLE VIEW */}
          {viewFormat === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                      <th className="p-3.5">System & Season</th>
                      <th className="p-3.5">State & Phase</th>
                      <th className="p-3.5">Core Trigger & Mechanics</th>
                      <th className="p-3.5">Tactical Strategy & Multipliers</th>
                      <th className="p-3.5">Audio/Visual Cues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredCombatFlow.flatMap((system) =>
                      system.states.map((state, sIdx) => (
                        <tr key={`${system.id}-${sIdx}`} className="hover:bg-slate-850/80 transition-colors">
                          {sIdx === 0 && (
                            <td
                              rowSpan={system.states.length}
                              className="p-3.5 align-top font-bold text-slate-100 bg-slate-950/40 border-r border-slate-800 max-w-[200px]"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{system.icon}</span>
                                <div>
                                  <div className="text-sm font-black text-amber-300">{system.name}</div>
                                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                                    {system.seasonCategory}
                                  </span>
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="p-3.5 align-top font-bold text-slate-200 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className="text-xs text-slate-100">{state.stateName}</span>
                              {state.badge && (
                                <span className="text-[9px] font-mono block px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 w-fit">
                                  {state.badge}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3.5 align-top space-y-1 text-xs text-slate-300 leading-relaxed max-w-sm">
                            <p className="font-medium text-slate-200 mb-1">{state.summary}</p>
                            <ul className="space-y-0.5">
                              {state.mechanics.map((m, mIdx) => (
                                <li key={mIdx} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                                  <span className="text-amber-400">•</span>
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="p-3.5 align-top space-y-1 text-xs text-emerald-200/90 leading-relaxed max-w-xs">
                            {state.tacticalTips.map((t, tIdx) => (
                              <p key={tIdx} className="text-[11px]">
                                ✦ {t}
                              </p>
                            ))}
                          </td>
                          <td className="p-3.5 align-top text-xs font-mono text-cyan-300/90 leading-relaxed max-w-[160px]">
                            {system.audioVisualCues.join(' • ')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredCombatFlow.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">
                No Combat Flow systems found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;Enraged&rdquo;, &ldquo;Break Gauge&rdquo;, &ldquo;Shake&rdquo;, &ldquo;Exhausted&rdquo;, &ldquo;Alchemized&rdquo;, &ldquo;Tentacles&rdquo;, &ldquo;War-Ready&rdquo;, &ldquo;Blow Damage&rdquo;, or &ldquo;Blaze&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCombatSeason('All');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 6: PAWN ORDERS & TACTICAL DIRECTIVES                              */}
      {/* ========================================================================= */}
      {activeSubpage === 'pawn-orders' && (
        <div className="space-y-6">
          {/* Pawn Orders Overview Banner */}
          <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{PAWN_ORDERS_OVERVIEW.title}</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold w-fit">
                📍 {PAWN_ORDERS_OVERVIEW.menuPath}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {PAWN_ORDERS_OVERVIEW.description}
            </p>

            {/* Tactical Rules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 block uppercase">1. Scope of Control</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Orders only work on your <strong>own Pawns</strong>. They will never alter actions of other players&apos; Pawns.
                </p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-rose-400 block uppercase">2. Cancellation Triggers</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Cancelled by <strong>Cancel Order</strong>, player/pawn death, or straying too far (teleport reset).
                </p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase">3. Order Overrides</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Specific commands override general ones (e.g. <em>Prioritize Enemy Type</em> overrides <em>Change Target</em>).
                </p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 block uppercase">4. Quick Shortcuts</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Always map <strong>Cancel Order</strong>, <strong>Attack</strong>, <strong>Follow</strong>, and <strong>Shake</strong> to your radial wheel.
                </p>
              </div>
            </div>
          </div>

          {/* Results Counter & Controls */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>
              Showing {filteredPawnOrders.length} of {PAWN_ORDERS_DATA.length} Pawn Commands
              {onlyMustHaveOrders && ' (Must-Have Filter Active)'}
            </span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* VIEW MODE 1: FORUM CARDS VIEW */}
          {viewFormat === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPawnOrders.map((order) => (
                <article
                  key={order.id}
                  className={`bg-slate-900/95 border rounded-2xl p-5 shadow-xl transition-all space-y-4 flex flex-col justify-between ${
                    order.isMustHave
                      ? 'border-amber-500/50 hover:border-amber-400 bg-gradient-to-b from-amber-500/5 to-transparent'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-slate-100">
                            {order.name}
                          </h3>
                          {order.isMustHave && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
                              ⭐ MUST-HAVE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                            {order.category}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                            🎯 {order.targetVocation}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Effect and Usage */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Command Effect & Behavior:
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                        {order.effectAndUsage}
                      </p>
                    </div>

                    {/* Requirements */}
                    {order.requirements && (
                      <div className="text-xs bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-2.5 space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block">
                          ⚙️ Skill / Vocation Requirement:
                        </span>
                        <p className="text-cyan-200/90 text-[11px]">{order.requirements}</p>
                      </div>
                    )}

                    {/* Tactical Notes */}
                    <div className="text-xs bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 space-y-0.5">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
                        💡 Tactical Usage & Advice:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{order.tacticalNotes}</p>
                    </div>
                  </div>

                  {/* Footer Tags */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1 flex-wrap">
                      {order.tags.map((t, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setSearchQuery(t)}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 transition-colors cursor-pointer"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigateToTab && onNavigateToTab('journal')}
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask Assistant</span>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: MASTER TABLE VIEW */}
          {viewFormat === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Order Name</th>
                      <th className="p-3.5">Target Vocation & Reqs</th>
                      <th className="p-3.5">Effect & Behavioral Changes</th>
                      <th className="p-3.5">Tactical Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredPawnOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-850/80 transition-colors">
                        <td className="p-3.5 align-top font-mono text-[11px] text-amber-300/90 whitespace-nowrap">
                          {order.category}
                        </td>
                        <td className="p-3.5 align-top whitespace-nowrap">
                          <div className="space-y-1">
                            <span className="font-bold text-slate-100 text-xs block">{order.name}</span>
                            {order.isMustHave && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 inline-block">
                                ⭐ MUST-HAVE
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 align-top max-w-[180px]">
                          <span className="text-[11px] font-mono text-cyan-300 block mb-1">
                            {order.targetVocation}
                          </span>
                          {order.requirements && (
                            <span className="text-[10px] text-slate-400 block bg-slate-950/60 p-1.5 rounded border border-slate-800">
                              {order.requirements}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 align-top text-xs text-slate-200 leading-relaxed max-w-sm whitespace-pre-line">
                          {order.effectAndUsage}
                        </td>
                        <td className="p-3.5 align-top text-xs text-emerald-300/90 leading-relaxed max-w-xs">
                          {order.tacticalNotes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredPawnOrders.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">
                No Pawn Orders found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;Attack&rdquo;, &ldquo;Follow&rdquo;, &ldquo;Shake&rdquo;, &ldquo;Enchant&rdquo;, &ldquo;Heal&rdquo;, &ldquo;Secret Core&rdquo;, &ldquo;Cancel Order&rdquo;, or &ldquo;Energy Spot&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPawnOrderCategory('All');
                  setOnlyMustHaveOrders(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 7: LIMIT BREAKS & 4-STAR AFFIX SYSTEM                             */}
      {/* ========================================================================= */}
      {activeSubpage === 'limit-breaks' && (
        <div className="space-y-6">
          {/* Limit Breaks Overview Banner */}
          <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{LIMIT_BREAKS_OVERVIEW.title}</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold w-fit">
                ⭐ {LIMIT_BREAKS_OVERVIEW.unlockRequirement}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {LIMIT_BREAKS_OVERVIEW.description}
            </p>

            {/* NPC Locations and Core Rules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 block uppercase">1. Managing Crafters</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>Craig</strong> in Craft Room (Temple) or <strong>Suleiman</strong> in Megado Workshop.
                </p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-rose-400 block uppercase">2. Currency & Tickets</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Rift Crystal (RC) max roll odds are tiny. Always prefer <strong>Limit Break Tickets</strong> &amp; <strong>Golden Gemstones</strong>.
                </p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase">3. All-In Focus Strategy</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Always specialize: stack <strong>single dominant effects</strong> rather than spreading rolls across random stats.
                </p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 block uppercase">4. Stat Caps</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>Recovery Limit</strong> caps at 100 (+5 Emblem, +95 gear). <strong>Resist Debilitation</strong> caps at 100 (100% immunity).
                </p>
              </div>
            </div>
          </div>

          {/* Results Counter & Controls */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>
              Showing {filteredLimitBreaks.length} of {LIMIT_BREAKS_DATA.length} Limit Break Options
              {selectedLimitBreakCategory !== 'All' && ` • Slot: ${selectedLimitBreakCategory}`}
              {selectedLimitBreakTier !== 'All' && ` • Priority: ${selectedLimitBreakTier}`}
            </span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* VIEW MODE 1: CARDS VIEW */}
          {viewFormat === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLimitBreaks.map((item) => {
                const isTopTier = item.priorityTier.startsWith('Top Tier');
                const isSituational = item.priorityTier.startsWith('Situational');

                return (
                  <article
                    key={item.id}
                    className={`bg-slate-900/95 border rounded-2xl p-5 shadow-xl transition-all space-y-4 flex flex-col justify-between ${
                      isTopTier
                        ? 'border-amber-500/50 hover:border-amber-400 bg-gradient-to-b from-amber-500/5 to-transparent'
                        : isSituational
                        ? 'border-cyan-500/30 hover:border-cyan-400'
                        : 'border-slate-800 hover:border-slate-700 opacity-90'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-slate-100">
                              {item.name}
                            </h3>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm ${
                                isTopTier
                                  ? 'bg-amber-400 text-slate-950'
                                  : isSituational
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {isTopTier ? '⭐ TOP TIER' : isSituational ? 'SITUATIONAL' : 'LOW PRIORITY'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                              {item.category === 'Weapon' ? '⚔️ Weapon Roll' : '🛡️ Armor Roll'}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                              {item.tierValue}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          Effect Explanation:
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                          {item.explanation}
                        </p>
                      </div>

                      {/* Numerical Impact / Synergies */}
                      {item.numericalImpact && (
                        <div className="text-xs bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-2.5 space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block">
                            📊 Numerical Impact & Caps:
                          </span>
                          <p className="text-cyan-200/90 text-[11px] font-medium">{item.numericalImpact}</p>
                        </div>
                      )}

                      {/* Usage Cases & Suggestions */}
                      <div className="text-xs bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
                          💡 Usage Cases & Suggestions:
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{item.usageCasesAndSuggestions}</p>
                      </div>
                    </div>

                    {/* Footer Tags */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1 flex-wrap">
                        {item.tags.map((t, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => setSearchQuery(t)}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 transition-colors cursor-pointer"
                          >
                            #{t}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => onNavigateToTab && onNavigateToTab('journal')}
                        className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ask Assistant</span>
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 2: MASTER TABLE VIEW */}
          {viewFormat === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                      <th className="p-3.5">Slot & Value</th>
                      <th className="p-3.5">Option Name</th>
                      <th className="p-3.5">Priority Tier</th>
                      <th className="p-3.5">Explanation & Impact</th>
                      <th className="p-3.5">Usage Cases & Suggestions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredLimitBreaks.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-850/80 transition-colors">
                        <td className="p-3.5 align-top whitespace-nowrap">
                          <span className="font-mono text-[11px] text-amber-300/90 block font-bold">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                            {item.tierValue}
                          </span>
                        </td>
                        <td className="p-3.5 align-top whitespace-nowrap">
                          <span className="font-bold text-slate-100 text-xs block">{item.name}</span>
                        </td>
                        <td className="p-3.5 align-top whitespace-nowrap">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded inline-block ${
                              item.priorityTier.startsWith('Top Tier')
                                ? 'bg-amber-400 text-slate-950'
                                : item.priorityTier.startsWith('Situational')
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.priorityTier.startsWith('Top Tier') ? 'Top Tier' : item.priorityTier.startsWith('Situational') ? 'Situational' : 'Low Priority'}
                          </span>
                        </td>
                        <td className="p-3.5 align-top text-xs text-slate-200 leading-relaxed max-w-sm">
                          <p>{item.explanation}</p>
                          {item.numericalImpact && (
                            <p className="text-[11px] font-mono text-cyan-300 mt-1.5 font-medium">
                              Impact: {item.numericalImpact}
                            </p>
                          )}
                        </td>
                        <td className="p-3.5 align-top text-xs text-slate-300 leading-relaxed max-w-sm">
                          {item.usageCasesAndSuggestions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredLimitBreaks.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">
                No Limit Break options found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;Knockdown&rdquo;, &ldquo;Recovery Limit&rdquo;, &ldquo;Endurance&rdquo;, &ldquo;Defense Down&rdquo;, &ldquo;Poison&rdquo;, &ldquo;Torpor&rdquo;, &ldquo;Golden&rdquo;, or &ldquo;Craig&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLimitBreakCategory('All');
                  setSelectedLimitBreakTier('All');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGES 8-12: FORUM THREAD TOPICS                                        */}
      {/* ========================================================================= */}
      {activeSubpage !== 'secret-augments' && activeSubpage !== 'special-accessories' && activeSubpage !== 'stats-explanation' && activeSubpage !== 'status-effects' && activeSubpage !== 'flow-of-combat' && activeSubpage !== 'pawn-orders' && activeSubpage !== 'limit-breaks' && (
        <div className="space-y-4">
          {filteredThreads.map((thread) => (
            <article
              key={thread.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl transition-all space-y-4"
            >
              {/* Forum Post Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
                    {thread.authorAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-200 text-sm">{thread.author}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                        {thread.authorRank}
                      </span>
                      {thread.pinned && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                          📌 Pinned Thread
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Posted on {thread.postDate} • {thread.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{thread.repliesCount} replies</span>
                  </span>
                  <span>•</span>
                  <span>{thread.viewsCount} views</span>
                </div>
              </div>

              {/* Thread Title */}
              <h2 className="text-lg sm:text-xl font-black text-slate-100">
                {thread.title}
              </h2>

              {/* Post Content */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {thread.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Pro Tips Callout */}
              {thread.tips && thread.tips.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Key Takeaways & Arisen Advice</span>
                  </div>
                  <ul className="space-y-1.5">
                    {thread.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Thread Footer & Tags */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-slate-500">Tags:</span>
                  {thread.tags.map((t, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => setSearchQuery(t)}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30 transition-colors cursor-pointer"
                    >
                      #{t}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setActiveSubpage('secret-augments');
                    setSearchQuery(thread.tags[0]);
                  }}
                  className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>View Related Secret Augments</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Persistent Bottom Jump */}
      <div className="flex justify-center pt-4">
        <button
          onClick={scrollToTop}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to Top</span>
        </button>
      </div>
    </div>
  );
};
