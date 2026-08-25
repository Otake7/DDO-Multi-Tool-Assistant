import { JournalQuestion } from '../types';

export const COMBAT_FLOW_QA: JournalQuestion[] = [
  {
    id: 'combat-qa-core-loop',
    number: 566,
    category: 'Gameplay Basics',
    question: 'What is the core combat flow and Enrage cycle for large monsters in DDON?',
    answer:
      'The core combat loop for large monsters follows 5 sequential phases:\n\n1. Normal State: Standard moveset and normal damage intake.\n2. Enraged State: Boss enters rage mode, gains new moves, and takes ~70% less damage. A stamina bar and Break Gauge appear.\n3. Tired State: Filling the Break Gauge with Knockdown Power staggers the boss and turns the stamina bar BLUE. Climbing and Shaking rapidly drains stamina.\n4. Exhausted State: Stamina hits 0. The boss wobbles in place; attacks with high Chance Attack topple the boss.\n5. Downed State: Boss topples flat, taking +50% bonus damage for 10–20 seconds.',
    tags: ['Flow of Combat', 'Enrage Cycle', 'Break Gauge', 'Tired', 'Shake', 'Exhausted', 'Downed', 'Core Combat'],
    source: 'Flow of Combat Guide • Core Combat Systems'
  },
  {
    id: 'combat-qa-enrage-mechanics',
    number: 567,
    category: 'Gameplay Basics',
    question: 'How does the Enraged state work, and why do attacks deal 70% less damage?',
    answer:
      'When a large monster takes enough damage, it enters the Enraged phase. While Enraged:\n\n• Damage Reduction: The boss takes ~70% less damage from all standard attacks.\n• Break Gauge & Stamina: A stamina bar appears under its health bar, flanked by a shield icon (Break Gauge). High Knockdown Power fills this gauge.\n• Secret Cores: Green vocations (Priest, Shield Sage, Elemental Archer, Spirit Lancer) must reveal the Secret Core. Attacking the core—especially with matching elemental affinity—deals heavy stamina damage.\n• Chance Cores (White Cores): Certain monsters have white Chance Cores; these do NOT get a Break Gauge, but otherwise follow identical stamina damage rules.\n• Elder Dragons Exception: Elder Dragons are perpetually Enraged from the start of the battle.',
    tags: ['Enraged State', '70% Damage Reduction', 'Break Gauge', 'Secret Core', 'Chance Core', 'Elder Dragons'],
    source: 'Flow of Combat Guide • Core Combat Systems'
  },
  {
    id: 'combat-qa-struggle-resist',
    number: 568,
    category: 'Gameplay Basics',
    question: 'How do you Resist an Enraged enemy\'s Struggle when clinging on it?',
    answer:
      'While you are clinging to an Enraged monster, it will periodically attempt to "Struggle" (indicated by a yellow icon) to shake you off and drain your stamina.\n\n• How to Resist: You can Resist the struggle with a timely button input.\n• Pro Tip: Pay attention to the enemy\'s physical shaking animation rather than just reacting to the yellow UI icon. Timing your brace to the creature\'s wind-up guarantees a successful resist and preserves your climbing stamina.',
    tags: ['Struggle', 'Resist', 'Climbing', 'Yellow Icon', 'Animation Timing', 'Stamina Preservation'],
    source: 'Flow of Combat Guide • Core Combat Systems'
  },
  {
    id: 'combat-qa-tired-shake-exhaust',
    number: 569,
    category: 'Gameplay Basics',
    question: 'What is the Tired state, and why is Exhaust Attack so important for Shaking?',
    answer:
      'Filling the Break Gauge completely with Knockdown Power staggers the monster and triggers the Tired state, turning its stamina bar bright BLUE.\n\n• Shake Action: While Tired, enemies take drastically increased stamina damage. Players should climb onto the monster and execute the "Shake" action.\n• Team Shaking: A coordinated party Shaking together can drain the entire blue stamina bar in mere seconds.\n• Exhaust Attack Stat: Increases both the potency of your Shake action and stamina damage dealt when striking an exposed core.\n• Recovery Warning: If you fail to exhaust the enemy before the Tired timer expires, it recovers and restores its Break Gauge, forcing you to fill it again.',
    tags: ['Tired State', 'Blue Stamina Bar', 'Shake Action', 'Exhaust Attack', 'Break Gauge Recovery'],
    source: 'Flow of Combat Guide • Core Combat Systems'
  },
  {
    id: 'combat-qa-exhausted-chance-attack',
    number: 570,
    category: 'Gameplay Basics',
    question: 'How do you topple an Exhausted enemy, and what happens if you fail?',
    answer:
      'When an enemy\'s stamina is fully depleted, it enters the Exhausted state:\n\n• Wobble Phase: The Break Gauge and stamina bar vanish, and the monster begins wobbling unsteadily in place.\n• Chance Attack: Your Chance Attack stat dictates how quickly and reliably attacks force the wobbling monster to lose its footing and fall flat.\n• Failure Condition: If your party has low Chance Attack or fails to land sufficient blows in time, the monster will recover on its feet without ever entering Downed state, returning to Normal or Enraged mode depending on its remaining HP threshold.',
    tags: ['Exhausted State', 'Wobble', 'Chance Attack', 'Topple', 'Failure Condition', 'Downed Trigger'],
    source: 'Flow of Combat Guide • Core Combat Systems'
  },
  {
    id: 'combat-qa-downed-state-damage',
    number: 571,
    category: 'Gameplay Basics',
    question: 'What is the Downed state, and what damage multiplier does the boss take?',
    answer:
      'The Downed state is the primary burst DPS window of any boss fight:\n\n• +50% Damage Taken: The monster lies prone and vulnerable, taking ~50% bonus damage from all attacks and spells.\n• Duration: Most Downed states last between 10 and 20 seconds (though certain species stay down longer, and debilitations like Frozen Solid or Torpor during fall can extend the window).\n• Recovery: Once the timer ends, the boss gets up. It will return to Normal mode if its HP is above the Enrage threshold, or immediately re-Enrage if its HP is below.',
    tags: ['Downed State', '+50% Damage', '10-20 Seconds', 'Burst Window', 'Recovery Threshold'],
    source: 'Flow of Combat Guide • Core Combat Systems'
  },
  {
    id: 'combat-qa-season-1-alchemized',
    number: 572,
    category: 'Gameplay Basics',
    question: 'How do Alchemized Gold Plating and Golden Stakes work in Season 1?',
    answer:
      'Large Alchemized enemies have heavy golden stakes embedded across their bodies holding solid chunks of golden armor in place:\n\n• Golden Stakes: You must deal direct damage to the stakes holding the armor. Green vocation core skills CANNOT reveal or weaken the gold coating directly.\n• Exposing True Weak Spots: Once all stakes securing a section are destroyed, the underlying true weak spot is exposed. For example, Alchemized Griffins and Goliaths take drastically increased damage to the head once gold is chipped off.\n• Permanent Weak Points: Bosses like Diamantes (2nd form) and Golgorran have their critical weaknesses permanently exposed once an armor section breaks.\n• Temporary Cores: Gold coatings can have temporary Secret Cores that vanish when the gold breaks, requiring re-revealing on the exposed flesh.',
    tags: ['Alchemized', 'Season 1', 'Gold Plating', 'Golden Stakes', 'Diamantes', 'Golgorran', 'Goliath'],
    source: 'Flow of Combat Guide • Season 1: Alchemized'
  },
  {
    id: 'combat-qa-season-2-spore-aura',
    number: 573,
    category: 'Gameplay Basics',
    question: 'How do you remove the Spore Aura on Infected enemies in Season 2?',
    answer:
      'Most Season 2 Infected enemies project a Spore Aura that passively inflicts Infection stages on nearby players while granting the monster continuous damage reduction.\n\n• Stripping the Aura: Dealing sufficient damage and high Knockdown Power staggers the monster, temporarily extinguishing the Spore Aura and removing its damage resistance.\n• Knockdown Multipliers: Skills with high innate Knockdown Power strip the aura much faster.\n• Aura Regeneration: If the monster is allowed to recover from the stagger, it will reignite its Spore Aura.',
    tags: ['Infected', 'Season 2', 'Spore Aura', 'Knockdown Power', 'Damage Resistance', 'Infection Accumulation'],
    source: 'Flow of Combat Guide • Season 2: Infected'
  },
  {
    id: 'combat-qa-season-2-lashing-tentacles',
    number: 574,
    category: 'Gameplay Basics',
    question: 'How do you seal Infected Lashing Tentacles, and why do they grant damage reduction?',
    answer:
      'Before large Infected enemies sprout spikes, they feature flailing tentacles that lash out and knock away melee climbers:\n\n• Damage Reduction Buff: The monster gains a stacking damage reduction buff for every unsealed tentacle node.\n• Sealing Tentacles: Green Vocation healing recovery effects/auras and Core Skills (normally used to reveal Secret Cores) will temporarily seal the tentacles. A distinct fleshy sound plays upon sealing and re-sprouting.\n• No Secret Cores: Infected enemies have no Secret Cores, but bringing a Green Vocation is still mandatory to seal tentacles.\n• Sprout Sealing Augment: Spirit Lancer\'s "Sprout Sealing" augment extends the duration that tentacles remain sealed.',
    tags: ['Lashing Tentacles', 'Infected', 'Tentacle Sealing', 'Sprout Sealing', 'Spirit Lancer', 'Green Vocation'],
    source: 'Flow of Combat Guide • Season 2: Infected'
  },
  {
    id: 'combat-qa-season-2-infection-spikes',
    number: 575,
    category: 'Gameplay Basics',
    question: 'How do Infection Spikes work, and what happens when all spikes are broken?',
    answer:
      'Infected monsters sprout spikes gradually over time or when crossing damage thresholds (Critical Infected monsters start with spikes active):\n\n• Boss Empowerment: Spikes grant the boss new moves or expand attack ranges with shockwaves. While spikes are active, tentacles are naturally suppressed.\n• Spore Aura Return: The Spore Aura stays active while spikes remain intact. If your party DPS is slow, the monster will sprout additional spikes up to its species cap.\n• Cracking Spikes: Damaging a spike causes the boss to stagger and lose its aura temporarily.\n• Downed Trigger: Once ALL Infection Spikes are broken, the monster loses its footing and enters an immediate Downed state (tentacles and aura disabled). Note that some Infected bosses stay down for as little as 10 seconds, requiring instant burst.',
    tags: ['Infection Spikes', 'Infected Boss', 'Shockwaves', 'Spike Shatter', '10s Downed Window'],
    source: 'Flow of Combat Guide • Season 2: Infected'
  },
  {
    id: 'combat-qa-season-3-war-ready-armor',
    number: 576,
    category: 'Gameplay Basics',
    question: 'What is Blow Damage (Purple Numbers) against War-Ready armor in Season 3?',
    answer:
      'Season 3 War-Ready enemies are clad in self-repairing armor that grants massive damage reduction to unarmored parts:\n\n• Purple Numbers (Blow Damage): Damage dealt to intact War-Ready armor displays in PURPLE numbers.\n• Knockdown Scaling: Blow Damage scales directly with Knockdown Power—higher Knockdown Power means significantly more armor damage.\n• Blow Damage Cap: Normal Blow Damage per hit is capped at ~3,500, though specific high-tier skills can instantly break off pieces (displaying 9,999 in purple).\n• Stationary Cannons: Encounter cannons deal up to 2 x 3,500 Blow Damage (or 2 x 300 normal damage) and build Fire accumulation to ignite the boss.',
    tags: ['War-Ready', 'Season 3', 'Blow Damage', 'Purple Numbers', 'Knockdown Power', '3500 Cap', 'Cannons'],
    source: 'Flow of Combat Guide • Season 3: War-Ready'
  },
  {
    id: 'combat-qa-season-3-exposed-armor',
    number: 577,
    category: 'Gameplay Basics',
    question: 'How do you expose War-Ready armor with Green Vocations (Whistling & Green Hue)?',
    answer:
      'War-Ready armor can be temporarily exposed using precise Green Vocation positioning:\n\n• Timing the Exposure: If a Green Vocation\'s healing aura or core-exposing skill touches an attacking extremity right as the enemy executes a move, that armor piece becomes exposed.\n• Visual & Audio Cues: The exposed armor piece emits a distinct whistling noise and glows with a bright GREEN hue.\n• Extremity Specific: Only the specific limb used in the attack becomes exposed (e.g. right arm during a right-hand slam).\n• Damage Amp: Exposed armor takes increased damage from all attacks. It will self-repair and lose its exposed status if not damaged quickly.',
    tags: ['Exposed Armor', 'Green Hue', 'Whistling Sound', 'Green Vocation', 'War-Ready Timing', 'Extremity Exposure'],
    source: 'Flow of Combat Guide • Season 3: War-Ready'
  },
  {
    id: 'combat-qa-season-3-crumbling-and-riled',
    number: 578,
    category: 'Gameplay Basics',
    question: 'What are Crumbling Armor and Riled Up states on War-Ready enemies?',
    answer:
      '• Crumbling Armor: When an armor section suffers sufficient Blow Damage, it cracks with a distinct crunching sound cue. In this crumbling state, the armor completely loses its self-repair ability and begins taking normal damage from all attacks.\n\n• Riled Up State: Dealing substantial damage or peeling armor triggers a brief Riled Up stance with a damage reduction buff. Intact armor is immune to Blow Damage during the animation, BUT crumbling pieces can still be damaged.\n• Interruption: Shattering a crumbling piece during Riled Up instantly interrupts the monster (e.g. cancels War-Ready Nightmare\'s homing tornado). Mobility debilitations (Torpor, Freeze, Stun) also interrupt the stance.\n• Final Down: Shattering an armor piece deals massive flat damage. Shattering ALL armor pieces causes the monster to topple flat in a Downed state.',
    tags: ['Crumbling Armor', 'Riled Up', 'Interrupt', 'Crunch Sound', 'Nightmare Tornado', 'Final Down'],
    source: 'Flow of Combat Guide • Season 3: War-Ready'
  },
  {
    id: 'combat-qa-season-3-blaze-suppression',
    number: 579,
    category: 'Gameplay Basics',
    question: 'How does the Blaze Flame Suppression and Weakness Reveal mechanic work in Season 3?',
    answer:
      'Season 3 Blaze enemies (such as Blaze Goblins, Blaze Harpies, Blaze Grigoris, Blaze Chimeras, and Ifrit) feature an unwritten flame suppression mechanic:\n\n• Small Blaze Enemies: Are instantly revealed and weakened simply by entering a Green Vocation\'s healing aura/zone.\n• Large Blaze Bosses: Require the monster to attack with a specific extremity into a healing aura to reveal that limb (e.g. Ifrit must execute an arm slam into the healing field).\n• Visual & Audio Cues: A revealed Blaze enemy emits a unique ringing chime and shifts from a fiery orange glow to a dull, cooled color.\n• Vulnerability: While suppressed and revealed, the enemy takes significantly amplified damage from all party attacks.',
    tags: ['Blaze', 'Season 3', 'Flame Suppression', 'Ifrit', 'Blaze Grigori', 'Healing Aura', 'Ringing Sound', 'Dull Color'],
    source: 'Flow of Combat Guide • Season 3: Blaze'
  }
];
