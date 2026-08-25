export interface CombatMechanicState {
  stateName: string;
  badge?: string;
  summary: string;
  mechanics: string[];
  tacticalTips: string[];
}

export interface CombatPhaseSystem {
  id: string;
  name: string;
  seasonCategory: 'Core Combat (All Seasons)' | 'Season 1: Alchemized' | 'Season 2: Infected' | 'Season 3: War-Ready' | 'Season 3: Blaze';
  icon: string;
  overview: string;
  states: CombatMechanicState[];
  keyStatsAndSkills: string[];
  audioVisualCues: string[];
  tags: string[];
}

export const COMBAT_FLOW_DATA: CombatPhaseSystem[] = [
  // 1. Core Enrage System
  {
    id: 'combat-enrage-system',
    name: 'Enrage, Break Gauges & Down Phase System',
    seasonCategory: 'Core Combat (All Seasons)',
    icon: '⚡',
    overview:
      'The foundational combat loop for virtually all large monsters and boss encounters in Dragon\'s Dogma Online. Mastering the transition from Normal → Enraged → Tired (Shake) → Exhausted → Downed is the key to sub-3-minute raid clears.',
    states: [
      {
        stateName: 'Normal State',
        badge: 'Base Phase',
        summary: 'Standard initial combat mode for most large monsters with standard damage intake and baseline moveset.',
        mechanics: [
          'Deals and receives standard damage multipliers (1.0x baseline).',
          'Enemies exhibit standard aggression and baseline movesets.',
          'Exception: Elder Dragons are perpetually Enraged at all times from the start of combat.'
        ],
        tacticalTips: [
          'Burst down health quickly to trigger the Enraged threshold.',
          'Buff the party and coordinate elemental affinities before Enrage triggers.'
        ]
      },
      {
        stateName: 'Enraged State',
        badge: '70% Damage Reduction',
        summary: 'Boss enters high-threat mode: damage taken is cut by ~70%, revealing the stamina bar and Break Gauge.',
        mechanics: [
          'Incoming damage is reduced by ~70% overall.',
          'Stamina bar appears beneath the health bar, alongside a shield icon representing the Break Gauge.',
          'Knockdown Power fills the Break Gauge on hit.',
          'Revealing the Secret Core (Green Vocation Core Skills) deals heavy stamina damage, maximized if attack element matches the core color.',
          'White "Chance Cores" do NOT display a Break Gauge, but follow identical core damage mechanics.',
          'Bosses will use a "Struggle" (yellow icon) action to throw off clinging players. Players can "Resist" with timely button inputs by watching the enemy animation rather than the icon prompt.'
        ],
        tacticalTips: [
          'Healers must immediately reveal the Secret Core using Core Skills.',
          'Match weapon enchantment to the Secret Core color for 1.5x+ stamina damage multiplier.',
          'Do NOT mash blindly during Struggle; time your Resist input to character bracing animation.'
        ]
      },
      {
        stateName: 'Tired State',
        badge: 'Climb & Shake Phase',
        summary: 'Filling the Break Gauge staggers the boss and turns the stamina bar BLUE—climb and Shake!',
        mechanics: [
          'Triggered when the Break Gauge is completely filled with Knockdown Power.',
          'Stamina bar turns bright blue, and the enemy is briefly staggered.',
          'Enemies take exponentially higher stamina damage while Tired.',
          'Climbing and performing the "Shake" action rapidly shreds the blue stamina gauge in seconds.',
          'Exhaust Attack stat amplifies the potency of Shaking and stamina damage dealt to exposed cores.',
          'If stamina is not fully depleted before the timer expires, the boss recovers and regenerates its Break Gauge.'
        ],
        tacticalTips: [
          'All available party members should immediately latch on and Shake simultaneously.',
          'Equip Exhaust Attack (+40 on Vocation Emblem, ~100 benchmark) to deplete blue stamina in 2–3 shakes.'
        ]
      },
      {
        stateName: 'Exhausted State',
        badge: 'Topple Window',
        summary: 'Stamina reaches 0: Break Gauge vanishes and the boss wobbles in place—land heavy blows to topple!',
        mechanics: [
          'Stamina reaches zero; both Break Gauge and stamina bar vanish.',
          'The monster wobbles unsteadily in place.',
          'Chance Attack stat determines how rapidly your attacks force the enemy to lose its footing and fall flat.',
          'Failing to land enough Chance Attack blows before the wobble duration ends causes the boss to recover back to Normal or Enraged mode without entering Downed state.'
        ],
        tacticalTips: [
          'Unleash high Chance Attack skills immediately (e.g. Slayer Stone + 40 Chance Attack Emblem).',
          'Coordinate burst strikes so the enemy topples before the recovery window snaps shut.'
        ]
      },
      {
        stateName: 'Downed State',
        badge: '+50% Damage Burst',
        summary: 'Boss topples flat on the ground, taking +50% amplified damage for 10–20 seconds.',
        mechanics: [
          'Enemy is completely incapacitated and prone on the ground.',
          'Takes ~50% bonus damage from all attacks and spells.',
          'Standard duration lasts 10 to 20 seconds depending on monster species.',
          'Frozen Solid, Torpor (during fall animation), and Golden status can extend effective damage windows.',
          'Upon recovery, the boss returns to Normal mode if above health threshold, or immediately re-Enrages if below.'
        ],
        tacticalTips: [
          'Cast maximum-tier incantations (Grand Giga Frieza, Meteor Fall) and burst Custom Skills.',
          'Ensure damage-boosting buffs (Attack Talismans, Holy Drain lifesteal) are active throughout the 15-second window.'
        ]
      }
    ],
    keyStatsAndSkills: ['Knockdown Power (Break Gauge)', 'Exhaust Attack (Shake)', 'Chance Attack (Topple)', 'Secret Core Skills'],
    audioVisualCues: ['Yellow Struggle Icon', 'Blue Stamina Bar (Tired)', 'Wobbly Animation (Exhausted)', 'Prone Downed State'],
    tags: ['Enrage', 'Break Gauge', 'Tired', 'Shake', 'Exhausted', 'Downed', 'Chance Attack', 'Exhaust Attack']
  },

  // 2. Season 1: Alchemized
  {
    id: 'combat-season-1-alchemized',
    name: 'Season 1: Alchemized Gold Plating & Stake Mechanics',
    seasonCategory: 'Season 1: Alchemized',
    icon: '🏆',
    overview:
      'Season 1 endgame mechanics centered on heavy gold-plated monsters. Golden stakes pin reinforced armor chunks to their bodies that must be shattered with focused physical and elemental damage.',
    states: [
      {
        stateName: 'Gold Plating & Golden Stakes',
        badge: 'Armor Plating',
        summary: 'Large Alchemized enemies have golden stakes securing chunks of reinforced gold armor.',
        mechanics: [
          'Golden stakes anchor golden armor plates to key anatomical weak spots.',
          'Gold coating CANNOT be revealed or weakened by Green Vocation core skills—you must deal direct HP damage to the stakes holding them in place.',
          'Shattering all stakes strips the golden armor and permanently exposes the monster\'s true weak point.',
          'Alchemized Griffins and Goliaths take drastically increased damage to the head once gold plating is chipped off.',
          'Diamantes (Form 2) and Golgorran have their critical weaknesses permanently exposed once armor sections break.',
          'Coating may house temporary Secret Cores that vanish when the gold plate breaks, requiring re-revealing on the fleshy part.'
        ],
        tacticalTips: [
          'Focus fire on individual golden stakes one at a time rather than spreading damage across the body.',
          'Once the gold shatters, target the exposed head or core for maximum burst multipliers.'
        ]
      }
    ],
    keyStatsAndSkills: ['Direct Damage Burst', 'Blunt & Piercing Multipliers', 'Targeted Single-Point DPS'],
    audioVisualCues: ['Glittering Gold Armor Plates', 'Golden Stake Anchors', 'Chipping Shatter Cue'],
    tags: ['Alchemized', 'Season 1', 'Gold Plating', 'Golden Stakes', 'Diamantes', 'Golgorran', 'Goliath']
  },

  // 3. Season 2: Infected
  {
    id: 'combat-season-2-infected',
    name: 'Season 2: Infected Spore Auras, Tentacles & Corruption Spikes',
    seasonCategory: 'Season 2: Infected',
    icon: '☣️',
    overview:
      'Season 2 corruption introduced biological hazards. Infected monsters project damaging Spore Auras, lash out with protective tentacles, and sprout corruption spikes that grant massive defensive reinforcement.',
    states: [
      {
        stateName: 'Dormant Infection & Spore Aura',
        badge: 'Passive Corruption',
        summary: 'Infected enemies project a damaging Spore Aura that passively accumulates Infection on nearby allies.',
        mechanics: [
          'Spore Aura gives the monster continuous damage reduction and passively builds Infection stages on nearby Arisen and Pawns.',
          'Dealing high Knockdown Power damage staggers the monster and temporarily extinguishes the Spore Aura.',
          'High Knockdown Power skills strip the aura faster, temporarily removing their damage resistance.',
          'The monster can regenerate its Spore Aura if given time to recover from staggers.'
        ],
        tacticalTips: [
          'Drink Superior Corruption Preventatives before entering the fight.',
          'Use heavy Knockdown skills to immediately stagger the enemy and extinguish the Spore Aura.'
        ]
      },
      {
        stateName: 'Lashing Tentacles',
        badge: 'Melee Barrier & Damage Reduction',
        summary: 'Protective tentacles lash out at climbing melee players while granting the monster stacking damage reduction.',
        mechanics: [
          'Before spikes sprout, tentacles lash out around the body, inflicting damage and knocking away climbing melee players.',
          'Every unsealed tentacle node grants the monster a stacking damage reduction buff.',
          'Tentacles can be temporarily sealed using Green Vocation healing auras/effects and Core Skills that reveal Secret Cores.',
          'Infected monsters do NOT possess Secret Cores, but Core Skills must still be used to seal tentacles.',
          'Emits a distinct fleshy suction sound when sealed and when sprouting again.',
          'Spirit Lancer\'s "Sprout Sealing" augment significantly extends tentacle seal duration.'
        ],
        tacticalTips: [
          'Healers must actively project healing auras onto the monster to keep tentacles suppressed.',
          'Equip Spirit Lancer\'s Sprout Sealing augment to extend tentacle downtime.'
        ]
      },
      {
        stateName: 'Infection Spikes',
        badge: 'Empowered Boss State',
        summary: 'Monster sprouts corruption spikes, gaining expanded moveset shockwaves while suppressing tentacles.',
        mechanics: [
          'Sprouts gradually or upon taking damage thresholds (Critical monsters start with spikes pre-sprouted).',
          'Spikes grant extended reach and shockwaves to standard monster attacks.',
          'While spikes are active, tentacles are naturally suppressed.',
          'If not destroyed quickly, the monster sprouts additional spikes up to its species cap, drastically increasing power.',
          'Restores the Spore Aura while spikes remain intact.',
          'Damaging and cracking a spike temporarily staggers the monster and strips its aura.'
        ],
        tacticalTips: [
          'Focus all party firepower on individual spikes to crack them before additional spikes sprout.',
          'Melee can safely climb once spikes sprout because tentacles are suppressed.'
        ]
      },
      {
        stateName: 'Infected Downed Phase',
        badge: 'All Spikes Shattered',
        summary: 'Breaking all infection spikes forces an immediate Downed state (tentacles and aura disabled).',
        mechanics: [
          'Shattering the final infection spike causes the monster to lose its footing and topple flat.',
          'Both lashing tentacles and the corrupting Spore Aura are completely disabled during Down.',
          'Downed duration for certain Infected monsters can be as short as 10 seconds.',
          'If the monster recovers without dying, it begins the infection cycle anew.'
        ],
        tacticalTips: [
          'Prepare high-burst skills before the last spike breaks so you don\'t waste a second of the 10s Down window.',
          'Apply Torpor or Frozen Solid to maximize the brief window.'
        ]
      }
    ],
    keyStatsAndSkills: ['Sprout Sealing (Spirit Lancer)', 'Knockdown Power', 'Healing Auras / Core Skills', 'Corruption Cure'],
    audioVisualCues: ['Green/Purple Spore Mist', 'Fleshy Slap Sound (Tentacle Seal)', 'Spike Sprouting Shockwave', 'Spike Shatter Stagger'],
    tags: ['Infected', 'Season 2', 'Spore Aura', 'Lashing Tentacles', 'Infection Spikes', 'Sprout Sealing', 'Corruption']
  },

  // 4. Season 3: War-Ready
  {
    id: 'combat-season-3-war-ready',
    name: 'Season 3: War-Ready Armor, Blow Damage & Cannon Warfare',
    seasonCategory: 'Season 3: War-Ready',
    icon: '🛡️',
    overview:
      'Season 3 War-Ready monsters wear heavy enchanted armor plates that dynamically self-repair. Breaking armor requires high Knockdown Power (Blow Damage) and precision timing with Green Vocation support auras.',
    states: [
      {
        stateName: 'Armored State & Purple Blow Damage',
        badge: 'Self-Repairing Plate',
        summary: 'Monsters are covered in self-repairing armor that reduces damage to unarmored anatomy.',
        mechanics: [
          'Armored portions heavily mitigate damage; damage to armor displays in PURPLE numbers (Blow Damage).',
          'Blow damage dealt to armor scales directly with Knockdown Power.',
          'Blow damage per hit is capped at ~3,500, though certain high-tier skills can deal 9,999 instant armor break damage.',
          'Light Armor enemies have selective armor chunks; Heavy Armor enemies are covered head-to-toe.',
          'Stationary Cannons in encounters deal up to 2 x 3,500 Blow Damage (or 2 x 300 normal damage) plus Fire accumulation to ignite targets.'
        ],
        tacticalTips: [
          'Equip high Knockdown Power augments, accessories, and crests for War-Ready content.',
          'Man stationary cannons on large battlefields to strip outer plates at long range.'
        ]
      },
      {
        stateName: 'Exposed Armor (Green Hue)',
        badge: 'Whistling Sound & Green Hue',
        summary: 'Green vocation healing auras active during an enemy attack extremity expose that armor piece to bonus damage.',
        mechanics: [
          'Triggered when a Green Vocation\'s healing aura or core-exposing skill touches an extremity right as the monster attacks with it.',
          'Exposed armor piece emits a distinct whistling noise and glows with a bright green outline.',
          'Only the specific extremity used in the attack becomes exposed (e.g. right arm during a right slam).',
          'Exposed armor takes significantly amplified Blow Damage from all allies.',
          'Armor will self-repair and lose its exposed status if not damaged quickly.'
        ],
        tacticalTips: [
          'Healers must position healing zones in front of attacking limbs to trigger the green exposure.',
          'Melee and ranged DPS must immediately converge on the glowing green limb.'
        ]
      },
      {
        stateName: 'Crumbling Armor',
        badge: 'Crunch Sound & Repair Disabled',
        summary: 'Taking sufficient Blow Damage causes the armor to crack (crunching sound), disabling self-repair.',
        mechanics: [
          'Triggered after dealing enough Blow Damage to an armor segment.',
          'Emits a distinct crunching audio cue and displays cracked visual textures.',
          'Cracked armor completely loses its magickal ability to self-repair.',
          'Begins taking normal damage from all standard attacks instead of requiring pure Blow Damage.'
        ],
        tacticalTips: [
          'Focus fire on the crumbling section to shatter it before moving to intact armor.'
        ]
      },
      {
        stateName: 'Riled Up Animation',
        badge: 'Damage Resistance & Interrupt',
        summary: 'Damaging or peeling armor triggers a brief Riled Up stance with damage reduction.',
        mechanics: [
          'Triggered after taking substantial damage or losing an armor section.',
          'Monster performs a distinct wind-up animation and gains a temporary damage reduction buff.',
          'Intact armor cannot take Blow Damage during this animation, but crumbling pieces CAN still be damaged.',
          'Shattering a crumbling piece during Riled Up instantly interrupts the monster (e.g. stops War-Ready Nightmare\'s homing tornado).',
          'Mobility debilitations (Torpor, Stun, Freeze) also interrupt the Riled Up stance.'
        ],
        tacticalTips: [
          'Hold high-stagger strikes to break crumbling pieces mid-animation and cancel lethal enemy attacks.'
        ]
      },
      {
        stateName: 'Broken Armor & Final Down',
        badge: 'Massive Stagger & Topple',
        summary: 'Shattering an armor piece causes massive stagger damage; peeling all plates causes full Downed state.',
        mechanics: [
          'Shattering a piece completely disintegrates the plate, dealing massive flat damage to the boss.',
          'On weaker War-Ready enemies, the shatter damage can kill them before all armor is removed.',
          'Once all armor pieces on a Heavy Armor monster are broken, it loses its footing and topples flat on the ground.',
          'With damage resistance permanently stripped, the monster is vulnerable for final burst execution.'
        ],
        tacticalTips: [
          'Unload all remaining stamina and maximum-damage custom skills during the final unarmored Down.'
        ]
      }
    ],
    keyStatsAndSkills: ['Knockdown Power (Purple Blow Damage)', 'Green Vocation Timing', 'Stationary Cannon Mastery', 'Interruption Timing'],
    audioVisualCues: ['Purple Blow Damage Numbers', 'Whistling Sound & Green Hue (Exposed)', 'Crunching Sound (Crumbling)', 'Plate Shatter Flash'],
    tags: ['War-Ready', 'Season 3', 'Blow Damage', 'Purple Numbers', 'Crumbling Armor', 'Riled Up', 'Cannons', 'Green Hue']
  },

  // 5. Season 3: Blaze
  {
    id: 'combat-season-3-blaze',
    name: 'Season 3: Blaze Flame Suppression & Weakness Reveal',
    seasonCategory: 'Season 3: Blaze',
    icon: '🔥',
    overview:
      'Blaze enemies in Season 3 feature an unwritten flame suppression mechanic where fiery armor and limbs are cooled and exposed using supportive healing auras.',
    states: [
      {
        stateName: 'Flame Suppression & Limb Exposure',
        badge: 'Ringing Sound & Dull Hue',
        summary: 'Healing auras extinguish fiery defenses, causing Blaze enemies to emit a ringing chime and take amplified damage.',
        mechanics: [
          'Small Blaze enemies (Blaze Goblins, Blaze Harpies) are instantly revealed and suppressed simply by walking into a healing zone.',
          'Large Blaze enemies (Ifrit, Blaze Grigori, Blaze Chimeras) require attacking with a specific extremity into a healing aura to reveal that limb.',
          'For example, Ifrit must execute an arm slam into a healing zone for that arm to be revealed.',
          'A revealed Blaze enemy emits a unique ringing chime and shifts from a fiery orange glow to a dull, cooled color.',
          'While revealed, the enemy/extremity takes significantly increased damage from all attacks.'
        ],
        tacticalTips: [
          'Healers must place persistent healing fields under the boss\'s intended attack target.',
          'Listen for the ringing sound cue to confirm the flame has been suppressed before bursting.'
        ]
      }
    ],
    keyStatsAndSkills: ['Green Healing Auras', 'Extremity Attack Baiting', 'Water/Ice Elemental Damage'],
    audioVisualCues: ['Fiery Orange Glow (Default)', 'Ringing Sound Cue (Suppressed)', 'Dull Cooled Color Palette'],
    tags: ['Blaze', 'Season 3', 'Flame Suppression', 'Ifrit', 'Blaze Grigori', 'Ringing Cue', 'Dull Color']
  }
];
