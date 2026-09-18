export type BBMSealTier = 'SS' | 'S+' | 'S' | 'S-' | 'A' | 'B' | 'C' | 'C-' | '?';

export interface BBMBraceletSeal {
  id: string;
  page: 1 | 2 | 3 | 4 | 5 | 6;
  effect: string;
  tier: BBMSealTier;
  max: string;
  category: 'Core Stats' | 'Forces & Slayers' | 'Mobility & Defense' | 'Tactical & Core' | 'Elemental Affinities' | 'Advanced Combat' | 'Debilitation Resists';
  tierDescription: string;
  recommendedAction: 'Keep' | 'Keep or Discard' | 'Seal (Niche Keep)' | 'Seal' | 'Situational';
  explanation: string;
  vocations?: string[];
}

export interface BBMEarringAttribute {
  id: string;
  name: string;
  slash: string;
  impact: string;
  piercing: string;
  nullType: string;
  fire: string;
  ice: string;
  thunder: string;
  holy: string;
  dark: string;
  maxValue: string;
  tier: BBMSealTier;
  tierDescription: string;
  recommendedAction: 'Keep' | 'Keep or Discard' | 'Seal (Niche Keep)' | 'Seal' | 'Situational';
  bestVocations: string[];
  notes: string;
}

export interface BBMEarringMatrixCell {
  value: string;
  isRed?: boolean;
}

export interface BBMVocationEarringMatrixRow {
  vocation: string;
  slash: BBMEarringMatrixCell;
  impact: BBMEarringMatrixCell;
  piercing: BBMEarringMatrixCell;
  nullType: BBMEarringMatrixCell;
  fire: BBMEarringMatrixCell;
  ice: BBMEarringMatrixCell;
  thunder: BBMEarringMatrixCell;
  holy: BBMEarringMatrixCell;
  dark: BBMEarringMatrixCell;
  maxValue: string;
  isMaxBold?: boolean;
}

export const TIER_DEFINITIONS: Record<BBMSealTier, { label: string; meaning: string; badgeColor: string; action: string }> = {
  SS: {
    label: 'SS Tier',
    meaning: 'Absolute Highest Priority. Flat +30 Physical Attack & Magick Attack rolls. Never seal.',
    badgeColor: 'bg-red-500/25 text-red-300 border-red-500/60 font-black',
    action: 'Must Keep Always'
  },
  'S+': {
    label: 'S+ Tier',
    meaning: 'Best Elemental debuff, most universal one, works fine on current endgame stuff (Ice Force 100).',
    badgeColor: 'bg-cyan-500/25 text-cyan-300 border-cyan-500/60 font-black',
    action: 'Keep Always'
  },
  S: {
    label: 'S Tier',
    meaning: 'Essential / Best-in-Slot priority (replaces former Keeper tier). Top slayers, core combat augments & primary forces.',
    badgeColor: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/60 font-bold',
    action: 'Keep Always'
  },
  'S-': {
    label: 'S- Tier',
    meaning: 'High Priority S- (Lightning Force & Holy Force 100 max - pivotal endgame raid elements).',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/50 font-bold',
    action: 'Keep Always'
  },
  A: {
    label: 'Tier A',
    meaning: 'Keep by default but can be discarded if needed/not played.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-semibold',
    action: 'Keep by Default'
  },
  B: {
    label: 'Tier B',
    meaning: 'Seal by default, but can be kept for niche use cases.',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    action: 'Seal by Default (Niche)'
  },
  C: {
    label: 'Tier C',
    meaning: 'Seal immediately to remove junk from the Bitterblack drop pool.',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    action: 'Seal Immediately'
  },
  'C-': {
    label: 'Tier C-',
    meaning: 'Lowest Priority / Instant Seal (Formless Slayer - slimes/blobs with zero raid relevance).',
    badgeColor: 'bg-purple-950/40 text-rose-400 border-rose-800/60 font-semibold',
    action: 'Seal Instantly'
  },
  '?': {
    label: 'Tier ?',
    meaning: 'Situational or discretion depending on personal combat style.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    action: 'Discretion'
  }
};

export const BBM_BRACELETS_DATA: BBMBraceletSeal[] = [
  // --- PAGE 1: Core Stats & Debilitation Resistances ---
  {
    id: 'b-p1-phys-atk',
    page: 1,
    effect: 'Physical Attack',
    tier: 'SS',
    max: '30',
    category: 'Core Stats',
    tierDescription: 'SS Tier - Absolute priority flat stat roll for physical vocations',
    recommendedAction: 'Keep',
    explanation: 'Adds flat Physical Attack to weapons. Absolute top tier roll (SS) for all melee physical vocations (Fighter, Hunter, Seeker, Warrior, Alchemist, High Scepter). Never seal.',
    vocations: ['Fighter', 'Hunter', 'Seeker', 'Warrior', 'Alchemist', 'High Scepter']
  },
  {
    id: 'b-p1-mag-atk',
    page: 1,
    effect: 'Magick Attack',
    tier: 'SS',
    max: '30',
    category: 'Core Stats',
    tierDescription: 'SS Tier - Absolute priority flat stat roll for magical vocations',
    recommendedAction: 'Keep',
    explanation: 'Adds flat Magick Attack. Absolute top tier roll (SS) for Sorcerer, Priest, Elemental Archer, Spirit Lancer, and High Scepter. Never seal.',
    vocations: ['Sorcerer', 'Priest', 'Elemental Archer', 'Spirit Lancer', 'High Scepter']
  },
  {
    id: 'b-p1-mag-def',
    page: 1,
    effect: 'Magick Defence',
    tier: 'C',
    max: '60',
    category: 'Core Stats',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Defense stats provide very low effective damage reduction compared to armor and HP pools. Seal away immediately.'
  },
  {
    id: 'b-p1-phys-def',
    page: 1,
    effect: 'Physical Defence',
    tier: 'C',
    max: '60',
    category: 'Core Stats',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Flat physical defense is easily outclassed by endgame armor and Job Emblem enhancements. Seal away to boost offensive drop rates.'
  },
  {
    id: 'b-p1-heal-pow',
    page: 1,
    effect: 'Healing Power',
    tier: 'C',
    max: '50',
    category: 'Core Stats',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Priest and Spirit Lancer healing caps easily through standard weapon stats and augments. Sealing this is recommended.'
  },
  {
    id: 'b-p1-ko-pow',
    page: 1,
    effect: 'Knockout Power',
    tier: '?',
    max: '20',
    category: 'Core Stats',
    tierDescription: 'Situational / discretion depending on build',
    recommendedAction: 'Situational',
    explanation: 'Increases chance to inflict Knockdown/Stun on heavy hits. Highly useful for Warrior and Shield Sage shield counters, but optional for others.',
    vocations: ['Warrior', 'Shield Sage']
  },
  {
    id: 'b-p1-petrif-res',
    page: 1,
    effect: 'Petrifaction Resist',
    tier: 'B',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Petrifaction is lethal in select high-tier dungeons (Cockatrice, Medusa). Keep 1 piece if you lack cleansing items, otherwise seal.'
  },
  {
    id: 'b-p1-poison-res',
    page: 1,
    effect: 'Poison Resist',
    tier: 'C',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Poison damage is minor and easily cleansed with basic curatives or Priest skills. Seal.'
  },
  {
    id: 'b-p1-sleep-res',
    page: 1,
    effect: 'Sleep Resist',
    tier: 'A',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Sleep leaves the Arisen completely helpless in solo play and EXMs (e.g. against Harpies, Sirens, Chimera). Useful niche defense.'
  },
  {
    id: 'b-p1-silence-res',
    page: 1,
    effect: 'Silence Resist',
    tier: 'B',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Cripples spellcasters (Sorcerer, Priest). If playing physical classes, seal immediately.'
  },
  {
    id: 'b-p1-blind-res',
    page: 1,
    effect: 'Blind Resist',
    tier: 'C',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Blind can be cured with eyeshine or ignores lock-on targeting mechanics. Seal.'
  },
  {
    id: 'b-p1-curse-res',
    page: 1,
    effect: 'Curse Resist',
    tier: 'B',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Curse lowers max stamina and stat thresholds. Highly relevant for Black Knight and Evil Eye encounters in BBM Abyss.'
  },
  {
    id: 'b-p1-frostbite-res',
    page: 1,
    effect: 'Frostbite Resist',
    tier: 'B',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Mitigates slowing and freeze in Northern regions and against Ice Wyrms.'
  },
  {
    id: 'b-p1-flame-res',
    page: 1,
    effect: 'Flame Resist',
    tier: 'B',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Prevents persistent burn damage from lava, Drakes, and Ifrit EXM fire hazards.'
  },
  {
    id: 'b-p1-shock-res',
    page: 1,
    effect: 'Shock Resist',
    tier: 'B',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Prevents electrocution stamina lock and lightning stun locks.'
  },
  {
    id: 'b-p1-torpor-res',
    page: 1,
    effect: 'Torpor Resist',
    tier: 'B',
    max: '100',
    category: 'Debilitation Resists',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Torpor slows animation speed to 50%. Useful against Gorgons, Spiders, and Slimes.'
  },

  // --- PAGE 2: Elemental Forces & Monster Slayers ---
  {
    id: 'b-p2-ice-force',
    page: 2,
    effect: 'Ice Force',
    tier: 'S+',
    max: '100',
    category: 'Forces & Slayers',
    tierDescription: 'Best Elemental debuff, most universal one, works fine on current endgame stuff',
    recommendedAction: 'Keep',
    explanation: 'Best Elemental debuff, most universal one, works fine on current endgame stuff (100 max roll).',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-fire-force',
    page: 2,
    effect: 'Fire Force',
    tier: 'S',
    max: '100',
    category: 'Forces & Slayers',
    tierDescription: 'S Tier - Essential elemental force for beasts, undead, and high-tier raids',
    recommendedAction: 'Keep',
    explanation: 'Massively empowers Fire elemental weapon infusions and spells. Exploits common undead, beast, and plant weaknesses. S-tier priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-poison-force',
    page: 2,
    effect: 'Poison Force',
    tier: 'S',
    max: '100',
    category: 'Forces & Slayers',
    tierDescription: 'S Tier - Essential status force roll',
    recommendedAction: 'Keep',
    explanation: 'Accelerates poison buildup and enhances damage over time. Crucial for ticking down massive HP bars and debilitating raid bosses. S-tier priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-light-force',
    page: 2,
    effect: 'Holy Force (Light Force)',
    tier: 'S-',
    max: '100',
    category: 'Forces & Slayers',
    tierDescription: 'S- Tier - High priority elemental force for Catacombs, Gorgoran, and Black Knight',
    recommendedAction: 'Keep',
    explanation: 'Light/Holy is the premier endgame element in DDON (White Dragon blessings, Catacombs, Gorgoran, Black Knight). S- tier priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-thunder-force',
    page: 2,
    effect: 'Lightning Force (Thunder Force)',
    tier: 'S-',
    max: '100',
    category: 'Forces & Slayers',
    tierDescription: 'S- Tier - High priority elemental force for Wyrms, Gryphons, and aquatic beasts',
    recommendedAction: 'Keep',
    explanation: 'Best element against Mist Wyrms, Gryphons, and aquatic reptilian foes. S- tier priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-dark-force',
    page: 2,
    effect: 'Dark Force',
    tier: 'A',
    max: '100',
    category: 'Forces & Slayers',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Used against holy-attuned guardians, Elves, and select Season 3 celestial bosses.',
    vocations: ['All Vocations']
  },

  // --- Slayers: S-Tier ---
  {
    id: 'b-p2-warready-slayer',
    page: 2,
    effect: 'War-Ready Slayer',
    tier: 'S',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'S Tier - Essential for Season 3 War-Ready armored bosses and Catoblepas',
    recommendedAction: 'Keep',
    explanation: 'Direct damage multiplier up to +90 against Season 3 War-Ready enemies and armored fortress beasts. S-Tier priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-fiend-slayer',
    page: 2,
    effect: 'Fiend Slayer',
    tier: 'S',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'S Tier - Premier slayer for demonic entities, Evil Eye, and Ifrit',
    recommendedAction: 'Keep',
    explanation: 'Massive damage boost against Zuhl, Medusas, Gorgons, Evil Eye, Volt Eye, and Ifrit. S-Tier priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-spirit-slayer',
    page: 2,
    effect: 'Spirit Slayer',
    tier: 'S',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'S Tier - Crucial for Black Knight, Living Armor, Death, and Ghost Mails',
    recommendedAction: 'Keep',
    explanation: 'Increases damage against ethereal entities, Black Knight, Living Armors, Death Knights, and Reaper Death. S-Tier priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-dragon-slayer',
    page: 2,
    effect: 'Dragonkin Slayer (Dragon Slayer)',
    tier: 'S',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'S Tier - Premier slayer augment for Drakes, Wyrms, Gorgoran, and Dragonkin raids',
    recommendedAction: 'Keep',
    explanation: 'Premier slayer augment. Essential for Drakes, Wyrms, Gorgoran, and Dragonkin raids. Never seal.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-ogre-slayer',
    page: 2,
    effect: 'Ogrekin Slayer (Ogre Slayer)',
    tier: 'S',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'S Tier - Essential for Orcs, Ogres, Trolls, Dread Apes, and Spinebacks',
    recommendedAction: 'Keep',
    explanation: 'Provides up to +90 bonus against Orcs, Ogres, Trolls, and Cyclopes. S-Tier priority.',
    vocations: ['All Vocations']
  },

  // --- Slayers: Tier A ---
  {
    id: 'b-p2-giant-slayer',
    page: 2,
    effect: 'Giant Slayer (Colossus Slayer)',
    tier: 'A',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier A - Strong bonus against Cyclopes, Colossi, Trolls, and Ents',
    recommendedAction: 'Keep or Discard',
    explanation: 'Crucial for Goliath, Colossus, and Ent world bosses with massive HP pools. Tier A priority.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-corrupted-slayer',
    page: 2,
    effect: 'Corrupted Slayer (Infected Slayer)',
    tier: 'A',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier A - Effective against Season 2 Infected and Corrupted spore enemies',
    recommendedAction: 'Keep or Discard',
    explanation: 'Direct damage multiplier against Season 2 Infected beasts, spore monsters, and Corrupted entities. Tier A.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-cursed-slayer',
    page: 2,
    effect: 'Cursed Slayer',
    tier: 'A',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier A - Strong damage against Shadow variants, Grudge Ghosts, and Cursed Dragons',
    recommendedAction: 'Keep or Discard',
    explanation: 'Amplifies damage against cursed entities, spectres, and cursed dragons. Tier A.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-demihuman-slayer',
    page: 2,
    effect: 'Demihuman Slayer',
    tier: 'A',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier A - High damage bonus on Goblins, Saurians, Mandragoras, and Pixies',
    recommendedAction: 'Keep or Discard',
    explanation: 'Provides damage bonus against all goblin variants, saurians, pixies, and demihumans. Tier A.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-beast-slayer',
    page: 2,
    effect: 'Beast Slayer',
    tier: 'A',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier A - Solid damage bonus on Wolves, Chimeras, Manticores, and beasts',
    recommendedAction: 'Keep or Discard',
    explanation: 'Boosts damage on wolves, chimeras, manticores, and boar beasts. (Can also be sealed if prioritizing raid bosses). Tier A.',
    vocations: ['All Vocations']
  },

  // --- Slayers: Tier B ---
  {
    id: 'b-p2-human-slayer',
    page: 2,
    effect: 'Human Slayer',
    tier: 'B',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier B - Niche bonus vs Human bandits, Rogue Pawns, and humanoid foes',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases damage against human enemies, bandits, and rogue pawns. Seal by default unless farming human-heavy areas. Tier B.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-aerial-slayer',
    page: 2,
    effect: 'Winged Slayer (Aerial Slayer)',
    tier: 'B',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier B - Niche boost against Griffins, Harpies, Cockatrices, and Sphinxes',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases damage against flying targets (Gryphons, Cockatrices, Harpies, Wyverns). Tier B.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-alchemized-slayer',
    page: 2,
    effect: 'Alchemized Slayer',
    tier: 'B',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier B - Niche bonus vs Season 1 Alchemized enemies and gold-cased guardians',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases damage on Season 1 Alchemized foes and gold-plated monsters in Mergoda. Tier B.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-undead-slayer',
    page: 2,
    effect: 'Undead Slayer',
    tier: 'B',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier B - Niche bonus vs Zombies, Wights, and Eliminators',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Bonus against zombies, wights, liches, and ghouls across dungeon content. Tier B.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-skeleton-slayer',
    page: 2,
    effect: 'Skeleton Slayer',
    tier: 'B',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier B - Niche bonus vs Skeleton Knights, Skull Lords, and Skeleton Cyclopes',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Direct damage multiplier up to +90 against Skeleton warriors, knights, and Skull Lords in catacombs. Tier B.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-construct-slayer',
    page: 2,
    effect: 'Golem Slayer (Construct Slayer)',
    tier: 'B',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier B - Niche bonus vs Golems, Machinas, and Gargoyles',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases damage on Golems, Living Armor, and mechanical fortress sentries. Tier B.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p2-demon-slayer',
    page: 2,
    effect: 'Demon Slayer',
    tier: 'B',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier B - Niche damage boost vs minor lesser demons, gargoyles, and succubi',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Damage multiplier against lesser demonic monsters and gargoyles in dark catacombs. Tier B.',
    vocations: ['All Vocations']
  },

  // --- Slayers: Tier C- ---
  {
    id: 'b-p2-formless-slayer',
    page: 2,
    effect: 'Formless Slayer (Soft Slayer)',
    tier: 'C-',
    max: '90',
    category: 'Forces & Slayers',
    tierDescription: 'Tier C- - Lowest priority. Slimes, Blobs, and Leeches have no major bosses. Seal immediately.',
    recommendedAction: 'Seal',
    explanation: 'Formless and Soft enemies (slimes, blobs, jellies, leeches) are low-threat open-world mobs with zero endgame raid relevance. Lowest tier roll (C-); seal immediately.',
    vocations: ['All Vocations']
  },

  // --- PAGE 3: Mobility, Defensive & Stamina Abilities ---
  {
    id: 'b-p3-agile-motion',
    page: 3,
    effect: 'Agile Motion',
    tier: 'B',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases sprint and rolling recovery. Good quality-of-life augment, but easily substituted by food buffs.'
  },
  {
    id: 'b-p3-counter',
    page: 3,
    effect: 'Counter',
    tier: 'C',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Boosts damage executed immediately after taking a hit. Outclassed by active parry and perfect guard mechanics.'
  },
  {
    id: 'b-p3-resilience',
    page: 3,
    effect: 'Resilience',
    tier: 'A',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Reduces knockdown and stagger duration when struck. Highly recommended for Sorcerer chanting and Seeker climbing.',
    vocations: ['Sorcerer', 'Seeker', 'Fighter', 'Priest']
  },
  {
    id: 'b-p3-skilled-reload',
    page: 3,
    effect: 'Skilled Reload',
    tier: 'B',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Accelerates arrow loading for Hunters and magic sphere refills for Elemental Archers. Great for archers, useless for melee.',
    vocations: ['Hunter', 'Elemental Archer']
  },
  {
    id: 'b-p3-stunner',
    page: 3,
    effect: 'Stunner (Impact Boost)',
    tier: 'A',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Multiplies stun accumulation when striking enemy heads or vulnerable joints.',
    vocations: ['Fighter', 'Warrior', 'Shield Sage']
  },
  {
    id: 'b-p3-knockdown-boost',
    page: 3,
    effect: 'Knockdown Boost',
    tier: 'A',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'A Tier - Top priority for bringing down enrage meters (Onslaught)',
    recommendedAction: 'Keep',
    explanation: 'Accelerates stamina gauge destruction during boss Enrage phases (Onslaught). Critical for fast clears.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p3-concentration',
    page: 3,
    effect: 'Concentration',
    tier: 'A',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Prevents spell interruption when taking minor damage while chanting spells.'
  },
  {
    id: 'b-p3-clinging',
    page: 3,
    effect: 'Clinging',
    tier: 'A',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Prevents being thrown off when large bosses violently shake during climbing attacks.',
    vocations: ['Fighter', 'Seeker', 'Warrior']
  },
  {
    id: 'b-p3-fleetfoot',
    page: 3,
    effect: 'Fleetfoot',
    tier: 'B',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases movement speed while drawing weapons or casting.'
  },
  {
    id: 'b-p3-iron-wall',
    page: 3,
    effect: 'Iron Wall',
    tier: 'C',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Grants minor flat physical mitigation when guarding. Easily replaced by shield master augments.'
  },
  {
    id: 'b-p3-recovery-boost',
    page: 3,
    effect: 'Recovery Boost',
    tier: 'B',
    max: 'lvl6',
    category: 'Mobility & Defense',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases HP restored by consumables and healing fields.'
  },

  // --- PAGE 4: Tactical, Climbing & Positioning ---
  {
    id: 'b-p4-perky',
    page: 4,
    effect: 'Perky',
    tier: 'C',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Reduces stamina consumption from non-combat actions like gathering and jumping. Useless in raids. Seal.'
  },
  {
    id: 'b-p4-rope-reversal',
    page: 4,
    effect: 'Rope Reversal',
    tier: 'B',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Specialized for Seeker rope swings and aerial recovery. Keep only if maining Seeker aerial loops.',
    vocations: ['Seeker']
  },
  {
    id: 'b-p4-flying-evasion',
    page: 4,
    effect: 'Flying Evasion',
    tier: 'B',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Grants invincible dodge frames during mid-air vaults and backflips.'
  },
  {
    id: 'b-p4-enduring-grip',
    page: 4,
    effect: 'Enduring Grip',
    tier: 'A',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Significantly lowers stamina drain while latched onto bosses. Huge DPS uptime for climbers.',
    vocations: ['Fighter', 'Seeker', 'Warrior', 'High Scepter']
  },
  {
    id: 'b-p4-steadfast',
    page: 4,
    effect: 'Steadfast',
    tier: 'A',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Prevents stagger when blocking heavy attacks and reduces guard stamina consumption.',
    vocations: ['Fighter', 'Shield Sage', 'Alchemist']
  },
  {
    id: 'b-p4-heavy-step',
    page: 4,
    effect: 'Heavy Step',
    tier: 'A',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'A Tier - Mandatory for Gorgoran, dragons & wind pressure bosses (Quakemaker)',
    recommendedAction: 'Keep',
    explanation: 'Completely negates wind pressure staggers from dragons flapping wings (Quakemaker). Essential for EXM4 Shining Gate.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p4-pointed-step',
    page: 4,
    effect: 'Pointed Step',
    tier: 'A',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Negates ground tremors and earthquake stumbles caused by Colossi and giant stomps.'
  },
  {
    id: 'b-p4-clamber',
    page: 4,
    effect: 'Clamber',
    tier: 'B',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases climbing speed on monster bodies.'
  },
  {
    id: 'b-p4-energy',
    page: 4,
    effect: 'Energy (Stamina Recovery)',
    tier: 'A',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Accelerates base stamina regeneration rate when disengaged or walking.'
  },
  {
    id: 'b-p4-provocation',
    page: 4,
    effect: 'Provocation (Taunt)',
    tier: 'C',
    max: 'lvl6',
    category: 'Tactical & Core',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Increases enmity generation. Shield Sages and Fighters already hold aggro naturally with Core Skills. Seal.'
  },

  // --- PAGE 5: Elemental Affinities & Battle Auras ---
  {
    id: 'b-p5-heal-thyself',
    page: 5,
    effect: 'Heal Thyself',
    tier: 'C',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Seal',
    recommendedAction: 'Seal',
    explanation: 'Passively restores minute HP over time. Too slow for endgame damage spikes. Seal.'
  },
  {
    id: 'b-p5-fire-affinity',
    page: 5,
    effect: 'Fire Affinity',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Increases flame status buildup and extends elemental ignition duration.',
    vocations: ['Sorcerer', 'Alchemist', 'Elemental Archer']
  },
  {
    id: 'b-p5-holy-affinity',
    page: 5,
    effect: 'Holy Affinity',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Boosts holy elemental potency and exorcism damage against dark creatures.',
    vocations: ['Priest', 'Sorcerer', 'Spirit Lancer']
  },
  {
    id: 'b-p5-ice-affinity',
    page: 5,
    effect: 'Ice Affinity',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Increases freeze accumulation rate, enabling faster monster freeze lock.'
  },
  {
    id: 'b-p5-thunder-affinity',
    page: 5,
    effect: 'Thunder Affinity',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Amplifies electrocution discharge damage and paralysis chance.'
  },
  {
    id: 'b-p5-dark-affinity',
    page: 5,
    effect: 'Dark Affinity',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Amplifies dark corruption and stamina leech effects.'
  },
  {
    id: 'b-p5-malice',
    page: 5,
    effect: 'Malice',
    tier: 'B',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Builds attack bonus when taking consecutive hits without being knocked down.'
  },
  {
    id: 'b-p5-fury',
    page: 5,
    effect: 'Fury (Wrath)',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Increases attack power as remaining HP drops below critical thresholds.',
    vocations: ['Warrior', 'Fighter']
  },
  {
    id: 'b-p5-composure',
    page: 5,
    effect: 'Composure',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'A Tier - Top tier magick augment for spellcasters (Relaxedness)',
    recommendedAction: 'Keep',
    explanation: 'Boosts magick damage significantly while stamina is kept above 50% (Relaxedness). Essential for Sorcerer and Priest.',
    vocations: ['Sorcerer', 'Priest', 'Elemental Archer', 'Spirit Lancer', 'High Scepter']
  },
  {
    id: 'b-p5-fighting-spirit',
    page: 5,
    effect: 'Fighting Spirit',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'A Tier - Top tier physical augment for melee attackers (Heavy Attack)',
    recommendedAction: 'Keep',
    explanation: 'Boosts physical attack substantially when stamina is above 50% (Heavy Attack). Essential for Fighter, Hunter, Seeker, Warrior.',
    vocations: ['Fighter', 'Hunter', 'Seeker', 'Warrior', 'Alchemist', 'High Scepter']
  },
  {
    id: 'b-p5-bloodlust',
    page: 5,
    effect: 'Bloodlust',
    tier: 'A',
    max: 'lvl6',
    category: 'Elemental Affinities',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Grants massive Attack and Magick buff at nighttime and in dark dungeons.'
  },

  // --- PAGE 6: Advanced Combat, Enchants & Core Optimization ---
  {
    id: 'b-p6-ext-healing',
    page: 6,
    effect: 'Extended Healing',
    tier: 'B',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Prolongs the lingering duration of healing auras and buff zones.'
  },
  {
    id: 'b-p6-great-enchant',
    page: 6,
    effect: 'Great Enchantment',
    tier: 'A',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Extends party weapon elemental enchantment timer, reducing re-cast downtime for Enchanters.',
    vocations: ['Priest', 'Shield Sage', 'Elemental Archer']
  },
  {
    id: 'b-p6-fierce-flight',
    page: 6,
    effect: 'Fierce Flight',
    tier: 'B',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Increases damage dealt while striking mid-air or executing plunging strikes.'
  },
  {
    id: 'b-p6-fortunes-war',
    page: 6,
    effect: 'Fortunes of War',
    tier: 'A',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Grants chance to refund stamina cost when executing critical hits.',
    vocations: ['Hunter', 'Seeker', 'Fighter']
  },
  {
    id: 'b-p6-critical-strike',
    page: 6,
    effect: 'Critical Strike',
    tier: 'C',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Tier C - Low priority augment roll. Seal immediately to clean up drop pool',
    recommendedAction: 'Seal',
    explanation: 'Directly raises Critical Hit rate across attacks. Classified as Tier C for sealing prioritization; seal to prioritize higher tier rolls.',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p6-secret-core',
    page: 6,
    effect: 'Secret Core Piercer',
    tier: 'A',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'A Tier - Dramatically boosts damage to exposed Enrage cores (Secret Augment)',
    recommendedAction: 'Keep',
    explanation: 'Massively boosts damage and knockdown when attacking revealed elemental or stamina cores during enrage (Secret Augment Efficacy).',
    vocations: ['All Vocations']
  },
  {
    id: 'b-p6-element-weaver',
    page: 6,
    effect: 'Element Weaver',
    tier: 'A',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Increases damage when matching the exact elemental weakness of the target monster.'
  },
  {
    id: 'b-p6-chain-mastery',
    page: 6,
    effect: 'Chain Mastery',
    tier: 'B',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Maintains combo multiplier window for rapid multihit vocations (Seeker, High Scepter).'
  },
  {
    id: 'b-p6-quick-cast',
    page: 6,
    effect: 'Quick Cast',
    tier: 'B',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'B Tier - Secondary utility / cast speed augment (Magickal Chant)',
    recommendedAction: 'Seal (Niche Keep)',
    explanation: 'Reduces chant cast time for high-tier incantations (Magickal Chant). Good utility, but secondary to direct damage.',
    vocations: ['Sorcerer', 'Priest']
  },
  {
    id: 'b-p6-overwhelm',
    page: 6,
    effect: 'Overwhelm',
    tier: 'A',
    max: 'lvl6',
    category: 'Advanced Combat',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    explanation: 'Deals bonus damage against down / collapsed enemies, shortening break windows.',
    vocations: ['Warrior', 'Fighter', 'Seeker']
  }
];

export const BBM_EARRINGS_DATA: BBMEarringAttribute[] = [
  {
    id: 'e-slash-fire',
    name: 'Slash + Fire Focus',
    slash: '★ Primary (+15%)',
    impact: '—',
    piercing: '—',
    nullType: '+5%',
    fire: '★ Primary (+15%)',
    ice: '—',
    thunder: '—',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (Top priority for Fighter, Seeker, Alchemist against Beasts & Undead)',
    recommendedAction: 'Keep',
    bestVocations: ['Fighter', 'Seeker', 'Alchemist'],
    notes: 'Premier slashing earring. Fire exploits chimera, plant, and ghoul vulnerabilities while boosting physical slash scaling.'
  },
  {
    id: 'e-slash-holy',
    name: 'Slash + Holy Focus',
    slash: '★ Primary (+15%)',
    impact: '—',
    piercing: '—',
    nullType: '+5%',
    fire: '—',
    ice: '—',
    thunder: '—',
    holy: '★ Primary (+15%)',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (Universal Endgame Raids & Gorgoran / Black Knight)',
    recommendedAction: 'Keep',
    bestVocations: ['Fighter', 'Seeker', 'High Scepter', 'Warrior'],
    notes: 'The single most versatile earring in DDON. Holy is the most common endgame weakness.'
  },
  {
    id: 'e-slash-ice',
    name: 'Slash + Ice Focus',
    slash: '★ Primary (+15%)',
    impact: '—',
    piercing: '—',
    nullType: '+5%',
    fire: '—',
    ice: '★ Primary (+15%)',
    thunder: '—',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'A',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    bestVocations: ['Fighter', 'Seeker', 'High Scepter'],
    notes: 'Crucial for Mist Drake EXM and fiery Colossi. Great keeping value.'
  },
  {
    id: 'e-slash-thunder',
    name: 'Slash + Thunder Focus',
    slash: '★ Primary (+15%)',
    impact: '—',
    piercing: '—',
    nullType: '+5%',
    fire: '—',
    ice: '—',
    thunder: '★ Primary (+15%)',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'A',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    bestVocations: ['Fighter', 'Seeker'],
    notes: 'Essential against Mist Wyrms, aerial Gryphons, and Leviathan-type water beasts.'
  },
  {
    id: 'e-piercing-ice',
    name: 'Piercing + Ice Focus',
    slash: '—',
    impact: '—',
    piercing: '★ Primary (+15%)',
    nullType: '+5%',
    fire: '—',
    ice: '★ Primary (+15%)',
    thunder: '—',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (Best in Slot for Hunter against Mist Drake and flying dragons)',
    recommendedAction: 'Keep',
    bestVocations: ['Hunter', 'Elemental Archer'],
    notes: 'Hunters deal piercing damage; pairing this with Ice creates devastating spiral arrow bursts on Drake weakpoints.'
  },
  {
    id: 'e-piercing-holy',
    name: 'Piercing + Holy Focus',
    slash: '—',
    impact: '—',
    piercing: '★ Primary (+15%)',
    nullType: '+5%',
    fire: '—',
    ice: '—',
    thunder: '—',
    holy: '★ Primary (+15%)',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (Top tier for Hunter and Elemental Archer in raids)',
    recommendedAction: 'Keep',
    bestVocations: ['Hunter', 'Elemental Archer', 'Spirit Lancer'],
    notes: 'Exceptional against winged demon bosses, Gorgoran, and Dark Knights.'
  },
  {
    id: 'e-piercing-thunder',
    name: 'Piercing + Thunder Focus',
    slash: '—',
    impact: '—',
    piercing: '★ Primary (+15%)',
    nullType: '+5%',
    fire: '—',
    ice: '—',
    thunder: '★ Primary (+15%)',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'A',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    bestVocations: ['Hunter', 'Elemental Archer'],
    notes: 'Specialized for Wyrm hunting and sea serpents.'
  },
  {
    id: 'e-impact-holy',
    name: 'Impact + Holy Focus',
    slash: '—',
    impact: '★ Primary (+15%)',
    piercing: '—',
    nullType: '+5%',
    fire: '—',
    ice: '—',
    thunder: '—',
    holy: '★ Primary (+15%)',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (Best in Slot for Shield Sage and Warrior against Living Armor)',
    recommendedAction: 'Keep',
    bestVocations: ['Shield Sage', 'Warrior'],
    notes: 'Blunt/Impact damage crushes heavily armored skeletons and Living Armor while Holy exploits undead core weaknesses.'
  },
  {
    id: 'e-impact-fire',
    name: 'Impact + Fire Focus',
    slash: '—',
    impact: '★ Primary (+15%)',
    piercing: '—',
    nullType: '+5%',
    fire: '★ Primary (+15%)',
    ice: '—',
    thunder: '—',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'A',
    tierDescription: 'Keep by default but can be discarded if needed/not played',
    recommendedAction: 'Keep or Discard',
    bestVocations: ['Shield Sage', 'Warrior'],
    notes: 'Great against Ents, Trolls, and plant-type bosses susceptible to blunt fire.'
  },
  {
    id: 'e-null-pure-phys',
    name: 'Null (Non-Elemental Pure Physical)',
    slash: '+8%',
    impact: '+8%',
    piercing: '+8%',
    nullType: '★ Primary (+15%)',
    fire: '—',
    ice: '—',
    thunder: '—',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (The ultimate universal physical backup earring)',
    recommendedAction: 'Keep',
    bestVocations: ['Fighter', 'Hunter', 'Seeker', 'Warrior', 'High Scepter'],
    notes: 'Applies to ALL raw physical damage regardless of elemental enchantment, ensuring consistent DPS without needing element matching.'
  },
  {
    id: 'e-magic-fire-holy',
    name: 'Dual Magic (Fire + Holy)',
    slash: '—',
    impact: '—',
    piercing: '—',
    nullType: '—',
    fire: '★ Primary (+15%)',
    ice: '—',
    thunder: '—',
    holy: '★ Primary (+15%)',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (Premier Sorcerer and Priest spellcasting earring)',
    recommendedAction: 'Keep',
    bestVocations: ['Sorcerer', 'Priest', 'Elemental Archer'],
    notes: 'Covers Meteor, Briarro, and Holy exorcism incantations simultaneously.'
  },
  {
    id: 'e-magic-ice-thunder',
    name: 'Dual Magic (Ice + Thunder)',
    slash: '—',
    impact: '—',
    piercing: '—',
    nullType: '—',
    fire: '—',
    ice: '★ Primary (+15%)',
    thunder: '★ Primary (+15%)',
    holy: '—',
    dark: '—',
    maxValue: '+15% / +20%',
    tier: 'S',
    tierDescription: 'S Tier (Top tier for Sorcerer blizzard and lightning spells)',
    recommendedAction: 'Keep',
    bestVocations: ['Sorcerer', 'Elemental Archer'],
    notes: 'Empowers Rain (Thunder) and Gicel / Frost spells for EM2 and EM3 dragon hunts.'
  },
  {
    id: 'e-slash-dark',
    name: 'Slash + Dark Focus',
    slash: '★ Primary (+15%)',
    impact: '—',
    piercing: '—',
    nullType: '+5%',
    fire: '—',
    ice: '—',
    thunder: '—',
    holy: '—',
    dark: '★ Primary (+15%)',
    maxValue: '+15% / +20%',
    tier: 'B',
    tierDescription: 'Seal by default, but can be kept for niche use cases',
    recommendedAction: 'Seal (Niche Keep)',
    bestVocations: ['Fighter', 'Seeker'],
    notes: 'Very few bosses in DDON are weak to Dark. Keep only for specific celestial or Elven encounters.'
  },
  {
    id: 'e-pure-defense',
    name: 'Pure Resistance / Defense Earring',
    slash: '—',
    impact: '—',
    piercing: '—',
    nullType: '—',
    fire: 'Def +20',
    ice: 'Def +20',
    thunder: 'Def +20',
    holy: 'Def +20',
    dark: 'Def +20',
    maxValue: 'Def +30',
    tier: 'C',
    tierDescription: 'Seal immediately to remove defensive rolls from Abyss earring pool',
    recommendedAction: 'Seal',
    bestVocations: ['None'],
    notes: 'Never keep defensive earrings from Abyss! Seal these rolls immediately so that your drops are guaranteed % offensive damage boosts.'
  }
];

export const BBM_SEALING_GUIDE = {
  title: 'Bitterblack Maze (BBM) Sealing Guide & Drop Mechanics',
  summary:
    'In Bitterblack Maze Normal , high-tier Bracelets, Abyss % Damage Earrings roll random abilities, stats, and multipliers. Using Red Dragon Marks (Seals) allows you to permanently remove low-value and unwanted effects from the pool, dramatically increasing your chances of rolling Tier A and S bracelets and earrings',
  keyRules: [
    {
      title: 'How Sealing Works',
      detail:
        'Interacting with the npc at Bitter Black Maze, and choose option with seals, consumes Red Dragon Marks to seal an ability. Once sealed, that stat or augment will NEVER appear on any newly acquired BBM accessory until unsealed. The more you seal the more it costs max is 80 and unsealing cost 500 red marks'
    },
    {
      title: 'Priority Sealing Strategy',
      detail:
        'Seal all Tier C items first (Defense stats, Poison/Blind resists, Counter, Provocation). With junk stats removed, every box opened has an exponentially higher mathematical probability of hitting A and S rolls'
    },
    {
      title: 'Bracelets vs. Earrings Farming',
      detail:
        'Bracelets drop from Normal BBM rolling flat stats, slayers, and level 4-6 augments. % Damage Earrings drop from the Abyss, rolling elemental and damage-type multipliers (Slash, Piercing, Impact, Null, fire...).'
    },
    {
      title: 'Unsealing Cost Warning',
      detail:
        'Unsealing requires 500 red marks and unseals EVERYTHING'
    }
  ]
};

export const BBM_EARRINGS_MATRIX: BBMVocationEarringMatrixRow[] = [
  {
    vocation: 'Fighter',
    slash: { value: 'A' },
    impact: { value: 'B' },
    piercing: { value: '-', isRed: true },
    nullType: { value: '' },
    fire: { value: '' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: '' },
    dark: { value: '' },
    maxValue: '20%',
    isMaxBold: true
  },
  {
    vocation: 'Seeker',
    slash: { value: 'A' },
    impact: { value: 'A*' },
    piercing: { value: '-', isRed: true },
    nullType: { value: '' },
    fire: { value: '' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: '' },
    dark: { value: '' },
    maxValue: '13%',
    isMaxBold: false
  },
  {
    vocation: 'Hunter',
    slash: { value: '-', isRed: true },
    impact: { value: 'B' },
    piercing: { value: 'A' },
    nullType: { value: '' },
    fire: { value: 'B' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: '' },
    dark: { value: '' },
    maxValue: '13%',
    isMaxBold: false
  },
  {
    vocation: 'Priest',
    slash: { value: '-', isRed: true },
    impact: { value: '-', isRed: true },
    piercing: { value: '-', isRed: true },
    nullType: { value: '-' },
    fire: { value: '' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: 'A' },
    dark: { value: '' },
    maxValue: '13%',
    isMaxBold: false
  },
  {
    vocation: 'Shield Sage',
    slash: { value: '-', isRed: true },
    impact: { value: 'A' },
    piercing: { value: '-', isRed: true },
    nullType: { value: '-' },
    fire: { value: 'A' },
    ice: { value: 'A' },
    thunder: { value: 'A' },
    holy: { value: 'A' },
    dark: { value: 'A' },
    maxValue: '20%',
    isMaxBold: true
  },
  {
    vocation: 'Sorcerer',
    slash: { value: '' },
    impact: { value: '' },
    piercing: { value: '' },
    nullType: { value: 'A' },
    fire: { value: 'A' },
    ice: { value: 'A' },
    thunder: { value: 'A' },
    holy: { value: '' },
    dark: { value: 'A' },
    maxValue: '13%',
    isMaxBold: false
  },
  {
    vocation: 'Warrior',
    slash: { value: 'A' },
    impact: { value: 'B' },
    piercing: { value: '-', isRed: true },
    nullType: { value: '' },
    fire: { value: '' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: '' },
    dark: { value: '' },
    maxValue: '20%',
    isMaxBold: true
  },
  {
    vocation: 'Elemental Archer',
    slash: { value: '-', isRed: true },
    impact: { value: '' },
    piercing: { value: 'A' },
    nullType: { value: '' },
    fire: { value: 'A' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: '-' },
    dark: { value: '' },
    maxValue: '13%',
    isMaxBold: false
  },
  {
    vocation: 'Alchemist',
    slash: { value: '-', isRed: true },
    impact: { value: 'A' },
    piercing: { value: '-', isRed: true },
    nullType: { value: '-' },
    fire: { value: '' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: '' },
    dark: { value: '' },
    maxValue: '13%',
    isMaxBold: false
  },
  {
    vocation: 'Spirit Lancer',
    slash: { value: 'A' },
    impact: { value: '' },
    piercing: { value: '-', isRed: true },
    nullType: { value: '' },
    fire: { value: '' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: '' },
    dark: { value: '' },
    maxValue: '13%',
    isMaxBold: false
  },
  {
    vocation: 'High Scepter',
    slash: { value: 'A' },
    impact: { value: '' },
    piercing: { value: '-' },
    nullType: { value: '' },
    fire: { value: '' },
    ice: { value: '' },
    thunder: { value: '' },
    holy: { value: 'A' },
    dark: { value: 'B' },
    maxValue: '13%',
    isMaxBold: false
  }
];
