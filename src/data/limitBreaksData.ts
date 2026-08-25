export interface LimitBreakOption {
  id: string;
  name: string;
  category: 'Weapon' | 'Armor';
  tierValue: string;
  priorityTier: 'Top Tier (Must-Have / High Priority)' | 'Situational / Strategy Dependent' | 'Low Priority / Not Recommended';
  explanation: string;
  usageCasesAndSuggestions: string;
  numericalImpact?: string;
  synergies?: string[];
  tags: string[];
}

export const LIMIT_BREAKS_OVERVIEW = {
  title: 'Gear Limit Break System & Max Roll Guide',
  unlockRequirement: 'Item upgraded to 4-Star maximum enhancement level',
  npcs: [
    { name: 'Craig', location: 'Craft Room (White Dragon Temple)' },
    { name: 'Suleiman', location: 'Megado Workshop (Megado)' }
  ],
  description:
    'When a weapon, armor piece, or clothing reaches 4-star enhancement, it cannot be upgraded further via standard crafting. You can then apply a Limit Break at Craig or Suleiman to roll powerful affix bonuses and stat multipliers onto the piece.',
  coreRules: [
    'RNG & Currency Strategy: The odds of rolling a maximum Limit Break value via Rift Crystals (RC) are exceptionally low. Always use Limit Break Tickets and Golden Gemstones for high/max rolls whenever available.',
    'Focus Strategy (All-In): It is virtually always better to go all-in stacking a single specialized effect (e.g. 100 Recovery Limit on armor, or +100 Phys/Mag Defense Down on weapons) rather than spreading rolls thinly across disparate stats.',
    'Weapon Debilitation Overrides: Rolling an Elemental Debilitation (+50) will override your weapon\'s innate element to match that specific debilitation.',
    'Hard Caps: Recovery Limit caps at 100 (95 needed from gear + 5 innate from Vocation Emblem). Resist Debilitation stats cap at 100 (which grants 100% total immunity).'
  ]
};

export const LIMIT_BREAKS_DATA: LimitBreakOption[] = [
  // ==========================================
  // WEAPON LIMIT BREAK OPTIONS
  // ==========================================
  {
    id: 'lb-wep-knockdown',
    name: 'Knockdown Power +100',
    category: 'Weapon',
    tierValue: '+100 KD Power',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Substantially increases the weapon\'s Knockdown Power multiplier. Vital for breaking enemy stamina, filling Break Gauges, and staggering monsters.',
    usageCasesAndSuggestions: 'Extremely useful for vocations with low innate Knockdown Power (Sorcerer, Priest, Alchemist, Elemental Archer). Accessories can only roll a maximum of +20 KD Power, making this weapon roll virtually irreplaceable. Priceless Limit Break if crafting a weapon specifically against War-Ready enemies (Season 3 Blow Damage scaling).',
    numericalImpact: '+100 Knockdown Power (Accessories max out at +20)',
    synergies: ['War-Ready Blow Damage', 'Break Gauge Accumulation', 'Exhaust Attack', 'High Stagger Vocations'],
    tags: ['Weapon', 'Knockdown Power', 'War-Ready', 'Break Gauge', 'Stamina Stagger', 'Top-Tier']
  },
  {
    id: 'lb-wep-phys-def-down',
    name: 'Physical Defense Down +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Accumulates the Physical Defense Down debilitation on struck targets.',
    usageCasesAndSuggestions: 'Superb debuff for all physical DPS vocations (Fighter, Warrior, Hunter, Seeker, High Orbiter). When active, the afflicted enemy takes +20% more damage from all physical attacks. Stacks exceptionally well when paired with Physical Defense Down accessories and pawn debuff orders.',
    numericalImpact: 'Enemies take +20% damage from all physical attacks while active',
    synergies: ['Physical DPS Vocations', 'Defense Down Accessories', 'Down Phase Burst'],
    tags: ['Weapon', 'Physical Defense Down', 'Debuff', 'Damage Multiplier', '+20% Damage', 'Top-Tier']
  },
  {
    id: 'lb-wep-mag-def-down',
    name: 'Magick Defense Down +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Accumulates the Magick Defense Down debilitation on struck targets.',
    usageCasesAndSuggestions: 'Premier debuff for magick-heavy compositions (Sorcerer, Priest, Elemental Archer, Spirit Lancer). Makes the enemy take +20% more damage from all magickal attacks while active. Stacks effectively with magick defense-down rings and bracelets.',
    numericalImpact: 'Enemies take +20% damage from all magickal attacks while active',
    synergies: ['Magick DPS Vocations', 'Sorcerer Burst', 'Down Phase Nukes'],
    tags: ['Weapon', 'Magick Defense Down', 'Debuff', 'Damage Multiplier', '+20% Magick', 'Top-Tier']
  },
  {
    id: 'lb-wep-poison',
    name: 'Poison +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Accumulates Poison debilitation on enemies with each attack.',
    usageCasesAndSuggestions: 'Extremely potent against endgame bosses and high-tier raid monsters with massive HP pools, since poison damage scales relative to the target\'s maximum health pool. Combos lethally with Dark Force (Shield Sage) to stack rapid poison ticks. Ineffective against poison-immune targets or low-HP trash mobs.',
    numericalImpact: 'Deals sustained percentage damage scaling with target Max HP',
    synergies: ['Dark Force (Shield Sage)', 'High HP Raid Bosses', 'Poison Accessories'],
    tags: ['Weapon', 'Poison', 'DoT', 'Max HP Scaling', 'Dark Force', 'Raid Bosses']
  },
  {
    id: 'lb-wep-torpor',
    name: 'Torpor +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Accumulates Torpor (Slow) on the target, drastically reducing all enemy movement and attack animation speeds.',
    usageCasesAndSuggestions: 'Universally useful against any enemy susceptible to Torpor. Slowing a hyper-aggressive boss completely changes the safety and pace of battle. Stacks even faster when combined with Torpor accessories.',
    numericalImpact: '~50% reduction to enemy animation and movement speed',
    synergies: ['Torpor Accessories', 'Aggressive Boss Taming', 'Cast Time Safety'],
    tags: ['Weapon', 'Torpor', 'Slow', 'Crowd Control', 'Boss Safety', 'Top-Tier']
  },
  {
    id: 'lb-wep-sleep',
    name: 'Sleep +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Accumulates Sleep on the target, putting them into a dormant incapacitated state until struck by heavy damage.',
    usageCasesAndSuggestions: 'Extremely potent crowd control tool that allows you to disable one boss while your party focuses down another in dual-boss encounters. Great synergy when stacking Sleep accessories. Requires party discipline to avoid waking the sleeping target prematurely.',
    numericalImpact: 'Completely disables enemy action until heavy damage threshold is met',
    synergies: ['Multi-Boss Encounters', 'Sleep Accessories', 'Setup Heavy Burst'],
    tags: ['Weapon', 'Sleep', 'Crowd Control', 'Multi-Boss', 'Incapacitate']
  },
  {
    id: 'lb-wep-petrification',
    name: 'Petrification +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Situational / Strategy Dependent',
    explanation: 'Turns the target to stone upon maximum accumulation, completely immobilizing them.',
    usageCasesAndSuggestions: 'A popular choice for specialized impact burst builds. Petrified enemies take +25% bonus Impact (Blunt) damage. Note: Triggering Petrification instantly purges/deletes all other active debuffs on the target, so coordinate with your party before applying it.',
    numericalImpact: '+25% Impact damage taken by enemy; purges all other active debuffs',
    synergies: ['Warrior / Shield Sage Impact Attacks', 'Golems & Armored Foes'],
    tags: ['Weapon', 'Petrification', 'Stone', 'Impact +25%', 'Debuff Purge']
  },
  {
    id: 'lb-wep-golden',
    name: 'Gilded / Golden +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Situational / Strategy Dependent',
    explanation: 'Encases the target in solid gold, completely immobilizing them.',
    usageCasesAndSuggestions: 'Functions identically to Petrification (+25% bonus Impact damage taken, purges all other active debuffs), but significantly more endgame monsters are vulnerable to Golden than Petrification. Excellent alternative for Alchemist or Impact-heavy setups.',
    numericalImpact: '+25% Impact damage taken by enemy; purges all other active debuffs',
    synergies: ['Alchemist Golden Enfeeblement', 'Impact Weapon Arts'],
    tags: ['Weapon', 'Gilded', 'Golden', 'Impact +25%', 'Gold Encasement', 'Debuff Purge']
  },
  {
    id: 'lb-wep-stun',
    name: 'Stun Power +100',
    category: 'Weapon',
    tierValue: '+100 Stun Power',
    priorityTier: 'Situational / Strategy Dependent',
    explanation: 'Increases the weapon\'s Stun Power accumulation on consecutive blows.',
    usageCasesAndSuggestions: 'Useful if your specific build focuses on dizzying enemies quickly. Accessories cap at +20 Stun Power, but augments already provide substantial Stun Power, making this a secondary priority behind Knockdown Power.',
    numericalImpact: '+100 Stun Power (Accessories max out at +20)',
    synergies: ['Stun Augments', 'Shield Sage Stun Skills', 'Fighter Shield Bashing'],
    tags: ['Weapon', 'Stun Power', 'Dizziness', 'Stun Augments']
  },
  {
    id: 'lb-wep-elemental-debilitation',
    name: 'Elemental Debilitation +50',
    category: 'Weapon',
    tierValue: '+50 Accumulation (Overrides Weapon Element)',
    priorityTier: 'Situational / Strategy Dependent',
    explanation: 'Increases elemental debilitation buildup for a specific element (Burn, Freeze, Shock, Holy Drain, Darkness).',
    usageCasesAndSuggestions: 'Elemental Forces already grant heavy debilitation buildup. Note: Rolling this will permanently override your weapon element to match the chosen debilitation. Only recommended for dedicated mono-element niche builds.',
    numericalImpact: '+50 Elemental Buildup (Overrides weapon innate element)',
    synergies: ['Elemental Forces', 'Mono-Element Specialist Builds'],
    tags: ['Weapon', 'Elemental Debilitation', 'Element Override', 'Specialist']
  },
  {
    id: 'lb-wep-skill-stifling',
    name: 'Skill Stifling +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Low Priority / Not Recommended',
    explanation: 'Silences enemy spellcasting and special skill usage.',
    usageCasesAndSuggestions: 'Useful only when fighting enemies that rely heavily on spells/magic. However, Light Force (Holy) already applies Skill Stifling innately, making this a wasted Limit Break roll compared to Knockdown or Defense Down.',
    numericalImpact: 'Silences spellcasting on afflicted targets',
    synergies: ['Light Force', 'Anti-Mage Specialists'],
    tags: ['Weapon', 'Skill Stifling', 'Silence', 'Light Force Redundancy']
  },
  {
    id: 'lb-wep-frail',
    name: 'Frail +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Low Priority / Not Recommended',
    explanation: 'Reduces enemy Endurance and Knockdown Power.',
    usageCasesAndSuggestions: 'Cripple enemy poise, but it is far more efficient to apply Frail via specific class skills (e.g. Shield Sage / Alchemist) rather than sacrificing your primary weapon Limit Break slot.',
    tags: ['Weapon', 'Frail', 'Endurance Down', 'Skill Redundant']
  },
  {
    id: 'lb-wep-element-resist-down',
    name: 'Element Resist Down +100',
    category: 'Weapon',
    tierValue: '+100 Accumulation',
    priorityTier: 'Low Priority / Not Recommended',
    explanation: 'Inflicts elemental resistance reduction on the target.',
    usageCasesAndSuggestions: 'Elemental Forces already provide massive elemental resistance debuffs. The debuff only amplifies elemental damage by +10%, making Physical or Magick Defense Down (+20%) vastly superior.',
    numericalImpact: '+10% elemental damage amp (inferior to +20% Phys/Mag Def Down)',
    tags: ['Weapon', 'Element Resist Down', 'Low Scaling', 'Not Recommended']
  },
  {
    id: 'lb-wep-drenching-tarring',
    name: 'Drenching +100 / Tarring +100',
    category: 'Weapon',
    tierValue: '+100 Accumulation',
    priorityTier: 'Low Priority / Not Recommended',
    explanation: 'Applies Drenched (Water) or Tarred (Oil) status to targets.',
    usageCasesAndSuggestions: 'Not worth it. Lightning Force and Ice Force already apply Drenching naturally, while Fire Force applies Tarring. Stacking weapon Limit Breaks for these wastes your highest offensive affix slot.',
    tags: ['Weapon', 'Drenching', 'Tarring', 'Force Skill Redundancy', 'Not Recommended']
  },
  {
    id: 'lb-wep-atk-down',
    name: 'Physical / Magick Attack Down +100',
    category: 'Weapon',
    tierValue: '+100 Debilitation Accumulation',
    priorityTier: 'Low Priority / Not Recommended',
    explanation: 'Reduces enemy physical or magickal attack power.',
    usageCasesAndSuggestions: 'Low value. Can easily be inflicted with specific support skills or accessories without sacrificing your weapon Limit Break slot.',
    tags: ['Weapon', 'Attack Down', 'Low Value', 'Not Recommended']
  },

  // ==========================================
  // ARMOR LIMIT BREAK OPTIONS
  // ==========================================
  {
    id: 'lb-arm-recovery-limit',
    name: 'Recovery Limit +30',
    category: 'Armor',
    tierValue: '+30 Recovery Limit',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Increases the Recovery Limit (white portion of health bar) preserved when taking damage.',
    usageCasesAndSuggestions: 'First priority across all armor and clothing pieces! Hard caps at 100 total. You get +5 innate Recovery Limit from your Vocation Emblem, meaning you only need +95 from gear rolls. Critical synergy with Self Feedback and green healing auras; crippled by Holy Drain.',
    numericalImpact: 'Hard caps at 100 total (+5 innate from Vocation Emblem + 95 from gear)',
    synergies: ['Self Feedback Augment', 'Green Healer Spot', 'White Health Preservation'],
    tags: ['Armor', 'Recovery Limit', 'White Health', 'First Priority', 'Cap 100', 'Top-Tier']
  },
  {
    id: 'lb-arm-endurance',
    name: 'Endurance +30',
    category: 'Armor',
    tierValue: '+30 Endurance',
    priorityTier: 'Top Tier (Must-Have / High Priority)',
    explanation: 'Increases your character\'s poise and resistance to being staggered or knocked back by enemy attacks.',
    usageCasesAndSuggestions: 'Second priority on armor and clothing after hitting the 100 Recovery Limit cap. Allows you to complete skill animations, charge spells, and maintain climbing grips through incoming hits without flinching.',
    numericalImpact: 'Substantial poise and flinch reduction against boss attacks',
    synergies: ['Channeling Spells', 'Charged Weapon Arts', 'Super Armor / Poise'],
    tags: ['Armor', 'Endurance', 'Poise', 'Flinch Resistance', 'Second Priority', 'Top-Tier']
  },
  {
    id: 'lb-arm-resist-debilitation',
    name: 'Resist Debilitation +30 (Golden / Curse)',
    category: 'Armor',
    tierValue: '+30 Resistance',
    priorityTier: 'Situational / Strategy Dependent',
    explanation: 'Increases resistance against severe debilitating ailments.',
    usageCasesAndSuggestions: 'Caps at 100 (granting 100% complete immunity). The most notable resistances worth rolling are Golden and Curse. For most other common ailments, carrying curative consumables or relying on pawn cleansing is cheaper and faster.',
    numericalImpact: 'Caps at 100 (Total 100% Immunity)',
    synergies: ['Golden / Curse Boss Raids', 'Tank Immunity Builds'],
    tags: ['Armor', 'Resist Debilitation', 'Golden Immunity', 'Curse Immunity', 'Cap 100']
  },
  {
    id: 'lb-arm-resist-elemental-debilitation',
    name: 'Resist Elemental Debilitation +30',
    category: 'Armor',
    tierValue: '+30 Resistance',
    priorityTier: 'Situational / Strategy Dependent',
    explanation: 'Increases resistance against elemental statuses (Burn, Freeze, Shock, Holy Drain, Darkness).',
    usageCasesAndSuggestions: 'Caps at 100 (100% immunity). Useful for tank vocations (Shield Sage / Alchemist) facing high-element raid bosses (e.g. Freeze immunity against Ice Drakes, Burn immunity against Blaze monsters).',
    numericalImpact: 'Caps at 100 (Total 100% Immunity)',
    synergies: ['Elemental Boss Raids', 'Tank Mitigation'],
    tags: ['Armor', 'Elemental Debilitation Resist', 'Freeze Immunity', 'Burn Immunity', 'Cap 100']
  },
  {
    id: 'lb-arm-element-resist',
    name: 'Element Resist +30',
    category: 'Armor',
    tierValue: '+30 Flat Element Defense',
    priorityTier: 'Situational / Strategy Dependent',
    explanation: 'Provides flat damage reduction against a specific elemental attribute (Fire, Ice, Lightning, Holy, Dark).',
    usageCasesAndSuggestions: 'Certain armor pieces have innate elemental resistances. Rolling additional element resist helps mitigate intense elemental raid mechanics, but general Endurance and Recovery Limit offer broader defensive utility.',
    tags: ['Armor', 'Element Resist', 'Flat Defense', 'Mitigation']
  }
];
