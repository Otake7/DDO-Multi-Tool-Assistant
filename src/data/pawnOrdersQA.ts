import { JournalQuestion } from '../types';

export const PAWN_ORDERS_QA: JournalQuestion[] = [
  {
    id: 'pawn-orders-qa-access-rules',
    number: 580,
    category: 'Pawn System',
    question: 'How do you access the Pawn Orders menu, and who do orders apply to in multiplayer?',
    answer:
      'Pawn Orders can be accessed at any time in the main menu:\n\n• Menu Path: Open the main menu, navigate to the 1st Tab, and scroll down to the 5th Option ("Pawn Orders").\n• Party Limitation: Orders strictly apply only to your own personal Pawns. In mixed parties with other Arisen, your commands will not affect another player\'s Pawns.\n• Shortcut Mapping: You can and should assign key orders (like Cancel Order, Attack, Follow, Shake, and Expose Core) to your radial shortcut wheel for instant in-combat triggering.',
    tags: ['Pawn Orders', 'Menu Navigation', 'Party Limitations', 'Shortcuts', 'Radial Wheel', 'Main Pawns'],
    source: 'Pawn Orders Guide • Core System & Access'
  },
  {
    id: 'pawn-orders-qa-cancel-triggers',
    number: 581,
    category: 'Pawn System',
    question: 'What causes Pawn Orders to be cancelled automatically?',
    answer:
      'Pawn Orders will remain active until one of the following cancellation events occurs:\n\n1. Issuing the "Cancel Order" command (restores default AI behavior).\n2. Straying too far from your Pawns, which triggers an emergency teleport to your location and cancels active orders.\n3. The death of the Arisen or the Pawn executing the order.\n4. Issuing an opposing or overriding order (e.g. Prioritize Enemy Type overrides Change Target).\n5. Passive/idle orders like Observe and Standby naturally expire after approximately 10–15 minutes of inactivity.',
    tags: ['Pawn Orders', 'Cancellation', 'Teleport', 'Cancel Order', 'Death', 'Expiration'],
    source: 'Pawn Orders Guide • Core System & Access'
  },
  {
    id: 'pawn-orders-qa-must-have-orders',
    number: 582,
    category: 'Pawn System',
    question: 'Which Pawn Orders are considered "Must-Have" to carry on shortcuts at all times?',
    answer:
      'The most essential "Must-Have" orders to keep slotted on your quick shortcuts are:\n\n• Cancel Order: Essential to release Pawns from restrictive modes like Follow or Standby.\n• Attack: Forces all Pawns (including Support Pawns) into pure offensive DPS during Downed burst windows.\n• Follow: Instantly pulls Pawns toward you to save them from lethal telegraphed boss AoEs.\n• Shake Command: Immediately orders all Pawns to climb and Shake Tired monsters (blue stamina bar).\n• Expose Secret Core: Commands Green Support Pawns to prioritize revealing Secret Cores during Enrage.\n• Prioritize Secret Core Attacks: Directs all party Pawns to focus fire on exposed cores.\n• Enchant: Commands Tank Pawns (Shield Sage / Alchemist) to grant elemental weapon enchantments.\n• Special Buffs: Activate Energy Spot (infinite stamina) and Hands of God / Regal Barrier (total invulnerability).',
    tags: ['Pawn Orders', 'Must-Have Orders', 'Shortcuts', 'Attack', 'Follow', 'Shake', 'Expose Core', 'Cancel Order'],
    source: 'Pawn Orders Guide • Tactical Priorities'
  },
  {
    id: 'pawn-orders-qa-follow-observe-standby',
    number: 583,
    category: 'Pawn System',
    question: 'What is the difference between Follow, Observe, and Standby orders?',
    answer:
      '• Follow: Pawns immediately run to your position and stick close to you while continuing to attack and cast spells at enemies within range. (Remember to use Cancel Order once safe, or they will remain glued to your side).\n\n• Observe: Pawns stop attacking and idle, but actively dodge incoming enemy attacks. Support Pawns may still use emergency healing skills, and all Pawns can still execute Special Skills.\n\n• Standby: Pawns completely halt all actions and idle in place. They will NOT use healing/support skills and will not follow you (they will only teleport if you move very far away). They can still use Special Skills.',
    tags: ['Follow', 'Observe', 'Standby', 'Pawn Positioning', 'Dodging', 'AI States'],
    source: 'Pawn Orders Guide • Basic Orders'
  },
  {
    id: 'pawn-orders-qa-change-target',
    number: 584,
    category: 'Pawn System',
    question: 'How does the Change Target order work, and how do you aim it?',
    answer:
      'The "Change Target" order commands all your Pawns to ignore other foes and focus exclusively on a designated enemy while dodging attacks from secondary targets:\n\n• Aiming Reticle: You aim at the target using an "invisible reticle" centered on your camera view when issuing the command.\n• Visual Indicator: A successful lock is marked by a "Pawn" symbol appearing next to the chosen enemy\'s health bar.\n• Practice Tip: In dense crowds, adjust your camera to isolate the priority mob before executing the command.',
    tags: ['Change Target', 'Targeting', 'Invisible Reticle', 'Pawn Icon', 'Priority Foe'],
    source: 'Pawn Orders Guide • Basic Orders'
  },
  {
    id: 'pawn-orders-qa-enrage-core-shake',
    number: 585,
    category: 'Pawn System',
    question: 'Which orders should you issue during the Enraged and Tired boss phases?',
    answer:
      'To execute the optimal Enrage → Tired transition with Pawns:\n\n1. When Boss Enrages (-70% damage reduction):\n   • Issue "Expose Secret Core" so your Support Pawn reveals the core.\n   • Issue "Prioritize Secret Core Attacks" so all DPS Pawns strike the core.\n   • Issue "Enchant" so your Tank enchants party weapons with the matching core element.\n\n2. When Break Gauge Fills & Boss Enters Tired State (Blue Stamina Bar):\n   • Issue "Shake Command" so all Pawns immediately climb on the monster and Shake to deplete its stamina in seconds.',
    tags: ['Enrage Phase', 'Tired Phase', 'Expose Core', 'Core Attacks', 'Shake Command', 'Stamina Depletion'],
    source: 'Pawn Orders Guide • Advanced Orders'
  },
  {
    id: 'pawn-orders-qa-enchant-vocations',
    number: 586,
    category: 'Pawn System',
    question: 'How do Shield Sage and Alchemist Pawns execute the "Enchant" order differently?',
    answer:
      'The Enchant command behaves differently depending on your Tank Pawn\'s vocation:\n\n• Shield Sage Pawns: Use Force Enchantment from range, instantly enchanting all party weapons with the stored element.\n• Alchemist Pawns: Must physically run close to you to apply Rex Elementa. (Note: Alchemist Pawns will refuse to obey if Rex Elementa is not equipped in their custom skills).\n• Attribute Orders: You can also specify an exact element by issuing Fire/Ice/Lightning/Holy/Dark Attribute Actions.',
    tags: ['Enchant Order', 'Shield Sage', 'Alchemist', 'Force Enchantment', 'Rex Elementa', 'Attribute Orders'],
    source: 'Pawn Orders Guide • Advanced & Attribute Orders'
  },
  {
    id: 'pawn-orders-qa-special-orders-skills',
    number: 587,
    category: 'Pawn System',
    question: 'What are the Special Orders for Priest, Tank, and Fighter Pawns?',
    answer:
      'Special Orders command specific high-impact skills on designated vocations (requiring the skill to be slotted):\n\n• Linking Throw: Commands Fighter, Warrior, or Seeker Pawns to take a launch stance (requires active combat) to throw you onto high monster weak points.\n• Activate Quick Charge: Commands Priest Pawns to cast Quick Charge to accelerate ally spell incantations.\n• Activate Energy Spot: Commands Priest Pawns to lay down an infinite stamina replenishment zone.\n• Activate Solid Riser: Commands Priest Pawns to bestow super-armor (immunity to flinching, knockback, and tremors).\n• Activate Hands of God / Regal Barrier: Commands Shield Sage or Alchemist Pawns to create an invulnerability dome against wipe mechanics.',
    tags: ['Special Orders', 'Linking Throw', 'Quick Charge', 'Energy Spot', 'Solid Riser', 'Hands of God', 'Regal Barrier'],
    source: 'Pawn Orders Guide • Special Orders'
  },
  {
    id: 'pawn-orders-qa-attribute-orders',
    number: 588,
    category: 'Pawn System',
    question: 'What do Attribute Orders (Elements and Physical Types) do?',
    answer:
      'Attribute Orders force your Pawns to utilize specific damage types and elements:\n\n• Elemental Orders (Fire, Ice, Lightning, Holy, Dark): Forces Pawns to cast matching spells and attacks, and prompts Tank Pawns to enchant weapons with that specific element if available.\n• Physical Damage Orders (Slash, Impact, Pierce): Directs Red DPS Pawns to prioritize specific physical weapon arts:\n  - Slash: Severing tails and soft flesh.\n  - Impact: Smashing Golems, Skeletons, and heavily armored parts.\n  - Pierce: Exploiting specific aerial or anatomical weak points.',
    tags: ['Attribute Orders', 'Elements', 'Slash', 'Impact', 'Pierce', 'Weapon Arts', 'Physical Types'],
    source: 'Pawn Orders Guide • Attribute Orders'
  }
];
