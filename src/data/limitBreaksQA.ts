import { JournalQuestion } from '../types';

export const LIMIT_BREAKS_QA: JournalQuestion[] = [
  {
    id: 'limit-breaks-qa-system-overview',
    number: 590,
    category: 'Equipment & Crafting',
    question: 'What is the Limit Break system, when is it unlocked, and which NPCs handle it?',
    answer:
      'The Limit Break system allows you to imbue powerful secondary affixes and stat bonuses onto maxed equipment:\n\n• Unlock Requirement: When a piece of gear (weapon, armor, or clothing) is upgraded to 4-star maximum enhancement, standard upgrading ends and Limit Breaking becomes available.\n• Managing NPCs:\n  - Craig in the Craft Room (White Dragon Temple)\n  - Suleiman in the Megado Workshop (Megado)\n• Strategy: It is almost always better to go "all-in" stacking a single specialized effect rather than spreading rolls across random minor stats.',
    tags: ['Limit Breaks', '4-Star Gear', 'Craig', 'Suleiman', 'Craft Room', 'Megado Workshop', 'All-In Strategy'],
    source: 'Limit Breaks Guide • System & NPCs'
  },
  {
    id: 'limit-breaks-qa-rolling-currency',
    number: 591,
    category: 'Equipment & Crafting',
    question: 'What is the best method/currency for rolling max Limit Break stats?',
    answer:
      'The odds of rolling a maximum Limit Break stat value using Rift Crystals (RC) are exceptionally low unless server rates have been adjusted.\n\n• Recommendation: Always prioritize using Limit Break Tickets and Golden Gemstones whenever available to secure top-tier max stat rolls.\n• Focus: Dedicate your tickets and gemstones toward your primary weapon (Knockdown Power or Defense Down) and chest/leg armor pieces (Recovery Limit and Endurance).',
    tags: ['Limit Breaks', 'Rift Crystals', 'Tickets', 'Golden Gemstones', 'Max Roll', 'RNG Strategy'],
    source: 'Limit Breaks Guide • Currency & RNG'
  },
  {
    id: 'limit-breaks-qa-best-weapon-rolls',
    number: 592,
    category: 'Equipment & Crafting',
    question: 'What are the top-tier Weapon Limit Break options to aim for?',
    answer:
      'The strongest weapon Limit Break options include:\n\n1. Knockdown Power +100: Top-tier for vocations with low base KD power and essential for dealing purple Blow Damage against Season 3 War-Ready armor.\n2. Physical Defense Down +100: Causes afflicted enemies to take +20% more physical damage from all party members.\n3. Magick Defense Down +100: Causes afflicted enemies to take +20% more magickal damage from all party members.\n4. Torpor +100: Drastically reduces enemy animation speed, taming hyper-aggressive boss attacks.\n5. Poison +100: Extremely potent against endgame raid bosses with massive HP pools (deals percentage-based health damage). Combos with Dark Force.\n6. Sleep +100: Temporarily disables targets to separate multi-boss encounters.',
    tags: ['Weapon Limit Breaks', 'Knockdown Power', 'Defense Down', 'Torpor', 'Poison', 'Sleep', 'Top Tier'],
    source: 'Limit Breaks Guide • Weapon Options'
  },
  {
    id: 'limit-breaks-qa-knockdown-power-war-ready',
    number: 593,
    category: 'Equipment & Crafting',
    question: 'Why is Knockdown Power +100 so valuable on weapons, especially against War-Ready enemies?',
    answer:
      'Knockdown Power +100 is exceptionally powerful for two main reasons:\n\n1. Accessory Cap Limitation: Rings and accessories cap at a maximum of +20 Knockdown Power, making a +100 weapon roll irreplaceable for vocations with low innate stagger.\n2. War-Ready Armor Scaling: In Season 3, War-Ready enemy armor takes purple Blow Damage that directly scales with your character\'s Knockdown Power (up to ~3,500 damage per hit). Stacking +100 Knockdown Power enables rapid armor shattering and cancels lethal boss mechanics.',
    tags: ['Knockdown Power', 'War-Ready', 'Blow Damage', 'Accessory Cap', 'Stamina Stagger', 'Season 3'],
    source: 'Limit Breaks Guide • Weapon Options'
  },
  {
    id: 'limit-breaks-qa-phys-mag-def-down',
    number: 594,
    category: 'Equipment & Crafting',
    question: 'How much damage amplification do Physical and Magick Defense Down weapon rolls provide?',
    answer:
      'Physical Defense Down +100 and Magick Defense Down +100 are among the highest DPS multipliers available on weapons:\n\n• Physical Defense Down: Causes the afflicted enemy to take +20% more damage from all physical attacks while active.\n• Magick Defense Down: Causes the afflicted enemy to take +20% more damage from all magickal attacks while active.\n• Stacking: These debuffs stack effectively with Defense Down accessories and pawn debuff commands, maximizing burst during Downed phases.',
    tags: ['Physical Defense Down', 'Magick Defense Down', '+20% Damage', 'Debuff Multipliers', 'Down Phase Burst'],
    source: 'Limit Breaks Guide • Weapon Options'
  },
  {
    id: 'limit-breaks-qa-petrification-golden',
    number: 595,
    category: 'Equipment & Crafting',
    question: 'How do Petrification +100 and Gilded / Golden +100 weapon rolls work, and what is the trade-off?',
    answer:
      'Both Petrification and Golden encase the enemy in stone or gold, completely immobilizing them:\n\n• Damage Bonus: While petrified or gilded, the enemy takes +25% bonus Impact (Blunt) damage.\n• Golden Advantage: More endgame monsters are susceptible to Golden than Petrification.\n• The Critical Catch: Triggering Petrification or Golden instantly purges/deletes all other currently active debuffs on the enemy (such as Defense Down or elemental statuses). Use with caution in coordinated parties.',
    tags: ['Petrification', 'Gilded', 'Golden', 'Impact Damage +25%', 'Debuff Purge', 'Crowd Control'],
    source: 'Limit Breaks Guide • Weapon Options'
  },
  {
    id: 'limit-breaks-qa-low-priority-weapons',
    number: 596,
    category: 'Equipment & Crafting',
    question: 'Which Weapon Limit Break options are NOT recommended and why?',
    answer:
      'The following weapon rolls are generally not worth your Limit Break slots:\n\n• Drenching +100 & Tarring +100: Lightning/Ice Force already apply Drenching naturally, while Fire Force applies Tarring.\n• Skill Stifling +100: Light Force already applies Skill Stifling innately.\n• Element Resist Down +100: Only increases elemental damage by +10% (inferior to +20% from Phys/Mag Defense Down) and is already applied heavily by Elemental Forces.\n• Physical / Magick Attack Down +100: Low utility and easily applied via support skills/accessories without wasting a weapon slot.\n• Frail +100: Better applied via specific class skills rather than sacrificing weapon affixes.',
    tags: ['Weapon Limit Breaks', 'Low Priority', 'Redundant Rolls', 'Drenching', 'Tarring', 'Element Resist Down', 'Skill Stifling'],
    source: 'Limit Breaks Guide • Weapon Options'
  },
  {
    id: 'limit-breaks-qa-best-armor-rolls',
    number: 597,
    category: 'Equipment & Crafting',
    question: 'What are the top priority Limit Break options for Armor and Clothing?',
    answer:
      'The optimal progression for Armor and Clothing Limit Breaks is:\n\n1. First Priority — Recovery Limit +30: Stack this until you reach the 100 hard cap. It preserves white health when taking damage, dramatically boosting survivability with Self Feedback and green healing auras.\n2. Second Priority — Endurance +30: Once Recovery Limit is capped at 100, roll Endurance to prevent flinching and interruptions during heavy attacks or spell casting.\n3. Situational — Resist Debilitation +30 (Golden / Curse): Caps at 100 (total immunity), valuable for tanking specific raid bosses.',
    tags: ['Armor Limit Breaks', 'Recovery Limit', 'Endurance', 'Golden Resist', 'Curse Resist', 'Armor Priority'],
    source: 'Limit Breaks Guide • Armor Options'
  },
  {
    id: 'limit-breaks-qa-recovery-limit-cap',
    number: 598,
    category: 'Equipment & Crafting',
    question: 'How does Recovery Limit work on armor, and how do you reach the 100 cap?',
    answer:
      'Recovery Limit determines how much of your lost HP remains as recoverable white health:\n\n• Hard Cap: The stat caps at 100 total.\n• Base Allotment: You receive +5 Recovery Limit by default from your Vocation Emblem.\n• Gear Rolls Needed: You only need +95 from gear Limit Break rolls to reach the 100 maximum cap (do not over-roll past 100).\n• Synergies & Counters: Effectiveness skyrockets when paired with the Self Feedback augment; note that taking damage from Holy Drain reduces your recovery limit.',
    tags: ['Recovery Limit', 'White Health', 'Cap 100', 'Vocation Emblem', 'Self Feedback', 'Holy Drain'],
    source: 'Limit Breaks Guide • Armor Options'
  },
  {
    id: 'limit-breaks-qa-debilitation-resist-caps',
    number: 599,
    category: 'Equipment & Crafting',
    question: 'How do Debilitation Resistance rolls on armor work, and which ones are worth getting?',
    answer:
      'Resist Debilitation (+30) and Resist Elemental Debilitation (+30) rolls operate under the following rules:\n\n• 100% Immunity Cap: Reaching 100 resistance grants complete, permanent immunity to that specific ailment.\n• High-Value Resistances: Golden and Curse are the most impactful to cap on gear.\n• Elemental Resistances: Useful for tanks facing specific elemental raid bosses (e.g. Freeze immunity for Ice Drakes, Burn immunity for Blaze bosses).\n• General Strategy: For most other common debuffs (Poison, Sleep, Torpor), relying on pawn cleansing commands or carrying curative consumables is faster and cheaper than dedicating gear rolls.',
    tags: ['Resist Debilitation', '100% Immunity', 'Golden Resist', 'Curse Resist', 'Elemental Resist', 'Cleansing'],
    source: 'Limit Breaks Guide • Armor Options'
  }
];
