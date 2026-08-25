import { JournalQuestion } from '../types';

export const STATS_EXPLANATION_QA: JournalQuestion[] = [
  {
    id: 'stat-qa-hp',
    question: 'How does Health (HP), the 9999 damage cap, and the Curse debuff work in DDON?',
    answer: 'Health (HP) mechanics in Dragon\'s Dogma Online:\n• One-Shot Prevention: Maximum HP can go above 9,999, which protects you from massive hits. Single hits are normally capped at 9,999 damage.\n• Weakness Exception: If you have the "Weakness" debuff from a standard revival, incoming damage can exceed 9,999 and instantly kill you.\n• Curse Status: Getting Cursed cuts your maximum HP in half (50% reduction).\n• Survival Augments: Augments like Willpower or Pawn Special Skills allow you to survive lethal blows with 1 HP remaining.\n• Augment Thresholds: Several combat augments trigger when HP is above 80% (high health buffs) or below 20% (crisis buffs).',
    category: 'Combat & Damage',
    tags: ['Health', 'HP', 'Max HP', 'Curse', 'Weakness', 'Willpower', '9999 Damage Cap'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'stat-qa-stamina-height',
    question: 'Does character height or body size affect stamina consumption or running speed?',
    answer: 'No! Character height and body size sliders do NOT affect stamina usage, sprint speed, hitbox size, or any other gameplay mechanics in DDON.\n• Stamina consumption and natural regeneration speed depend entirely on your total Weight tier (Encumbrance), your skill levels, and active stamina augments or support buffs.\n• Depleting stamina triggers an exhausted panting animation that leaves you vulnerable, but this recovery window can be shortened with recovery augments.',
    category: 'Gameplay Basics',
    tags: ['Stamina', 'ST', 'Height Myth', 'Character Size', 'Weight', 'Exhaustion'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'stat-qa-weight-brackets',
    question: 'What are the Weight and Encumbrance brackets, and how do they affect stamina?',
    answer: 'Every piece of equipped gear and accessory adds to your total Weight. The weight tiers are:\n• 0 – 200: Very Light (Fastest natural stamina regen; lowest skill stamina cost)\n• 200 – 300: Light (Optimal standard DPS tier with minimal stamina penalty)\n• 300 – 400: Normal (Noticeable delay in stamina recovery)\n• 400 – 500: Heavy (Slow stamina regen; skills cost noticeably more ST)\n• 500+: Overencumbered (Severe stamina penalty; sprint and skill costs skyrocket)\nTip: You can use the Bracelet of Unburdening - Extreme (-100 weight, net -99) or Universal Unburdening (-20% gear weight) to drop down to lighter brackets.',
    category: 'Equipment & Crafting',
    tags: ['Weight', 'Encumbrance', 'Very Light', 'Light', 'Stamina Regen', 'Unburdening'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'stat-qa-attack-penetration',
    question: 'How does Physical/Magick Attack and the Penetration Rate formula work?',
    answer: 'The damage formula calculates a "Penetration Rate" comparing your Attack against the enemy\'s Defense:\n• Penetration Ratio Cap: The Penetration Rate is capped at a ratio of 1.0. This means once your attack completely surpasses the monster\'s defense (usually when your gear is ~5 levels above the enemy), getting additional raw weapon attack will not increase damage further through penetration.\n• Slayer Effects: "Slayer" stats add flat bonuses to both Physical and Magick Attack specifically against that enemy species.\n• Single Hit Cap: The maximum damage you can deal per hit is 9,999. Multi-hit attacks bypass this by dealing many separate hits.',
    category: 'Combat & Damage',
    tags: ['Physical Attack', 'Magick Attack', 'Penetration Rate', '9999 Cap', 'Slayer Crests', 'Weapons'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'stat-qa-str-mgk-diminishing',
    question: 'What are the diminishing returns for Strength (STR) and Magick (MGK)?',
    answer: 'Unlike Penetration Rate, STR and MGK have no hard ceiling and directly boost your damage, but they have diminishing returns per point:\n• 100 – 200 STR/MGK: Each point provides ~1.00% more damage\n• 200 – 300 STR/MGK: Each point provides ~0.50% more damage\n• 300 – 400 STR/MGK: Each point provides ~0.26% more damage\n• 400 – 500+ STR/MGK: Each point provides ~0.25% more damage\nTip: Blood Orb trees provide the bulk of permanent STR/MGK. Towards endgame, anti-type species augments/crests provide higher multipliers for less investment than stacking pure STR/MGK past 300.',
    category: 'Combat & Damage',
    tags: ['STR', 'MGK', 'Strength', 'Magick', 'Diminishing Returns', 'Blood Orb Tree', 'Scaling'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'stat-qa-knockdown-power',
    question: 'What does Knockdown Power (Blow Power) do against different enemy types?',
    answer: 'Knockdown Power determines your stagger potency and interacts with specific enemy mechanics:\n• Enraged Bosses: Accelerates how fast their Break Gauge fills up during Enrage.\n• Constructs & Tired Foes: Has almost NO effect on Construct enemies and does NOT topple Tired monsters faster.\n• Season 2 Infected Foes: Rapidly shatters their "Corruption Aura", removing their stagger resistance and damage reduction.\n• Season 3 War-Ready Foes: Damage dealt to purple armor plates scales directly with Knockdown Power.\n• Undead: High Knockdown Power can instantly one-shot specific Season 3 Skeleton enemies (like Skeleton Wargs).\n• Vocations: Hunter has the primary Knockdown augments; Sorcerer unlocks one later.',
    category: 'Combat & Damage',
    tags: ['Knockdown Power', 'Blow Power', 'Enrage', 'Break Gauge', 'Infected Aura', 'War-Ready', 'Hunter'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'stat-qa-endurance',
    question: 'What is Endurance and why is it recommended for armor Limit Break?',
    answer: 'Endurance is your resistance to being staggered, interrupted, or knocked back by enemy hits (poise):\n• It prevents your skill executions and spell incantations from being interrupted when taking light or medium hits.\n• It is an outstanding 2nd choice for Limit Break on armor pieces.\n• Warrior possesses the core passive Endurance augments.',
    category: 'Combat & Damage',
    tags: ['Endurance', 'Poise', 'Stagger Resistance', 'Limit Break', 'Warrior', 'Interruption'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 89
  },
  {
    id: 'stat-qa-chance-attack',
    question: 'What is Chance Attack and what are the optimal stat targets?',
    answer: 'Chance Attack reduces the number of hits needed to topple an enemy that is out of stamina (Exhausted state):\n• Also boosts stamina damage against white "Chance Cores" and makes it easier to knock down Spirit and Cursed type enemies who lack cores.\n• Target: Build up to 40 on your Vocation Emblem and add +10 with a Slayer Stone on your weapon (50–100 total is optimal).\n• Above 120 is generally overkill, but there is no hard cap or diminishing returns.\n• Warrior has the bulk of Chance Attack augments; Seeker has a key one down the line.',
    category: 'Combat & Damage',
    tags: ['Chance Attack', 'Exhausted', 'Topple', 'Chance Core', 'White Core', 'Warrior', 'Vocation Emblem'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 92
  },
  {
    id: 'stat-qa-exhaust-attack',
    question: 'What is Exhaust Attack and when should you prioritize it on your Vocation Emblem?',
    answer: 'Exhaust Attack determines how much stamina damage you deal to an Enraged boss, particularly when striking exposed cores:\n• Also increases the stamina damage of the climbing "Shake" action.\n• Vocation Emblem Priority: Typically second priority after Chance Attack, but should be built FIRST if you already have ample Chance Attack or are specifically fighting targets with Elemental Cores.\n• Benchmark: Around 100 Exhaust Attack is plenty to destroy Enrage gauges.\n• High Scepter has the core Exhaust Attack augments.',
    category: 'Combat & Damage',
    tags: ['Exhaust Attack', 'Enrage', 'Shake', 'Elemental Cores', 'High Scepter', 'Vocation Emblem'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'stat-qa-stun-power',
    question: 'How does Stun Power work, and does Stun extend an enemy\'s Down phase?',
    answer: 'Stun Power accelerates how quickly skills accumulate the Stun debilitation (daze/wobble) on enemies:\n• Skill Multipliers: Different skills possess hidden internal Stun multipliers (from minimal to massive).\n• Enemy Weaknesses: Magickal Constructs are immune, while Beasts and Giants are extremely susceptible.\n• CRITICAL DOWN RULE: Stun does NOT extend the Downed damage phase. An enemy will still stand up when its Down timer finishes, though it will remain dazed/stunned standing if the stun duration is still active.\n• Warrior has the core Stun Power augments.',
    category: 'Combat & Damage',
    tags: ['Stun Power', 'Knockout Power', 'Daze', 'Down Phase', 'Constructs', 'Warrior'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'stat-qa-recovery-limit',
    question: 'What does Recovery Limit (Healing Power) actually do in DDON?',
    answer: 'Recovery Limit (formerly translated as "Healing Power") is the most misunderstood stat in the game:\n• What it DOES: It increases the amount of recoverable gray HP you retain after taking damage.\n• Hard Cap of 100: Caps at 100, meaning 100% of all incoming damage is retained as recoverable gray HP (just like fall damage). Values over 100 have zero benefit.\n• What it DOES NOT do: It does NOT increase potion healing amounts, heal tick rates, or spell potency.\n• Limit Break: It is the undisputed #1 first choice for Armor Limit Break.\n• Holy Drain debilitation severely impairs its effectiveness.\n• Element Archer has the Recovery Limit augments.',
    category: 'Healing & Support',
    tags: ['Recovery Limit', 'Healing Power', 'Gray HP', 'Hard Cap 100', 'Limit Break #1', 'Element Archer'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 97
  },
  {
    id: 'stat-qa-resistances',
    question: 'How do Debilitation and Elemental Resistances work and scale?',
    answer: 'Resistance mechanics in DDON:\n• 1 Point = 1% Resistance: Each point of resistance equals 1% resistance against that specific debilitation.\n• Hard Cap at 100: At 100 resistance, you have 100% complete immunity to that status ailment.\n• Elemental Resistances: Elemental resistances (Fire, Ice, Thunder, Holy, Dark) grant percentage damage reduction or flat defensive additions.\n• Recommended Sources: Obtain resistance primarily through Armor Crests and Limit Break. Do NOT spend Vocation Emblem points on resistances unless testing niche strategies.\n• Augments: Priest has elemental resistance augments; Sorcerer and Shield Sage also offer status wards.',
    category: 'Combat & Damage',
    tags: ['Resistance', 'Status Immunity', '100 Cap', 'Crests', 'Priest', 'Shield Sage', 'Debilitations'],
    source: '@Community Compendium, 2026',
    verified: true,
    popularity: 91
  }
];
