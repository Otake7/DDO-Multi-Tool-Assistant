export interface StatDetail {
  id: string;
  name: string;
  aliases?: string[];
  category: 'Vitality & Resources' | 'Offensive Scaling' | 'Defensive & Mitigation' | 'Combat Gauges & CC' | 'Healing & Status';
  shortDesc: string;
  fullExplanation: string;
  capOrScaling: string;
  associatedVocations: string[];
  recommendedTargets: string;
  keyTactics: string[];
  bracketsTable?: { range: string; effect: string; note: string }[];
  tags: string[];
}

export const STATS_EXPLANATION_DATA: StatDetail[] = [
  {
    id: 'health-hp',
    name: 'Health (HP)',
    aliases: ['Max HP', 'Hit Points'],
    category: 'Vitality & Resources',
    shortDesc: 'Your maximum capacity to endure damage before falling unconscious.',
    fullExplanation:
      "Your primary survival resource. When HP hits zero, you collapse and human party members must revive you, or you must spend a revival charge or Golden Gemstone to stand back up. Certain augments require keeping HP above 80% or below 20% to activate. Single hits are normally capped at 9,999 damage, but having the 'Weakness' debuff from a standard revival can cause damage to exceed that. Getting Cursed cuts your maximum HP in half. Max HP can go above 9,999, which allows you to survive hits that would otherwise one-shot you. Fatal blows can also be survived using a Pawn Special Skill or the Willpower augment.",
    capOrScaling: 'Can exceed 9,999 (prevents single-hit lethal one-shots). Damage taken per hit caps at 9,999 normally.',
    associatedVocations: ['All Vocations', 'Shield Sage', 'Fighter', 'Warrior'],
    recommendedTargets: 'Keep above 0; augment triggers at >80% (Safe/High) or <20% (Crisis/Emergency).',
    keyTactics: [
      'Survive lethal one-shots by pushing max HP past 9,999 or slotting the Willpower augment.',
      'Curse status cuts maximum HP by 50%—carry Curse-curing curatives or slot Holy Body / Night Emperor.',
      'Weakness debuff after standard non-gem revives lowers defense enough for incoming damage to break the 9,999 cap.'
    ],
    tags: ['HP', 'Health', 'Survival', 'Weakness', 'Curse', 'Willpower', 'One-Shot']
  },
  {
    id: 'stamina-st',
    name: 'Stamina (ST)',
    aliases: ['Max Stamina', 'ST Pool'],
    category: 'Vitality & Resources',
    shortDesc: 'Primary resource consumed for casting spells, executing weapon skills, running, and climbing.',
    fullExplanation:
      "Stamina powers almost every offensive and defensive action, including magick casting. Depleting your gauge triggers an exhausted panting animation that leaves you defenseless. Stamina recovery speed can be enhanced via support skills, augments, and consumable extracts. Several top-tier offensive augments require Stamina to remain above 80% to stay active. Consumption rates and natural regeneration speeds are dictated by your total Weight bracket and skill levels. Note: Character model height and body build do NOT affect stamina usage, sprint speed, or hitboxes in DDON.",
    capOrScaling: 'Scales with level, Blood Orb trees, and gear. Regen rate heavily governed by Weight bracket.',
    associatedVocations: ['All Vocations', 'Priest (Energy Reinforce)', 'Hunter', 'Seeker'],
    recommendedTargets: 'Maintain above 80% during rotations to keep conditional augments (e.g. Hardy LV.6) active.',
    keyTactics: [
      'Exhausted animation can be shortened or eliminated through specific recovery augments.',
      'Heavier weight brackets drastically slow natural stamina regeneration and increase skill costs.',
      'Character physical height and slider proportions have 0 impact on sprint speed or stamina mechanics.'
    ],
    tags: ['Stamina', 'ST', 'Exhaustion', 'Weight Bracket', 'Height Myth', 'Hardy']
  },
  {
    id: 'weight-encumbrance',
    name: 'Weight & Encumbrance',
    aliases: ['Encumbrance', 'Gear Weight'],
    category: 'Vitality & Resources',
    shortDesc: 'The sum of all equipped armor, weapons, and accessories determining stamina regen and skill drain.',
    fullExplanation:
      'Every equipped weapon, armor piece, and accessory carries a Weight value. Your overall weight tier dictates your natural stamina recovery speed and the stamina drain of sprinting and skills. Maintaining a Very Light or Light tier is recommended for fluid combat rotations unless you rely on external stamina batteries (Priest/Alchemist) or chug stamina extracts.',
    capOrScaling: 'Tiered brackets from 0 to 500+ weight units.',
    associatedVocations: ['All Vocations (Crucial for Seekers, Hunters, and Sorcerers)'],
    recommendedTargets: 'Target 0–200 (Very Light) or 200–300 (Light) for optimal stamina regeneration.',
    keyTactics: [
      'Use the Bracelet of Unburdening - Extreme (-100 weight, net -99) or Universal Unburdening (-20% gear weight) to drop encumbrance tiers.',
      'Heavy armor grants superior physical defense and resistance but pushes you into Normal/Heavy stamina brackets.'
    ],
    bracketsTable: [
      { range: '0 – 200', effect: 'Very Light', note: 'Fastest natural stamina regen; lowest skill stamina consumption.' },
      { range: '200 – 300', effect: 'Light', note: 'Optimal balance for most DPS vocations; very minor stamina penalty.' },
      { range: '300 – 400', effect: 'Normal', note: 'Noticeable delay in stamina recovery; standard heavy armor baseline.' },
      { range: '400 – 500', effect: 'Heavy', note: 'Slow stamina regen; skills cost significantly more stamina.' },
      { range: '500+', effect: 'Overencumbered', note: 'Severe stamina recovery penalty; extreme sprint and skill drain.' }
    ],
    tags: ['Weight', 'Encumbrance', 'Very Light', 'Light', 'Stamina Regen', 'Unburdening']
  },
  {
    id: 'phys-mag-attack',
    name: 'Physical Attack & Magick Attack',
    aliases: ['Phys Atk', 'Mag Atk', 'Main Weapon Power'],
    category: 'Offensive Scaling',
    shortDesc: 'Base offensive power determining combat damage and Penetration Rate against enemy defenses.',
    fullExplanation:
      'Offensive power comes primarily from your Main Hand weapon. The damage formula computes a Penetration Rate (Your Attack vs. Enemy Defense). This Penetration Rate is capped at a ratio of 1.0, meaning once your attack completely overpowers enemy defense (typically ~5 gear levels above the monster), adding more raw attack yields no additional penetration scaling. "Slayer" effects provide flat bonus Attack against specific monster species. The maximum damage dealt per single damage tick is capped at 9,999.',
    capOrScaling: 'Penetration Rate capped at 1.0 ratio. Single-hit damage capped at 9,999.',
    associatedVocations: ['All Vocations'],
    recommendedTargets: 'Always keep Main Hand weapon upgraded to current content tier to reach the 1.0 Penetration cap.',
    keyTactics: [
      'Penetration cap means upgrading weapons past 5 levels over an encounter yields diminishing returns on raw attack.',
      'Slayer crests (+Species Attack) add flat physical and magick attack against matching species.',
      'Multi-hit skills (like Seeker Cyclone or Hunter Spiral) bypass the 9,999 single-hit damage cap by landing dozens of hits.'
    ],
    tags: ['Attack', 'Physical Attack', 'Magick Attack', 'Penetration Rate', '9999 Cap', 'Slayer']
  },
  {
    id: 'phys-mag-defense',
    name: 'Physical Defense & Magick Defense',
    aliases: ['Phys Def', 'Mag Def', 'Mitigation'],
    category: 'Defensive & Mitigation',
    shortDesc: 'Defensive mitigation stats that reduce incoming monster attack penetration.',
    fullExplanation:
      'Armor and crests provide Physical and Magick Defense. Monsters have their own Penetration Rate against your defense values; wearing level-appropriate armor keeps enemy penetration low. In Dragon\'s Dogma Online, Physical Defense is substantially more important than Magick Defense in general content because the vast majority of incoming enemy attacks and trash mob strikes are physical. Safeguard augments provide direct percentage damage reduction on top of defense numbers.',
    capOrScaling: 'Mitigates enemy penetration ratio. Supplemented by percentage Damage Reduction augments.',
    associatedVocations: ['Shield Sage', 'Fighter', 'Warrior', 'All Vocations'],
    recommendedTargets: 'Prioritize Physical Defense over Magick Defense for general dungeon crawling and boss fights.',
    keyTactics: [
      'Physical damage accounts for over 75% of incoming damage instances across world exploration and raids.',
      'Shield Sage augments provide the highest baseline defense enhancements in the game.',
      'Safeguard augments stack multiplicatively with raw defense for survivability against high-tier bosses.'
    ],
    tags: ['Defense', 'Physical Defense', 'Magick Defense', 'Penetration', 'Safeguard', 'Shield Sage']
  },
  {
    id: 'str-mgk-scaling',
    name: 'Strength (STR) & Magick (MGK)',
    aliases: ['STR', 'MGK', 'Core Offensive Stats'],
    category: 'Offensive Scaling',
    shortDesc: 'Primary offensive attributes from Blood Orb trees that directly amplify your skill damage.',
    fullExplanation:
      'Unlike the weapon Penetration Rate, STR and MGK have no hard ceiling, but they follow strict diminishing return brackets. Raising STR/MGK is the fastest way to gain raw power early and mid-game, with permanent bonuses acquired through the Season 1 & Season 2 Blood Orb trees. Towards endgame, anti-type species augments (e.g. Slayer crests, Giant/Dragon Killer) provide higher percentage multipliers than raw STR/MGK.',
    capOrScaling: 'Soft diminishing returns starting at 200 and 300 points.',
    associatedVocations: ['Fighter/Hunter/Warrior/Seeker (STR)', 'Priest/Sorcerer/Element Archer (MGK)', 'High Scepter/Alchemist (Hybrid)'],
    recommendedTargets: 'Push BO trees to 300+ baseline STR/MGK, then transition to species-specific slayer crests.',
    keyTactics: [
      'Blood Orb trees are the single largest source of permanent account-wide STR and MGK.',
      'Diminishing return thresholds mean investing heavily in species anti-type multipliers is superior in endgame.'
    ],
    bracketsTable: [
      { range: '100 – 200 STR/MGK', effect: '~1.00% per point', note: 'Maximum damage growth curve; rush this in Blood Orb tree.' },
      { range: '200 – 300 STR/MGK', effect: '~0.50% per point', note: 'Moderate scaling; solid return on investment.' },
      { range: '300 – 400 STR/MGK', effect: '~0.26% per point', note: 'Diminishing returns kick in; species crests become more efficient.' },
      { range: '400 – 500+ STR/MGK', effect: '~0.25% per point', note: 'Flat soft cap; continue if cheap, otherwise focus on multiplier augments.' }
    ],
    tags: ['STR', 'MGK', 'Strength', 'Magick', 'Diminishing Returns', 'Blood Orb Tree', 'Scaling']
  },
  {
    id: 'knockdown-blow-power',
    name: 'Knockdown Power & Blow Power',
    aliases: ['KD Power', 'Stagger Power', 'Break Gauge'],
    category: 'Combat Gauges & CC',
    shortDesc: 'Determines stagger potency, Enraged Break Gauge depletion rate, and armor shredding.',
    fullExplanation:
      'Knockdown Power controls your ability to stagger regular foes and fills the Break Gauge on Enraged large bosses. It has virtually no effect on Magickal Constructs and does not topple Tired monsters any faster. On Infected enemies, high Knockdown Power rapidly breaks their "Corruption Aura" to remove stagger immunity and damage reduction. On War-Ready enemies (Season 3), purple armor damage scales directly with Knockdown Power. Extremely high Knockdown Power can also one-shot specific undead enemies like Skeleton Wargs.',
    capOrScaling: 'No hard cap. Directly scales Break Gauge depletion, Corruption Aura shattering, and War-Ready purple armor damage.',
    associatedVocations: ['Hunter (Primary Knockdown Augments)', 'Warrior', 'Sorcerer', 'Shield Sage'],
    recommendedTargets: 'Stack on Hunters, Warriors, and heavy stagger builds for fast Enrage breaks.',
    keyTactics: [
      'Essential for fast boss Break Gauge fills during Enrage phases.',
      'Disables Season 2 Infected Corruption Auras, stripping their damage reduction instantly.',
      'Directly scales damage dealt to Season 3 War-Ready purple armor plates.',
      'Can instantly obliterate Skeleton Wargs when thresholds are exceeded.'
    ],
    tags: ['Knockdown Power', 'Blow Power', 'Enrage', 'Break Gauge', 'Infected Aura', 'War-Ready', 'Hunter']
  },
  {
    id: 'endurance-stagger-res',
    name: 'Endurance',
    aliases: ['Stagger Resistance', 'Poise'],
    category: 'Defensive & Mitigation',
    shortDesc: 'Resistance against being staggered, interrupted mid-cast/attack, or sent flying.',
    fullExplanation:
      'Endurance functions as your poise stat. Higher values make your attacks and spell casts uninterruptible by light and medium enemy hits. While often skipped by players who rely on perfect dodges or support buffs, it is an outstanding secondary pick for armor Limit Break upgrades. Prevents DPS loss from stray monster scratches.',
    capOrScaling: 'Continuous poise threshold calculation. Highly effective on armor Limit Break.',
    associatedVocations: ['Warrior (Primary Endurance Augments)', 'Sorcerer', 'Fighter'],
    recommendedTargets: 'Solid secondary selection on Armor Limit Break; essential for non-interruptible Warrior/Sorcerer casts.',
    keyTactics: [
      'High Endurance allows Sorcerers and Warriors to complete high-tier incantations and charge slashes through incoming hits.',
      'Warrior possesses the dedicated class augments for passive Endurance scaling.'
    ],
    tags: ['Endurance', 'Poise', 'Stagger Resistance', 'Limit Break', 'Warrior', 'Interruption']
  },
  {
    id: 'chance-attack',
    name: 'Chance Attack',
    aliases: ['Chance Atk', 'Exhausted Topple', 'White Core Damage'],
    category: 'Combat Gauges & CC',
    shortDesc: 'Reduces hits needed to topple Exhausted enemies and deals stamina damage to Chance (White) Cores.',
    fullExplanation:
      'Chance Attack reduces the number of hits required to topple a large monster once its stamina is depleted and it enters the Exhausted (panting) state. It also boosts stamina damage against white "Chance Cores" and facilitates knocking down non-core Spirit and Cursed type enemies. Recommended to build up to 40 on your Vocation Emblem and add +10 via a Slayer Stone on your weapon. Values above 120 are generally overkill, but there are no diminishing returns or caps.',
    capOrScaling: 'No cap or diminishing returns. Sweet spot is 40–120 total points.',
    associatedVocations: ['Warrior (Primary Chance Augments)', 'Seeker', 'Fighter'],
    recommendedTargets: 'Target 40 on Vocation Emblem + 10 from Slayer Stone. 50–100 total is optimal.',
    keyTactics: [
      'Dramatically shortens the time between enemy stamina exhaustion and the toppled Down damage phase.',
      'Amplifies stamina depletion on White Chance Cores revealed by Priests/Element Archers.',
      'Warrior has the largest collection of Chance Attack augments, with Seeker offering a high-value endgame augment.'
    ],
    tags: ['Chance Attack', 'Exhausted', 'Topple', 'White Core', 'Chance Core', 'Warrior', 'Vocation Emblem']
  },
  {
    id: 'exhaust-attack',
    name: 'Exhaust Attack',
    aliases: ['Exhaust Atk', 'Enrage Stamina Damage', 'Shake Stamina'],
    category: 'Combat Gauges & CC',
    shortDesc: 'Controls the amount of stamina damage dealt to Enraged monsters, particularly when attacking cores.',
    fullExplanation:
      'Exhaust Attack dictates how much stamina is stripped from an Enraged monster when attacking cores (especially Elemental Cores) and increases the stamina damage dealt by the Shake climbing action. It is the second priority stat on your Vocation Emblem (after Chance Attack), or first priority if fighting monsters with exposed Elemental Cores. Around 100 Exhaust Attack is typically sufficient to shred Enrage gauges, though it has no hard cap.',
    capOrScaling: 'No hard cap. ~100 is the recommended soft benchmark for rapid Enrage drain.',
    associatedVocations: ['High Scepter (Primary Exhaust Augments)', 'Seeker', 'Warrior'],
    recommendedTargets: 'Aim for ~100 total Exhaust Attack on Vocation Emblem & gear.',
    keyTactics: [
      'Primary engine for draining Enrage stamina bars when striking exposed elemental cores.',
      'Directly boosts the stamina damage of the climbing Shake action.',
      'High Scepter possesses the premier Exhaust Attack augments in the game.'
    ],
    tags: ['Exhaust Attack', 'Enrage', 'Shake', 'Elemental Cores', 'High Scepter', 'Vocation Emblem']
  },
  {
    id: 'stun-knockout-power',
    name: 'Stun Power & Knockout Power',
    aliases: ['Stun Power', 'KO Power', 'Daze Potency'],
    category: 'Combat Gauges & CC',
    shortDesc: 'Affects how rapidly skills accumulate the Stun debilitation on susceptible monsters.',
    fullExplanation:
      'Stun Power accelerates the accumulation rate of the Stun debilitation on enemies. Individual skills possess hidden internal Stun multipliers (from minimal to extreme). While Magickal Constructs are immune, Beasts and Giants are extremely vulnerable. Stunned foes stand dazed with stars around their head. CRITICAL MECHANIC: Stun does NOT extend a monster\'s Downed state—a Downed monster will still stand up when its Down timer expires, remaining stunned after getting up if the duration has not elapsed. Warrior has the core Stun Power augments.',
    capOrScaling: 'Multiplies internal skill stun rates. Does not pause or extend Down timers.',
    associatedVocations: ['Warrior (Primary Stun Augments)', 'Shield Sage', 'Fighter'],
    recommendedTargets: 'Prioritize against Beast, Ogre, and Giant encounters; avoid investing against Constructs.',
    keyTactics: [
      'Stun does NOT freeze or prolong the Downed damage phase—bosses will stand up on schedule and remain stunned standing.',
      'Beasts, Cyclopes, and Giants have low Stun thresholds and can be chained into dazed states.',
      'Warrior weapon skills (e.g. Pommel Bash / Slashes) have the highest base Stun multipliers.'
    ],
    tags: ['Stun Power', 'Knockout Power', 'Daze', 'Down Phase', 'Constructs Immune', 'Warrior']
  },
  {
    id: 'healing-recovery-limit',
    name: 'Healing Power & Recovery Limit',
    aliases: ['Recovery Limit', 'Gray HP Retention', 'Healing Power'],
    category: 'Healing & Status',
    shortDesc: 'Determines the percentage of taken damage that remains as recoverable gray HP.',
    fullExplanation:
      'The most misunderstood stat in Dragon\'s Dogma Online. Formerly translated as "Healing Power", Recovery Limit does NOT increase potion healing, tick speed, or spell potency. Instead, it increases the proportion of recoverable gray HP you retain after taking enemy damage. It hard-caps at 100, at which point 100% of all incoming damage is retained as recoverable gray HP (similar to fall damage). It is the undisputed #1 first choice for Armor Limit Break. Holy Drain debilitation severely reduces its effectiveness. Element Archer holds the Recovery Limit augments.',
    capOrScaling: 'Hard caps at 100 (100% damage retained as gray recoverable HP). Any point above 100 has zero effect.',
    associatedVocations: ['Element Archer (Primary Recovery Limit Augments)', 'Priest', 'All Vocations'],
    recommendedTargets: 'Cap at 100 via Armor Limit Break and Element Archer augments.',
    keyTactics: [
      'Does NOT increase potion healing or spell tick values—it ONLY governs gray HP bar retention.',
      'At 100 Recovery Limit, 100% of damage taken can be fully healed back by Priest auras and hot springs without losing max HP.',
      'Top tier #1 priority stat for Armor Limit Break.',
      'Holy Drain debuff suppresses recoverable gray HP retention.'
    ],
    tags: ['Recovery Limit', 'Healing Power', 'Gray HP', 'Hard Cap 100', 'Limit Break #1', 'Element Archer']
  },
  {
    id: 'debilitation-resistances',
    name: 'Debilitation & Elemental Resistances',
    aliases: ['Status Resistances', 'Elemental Defense', 'Debuff Immunity'],
    category: 'Healing & Status',
    shortDesc: 'Percentage resistance against specific status ailments and elemental damage.',
    fullExplanation:
      'Each point of Resistance equals exactly 1% resistance against the specified debilitation. It caps at 100 points, granting total immunity to that status effect. For elemental resistances (Fire, Ice, Lightning, Holy, Darkness), resistance grants percentage damage reduction or flat defensive additions. The primary sources of resistance are crests and Armor Limit Break. Building resistances on your Vocation Emblem is generally inefficient compared to offensive stats. Priest provides elemental resistance augments, with Sorcerer and Shield Sage offering specific status wards.',
    capOrScaling: 'Hard caps at 100 (100% = complete immunity to that status effect).',
    associatedVocations: ['Priest (Primary Resistance Augments)', 'Shield Sage', 'Sorcerer'],
    recommendedTargets: 'Slot 100 resistance crests or armor limit breaks against specific raid bosses (e.g. 100 Poison, 100 Curse).',
    keyTactics: [
      '1 Resistance point = 1% debuff chance reduction; 100 points = 100% complete immunity.',
      'Main source should be armor crest sockets and Limit Break, rather than wasting Vocation Emblem points.',
      'Priest, Shield Sage, and Sorcerer provide universal and element-specific ward augments.'
    ],
    tags: ['Resistance', 'Status Immunity', '100 Cap', 'Crests', 'Priest', 'Shield Sage', 'Debilitation']
  }
];
