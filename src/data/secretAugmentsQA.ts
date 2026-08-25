import { JournalQuestion } from '../types';

export const SECRET_AUGMENTS_QA: JournalQuestion[] = [
  {
    id: 'secret-aug-1',
    question: 'What are Secret Augments and how are they unlocked in DDON?',
    answer: 'Secret Augments are specialized universal augments that provide unique utility, environmental resistances, weather bonuses, pawn enhancements, and custom battle music. They are unlocked through three primary methods: 1) Spending Blood Orbs (BO) in the Season 1 BO tree (marked with △), 2) Consuming unique Augment Scroll items obtained from drops/events/EXMs (marked with ◇), or 3) Equipping combo accessories like Inquiry, Myrmidon, and Night Emperor (marked with ⬠). Item-consumed versions often have reduced equip cost.',
    category: 'Classes & Skills',
    tags: ['Secret Augments', 'Blood Orbs', 'BO Tree', 'Augment Scrolls', 'Inquiry', 'Myrmidon'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 98
  },
  {
    id: 'secret-aug-2',
    question: 'What do the symbols (△, ◇, ⬠) mean on Secret Augments?',
    answer: '• △ (Triangle): Available in the Season 1 Blood Orb (BO) tree in the Great Temple.\n• ◇ (Diamond): A secret/lower-cost version can be learned by consuming an Augment item/scroll.\n• ⬠ (Pentagon): Included as a built-in passive on specific Combo Accessories (such as the "Inquiry" or "Myrmidon" rings).',
    category: 'Classes & Skills',
    tags: ['Symbols', 'Secret Augments', 'Blood Orb', 'Scroll', 'Inquiry'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'secret-aug-3',
    question: 'How do Effect Extension and Efficacy work for potions and buffs?',
    answer: '• Effect Extension (Cost 7 / 3): Doubles the duration of buffs given by items (for example, extending 2.5-minute top-tier attack brews to 5 full minutes). It is considered essential for prolonged boss and raid encounters.\n• Efficacy (Cost 7 / 5): Increases healing gained from restorative consumable items by 60%. Included in the "Inquiry" combo accessory (slots 1-6).',
    category: 'Gameplay Basics',
    tags: ['Effect Extension', 'Efficacy', 'Buff Duration', 'Healing', 'Consumables'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'secret-aug-4',
    question: 'How do Companion Augments work and how do I unlock them from my Partner Pawn?',
    answer: 'Companion Augments boost party Pawn stats and do NOT affect the player character. They cannot be equipped by Pawns directly; instead, the Arisen equips them to empower all Pawns in the party. They are unlocked by raising relationship levels with your Partner Pawn in the Crafting Room:\n• Level 3: Companion Health (+600 Max HP)\n• Level 4: Companion Attack (+30 STR)\n• Level 9: Companion Defense (+30 Phys Def)\n• Level 13: Companion Stamina (+400 Max Stamina)\n• Level 17: Companion Magick (+30 MGK)\n• Level 18: Companion Magick Defense (+30 Mag Def)\nAll of these are included in the "Myrmidon" combo accessory.',
    category: 'Pawns',
    tags: ['Companion Health', 'Companion Attack', 'Partner Pawn', 'Relationship', 'Myrmidon', 'Pawn Stats'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'secret-aug-5',
    question: 'How do the Battle Music augments (Music Hunter, Music May Cry, etc.) work?',
    answer: 'Music Augments cost 1 point and change the background battle music during normal encounters to iconic Capcom themes:\n• Music Hunter: "Proof of a Hunter" (Monster Hunter)\n• Music May Cry: "Devils Never Cry" (Devil May Cry 3)\n• Music Fighter: "Japan (Ryu)" (Street Fighter)\n• Wily Music: "Dr. Wily Stage 1" (Mega Man 2)\n• Music\'n Goblins: "Plains BGM" (Ghosts \'n Goblins)\nNotes: They are unlocked by default. They only change regular combat music; Blood Orb and Boss themes remain unaffected. In parties, the party leader\'s topmost music augment takes priority.',
    category: 'Events & Cosmetics',
    tags: ['Music', 'BGM', 'Monster Hunter', 'DMC', 'Street Fighter', 'Mega Man', 'Capcom'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'secret-aug-6',
    question: 'How does the Flow augment work for water and toxic sludge?',
    answer: 'Flow (Cost 3 / 1) significantly reduces the movement slowdown penalty when wading through deep water and toxic sludge. While the Season 1 BO tree has a minor passive terrain resistance, the Flow augment provides far more potent mobility, especially at max rank. It is also included in the "Inquiry" accessory.',
    category: 'Gameplay Basics',
    tags: ['Flow', 'Water', 'Toxic Sludge', 'Terrain', 'Movement Speed'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 88
  },
  {
    id: 'secret-aug-7',
    question: 'How does the Willpower augment work for fatal attacks?',
    answer: 'Willpower (Cost 8 / 4) allows you to survive a fatal killing blow with 1 HP remaining, provided your current HP was below 1200 when the hit landed. While it does not prevent true one-shots from full health above the threshold, it is invaluable for surviving multi-hit lethal combos. Unlocked in S1 BO tree (Tier 4, Top Left for 5000 BO) or via consumable item.',
    category: 'Gameplay Basics',
    tags: ['Willpower', 'Survive', 'Lethal Hit', '1 HP', 'Blood Orb'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 87
  },
  {
    id: 'secret-aug-8',
    question: 'Does the Expert Excavator augment work for gathering tools?',
    answer: 'No. Expert Excavator (Cost 4 / 2, S1 BO tree Tier 3) is currently bugged and does not reduce tool break chance. Do not spend your Blood Orbs or item scrolls on it.',
    category: 'Crafting',
    tags: ['Expert Excavator', 'Pickaxe', 'Gathering', 'Bug', 'Blood Orb'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 89
  },
  {
    id: 'secret-aug-9',
    question: 'What is the difference between "Resist", "Control", and "Reduce" debuff augments?',
    answer: '• "Resist" (e.g. Resist Poison, Resist Petrification, Close to Fire): Increases your flat resistance stat by +30, making it harder for the ailment to trigger on you (visible on status page).\n• "Control" (e.g. Control Poison, Control Stun, Control Sleep): Decreases the active duration of the debuff once you are afflicted.\n• "Control Petrification / Gilded": Extends your grace period before turning completely to stone or gold, giving you time to use Softener or Gold-cure.\n• "Reduce" (e.g. Reduce Burning, Reduce Freeze, Reduce Defense Down): Cuts down how long elemental DoTs and stat down debuffs last on your character.',
    category: 'Gameplay Basics',
    tags: ['Resist', 'Control', 'Reduce', 'Debilitations', 'Petrification', 'Status'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'secret-aug-10',
    question: 'What Secret Augments are included in the "Inquiry" and "Night Emperor" accessories?',
    answer: '• Inquiry Accessory: Includes Extended Springs, Gathering, Efficacy (1-6), Flow, Treasure Eye, and Safe Landing.\n• Night Emperor Accessory: Includes Rakshasa (+450 HP at night) and Yasha (+350 Stamina at night), along with other night-time benefits.',
    category: 'Endgame',
    tags: ['Inquiry', 'Night Emperor', 'Accessories', 'Combo Augments'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 92
  },
  {
    id: 'secret-aug-11',
    question: 'How do Gathering and Treasure Eye augments modify the minimap?',
    answer: '• Gathering (Cost 6 / 3): At max level, expands your gathering node minimap detection range by approximately 5x. Nodes appear as small crosses.\n• Treasure Eye (Cost 3 / 1): Expands treasure chest minimap detection range by 2x to 3x, revealing chests as small crosses. Both max out at level 1.',
    category: 'Gameplay Basics',
    tags: ['Gathering', 'Treasure Eye', 'Minimap', 'Chests', 'Nodes'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 86
  }
];
