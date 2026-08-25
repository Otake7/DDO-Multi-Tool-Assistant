export interface SpecialAccessoryEffect {
  name: string;
  effect: string;
  detail: string;
}

export interface SpecialAccessory {
  id: string;
  name: string;
  category: 'Supreme Multi-Augment' | 'Leveling & Progression' | 'Extreme Vocation-Locked' | 'Universal Mobility';
  grade: string;
  symbol: string;
  type: string; // "Ring, Earring, or Bracelet (Random)" | "Ring" | "Earrings" | "Bracelet"
  vocationLocked: boolean;
  bonusStats?: {
    physAtk?: number;
    magAtk?: number;
    hp?: number;
    stamina?: number;
    endurance?: number;
    chanceAttack?: number;
  };
  pawnUsable: boolean;
  effects: SpecialAccessoryEffect[];
  explanation: string;
  notes: string;
  emblemCompatible: boolean;
  tags: string[];
}

export const SPECIAL_ACCESSORIES_OVERVIEW = {
  title: 'Special Accessories & Crest Augments',
  description:
    'These augments come in crest form through special accessories that may be unavailable or hard to get. You can choose to slot these into your Job Emblem like any other accessory or wear them as usual to get the effects. Some grant a combination of 5-6 augments in a single accessory, and those are slightly stronger than the usual level 6 counterparts.',
  emblemRules: [
    'Slotting into Job Emblem: Crests that grant more than one effect will transfer ALL effects if implanted into an Emblem and will be active as long as the conditions are met.',
    'Single Augment Limit: Despite giving 5–6 augments at once, these accessories and the crests in them only count as a SINGLE augment slot against your augment cap.',
    'Stat Carryover Rule: The baseline stats (+Phys Atk, +Mag Atk, +HP, +Stamina, etc.) of an accessory will NOT carry over to your Job Emblem if the original accessory came with extra stats; only the augment effects transfer.',
    'Accessory Type Variety: Supreme accessories (Myrmidon, Inquiry, Purge, Night Emperor) can drop as a ring, earring, or bracelet randomly.'
  ]
};

export const SPECIAL_ACCESSORIES_DATA: SpecialAccessory[] = [
  {
    id: 'supreme-myrmidon',
    name: 'Supreme Accessory (⬠ Myrmidon)',
    category: 'Supreme Multi-Augment',
    grade: 'Supreme / Relic',
    symbol: '⬠',
    type: 'Random (Ring, Earring, or Bracelet)',
    vocationLocked: false,
    pawnUsable: false, // Arisen wears it to buff Pawns
    emblemCompatible: true,
    explanation:
      'Juices up your pawns for the low, low cost of one accessory slot. Never take this off unless playing in a full 4-player human party! It does not work when worn by Pawns—the Arisen must equip it to activate the bonuses for all active party pawns.',
    notes:
      'Only applies to your own Pawns if there are multiple players with their own pawns in the same party as you. The accessory itself does not grant extra stats. Drop type is random (ring/earring/bracelet). Counts as 1 augment slot.',
    effects: [
      {
        name: 'Party Health / Companion Health LV. 6+',
        effect: 'Pawn Max HP +700',
        detail: '700 more max HP for Pawns, instead of standard 600.'
      },
      {
        name: 'Party Stamina / Companion Stamina LV. 6+',
        effect: 'Pawn Max Stamina +500',
        detail: '500 more max Stamina for Pawns, instead of standard 400.'
      },
      {
        name: 'Party Attack / Companion Attack LV. 6+',
        effect: 'Pawn STR +40',
        detail: '40 more STR for Pawns, instead of standard 30.'
      },
      {
        name: 'Party Magick / Companion Magick LV. 6+',
        effect: 'Pawn MGK +40',
        detail: '40 more MGK for Pawns, instead of standard 30.'
      },
      {
        name: 'Party Defense / Companion Defense LV. 6+',
        effect: 'Pawn Physical Defense +40',
        detail: '40 more Physical Defense for Pawns, instead of standard 30.'
      },
      {
        name: 'Party Magick Defense / Companion Magick Defense LV. 6+',
        effect: 'Pawn Magickal Defense +40',
        detail: '40 more Magickal Defense for Pawns, instead of standard 30.'
      }
    ],
    tags: ['Myrmidon', 'Pawns', 'Supreme Accessory', 'Companion Health', 'Party Attack', 'Pawn Stats']
  },
  {
    id: 'supreme-inquiry',
    name: 'Supreme Accessory (⬠ Inquiry)',
    category: 'Supreme Multi-Augment',
    grade: 'Supreme / Relic',
    symbol: '⬠',
    type: 'Random (Ring, Earring, or Bracelet)',
    vocationLocked: false,
    pawnUsable: false,
    emblemCompatible: true,
    explanation:
      'Perfect for general exploration, gathering, and sniffing out treasure. Or if you like throwing yourself off of a cliff once in a while. Never leave home without this, especially if you can get it early on.',
    notes:
      'Does NOT work for pawns. The accessory itself does not grant extra stats. Drop type is random (ring/earring/bracelet). Counts as 1 augment slot.',
    effects: [
      {
        name: 'Gathering LV. 1+',
        effect: 'Gathering Node Minimap Detection ↑↑',
        detail: 'Even larger detection range for gathering nodes on the minimap.'
      },
      {
        name: 'Treasure Eye LV. 1+',
        effect: 'Treasure Chest Minimap Detection ↑↑',
        detail: 'Even larger detection range for chests on the minimap.'
      },
      {
        name: 'Extended Springs LV. 6+',
        effect: 'Hot Spring Buff Duration: 35 min',
        detail: 'Hot spring buffs last 35 minutes instead of 30 minutes.'
      },
      {
        name: 'Safe Landing LV. 6+',
        effect: 'Max Safe Fall Height ↑↑',
        detail: 'Further increases maximum fall height without taking damage.'
      },
      {
        name: 'Flow LV. 6+',
        effect: 'Deep Water & Sludge Mobility ↑↑',
        detail: 'Makes you even swifter in deep water and toxic sludge.'
      },
      {
        name: 'Efficacy LV. 6+',
        effect: 'Consumable Healing +80%',
        detail: 'All consumables heal 80% more instead of 60% more.'
      }
    ],
    tags: ['Inquiry', 'Exploration', 'Gathering', 'Treasure Eye', 'Flow', 'Efficacy', 'Hot Springs']
  },
  {
    id: 'supreme-purge',
    name: 'Supreme Accessory (⬠ Purge)',
    category: 'Supreme Multi-Augment',
    grade: 'Supreme / Relic',
    symbol: '⬠',
    type: 'Random (Ring, Earring, or Bracelet)',
    vocationLocked: false,
    pawnUsable: true,
    emblemCompatible: true,
    explanation:
      'Incredible combat utility against Season 2 Corrupted/Infected foes, climbing attack builds, or anyone looking for an upgraded Hardy knockdown augment. Works for both Arisen and Pawns.',
    notes:
      'Works for Pawns. The accessory itself does not grant any extra stats. Drop type is random (ring/earring/bracelet). Counts as 1 augment slot.',
    effects: [
      {
        name: 'Infected Destroyer LV. 6+',
        effect: 'STR/MAG +50 vs Infection Spikes',
        detail: '50 STR/MAG against infection spikes, instead of 35.'
      },
      {
        name: 'Infected Safeguard LV. 6+',
        effect: 'Infected Damage Taken -35%',
        detail: 'Take 35% less damage from infected enemies, instead of 25%.'
      },
      {
        name: 'Reduced Corruption LV. 6+',
        effect: 'Corruption Resistance +33',
        detail: 'Increases your resistance to Corruption by 33, instead of 25.'
      },
      {
        name: 'Great Grasp LV. 6+',
        effect: 'Climbing Damage +10%',
        detail: 'Deal 10% more damage instead of 7%, when climbing on an enemy.'
      },
      {
        name: 'Hardy LV. 6+',
        effect: 'Knockdown Power +45 (>85% Stamina)',
        detail: 'Knockdown Power +45, instead of 40, when your Stamina is above 85%.'
      }
    ],
    tags: ['Purge', 'Infected Destroyer', 'Corruption', 'Climbing', 'Great Grasp', 'Hardy', 'Knockdown']
  },
  {
    id: 'supreme-night-emperor',
    name: 'Supreme Accessory (⬠ Night Emperor)',
    category: 'Supreme Multi-Augment',
    grade: 'Supreme / Relic',
    symbol: '⬠',
    type: 'Random (Ring, Earring, or Bracelet)',
    vocationLocked: false,
    pawnUsable: true,
    emblemCompatible: true,
    explanation:
      'The main catch of this crest is getting a slightly stronger Sky Annihilation for free and high resistance to Curse. The night-only buffs provide huge stat spikes when farming night spawns. Works for both Arisen and Pawns.',
    notes:
      'Works for Pawns. The accessory itself does not grant extra stats. Drop type is random (ring/earring/bracelet). Counts as 1 augment slot.',
    effects: [
      {
        name: 'Rakshasa LV. 6+',
        effect: 'Max HP at Night +550',
        detail: 'Increases max HP at night by 550, instead of 450.'
      },
      {
        name: 'Yasha LV. 6+',
        effect: 'Max Stamina at Night +400',
        detail: 'Increases max Stamina at night by 400, instead of +350.'
      },
      {
        name: 'Sky Annihilation LV. 6+',
        effect: 'Aerial Attack Damage +13%',
        detail: 'Increases aerial attack damage by 13%, instead of 10%.'
      },
      {
        name: 'Egression LV. 6+',
        effect: 'Grab Escape Ease ↑↑',
        detail: 'Makes it even easier to escape grab attacks.'
      },
      {
        name: 'Holy Body LV. 6+',
        effect: 'Curse Resistance +50',
        detail: 'Increases your resistance to Curse by 50, instead of 30.'
      }
    ],
    tags: ['Night Emperor', 'Sky Annihilation', 'Aerial Damage', 'Curse Resistance', 'Rakshasa', 'Yasha']
  },
  {
    id: 'rookies-ring-of-blessing',
    name: "Rookie's Ring of Blessing",
    category: 'Leveling & Progression',
    grade: 'Common (Special Border)',
    symbol: '⬠',
    type: 'Ring',
    vocationLocked: false,
    pawnUsable: true,
    emblemCompatible: true,
    explanation:
      'Grants 25% more EXP between levels 1 and 40. Permanently turns into a 50% more EXP version upon hitting level 90, but will not work past level 90. Only the wearer benefits from this effect, and Pawns will also have to meet the level requirements to use it.',
    notes:
      'The effect does not stack. Even if the accessory shows an empty crest slot, the effects are active as long as level requirements are met. Does not grant extra stats. Despite fancy icon/bright color, it is Common grade.',
    effects: [
      {
        name: '⬠ Low Level XP Up',
        effect: '+25% EXP (Lv. 1–40) / +50% EXP (Lv. 90)',
        detail: 'Grants 25% more EXP (Lv 1-40). Turns into 50% EXP bonus upon reaching Lv 90 (inactive past Lv 90).'
      }
    ],
    tags: ['Rookie Ring', 'XP Boost', 'Leveling', 'Blessing', 'Rookie']
  },
  {
    id: 'earrings-of-dashing-extreme',
    name: 'Earrings of Dashing - Extreme (Vocation)',
    category: 'Extreme Vocation-Locked',
    grade: 'Extreme / Vocation',
    symbol: '⬠',
    type: 'Earrings',
    vocationLocked: true,
    pawnUsable: true,
    emblemCompatible: true,
    bonusStats: {
      physAtk: 7,
      magAtk: 7,
      endurance: 30,
      hp: 150,
      stamina: 150
    },
    explanation:
      'Grants faster sprint while also reducing the Stamina cost of sprinting. The speed bonus kicks in gradually while sprinting. The speed bonus is priceless—always use this once obtained unless fighting in a tight single-room arena.',
    notes:
      'Vocation-locked. Grants bonus stats: +7 Phys Atk, +7 Mag Atk, +30 Endurance, +150 HP, +150 Stamina. Note: Base stats do not transfer to Job Emblem.',
    effects: [
      {
        name: '⬠ Extreme Dash ST Consumption Reduced',
        effect: 'Faster Sprint + Stamina Cost ↓↓',
        detail: 'Grants faster sprint speed and significantly reduced stamina drain during continuous sprinting.'
      }
    ],
    tags: ['Dashing Extreme', 'Sprint Speed', 'Stamina', 'Vocation Locked', 'Endurance']
  },
  {
    id: 'bracelet-of-unburdening-extreme',
    name: 'Bracelet of Unburdening - Extreme (Vocation)',
    category: 'Extreme Vocation-Locked',
    grade: 'Extreme / Vocation',
    symbol: '⬠',
    type: 'Bracelet',
    vocationLocked: true,
    pawnUsable: true,
    emblemCompatible: true,
    bonusStats: {
      physAtk: 7,
      magAtk: 7,
      chanceAttack: 10,
      hp: 150,
      stamina: 150
    },
    explanation:
      'Reduces overall weight by 100 units. The accessory itself weighs 1, resulting in an effective net weight loss of 99 units. Fantastic for maintaining Light/Very Light encumbrance tiers.',
    notes:
      'Vocation-locked. Grants bonus stats: +7 Phys Atk, +7 Mag Atk, +10 Chance Attack, +150 HP, +150 Stamina.',
    effects: [
      {
        name: '⬠ Extreme Weight Reduction',
        effect: 'Total Weight -100 Units (Net -99)',
        detail: 'Flat reduction of 100 weight units, allowing heavy armor sets to stay in optimal stamina regen bracket.'
      }
    ],
    tags: ['Unburdening Extreme', 'Weight Reduction', 'Encumbrance', 'Chance Attack', 'Vocation Locked']
  },
  {
    id: 'bracelet-of-seizing-extreme',
    name: 'Bracelet of Seizing - Extreme (Vocation)',
    category: 'Extreme Vocation-Locked',
    grade: 'Extreme / Vocation',
    symbol: '⬠',
    type: 'Bracelet',
    vocationLocked: true,
    pawnUsable: true,
    emblemCompatible: true,
    bonusStats: {
      physAtk: 7,
      magAtk: 7,
      endurance: 30,
      hp: 150,
      stamina: 150
    },
    explanation:
      'Greatly increases climbing speed on large monsters. Crucial for climbers targeting cores, head weakspots, or infection spikes before the monster thrashes.',
    notes:
      'Vocation-locked. Grants bonus stats: +7 Phys Atk, +7 Mag Atk, +30 Endurance, +150 HP, +150 Stamina.',
    effects: [
      {
        name: '⬠ Extreme Climb Speed Up',
        effect: 'Climbing Speed ↑↑↑',
        detail: 'Massively accelerates climb speed on monsters for quick core positioning.'
      }
    ],
    tags: ['Seizing Extreme', 'Climb Speed', 'Climbing', 'Cores', 'Vocation Locked']
  },
  {
    id: 'earrings-of-soaring-extreme',
    name: 'Earrings of Soaring - Extreme (Vocation)',
    category: 'Extreme Vocation-Locked',
    grade: 'Extreme / Vocation',
    symbol: '⬠',
    type: 'Earrings',
    vocationLocked: true,
    pawnUsable: true,
    emblemCompatible: true,
    bonusStats: {
      physAtk: 7,
      magAtk: 7,
      endurance: 30,
      hp: 150,
      stamina: 150
    },
    explanation:
      'Greatly increases jump height. Invaluable for aerial attack vocations (Seeker, Fighter, Warrior) or getting a vertical head start when grabbing large flying monsters.',
    notes:
      'Vocation-locked. Grants bonus stats: +7 Phys Atk, +7 Mag Atk, +30 Endurance, +150 HP, +150 Stamina.',
    effects: [
      {
        name: '⬠ Extreme Jump Height Up',
        effect: 'Jump Height ↑↑↑',
        detail: 'Enables high vertical hops to bypass terrain obstacles and grab high monster parts.'
      }
    ],
    tags: ['Soaring Extreme', 'Jump Height', 'Aerial', 'Seeker', 'Vocation Locked']
  },
  {
    id: 'bracelet-of-dashing',
    name: 'Bracelet of Dashing',
    category: 'Universal Mobility',
    grade: 'Universal',
    symbol: '⬠',
    type: 'Bracelet',
    vocationLocked: false,
    pawnUsable: true,
    emblemCompatible: true,
    explanation:
      'Reduces sprint stamina consumption. A universal version of the Dashing accessory usable by all vocations without class restrictions.',
    notes: 'Weaker version of the Extreme variant. Does not grant extra stats. Usable by any vocation.',
    effects: [
      {
        name: '⬠ Dash ST Consumption Reduced',
        effect: 'Sprint Stamina Cost ↓',
        detail: 'Reduces stamina consumed while sprinting.'
      }
    ],
    tags: ['Bracelet of Dashing', 'Sprint', 'Stamina', 'Universal']
  },
  {
    id: 'bracelet-of-unburdening',
    name: 'Bracelet of Unburdening',
    category: 'Universal Mobility',
    grade: 'Universal',
    symbol: '⬠',
    type: 'Bracelet',
    vocationLocked: false,
    pawnUsable: true,
    emblemCompatible: true,
    explanation:
      'Reduces the weight of every piece of gear worn by 20%. Allows all vocations to reduce their loadout weight bracket.',
    notes: 'Weaker version of the Extreme variant. Does not grant extra stats. Usable by any vocation.',
    effects: [
      {
        name: '⬠ Equipment Weight Reduction 20%',
        effect: 'Gear Weight -20%',
        detail: 'Reduces the total weight of all equipped weapons and armor by 20%.'
      }
    ],
    tags: ['Bracelet of Unburdening', 'Weight Reduction', '20%', 'Universal']
  },
  {
    id: 'bracelet-of-soaring',
    name: 'Bracelet of Soaring',
    category: 'Universal Mobility',
    grade: 'Universal',
    symbol: '⬠',
    type: 'Bracelet',
    vocationLocked: false,
    pawnUsable: true,
    emblemCompatible: true,
    explanation:
      'Increases jump height. A universal mobility accessory that can be equipped by any vocation to reach higher platforms.',
    notes: 'Weaker version of the Extreme variant. Does not grant extra stats. Usable by any vocation.',
    effects: [
      {
        name: '⬠ Jump Height Up',
        effect: 'Jump Height ↑',
        detail: 'Increases base jump height for exploration and combat.'
      }
    ],
    tags: ['Bracelet of Soaring', 'Jump Height', 'Mobility', 'Universal']
  },
  {
    id: 'bracelet-of-seizing',
    name: 'Bracelet of Seizing',
    category: 'Universal Mobility',
    grade: 'Universal',
    symbol: '⬠',
    type: 'Bracelet',
    vocationLocked: false,
    pawnUsable: true,
    emblemCompatible: true,
    explanation:
      'Increases climbing speed on large monsters. Universal version usable by any class without vocation requirements.',
    notes: 'Weaker version of the Extreme variant. Does not grant extra stats. Usable by any vocation.',
    effects: [
      {
        name: '⬠ Climb Speed Up',
        effect: 'Climbing Speed ↑',
        detail: 'Increases vertical movement rate when scaling large monsters.'
      }
    ],
    tags: ['Bracelet of Seizing', 'Climbing', 'Climb Speed', 'Universal']
  }
];
