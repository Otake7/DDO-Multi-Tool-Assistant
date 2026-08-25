import { JournalQuestion } from '../types';

export const SPECIAL_ACCESSORIES_QA: JournalQuestion[] = [
  {
    id: 'special-acc-1',
    question: 'What are Special Accessories and Supreme Multi-Augment Crests in DDON?',
    answer: 'Special Accessories are unique end-game items that contain built-in crests granting 5 to 6 high-tier augments simultaneously in a single piece of equipment. These augments are slightly stronger than standard Level 6 versions (e.g. LV. 6+). You can wear them directly or slot them into your Job Emblem. Even though a Supreme Accessory provides up to 6 distinct passive effects, it only consumes 1 single augment slot against your augment cap.',
    category: 'Equipment & Crafting',
    tags: ['Special Accessories', 'Supreme Crests', 'Job Emblem', 'Augments', 'Myrmidon', 'Inquiry'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 97
  },
  {
    id: 'special-acc-2',
    question: 'How does the Supreme Accessory (Myrmidon) work, and who should equip it?',
    answer: 'The Supreme Accessory (⬠ Myrmidon) is the ultimate Pawn-enhancement accessory:\n• Included LV. 6+ Effects: Companion Health (+700 Max HP), Companion Stamina (+500 Max Stamina), Companion Attack (+40 STR), Companion Magick (+40 MGK), Companion Defense (+40 Phys Def), Companion Magick Defense (+40 Mag Def).\n• Usage Rule: It must be worn by the ARISEN. It does NOT work when equipped by a Pawn directly. It buffs all of your own active pawns in the party for only 1 accessory/augment slot. Never take it off when playing with Pawns!',
    category: 'Pawns',
    tags: ['Myrmidon', 'Supreme Accessory', 'Companion Health', 'Pawn Stats', 'STR', 'MGK'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'special-acc-3',
    question: 'What effects are included in the Supreme Accessory (Inquiry)?',
    answer: 'The Supreme Accessory (⬠ Inquiry) is the premier exploration and utility accessory:\n• Gathering LV. 1+ (Massively increases minimap node detection range)\n• Treasure Eye LV. 1+ (Massively increases treasure chest minimap detection range)\n• Extended Springs LV. 6+ (Hot spring buffs last 35 minutes instead of 30)\n• Safe Landing LV. 6+ (Further extends maximum safe fall height without taking damage)\n• Flow LV. 6+ (Maximum movement speed through deep water and toxic sludge)\n• Efficacy LV. 6+ (Consumable healing items restore +80% more HP instead of +60%)\nNote: Does not work on Pawns; equipped by the Arisen.',
    category: 'Gameplay Basics',
    tags: ['Inquiry', 'Supreme Accessory', 'Gathering', 'Treasure Eye', 'Flow', 'Efficacy', 'Hot Springs'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'special-acc-4',
    question: 'What effects are included in the Supreme Accessory (Purge) for corrupted enemies?',
    answer: 'The Supreme Accessory (⬠ Purge) provides top-tier offensive and defensive utility for Season 2 content and climbing builds:\n• Infected Destroyer LV. 6+ (+50 STR/MGK against infection spikes, instead of 35)\n• Infected Safeguard LV. 6+ (Take 35% less damage from infected foes, instead of 25%)\n• Reduced Corruption LV. 6+ (+33 resistance to Corruption, instead of 25)\n• Great Grasp LV. 6+ (Deal +10% more damage when climbing on an enemy, instead of 7%)\n• Hardy LV. 6+ (Knockdown Power +45 when Stamina is above 85%, instead of 40)\nNote: This accessory works for both the Arisen and Pawns.',
    category: 'Combat & Damage',
    tags: ['Purge', 'Supreme Accessory', 'Infected Destroyer', 'Corruption', 'Great Grasp', 'Hardy', 'Climbing'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'special-acc-5',
    question: 'What effects are included in the Supreme Accessory (Night Emperor)?',
    answer: 'The Supreme Accessory (⬠ Night Emperor) is specialized for aerial combat, night hunting, and curse protection:\n• Rakshasa LV. 6+ (+550 Max HP at night, instead of 450)\n• Yasha LV. 6+ (+400 Max Stamina at night, instead of 350)\n• Sky Annihilation LV. 6+ (+13% aerial attack damage, instead of 10%)\n• Egression LV. 6+ (Significantly easier to break free from enemy grab attacks)\n• Holy Body LV. 6+ (+50 resistance to Curse, instead of 30)\nNote: Works for both Arisen and Pawns.',
    category: 'Combat & Damage',
    tags: ['Night Emperor', 'Supreme Accessory', 'Sky Annihilation', 'Aerial Damage', 'Curse', 'Rakshasa', 'Yasha'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 92
  },
  {
    id: 'special-acc-6',
    question: 'How do Special Accessories and Crests interact with the Job Emblem system?',
    answer: 'Key Job Emblem implantation rules:\n1. All Effects Transfer: If you implant a multi-augment crest (such as Myrmidon, Inquiry, Purge, or Night Emperor) into your Job Emblem, ALL 5–6 augments transfer and remain active simultaneously as long as activation conditions are met.\n2. Single Augment Rule: The implanted crest still only occupies 1 single augment slot inside the emblem.\n3. Base Stats Do NOT Transfer: Any flat stats present on the original accessory (such as the +7 Phys/Mag Atk, +150 HP, +30 Endurance on Extreme accessories) will NOT transfer to your Emblem; only the crest\'s special augment effects are transferred.',
    category: 'Equipment & Crafting',
    tags: ['Job Emblem', 'Crest Implantation', 'Stats Transfer', 'Special Accessories', 'Augments Cap'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'special-acc-7',
    question: "How does the Rookie's Ring of Blessing XP boost work?",
    answer: "The Rookie's Ring of Blessing grants a flat +25% bonus EXP from level 1 through 40. Once you reach level 90, the effect permanently transforms into a +50% EXP boost, but it deactivates entirely once you pass level 90. Key notes:\n• Only the character wearing it receives the bonus (Pawns must wear their own ring and meet level requirements).\n• Does not stack with other identical rings.\n• Functions even if the ring appears to have an empty crest slot in the inventory UI.",
    category: 'Leveling & Progression',
    tags: ["Rookie's Ring of Blessing", 'EXP Boost', 'Leveling', 'XP Up', 'Rookie Ring'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'special-acc-8',
    question: 'What is the difference between "Extreme (Vocation)" accessories and standard Universal Bracelets?',
    answer: '• Extreme (Vocation-Locked) Accessories (e.g. Earrings of Dashing - Extreme, Bracelet of Unburdening - Extreme, Bracelet of Seizing - Extreme, Earrings of Soaring - Extreme): Provide stronger "Extreme" rank effects (e.g., -100 flat weight, faster sprint ramping, massive climb speed) PLUS bonus base stats (+7 Phys Atk, +7 Mag Atk, +150 HP, +150 Stamina, and +30 Endurance or +10 Chance Atk). They are locked to specific vocations.\n• Universal Bracelets (e.g. Bracelet of Dashing, Bracelet of Unburdening 20%, Bracelet of Soaring, Bracelet of Seizing): Can be equipped by any vocation without class limits, but provide milder effects and have zero bonus base stats.',
    category: 'Equipment & Crafting',
    tags: ['Extreme Accessories', 'Universal Bracelets', 'Dashing', 'Unburdening', 'Seizing', 'Soaring', 'Mobility'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 90
  }
];
