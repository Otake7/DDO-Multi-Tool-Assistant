export interface PawnOrderEntry {
  id: string;
  name: string;
  category: 'Basic Orders' | 'Advanced Orders' | 'Attribute Orders' | 'Special Orders';
  isMustHave?: boolean;
  effectAndUsage: string;
  targetVocation: 'All Pawns' | 'Support (Green)' | 'DPS (Red)' | 'Tank (Blue)' | 'Fighter/Warrior/Seeker' | 'Priest' | 'Shield Sage / Alchemist';
  requirements?: string;
  tacticalNotes: string;
  tags: string[];
}

export const PAWN_ORDERS_OVERVIEW = {
  title: 'Pawn Tactical Orders System & Commands Guide',
  menuPath: 'Menu (Tab 1) → 5th Option: Pawn Orders',
  description:
    'In Dragon\'s Dogma Online, Arisen can direct and coordinate their personal Main and Support Pawns in real-time. Orders can be mapped to custom hotkeys/radial shortcuts for instant combat responsiveness.',
  rules: [
    'Party Limitation: Orders strictly apply only to your own personal Pawns; they do not affect other Arisen or their Pawns in multiplayer parties.',
    'Cancellation Triggers: Orders are cancelled if you issue Cancel Order, if you or your pawn dies, or if you stray too far away, forcing pawns to teleport to your location.',
    'Order Overrides: Specific orders can override or cancel opposing directives (e.g. Prioritize Enemy Type overrides Change Target; Cancel Order resets all default AI routines).',
    'Shortcut Recommendation: Orders marked as MUST-HAVE (such as Follow, Attack, Shake, Expose Secret Core, Cancel Order) should always be registered to your quick-access shortcut wheel.'
  ]
};

export const PAWN_ORDERS_DATA: PawnOrderEntry[] = [
  // 1. Basic Orders
  {
    id: 'order-prioritize-recovery',
    name: 'Prioritize Recovery',
    category: 'Basic Orders',
    isMustHave: false,
    effectAndUsage: 'Makes your Support pawn prioritize recovery moves, curative spells, and healing actions over attacking or buffing.',
    targetVocation: 'Support (Green)',
    tacticalNotes: 'Use when party health or recovery limits are heavily compromised during intensive boss phases.',
    tags: ['Basic Orders', 'Recovery', 'Heal', 'Support Pawn', 'Priority']
  },
  {
    id: 'order-attack',
    name: 'Attack',
    category: 'Basic Orders',
    isMustHave: true,
    effectAndUsage: 'Makes your pawns do nothing but use offensive moves. Support pawns will also stop buffing/healing and focus exclusively on attacking.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Essential command during Downed states (+50% damage window) so the entire party bursts maximum DPS.',
    tags: ['Basic Orders', 'Attack', 'Downed Burst', 'Offense', 'Must-Have']
  },
  {
    id: 'order-support',
    name: 'Support',
    category: 'Basic Orders',
    isMustHave: false,
    effectAndUsage: 'Makes your Support Pawns focus strictly on buffing allies, casting protective wards, and enchanting party weapons.',
    targetVocation: 'Support (Green)',
    tacticalNotes: 'Great to issue right before pulling a boss so your team enters combat fully buffed with Attack/Defense auras.',
    tags: ['Basic Orders', 'Support', 'Buffs', 'Auras', 'Preparation']
  },
  {
    id: 'order-follow',
    name: 'Follow',
    category: 'Basic Orders',
    isMustHave: true,
    effectAndUsage: 'Makes Pawns come over and stick close around you. They will still cast or attack enemies in range while maintaining proximity.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Extremely useful for pulling pawns out of lethal AoE hazard zones or boss charge paths. Remember to issue Cancel Order afterward so they can resume normal positioning.',
    tags: ['Basic Orders', 'Follow', 'Positioning', 'AoE Evasion', 'Must-Have']
  },
  {
    id: 'order-observe',
    name: 'Observe',
    category: 'Basic Orders',
    isMustHave: false,
    effectAndUsage: 'Makes your Pawns drop everything and stand by. Support Pawns may still use emergency recovery skills, but DPS and Tanks stop all actions and idle while actively dodging incoming attacks. They can still use Special Skills. Expires after 10-15 minutes.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Ideal for pacing boss health thresholds, waiting for specific enemy attack animations, or capturing footage.',
    tags: ['Basic Orders', 'Observe', 'Idle', 'Dodge', 'Hold Fire']
  },
  {
    id: 'order-standby',
    name: 'Standby',
    category: 'Basic Orders',
    isMustHave: false,
    effectAndUsage: 'Makes Pawns stop all ongoing actions and stand completely idle without using support skills. They will not follow you and will teleport if you move too far away. Can still use Special Skills. Expires after 10-15 minutes.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Complete halt of all AI actions. Useful for testing damage numbers or setting up specific tactical maneuvers.',
    tags: ['Basic Orders', 'Standby', 'Full Idle', 'No Support', 'Hold Position']
  },
  {
    id: 'order-change-target',
    name: 'Change Target',
    category: 'Basic Orders',
    isMustHave: false,
    effectAndUsage: 'Your Pawns ignore all other enemies and focus entirely on the marked target while avoiding attacks from other foes. Uses an invisible aiming reticle to mark the target, displaying a Pawn icon by the enemy\'s health bar.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Aim your camera at the priority foe before executing. Takes practice to lock the intended enemy in dense mobs.',
    tags: ['Basic Orders', 'Change Target', 'Mark Enemy', 'Reticle', 'Focus Target']
  },
  {
    id: 'order-prioritize-enemy-type',
    name: 'Prioritize Small / Large / Ground / Flying Enemies',
    category: 'Basic Orders',
    isMustHave: false,
    effectAndUsage: 'Directs your Pawns to prioritize the specified enemy category (Small, Large, Ground, or Flying). Overrides Change Target.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Direct ranged pawns to eliminate annoying flying harpies/gargoyles before engaging large grounded raid bosses.',
    tags: ['Basic Orders', 'Enemy Type', 'Flying', 'Large', 'Small', 'Ground']
  },

  // 2. Advanced Orders
  {
    id: 'order-heal',
    name: 'Heal',
    category: 'Advanced Orders',
    isMustHave: true,
    effectAndUsage: 'Commands your Support Pawn to cast healing spells/auras on you as soon as possible. Will not trigger if the pawn lacks healing skills or if you are already at full recovery limit.',
    targetVocation: 'Support (Green)',
    requirements: 'Must have healing skill equipped (e.g. Healer Spot, Cure Spot).',
    tacticalNotes: 'Immediate panic heal button to prevent fatal burst damage.',
    tags: ['Advanced Orders', 'Heal', 'Panic Heal', 'Support Pawn', 'Must-Have']
  },
  {
    id: 'order-cure-debilitations',
    name: 'Cure Debilitations',
    category: 'Advanced Orders',
    isMustHave: true,
    effectAndUsage: 'Commands your Support Pawn(s) to cleanse active debilitations and status ailments on you immediately.',
    targetVocation: 'Support (Green)',
    requirements: 'Support Pawn must have cleansing spells equipped.',
    tacticalNotes: 'Vital when afflicted by debilitating statuses like Items Sealed, Skills Stifled, Torpor, or Golden.',
    tags: ['Advanced Orders', 'Cure Debilitations', 'Cleanse', 'Panacea', 'Must-Have']
  },
  {
    id: 'order-heavy-attacks',
    name: 'Heavy Attacks',
    category: 'Advanced Orders',
    isMustHave: false,
    effectAndUsage: 'Instructs your DPS Pawns to prioritize heavy-hitting skills that deal the highest damage and Knockdown Power.',
    targetVocation: 'DPS (Red)',
    tacticalNotes: 'Use during Enraged phase to rapidly fill the Break Gauge with high Knockdown multipliers.',
    tags: ['Advanced Orders', 'Heavy Attacks', 'Knockdown', 'DPS Pawns', 'Burst']
  },
  {
    id: 'order-use-taunt-skills',
    name: 'Use Taunt Skills',
    category: 'Advanced Orders',
    isMustHave: false,
    effectAndUsage: 'Commands your Tank Pawn to use skills that generate maximum Threat and draw monster aggro.',
    targetVocation: 'Tank (Blue)',
    requirements: 'Tank Pawn must have aggro/taunt skills equipped (e.g. Shield Sage Stun/Aggro, Alchemist taunts).',
    tacticalNotes: 'Directs dangerous boss attacks away from squishy sorcerers and elemental archers.',
    tags: ['Advanced Orders', 'Taunt', 'Threat', 'Tank Pawn', 'Aggro']
  },
  {
    id: 'order-strengthen-player',
    name: 'Strengthen Player',
    category: 'Advanced Orders',
    isMustHave: true,
    effectAndUsage: 'Instructs your Support Pawn to cast attack-boosting buff skills (e.g. Attack Auras, Sacred Shine).',
    targetVocation: 'Support (Green)',
    requirements: 'Support Pawn must have relevant attack buff skills slotted.',
    tacticalNotes: 'Trigger right before downing a boss to amplify your party\'s burst multiplier.',
    tags: ['Advanced Orders', 'Strengthen Player', 'Attack Buff', 'Support Pawn', 'Must-Have']
  },
  {
    id: 'order-weaken-enemy',
    name: 'Weaken Enemy',
    category: 'Advanced Orders',
    isMustHave: false,
    effectAndUsage: 'Instructs Support Pawns to prioritize moves and spells that inflict defense/attack reduction debuffs on the target.',
    targetVocation: 'Support (Green)',
    tacticalNotes: 'Softens boss defenses before the main DPS burst rotation.',
    tags: ['Advanced Orders', 'Weaken Enemy', 'Debuff', 'Defense Down', 'Support']
  },
  {
    id: 'order-enchant',
    name: 'Enchant',
    category: 'Advanced Orders',
    isMustHave: true,
    effectAndUsage: 'Commands your Tank Pawn to cast weapon enchantments. Shield Sages use Force Enchantment directly; Alchemists must run close to you to apply Rex Elementa.',
    targetVocation: 'Shield Sage / Alchemist',
    requirements: 'Shield Sage needs Force Element; Alchemist needs Rex Elementa slotted.',
    tacticalNotes: 'Crucial for matching elemental weaknesses and Secret Core colors to maximize stamina/HP damage.',
    tags: ['Advanced Orders', 'Enchant', 'Force Enchantment', 'Rex Elementa', 'Element', 'Must-Have']
  },
  {
    id: 'order-bind-enemy',
    name: 'Bind Enemy',
    category: 'Advanced Orders',
    isMustHave: false,
    effectAndUsage: 'Pawns prioritize skills, spells, and actions with binding or immobilizing properties.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Helps lock down aggressive nimble foes like Manticores and Griffins.',
    tags: ['Advanced Orders', 'Bind Enemy', 'Crowd Control', 'Immobilize']
  },
  {
    id: 'order-flinch-enemy',
    name: 'Flinch Enemy',
    category: 'Advanced Orders',
    isMustHave: false,
    effectAndUsage: 'Directs Pawns to prioritize high Knockdown Power skills and actions capable of knocking the enemy down or interrupting attacks.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Effective for filling Break Gauges or breaking out of lethal boss charging animations.',
    tags: ['Advanced Orders', 'Flinch Enemy', 'Knockdown', 'Interrupt']
  },
  {
    id: 'order-shake-command',
    name: 'Shake Command',
    category: 'Advanced Orders',
    isMustHave: true,
    effectAndUsage: 'Orders all Pawns to immediately approach, climb onto the enemy, and perform the Shake action.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Extremely high priority command! Issue right as the enemy enters the Tired phase (blue stamina bar) to empty its gauge in seconds.',
    tags: ['Advanced Orders', 'Shake Command', 'Tired State', 'Climbing', 'Stamina Drain', 'Must-Have']
  },
  {
    id: 'order-stamina-recovery',
    name: 'Stamina Recovery',
    category: 'Advanced Orders',
    isMustHave: false,
    effectAndUsage: 'Makes Support Pawns cast skills that restore party stamina (e.g. Priest Energy Spot).',
    targetVocation: 'Support (Green)',
    requirements: 'Must have stamina-restoring skills slotted.',
    tacticalNotes: 'Keeps high-consumption vocations (Sorcerer, Seeker, Warrior) operating at peak DPS without running out of breath.',
    tags: ['Advanced Orders', 'Stamina Recovery', 'Energy Spot', 'Priest', 'Stamina']
  },
  {
    id: 'order-expose-secret-core',
    name: 'Expose Secret Core',
    category: 'Advanced Orders',
    isMustHave: true,
    effectAndUsage: 'Sets Support Pawns\' highest priority to revealing the monster\'s Secret Core using their Core Skills.',
    targetVocation: 'Support (Green)',
    tacticalNotes: 'Issue immediately upon Enrage so the core glows and the party can deal massive stamina damage.',
    tags: ['Advanced Orders', 'Expose Secret Core', 'Secret Core', 'Core Skill', 'Enrage', 'Must-Have']
  },
  {
    id: 'order-prioritize-secret-core-attacks',
    name: 'Prioritize Secret Core Attacks',
    category: 'Advanced Orders',
    isMustHave: true,
    effectAndUsage: 'Instructs all party Pawns to focus their attacks exclusively on the exposed Secret Core.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Pairs with Expose Secret Core to shred the monster\'s stamina gauge rapidly.',
    tags: ['Advanced Orders', 'Core Attacks', 'Secret Core', 'Stamina Damage', 'Must-Have']
  },
  {
    id: 'order-debilitate-types',
    name: 'Debilitate: Immobilize / Sustained Damage / Lowered Status / Special Status',
    category: 'Advanced Orders',
    isMustHave: false,
    effectAndUsage: 'Directs Pawns to stack specific debilitation categories:\n• Immobilize: Freeze, Petrification, Golden.\n• Sustained Damage: Poison, Burning (scales with Max HP).\n• Lowered Status: Phys/Mag Defense & Attack Down.\n• Special Status: Elemental status accumulation.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Coordinate with boss vulnerabilities (e.g. immobilizing fast dragons with Freeze or Golden).',
    tags: ['Advanced Orders', 'Debilitate', 'Freeze', 'Poison', 'Burning', 'Status Down']
  },

  // 3. Attribute Orders
  {
    id: 'order-attr-fire',
    name: 'Fire Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Forces pawns to prioritize Fire attacks and spells. Tank pawns will enchant allies with Fire if possible.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Use against Fire-weak beasts, Undead, and Ents.',
    tags: ['Attribute Orders', 'Fire', 'Enchantment', 'Elemental Weakness']
  },
  {
    id: 'order-attr-ice',
    name: 'Ice Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Forces pawns to prioritize Ice attacks and spells. Tank pawns will enchant allies with Ice if possible.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Use against Fire drakes, Saurians, and Blaze monsters.',
    tags: ['Attribute Orders', 'Ice', 'Enchantment', 'Elemental Weakness']
  },
  {
    id: 'order-attr-lightning',
    name: 'Lightning Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Forces pawns to prioritize Lightning attacks and spells. Tank pawns will enchant allies with Lightning if possible.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Use against Cyclopes, Griffins, and Drenched foes.',
    tags: ['Attribute Orders', 'Lightning', 'Shock', 'Enchantment', 'Elemental Weakness']
  },
  {
    id: 'order-attr-holy',
    name: 'Holy Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Forces pawns to prioritize Holy attacks and spells. Tank pawns will enchant allies with Holy if possible.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Essential for fighting Undead, Phantoms, Skeletons, and Dark Dragons.',
    tags: ['Attribute Orders', 'Holy', 'Enchantment', 'Holy Drain', 'Undead']
  },
  {
    id: 'order-attr-dark',
    name: 'Dark Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Forces pawns to prioritize Dark attacks and spells. Tank pawns will enchant allies with Dark if possible.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Use against Holy-aligned angelic and light elemental enemies.',
    tags: ['Attribute Orders', 'Dark', 'Enchantment', 'Darkness']
  },
  {
    id: 'order-attr-slash',
    name: 'Slash Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Makes pawns prioritize physical Slash attacks and slashing weapon arts.',
    targetVocation: 'DPS (Red)',
    tacticalNotes: 'Effective against soft-bodied beasts and for severing tails.',
    tags: ['Attribute Orders', 'Slash', 'Physical', 'Sever Tail']
  },
  {
    id: 'order-attr-impact',
    name: 'Impact Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Makes pawns prioritize physical Impact/Blunt attacks.',
    targetVocation: 'DPS (Red)',
    tacticalNotes: 'Crucial for smashing Golems, Skeletons, and heavily armored monsters.',
    tags: ['Attribute Orders', 'Impact', 'Blunt', 'Golem', 'Knockdown']
  },
  {
    id: 'order-attr-pierce',
    name: 'Pierce Attribute Actions',
    category: 'Attribute Orders',
    isMustHave: false,
    effectAndUsage: 'Makes pawns prioritize physical Pierce attacks.',
    targetVocation: 'DPS (Red)',
    tacticalNotes: 'Effective against winged flyers and specific monster weak spots.',
    tags: ['Attribute Orders', 'Pierce', 'Ranged', 'Weak Point']
  },

  // 4. Special Orders
  {
    id: 'order-special-throw',
    name: 'Throw (Linking Throw)',
    category: 'Special Orders',
    isMustHave: false,
    effectAndUsage: 'Makes your Fighter, Warrior, or Seeker pawn assume the Linking Throw stance to launch you into the air. Requires relevant vocation/skill and combat state.',
    targetVocation: 'Fighter/Warrior/Seeker',
    requirements: 'Must have Linking Throw ability unlocked; party must be in active combat.',
    tacticalNotes: 'Launches you directly onto high monster heads or flying harpies/griffins.',
    tags: ['Special Orders', 'Throw', 'Linking Throw', 'Air Launch', 'Climbing']
  },
  {
    id: 'order-special-quick-charge',
    name: 'Activate Quick Charge',
    category: 'Special Orders',
    isMustHave: false,
    effectAndUsage: 'Commands your Priest pawn to immediately cast Quick Charge to accelerate incantation times for spellcasters.',
    targetVocation: 'Priest',
    requirements: 'Priest pawn must have Quick Charge equipped.',
    tacticalNotes: 'Cast before major incantations (Meteor Fall, Grand Giga Frieza) to cut casting time.',
    tags: ['Special Orders', 'Quick Charge', 'Priest', 'Fast Cast', 'Incantation']
  },
  {
    id: 'order-special-energy-spot',
    name: 'Activate Energy Spot',
    category: 'Special Orders',
    isMustHave: true,
    effectAndUsage: 'Commands your Priest pawn to deploy Energy Spot on the ground for infinite/rapid stamina replenishment.',
    targetVocation: 'Priest',
    requirements: 'Priest pawn must have Energy Spot equipped.',
    tacticalNotes: 'Crucial during Downed burst windows and Tired Shake phases so the party never runs out of stamina.',
    tags: ['Special Orders', 'Energy Spot', 'Priest', 'Stamina Zone', 'Must-Have']
  },
  {
    id: 'order-special-solid-riser',
    name: 'Activate Solid Riser',
    category: 'Special Orders',
    isMustHave: true,
    effectAndUsage: 'Commands your Priest pawn to cast Solid Riser, granting super-armor immunity to knockback, staggering, and flinching.',
    targetVocation: 'Priest',
    requirements: 'Priest pawn must have Solid Riser equipped.',
    tacticalNotes: 'Enables continuous casting and attacking without being interrupted by boss tremors or light hits.',
    tags: ['Special Orders', 'Solid Riser', 'Priest', 'Super Armor', 'Stagger Immunity', 'Must-Have']
  },
  {
    id: 'order-special-hands-of-god',
    name: 'Activate Hands of God / Regal Barrier',
    category: 'Special Orders',
    isMustHave: true,
    effectAndUsage: 'Commands your Tank pawn (Shield Sage or Alchemist) to cast Hands of God or Regal Barrier, granting total invulnerability inside the barrier.',
    targetVocation: 'Shield Sage / Alchemist',
    requirements: 'Tank pawn must have Hands of God (Shield Sage) or Regal Barrier (Alchemist) equipped.',
    tacticalNotes: 'Guarantees 100% damage immunity against catastrophic wipe mechanics and ultimate dragon breaths.',
    tags: ['Special Orders', 'Hands of God', 'Regal Barrier', 'Invulnerability', 'Tank Pawn', 'Must-Have']
  },
  {
    id: 'order-special-cancel-order',
    name: 'Cancel Order',
    category: 'Special Orders',
    isMustHave: true,
    effectAndUsage: 'Cancels all active orders and restores default autonomous pawn behavior. Should always be mapped to your shortcut wheel.',
    targetVocation: 'All Pawns',
    tacticalNotes: 'Mandatory utility command. Use after issuing Follow, Standby, or Observe to let pawns return to normal combat engagement.',
    tags: ['Special Orders', 'Cancel Order', 'Reset AI', 'Default Behavior', 'Shortcut', 'Must-Have']
  }
];
