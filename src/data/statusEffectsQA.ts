import { JournalQuestion } from '../types';

export const STATUS_EFFECTS_QA: JournalQuestion[] = [
  {
    id: 'status-qa-accumulation-rules',
    number: 550,
    category: 'Gameplay Basics',
    question: 'How does Debilitation and Status Effect accumulation work in Dragon\'s Dogma Online?',
    answer:
      'Every attack and skill possesses a hidden debilitation accumulation multiplier. Generally, multi-hit rapid skills deal low accumulation per hit, whereas slower, heavy-hitting attacks deal high burst accumulation.\n\nOutside elemental debilitations (which require the matching element), all regular attacks can accumulate non-elemental debilitations if you have an appropriate crest or augment equipped.\n\nCrucially, enemies develop dynamic resistance after each successful activation, and after enough triggers, they become temporarily or permanently immune.',
    tags: ['Debilitation Accumulation', 'Status Mechanics', 'Hidden Multipliers', 'Enemy Resistance', 'Crest Status'],
    source: 'Status Effects Compendium • Combat Systems'
  },
  {
    id: 'status-qa-catching-fire-burning',
    number: 551,
    category: 'Gameplay Basics',
    question: 'What does Catching Fire / Burning do to players versus enemies?',
    answer:
      '• On Players/Allies: You catch fire, panic, and become immobilized while taking minor damage over time. Rapidly mashing buttons fills the escape bar to break out early. You can also be cleansed by ally touch, cleansing skills (Priest Cure Spot), or burn ointments.\n\n• On Enemies: Inflicts continuous damage over time that scales directly with the enemy\'s maximum HP. On massive endgame raid bosses, ticks deal immense damage and can theoretically exceed 9,999 per tick. Note: Fire attacks also cancel Frozen Solid on the target.',
    tags: ['Catching Fire', 'Burning', 'Fire Element', 'Max HP Scaling', '9999 Damage', 'Thaw'],
    source: 'Status Effects Compendium • Elemental Debilitations'
  },
  {
    id: 'status-qa-frozen-solid-freezing',
    number: 552,
    category: 'Gameplay Basics',
    question: 'How does Frozen Solid / Freezing work, and what is the damage multiplier?',
    answer:
      '• On Players/Allies: Freezes you solid in place. Any damage taken while frozen is amplified by +10%. Break free early with rapid button mashing, ally touch, or thaw items/skills.\n\n• On Enemies: Freezes the foe solid and increases all damage taken from all sources by +10%. It can also extend the enemy\'s Downed time depending on monster archetype.\n\nWarning: Catching Fire immediately cancels Frozen Solid because Fire is the polar opposite element.',
    tags: ['Frozen Solid', 'Freezing', 'Ice Element', 'Damage Amp +10%', 'Down Extension', 'Thaw Counter'],
    source: 'Status Effects Compendium • Elemental Debilitations'
  },
  {
    id: 'status-qa-shock-electrify',
    number: 553,
    category: 'Gameplay Basics',
    question: 'What is the effect of Shock / Electrify on spellcasters and bosses?',
    answer:
      '• On Players/Allies: Lightning surges through your character, periodically triggering involuntary spasms that interrupt all actions and skill animations. It is particularly devastating for Sorcerers, Priests, and charge-reliant vocations. Requires an item or cleanse skill to remove.\n\n• On Enemies: Causes periodic electric spasms that randomly interrupt the enemy\'s attacks and incantations, halting dangerous moves.',
    tags: ['Shock', 'Electrify', 'Lightning Element', 'Interrupt', 'Spasms', 'Casting Interruption'],
    source: 'Status Effects Compendium • Elemental Debilitations'
  },
  {
    id: 'status-qa-holy-drain',
    number: 554,
    category: 'Gameplay Basics',
    question: 'What does Holy Drain do, and how does it affect Recovery Limit?',
    answer:
      '• On Players/Allies: Cripples your Recovery Limit to zero, meaning all hits taken leave virtually no recoverable gray HP—even if you have capped (100) Recovery Limit on your gear. Must be cleansed with skills or items.\n\n• On Enemies: Turns the enemy into a team lifesteal source—10% of all direct damage dealt to the afflicted enemy is restored as recoverable (gray) HP for the Arisen and Pawns.',
    tags: ['Holy Drain', 'Holy Element', 'Recovery Limit Cripple', 'Gray HP Lifesteal', '10% Leech'],
    source: 'Status Effects Compendium • Elemental Debilitations'
  },
  {
    id: 'status-qa-blind-darkness',
    number: 555,
    category: 'Gameplay Basics',
    question: 'How does Blind / Darkness affect enemy AI and navigation?',
    answer:
      '• On Players/Allies: A dark swirling miasma occludes your screen, heavily obstructing vision.\n\n• On Enemies: The target loses all aggro towards all players and pawns. Shrouded by a dark cloud over its head, it wanders aimlessly, loses access to certain skills, attacks wildly in random directions, and in some terrain may even walk off high ledges into chasms for easy gravity kills.',
    tags: ['Blind', 'Darkness', 'Dark Element', 'Aggro Loss', 'Wandering', 'Ledge Fall'],
    source: 'Status Effects Compendium • Elemental Debilitations'
  },
  {
    id: 'status-qa-golden-petrification',
    number: 556,
    category: 'Gameplay Basics',
    question: 'What is the difference between Golden / Gilded and Petrification?',
    answer:
      '• On Players/Allies: Both immobilize you as you stiffen into stone or gold. If the timer completes, you suffer INSTANT DEATH. Petrify is cured by Cure Spot P, Petrification Cure, or Panacea. Golden / Gilded requires Aqua Regia Sorbet or Cure Spot P.\n\n• On Enemies: Foes do NOT die instantly. Instead, both immobilize the target, remove active status effects, grant a +25% Impact damage vulnerability, and extend Downed time. The main difference is enemy susceptibility: more monsters across the game are susceptible to Golden than to Petrification.',
    tags: ['Golden', 'Gilded', 'Petrification', 'Instant Death', 'Impact +25%', 'Aqua Regia Sorbet', 'Cure Spot P'],
    source: 'Status Effects Compendium • Instant Death Effects'
  },
  {
    id: 'status-qa-infected-corruption',
    number: 557,
    category: 'Gameplay Basics',
    question: 'How does the Infected (Corruption) status work in Season 2?',
    answer:
      '• On Players/Allies: Inflicted by close proximity or hits from Season 2 Infected monsters. It advances across 4 stages: Slight → Severe → Critical → Dead. Your action speed slows drastically with each stage until instant death at stage 4. Cured via Priest Cure Spot P, Corruption Cure, or an ally touching you (requires both players to stand still for several seconds).\n\n• On Enemies: Players cannot inflict Infection on enemies. However, infected enemies sprout spikes and tentacles to boost their combat potency and defenses. Breaking spikes and sealing tentacles weakens the boss.',
    tags: ['Infected', 'Corruption', '4 Stages', 'Corruption Cure', 'Spikes', 'Season 2'],
    source: 'Status Effects Compendium • Instant Death Effects'
  },
  {
    id: 'status-qa-stat-reduction-debilitations',
    number: 558,
    category: 'Gameplay Basics',
    question: 'What are the damage multipliers for Defense Down, Attack Down, and Element Resist Down?',
    answer:
      '• Physical/Magick Defense Down: On players: +50% damage taken. On enemies: +20% more damage taken from the matching damage type.\n\n• Physical/Magick Attack Down: On players: -50% damage dealt. On enemies: -20% attack power.\n\n• Element Resist Down: On players: +50% elemental damage taken. On enemies: +10% damage taken from the matching element.\n\nCleansing Note: Concoction of Light is recommended as it covers all Resist Down debuffs. Panacea does NOT cleanse Element Resist Down.',
    tags: ['Defense Down', 'Attack Down', 'Element Resist Down', 'Concoction of Light', 'Panacea Warning'],
    source: 'Status Effects Compendium • Stat Reduction Debilitations'
  },
  {
    id: 'status-qa-soften-frail',
    number: 559,
    category: 'Gameplay Basics',
    question: 'Why is Soften / Frail considered an indirect Knockdown Power buff?',
    answer:
      '• On Players/Allies: Soften cripples both your Endurance and Knockdown Power, causing every minor hit to stagger or toss you while preventing you from staggering foes.\n\n• On Enemies: Soften severely reduces the enemy\'s Endurance. Because lower enemy Endurance makes every point of player Knockdown Power significantly more effective, it acts as an indirect Knockdown buff for the entire party. Furthermore, while softened, large Beasts and Giants can be knocked down even when not in an Enraged state.',
    tags: ['Soften', 'Frail', 'Endurance', 'Knockdown Power Buff', 'Non-Enraged Knockdown'],
    source: 'Status Effects Compendium • Stat Reduction Debilitations'
  },
  {
    id: 'status-qa-skills-items-sealed',
    number: 560,
    category: 'Gameplay Basics',
    question: 'How do you cure Skills Sealed and Items Sealed?',
    answer:
      '• Skills Stifled / Skills Sealed: Disables all Custom Weapon Skills and Spells. Because you cannot cast your own cleansing spells, you must use items like Throat Drops / Panacea, or rely on a teammate\'s cleanse.\n\n• Items Sealed: Completely disables your inventory, preventing the use of potions, elixirs, and special arrows. Because items are disabled, it CAN ONLY be cured by a support vocation casting a cleanse skill (like Priest Cure Spot). Pawns afflicted with Items Sealed also will not benefit from group consumables.',
    tags: ['Skills Sealed', 'Items Sealed', 'Silence', 'Inventory Lock', 'Throat Drops', 'Cure Spot'],
    source: 'Status Effects Compendium • Sealing Debuffs'
  },
  {
    id: 'status-qa-cursed-and-weakness',
    number: 561,
    category: 'Gameplay Basics',
    question: 'How do you cure Cursed and Weakness (Weakened)? Can items remove them?',
    answer:
      'Neither Cursed nor Weakness can be cured with standard items or combat skills:\n\n• Cursed: Halves (50%) maximum HP. Inflicted exclusively by Shadow species enemies. Health threshold augments recalculate to the 50% bar. Can ONLY be cleansed by resting at an Inn / Safe Area, dying, relogging, or very rare purification fountains.\n\n• Weakness: Inflicted after standard non-gemstone revivals. Cuts Max HP by 25% and increases incoming damage by +15% (which can cause hits to exceed 9,999). Cleansed by paying an Innkeeper or relogging.',
    tags: ['Cursed', 'Weakness', 'Max HP Halved', 'Innkeeper', 'Safe Area', 'Relog'],
    source: 'Status Effects Compendium • Max Health Reduction'
  },
  {
    id: 'status-qa-poison-dot-scaling',
    number: 562,
    category: 'Gameplay Basics',
    question: 'Does Poison damage scale with enemy maximum HP in endgame?',
    answer:
      'Yes! While Poison deals negligible tick damage to players and is easily cured with Antidotes or Panacea, on enemies it scales with their maximum health.\n\nAgainst massive endgame raid bosses with millions of HP, Poison ticks deal enormous passive damage and can exceed 9,999 damage per tick, making it a premier sustained DPS option.',
    tags: ['Poison', 'DoT', 'Max HP Scaling', '9999 Damage', 'Raid Bosses'],
    source: 'Status Effects Compendium • Damage Over Time'
  },
  {
    id: 'status-qa-torpor-stun-sleep',
    number: 563,
    category: 'Gameplay Basics',
    question: 'What are the rules for Torpor (Slow), Stun, and Sleep on Downed bosses?',
    answer:
      '• Torpor (Slow): Halves animation speed (50%). It does not directly add timer seconds to Downed state, but slows the falling down animation, extending the effective burst window.\n\n• Knockout / Stun: Wobbles the enemy. Stun does NOT pause or extend Downed timers. If the boss gets up while stunned, it will remain stunned in an upright standing position.\n\n• Sleep: Sleeping enemies take +10% damage, but direct hits, Shock, Burning, Stun, or Enrage breaks immediately wake them. Sleep accumulates during Down/Exhausted states and triggers once the state finishes.',
    tags: ['Torpor', 'Stun', 'Sleep', 'Downed Timer Rules', 'Exhausted State', 'Wakeup Damage'],
    source: 'Status Effects Compendium • Mobility Reduction'
  },
  {
    id: 'status-qa-drenched-and-tarred',
    number: 564,
    category: 'Gameplay Basics',
    question: 'How do Drenched and Tarred interact with lanterns and elemental combos?',
    answer:
      '• Drenched (Water): Puts your lantern out. The next Ice hit instantly freezes you solid; the next Lightning hit instantly shocks you. On foes, it accelerates Freeze and Shock accumulation.\n\n• Tarred (Oil): Puts your lantern out. Having a lit lantern or relighting your lantern while Tarred will INSTANTLY set you on fire. The next Fire attack causes instant Burning. On foes, it boosts Fire accumulation and damage.\n\nRule: Never turn on your lantern while suffering from the Tarred status!',
    tags: ['Drenched', 'Tarred', 'Lantern Out', 'Instant Freeze', 'Instant Burn', 'Fire Synergy'],
    source: 'Status Effects Compendium • Coating Status'
  },
  {
    id: 'status-qa-buffs-and-enhance',
    number: 565,
    category: 'Gameplay Basics',
    question: 'How do Attack/Defense buffs and the Golden Gemstone Enhance buff work?',
    answer:
      '• Attack & Defense Up: Grant +25% outgoing damage or -25% incoming damage. They stack with support vocation skills, but do not stack with identical consumable talismans/food.\n\n• Max HP/ST Up: Bestowed by hot springs and room baths (Paradise Hot Tub + Supreme Inquiry = up to 35 min).\n\n• Enhance (Golden Gemstone): Reviving with a Golden Gemstone grants 60 seconds of complete immunity to all damage, debuffs, and death. It cannot be stripped by any enemy mechanic.',
    tags: ['Attack Up', 'Defense Up', '+25% Damage', 'Hot Springs', 'Paradise Hot Tub', 'Enhance', 'Golden Gemstone'],
    source: 'Status Effects Compendium • Buffs & Enhancements'
  }
];
