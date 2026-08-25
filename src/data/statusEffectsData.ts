export interface StatusEffectDetail {
  id: string;
  name: string;
  category:
    | 'Elemental Debilitations'
    | 'Instant Death Effects'
    | 'Stat Reduction Debilitations'
    | 'Sealing Debuffs'
    | 'Max Health Reduction'
    | 'Damage Over Time'
    | 'Mobility Reduction'
    | 'Coating Status'
    | 'Buffs & Enhancements';
  icon: string;
  accumulationMethod: string;
  effectOnAllies: string;
  effectOnFoes: string;
  cleanseMethods: string[];
  tacticalNotes: string;
  tags: string[];
}

export const STATUS_ACCUMULATION_OVERVIEW = {
  title: 'Debilitation & Status Accumulation Rules',
  description:
    'Each skill and attack in Dragon\'s Dogma Online has its own hidden multiplier for debilitation accumulation. Typically, multi-hit skills have lower accumulation per strike, while slow, heavy-hitting attacks have higher accumulation rates. Outside of innate elemental attacks, any weapon can build up non-elemental debilitations if you have an appropriate crest or augment equipped. Enemies build dynamic resistance after each successful status trigger, eventually reaching full temporary immunity after repeated activations.',
  rules: [
    'Hit-Count Multipliers: Multi-hit rapid attacks apply small accumulation per tick; heavy single hits apply large bursts of accumulation.',
    'Equipped Crest Accumulation: Any physical attack can accumulate status effects (e.g. Stun, Torpor, Sleep, Poison) if you have the matching crest equipped.',
    'Dynamic Enemy Resistance: After each activation on a monster, its accumulation threshold increases. After 2–3 procs, foes may become temporarily or permanently immune.',
    'Down Phase Stacking: Certain debuffs (Sleep) accumulate during Downed or Exhausted states but only trigger once the monster tries to recover.'
  ]
};

export const STATUS_EFFECTS_DATA: StatusEffectDetail[] = [
  // Elemental Debilitations
  {
    id: 'status-burning',
    name: 'Catching Fire / Burning',
    category: 'Elemental Debilitations',
    icon: '🔥',
    accumulationMethod: 'Only Fire attacks (Invisible accumulation gauge)',
    effectOnAllies:
      'Catch fire, become immobilized, and take damage over time as your character panics. Damage is minor, but total immobilization is dangerous. Repeated button mash fills the escape bar. Cleanse via ally touch, cleansing skills, or burn-curing items.',
    effectOnFoes:
      'Inflicts continuous damage over time that scales directly with the enemy\'s maximum HP. Bosses with enormous health pools take extreme burn damage, and single tick damage can theoretically exceed 9,999 on giant targets. Cancels Frozen Solid.',
    cleanseMethods: ['Ally Touch', 'Button Mash Bar', 'Cure Spot / Cleansing Skills', 'Burn Ointment / Panacea'],
    tacticalNotes: 'Scales with enemy max HP—one of the highest passive DPS sources against massive health pools.',
    tags: ['Burning', 'Catching Fire', 'Fire Element', 'DoT', 'Max HP Scaling', 'Immobilization']
  },
  {
    id: 'status-frozen',
    name: 'Frozen Solid / Freezing',
    category: 'Elemental Debilitations',
    icon: '❄️',
    accumulationMethod: 'Only Ice attacks (Invisible accumulation gauge)',
    effectOnAllies:
      'Freeze completely in place. Any damage taken while frozen is amplified by +10%. Fill escape bar with button mash to break out early. Thaw via ally touch, cleansing skills, or thaw curatives.',
    effectOnFoes:
      'Freezes the enemy solid in place and increases all damage taken from all sources by +10%. Can extend Downed time depending on monster archetype. Fire attacks will instantly thaw and cancel this effect.',
    cleanseMethods: ['Ally Touch', 'Button Mash Bar', 'Thaw Items / Panacea', 'Fire Attacks / Cleansing Skills'],
    tacticalNotes: '+10% universal damage multiplier while frozen; do NOT hit with Fire attacks if you want to keep the target frozen.',
    tags: ['Frozen Solid', 'Freezing', 'Ice Element', 'Damage Amp +10%', 'Down Extension', 'Thaw']
  },
  {
    id: 'status-shock',
    name: 'Shock / Electrify',
    category: 'Elemental Debilitations',
    icon: '⚡',
    accumulationMethod: 'Only Lightning attacks (Invisible accumulation gauge)',
    effectOnAllies:
      'Electricity courses through you, periodically causing involuntary muscle spasms that interrupt all actions and incantations. Devastating for Sorcerers, Priests, and charge-attack vocations. Must be cleansed via skills or items.',
    effectOnFoes:
      'Causes periodic electric spasms that randomly interrupt the enemy\'s actions, attacks, and recovery animations.',
    cleanseMethods: ['Insulation Draught', 'Panacea', 'Priest Cure Spot / Cleansing Skills'],
    tacticalNotes: 'Hard counter against long enemy spell incantations and charge-ups.',
    tags: ['Shock', 'Electrify', 'Lightning Element', 'Interrupt', 'Spasms', 'Casting Disruption']
  },
  {
    id: 'status-holy-drain',
    name: 'Holy Drain',
    category: 'Elemental Debilitations',
    icon: '✨',
    accumulationMethod: 'Only Holy attacks (Invisible accumulation gauge)',
    effectOnAllies:
      'Cripples your Recovery Limit to zero—all hits taken leave little to no recoverable gray HP, rendering high Recovery Limit stats ineffective. Must be cleansed with skills or items.',
    effectOnFoes:
      '10% of all direct damage dealt to the inflicted enemy is converted into recoverable (gray) HP for the attacking Arisen and Pawns.',
    cleanseMethods: ['Holy Cleanser', 'Panacea', 'Priest Cure Spot / Cleansing Skills'],
    tacticalNotes: 'Turns the boss into a massive lifesteal battery for your entire party (10% gray HP leech).',
    tags: ['Holy Drain', 'Holy Element', 'Lifesteal', 'Gray HP', 'Recovery Limit Cripple']
  },
  {
    id: 'status-blind',
    name: 'Blind / Darkness',
    category: 'Elemental Debilitations',
    icon: '🌑',
    accumulationMethod: 'Only Dark attacks (Invisible accumulation gauge)',
    effectOnAllies:
      'Screen is heavily occluded by a swirling, semi-opaque dark miasma. Movement is possible but targeting and dodging require sound cues. Cleansed via eye drops, Panacea, or support skills.',
    effectOnFoes:
      'Affected enemy loses all aggro towards all players/pawns and wanders aimlessly with a dark cloud over its head. Attacks wildly in random directions, loses access to certain skills, and can walk off high ledges into chasms.',
    cleanseMethods: ['Eye Drops', 'Panacea', 'Cure Spot / Cleansing Skills'],
    tacticalNotes: 'Forces enemy to drop all aggro and attack air; excellent CC against aggressive multi-mob rooms.',
    tags: ['Blind', 'Darkness', 'Dark Element', 'Aggro Drop', 'Wander', 'Ledge Fall']
  },

  // Instant Death Effects
  {
    id: 'status-petrification-golden',
    name: 'Golden / Gilded & Petrification',
    category: 'Instant Death Effects',
    icon: '🗿',
    accumulationMethod: 'Petrification/Gold Crests, Spells, or Monster Breaths',
    effectOnAllies:
      'Slowly stiffen into stone or solid glittering gold. When the progression animation finishes, you DIE INSTANTLY and must use a revival charge or Golden Gemstone. Petrify is cured by Cure Spot P, Petrification Cure, or Panacea; Golden is cured by Aqua Regia Sorbet.',
    effectOnFoes:
      'Immobilizes the target and strips all active status effects (accumulations remain). Foes take +25% more Impact damage while solidified. Extends Downed time. Foes do NOT die instantly, but more enemies are weak to Gold than Petrify.',
    cleanseMethods: ['Petrification Cure (Petrify)', 'Aqua Regia Sorbet (Golden)', 'Panacea (Petrify)', 'Priest Cure Spot P'],
    tacticalNotes: 'Does not insta-kill monsters, but grants a huge +25% Impact damage boost and immobilizes them completely.',
    tags: ['Petrification', 'Golden', 'Gilded', 'Instant Death', 'Impact +25%', 'Aqua Regia Sorbet', 'Cure Spot P']
  },
  {
    id: 'status-infected',
    name: 'Infected / Corruption',
    category: 'Instant Death Effects',
    icon: '☣️',
    accumulationMethod: 'Proximity or hits from Season 2 Infected/Corrupted enemies',
    effectOnAllies:
      'Infection advances through 4 lethal stages: Slight → Severe → Critical → Dead. Action speed slows drastically as it worsens. Cured before death with Cure Spot P or Corruption Cure. Allies can cleanse by touching (requires standing still for several seconds).',
    effectOnFoes:
      'Cannot be inflicted on monsters by players. However, infected enemies sprout spikes during combat to gain immense damage reduction and stagger resistance. Break infection spikes and tentacles to neutralize them.',
    cleanseMethods: ['Corruption Cure', 'Priest Cure Spot P', 'Ally Touch Cleansing (Stand Still)'],
    tacticalNotes: 'Carry Corruption Cures into all Season 2 zones—stage 4 is instant unpreventable death.',
    tags: ['Infected', 'Corruption', 'Spikes', 'Instant Death', 'Corruption Cure', 'Season 2']
  },

  // Stat Reduction Debilitations
  {
    id: 'status-def-down',
    name: 'Physical Defense Down & Magick Defense Down',
    category: 'Stat Reduction Debilitations',
    icon: '🛡️',
    accumulationMethod: 'Special skills, specialized crests, or monster curses',
    effectOnAllies:
      'Increases all damage taken from the matching source (Physical or Magick) by +50%. Cleansed via Priest Cure Spot P, Concoction of Light, or Panacea.',
    effectOnFoes:
      'Affected enemy takes +20% more damage from the matching damage type for the duration of the debuff.',
    cleanseMethods: ['Concoction of Light (All Resist Downs)', 'Panacea', 'Priest Cure Spot P'],
    tacticalNotes: 'Applies a clean +20% damage multiplier against boss defenses; stack with elemental weaknesses.',
    tags: ['Defense Down', 'Phys Def Down', 'Mag Def Down', 'Damage +20%', 'Concoction of Light']
  },
  {
    id: 'status-atk-down',
    name: 'Physical Attack Down & Magick Attack Down',
    category: 'Stat Reduction Debilitations',
    icon: '⚔️',
    accumulationMethod: 'Special skills or enemy debuff curses',
    effectOnAllies:
      'Reduces your damage dealt with the matching attack type by -50%. Cured via Priest Cure Spot P, Concoction of Light, or Panacea.',
    effectOnFoes:
      'Reduces the affected enemy\'s matching attack power by -20% for a set duration.',
    cleanseMethods: ['Concoction of Light', 'Panacea', 'Priest Cure Spot P'],
    tacticalNotes: 'Niche defensive utility—typically outclassed by pure damage reduction and defensive positioning.',
    tags: ['Attack Down', 'Phys Atk Down', 'Mag Atk Down', '-50% Outgoing Damage']
  },
  {
    id: 'status-elem-resist-down',
    name: 'Element Resist Down',
    category: 'Stat Reduction Debilitations',
    icon: '🔮',
    accumulationMethod: 'Element Archer / Sorcerer spells, elemental arrows, or boss auras',
    effectOnAllies:
      'Increases elemental damage taken from the matching element by +50%. Cleansed via Priest Cure Spot P or Concoction of Light. Note: Panacea does NOT cure Element Resist Down!',
    effectOnFoes:
      'Increases damage taken by the affected enemy by +10% from the matching element for a set duration.',
    cleanseMethods: ['Concoction of Light', 'Priest Cure Spot P (Panacea does NOT work)'],
    tacticalNotes: 'Concoction of Light is mandatory for elemental debuff cleansing because standard Panacea fails.',
    tags: ['Element Resist Down', 'Elemental Vulnerability', 'Concoction of Light', 'Cure Spot P']
  },
  {
    id: 'status-soften-frail',
    name: 'Soften / Frail',
    category: 'Stat Reduction Debilitations',
    icon: '💔',
    accumulationMethod: 'Special debuff strikes, blunt blunt strikes, or specialized monster curses',
    effectOnAllies:
      'Cripples your Endurance and Knockdown Power to near-zero: every minor scratch staggers or blows you away, and you cannot stagger enemies. Cleanse immediately via support skills or consumables.',
    effectOnFoes:
      'Severely reduces the enemy\'s Endurance, making them drastically easier to stagger and interrupt. Acts as an indirect Knockdown Power buff for the entire party. Large Beasts and Giants can be knocked down even without Enrage.',
    cleanseMethods: ['Endurance Tonic', 'Panacea', 'Priest Cure Spot / Cleansing Skills'],
    tacticalNotes: 'Allows non-enraged Giants/Beasts to be staggered and toppled with standard light attacks.',
    tags: ['Soften', 'Frail', 'Endurance Cripple', 'Knockdown Buff', 'Stagger Ease']
  },

  // Sealing Debuffs
  {
    id: 'status-skills-sealed',
    name: 'Skills Stifled / Skills Sealed',
    category: 'Sealing Debuffs',
    icon: '🚫',
    accumulationMethod: 'Monster curses, sealing fog, or silence attacks',
    effectOnAllies:
      'Completely locks and disables all Custom Weapon Skills and Spells. You cannot cast cleansing spells on yourself, so you must rely on consumables (Throat Drops/Panacea) or party support.',
    effectOnFoes:
      'Disables spells and high-tier special attacks on enemies. In certain fringe cases (such as Golems), monsters can temporarily lose access to their entire offensive moveset.',
    cleanseMethods: ['Throat Drops', 'Panacea', 'Ally / Support Cleansing'],
    tacticalNotes: 'Always carry Throat Drops—you cannot cast your own support spells while silenced.',
    tags: ['Skills Sealed', 'Skills Stifled', 'Silence', 'No Custom Skills', 'Throat Drops']
  },
  {
    id: 'status-items-sealed',
    name: 'Items Sealed',
    category: 'Sealing Debuffs',
    icon: '🎒',
    accumulationMethod: 'Special sealing curses and sealing mist traps',
    effectOnAllies:
      'Unable to use ANY inventory items whatsoever, including Elixirs and Special Arrows. Can ONLY be cleansed by ally support skills. Afflicted Pawns will not receive master consumable buffs.',
    effectOnFoes: 'Not applicable (monsters do not use inventory items).',
    cleanseMethods: ['Priest Cure Spot / Cleanse Skills Only (Items are disabled!)'],
    tacticalNotes: 'Cannot be item-cleansed because your inventory is locked; requires a support healer in party.',
    tags: ['Items Sealed', 'Inventory Lock', 'No Potions', 'Cleanse Skills Only']
  },

  // Max Health Reduction
  {
    id: 'status-cursed',
    name: 'Cursed',
    category: 'Max Health Reduction',
    icon: '☠️',
    accumulationMethod: 'Only Shadow / Cursed monster species attacks',
    effectOnAllies:
      'Halves (50%) your maximum HP bar. Health-threshold augments recalculate to the new 50% max and continue functioning. CANNOT be cured by standard skills or consumable items. Only cleansed by resting at an Inn / Safe Area, dying, relogging, or rare purification fountains.',
    effectOnFoes: 'Not applicable.',
    cleanseMethods: ['Inn Rest / Safe Area', 'Relog', 'Death / Revival', 'Rare Purification Fountains'],
    tacticalNotes: 'Cannot be healed mid-dungeon without death/relog—equip Holy Body (+50 Curse res) or Night Emperor.',
    tags: ['Cursed', 'Max HP Halved', '50% HP', 'Shadow Enemies', 'No Item Cure', 'Inn Rest']
  },
  {
    id: 'status-weakness',
    name: 'Weakness / Weakened',
    category: 'Max Health Reduction',
    icon: '📉',
    accumulationMethod: 'Occurs exclusively upon standard revival without Golden Gemstone',
    effectOnAllies:
      'Maximum HP is reduced by -25%, and you take +15% more damage from all incoming attacks (which allows enemy hits to exceed the normal 9,999 damage cap). Cured by paying a small fee to any Innkeeper or relogging.',
    effectOnFoes: 'Not applicable.',
    cleanseMethods: ['Innkeeper Healing (Gold Fee)', 'Relog'],
    tacticalNotes: 'Damage taken can exceed 9,999 while weakened—use Golden Gemstone revives in raids to avoid this.',
    tags: ['Weakness', 'Weakened', 'Revival Penalty', '-25% HP', '+15% Damage Taken', 'Innkeeper']
  },

  // Damage Over Time
  {
    id: 'status-poison',
    name: 'Poison',
    category: 'Damage Over Time',
    icon: '🧪',
    accumulationMethod: 'Poison crests, venom pools, Arachne/Chimera venom strikes',
    effectOnAllies:
      'Inflicts periodic minor poison tick damage and a green visual effect. Very easy to cleanse with Antidotes, Panacea, or any basic support skill. Poses little threat on players.',
    effectOnFoes:
      'Deals periodic damage over time that scales with the enemy\'s maximum HP. Extremely potent in endgame raids against giant boss health pools, with ticks capable of exceeding 9,999 on high-tier bosses.',
    cleanseMethods: ['Antidote', 'Panacea', 'Priest Cure Spot / Cleansing Skills'],
    tacticalNotes: 'Scales with boss Max HP—fantastic passive damage on high-difficulty endgame raids.',
    tags: ['Poison', 'Venom', 'DoT', 'Max HP Scaling', 'Antidote', 'Boss Melt']
  },

  // Mobility Reduction
  {
    id: 'status-torpor-slow',
    name: 'Torpor / Slow',
    category: 'Mobility Reduction',
    icon: '⏳',
    accumulationMethod: 'Torpor crests, High Scepter/Sorcerer slow spells, or spider webs',
    effectOnAllies:
      'All animation, movement, casting, and charging speeds are halved (50% slower). One of the most crippling debuffs in the game. Cleansed via Panacea or support cleanse spells.',
    effectOnFoes:
      'Cuts enemy movement and attack animation speed by 50%. While it does not directly add seconds to a Down timer, the falling down animation is slowed, extending the effective damage window.',
    cleanseMethods: ['Panacea', 'Priest Cure Spot / Cleansing Skills'],
    tacticalNotes: 'Halves boss attack speed; slows down the "falling down" animation to extend damage phases.',
    tags: ['Torpor', 'Slow', 'Animation Speed Halved', 'Casting Delay', 'Down Extension', 'Panacea']
  },
  {
    id: 'status-knockout-stun',
    name: 'Knockout / Stun',
    category: 'Mobility Reduction',
    icon: '💫',
    accumulationMethod: 'Stun crests, blunt weapon skills (Pommel Bash, Shield Slaps)',
    effectOnAllies:
      'Lose all character control and wobble in place with stars circling your head. Fill escape bar via rapid button mashing, receive an ally touch, or use Stun curatives/skills.',
    effectOnFoes:
      'Enemy stops all movement and wobbles in a dazed state. Does NOT extend the Downed timer—if an enemy recovers from Down while stunned, it will stand up and remain stunned while upright.',
    cleanseMethods: ['Ally Touch', 'Button Mash Bar', 'Smelling Salts / Panacea', 'Cure Spot'],
    tacticalNotes: 'Does NOT freeze or extend Down timers—bosses stand up on schedule and remain stunned while standing.',
    tags: ['Stun', 'Knockout', 'Daze', 'Wobble', 'Button Mash', 'Downed Timer Rule']
  },
  {
    id: 'status-sleep',
    name: 'Sleep',
    category: 'Mobility Reduction',
    icon: '💤',
    accumulationMethod: 'Sleep crests, Sleep Arrows, or Siren singing',
    effectOnAllies:
      'Collapse to the ground in deep slumber. The next instance of direct damage taken deals 2x DOUBLE damage. Easily cleansed via items, ally touch, or cleanse spells.',
    effectOnFoes:
      'Target collapses and sleeps for a prolonged duration unless directly struck. Sleeping foes take +10% damage. Any direct hit, Shock, Burning, Stun, or Enrage break wakes them immediately. Accumulates during Down/Exhausted phases.',
    cleanseMethods: ['Ally Touch', 'Sedative Cleanser / Panacea', 'Taking Direct Damage'],
    tacticalNotes: 'Next hit deals double damage on asleep players. Foes wake up on any damage instance.',
    tags: ['Sleep', '2x Wakeup Damage', 'Crowd Control', 'Sleep Arrows', 'Down Accumulation']
  },

  // Coating Status
  {
    id: 'status-drenched',
    name: 'Drenched',
    category: 'Coating Status',
    icon: '💧',
    accumulationMethod: 'Deep water, waterfalls, water element flasks, or rain',
    effectOnAllies:
      'Soaked in water. The next incoming Ice attack will instantly freeze you solid, and Lightning damage will instantly inflict Shock. Extinguishes your lantern. Frozen, Shock, or Fire cancels Drenched.',
    effectOnFoes:
      'Soaks the monster in water. Greatly accelerates accumulation rates for Frozen Solid (Ice) and Shock (Lightning). Monster takes increased Ice and Lightning damage.',
    cleanseMethods: ['Drying Powder', 'Catching Fire', 'Frozen Solid or Shock Proc'],
    tacticalNotes: 'Primer for instant Freeze and Shock combos; relight lantern immediately if safe.',
    tags: ['Drenched', 'Soaked', 'Lantern Out', 'Instant Freeze Primer', 'Instant Shock Primer', 'Ice/Lightning Combo']
  },
  {
    id: 'status-tarred',
    name: 'Tarred',
    category: 'Coating Status',
    icon: '🛢️',
    accumulationMethod: 'Tar flasks, oil traps, or Tarred Arrows',
    effectOnAllies:
      'Covered in flammable tar. Turns your lantern off; having a lit lantern when hit or relighting your lantern while Tarred will INSTANTLY ignite you in flames. The next Fire hit causes instant Burning.',
    effectOnFoes:
      'Coats the monster in flammable tar. Fire attacks accumulate Catching Fire / Burning significantly faster and deal increased Fire damage. Igniting the monster consumes the Tarred coating.',
    cleanseMethods: ['Soap / Cleansing Powder', 'Catching Fire (Consumes Tar)'],
    tacticalNotes: 'DO NOT light your lantern while Tarred—you will instantly set yourself on fire.',
    tags: ['Tarred', 'Oil', 'Flammable', 'Instant Fire Primer', 'Lantern Danger', 'Fire Synergy']
  },

  // Buffs & Enhancements
  {
    id: 'status-atk-up',
    name: 'Physical Attack Up & Magickal Attack Up',
    category: 'Buffs & Enhancements',
    icon: '🗡️',
    accumulationMethod: 'Attack Talismans, Food items, Support buffs',
    effectOnAllies:
      '+25% outgoing damage bonus for the matching damage type. Stacks with support vocation buffs (Priest/Alchemist), but does NOT stack with other consumable talismans.',
    effectOnFoes:
      'Buffed enemy deals +25% more damage. Can be negated and overridden by applying the matching Attack Down debuff.',
    cleanseMethods: ['Not applicable (Buff). Dispel enemies with Attack Down debuffs.'],
    tacticalNotes: '+25% attack boost; talisman duration scales with item tier.',
    tags: ['Attack Up', 'Phys Atk Up', 'Mag Atk Up', '+25% Damage', 'Talismans']
  },
  {
    id: 'status-def-up',
    name: 'Physical Defense Up & Magickal Defense Up',
    category: 'Buffs & Enhancements',
    icon: '🛡️',
    accumulationMethod: 'Defense Talismans, Food items, Support buffs',
    effectOnAllies:
      '-25% incoming damage reduction for the matching damage type. Stacks with support skills, but not with duplicate food/talismans.',
    effectOnFoes:
      'Enemy takes -25% less damage. War-Ready enemies enrage with Physical Defense Up. Can be negated by applying Defense Down.',
    cleanseMethods: ['Not applicable (Buff). Dispel enemies with Defense Down debuffs.'],
    tacticalNotes: 'War-Ready enrage grants Phys Def Up—counter with Defense Down debuffs.',
    tags: ['Defense Up', 'Phys Def Up', 'Mag Def Up', '-25% Damage Taken', 'War-Ready Counter']
  },
  {
    id: 'status-max-hp-st-up',
    name: 'Max HP Up & Max Stamina Up',
    category: 'Buffs & Enhancements',
    icon: '♨️',
    accumulationMethod: 'Hot springs (Kinoza), Room Baths (Paradise Hot Tub), Gala Pickling / Pill of Savages',
    effectOnAllies:
      'Temporarily expands maximum HP and Stamina pools. Buff duration can be extended to 35 minutes via Extended Springs augment and Supreme Inquiry accessory. Paradise Hot Tub provides the highest tier bonus.',
    effectOnFoes: 'Not applicable.',
    cleanseMethods: ['Not applicable (Beneficial Buff)'],
    tacticalNotes: 'Paradise Hot Tub in private room + Supreme Inquiry = 35 minutes of massive HP/ST buffs.',
    tags: ['Hot Springs', 'Paradise Hot Tub', 'Max HP Up', 'Max Stamina Up', 'Inquiry', 'Extended Springs']
  },
  {
    id: 'status-corruption-resist-up',
    name: 'Corruption Resist Up',
    category: 'Buffs & Enhancements',
    icon: '🛡️',
    accumulationMethod: 'Corruption Preventative / Superior Corruption Preventative',
    effectOnAllies:
      'Bestows massive resistance against Season 2 Infection / Corruption. Superior variant lasts significantly longer.',
    effectOnFoes: 'Not applicable.',
    cleanseMethods: ['Not applicable (Beneficial Buff)'],
    tacticalNotes: 'Drink before engaging Season 2 corrupted bosses to prevent rapid stage-4 death.',
    tags: ['Corruption Preventative', 'Infection Ward', 'Season 2 Buff']
  },
  {
    id: 'status-enhance',
    name: 'Enhance (Golden Gemstone Invulnerability)',
    category: 'Buffs & Enhancements',
    icon: '👑',
    accumulationMethod: 'Reviving via a Golden Gemstone',
    effectOnAllies:
      'Grants 60 seconds of absolute invulnerability to all damage, debuffs, status ailments, and death. Cannot be stripped or removed by any mechanic.',
    effectOnFoes: 'Not applicable.',
    cleanseMethods: ['Not applicable (Permanent 60s Godmode)'],
    tacticalNotes: '60 seconds of true godmode—use this window to revive the entire party or burn down the raid boss.',
    tags: ['Enhance', 'Golden Gemstone', '60s Invulnerable', 'True Godmode', 'Raid Clutch']
  }
];
