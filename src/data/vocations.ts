import { VocationData } from '../types';
import { enrichVocationWithJobSkillData } from './jobSkillsData';

const RAW_VOCATIONS: VocationData[] = [
  // ==========================================
  // 1. SPIRIT LANCER (スピリットランサー) - FULL REVISED DATA
  // ==========================================
  {
    id: 'spirit_lancer',
    name: 'Spirit Lancer',
    jpName: 'スピリットランサー',
    role: 'Healer / Support',
    weapon: 'Spirit Lance (精霊槍)',
    masterNpc: 'Adair Donnchadh',
    masterLocation: 'Dana',
    unlockRequirement: 'Complete all Season 2.1 Main Quests • Reach Bloodbane Isle Area Rank 8 • Have any vocation at Level 69 or higher',
    minVersion: '3.1',
    playstyle: 'Hybrid combat healer wielding a Spirit Spear. Gathers spirit energy to heal allies with Cure/Wall Grasta, debuff enemies, and unleash devastating thrusting aerial combos.',
    customSkills: [
      {
        id: 'spl_aram_fang',
        name: 'Aram Fang',
        jpName: 'アラム・ファング',
        type: 'custom',
        unlockLevel: 25,
        maxRank: 10,
        element: 'Pierce',
        staminaCost: 'Low',
        description: 'Launch enemies upward with a slash.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Night', count: 10, minEnemyLevel: 10, location: 'Volden Mine / Misriu Crypts' },
          { targetRank: 7, targetEnemy: 'Skeleton Mage', count: 10, minEnemyLevel: 10, location: 'Volden Mine / Misriu Crypts' },
          { targetRank: 8, targetEnemy: 'Wolf', count: 15, minEnemyLevel: 10, location: 'Hyndell Plain / Misriu Forest' },
          { targetRank: 8, targetEnemy: 'Harpy', count: 15, minEnemyLevel: 10, location: 'Brea Coast / Misriu Bluffs' },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 3, minEnemyLevel: 20, location: 'Misriu Forest South' },
          { targetRank: 10, targetEnemy: 'Hobgoblin', count: 15, minEnemyLevel: 10, location: 'Hyndell Plain / Tel Outskirts' },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 15, location: 'Brea Coast / Misriu South' }
        ]
      },
      {
        id: 'spl_alam_slay',
        name: 'Alam Slay',
        jpName: 'アラム・スレイ',
        type: 'custom',
        unlockLevel: 30,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Swing the lance around and attack the surrounding area. Can be activated in air.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Large Lizard', count: 8, minEnemyLevel: 10, location: 'Brea Coast / Misriu' },
          { targetRank: 7, targetEnemy: 'Lizardman', count: 15, minEnemyLevel: 10, location: 'Brea Coast / Misriu' },
          { targetRank: 8, targetEnemy: 'Direwolf', count: 15, minEnemyLevel: 20, location: 'Misriu Forest South' },
          { targetRank: 8, targetEnemy: 'Sludge Man', count: 15, minEnemyLevel: 20, location: 'Volden Mine / Swamp Areas' },
          { targetRank: 9, targetEnemy: 'Troll', count: 5, minEnemyLevel: 30, location: 'Dow Valley / Kinath' },
          { targetRank: 9, targetEnemy: 'Forest Goblin', count: 30, minEnemyLevel: 30, location: 'Deenan Deep Green' },
          { targetRank: 10, targetEnemy: 'Golem', count: 4, minEnemyLevel: 30, location: 'Dow Valley / Brea Coast' },
          { targetRank: 10, targetEnemy: 'Griffin', count: 2, minEnemyLevel: 30, location: 'Kinath Plateau' }
        ]
      },
      {
        id: 'spl_col_spike',
        name: 'Col Spike',
        jpName: 'コル・スパイク',
        type: 'custom',
        unlockLevel: 35,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Gather energy and thrust forward, releasing a blast of energy. The first strike always chases an enemy.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Large Sulfur', count: 10, minEnemyLevel: 20, location: 'Volden Mine / Caverns' },
          { targetRank: 7, targetEnemy: 'Skeleton Sorcerer', count: 15, minEnemyLevel: 20, location: 'Volden Mine / Crypts' },
          { targetRank: 8, targetEnemy: 'White', count: 5, minEnemyLevel: 30, location: 'Deenan Highlands' },
          { targetRank: 8, targetEnemy: 'Grimwarg', count: 30, minEnemyLevel: 28, location: 'Dow Valley / Misriu' },
          { targetRank: 9, targetEnemy: 'Colossus', count: 5, minEnemyLevel: 30, location: 'Dow Valley / Zandora' },
          { targetRank: 9, targetEnemy: 'Fat Undead', count: 30, minEnemyLevel: 28, location: 'Volden Mine / Crypts' },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 4, minEnemyLevel: 40, location: 'Dow Valley / Mergoda' },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 2, minEnemyLevel: 40, location: 'Kinath Plateau / Leste' }
        ]
      },
      {
        id: 'spl_wall_grasta',
        name: 'Wall Grasta',
        jpName: 'ウォール・グラスタ',
        type: 'custom',
        unlockLevel: 35,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Creates an energy pool that heals and grants Defense boost to allies who enter. Lasts a limited time.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 4, minEnemyLevel: 30, location: 'Dow Valley Orc Camp' },
          { targetRank: 7, targetEnemy: 'Oakbanger', count: 15, minEnemyLevel: 30, location: 'Dow Valley Orc Camp' },
          { targetRank: 8, targetEnemy: 'Silver Roar', count: 3, minEnemyLevel: 40, location: 'Kinath Plateau' },
          { targetRank: 8, targetEnemy: 'Blue Newt', count: 15, minEnemyLevel: 30, location: 'Deenan Deep Green' },
          { targetRank: 9, targetEnemy: 'Cockatrice', count: 2, minEnemyLevel: 40, location: 'Kinath Plateau' },
          { targetRank: 9, targetEnemy: 'Maltroll', count: 3, minEnemyLevel: 40, location: 'Zandora / Mergoda' },
          { targetRank: 10, targetEnemy: 'Angles', count: 4, minEnemyLevel: 40, location: 'Mergoda / Zandora' },
          { targetRank: 10, targetEnemy: 'White Chimera', count: 2, minEnemyLevel: 40, location: 'Mergoda / Finis' }
        ]
      },
      {
        id: 'spl_kol_strum',
        name: 'Kol Strum',
        jpName: 'コル・ストラム',
        type: 'custom',
        unlockLevel: 40,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Spin the lance all-around, continuously slashing forward. The last blow’s power changes according to the number of attacks made.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Damned Goblin', count: 15, minEnemyLevel: 40, location: 'Zandora / Mergoda' },
          { targetRank: 7, targetEnemy: 'Damned Wolf', count: 15, minEnemyLevel: 40, location: 'Zandora / Mergoda' },
          { targetRank: 8, targetEnemy: 'Geo Golem', count: 5, minEnemyLevel: 46, location: 'Mergoda Ruins' },
          { targetRank: 8, targetEnemy: 'Witch', count: 5, minEnemyLevel: 46, location: 'Deenan Deep Green / Witch Hut' },
          { targetRank: 9, targetEnemy: 'Black Griffin', count: 2, minEnemyLevel: 40, location: 'Zandora Highlands' },
          { targetRank: 9, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 40, location: 'Volden Mine / Crypts' },
          { targetRank: 10, targetEnemy: 'Goliath', count: 4, minEnemyLevel: 50, location: 'Mergoda / Zandora' },
          { targetRank: 10, targetEnemy: 'Griffin Alchemy', count: 2, minEnemyLevel: 50, location: 'Mergoda Laboratory' }
        ]
      },
      {
        id: 'spl_shukris_blast',
        name: 'Shukris Blast',
        jpName: 'シュクリス・ブラスト',
        type: 'custom',
        unlockLevel: 45,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Creates an orb that emits shockwaves when struck. Absorbs spirit energy from attacks. Manual detonation available both on ground and in air.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Ghost Mail', count: 5, minEnemyLevel: 50, location: 'Mergoda / Zandora Crypts' },
          { targetRank: 7, targetEnemy: 'Empress Ghost', count: 5, minEnemyLevel: 50, location: 'Mergoda / Zandora' },
          { targetRank: 8, targetEnemy: 'Gigan Machina', count: 5, minEnemyLevel: 56, location: 'Mergoda Laboratory' },
          { targetRank: 8, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 56, location: 'Mergoda / Zandora' },
          { targetRank: 9, targetEnemy: 'Nightmare', count: 5, minEnemyLevel: 56, location: 'Mergoda Underpass' },
          { targetRank: 9, targetEnemy: 'Death Knight', count: 5, minEnemyLevel: 56, location: 'Mergoda Royal Tombs' },
          { targetRank: 10, targetEnemy: 'Drake', count: 5, minEnemyLevel: 60, location: 'Megado Volcano / Crater' },
          { targetRank: 10, targetEnemy: 'Wilm', count: 5, minEnemyLevel: 60, location: 'Megado / Finis' }
        ]
      },
      {
        id: 'spl_cure_grasta',
        name: 'Cure Grasta',
        jpName: 'キュア・グラスタ',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Form spiritual spheres around yourself that recovers health and status abnormalities. The range grows depending on the charge time. The effectiveness rises upon a full charge.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60, location: 'Leste / Acker Glaciers' },
          { targetRank: 7, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60, location: 'Leste / Acker Forest' },
          { targetRank: 8, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60, location: 'Acker Island Outskirts' },
          { targetRank: 9, targetEnemy: 'Scourge', count: 5, minEnemyLevel: 65, location: 'Megado Underbelly' },
          { targetRank: 10, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60, location: 'Megado / Finis Outer Ring' }
        ]
      },
      {
        id: 'spl_shurix_garder',
        name: 'Shurix Garder',
        jpName: 'シュリクス・ガーダー',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Forms a protective barrier that blocks attacks. Striking enemies stores spirit energy, releasable with button input.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70, location: 'Megado Royal Ruins' },
          { targetRank: 7, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70, location: 'Megado / Finis' },
          { targetRank: 8, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70, location: 'Megado Sky High' },
          { targetRank: 9, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75, location: 'Finis Deep Cavern' },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75, location: 'Finis Core Sanctuary' }
        ]
      },
      {
        id: 'spl_col_meteor',
        name: 'Col Meteor',
        jpName: 'コル・メテオ',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'A high power skill that covers a wide area. If the first hit is successfully landed, it will become a full on combo attack.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Mad Invasion Demon', count: 10, minEnemyLevel: 80, location: 'Finis Obsidian Valley' },
          { targetRank: 8, targetEnemy: 'Raging Griffin', count: 3, minEnemyLevel: 80, location: 'Finis Sky Realm' },
          { targetRank: 9, targetEnemy: 'Finderent', count: 3, minEnemyLevel: 80, location: 'Finis Core Sanctuary' },
          { targetRank: 10, targetEnemy: 'Black Knight', count: 5, minEnemyLevel: 80, location: 'Finis Citadel' },
          { targetRank: 10, targetEnemy: 'Spirit Dragon Wilmia', count: 5, minEnemyLevel: 80, location: 'Spirit Sanctuary' }
        ]
      },
      {
        id: 'spl_edram_counter',
        name: 'Edram Counter',
        jpName: 'エドラム・カウンター',
        type: 'custom',
        unlockLevel: 78,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Expands an area that boosts damage and knock back for nearby allies’ enchantments/crests. If used as a counter: Effect↑ + Size↑.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Armored Gore Cyclops', count: 3, minEnemyLevel: 80, location: 'Finis Obsidian Gate' },
          { targetRank: 7, targetEnemy: 'Armored Gore Manticore', count: 3, minEnemyLevel: 80, location: 'Finis Core Depths' },
          { targetRank: 8, targetEnemy: 'Catoblepas', count: 2, minEnemyLevel: 80, location: 'Finis Abyss' },
          { targetRank: 9, targetEnemy: 'Evil Eye', count: 3, minEnemyLevel: 80, location: 'Finis Netherworld' },
          { targetRank: 10, targetEnemy: 'Ifrit', count: 3, minEnemyLevel: 90, location: 'Flame Crucible / Finis Peak' }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'spl_norm_combo',
        name: 'Spirit Lance Combo (槍連撃)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Basic rapid thrust combination. Increases attack speed and spirit gauge generation.'
      },
      {
        id: 'spl_norm_act',
        name: 'Spirit Act (スピリットアクト)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Attaches a spirit thread to ally or enemy, enabling rapid spirit energy channeling and buff/debuff transfer.'
      },
      {
        id: 'spl_norm_step',
        name: 'Spirit Step (スピリットステップ)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Evasive high-speed spirit dash with extended invincibility frames.'
      },
      {
        id: 'spl_norm_aid',
        name: 'Aid Assist (エイドアシスト)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Instantly accelerates the revival and recovery speed of fallen allies using spirit energy.'
      }
    ],
    augments: [
      {
        id: 'spl_aug_enrei',
        name: 'Enrei',
        jpName: '延霊',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 6,
        description: 'Extends Spirit gauge duration and spirit buff lingering time.',
        effect: '+20% Spirit Buff Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Lizardman', count: 7, minEnemyLevel: 10, location: 'Brea Coast / Misriu' },
          { targetRank: 6, targetEnemy: 'Skeleton', count: 10, minEnemyLevel: 10, location: 'Volden Mine / Crypts' }
        ]
      },
      {
        id: 'spl_aug_recovery_healing',
        name: 'Recovery and Healing',
        jpName: '快動・治',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 5,
        description: 'Enhances stamina recovery speed while receiving healing aura.',
        effect: '+15% Stamina Recovery in Aura',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Troll', count: 2, minEnemyLevel: 10, location: 'Dow Valley / Kinath' },
          { targetRank: 6, targetEnemy: 'Cyclops', count: 2, minEnemyLevel: 10, location: 'Brea Coast / Misriu' }
        ]
      },
      {
        id: 'spl_aug_tactile_pleasure',
        name: 'Tactile Pleasure',
        jpName: '触撃・快',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Restores stamina when successfully hitting enemies with spirit skills.',
        effect: 'Stamina on Spirit Hit',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rock Lizard', count: 7, minEnemyLevel: 20, location: 'Dow Valley' },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 8, minEnemyLevel: 20, location: 'Misriu Forest South' }
        ]
      },
      {
        id: 'spl_aug_shadow_shelter',
        name: 'Shadow Shelter',
        jpName: '影護',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces physical damage taken when standing inside spiritual fields.',
        effect: '+12% Physical Defense in Ward',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Hobgoblin Leader', count: 10, minEnemyLevel: 20, location: 'Misriu / Hyndell' },
          { targetRank: 6, targetEnemy: 'Golem', count: 3, minEnemyLevel: 30, location: 'Dow Valley' }
        ]
      },
      {
        id: 'spl_aug_haunting_spirit',
        name: 'Haunting Spirit',
        jpName: '憑霊',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Boosts spirit thread attachment speed and spirit absorption rate.',
        effect: '+25% Spirit Thread Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orc Soldier', count: 7, minEnemyLevel: 30, location: 'Dow Valley Orc Camp' },
          { targetRank: 6, targetEnemy: 'Witch', count: 3, minEnemyLevel: 40, location: 'Deenan Deep Green' }
        ]
      },
      {
        id: 'spl_aug_spirit_collection',
        name: 'Spirit Collection',
        jpName: '集霊',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases spirit energy gathered per normal attack.',
        effect: '+20% Spirit per Hit',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'White', count: 4, minEnemyLevel: 30, location: 'Deenan Highlands' },
          { targetRank: 6, targetEnemy: 'Lindworm', count: 2, minEnemyLevel: 30, location: 'Brea Coast / Dow Valley' }
        ]
      },
      {
        id: 'spl_aug_touch_protection',
        name: 'Touch Protection',
        jpName: '触護',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 5,
        description: 'Boosts physical and magick defense while spirit thread is attached.',
        effect: '+10% Defense during Thread',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Blue Newt', count: 7, minEnemyLevel: 30, location: 'Deenan Deep Green' },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 2, minEnemyLevel: 40, location: 'Kinath Plateau' }
        ]
      },
      {
        id: 'spl_aug_rinken',
        name: 'Rinken',
        jpName: '輪顕',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Expands the area of effect of Grasta spiritual fields.',
        effect: '+30% Grasta Area Radius',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Wolf Alchemy', count: 9, minEnemyLevel: 40, location: 'Mergoda Laboratory' },
          { targetRank: 6, targetEnemy: 'Griffin Alchemy', count: 3, minEnemyLevel: 50, location: 'Mergoda Laboratory' }
        ]
      },
      {
        id: 'spl_aug_life_in_life',
        name: 'Life in Life',
        jpName: '命脈',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases maximum health and health regeneration speed.',
        effect: '+300 Max HP & Regen',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Troll', count: 2, minEnemyLevel: 40, location: 'Dow Valley / Kinath' },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40, location: 'Kinath Plateau' }
        ]
      },
      {
        id: 'spl_aug_touch_attack',
        name: 'Touch Attack',
        jpName: '触撃',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against targets linked with spirit thread.',
        effect: '+12% Damage to Linked Target',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 3, minEnemyLevel: 40, location: 'Kinath Plateau' },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 40, location: 'Dow Valley / Zandora' }
        ]
      },
      {
        id: 'spl_aug_evacuation',
        name: 'Evacuation',
        jpName: '退避',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 5,
        description: 'Reduces stamina consumption and increases invincibility frames during Spirit Dodge.',
        effect: '+0.2s Dodge I-Frames',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orcbringer', count: 5, minEnemyLevel: 40, location: 'Dow Valley Camp' },
          { targetRank: 6, targetEnemy: 'General Oak', count: 7, minEnemyLevel: 40, location: 'Dow Valley Camp' },
          { targetRank: 6, targetEnemy: 'Captain Oak', count: 7, minEnemyLevel: 40, location: 'Dow Valley Camp' }
        ]
      },
      {
        id: 'spl_aug_escaping_spirits',
        name: 'Escaping Spirits',
        jpName: '逸霊',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 6,
        description: 'Prevents spirit gauge depletion when knocked down or staggered.',
        effect: 'Spirit Gauge Loss Prevention',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Maltroll', count: 2, minEnemyLevel: 40, location: 'Zandora / Mergoda' },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 3, minEnemyLevel: 40, location: 'Mergoda / Finis' }
        ]
      },
      {
        id: 'spl_aug_long_healing',
        name: 'Long Healing',
        jpName: '長治',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases the duration of Cure Grasta and health-over-time effects.',
        effect: '+25% Cure Grasta Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Colossus', count: 2, minEnemyLevel: 40, location: 'Dow Valley / Zandora' },
          { targetRank: 6, targetEnemy: 'Griffin', count: 7, minEnemyLevel: 40, location: 'Kinath Plateau' }
        ]
      },
      {
        id: 'spl_aug_relief_attack',
        name: 'Relief Attack',
        jpName: '救撃',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 6,
        description: 'Boosts attack power for a period after reviving or healing an ally.',
        effect: '+15% Attack After Heal',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 2, minEnemyLevel: 40, location: 'Dow Valley / Mergoda' },
          { targetRank: 6, targetEnemy: 'Golem', count: 7, minEnemyLevel: 46, location: 'Mergoda Ruins' }
        ]
      },
      {
        id: 'spl_aug_durability',
        name: 'Durability',
        jpName: '耐力',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases maximum stamina and reduces stamina drain from jumping attacks.',
        effect: '+250 Max Stamina',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Angles', count: 3, minEnemyLevel: 50, location: 'Mergoda / Zandora' },
          { targetRank: 6, targetEnemy: 'Black Griffin', count: 4, minEnemyLevel: 50, location: 'Zandora Highlands' }
        ]
      },
      {
        id: 'spl_aug_immovable',
        name: 'Immovable',
        jpName: '不倒',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 6,
        description: 'Highly resists knockdown and stagger while casting Grasta skills.',
        effect: 'Super Armor during Cast',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 5, minEnemyLevel: 40, location: 'Mergoda Crypts' },
          { targetRank: 6, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50, location: 'Mergoda / Zandora' }
        ]
      },
      {
        id: 'spl_aug_refreshing',
        name: 'Refreshing',
        jpName: '清快',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 5,
        description: 'Shortens the duration of negative elemental and debilitation statuses.',
        effect: '-35% Debilitation Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 40, location: 'Volden Mine / Crypts' },
          { targetRank: 6, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 56, location: 'Mergoda / Zandora' }
        ]
      },
      {
        id: 'spl_aug_invasion_51',
        name: 'Invasion (Lv51)',
        jpName: '侵霊・初',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against Corrupted and Invasion-type monsters.',
        effect: '+10% Damage vs Invasion',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Geo Golem', count: 2, minEnemyLevel: 50, location: 'Mergoda Ruins' },
          { targetRank: 6, targetEnemy: 'Mistworm', count: 10, minEnemyLevel: 60, location: 'Leste / Megado' }
        ]
      },
      {
        id: 'spl_aug_bud',
        name: 'Bud',
        jpName: '萌芽',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 6,
        description: 'Accelerates spirit seed germination and initial spirit gauge build.',
        effect: '+25% Initial Gauge Build',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skull Lord', count: 5, minEnemyLevel: 50, location: 'Mergoda Tombs' },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 8, minEnemyLevel: 56, location: 'Mergoda Underpass' }
        ]
      },
      {
        id: 'spl_aug_abatement',
        name: 'Abatement',
        jpName: '減痛',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 6,
        description: 'Mitigates damage from damage-over-time and environmental hazards.',
        effect: '-30% Hazard / DOT Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Drake', count: 2, minEnemyLevel: 60, location: 'Megado Volcano Crater' },
          { targetRank: 6, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60, location: 'Megado Underbelly' }
        ]
      },
      {
        id: 'spl_aug_invasion_56',
        name: 'Invasion (Lv56)',
        jpName: '侵霊・中',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 7,
        description: 'Greatly enhances knockdown and stagger power against Invasion beasts.',
        effect: '+15% Knockdown vs Invasion',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Shadow Chimera', count: 5, minEnemyLevel: 50, location: 'Mergoda / Finis' },
          { targetRank: 6, targetEnemy: 'Mist Drake', count: 4, minEnemyLevel: 60, location: 'Megado Volcano' }
        ]
      },
      {
        id: 'spl_aug_enrin',
        name: 'Enrin',
        jpName: '円輪',
        unlockLevel: 60,
        maxRank: 6,
        ppCost: 6,
        description: 'Expands the radius of spiritual counter blasts and burst skills.',
        effect: '+25% Counter Blast Radius',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Death Knight', count: 4, minEnemyLevel: 50, location: 'Mergoda Royal Tombs' },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 60, location: 'Kinath Plateau / Megado' }
        ]
      },
      {
        id: 'spl_aug_attachment',
        name: 'Attachment',
        jpName: '霊着',
        unlockLevel: 60,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases spirit link stability and prevents threads from breaking during monster thrashing.',
        effect: '+40% Thread Break Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Living Armor', count: 7, minEnemyLevel: 50, location: 'Mergoda Crypts' },
          { targetRank: 6, targetEnemy: 'Wilm', count: 8, minEnemyLevel: 60, location: 'Megado / Finis' }
        ]
      },
      {
        id: 'spl_aug_affiliated',
        name: 'Affiliated',
        jpName: '同心',
        unlockLevel: 60,
        maxRank: 6,
        ppCost: 6,
        description: 'Shares a portion of your active spirit buffs with nearby party pawns and allies.',
        effect: '+20% Buff Shared to Party',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Armor Cyclops', count: 2, minEnemyLevel: 50, location: 'Zandora / Mergoda' },
          { targetRank: 6, targetEnemy: 'Gigan Machina', count: 8, minEnemyLevel: 56, location: 'Mergoda Laboratory' }
        ]
      },
      {
        id: 'spl_aug_invasion_60',
        name: 'Invasion (Lv60)',
        jpName: '侵霊・極',
        unlockLevel: 60,
        maxRank: 6,
        ppCost: 8,
        description: 'Maximizes offensive damage multiplier against highest-tier Frenzied and Invasion monsters.',
        effect: '+20% Damage vs Invasion',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Empress Ghost', count: 5, minEnemyLevel: 50, location: 'Mergoda / Zandora' },
          { targetRank: 6, targetEnemy: 'Frenzied Gore Cyclops', count: 4, minEnemyLevel: 70, location: 'Megado / Finis' },
          { targetRank: 6, targetEnemy: 'Mad Invasion Behemoth', count: 4, minEnemyLevel: 70, location: 'Megado / Finis' }
        ]
      },
      {
        id: 'spl_aug_spear_thrust',
        name: 'Spear Thrust',
        jpName: '槍突',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 7,
        description: 'Boosts thrusting physical attack power of spirit lance normal and custom skills.',
        effect: '+12% Spear Thrust Attack',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50, location: 'Leste / Acker' },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50, location: 'Leste Desert' },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60, location: 'Leste / Acker Glaciers' }
        ]
      },
      {
        id: 'spl_aug_spear_rise',
        name: 'Spear Rise',
        jpName: '槍昇',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage and knockdown multiplier when attacking enemies in mid-air or during rising jumps.',
        effect: '+15% Aerial Spear Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50, location: 'Mergoda / Leste' },
          { targetRank: 5, targetEnemy: "Lizardman's Sage", count: 7, minEnemyLevel: 50, location: 'Brea Coast / Leste' },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60, location: 'Acker Island Outskirts' }
        ]
      },
      {
        id: 'spl_aug_spear_fall',
        name: 'Spear Fall',
        jpName: '槍墜',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage and impact radius of plunging downward spear dives.',
        effect: '+18% Plunge Spear Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60, location: 'Megado / Finis' },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60, location: 'Leste / Acker Forest' }
        ]
      },
      {
        id: 'spl_aug_active',
        name: 'Active',
        jpName: '活命',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases maximum health and health restored per potion/spell.',
        effect: '+400 Max HP & +15% Heal',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60, location: 'Megado Crypts' },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60, location: 'Megado / Finis' }
        ]
      },
      {
        id: 'spl_aug_yari_circle_defeat',
        name: 'Yari Circle Defeat',
        jpName: '槍円撃',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases critical strike rate of spinning 360-degree spear attacks.',
        effect: '+15% Spear Critical Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60, location: 'Megado Royal Ruins' },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60, location: 'Megado Underpass' },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60, location: 'Megado / Finis' }
        ]
      },
      {
        id: 'spl_aug_protection',
        name: 'Protection',
        jpName: '加護',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 7,
        description: 'Grants all allies inside Grasta fields increased defense and resistance to instant death / petrify.',
        effect: 'Allied Resistance in Grasta',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60, location: 'Megado Outskirts' },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60, location: 'Megado Outskirts' },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60, location: 'Finis Core Sanctuary' }
        ]
      },
      {
        id: 'spl_aug_spear_breakthrough',
        name: 'Spear Breakthrough',
        jpName: '槍破',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 8,
        description: 'Enhances armor-piercing damage against hardened enemy carapaces and shields.',
        effect: '+15% Armor Pierce Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70, location: 'Megado / Finis' },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70, location: 'Megado Royal Temple' },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70, location: 'Finis Deep Cavern' }
        ]
      },
      {
        id: 'spl_aug_spear_noboru_ha',
        name: 'Spear Noboru Ha',
        jpName: '槍登破',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases climbing attack speed and climbing skill damage while mounted on giant bosses.',
        effect: '+20% Mounted Attack Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70, location: 'Finis Obsidian Valley' },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70, location: 'Finis Sky Realm' },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70, location: 'Finis Netherworld' }
        ]
      },
      {
        id: 'spl_aug_spear_crash',
        name: 'Spear Crash',
        jpName: '槍崩',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 8,
        description: 'Massive boost to monster rage / stamina gauge destruction with spear impact.',
        effect: '+25% Rage Bar Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70, location: 'Finis Deep Ruins' },
          { targetRank: 5, targetEnemy: 'The Frenzied Styparides', count: 14, minEnemyLevel: 70, location: 'Finis Deep Ruins' },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70, location: 'Megado Sky High' }
        ]
      },
      {
        id: 'spl_aug_strong_attachment',
        name: 'Strong Attachment',
        jpName: '強霊着',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 7,
        description: 'Doubles the duration and resistance of spirit thread attachments even against extreme thrashing.',
        effect: '+60% Thread Hold Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70, location: 'Finis Outer Walls' },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70, location: 'Finis Outer Walls' },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70, location: 'Finis Deep Cavern' }
        ]
      },
      {
        id: 'spl_aug_spear_circle_break',
        name: 'Spear Circle Break',
        jpName: '槍円砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 8,
        description: 'Boosts chance to inflict critical hits and instant guard break on sweeping strikes.',
        effect: '+20% Critical & Guard Break',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70, location: 'Finis Citadel' },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70, location: 'Finis Sanctum' },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80, location: 'Finis Sky Realm' }
        ]
      },
      {
        id: 'spl_aug_spiritual_storage',
        name: 'Spiritual Storage',
        jpName: '霊気蓄積',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 9,
        description: 'Allows storing a second tier of overflow Spirit gauge to empower the next 3 custom skill activations.',
        effect: 'Tier 2 Spirit Overdrive',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80, location: 'Finis Core Sanctuary' },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80, location: 'Finis Netherworld' },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80, location: 'Megado / Finis' },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 2, minEnemyLevel: 80, location: 'Finis Citadel' }
        ]
      }
    ]
  },

  // ==========================================
  // 2. FIGHTER (ファイター)
  // ==========================================
  {
    id: 'fighter',
    name: 'Fighter',
    jpName: 'ファイター',
    role: 'Attacker (Physical)',
    weapon: 'Sword & Shield (片手剣・盾)',
    masterNpc: 'Vanessa (ヴァネッサ)',
    masterLocation: 'Gritten Fort',
    unlockRequirement: 'Starter Vocation (Available immediately from Level 1)',
    minVersion: '3.1',
    playstyle: 'Frontline balanced swordmaster combining rapid slashes, shield deflections, and high single-target burst.',
    customSkills: [
      {
        id: 'fgt_a_flashing_thrust',
        name: 'A flashing thrust',
        jpName: '一閃突き',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Low',
        description: 'A dash forward that ends with a lunged stab to the enemy; damage is higher the further the dash distance.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bull Ape', count: 20, minEnemyLevel: 10 },
          { targetRank: 7, targetEnemy: 'Lizardman', count: 30, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Large Lizard', count: 10, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Cyclops', count: 4, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Troll', count: 8, minEnemyLevel: 16 }
        ]
      },
      {
        id: 'fgt_toga_shouzan',
        name: 'Toga Shouzan',
        jpName: '刀牙昇斬',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Traces a grand upward arc with the sword, sending lightweight enemies into the air.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Hobgoblin Leader', count: 15, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Rogue Fighter', count: 15, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 5, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Armor Cyclops', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'fgt_shield_bash',
        name: 'Shield Bash',
        jpName: 'シールドバッシュ',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Low',
        description: 'Deals a barrage of blows on the enemy with the shield.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'wolf', count: 40, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Redcap Fighter', count: 15, minEnemyLevel: 8 },
          { targetRank: 9, targetEnemy: 'Mist Fighter', count: 30, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Ent', count: 10, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'fgt_canopy_slash',
        name: 'Canopy Slash',
        jpName: '天蓋斬り',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Unleashes a flurry of skyward slashes well-suited to bringing flying foes to the ground.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Harpy', count: 20, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Snow Harpy', count: 30, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Troll', count: 8, minEnemyLevel: 16 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 12, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'fgt_deflecting_slash',
        name: 'Deflecting slash',
        jpName: '受け流し斬り',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Ducks backward to evade attack before charging in to deliver a slashing blow. If timed correctly to evade an attack, this increases its power.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Sorcerer', count: 13, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Dread Ape', count: 5, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Cyclops', count: 8, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'fgt_downward_thrust',
        name: 'downward thrust',
        jpName: '直下突き',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Leaps to deliver a solid downward thrust.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Rock Lizard', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Cyclops', count: 10, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Ent', count: 10, minEnemyLevel: 25 },
          { targetRank: 10, targetEnemy: 'Chimera', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'fgt_centurion_spikes',
        name: 'Centurion Spikes',
        jpName: 'センチュリオンスパイク',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Medium',
        description: 'Unleashes a flurry of stabbing attacks at the enemy while blocking with the shield.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Snow Harpy', count: 15, minEnemyLevel: 30 },
          { targetRank: 7, targetEnemy: 'Oak Aimer', count: 30, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Captain Oak', count: 10, minEnemyLevel: 35 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 6, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Lindworm', count: 10, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'fgt_crescent_moon_slash',
        name: 'Crescent Moon Slash',
        jpName: '円月斬り',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Spins with blade extended, drawing a circular slash twice around you.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Troll', count: 3, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Griffin', count: 10, minEnemyLevel: 35 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_chariot_move',
        name: 'Chariot Move',
        jpName: 'チャリオットムーブ',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'A quick lunge while blocking with the shield.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Golem', count: 5, minEnemyLevel: 30 },
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 6, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Orc Butler', count: 10, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'White Chimera', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'General Oak', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_two_stage_thrust',
        name: 'Two-stage thrust',
        jpName: '二段突き',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Delivers a quick stab and withdrawal slash to the enemy without distancing away.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Silver Roar', count: 5, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'General Oak', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Colossus', count: 4, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Cockatrice', count: 2, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Witch', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_ryuukensen',
        name: 'Ryuukensen',
        jpName: '竜巻斬',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Blocks with the shield and then counters enemy attacks. Damage is greater if a perfect block with the shield is correctly executed.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Damned Goblin', count: 20, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Coopstorch Frost', count: 15, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Living Armor', count: 10, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Griffin Alchemy', count: 5, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Goliath', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'fgt_brave_raid',
        name: 'Brave Raid',
        jpName: 'ブレイブレイド',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Unleashes an onslaught of swift, powerful attacks to all surroundings within reach.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 3, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Geo Golem', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_powerful_charge_slash',
        name: 'Powerful Charge Slash',
        jpName: '剛力溜め斬り',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Focuses maximum blade tension into an immense charged strike that cleaves through monster defenses.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_flowing_shield_sho',
        name: 'Flowing Shield Sho',
        jpName: '流盾衝',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Flows from a dynamic shield parry into an explosive kinetic shockwave that demolishes large beast armor.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 10, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'fgt_norm_combo',
        name: 'Basic Slash Combo (連斬)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Standard 4-hit sword combination. Increases swing speed and final hit knockdown as rank increases.'
      },
      {
        id: 'fgt_norm_deflect',
        name: 'Just Guard / Perfect Deflection (ジャストガード)',
        type: 'normal',
        unlockLevel: 6,
        maxRank: 6,
        description: 'Blocking at the exact millisecond of enemy impact nullifies all damage, consumes zero stamina, and creates a counter opportunity.'
      },
      {
        id: 'fgt_norm_counter',
        name: 'Shield Counter Riposte (シールドカウンター)',
        type: 'normal',
        unlockLevel: 15,
        maxRank: 6,
        description: 'Follow-up riposte slash directly out of a successful Just Guard for guaranteed critical hit.'
      }
    ],
    augments: [
      {
        id: 'fgt_aug_defeat',
        name: 'defeat',
        jpName: '打倒',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases knockdown and stagger power dealt by physical sword attacks.',
        effect: '+25% Knockdown Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Lizardman', count: 30, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'skeleton', count: 50, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'fgt_aug_strong_arm',
        name: 'Strong arm',
        jpName: '豪腕',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases base physical attack power when wielding one-handed swords.',
        effect: '+15% Sword Physical Attack',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Mage', count: 30, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Goblin Alchemy Fighter', count: 10, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'fgt_aug_reception',
        name: 'Reception',
        jpName: '受流',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases the timing window for executing a successful Just Guard / Perfect Deflection.',
        effect: '+30% Just Guard Timing Window',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orb Enemy', count: 20, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Slinghobgoblin', count: 10, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'fgt_aug_agile',
        name: 'Agile',
        jpName: '敏捷',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces recovery animation delay after executing shield blocks and sword strikes.',
        effect: '-25% Recovery Delay',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mist Fighter', count: 5, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Troll', count: 5, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'fgt_aug_honesty',
        name: 'Honesty',
        jpName: '忠誠',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases threat generation (aggro) drawn by shield strikes and taunts.',
        effect: '+35% Aggro Generation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Alchemy', count: 7, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Ent', count: 5, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'fgt_aug_quick_release',
        name: 'quick release',
        jpName: '早放',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Accelerates the charge speed of charging sword techniques.',
        effect: '-20% Sword Charge Time',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 2, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'fgt_aug_acquisition',
        name: 'acquisition',
        jpName: '強奪',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases the amount of stamina drained from monsters during climbing attacks.',
        effect: '+30% Climb Stamina Siphon',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rock Lizard', count: 12, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'fgt_aug_soft_aim',
        name: 'Soft aim',
        jpName: '柔狙',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against soft-bodied / slime and unarmored targets.',
        effect: '+25% Damage vs Soft & Slime Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Slime', count: 10, minEnemyLevel: 1 },
          { targetRank: 6, targetEnemy: 'Madman', count: 30, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'fgt_aug_sub_target',
        name: 'Sub-target',
        jpName: '獣狙',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases sword damage dealt against Beast and Chimera category monsters.',
        effect: '+25% Damage vs Beast Category Monsters',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goblin Alchemy', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'fgt_aug_protection',
        name: 'protection',
        jpName: '加護',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Slime and ooze acid attacks.',
        effect: '-30% Slime & Acid Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ooze', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Sludge Man', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'fgt_aug_ago',
        name: 'Ago',
        jpName: '顎砕',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage and stagger inflicted when striking monster heads and jaws.',
        effect: '+25% Headshot / Jaw Stagger Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Redcap Fighter', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Colossus', count: 4, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'fgt_aug_strong_skill',
        name: 'Strong skill',
        jpName: '剛技',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases the damage output of physical custom skills by 20%.',
        effect: '+20% Custom Skill Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Elder Dragon', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_mad_stab',
        name: 'mad stab',
        jpName: '狂突',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases the hit rate and critical chance of gouging / climbing thrust attacks.',
        effect: '+25% Climbing Gouge DPS',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Griffin', count: 2, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Maltroll', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Troll', count: 10, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_heavy_shield',
        name: 'heavy shield',
        jpName: '重盾',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases shield guard capability, preventing guard breaks against giant boss smash attacks.',
        effect: '+35% Guard Impact Absorption',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ent', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Colossus', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_stubbornness',
        name: 'Stubbornness',
        jpName: '強頑',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Prevents being knocked down or launched into the air by moderate physical impacts.',
        effect: 'Super Armor vs Moderate Impacts',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 3, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_no_shock',
        name: 'No shock',
        jpName: '無震',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Nullifies ground earthquake stagger caused by giant monsters stomping near you.',
        effect: 'Earthquake & Tremor Stagger Immunity',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'General Oak', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_fighting_spirit',
        name: 'Fighting spirit',
        jpName: '闘志',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical attack power by 25% for 20 seconds following a successful Just Guard.',
        effect: '+25% Physical ATK After Just Guard',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Armor Cyclops', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 8, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'fgt_aug_hard_stand',
        name: 'hard stand',
        jpName: '堅守',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical defense by 20% while holding shield guard.',
        effect: '+20% Defense during Shield Guard',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_ukekotsu',
        name: 'Ukekotsu',
        jpName: '受骨',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Restores a portion of stamina upon successfully executing a Just Guard.',
        effect: 'Stamina Refund on Just Guard',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Black Griffin', count: 8, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'fgt_aug_fallen_shield',
        name: 'Fallen shield',
        jpName: '崩盾',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases guard break damage dealt to shielded enemies by 40%.',
        effect: '+40% Shield & Guard Break Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Living Armor', count: 4, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'General Oak', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Grimwarg', count: 14, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_indomitable',
        name: 'indomitable',
        jpName: '不屈',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Prevents lethal damage once per battle, retaining 1 HP and granting 3 seconds of invulnerability.',
        effect: 'Survive Lethal Strike with 1 HP',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Skeleton Alchemy', count: 14, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'fgt_aug_strong_shield',
        name: 'strong shield',
        jpName: '剛盾',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases shield deflection damage and staggers attacking enemies upon block.',
        effect: '+30% Shield Counter Stagger',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Living Armor', count: 4, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Skull Lord', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Death Knight', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Shadow Chimera', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'fgt_aug_onslaught',
        name: 'Onslaught',
        jpName: '猛進',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases movement speed and attack speed by 15% for 15s after landing a knockdown.',
        effect: '+15% Move & ATK Speed on Knockdown',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Angles', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_aug_tough',
        name: 'tough',
        jpName: '剛堅',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases maximum health pool by a flat 1000.',
        effect: '+1000 Maximum HP',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Maltroll', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Damned Golem', count: 8, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Ghoul', count: 5, minEnemyLevel: 52 }
        ]
      },
      {
        id: 'fgt_aug_overwhelming',
        name: 'Overwhelming',
        jpName: '圧倒',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt against knocked-down or staggered monsters by 30%.',
        effect: '+30% Damage vs Downed Enemies',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Gigan Machina', count: 5, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'fgt_aug_consecutive_blows',
        name: 'Consecutive blows',
        jpName: '連撃',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Each consecutive sword hit increases damage by 3% (stacks up to 30%).',
        effect: '+3% Damage per Hit (Max +30%)',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_aug_zanbu_defeat',
        name: 'Zanbu defeat',
        jpName: '斬打倒',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases slash and strike physical damage across all basic combos and skills.',
        effect: '+15% Slash & Strike Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_aug_gouge_out_sever',
        name: 'Gouge out, sever',
        jpName: '抉斬',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases critical damage dealt when attacking monster cores or severed parts.',
        effect: '+30% Critical Damage on Monster Cores',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_aug_breaking_attack',
        name: 'Breaking attack',
        jpName: '破撃',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases monster rage gauge / stamina bar reduction caused by sword skills.',
        effect: '+35% Rage Bar Depletion',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_aug_forced_to_defeat',
        name: 'Forced to defeat',
        jpName: '強倒',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Forces boss monsters into extended downed / stagger duration (+4 seconds).',
        effect: '+4s Extended Boss Down Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_aug_solid_shield',
        name: 'solid shield',
        jpName: '堅盾',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Nullifies all elemental damage received when blocking with shield.',
        effect: '100% Elemental Damage Block on Guard',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'fgt_aug_consecutive_attacks',
        name: 'Consecutive Attacks',
        jpName: '連撃破',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Landing a full combo chain reduces custom skill cooldowns by 20%.',
        effect: 'Combo Finisher Reduces Skill Cooldowns',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'fgt_aug_slash_and_collapse_absolute',
        name: 'Slash and Collapse Absolute',
        jpName: '斬崩絶',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Sword slashes shred 25% of target monster armor for 20 seconds upon landing a critical hit.',
        effect: '25% Armor Shred on Critical Hit',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'fgt_aug_gouge_crush',
        name: 'Gouge, crush',
        jpName: '抉砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Climbing and gouging strikes ignore 40% of target monster physical defense.',
        effect: '40% Defense Ignore on Climb Attacks',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'fgt_aug_hard_water',
        name: 'hard water',
        jpName: '硬剛',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Grants continuous passive health regeneration (35 HP/sec) while in combat.',
        effect: '+35 HP/sec Passive Combat Regen',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'fgt_aug_strong_consecutive_break',
        name: 'Strong Consecutive Break',
        jpName: '剛連砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Final hit of custom sword skills produces a shockwave that deals 50% bonus damage.',
        effect: '+50% Skill Finisher Shockwave Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'fgt_aug_a_sudden_collision',
        name: 'A sudden collision',
        jpName: '突衝',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Converts all block deflection force into a massive counter-burst that instantly breaks enraged monster stances.',
        effect: 'Instant Enrage Stagger on Just Guard',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 3. HUNTER (ハンター)
  // ==========================================
  {
    id: 'hunter',
    name: 'Hunter',
    jpName: 'ハンター',
    role: 'Attacker (Physical)',
    weapon: 'Longbow (弓)',
    masterNpc: 'Ivan',
    masterLocation: 'Mysree Grove',
    unlockRequirement: 'Starter Vocation (Available immediately from Level 1)',
    minVersion: '3.1',
    playstyle: 'Precision long-range sniper dealing targeted weak-point criticals, status arrows, and area aerial rain.',
    customSkills: [
      {
        id: 'hnt_consecutive_shots',
        name: 'Consecutive shots',
        jpName: '連なり射ち',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'Medium',
        description: 'Fire multiple arrows in quick succession. Staggers large enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Hobgoblin', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Large Lizard', count: 25, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Bull Ape', count: 30, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 10, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'hnt_piercing',
        name: 'Piercing',
        jpName: '貫き射ち',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'Medium',
        description: 'Fires a hot capable of piercing multiple targets.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'skeleton', count: 30, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Skeleton Mage', count: 15, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Goblin Alchemy', count: 25, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Dread Ape', count: 10, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'hnt_fan_shooting',
        name: 'Fan shooting',
        jpName: '扇射ち',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'Medium',
        description: 'Fires three arrow in a wedge pattern.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Forest Goblin', count: 20, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Madman', count: 25, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Mist Hunter', count: 30, minEnemyLevel: 18 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hnt_pre_installed_loud_arrow',
        name: 'Pre-installed loud arrow',
        jpName: '仕込み爆音矢',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'Low',
        description: 'Fires an arrow that produces a deafening blare on impact, breaking enemy guard. Will also launch nearby enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Mist Hunter', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Skeleton Alchemy', count: 20, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Troll', count: 8, minEnemyLevel: 16 },
          { targetRank: 10, targetEnemy: 'Ent', count: 10, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'hnt_rain_of_fire',
        name: 'Rain of fire',
        jpName: '降らし射ち',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'Sends a wall of arrows skyward to rain down on a broad area.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Dread Ape', count: 3, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Rock Lizard', count: 30, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Ogre', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hnt_swirling_shot',
        name: 'Swirling Shot',
        jpName: '旋風射ち',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'Medium',
        description: 'Looses a spinning arrow that delivers a barrage of hits to an area. Especially effective with status arrows.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Sorcerer', count: 13, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Troll', count: 12, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Cyclops', count: 12, minEnemyLevel: 25 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 15, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'hnt_crimson_explosive_arrow',
        name: 'Crimson Explosive Arrow',
        jpName: '紅蓮爆矢',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'Applies an explosive to stun effect all arrows loaded. Increase damage inflicted.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Orc Soldier', count: 15, minEnemyLevel: 30 },
          { targetRank: 7, targetEnemy: 'Large Sulfur', count: 30, minEnemyLevel: 25 },
          { targetRank: 8, targetEnemy: 'Large Lizard', count: 30, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Colossus', count: 6, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Chimera', count: 10, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'hnt_powerful_shot',
        name: 'Powerful Shot',
        jpName: '剛力射ち',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'High',
        description: 'Draws the bow with all the user’s might, then looses a shot straight ahead. Power greatly increases if released as maximum charge is reached.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 5, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Ent', count: 10, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Chimera', count: 10, minEnemyLevel: 35 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_reverse_shrinkage',
        name: 'reverse shrinkage',
        jpName: '逆縮ぎ',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'Medium',
        description: 'Quickly dodges backwards, creating distance between you and your enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Orcbringer', count: 20, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Oaktrooper', count: 20, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Golem', count: 8, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Witch', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 5, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Ghoul', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_rain_of_explosive_arrows',
        name: 'Rain of explosive arrows',
        jpName: '爆矢降らし',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'Coat multiple arrows in gunpowder and send them skyward to rain down a broad area.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Griffin', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Ent', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'General Oak', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_barrage_of_attacks',
        name: 'A barrage of attacks',
        jpName: '乱れ射ち',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'High',
        description: 'Continuously shoot multiple arrows as you press the button. As you shoot more arrows, it becomes easier to stagger enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Damned Wolf', count: 40, minEnemyLevel: 46 },
          { targetRank: 7, targetEnemy: 'Harpy', count: 30, minEnemyLevel: 46 },
          { targetRank: 8, targetEnemy: 'Geo Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Bandit Healer', count: 20, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Griffin Alchemy', count: 5, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Empress Ghost', count: 10, minEnemyLevel: 48 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'hnt_demon_god_shooting',
        name: 'Demon God Shooting',
        jpName: '鬼神射ち',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'High',
        description: 'Fires an extremely powerful magic arrow that gains a massive damage boost at full charge. Exceptionally effective against weakened foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 5, minEnemyLevel: 56 },
          { targetRank: 7, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 56 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 5, minEnemyLevel: 58 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 56 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_tengu_bakuya',
        name: 'Tengu Bakuya',
        jpName: '天狗爆矢',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'High',
        description: 'Fires arrows wrapped in chained explosives skyward. Hold button during the shot to increase detonation altitude.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_penetrating_close_range_shot',
        name: 'Penetrating close-range shot',
        jpName: '貫通至近射ち',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Shot',
        staminaCost: 'High',
        description: 'At close range, nock multiple arrows and fire with full force. Can be used even while clinging to foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 10, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'hnt_norm_rapid',
        name: 'Quick Shot (早撃ち)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Enables faster arrow nocking and continuous shooting while moving.'
      },
      {
        id: 'hnt_norm_aim',
        name: 'Precision Aiming (精密射撃)',
        type: 'normal',
        unlockLevel: 6,
        maxRank: 6,
        description: 'Zooms camera into an over-the-shoulder reticle for pinpoint weak point sniping.'
      }
    ],
    augments: [
      {
        id: 'hnt_aug_precision',
        name: 'precision',
        jpName: '精密',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Reduces reticle bloom and sway, increasing accuracy when firing continuously.',
        effect: '+25% Bow Aim Precision',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'skeleton', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Harpy', count: 50, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'hnt_aug_slow_explosion',
        name: 'slow explosion',
        jpName: '遅爆',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Delays explosive arrow detonation slightly to maximize deep piercing blast damage.',
        effect: '+20% Explosive Arrow Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Forest Goblin', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'wolf', count: 35, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'hnt_aug_underlying_strength',
        name: 'Underlying strength',
        jpName: '底力',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases ranged physical attack power when stamina drops below 30%.',
        effect: '+30% ATK at Low Stamina',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Hunter', count: 5, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Direwolf', count: 30, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hnt_aug_braking',
        name: 'braking',
        jpName: '制動',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces recoil recovery time after firing heavy charged arrows.',
        effect: '-30% Shot Recoil Recovery',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mist Hunter', count: 5, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 5, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'hnt_aug_concentration',
        name: 'concentration',
        jpName: '集中',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Shortens the time required to fully draw and charge precision bow skills.',
        effect: '-25% Bow Charge Time',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Alchemy', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hnt_aug_strong_figure',
        name: 'Strong figure',
        jpName: '強体',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces stamina consumption while maintaining fully drawn bow tension.',
        effect: '-35% Bow Hold Stamina Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Night', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Troll', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hnt_aug_craftsmanship',
        name: 'Craftsmanship',
        jpName: '巧手',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Accelerates the speed of nocking special custom status arrows into the bow.',
        effect: '+30% Special Arrow Loading Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Fat Undead', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hnt_aug_demon_target',
        name: 'Demon Target',
        jpName: '魔狙',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases arrow damage dealt against Demon and Orc category monsters.',
        effect: '+25% Damage vs Demon & Orc Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orc Soldier', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 15, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'hnt_aug_wing_aim',
        name: 'wing aim',
        jpName: '翼狙',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases arrow damage dealt against Winged / Aerial beasts (Harpies, Griffins, Sphinxes).',
        effect: '+25% Damage vs Flying / Winged Monsters',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 2, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'hnt_aug_demon_protection',
        name: 'Demon protection',
        jpName: '魔護',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Demon and Orc monster strikes.',
        effect: '-25% Damage Taken from Demons & Orcs',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Dread Ape', count: 4, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Ogre', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'hnt_aug_wing_protection',
        name: 'Wing protection',
        jpName: '翼護',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Winged and Aerial monsters.',
        effect: '-25% Damage Taken from Winged Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Snow Harpy', count: 17, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'hnt_aug_skillful_filling',
        name: 'skillful filling',
        jpName: '巧装',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases the maximum stock capacity of special status and elemental arrows carried.',
        effect: '+5 Max Special Arrow Capacity',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'White', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Maltroll', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_aug_mitsuya',
        name: 'Mitsuya',
        jpName: '密矢',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Tightens arrow grouping during fan shots and multi-arrow skills to hit single weak points.',
        effect: 'Tighter Spread on Multi-Arrow Skills',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'General Oak', count: 10, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Elder Dragon', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 8, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_aug_dignity',
        name: 'Dignity',
        jpName: '威風',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases chance of causing immediate stagger and flinch with charged sniper arrows.',
        effect: '+30% Bow Stagger Chance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Colossus', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_aug_core_attack',
        name: 'core attack',
        jpName: '核撃',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage dealt to revealed monster cores and weak spots.',
        effect: '+25% Core Weak Point Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_aug_shot',
        name: 'Shot',
        jpName: '射勢',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases arrow flight speed and extends maximum effective damage range.',
        effect: '+30% Arrow Velocity & Effective Range',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_aug_fulfillment',
        name: 'fulfillment',
        jpName: '充実',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases arrow attack power by 20% when health is at 100% maximum.',
        effect: '+20% Bow Damage at 100% HP',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orb Enemy', count: 50, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 8, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'hnt_aug_invasion_arrow',
        name: 'Invasion Arrow',
        jpName: '侵矢',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the infliction speed of status ailments applied by custom coated arrows.',
        effect: '+35% Arrow Status Infliction Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Bandit Hunter', count: 30, minEnemyLevel: 46 },
          { targetRank: 5, targetEnemy: 'Melgan Hunter', count: 25, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Harpy Alchemy', count: 30, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'hnt_aug_tonic',
        name: 'Tonic',
        jpName: '壮健',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases maximum stamina by a flat 500 and accelerates stamina regen.',
        effect: '+500 Max Stamina & +15% Regen',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_aug_force_filling',
        name: 'force filling',
        jpName: '力充',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Restores a chunk of stamina upon scoring a direct critical hit on a monster weak point.',
        effect: 'Stamina Refund on Weak Point Crit',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Damned Golem', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Black Griffin', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hnt_aug_secret_attack',
        name: 'secret attack',
        jpName: '隠撃',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt by 40% when firing at an enemy that is not targeting you.',
        effect: '+40% Stealth / Unnoticed Arrow Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Maltroll', count: 8, minEnemyLevel: 43 },
          { targetRank: 5, targetEnemy: 'Living Armor', count: 12, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Coopstorch Frost', count: 30, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'hnt_aug_quick_attack',
        name: 'Quick attack',
        jpName: '速撃',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases arrow firing rate and attack animation speed by 15%.',
        effect: '+15% Bow Firing & Animation Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Angles', count: 8, minEnemyLevel: 56 },
          { targetRank: 5, targetEnemy: 'Gigan Machina', count: 5, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Drake', count: 8, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_expanding_attack',
        name: 'Expanding attack',
        jpName: '拡撃',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the explosion blast radius of all incendiary and explosive arrows.',
        effect: '+35% Explosive Arrow AoE Radius',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Shadow Chimera', count: 8, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'White Chimera', count: 12, minEnemyLevel: 45 },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 10, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 8, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'hnt_aug_goriki',
        name: 'Goriki',
        jpName: '豪力',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases monster rage bar / stamina gauge reduction when striking with fully drawn heavy arrows.',
        effect: '+30% Rage Bar Depletion on Heavy Shot',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 8, minEnemyLevel: 56 },
          { targetRank: 5, targetEnemy: 'Death Knight', count: 16, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 10, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_hard_skin',
        name: 'hard skin',
        jpName: '堅皮',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical defense and prevents flinching while aiming bows.',
        effect: '+15% Defense & Super Armor while Aiming',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 46 },
          { targetRank: 5, targetEnemy: 'Alchemy Eye', count: 15, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Griffin Alchemy', count: 8, minEnemyLevel: 55 }
        ]
      },
      {
        id: 'hnt_aug_bow_shooting',
        name: 'Bow shooting',
        jpName: '弓撃',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases base damage of all bow normal attacks and custom skills by 15%.',
        effect: '+15% Total Bow Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_bakuya_retsu',
        name: 'Bakuya Retsu',
        jpName: '爆矢烈',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Enhances explosion shockwaves to deal bonus blunt strike damage and cause knockdown.',
        effect: '+25% Explosive Arrow Knockdown',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_retsu_yazan',
        name: 'Retsu Yazan',
        jpName: '烈矢斬',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Arrows deal additional slash-type damage, increasing part break and tail severing efficiency.',
        effect: '+30% Tail & Part Severing Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_rigid_structure',
        name: 'rigid structure',
        jpName: '剛構',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Prevents being knocked back or interrupted while channeling continuous arrow barrages.',
        effect: 'Barrage Interruption Immunity',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_static_shooting',
        name: 'static shooting',
        jpName: '静射',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Standing completely motionless for 2 seconds increases the damage of your next arrow by 35%.',
        effect: '+35% Damage on Stationary Shot',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_endurance',
        name: 'Endurance',
        jpName: '耐力',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Reduces stamina consumed by executing high-tier custom bow skills by 25%.',
        effect: '-25% Custom Skill Stamina Cost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hnt_aug_bow_shot',
        name: 'Bow Shot',
        jpName: '弓破',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Arrows shred 20% of target monster physical defense for 15s upon weak point impact.',
        effect: 'Enemy Defense Shred on Weak Point Hit',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'hnt_aug_explosive_arrow_crush',
        name: 'Explosive Arrow Crush',
        jpName: '爆矢砕',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases critical hit chance and armor pierce of explosive arrow detonations.',
        effect: '+20% Explosive Arrow Crit & Armor Pierce',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'hnt_aug_arrow_slash_crush',
        name: 'Arrow Slash Crush',
        jpName: '矢斬砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases damage dealt against staggered or downed enemies by 25%.',
        effect: '+25% Damage vs Downed Enemies',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'hnt_aug_sperm_increase',
        name: 'sperm increase',
        jpName: '精力増',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases maximum stamina pool and accelerates out-of-combat stamina recovery.',
        effect: '+600 Max Stamina',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'hnt_aug_static_radiation_shattering',
        name: 'Static radiation shattering',
        jpName: '静射砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Point-blank precision shots ignore 40% of enemy physical resistance.',
        effect: '40% Armor Ignore on Point-Blank Shots',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hnt_aug_the_ultimate_bow',
        name: 'The ultimate bow',
        jpName: '極弓',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Increases all arrow critical hit damage by 30% and guarantees critical hits on enraged boss weak points.',
        effect: '+30% Critical Hit Damage & Enrage Crits',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 4. PRIEST (プリースト)
  // ==========================================
  {
    id: 'priest',
    name: 'Priest',
    jpName: 'プリースト',
    role: 'Healer / Support',
    weapon: 'Staff (聖杖)',
    masterNpc: 'Camus',
    masterLocation: 'The highest floor of the Pawn Cathedral',
    unlockRequirement: 'Starter Vocation (Available immediately from Level 1)',
    minVersion: '3.1',
    playstyle: 'Dedicated holy healer creating curative zones, defensive barriers, and granting holy weapon buffs.',
    customSkills: [
      {
        id: 'prs_attack_riser',
        name: 'Attack Riser',
        jpName: 'アタックライザー',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Emits an aura of Attack and Magick power. Applies a temporary increase to nearby allies. Can be used with Field Shift.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bull Ape', count: 10, minEnemyLevel: 10 },
          { targetRank: 7, targetEnemy: 'Hobgoblin', count: 30, minEnemyLevel: 18 },
          { targetRank: 8, targetEnemy: 'Hobgoblin Leader', count: 10, minEnemyLevel: 18 },
          { targetRank: 9, targetEnemy: 'White', count: 8, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Dread Ape', count: 12, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'prs_defense_riser',
        name: 'Defense Riser',
        jpName: 'ディフェンスライザー',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Emits an aura of Attack and Magick defense. Applies a temporary increase to nearby allies. Can be used with Field Shift.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Sling Forest Goblin', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Rogue Hunter', count: 30, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Orc Soldier', count: 40, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 15, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'prs_seraphim_flap',
        name: 'Seraphim Flap',
        jpName: 'セラフィムフラップ',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'After charging, launch tracking projectiles. Fires magick spheres of Holy attribute.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Alchemy', count: 8, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Large Lizard', count: 25, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Skeleton Mage', count: 30, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'prs_guard_bit',
        name: 'Guard Bit',
        jpName: 'ガードビット',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Creates 3 magick spheres that rapidly orbit around you. Nullifies one incoming attack per sphere.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Mage', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Redcap Fighter', count: 50, minEnemyLevel: 8 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 9, minEnemyLevel: 16 },
          { targetRank: 10, targetEnemy: 'Ent', count: 10, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'prs_healing_spot',
        name: 'Healing spot',
        jpName: 'ヒーリングスポット',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Creates a healing zone that rapidly restores HP. Only recovers grey health. Damages undead.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Redcap', count: 13, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Rock Lizard', count: 30, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'prs_cure_spot',
        name: 'Cure Spot',
        jpName: 'キュアスポット',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Creates a magick area that instantly cures debilitations. Damages undead.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Large Sulfur', count: 10, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Troll', count: 12, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 10, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Chimera', count: 15, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'prs_sacred_shine',
        name: 'Sacred Shine',
        jpName: 'セイクリッドシャイン',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'After charging, fire a magick sphere that emits an intense light of the Holy attribute in a wide area.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Orc Soldier', count: 30, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Troll', count: 10, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Colossus', count: 6, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Lindworm', count: 10, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'prs_soul_explosion',
        name: 'Soul Explosion',
        jpName: 'ソウルエクスプロージョン',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Channels magick int your body - when HP reaches to zero, triggers catastrophic blast that ravages nearby foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Grimwarg', count: 30, minEnemyLevel: 35 },
          { targetRank: 8, targetEnemy: 'Golem', count: 10, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 10, minEnemyLevel: 35 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_solid_riser',
        name: 'SolidRiser',
        jpName: 'ソリッドライザー',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Emits an aura of Endurance. Applies a temporary increase to nearby allies. Can be used with Field Shift.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Armor Cyclops', count: 5, minEnemyLevel: 35 },
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 12, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Orc Butler', count: 20, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Maltroll', count: 6, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Silver Roar', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 5, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'White Chimera', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_energy_spot',
        name: 'Energy Spot',
        jpName: 'エナジースポット',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Creates a magick aura that rapidly regenerates Stamina. Damages undead.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Colossus', count: 5, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Griffin', count: 5, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Ent', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Cockatrice', count: 10, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Witch', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Elder Dragon', count: 10, minEnemyLevel: 45 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_zone_of_the_gods',
        name: 'Zone of the Gods',
        jpName: 'ゾーンオブザゴッド',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Creates a wide magick area of the Holy attribute centered on yourself, dealing damage to enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Warrior', count: 40, minEnemyLevel: 46 },
          { targetRank: 7, targetEnemy: 'Damned Sling Goblin', count: 50, minEnemyLevel: 46 },
          { targetRank: 8, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 46 },
          { targetRank: 8, targetEnemy: 'Living Armor', count: 20, minEnemyLevel: 46 },
          { targetRank: 9, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Empress Ghost', count: 5, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'prs_quick_charge',
        name: 'Quick Charge',
        jpName: 'クイックチャージ',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Focus a prayer on nearby allies, hastening the charging of all their skills that display a charge gauge.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 5, minEnemyLevel: 56 },
          { targetRank: 7, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 56 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 5, minEnemyLevel: 58 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 56 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_solars_riser',
        name: 'Solars Riser',
        jpName: 'ソラリスライザー',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Deploys a magick aura that temporarily boosts life recovery around you. Can be used with Field Shift.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_blast_addition',
        name: 'Blast Addition',
        jpName: 'ブラストエディット',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Creates a turret that fires additional shots when hit by Blast Bit. Lasts for limited time.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 10, targetEnemy: 'Tarasque', count: 2, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 3, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'prs_norm_burst',
        name: 'Holy Burst (ホーリーバースト)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Releases a shockwave of holy magick from the staff.'
      },
      {
        id: 'prs_norm_heal_aura',
        name: 'Heal Aura (ヒールオーラ)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Channels an expanding restorative aura centered on caster to heal allies.'
      }
    ],
    augments: [
      {
        id: 'prs_aug_flame_retardant',
        name: 'Flame retardant',
        jpName: '防炎',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases resistance to Fire elemental attacks and burning debuffs.',
        effect: '+25% Fire Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sling Goblin', count: 10, minEnemyLevel: 1 },
          { targetRank: 6, targetEnemy: 'Harpy', count: 50, minEnemyLevel: 6 }
        ]
      },
      {
        id: 'prs_aug_flame_reduction',
        name: 'flame reduction',
        jpName: '減炎',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Reduces Fire damage taken by a flat percentage.',
        effect: '-20% Fire Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Forest Goblin Fighter', count: 5, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Bull Ape', count: 25, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'prs_aug_defense_assistance',
        name: 'Defense assistance',
        jpName: '防援',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases the defense boost granted to allies by Defense Riser.',
        effect: '+20% Defense Riser Efficacy',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goblin Leader', count: 7, minEnemyLevel: 5 },
          { targetRank: 6, targetEnemy: 'Skeleton Mage', count: 30, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'prs_aug_full_of_soul',
        name: 'full of soul',
        jpName: '霊充',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases stamina recovery speed when chanting holy spells.',
        effect: '+25% Stamina Recovery While Chanting',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Sorcerer', count: 9, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'prs_aug_anti_icing',
        name: 'Anti-icing',
        jpName: '防氷',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases resistance to Ice element damage and freezing status effects.',
        effect: '+25% Ice Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Healer', count: 7, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 25, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'prs_aug_ice_reduction',
        name: 'Ice reduction',
        jpName: '減氷',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces Ice damage taken by a flat percentage.',
        effect: '-20% Ice Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Lizardman', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Madman', count: 50, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'prs_aug_masuke',
        name: 'Masuke',
        jpName: '魔援',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases magick attack granted to party members by Attack Riser.',
        effect: '+20% Magic ATK Buff on Attack Riser',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sulfur Lizard', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Ogre', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'prs_aug_lightning_protection',
        name: 'Lightning protection',
        jpName: '防雷',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases resistance to Thunder elemental damage and paralysis.',
        effect: '+25% Thunder Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Sorcerer', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'prs_aug_lightning_reduction',
        name: 'Lightning reduction',
        jpName: '減雷',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces Thunder damage taken by a flat percentage.',
        effect: '-20% Thunder Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Blue Newt', count: 10, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Lindworm', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'prs_aug_bone_aim',
        name: 'Bone aim',
        jpName: '骨狙',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against Skeleton and bone undead enemies.',
        effect: '+25% Damage vs Skeleton Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Mage', count: 80, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'prs_aug_corruption_target',
        name: 'Corruption target',
        jpName: '腐狙',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against Zombie and rotting undead enemies.',
        effect: '+25% Damage vs Rotting Undead',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Fat Undead', count: 30, minEnemyLevel: 25 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'prs_aug_bone_care',
        name: 'Bone care',
        jpName: '骨護',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Skeleton and bone undead monsters.',
        effect: '-25% Damage Taken from Skeletons',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Night', count: 80, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'White', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'prs_aug_corruption',
        name: 'Corruption',
        jpName: '腐護',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Zombie and decaying undead monsters.',
        effect: '-25% Damage Taken from Decaying Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sword Undead', count: 30, minEnemyLevel: 35 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'prs_aug_palliative_treatment',
        name: 'palliative treatment',
        jpName: '緩療',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Extends the duration of Healing Spot and regenerative aura effects.',
        effect: '+30% Heal Spot Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Maltroll', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_aug_patience',
        name: 'patience',
        jpName: '忍耐',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage taken while chanting spells and casting holy wards.',
        effect: '-30% Damage Taken While Chanting',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'General Oak', count: 10, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Elder Dragon', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 8, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_aug_anti_holy',
        name: 'Anti-holy',
        jpName: '防聖',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases Holy elemental resistance.',
        effect: '+25% Holy Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_aug_darkness_prevention',
        name: 'Darkness prevention',
        jpName: '防闇',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases Dark elemental resistance and curse resistance.',
        effect: '+25% Dark Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'White', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Witch', count: 10, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_aug_attack',
        name: 'attack',
        jpName: '攻援',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical attack granted to party members by Attack Riser.',
        effect: '+20% Physical ATK Buff on Attack Riser',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Armor Cyclops', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_aug_support',
        name: 'support',
        jpName: '後援',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Expands the radius and area of effect of all Riser glyph zones.',
        effect: '+35% Riser Glyph Area Radius',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Living Armor', count: 6, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'prs_aug_desanctification',
        name: 'desanctification',
        jpName: '減聖',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces Holy damage taken by a flat percentage.',
        effect: '-20% Holy Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Crystal Eye', count: 15, minEnemyLevel: 46 },
          { targetRank: 5, targetEnemy: 'Lapis Lazuli Eye', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 8, minEnemyLevel: 45 }
        ]
      },
      {
        id: 'prs_aug_darkening',
        name: 'darkening',
        jpName: '減闇',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces Dark damage taken by a flat percentage.',
        effect: '-20% Dark Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 12, minEnemyLevel: 46 },
          { targetRank: 5, targetEnemy: 'White', count: 12, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Coopstorch Frost', count: 30, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'prs_aug_jiran',
        name: 'Jiran',
        jpName: '治乱',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Curing an ally of status debuffs also restores 20% of their maximum health.',
        effect: 'Status Cure also Heals 20% HP',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Alchemy Eye', count: 15, minEnemyLevel: 56 },
          { targetRank: 5, targetEnemy: 'Harpy Alchemy', count: 50, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Ghoul', count: 10, minEnemyLevel: 52 },
          { targetRank: 6, targetEnemy: 'Skull Lord', count: 20, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'prs_aug_divine_protection',
        name: 'Divine protection',
        jpName: '神護',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Party members in your holy fields take 15% less damage from all sources.',
        effect: '-15% Damage Taken in Holy Fields',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Shadow Chimera', count: 8, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Gigan Machina', count: 2, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Griffin Alchemy', count: 2, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'prs_aug_long_dew',
        name: 'long dew',
        jpName: '長露',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Extends the duration of weapon holy buffs and enchants on allies.',
        effect: '+40% Weapon Holy Buff Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Geo Golem', count: 8, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 12, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'prs_aug_encouragement',
        name: 'encouragement',
        jpName: '激励',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Restoring an ally to full health temporarily grants them +15% attack speed.',
        effect: '+15% Attack Speed at Full HP Heal',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Angles', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_aug_healing_spirit_poem',
        name: 'Healing Spirit Poem',
        jpName: '療霊詩',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases healing potency of all restorative spells by 25%.',
        effect: '+25% Healing Spell Potency',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_aug_broken_ball',
        name: 'Broken ball',
        jpName: '砕球',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage and stagger power when Guard Bits absorb and detonate on impact.',
        effect: '+30% Guard Bit Detonation Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_aug_sacred_energy',
        name: 'Sacred energy',
        jpName: '聖気',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases holy magic damage dealt by Sacred Shine and celestial spells.',
        effect: '+20% Holy Spell Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_aug_fuma',
        name: 'Fuma',
        jpName: '封魔',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases chance of inflicting silence and spell-lock on enemy spellcasters.',
        effect: '+30% Silence Infliction Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_aug_shocking',
        name: 'Shocking',
        jpName: '震撃',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases knockdown power and monster rage bar depletion of holy burst attacks.',
        effect: '+25% Holy Knockdown Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_aug_reduced_suction',
        name: 'reduced suction',
        jpName: '減吸',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Reduces stamina consumption while maintaining continuous chant states.',
        effect: '-35% Sustained Chant Stamina Cost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'prs_aug_healing_energy_endurance',
        name: 'Healing Energy Endurance',
        jpName: '療気耐',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Grants continuous slow health regeneration while standing inside any holy field.',
        effect: 'Continuous HP Regen in Holy Zones',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'prs_aug_ball_shattering',
        name: 'Ball shattering',
        jpName: '球砕撃',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases the number of orbiting Guard Bits summoned by 2 additional spheres.',
        effect: '+2 Maximum Guard Bits',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'prs_aug_holy_spirit_fierce',
        name: 'Holy spirit fierce',
        jpName: '聖霊猛',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Converts 15% of your total healing power into bonus magic attack power.',
        effect: '+15% Healing Power Converted to Magic ATK',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'prs_aug_demon_fierce',
        name: 'Demon fierce',
        jpName: '魔霊猛',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases holy damage dealt against Demonic, Corrupted, and Frenzied boss monsters.',
        effect: '+25% Damage vs Corrupted & Demons',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'prs_aug_shredding',
        name: 'Shredding',
        jpName: '破撃',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Soul Explosion and celestial attacks shred 20% of enemy magic defense for 20s.',
        effect: 'Enemy Magic Defense Shred on Burst',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'prs_aug_hardness',
        name: 'Hardness',
        jpName: '硬直',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Grants total invulnerability frames during the initial 3 seconds of entering a SolidRiser or Solar Riser ward.',
        effect: '3s Invulnerability on Zone Entry',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 5. SHIELD SAGE (シールドセージ)
  // ==========================================
  {
    id: 'shield_sage',
    name: 'Shield Sage',
    jpName: 'シールドセージ',
    role: 'Tank',
    weapon: 'Great Shield & Wand (大盾・ロッド)',
    masterNpc: 'Rudolf (ルドルフ)',
    masterLocation: 'Moltova Lighthouse',
    unlockRequirement: 'Starter Vocation (Available immediately from Level 1)',
    minVersion: '3.1',
    playstyle: 'Ultimate frontline tank absorbing monster attacks into the Great Shield to discharge elemental enchants and aggro taunts.',
    customSkills: [
      {
        id: 'ssg_force_shield',
        name: 'Force Shield',
        jpName: 'フォースシールド',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Medium',
        description: 'For a period of time, when an attack is blocked, a shockwave will be emitted.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Lizardman', count: 40, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Slinghobgoblin', count: 25, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Hobgoblin Leader', count: 10, minEnemyLevel: 18 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 5, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Troll', count: 8, minEnemyLevel: 16 }
        ]
      },
      {
        id: 'ssg_slow_light',
        name: 'Slow Light',
        jpName: 'スロウライト',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Continuously shine rod’s radiance on foes to build Torpor status. When force gauge ↑1, consumes to enhance effect.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'wolf', count: 40, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Rogue Guardian', count: 30, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Skeleton Mage', count: 20, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'White', count: 8, minEnemyLevel: 16 }
        ]
      },
      {
        id: 'ssg_hypnoslight',
        name: 'Hypnoslight',
        jpName: 'ヒュプノスライト',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Continuously shine rod’s radiance on foes to build Sleep status. When force gauge ↑1, consumes to enhance effect.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Slime', count: 80, minEnemyLevel: 1 },
          { targetRank: 8, targetEnemy: 'Forest Goblin', count: 50, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 18, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'ssg_lampartrade',
        name: 'Lampartrade',
        jpName: 'ランパートレイド',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Medium',
        description: 'Raises greatshield and charges forward, knocking back enemies in path. When force gauge ↑1, consumes to boost attack.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bull Ape', count: 20, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Snow Harpy', count: 50, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Rogue Guardian', count: 30, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ssg_element_glow',
        name: 'Element Glow',
        jpName: 'エレメントグロウ',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Low',
        description: 'Provides allies with elemental damage and status resistance (fire, ice, thunder, holy, dark based on rod). When force gauge ↑1, uses to greatly extend duration.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Glutton Wooze', count: 30, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Sword Undead', count: 30, minEnemyLevel: 25 },
          { targetRank: 9, targetEnemy: 'Armor Cyclops', count: 10, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Colossus', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ssg_earthshake',
        name: 'Earthshake',
        jpName: 'アースシェイク',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Shake the earth, staggering enemies in a wide range. Staggers large enemies and some formidable foes. When force gauge ↑1, uses to shorten casting time.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Sludge Man', count: 30, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Cyclops', count: 10, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Ogre', count: 12, minEnemyLevel: 25 },
          { targetRank: 10, targetEnemy: 'Griffin', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ssg_bind_anchor',
        name: 'Bind anchor',
        jpName: 'バインドアンカー',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Medium',
        description: 'Fires a magical anchor to restrain foes. Against large and special enemies builds ATK↓, MAG↓, DEF↓ and RES↓ status.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Snow Harpy', count: 30, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Orb Enemy', count: 20, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Cyclops', count: 10, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Lindworm', count: 6, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ssg_st_wall',
        name: 'St. Wall',
        jpName: 'セントウォール',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Create walls of magic that increase the range of your shield’s ability to block.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Troll', count: 10, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 10, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 4, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_element_light',
        name: 'Element Light',
        jpName: 'エレメントライト',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Medium',
        description: 'Emits light that builds elemental defense down status (fire/ice/thunder/holy/dark based on rod). When force gauge ↑1, consumes to enhance effect.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 15, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Troll', count: 10, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Bull Ape', count: 15, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'White Chimera', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_stun_burst',
        name: 'Stun Burst',
        jpName: 'スタンバースト',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Parries attacks with greatshield, dealing impact that builds Stun status. When force gauge ↑1, consumes to enhance effect.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Griffin', count: 5, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'General Oak', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Colossus', count: 3, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Witch', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_hands_of_god',
        name: 'Hands of God',
        jpName: 'ハンズオブゴッド',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Sustained',
        description: 'Guard an area around you, nullifying damage for all allies nearby.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Damned Wolf', count: 20, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Banded Guarder', count: 10, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Black Griffin', count: 3, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Living Armor', count: 10, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ssg_force_anchor',
        name: 'Force anchor',
        jpName: 'フォースアンカー',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Medium',
        description: 'Fires a magical anchor towards a foe, and gradually fill the force gauge and aggression meter if it hits. While the anchor is active, you can move in any direction with the left stick.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 3, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Cyclops', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_stone_light',
        name: 'Stone Light',
        jpName: 'ストーンライト',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Continuously shine rod’s radiance on foes to build Petrify status. When force gauge ↑1, consumes to enhance effect.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_protection_swing',
        name: 'Protection Swing',
        jpName: 'プロテクションスイング',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Swings greatshield while pulling in nearby foes. Blocking attacks boosts its power. When force gauge ↑1, consumes to enhance effect.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 10, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'ssg_norm_guard',
        name: 'Force Guard (フォースガード)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Blocks with Great Shield to absorb elemental force into gauge.'
      },
      {
        id: 'ssg_norm_burst',
        name: 'Force Burst (フォースバースト)',
        type: 'normal',
        unlockLevel: 6,
        maxRank: 6,
        description: 'Discharges stored force gauge in a powerful forward blast.'
      }
    ],
    augments: [
      {
        id: 'ssg_aug_hesho',
        name: 'Hesho',
        jpName: '減衝',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Reduces stamina consumption when blocking heavy physical and blunt attacks with Great Shield.',
        effect: '-25% Guard Stamina Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goblin', count: 40, minEnemyLevel: 1 },
          { targetRank: 6, targetEnemy: 'Hobgoblin Leader', count: 20, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'ssg_aug_great_defense',
        name: 'great defense',
        jpName: '巨防',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases physical defense and guard stability against giant-category boss monsters.',
        effect: '+20% Defense vs Giant Monsters',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Shield Goblin', count: 25, minEnemyLevel: 5 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 20, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'ssg_aug_unique_color',
        name: 'Unique color',
        jpName: '異彩',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases aggro generation rate, drawing more monster attention to yourself.',
        effect: '+30% Threat / Aggro Generation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goblin Fighter', count: 30, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Rogue Guardian', count: 4, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'ssg_aug_overcharging',
        name: 'Overcharging',
        jpName: '過充',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases force gauge absorption amount when performing a Just Guard.',
        effect: '+35% Force Gauge Gain on Just Guard',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'wolf', count: 40, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'ssg_aug_suppression',
        name: 'Suppression',
        jpName: '抑制',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces monster rage build-up when absorbing and blocking attacks.',
        effect: '-25% Monster Rage Generation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 15 },
          { targetRank: 6, targetEnemy: 'Skeleton Alchemy', count: 30, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'ssg_aug_enlightenment',
        name: 'enlightenment',
        jpName: '啓示',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Extends the duration of weapon elemental enchants granted by Element Glow.',
        effect: '+40% Element Glow Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Guardian', count: 15, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ssg_aug_lively',
        name: 'Lively',
        jpName: '活性',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Accelerates health and stamina recovery speed while maintaining a guarding stance.',
        effect: '+25% Guard Recovery Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Madman', count: 30, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ssg_aug_nagamori',
        name: 'Nagamori',
        jpName: '長守',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Extends the duration of St. Wall and divine defensive barrier skills.',
        effect: '+30% Defensive Barrier Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sword Undead', count: 40, minEnemyLevel: 25 },
          { targetRank: 6, targetEnemy: 'Troll', count: 8, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ssg_aug_discernment',
        name: 'discernment',
        jpName: '洞察',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Widens the timing window for executing a successful Just Guard.',
        effect: '+0.15s Just Guard Timing Window',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 25 },
          { targetRank: 6, targetEnemy: 'Ent', count: 8, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ssg_aug_resistance',
        name: 'resistance',
        jpName: '耐性',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases elemental and status ailment resistances while holding Great Shield guard.',
        effect: '+25% Status & Elemental Guard Resist',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Colossus', count: 2, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ssg_aug_robust',
        name: 'Robust',
        jpName: '堅牢',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Prevents guard break and stagger from unblockable monster attacks when stamina is above 50%.',
        effect: 'Guard Break Immunity at >50% Stamina',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ogre', count: 8, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ssg_aug_greedy',
        name: 'greedy',
        jpName: '強欲',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases the amount of force absorbed when executing Force Anchor and draining skills.',
        effect: '+30% Force Drain Efficiency',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Oaktrooper', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_aug_series_broadcast',
        name: 'series broadcast',
        jpName: '連播',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases the area of effect and duration of Taunt / Provoke waves.',
        effect: '+35% Provoke AoE & Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Maltroll', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Elder Dragon', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Golem', count: 3, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ssg_aug_devotion',
        name: 'Devotion',
        jpName: '献身',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Absorbs a percentage of damage dealt to nearby allies and redirects it to your Great Shield.',
        effect: '+20% Ally Damage Redirection',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'White', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Lindworm', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_aug_perseverance',
        name: 'perseverance',
        jpName: '忍耐',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage taken by 40% when health drops below 30%.',
        effect: '+40% Damage Reduction at Low HP',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ent', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_aug_eucharist',
        name: 'Eucharist',
        jpName: '聖餐',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Restores health to all party members whenever a full-charge Force Burst is unleashed.',
        effect: 'Party HP Heal on Force Burst',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Captain Oak', count: 15, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_aug_up_and_coming',
        name: 'Up-and-coming',
        jpName: '気鋭',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical knockdown power of shield bash and thrust strikes.',
        effect: '+25% Shield Knockdown Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_aug_cumulative_suction',
        name: 'cumulative suction',
        jpName: '蓄吸',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Retains force gauge charges for longer duration without decaying.',
        effect: 'Prevents Force Gauge Decay',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 46 },
          { targetRank: 5, targetEnemy: 'Wolf Alchemy', count: 10, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Melgangarder', count: 7, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ssg_aug_kisei',
        name: 'Kisei',
        jpName: '既成',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Starts battles with 1 full stock of absorbed elemental force gauge automatically.',
        effect: '+1 Initial Force Gauge Stock',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Troll', count: 8, minEnemyLevel: 43 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 17, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_aug_immediately',
        name: 'Immediately',
        jpName: '即応',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces casting time and wind-up animation of light-channeling shield skills.',
        effect: '-30% Light Skill Cast Time',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Ghoul', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ssg_aug_strong',
        name: 'strong',
        jpName: '剛勇',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Immunity to being knocked back or staggered while executing shield skills.',
        effect: 'Super Armor during Shield Skills',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Empress Ghost', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ssg_aug_activation',
        name: 'Activation',
        jpName: '励起',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases magic attack and debuff infliction rate of absorbed force elements.',
        effect: '+25% Elemental Force Debuff Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Griffin Alchemy', count: 2, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ssg_aug_strong_health',
        name: 'strong health',
        jpName: '壮健',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases maximum health by a flat 500 and increases defense by 10%.',
        effect: '+500 Max HP & +10% Defense',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Angles', count: 2, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Drake', count: 8, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'ssg_aug_intense_suction',
        name: 'intense suction',
        jpName: '猛吸',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Doubles the rate of force gauge fill when blocking multi-hit monster barrages.',
        effect: '+50% Multi-Hit Block Gauge Fill',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Empress Ghost', count: 4, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Alchemy Eye', count: 5, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 4, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ssg_aug_loose_blade',
        name: 'loose blade',
        jpName: '緩刃',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Attacking an enemy after Just Guard reduces their attack power by 20% for 15s.',
        effect: '-20% Enemy ATK on Just Guard Riposte',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Death Knight', count: 4, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Gigan Machina', count: 2, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Melgan Fighter', count: 7, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ssg_aug_defeat_the_shield',
        name: 'Defeat the shield',
        jpName: '盾撃破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt by shield bashes and shield strike abilities.',
        effect: '+25% Shield Strike Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_aug_retsu',
        name: 'Retsu',
        jpName: '烈塞',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Enhances block efficacy against unguardable unblockable attacks, reducing breakthrough damage by 60%.',
        effect: '-60% Unblockable Breakthrough DMG',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_aug_attack_and_destroy',
        name: 'Attack and destroy',
        jpName: '撃砕',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases monster rage / stamina gauge depletion when hitting with Great Shield strikes.',
        effect: '+30% Shield Rage Gauge Depletion',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_aug_protection',
        name: 'protection',
        jpName: '守護',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Creates a protective defensive aura around yourself that boosts all party defense by 15%.',
        effect: '+15% Party Defense Aura',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_aug_shield_order_retsu',
        name: 'Shield Order Retsu',
        jpName: '盾陣烈',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the radius and duration of Hands of God and St. Wall fields.',
        effect: '+30% Sanctuary Field Radius & Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_aug_concentrated_gaze',
        name: 'concentrated gaze',
        jpName: '凝視',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Accelerates the speed at which status ailments build up on enemies under Slow Light or Stone Light beams.',
        effect: '+35% Light Beam Status Buildup',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ssg_aug_shield_smash',
        name: 'Shield Smash',
        jpName: '盾砕',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases critical hit chance and armor pierce of Protection Swing and heavy shield blows.',
        effect: '+20% Shield Crit & Armor Pierce',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ssg_aug_attached_to_the_crushed',
        name: 'Attached to the crushed',
        jpName: '附砕',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Attacking an enemy afflicted with an elemental debuff deals 30% additional bonus strike damage.',
        effect: '+30% Damage vs Element Debuffed Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ssg_aug_attack_and_attack',
        name: 'attack and attack',
        jpName: '攻防',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Converts 10% of total Shield Guard Power into bonus physical and magic attack power.',
        effect: '+10% Guard Power Converted to ATK',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ssg_aug_shield_breaking',
        name: 'Shield breaking',
        jpName: '盾破',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Shield strikes inflict heavy defense reduction on enemies for 20 seconds.',
        effect: 'Enemy Defense Reduction on Shield Strike',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ssg_aug_shield_break',
        name: 'Shield Break',
        jpName: '盾砕撃',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Greatly increases the chance to cause immediate stagger and knockdown with shield counter blows.',
        effect: '+35% Stagger Chance on Shield Counter',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'ssg_aug_good_vision',
        name: 'good vision',
        jpName: '善視',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Absorbing an attack with Just Guard grants full stamina restoration and temporary complete status immunity.',
        effect: 'Full Stamina Restore on Just Guard',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 6. SEEKER (シーカー)
  // ==========================================
  {
    id: 'seeker',
    name: 'Seeker',
    jpName: 'シーカー',
    role: 'Attacker (Physical)',
    weapon: 'Daggers & Grapple Wire (ダガー・ロープ)',
    masterNpc: 'Chester',
    masterLocation: 'Home in Dowe Valley',
    unlockRequirement: 'Clear Chapter 2 Story & Complete Seeker Unlock Trial',
    minVersion: '3.1',
    playstyle: 'High-agility acrobatic rogue utilizing grapple ropes, whirlwind daggers, and explosive traps.',
    customSkills: [
      {
        id: 'skr_kamaitachi',
        name: 'Kamaitachi',
        jpName: 'かまいたち',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Unleashes a rapid storm of twin dagger slashes creating vacuum blades that carve through enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Forest Goblin', count: 20, minEnemyLevel: 10 },
          { targetRank: 7, targetEnemy: 'Skeleton Mage', count: 30, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Skeleton Night', count: 30, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 5, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 10, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'skr_agito_split',
        name: 'Agito Split',
        jpName: 'アギト裂き',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'A vicious upward double dagger strike designed to tear open monster jaws and vulnerable heads.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bull Ape', count: 10, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Goblin Alchemy', count: 40, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Large Lizard', count: 30, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Troll', count: 10, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'skr_counter_kick',
        name: 'Counter kick',
        jpName: '返し蹴り',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Medium',
        description: 'Performs an agile evasive backstep followed by a powerful counter kick to stagger charging foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Fat Undead', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Sludge Man', count: 30, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Troll', count: 10, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Ent', count: 10, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'skr_law_of_attraction',
        name: 'Law of Attraction',
        jpName: '引寄せの法',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Low',
        description: 'Fires a grappling rope hook to rapidly yank small enemies or pull yourself toward large foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Rock Lizard', count: 20, minEnemyLevel: 20 },
          { targetRank: 7, targetEnemy: 'Goblin Bomber', count: 20, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Harpy', count: 20, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Rogue Seeker', count: 30, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Armor Cyclops', count: 12, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'skr_hayabusa_drop',
        name: 'Hayabusa Drop',
        jpName: '隼落とし',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Leaps high into the air and plunges straight down with twin daggers, pinning targets to the floor.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Harpy', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Cyclops', count: 8, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Colossus', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'skr_kick_jump',
        name: 'Kick jump',
        jpName: '跳蹴',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Low',
        description: 'Kicks off a monster surface to launch high into the sky and reset mid-air mobility options.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Redcap Fighter', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Dread Ape', count: 12, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Ogre', count: 12, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Griffin', count: 6, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'skr_readjust_stance',
        name: 'Readjust your stance',
        jpName: '構え直し',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Low',
        description: 'Cancels animation recovery frames instantly, enabling seamless combos and uninterrupted evasion.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Dread Ape', count: 3, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Blue Newt', count: 20, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Forest Goblin', count: 30, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Lindworm', count: 6, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 6, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'skr_flame_lines',
        name: 'Flame lines',
        jpName: '火炎線',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'Lays down ignited rope lines across the ground that detonate when enemies cross over them.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Orb Enemy', count: 25, minEnemyLevel: 35 },
          { targetRank: 9, targetEnemy: 'Griffin', count: 4, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_whirlwind_blade',
        name: 'Whirlwind Blade',
        jpName: '旋風刃',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Spins rapidly like a cyclone with daggers extended, slicing everything caught in the radius.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Golem', count: 3, minEnemyLevel: 30 },
          { targetRank: 7, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Maltroll', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_leg_cutting_rope',
        name: 'Leg-cutting rope',
        jpName: '脚刈りロープ',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Sweeps a weighted grapple rope around monster legs to trip and knock down massive boss foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 8, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Colossus', count: 3, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'White Chimera', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Direwolf', count: 15, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_flame_coat',
        name: 'flame coat',
        jpName: '火炎衣',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'Sustained',
        description: 'Shrouds your body in roaring flames, greatly boosting attack speed, damage, and staggering nearby foes at the cost of continuous HP drain.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bandit Seeker', count: 20, minEnemyLevel: 46 },
          { targetRank: 7, targetEnemy: 'Damned Goblin', count: 50, minEnemyLevel: 46 },
          { targetRank: 8, targetEnemy: 'Empress Ghost', count: 4, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Living Armor', count: 10, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 47 },
          { targetRank: 9, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'skr_assassination_vandalism',
        name: 'Assassination by vandalism',
        jpName: '乱殺',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Drives into the enemy with a ruthless flurry of critical dagger assassinations, obliterating weak points.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 5, minEnemyLevel: 56 },
          { targetRank: 7, targetEnemy: 'Geo Golem', count: 5, minEnemyLevel: 56 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_blazing_blade',
        name: 'Blazing Blade',
        jpName: '炎刃',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'Ignites twin daggers with volcanic energy, delivering hyper-fast fiery cross-slashes that melt monster defenses.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_jumping_hawk_slash',
        name: 'Jumping Hawk Slash',
        jpName: '跳鷹斬',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Performs a soaring aerial launch followed by a devastating diving hawk cross-slash of supreme destructive power.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 10, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'skr_norm_acro',
        name: 'Acrobatic Flip (影身)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Flips off monster surfaces to maintain mid-air momentum.'
      },
      {
        id: 'skr_norm_grapple_wire',
        name: 'Grapple Hook (ロープアクション)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Launches grapple wire to scale cliffs and latch onto large monster bodies.'
      }
    ],
    augments: [
      {
        id: 'skr_aug_yuaku',
        name: 'Yuaku',
        jpName: '誘惑',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases chance of drawing enemy attention and distracting foes away from allies.',
        effect: '+20% Distraction Aggro Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Shield Goblin', count: 7, minEnemyLevel: 5 },
          { targetRank: 6, targetEnemy: 'Orc Soldier', count: 30, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'skr_aug_overthrow',
        name: 'Overthrow',
        jpName: '転倒',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases knockdown power and stagger chance when striking monster legs.',
        effect: '+25% Leg Attack Knockdown Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Seeker', count: 7, minEnemyLevel: 5 },
          { targetRank: 6, targetEnemy: 'Lizardman', count: 25, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'skr_aug_grasp',
        name: 'Grasp',
        jpName: '把持',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces stamina drain while clinging to large monster bodies.',
        effect: '-30% Clinging Stamina Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Forest Goblin Fighter', count: 7, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Oak Aimer', count: 20, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'skr_aug_longline',
        name: 'longline',
        jpName: '長縄',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Extends the maximum reach and speed of all grapple rope actions.',
        effect: '+35% Grapple Rope Range',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Night', count: 12, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'White', count: 10, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'skr_aug_takamai',
        name: 'Takamai',
        jpName: '高舞',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases attack power while executing aerial combos mid-air.',
        effect: '+20% Aerial Attack Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Hobgoblin Fighter', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'skr_aug_giants',
        name: 'Giants',
        jpName: '巨討',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against Giant-category boss monsters.',
        effect: '+20% Damage vs Giant Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 2, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Colossus', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'skr_aug_shock_resistant',
        name: 'Shock-resistant',
        jpName: '耐震',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Immunity to monster tremor shockwaves and roaring flinches when clinging.',
        effect: 'Tremor & Roar Immunity While Clinging',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 2, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Ent', count: 10, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'skr_aug_rope_fall',
        name: 'Rope fall',
        jpName: '縄落',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases knockdown power and down duration when yanking enemies down with rope.',
        effect: '+30% Rope Knockdown Stun Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Grimwarg', count: 10, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'skr_aug_big_aim',
        name: 'Big aim',
        jpName: '大狙',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases critical strike rate when hitting monster core weak points.',
        effect: '+15% Weak Point Critical Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 3, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Golem', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'skr_aug_power_jump',
        name: 'Power jump',
        jpName: '力跳',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases vertical jump height and aerial leap velocity.',
        effect: '+30% Jump Height',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Seeker', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Troll', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'skr_aug_light_jump',
        name: 'Light jump',
        jpName: '軽跳',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces stamina consumption for jumping, wall kicking, and mid-air flips.',
        effect: '-40% Jump Stamina Cost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Lindworm', count: 2, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 8, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'skr_aug_air_raid',
        name: 'Air raid',
        jpName: '空撃',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Greatly increases damage dealt by falling plunging strikes.',
        effect: '+25% Plunging Strike Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Griffin', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Elder Dragon', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_aug_high_jump',
        name: 'High jump',
        jpName: '高跳',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Grants invulnerability frames at the start of high jumps and kick jumps.',
        effect: 'I-Frames on Jump Start',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Oaktrooper', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_aug_adhesive',
        name: 'Adhesive',
        jpName: '吸着',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases resistance to being shaken off when monsters thrash while climbing.',
        effect: 'Prevents Thrash Dislodge',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 2, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'General Oak', count: 10, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Grimwarg', count: 30, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_aug_defense',
        name: 'defense',
        jpName: '防身',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received while clinging onto monster bodies.',
        effect: '-25% Damage Taken While Clinging',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ent', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Golem', count: 8, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'skr_aug_healthy_clothes',
        name: 'Healthy clothes',
        jpName: '健衣',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces self-inflicted HP drain when maintaining Flame Coat active.',
        effect: '-35% Flame Coat Self-Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Maltroll', count: 8, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_aug_arm_strength',
        name: 'Arm strength',
        jpName: '腕力',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical attack power and climbing strike speed on monster weak points.',
        effect: '+20% Climbing Attack Speed & DMG',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_aug_escape',
        name: 'Escape',
        jpName: '脱兎',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases movement speed and evasion roll distance when health is below 40%.',
        effect: '+30% Movement & Roll Distance at Low HP',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Geo Golem', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Griffin Alchemy', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'skr_aug_jump_escape',
        name: 'jump escape',
        jpName: '跳脱',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Instantly recovers from knockdown or stagger by performing a mid-air wire recovery.',
        effect: 'Instant Wire Recovery from Stagger',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Melganseeker', count: 7, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'skr_aug_grip_resistance',
        name: 'Grip resistance',
        jpName: '握耐',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces stamina cost when rapidly shaking free from monster grabs.',
        effect: '-50% Stamina on Escaping Grabs',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Angles', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_aug_chin_itsu',
        name: "Chin'itsu",
        jpName: '鎮静',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces monster rage build-up when striking weak points repeatedly.',
        effect: '-25% Monster Enrage Build-up',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghoul', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 50, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'skr_aug_great_fall',
        name: 'Great fall',
        jpName: '豪落',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage and area shockwave of diving Hayabusa Drop attacks.',
        effect: '+30% Hayabusa Drop Blast DMG',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Black Griffin', count: 8, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 4, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'skr_aug_grip',
        name: 'grip',
        jpName: '握撃',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt by dagger attacks delivered while clinging to monster bodies.',
        effect: '+25% Clinging Dagger Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Angles', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_aug_earthquake',
        name: 'earthquake',
        jpName: '地裂',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Creates a ground tremor upon landing that staggers nearby small and medium enemies.',
        effect: 'Landing Impact Stagger Aura',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghoul', count: 10, minEnemyLevel: 46 },
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 10, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Goliath', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Damned Golem', count: 4, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'skr_aug_avoidance',
        name: 'Avoidance',
        jpName: '見切',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Dodging right before an incoming attack triggers a brief slow-motion window.',
        effect: 'Perfect Dodge Slow-Mo Window',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skull Lord', count: 4, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Melganseeker', count: 10, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Empress Ghost', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Coopstorch Frost', count: 14, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'skr_aug_consecutive_slashing',
        name: 'Consecutive slashing',
        jpName: '連刃破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage with each successive hit in a continuous dagger combo.',
        effect: '+5% DMG per Combo Hit (up to +30%)',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_aug_slashing',
        name: 'Slashing',
        jpName: '斬砕',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases critical hit chance and armor penetration of dagger strikes.',
        effect: '+15% Dagger Critical Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_aug_random_slash_crush',
        name: 'Random Slash Crush',
        jpName: '乱斬砕',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage and stagger power of multi-hit flurry skills like Kamaitachi.',
        effect: '+25% Multi-Hit Skill Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_aug_running_endurance',
        name: 'Running endurance',
        jpName: '走耐',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces stamina consumption while sprinting and running along monster surfaces.',
        effect: '-50% Sprint & Surface Run Stamina Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_aug_round_kick_defeat',
        name: 'Round kick defeat',
        jpName: '回蹴破',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases knockdown power and guard-breaking damage of all kick actions.',
        effect: '+30% Kick Stagger & Guard Break',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_aug_deep_attack',
        name: 'deep attack',
        jpName: '深撃',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Significantly increases critical hit damage delivered to monster weak spots.',
        effect: '+25% Weak Point Critical Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'skr_aug_consecutive_slashes_lv67',
        name: 'Consecutive Slashes',
        jpName: '連刃瞬',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Accelerates attack animation speed of continuous dagger combos by 20%.',
        effect: '+20% Dagger Attack Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'skr_aug_slash_and_crush',
        name: 'Slash and Crush',
        jpName: '斬砕撃',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases damage dealt against staggered, knocked down, or paralyzed targets.',
        effect: '+30% Damage vs Staggered Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'skr_aug_ran_slash_absolute',
        name: 'Ran Slash Absolute',
        jpName: '乱斬絶',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases critical strike rate and critical damage during Flame Coat state.',
        effect: '+20% Crit Rate & +25% Crit DMG in Flame Coat',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'skr_aug_fierce_attack',
        name: 'Fierce attack',
        jpName: '猛撃',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases maximum physical attack power by a flat 15%.',
        effect: '+15% Physical Attack',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'skr_aug_round_kick_crush',
        name: 'Round kick crush',
        jpName: '回蹴砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Kick attacks inflict heavy armor break and defense reduction on large monsters.',
        effect: 'Armor Shred on Kick Attacks',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'skr_aug_good_turnaround',
        name: 'Good turnaround',
        jpName: '順転',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Canceling animations with Readjust Your Stance fully refunds the stamina spent on the canceled action.',
        effect: 'Stamina Refund on Stance Readjust',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 7. SORCERER (ソーサラー)
  // ==========================================
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    jpName: 'ソーサラー',
    role: 'Attacker (Magick)',
    weapon: 'Archistaff (大杖)',
    masterNpc: 'Emerada',
    masterLocation: 'Mysree Forest',
    unlockRequirement: 'Complete Sorcerer Calling Quest from Misriu Forest',
    minVersion: '3.1',
    playstyle: 'Devastating heavy magick caster chanting catastrophic meteors, blizzards, and lightning storms.',
    customSkills: [
      {
        id: 'sor_firestorm',
        name: 'Firestorm',
        jpName: 'ファイアストーム',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'Medium',
        description: 'Summons a raging vortex of flames that scorches surrounding enemies and ignites the battlefield.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bull Ape', count: 10, minEnemyLevel: 10 },
          { targetRank: 7, targetEnemy: 'Large Lizard', count: 10, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Lizardman', count: 30, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Madman', count: 30, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Slime', count: 60, minEnemyLevel: 1 },
          { targetRank: 10, targetEnemy: 'White', count: 20, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'sor_thundercage',
        name: 'Thundercage',
        jpName: 'サンダーケージ',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Thunder',
        staminaCost: 'Medium',
        description: 'Forms a cage of crackling high-voltage lightning around the target, delivering continuous electric shock damage.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Shield Goblin', count: 15, minEnemyLevel: 5 },
          { targetRank: 8, targetEnemy: 'Forest Goblin', count: 50, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'sor_black_haze',
        name: 'Black Haze',
        jpName: 'ブラックヘイズ',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Dark',
        staminaCost: 'Medium',
        description: 'Creates an ominous cloud of dark miasma that blinds foes and inflicts progressive darkness corruption.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Madman', count: 15, minEnemyLevel: 10 },
          { targetRank: 7, targetEnemy: 'Hobgoblin', count: 20, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Goblin Bomber', count: 20, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 10, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 18, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'sor_frost_spike',
        name: 'Frost Spike',
        jpName: 'フロストスパイク',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Ice',
        staminaCost: 'Medium',
        description: 'Erupts sharp jagged ice pillars from below the enemy, launching them into the air and freezing them.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Mage', count: 30, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Skeleton Alchemy', count: 25, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'White', count: 20, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 12, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'sor_flamewall',
        name: 'Flamewall',
        jpName: 'フレイムウォール',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'Medium',
        description: 'Raises a towering wall of blazing fire that acts as an impassable barrier and incinerates advancing enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Orc Soldier', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Rock Lizard', count: 30, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Rock Lizard Spinel', count: 5, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 12, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Ogre', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'sor_crescent_blade',
        name: 'Crescent Blade',
        jpName: 'クレセントブレード',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Dark',
        staminaCost: 'Medium',
        description: 'Unleashes crescent blades of condensed dark magick that slice through multiple enemy ranks.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Redcap', count: 15, minEnemyLevel: 8 },
          { targetRank: 8, targetEnemy: 'Cyclops', count: 10, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Ogre', count: 12, minEnemyLevel: 25 },
          { targetRank: 10, targetEnemy: 'Golem', count: 6, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'sor_rock_beat',
        name: 'Rock Beat',
        jpName: 'ロックビート',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'None',
        staminaCost: 'High',
        description: 'Summons colossal boulders from above to crash violently into the ground, dealing tremendous strike and stagger damage.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Troll', count: 3, minEnemyLevel: 20 },
          { targetRank: 7, targetEnemy: 'Oak Aimer', count: 30, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Captain Oak', count: 10, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 10, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'sor_meteorfall',
        name: 'Meteorfall',
        jpName: 'メテオフォール',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'Chants the supreme incantation of the heavens, bombarding the entire area with devastating fiery meteors.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Colossus', count: 10, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Lindworm', count: 10, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_thunder_rain',
        name: 'Thunder Rain',
        jpName: 'サンダーレイン',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Thunder',
        staminaCost: 'High',
        description: 'Calls down continuous lightning strikes like heavy rain across the battlefield, electrocuting all foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 30 },
          { targetRank: 7, targetEnemy: 'Griffin', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Ogre', count: 10, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Maltroll', count: 6, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'White Chimera', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_darkness_mist',
        name: 'Darkness Mist',
        jpName: 'ダークネスミスト',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Dark',
        staminaCost: 'High',
        description: 'Spreads a dark fog that completely blinds and silences enemies within while dealing continuous dark damage.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Witch', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Harpy', count: 10, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_blizzard_arrow',
        name: 'Blizzard Arrow',
        jpName: 'ブリザードアロー',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Ice',
        staminaCost: 'High',
        description: 'Condenses arctic frost into high-velocity ice arrows that penetrate multiple foes and freeze boss weak points.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Damned Goblin', count: 20, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Coopstorch Frost', count: 15, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Empress Ghost', count: 8, minEnemyLevel: 46 },
          { targetRank: 8, targetEnemy: 'Ghost Mail', count: 30, minEnemyLevel: 46 },
          { targetRank: 9, targetEnemy: 'Griffin Alchemy', count: 3, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'sor_prominent_sphere',
        name: 'Prominent Sphere',
        jpName: 'プロミネントスフィア',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'High',
        description: 'Creates a radiant solar flare sphere that continuously incinerates everything caught inside its gravitational pull.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 3, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Cyclops', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_icicle_earrings',
        name: 'Icicle Earrings',
        jpName: 'アイシクルピアス',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Ice',
        staminaCost: 'High',
        description: 'Manifests orbiting frost crystals that fire penetrating ice lances at nearby targets with extreme freeze build-up.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_lightning_stake',
        name: 'Lightning Stake',
        jpName: 'ライトニングステイク',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Thunder',
        staminaCost: 'High',
        description: 'Drives a catastrophic pillar of divine thunder directly into the ground, obliterating all surrounding enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 10, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'sor_norm_chant',
        name: 'High Spell Chanting (高速詠唱)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Shortens spell chanting times through rhythmic spell seals.'
      },
      {
        id: 'sor_norm_magic_trap',
        name: 'Magic Trap (マジックトラップ)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Deploys a defensive magical sigil on the ground that explodes upon enemy contact.'
      }
    ],
    augments: [
      {
        id: 'sor_aug_defeat',
        name: 'defeat',
        jpName: '討滅',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases magick attack power when landing finishing blows on monsters.',
        effect: '+15% Magick ATK on Monster Kill',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Large Lizard', count: 20, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'sor_aug_rakuyo',
        name: 'Rakuyō',
        jpName: '楽詠',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces stamina consumption while maintaining active spell chants.',
        effect: '-25% Chanting Stamina Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Deep Slime', count: 7, minEnemyLevel: 5 },
          { targetRank: 6, targetEnemy: 'Bull Ape', count: 16, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'sor_aug_absolutely',
        name: 'Absolutely',
        jpName: '絶倒',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases knockdown power and stagger chance of heavy offensive spells.',
        effect: '+20% Spell Knockdown Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Direwolf', count: 14, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Skeleton Mage', count: 40, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'sor_aug_sequel',
        name: 'sequel',
        jpName: '続詠',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Allows retaining chant progress when dodging during spell casting.',
        effect: 'Retains Spell Chant on Dodge',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Alchemy', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Troll', count: 6, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'sor_aug_attack_flame',
        name: 'attack flame',
        jpName: '炎攻',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt by Fire elemental spells and attacks.',
        effect: '+15% Fire Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sludge Man', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 6, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'sor_aug_ice_attack',
        name: 'Ice Attack',
        jpName: '氷攻',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt by Ice elemental spells and attacks.',
        effect: '+15% Ice Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Mage', count: 7, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Grimwarg', count: 30, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'sor_aug_lightning_attack',
        name: 'Lightning attack',
        jpName: '雷攻',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt by Thunder elemental spells and attacks.',
        effect: '+15% Thunder Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Blue Newt', count: 10, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'sor_aug_devils_aim',
        name: "devil's aim",
        jpName: '魔狙',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against Demon and Fiend-type monsters.',
        effect: '+20% Damage vs Demons',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mist Sorcerer', count: 9, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Golem', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'sor_aug_cursed_aim',
        name: 'cursed aim',
        jpName: '呪狙',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against Cursed and Undead-type monsters.',
        effect: '+20% Damage vs Undead & Cursed Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Sorcerer', count: 17, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Ent', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'sor_aug_magic_guard',
        name: 'Magic Guard',
        jpName: '魔護',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases magical defense and reduces elemental spell damage received.',
        effect: '+20% Magick Defense',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Lindworm', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'sor_aug_cursed_protection',
        name: 'Cursed protection',
        jpName: '呪防',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Cursed and Dark elemental monster abilities.',
        effect: '-25% Curse & Dark Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'White', count: 4, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_chant',
        name: 'chant',
        jpName: '詠唱',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Shortens the time required to complete high-tier spell chants.',
        effect: '+20% Spell Chanting Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Colossus', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Oaktrooper', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_reiei',
        name: 'Reiei',
        jpName: '霊詠',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases magick attack power while chanting inside a magical seal or supportive field.',
        effect: '+25% Magick ATK in Sigils',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Witch', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Elder Dragon', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_attack_and_darkness',
        name: 'attack and darkness',
        jpName: '闇攻',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage dealt by Dark elemental spells and abilities.',
        effect: '+15% Dark Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'General Oak', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White', count: 10, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_calm_and_calm',
        name: 'Calm and calm',
        jpName: '沈着',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces stagger and prevents spell interruption from minor enemy hits while chanting.',
        effect: 'Spell Interruption Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Grimwarg', count: 14, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Maltroll', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Ghoul', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_enfu',
        name: 'Enfu',
        jpName: '延符',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Extends the duration of deployed magical traps and sigils.',
        effect: '+40% Magic Trap Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_human_protection',
        name: 'Human protection',
        jpName: '人防',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Humanoid and Orc-type enemies.',
        effect: '-20% Humanoid Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Captain Oak', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Golem', count: 6, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'sor_aug_attack_saint',
        name: 'Attack Saint',
        jpName: '聖攻',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt by Holy elemental spells and attacks.',
        effect: '+15% Holy Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Alchemy', count: 17, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Emerald Eye', count: 10, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Crystal Eye', count: 20, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'sor_aug_magic_increase',
        name: 'Magic increase',
        jpName: '魔増',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases maximum Magick Attack power by a flat percentage across all spells.',
        effect: '+15% Magick Attack',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Angles', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_demon_resistance',
        name: 'Demon resistance',
        jpName: '魔耐',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces damage taken from Demon-type monsters and demonic curses.',
        effect: '-25% Demon Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_louie',
        name: 'Louie',
        jpName: '累詠',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Chanting consecutive spells within 5 seconds reduces cast time of the next spell.',
        effect: 'Chaining Spell Cast Speed Boost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orb Enemy', count: 17, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Melgan Mage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Banded Mage', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_demonic_spirit',
        name: 'Demonic Spirit',
        jpName: '魔気',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Restores stamina whenever landing critical hits with high-tier spells.',
        effect: 'Stamina Recovery on Magick Crits',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Shadow Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Gigan Machina', count: 2, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'sor_aug_demon_twin',
        name: 'Demon twin',
        jpName: '魔双',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Doubles the number of projectiles or hits released by elemental spell bursts.',
        effect: 'Empowered Multi-Hit Spells',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_aug_chanting',
        name: 'chanting',
        jpName: '高詠',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Greatly increases magick power when releasing spells at full level 3 charge.',
        effect: '+25% Max Charged Spell Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Sorcerer', count: 10, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Death Knight', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Angles', count: 8, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'sor_aug_aiming_at_people',
        name: 'Aiming at people',
        jpName: '人狙',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt against Humanoid and Orc-type enemies.',
        effect: '+20% Damage vs Humanoids',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Melgan Mage', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Rogue Mage', count: 7, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Damned Golem', count: 8, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Ghoul', count: 5, minEnemyLevel: 52 }
        ]
      },
      {
        id: 'sor_aug_magic_bullet_defeat',
        name: 'Magic bullet defeat',
        jpName: '魔弾破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage and stagger power of basic magick bolt attacks.',
        effect: '+30% Normal Magic Bolt Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_aug_magic_trap_crush',
        name: 'Magic Trap Crush',
        jpName: '魔罠砕',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Greatly increases the explosion damage and guard-breaking power of Magic Traps.',
        effect: '+40% Magic Trap Blast Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_aug_magical_defeat',
        name: 'Magical defeat',
        jpName: '魔法破',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt against staggered and knocked down monsters.',
        effect: '+25% Downed Monster Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_aug_hard_float',
        name: 'hard float',
        jpName: '剛浮',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Allows floating higher in the air and prevents fall damage or knockback while airborne.',
        effect: 'Floating Super Armor & Height',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_aug_demon_slayer',
        name: 'Demon Slayer',
        jpName: '魔滅',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Significantly increases spell damage dealt against Corrupted and Erosion-afflicted monsters.',
        effect: '+30% Damage vs Erosion Monsters',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_aug_defeating_force',
        name: 'defeating force',
        jpName: '破力',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Massively boosts monster rage gauge reduction when hitting elemental weak points.',
        effect: '+30% Rage Bar Depletion',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'sor_aug_magic_bullet_crusher',
        name: 'Magic Bullet Crusher',
        jpName: '魔弾砕',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Basic magick bolts inflict heavy armor break and defense reduction on targets.',
        effect: 'Armor Shred on Magic Bolts',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'sor_aug_magic_trap_set',
        name: 'Magic trap set',
        jpName: '魔罠置',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Allows placing up to 3 Magic Traps simultaneously with reduced deploy time.',
        effect: 'Place up to 3 Magic Traps',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'sor_aug_maha_ei',
        name: 'Maha Ei',
        jpName: '魔破鋭',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases critical strike chance of all offensive magick spells.',
        effect: '+20% Magick Critical Chance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The Frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'sor_aug_reduction',
        name: 'reduction',
        jpName: '減詠',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Significantly reduces stamina required to cast tier 3 grand spells.',
        effect: '-30% Grand Spell Stamina Cost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'sor_aug_magic_trap_chant',
        name: 'Magic trap chant',
        jpName: '魔罠詠',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Detonating a Magic Trap instantly grants a temporary chanting speed boost.',
        effect: '+50% Cast Speed after Trap Blast',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'sor_aug_floating_comfortably',
        name: 'Floating comfortably',
        jpName: '浮遊楽',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Eliminates all stamina drain while floating and permits spell chanting mid-air without falling.',
        effect: 'Zero Stamina Mid-Air Chanting',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 8. ELEMENT ARCHER (エレメントアーチャー)
  // ==========================================
  {
    id: 'element_archer',
    name: 'Element Archer',
    jpName: 'エレメントアーチャー',
    role: 'Healer / Support',
    weapon: 'Magick Bow (魔道弓)',
    masterNpc: 'Ringdeel',
    masterLocation: 'Deenan Woods',
    unlockRequirement: 'Complete Deenan Grove Ancient Spirits Quest',
    minVersion: '3.1',
    playstyle: 'Magickal homing archer switching between elemental offensive bursts and multi-lock curative healing arrows.',
    customSkills: [
      {
        id: 'ela_consecutive_magic_bullets',
        name: 'Consecutive Magic Bullets',
        jpName: '連魔弾',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Low',
        description: 'Fires multiple magick arrows with there Ice attribute at a single point.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Shield Goblin', count: 13, minEnemyLevel: 1 },
          { targetRank: 8, targetEnemy: 'Redcap Fighter', count: 30, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Large Lizard', count: 25, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'White', count: 15, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'ela_healing_arrow_lv18',
        name: 'Healing Arrow (Lv18)',
        jpName: '癒の矢 (Lv18)',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Fires magick arrows that create health-restoring fields on impact. Fields damage undead enemies in range.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Hobgoblin Fighter', count: 10, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Orb Enemy', count: 20, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Skeleton Mage', count: 20, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Ent', count: 10, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'ela_healing_arrow_lv20',
        name: 'Healing Arrow (Lv20)',
        jpName: '癒の矢 (Lv20)',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Fires magick arrows that emit curative fields on impact. Cure status to allies, boosts defence and harms undead.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Ooze', count: 13, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Skeleton Alchemy', count: 15, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Hobgoblin Leader', count: 13, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 12, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'ela_flame_magic_bow',
        name: 'flame magic bow',
        jpName: '炎魔弓',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Fire',
        staminaCost: 'Medium',
        description: 'Fires magick arrows that lodge in enemies. Attacking embedded arrows triggers explosions, knocking back nearby foes from the blast.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Direwolf', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Sulfur Lizard', count: 30, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 10, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Troll', count: 12, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'ela_flash_magic_light',
        name: 'flash magic light',
        jpName: '閃魔光',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Fires holy magick arrows that deploy spheres on impact. Attached spheres drain enemy HP continuously.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Goblin Bomber', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Rock Lizard', count: 15, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Armor Cyclops', count: 10, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Griffin', count: 10, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'ela_deflection_bow',
        name: 'Deflection Bow',
        jpName: '偏魔弓',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'Medium',
        description: 'Fire magick arrows that decrease the Physical and magical attack power of enemies for a period of time.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Ent', count: 3, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Bull Ape', count: 20, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Chimera', count: 10, minEnemyLevel: 25 },
          { targetRank: 10, targetEnemy: 'Colossus', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ela_reduced_magic_bow_lv32',
        name: 'Reduced magic bow (Lv32)',
        jpName: '減魔弓 (Lv32)',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'None',
        staminaCost: 'High',
        description: 'Fires magick arrows that decrease the Physical and magical defense of enemies for a period of time.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Dread Ape', count: 3, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Fat Undead', count: 30, minEnemyLevel: 25 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 4, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'ela_ricochet_magic_follower',
        name: 'Ricochet Magic Follower',
        jpName: '跳弾魔従',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Thunder',
        staminaCost: 'High',
        description: 'Fires a magick arrow that increases in power as it ricochets towards its target.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Troll', count: 3, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Grimwarg', count: 30, minEnemyLevel: 35 },
          { targetRank: 9, targetEnemy: 'Lindworm', count: 4, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_invigorating_magic_arrow',
        name: 'Invigorating Magic Arrow',
        jpName: '活魔矢',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Fires magick arrows that create stamina-restoring fields on impact. These fields also damage undead enemies in range.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Silver Roar', count: 3, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Maltroll', count: 7, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'White Chimera', count: 4, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Direwolf', count: 20, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 5, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Cockatrice', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_reduced_magic_bow_lv42',
        name: 'Reduced magic bow (Lv42)',
        jpName: '減魔弓 (Lv42)',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'None',
        staminaCost: 'High',
        description: 'Fires magick arrows that decrease the Endurance of enemies for a period of time.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Witch', count: 4, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'General Oak', count: 5, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Colossus', count: 4, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_weakening_magic_bow',
        name: 'Weakening Magic Bow',
        jpName: '弱魔弓',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Dark',
        staminaCost: 'High',
        description: 'Fires magick arrows that implant magic spheres into enraged enemies’ Secret Cores. These spheres, when attacked, inflict massive stamina damage.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Damned Goblin Fighter', count: 20, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Damned Wolf', count: 20, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Living Armor', count: 10, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Griffin Alchemy', count: 5, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Goliath', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ela_full_spirit_bow',
        name: 'Full Spirit Bow',
        jpName: '全霊弓',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Fires a massive holy magick arrow after charging. Left stick steers in flight. Hit body parts become auto-targets.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 3, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Geo Golem', count: 2, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 5, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_healing_flash',
        name: 'Healing Flash',
        jpName: '癒閃',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Fires a healing magick arrow that detonates midair, emitting a flash that restores HP to illuminated allies. Damages undead.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_tactile_maya_arrow',
        name: 'Tactile Maya Arrow',
        jpName: '触魔矢',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Fires arrows that sprout tentacles on hit. Tentacles chain attacks between foes. Scales with size. Strong versus Infected Growths.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 10, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'ela_norm_lock',
        name: 'Multi-Lock Target (マルチロック)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Locks onto up to 8 targets simultaneously.'
      },
      {
        id: 'ela_norm_element_switch',
        name: 'Element Switch (属性変換)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Switches the core magical affinity of normal homing arrows.'
      }
    ],
    augments: [
      {
        id: 'ela_aug_revival',
        name: 'Revival',
        jpName: '再起',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Reduces stamina penalty and revives faster from incapped state.',
        effect: 'Faster Revival & Stamina Recovery',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sling Goblin', count: 10, minEnemyLevel: 4 },
          { targetRank: 6, targetEnemy: 'Madman', count: 30, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'ela_aug_death_line',
        name: 'Death Line',
        jpName: '死線',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases magick attack power when health falls below 30%.',
        effect: '+25% Magick Attack at Low HP',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Mage', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Large Lizard', count: 30, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'ela_aug_ensuke',
        name: 'Ensuke',
        jpName: '援護',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases recovery amount when healing party members.',
        effect: '+20% Ally Healing Amount',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Hunter', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Sulfur Lizard', count: 30, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ela_aug_flame_attack',
        name: 'Flame attack',
        jpName: '炎攻',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt by Fire elemental skills and attacks.',
        effect: '+15% Fire Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Sorcerer', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Slinghobgoblin', count: 14, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ela_aug_ice_attack',
        name: 'Ice attack',
        jpName: '氷攻',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt by Ice elemental skills and attacks.',
        effect: '+15% Ice Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Direwolf', count: 50, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Fat Undead', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ela_aug_force_of_life',
        name: 'force of life',
        jpName: '命力',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases maximum health pool capacity.',
        effect: '+250 Max Health',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 2, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'ela_aug_koumei',
        name: 'Koumei',
        jpName: '巧妙',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases lock-on speed and multi-target acquisition rate.',
        effect: '+25% Lock-On Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Cyclops', count: 2, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ela_aug_lightning_attack',
        name: 'lightning attack',
        jpName: '雷攻',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt by Thunder/Lightning elemental skills and attacks.',
        effect: '+15% Thunder Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Blue Newt', count: 7, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'ela_aug_ghost_target',
        name: 'Ghost Target',
        jpName: '霊狙',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases damage dealt against Spirit and Ghost-type monsters.',
        effect: '+20% Damage vs Spirits / Ghosts',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Colossus', count: 3, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'White', count: 10, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ela_aug_aim',
        name: 'Aim',
        jpName: '狙撃',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases critical strike chance when hitting monster weak spots from range.',
        effect: '+15% Ranged Weak Point Critical Chance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Oak Aimer', count: 7, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Golem', count: 2, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ela_aug_healing',
        name: 'Healing',
        jpName: '治癒',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases effectiveness of continuous health regeneration effects.',
        effect: '+25% Health Regeneration Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Griffin', count: 2, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 2, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'ela_aug_spiritual_protection',
        name: 'spiritual protection',
        jpName: '霊防',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from Spirit and Ghost-type monsters.',
        effect: '-20% Damage Taken vs Spirits',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Grimwarg', count: 10, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Witch', count: 10, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_protection',
        name: 'protection',
        jpName: '加護',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Grants continuous passive defense bonus to the entire party.',
        effect: '+10% Party Defense Aura',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Captain Oak', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Troll', count: 8, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_extended_treatment',
        name: 'extended treatment',
        jpName: '延療',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Extends duration of all healing fields and regenerative buff auras.',
        effect: '+35% Healing Field Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 3, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Elder Dragon', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_holy_attack',
        name: 'Holy attack',
        jpName: '聖攻',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage dealt by Holy elemental skills and attacks.',
        effect: '+15% Holy Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orb Enemy', count: 7, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_dark_attack',
        name: 'Dark attack',
        jpName: '闇攻',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage dealt by Dark elemental skills and attacks.',
        effect: '+15% Dark Element Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'White', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_one_group',
        name: 'One group',
        jpName: '一団',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases attack power proportionally to the number of conscious party members.',
        effect: '+5% Attack per Active Ally',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'General Oak', count: 4, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Orcbringer', count: 10, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_jinya',
        name: 'Jinya',
        jpName: '陣矢',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Expands the radius of curative fields created by healing arrows.',
        effect: '+30% Healing Field Radius',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 17, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_repair',
        name: 'repair',
        jpName: '修復',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Restores weapon durability and reduces weapon degradation.',
        effect: 'Prevents Durability Loss',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Crystal Eye', count: 7, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Lapis Lazuli Eye', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Harpy Alchemy', count: 50, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Goblin Alchemy Fighter', count: 50, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'ela_aug_self_medication',
        name: 'Self-medication',
        jpName: '自療',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Restores self HP whenever landing healing arrows on allies.',
        effect: 'Self-Healing on Ally Support',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Ghost Mail', count: 25, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'ela_aug_repellent',
        name: 'repellent',
        jpName: '撥水',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces damage received from elemental breath attacks and environmental hazards.',
        effect: '-25% Elemental AoE Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Melgan Elemental', count: 5, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Angles', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'ela_aug_hirosuke',
        name: 'Hirosuke',
        jpName: '広援',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Expands the lock-on range and cone angle for targeted party buffs.',
        effect: '+40% Support Lock-on Cone',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Griffin', count: 2, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Harpy Alchemy', count: 17, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 8, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'ela_aug_self_return',
        name: 'Self-return',
        jpName: '自還',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Restores stamina whenever curing a status ailment on an ally.',
        effect: '+25% Stamina on Cleansing Ally',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Angles', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Drake', count: 20, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 20, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_aug_shitsuya',
        name: 'Shitsuya',
        jpName: '疾矢',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the flight velocity and tracking precision of all homing arrows.',
        effect: '+30% Arrow Velocity & Homing',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Living Armor', count: 4, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Skull Lord', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Living Armor', count: 12, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Death Knight', count: 30, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'ela_aug_rapid_activity',
        name: 'Rapid activity',
        jpName: '速活',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Accelerates the charge speed of all magick bow custom skills.',
        effect: '+25% Magick Bow Skill Charge Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Alchemy Eye', count: 5, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Goliath', count: 8, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Empress Ghost', count: 8, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'ela_aug_fighting_arrow',
        name: 'Fighting Arrow',
        jpName: '闘矢',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases knockdown power and stagger build-up of homing magick shots.',
        effect: '+25% Magick Knockdown Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_aug_sukeya_ei',
        name: 'Sukeya Ei',
        jpName: '助矢鋭',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases critical hit chance of all offensive magick arrow skills.',
        effect: '+15% Magick Critical Chance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_aug_one_kick_defeat',
        name: 'One kick defeat',
        jpName: '一蹴破',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt against staggered and fallen monsters.',
        effect: '+25% Downed Monster Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_aug_good_progress',
        name: 'Good progress',
        jpName: '順行',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces stamina consumption while moving or aiming in lock-on mode.',
        effect: '-30% Aiming Stamina Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_aug_takeshi_ikuya',
        name: 'Takeshi Ikuya',
        jpName: '武活矢',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases party physical attack power when inside the archer’s healing aura.',
        effect: '+15% Ally Physical ATK in Aura',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_aug_demon_shield',
        name: 'Demon shield',
        jpName: '魔護',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases magical defense and elemental resistance across all elements.',
        effect: '+20% Magick Defense & Resistances',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'ela_aug_touya_shun',
        name: 'Touya Shun',
        jpName: '闘矢瞬',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Instantly fully locks onto targeted enemies upon releasing perfect timed shots.',
        effect: 'Instant Multi-Lock on Perfect Timing',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ela_aug_sukeya_shun',
        name: 'Sukeya Shun',
        jpName: '助矢瞬',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Reduces cooldown and lock-on time required for all curative support arrows.',
        effect: '-35% Support Skill Cast Time',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ela_aug_one_kick_shattered',
        name: "One kick and it's shattered",
        jpName: '一蹴砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases damage dealt against frozen, paralyzed, or petrified enemies.',
        effect: '+30% Damage vs Status Impaired Foes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The Frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ela_aug_salvation',
        name: 'salvation',
        jpName: '救済',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Immediately restores 50% max HP to fallen party members upon resurrection.',
        effect: '+50% Health on Ally Revival',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'ela_aug_fumiyuki_hiroshi',
        name: 'Fumiyuki Hiroshi',
        jpName: '踏行広',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Expands the field radius and buff duration of all elemental ground formations.',
        effect: '+40% Ground Area Buff Radius',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'ela_aug_eye_reading',
        name: 'Eye-reading',
        jpName: '看眼',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Reveals all hidden elemental weaknesses and increases party damage dealt against them.',
        effect: '+25% Weakness Exploit DMG',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 9. WARRIOR (ウォリアー)
  // ==========================================
  {
    id: 'warrior',
    name: 'Warrior',
    jpName: 'ウォリアー',
    role: 'Attacker (Physical)',
    weapon: 'Greatsword (大剣)',
    masterNpc: 'Oliver',
    masterLocation: 'Village of Zoma in the Eastern Zandora',
    unlockRequirement: 'Complete Dow Valley Warrior Trial',
    minVersion: '3.1',
    playstyle: 'Heavy two-handed powerhouse tanking through enemy hits with hyper-armor to unleash devastating charged arc strikes.',
    customSkills: [
      {
        id: 'war_upward_thrust_slash',
        name: 'Upward thrust slash',
        jpName: '突き上げ斬り',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Low',
        description: 'Stabs foes then fiercely slashes upward. Can send foes flying high into the air.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Hobgoblin', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Fat Undead', count: 30, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Lizardman', count: 30, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Skeleton Mage', count: 30, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Ent', count: 1, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'war_demon_runner',
        name: 'Demon Runner',
        jpName: '魔人駆け',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Charge forward with blade extended, knocking down any caught in its path. Left stick to steer charge.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Orc Soldier', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Goblin Alchemy', count: 40, minEnemyLevel: 15 },
          { targetRank: 8, targetEnemy: 'Goblin Alchemy Fighter', count: 20, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 1, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'war_handle_striking',
        name: 'Handle striking',
        jpName: '柄打ち',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Low',
        description: 'Steps forward with hilt strike. Easily staggers enemies and drains enraged stamina.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Slinghobgoblin', count: 20, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Redcap', count: 40, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Bull Ape', count: 20, minEnemyLevel: 15 },
          { targetRank: 10, targetEnemy: 'Troll', count: 1, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'war_evade_and_slash',
        name: 'Evade and slash',
        jpName: 'かわし斬り',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Low',
        description: 'Steps backwards in a swift evasive manoeuvre while delivering a slashing blow.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Large Lizard', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Sludge Man', count: 40, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 12, minEnemyLevel: 18 },
          { targetRank: 10, targetEnemy: 'Armor Cyclops', count: 1, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'war_large_wheel_slash',
        name: 'Large Wheel Slash',
        jpName: '大輪斬',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Spins the blade in a swift circle, slashing at foes all around the user.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton', count: 15, minEnemyLevel: 20 },
          { targetRank: 7, targetEnemy: 'Skeleton Mage', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Armor Cyclops', count: 10, minEnemyLevel: 25 },
          { targetRank: 9, targetEnemy: 'Ogre', count: 4, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Griffin', count: 1, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'war_demon_slayer',
        name: 'Demon Slayer',
        jpName: '魔人斬り',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Charges to slam foes with blade. High Stun potential. Perfect release timing maximises damage.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Sulfur Lizard', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Bull Ape', count: 30, minEnemyLevel: 25 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 40, minEnemyLevel: 25 },
          { targetRank: 10, targetEnemy: 'Golem', count: 1, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'war_tensho_blade',
        name: 'Tensho blade',
        jpName: '天昇刃',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Thrust your blade with great force into the air. Especially effective against aerial enemies.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Hobgoblin Fighter', count: 30, minEnemyLevel: 25 },
          { targetRank: 8, targetEnemy: 'Blue Newt', count: 30, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Colossus', count: 10, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 1, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'war_mushinzan',
        name: 'Mushinzan',
        jpName: '無心斬',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Readies greatsword to parry enemy attacks, followed by counter combo. Only executes chain after a successful parry.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Grimwarg', count: 40, minEnemyLevel: 35 },
          { targetRank: 8, targetEnemy: 'Orc Soldier', count: 50, minEnemyLevel: 35 },
          { targetRank: 9, targetEnemy: 'Ogre', count: 20, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Elder Dragon', count: 1, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'war_ryomas_stance',
        name: "Ryoma's stance",
        jpName: '竜舞の構え',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Steps forward to absorb enemy attacks. Can cancel many actions but not itself. Successfully absorbing fills revenge gauge significantly.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Troll', count: 8, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Maltroll', count: 8, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 8, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Angles', count: 1, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Cockatrice', count: 1, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'war_the_great_windmill_slash',
        name: 'The Great Windmill Slash',
        jpName: '大風車斬り',
        type: 'custom',
        unlockLevel: 42,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Alternates greatsword swings to shred foes. Rapid inputs increase attack count.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Witch', count: 10, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'General Oak', count: 10, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Captain Oak', count: 20, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Elder Dragon', count: 1, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Grand Ent', count: 1, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'war_hiryutsuki',
        name: 'Hiryutsuki',
        jpName: '飛竜突',
        type: 'custom',
        unlockLevel: 46,
        maxRank: 10,
        element: 'Pierce',
        staminaCost: 'High',
        description: 'Jump high an deliver a focused powerful greatsword strike. Small range but devastating damage. Damage increases with drop distance.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Damned Goblin Fighter', count: 20, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Damned Wolf', count: 20, minEnemyLevel: 40 },
          { targetRank: 7, targetEnemy: 'Cockatrice', count: 12, minEnemyLevel: 47 },
          { targetRank: 8, targetEnemy: 'Coopstorch Frost', count: 30, minEnemyLevel: 46 },
          { targetRank: 8, targetEnemy: 'Griffin Alchemy', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Mogok', count: 1, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 1, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'war_demon_slaying_sword_wind_slash',
        name: 'Demon-Slaying Sword Wind Slash',
        jpName: '魔人剣風斬',
        type: 'custom',
        unlockLevel: 56,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'After channeling enough energy, release a devastating slash with your body’s entire might.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Death Knight', count: 3, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Geo Golem', count: 2, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Nightmare', count: 3, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Gorgoran', count: 1, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 1, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_great_fang_gouging',
        name: 'Great fang gouging',
        jpName: '大牙抉り',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'While climbing an enemy, thrust the blade deep into them and vigorously shake it around. The number of shakes increases with repeated button presses.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 7, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 1, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_earth_shaking_fang',
        name: 'earth-shaking fang',
        jpName: '震天牙',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Plunges greatsword with full force, shaking the earth. Holding button on ground or fall height in air increases damage. Most effective against downed foes.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 7, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 1, minEnemyLevel: 75 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'war_norm_hyper',
        name: 'Revenge Gauge (リベンジゲージ)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Absorbs enemy hits into rage gauge to empower next skill.'
      },
      {
        id: 'war_norm_hyper_armor',
        name: 'Hyper Armor (剛体)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Resists flinching and staggering during heavy swing windups.'
      }
    ],
    augments: [
      {
        id: 'war_aug_first_collision',
        name: 'First collision',
        jpName: '初衝',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases damage dealt on the opening strike of any engagement.',
        effect: '+20% First Strike Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sling Goblin', count: 14, minEnemyLevel: 4 },
          { targetRank: 6, targetEnemy: 'Madman', count: 30, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'war_aug_great_experience',
        name: 'Great experience',
        jpName: '大快感',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Restores a small amount of stamina upon landing heavy charged slashes.',
        effect: '+10% Stamina on Heavy Hits',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Hobgoblin Leader', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Bull Ape', count: 10, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'war_aug_cutting',
        name: 'Cutting',
        jpName: '切断',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases slicing damage and part-severing capability on tails and limbs.',
        effect: '+25% Tail & Part Severing Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goblin Bomber', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Sulfur Lizard', count: 40, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'war_aug_exquisite',
        name: 'Exquisite',
        jpName: '絶妙',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases stagger value when hitting at the optimal weapon sweet-spot tip.',
        effect: '+20% Sweet-Spot Stagger Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Sorcerer', count: 14, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Harpy', count: 50, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'war_aug_resentment',
        name: 'resentment',
        jpName: '怨恨',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases revenge gauge accumulation rate upon taking damage.',
        effect: '+25% Revenge Gauge Gain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orb Enemy', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'war_aug_pressing_matter',
        name: 'pressing matter',
        jpName: '切迫',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases attack power as health drops below 50%.',
        effect: '+20% Attack when HP < 50%',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ent', count: 3, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Orb Enemy', count: 30, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'war_aug_imminent_attack',
        name: 'Imminent attack',
        jpName: '迫攻',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces damage taken while charging greatsword attacks.',
        effect: '-25% Damage Taken While Charging',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rock Lizard Spinel', count: 7, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 8, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'war_aug_deep_resentment',
        name: 'Deep resentment',
        jpName: '深怨',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Extends duration that revenge gauge remains at maximum capacity.',
        effect: '+40% Revenge Retention Time',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sludge Man', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 10, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'war_aug_seito',
        name: 'Seito',
        jpName: '勢刀',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases swing speed of normal greatsword attack chains.',
        effect: '+15% Greatsword Attack Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Colossus', count: 2, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'White', count: 10, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'war_aug_targeting_animals',
        name: 'Targeting animals',
        jpName: '獣狙',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases physical damage dealt against Beast-type monsters.',
        effect: '+20% Damage vs Beasts',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 25 },
          { targetRank: 6, targetEnemy: 'Grimwarg', count: 50, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'war_aug_diligence',
        name: 'diligence',
        jpName: '精進',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces stamina consumption of all custom skills.',
        effect: '-15% Custom Skill Stamina Cost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Sphinx', count: 3, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Golem', count: 2, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'war_aug_exquisite_lv35',
        name: 'Exquisite (Lv35)',
        jpName: '絶妙 (Lv35)',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Significantly amplifies critical hit damage on perfect tip strikes.',
        effect: '+25% Critical Tip Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ogre', count: 10, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'war_aug_beast_guard',
        name: 'Beast Guard',
        jpName: '獣防',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces damage received from Beast-type monsters.',
        effect: '-20% Damage Taken vs Beasts',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Direwolf', count: 60, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 10, minEnemyLevel: 35 }
        ]
      },
      {
        id: 'war_aug_super_hatred',
        name: 'super hatred',
        jpName: '超怨',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Doubles revenge gauge gain when suffering massive knockdown blows.',
        effect: '+100% Revenge Gain on Knockdown',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corps Spanisher Frost', count: 50, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cyclops', count: 4, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'war_aug_reinforcement',
        name: 'Reinforcement',
        jpName: '増援',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases maximum health and defense during boss encounters.',
        effect: '+250 Max HP & +10% Defense',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghoul', count: 10, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'war_aug_retribution',
        name: 'Retribution',
        jpName: '報復',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Deals damage back to attacking enemies when hyper-armoring through their hits.',
        effect: 'Reflect 20% Damage during Hyper-Armor',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Maltroll', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 16, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'war_aug_brave_attack',
        name: 'Brave attack',
        jpName: '勇撃',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases physical knockdown power when attacking enraged bosses.',
        effect: '+25% Knockdown during Enrage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rogue Warrior', count: 4, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Living Armor', count: 12, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Ghost Mail', count: 20, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'war_aug_heavy_attack',
        name: 'heavy attack',
        jpName: '重撃',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical attack power of all heavy charged skills.',
        effect: '+20% Heavy Skill Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Black Griffin', count: 8, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Angles', count: 10, minEnemyLevel: 45 }
        ]
      },
      {
        id: 'war_aug_hard_meat',
        name: 'Hard meat',
        jpName: '剛肉',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces physical slash and blunt damage received from all sources.',
        effect: '-15% Physical Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Melgan Warrior', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Bandit Warrior', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'war_aug_haki',
        name: 'Haki',
        jpName: '覇気',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Emits a menacing aura that constantly draws monster aggression.',
        effect: '+30% Threat / Aggro Generation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Behemoth', count: 20, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'war_aug_exalted',
        name: 'Exalted',
        jpName: '高揚',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases maximum physical attack power proportionally to current rage gauge.',
        effect: '+25% Max Attack at Full Gauge',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Angles', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Drake', count: 20, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 20, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_aug_resentment_lv56',
        name: 'Resentment (Lv56)',
        jpName: '怨嗟',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Converts a portion of all damage received directly into instant stamina recovery.',
        effect: '+20% Damage Taken as Stamina',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gigan Machina', count: 2, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Death Knight', count: 6, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Living Armor', count: 7, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'war_aug_with_all_my_heart',
        name: 'With all my heart',
        jpName: '一心',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Greatly increases stagger and knockdown damage when using custom skills at full charge.',
        effect: '+30% Full-Charge Knockdown',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Griffin', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Damned Golem', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Black Griffin', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'war_aug_hazan_defeat',
        name: 'Hazan defeat',
        jpName: '破斬破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt against heavy shielded and armored foes.',
        effect: '+25% Armor-Piercing Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_aug_demon_defeat',
        name: 'Demon defeat',
        jpName: '魔人破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt against Demon-type and Fiend-type monsters.',
        effect: '+20% Damage vs Demons',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_aug_demon_slayer_absolute',
        name: 'Demon Slayer Absolute',
        jpName: '魔人斬・極',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Maximizes the damage multiplier of Demon Slayer when released at full revenge gauge.',
        effect: '+35% Demon Slayer Damage at Max Gauge',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_aug_a_quick_flash',
        name: 'A quick flash',
        jpName: '迅閃',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces the charge time required to reach full charge levels on all skills.',
        effect: '-25% Greatsword Charge Time',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_aug_wide_slash',
        name: 'Wide slash',
        jpName: '広斬',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Expands the hit-box radius and cleave reach of all horizontal greatsword swings.',
        effect: '+25% Greatsword Cleave Radius',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_aug_attack_and_block',
        name: 'Attack and block',
        jpName: '攻防一体',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Grants invulnerability frames and hyper-armor during the startup frames of all counter skills.',
        effect: 'I-Frames on Counter Startup',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'war_aug_slash_and_crush',
        name: 'Slash and Crush',
        jpName: '斬砕',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Inflicts defense reduction upon enemies struck with charged heavy slashes.',
        effect: '-15% Enemy Physical Defense on Hit',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'war_aug_demonic_absolute',
        name: 'Demonic Absolute',
        jpName: '魔力極',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases resistance against all elemental magic attacks while hyper-armoring.',
        effect: '-30% Magick Damage during Hyper-Armor',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'war_aug_demon_slash_crush',
        name: 'Demon Slash Crush',
        jpName: '魔斬砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Massively increases critical hit damage when landing hits during monster enrage states.',
        effect: '+30% Critical Damage in Enrage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The Frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'war_aug_gogaku',
        name: 'Gogaku',
        jpName: '豪岳',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases stagger resistance and prevents being sent flying by colossal monster attacks.',
        effect: 'Immunity to Launch / Blowback',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'war_aug_wide_slash_crush',
        name: 'Wide Slash Crush',
        jpName: '広斬砕',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Causes horizontal sweeping slashes to release seismic shockwaves along the ground.',
        effect: 'Shockwave Cleave on Horizontal Swings',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'war_aug_resentment_lv77',
        name: 'Resentment (Lv77)',
        jpName: '大怨嗟',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Unleashes a catastrophic burst of revenge energy when landing a hit after absorbing full fatal damage.',
        effect: 'Fatal Damage Retaliation Burst',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 10. ALCHEMIST (アルケミスト)
  // ==========================================
  {
    id: 'alchemist',
    name: 'Alchemist',
    jpName: 'アルケミスト',
    role: 'Tank',
    weapon: 'Alchemy Gauntlet (魔導腕)',
    masterNpc: 'Theodor',
    masterLocation: 'Mergoda Ruins',
    unlockRequirement: 'Complete Mergoda Chapter Story Quest',
    minVersion: '3.1',
    playstyle: 'Alchemical tank manipulating elixirs, drawing monster aggression with gold transmutations, and detonating massive alchemical spikes.',
    customSkills: [
      {
        id: 'alc_alma_pillar',
        name: 'Alma Pillar',
        jpName: 'アルマ・ピラー',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Medium',
        description: 'Drive your gauntlet into the ground and create pillars that encircle you. Can be used while airborne.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bull Ape', count: 30, minEnemyLevel: 8 },
          { targetRank: 7, targetEnemy: 'Orb Enemy', count: 40, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Large Lizard', count: 10, minEnemyLevel: 10 },
          { targetRank: 9, targetEnemy: 'Lizardman', count: 15, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Cyclops', count: 5, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'alc_alma_wave',
        name: 'Alma Wave',
        jpName: 'アルマ・ウェイブ',
        type: 'custom',
        unlockLevel: 18,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Medium',
        description: 'Generate a grounded wave of alchemical substance that travels in a straight line.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Redcap', count: 15, minEnemyLevel: 8 },
          { targetRank: 7, targetEnemy: 'Sling Red Cap', count: 10, minEnemyLevel: 10 },
          { targetRank: 7, targetEnemy: 'Orc Soldier', count: 20, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Wolf', count: 40, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'White', count: 10, minEnemyLevel: 15 },
          { targetRank: 9, targetEnemy: 'Undead', count: 30, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Sphinx', count: 16, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'alc_rex_elementa',
        name: 'Rex Elementa',
        jpName: 'レクス・エレメンタ',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Low',
        description: 'Generate an alchemical orb imbued with fire, ice or lighting and place it on the ground.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Skeleton Alchemy', count: 10, minEnemyLevel: 10 },
          { targetRank: 7, targetEnemy: 'Skeleton Mage', count: 15, minEnemyLevel: 10 },
          { targetRank: 8, targetEnemy: 'Direwolf', count: 40, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Harpy', count: 30, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Dread Ape', count: 4, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Hobgoblin Fighter', count: 15, minEnemyLevel: 10 },
          { targetRank: 10, targetEnemy: 'Chimera', count: 20, minEnemyLevel: 25 }
        ]
      },
      {
        id: 'alc_rex_catapult',
        name: 'Rex Catapulta',
        jpName: 'レクス・カタパルト',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Medium',
        description: 'Place an alchemical device on the ground that propels allies who step on it into the air. Utility skill.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Large Sulfur', count: 10, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Skeleton Sorcerer', count: 15, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Orb Enemy', count: 40, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Colossus', count: 4, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Hobgoblin Leader', count: 13, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Lindworm', count: 15, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'White Chimera', count: 15, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_alma_windus',
        name: 'Alma Windust',
        jpName: 'アルマ・ウィンデュス',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'Medium',
        description: 'Place a wind-wrapped orb. Striking it after placement generates bursts of Wind Pressure. Utility skill.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Rock Lizard', count: 30, minEnemyLevel: 20 },
          { targetRank: 7, targetEnemy: 'Bull Ape', count: 20, minEnemyLevel: 18 },
          { targetRank: 8, targetEnemy: 'Fat Undead', count: 40, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Snow Harpy', count: 40, minEnemyLevel: 25 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 3, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Griffin', count: 3, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Golem', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'alc_pile_binder',
        name: 'Pile Binder',
        jpName: 'パイル・バインダー',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Pierce',
        staminaCost: 'Medium',
        description: 'Dash forward with your gauntlet extended, and drive an alchemical stake into the enemy.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Grimwarg', count: 20, minEnemyLevel: 20 },
          { targetRank: 7, targetEnemy: 'White', count: 4, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Troll', count: 8, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Blue Newt', count: 30, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Maltroll', count: 5, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_dorus_morsus',
        name: 'Dolus Morsus',
        jpName: 'ドルス・モルスス',
        type: 'custom',
        unlockLevel: 32,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Place a lingering alchemical orb on the ground that lashes out at in range for a duration.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Oak Aimer', count: 15, minEnemyLevel: 30 },
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 5, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Ent', count: 8, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Silver Roar', count: 10, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Geo Golem', count: 10, minEnemyLevel: 46 },
          { targetRank: 9, targetEnemy: 'Damned Goblin', count: 50, minEnemyLevel: 46 },
          { targetRank: 10, targetEnemy: 'Mogok', count: 5, minEnemyLevel: 50 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'alc_golda_aurum',
        name: 'Golda Aurum',
        jpName: 'ゴルダ・アウラム',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Encase yourself in glittering gold. Nullifies all damage, with some exceptions such as grab attacks and scripted oneshots. Enemies that land attacks on you will get Golden accumulation. Aerial activation is possible.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Cyclops', count: 3, minEnemyLevel: 50 },
          { targetRank: 7, targetEnemy: 'Angles', count: 2, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Nightmare', count: 3, minEnemyLevel: 50 },
          { targetRank: 8, targetEnemy: 'Chimera', count: 2, minEnemyLevel: 50 },
          { targetRank: 9, targetEnemy: 'Drake', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Zulu', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_alchem_burst',
        name: 'Alchemical Burst',
        jpName: 'アルケム・バースト',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Spawn a giant metal arm and punch with it. If this skill hits an alchemical stake, it will detonate it like Elixir. The power and debilitation rate of the skill relies on how developed the struck alchemical stake is. Can be used while climbing.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 7, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Scourge', count: 3, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_dorus_aerith',
        name: 'Dolus Aeris',
        jpName: 'ドルス・エアリス',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Leap into the air and condense an alchemical orb that floats. The orb will emit damaging shockwaves when enemies are in range.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Bifrost', count: 3, minEnemyLevel: 70 },
          { targetRank: 7, targetEnemy: 'Mad Invasion Behemoth', count: 3, minEnemyLevel: 70 },
          { targetRank: 8, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 },
          { targetRank: 9, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 75 },
          { targetRank: 10, targetEnemy: 'Adtarasque', count: 5, minEnemyLevel: 75 }
        ]
      },
      {
        id: 'alc_alma_sector',
        name: 'Alma Sector',
        jpName: 'アルマ・セクター',
        type: 'custom',
        unlockLevel: 75,
        maxRank: 10,
        element: 'Strike',
        staminaCost: 'High',
        description: 'Fire alchemical shrapnel in a radial pattern. Close range skill. Multiple hits may launch enemies or stagger them. Aerial activation is possible.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Mad Invasion Demon', count: 10, minEnemyLevel: 80 },
          { targetRank: 7, targetEnemy: 'Raging Griffin', count: 3, minEnemyLevel: 80 },
          { targetRank: 8, targetEnemy: 'Finderent', count: 3, minEnemyLevel: 80 },
          { targetRank: 9, targetEnemy: 'Black Knight', count: 5, minEnemyLevel: 80 },
          { targetRank: 10, targetEnemy: 'Spirit Dragon Wilmia', count: 5, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'alc_regia_barial',
        name: 'Regal Barrier',
        jpName: 'レギア・バリアル',
        type: 'custom',
        unlockLevel: 78,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'After a series of inputs, generate a dome-shaped protective zone that nullifies all damage. Enemies that enter the dome slowly accumulate the same debilitation your chosen Elixir has. More inputs will increase maximum duration.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Armored Gore Cyclops', count: 3, minEnemyLevel: 80 },
          { targetRank: 7, targetEnemy: 'Armored Gore Manticore', count: 3, minEnemyLevel: 80 },
          { targetRank: 8, targetEnemy: 'Catoblepas', count: 2, minEnemyLevel: 80 },
          { targetRank: 9, targetEnemy: 'Evil Eye', count: 3, minEnemyLevel: 80 },
          { targetRank: 10, targetEnemy: 'Ifrit', count: 3, minEnemyLevel: 90 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'alc_norm_transmute',
        name: 'Transmutation Spike (錬成針)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Injects golden needles into enemy weak points.'
      },
      {
        id: 'alc_norm_elixir_trap',
        name: 'Elixir Trap (エリクシル・トラップ)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Places chemical mines on the ground that explode upon enemy contact.'
      }
    ],
    augments: [
      {
        id: 'alc_aug_maikatsu',
        name: 'Maikatsu',
        jpName: '毎活',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Increases health recovery efficiency and natural regeneration speed.',
        effect: '+20% Natural HP Recovery Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Lizardman', count: 30, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Skeleton', count: 50, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'alc_aug_deprived_of_sight',
        name: 'deprived of sight',
        jpName: '奪視',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Draws additional monster aggro and attention upon landing alchemical strikes.',
        effect: '+25% Threat / Aggro Generation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Forest Goblin', count: 30, minEnemyLevel: 13 },
          { targetRank: 6, targetEnemy: 'Bull Ape', count: 30, minEnemyLevel: 17 }
        ]
      },
      {
        id: 'alc_aug_absolute_power',
        name: 'Absolute power',
        jpName: '絶力',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases physical knockdown power when detonating transmutation spikes.',
        effect: '+20% Spike Detonation Knockdown',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Fat Undead', count: 25, minEnemyLevel: 17 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 15, minEnemyLevel: 15 }
        ]
      },
      {
        id: 'alc_aug_immediate_recovery',
        name: 'Immediate recovery',
        jpName: '即復',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Decreases recovery time and stamina penalty when standing up from knockdown.',
        effect: 'Instant Knockdown Recovery',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Troll', count: 5, minEnemyLevel: 16 },
          { targetRank: 6, targetEnemy: 'Cyclops', count: 8, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'alc_aug_extension_decoy',
        name: 'extension decoy',
        jpName: '延囮',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Extends the duration of alchemical decoy lures and aggro beacons.',
        effect: '+30% Decoy Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goblin Alchemy', count: 10, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'alc_aug_overlooking',
        name: 'overlooking',
        jpName: '瞰視',
        unlockLevel: 25,
        maxRank: 6,
        ppCost: 6,
        description: 'Expands the effective radius of aggro-drawing skills and shouts.',
        effect: '+25% Aggro Area of Effect',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rock Lizard', count: 40, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 4, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'alc_aug_soul_sucking',
        name: 'soul sucking',
        jpName: '吸魂',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Absorbs enemy stamina when successfully triggering gold transmutation reactions.',
        effect: '+15% Stamina Drain on Transmutation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ent', count: 10, minEnemyLevel: 35 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 4, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'alc_aug_rapid_training',
        name: 'Rapid training',
        jpName: '速錬',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases the speed of alchemical material synthesis and skill charge time.',
        effect: '+20% Alchemy Casting Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Hobgoblin Leader', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Golem', count: 2, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Snow Harpy', count: 10, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'alc_aug_manifest',
        name: 'Manifest',
        jpName: '顕現',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases the maximum capacity of simultaneous transmutation spikes on monsters.',
        effect: '+2 Max Transmutation Spikes',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Grimwarg', count: 40, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Blue Newt', count: 50, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'alc_aug_rengo',
        name: 'Rengo',
        jpName: '錬合',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Combines multiple alchemical reactions to multiply status buildup efficacy.',
        effect: '+25% Compound Transmutation Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Alchemy', count: 10, minEnemyLevel: 10 },
          { targetRank: 5, targetEnemy: 'White', count: 4, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Goblin Alchemy', count: 17, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'alc_aug_hana_therapy',
        name: 'Hana therapy',
        jpName: '華療',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Restores a portion of nearby allies health upon detonating golden alchemy.',
        effect: 'AoE Healing on Gold Detonation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orc Soldier', count: 10, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Witch', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_awesome_technique',
        name: 'Awesome technique',
        jpName: '妙技',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases critical strike rate of all alchemical explosions and skills.',
        effect: '+15% Critical Chance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Lindworm', count: 3, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_renai',
        name: 'Renai',
        jpName: '錬愛',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 7,
        description: 'Enhances elemental defense and resistances of all party members within vicinity.',
        effect: '+20% Party Elemental Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Alchemy', count: 10, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Wolf Alchemy', count: 10, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Goliath', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Griffin Alchemy', count: 4, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'alc_aug_infiltration',
        name: 'Infiltration',
        jpName: '浸潤',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Allows elixir infusion to bypass high physical armor and defenses.',
        effect: '+30% Armor Penetration on Elixir',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Troll', count: 4, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_shinto_therapy',
        name: 'Shinto therapy',
        jpName: '浸療',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Restores stamina to the Alchemist whenever an ally deals damage to an elixir-marked enemy.',
        effect: 'Ally Hit Stamina Leech',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_usui',
        name: 'Usui',
        jpName: '薄膜',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces damage received from blunt strikes and massive physical impacts.',
        effect: '-15% Physical Strike Damage Taken',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orcbringer', count: 15, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'General Oak', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Captain Oak', count: 6, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_caress',
        name: 'caress',
        jpName: '撫撫',
        unlockLevel: 43,
        maxRank: 6,
        ppCost: 7,
        description: 'Prevents stamina consumption while climbing or clinging onto monsters.',
        effect: '-50% Climbing Stamina Consumption',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Maltroll', count: 8, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_easy_climb',
        name: 'Easy climb',
        jpName: '軽登',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases movement speed while climbing and scaling giant monsters.',
        effect: '+25% Monster Climbing Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Golem', count: 3, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_energy',
        name: 'Energy',
        jpName: '活力',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases maximum health pool and stamina capacity.',
        effect: '+300 Max HP & +150 Stamina',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 10, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Angles', count: 4, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'alc_aug_challenge',
        name: 'Challenge',
        jpName: '挑発',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Greatly increases the rate at which all actions accumulate monster aggression.',
        effect: '+40% Taunt / Aggro Multiplier',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 40 },
          { targetRank: 5, targetEnemy: 'Golem', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Black Griffin', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'alc_aug_prosperity',
        name: 'prosperity',
        jpName: '栄錬',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases gold currency drops and rare alchemy ingredient drops from defeated foes.',
        effect: '+25% Gold & Material Drop Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Geo Golem', count: 8, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Goliath', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Skeleton Alchemy', count: 17, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'alc_aug_dragon_guard',
        name: 'Dragon Guard',
        jpName: '竜防',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces all damage received from Dragon-kin monsters and dragon breath attacks.',
        effect: '-25% Damage Taken vs Dragonkin',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 8, minEnemyLevel: 56 },
          { targetRank: 5, targetEnemy: 'Angles', count: 8, minEnemyLevel: 56 },
          { targetRank: 6, targetEnemy: 'Mistworm', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_quick_action',
        name: 'quick action',
        jpName: '速動',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces stamina consumption and cooldown delays between evasive dodges and leaps.',
        effect: '-25% Evasion Stamina Cost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Goliath', count: 3, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Alchemy Eye', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Gigan Machina', count: 2, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Nightmare', count: 4, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'alc_aug_kairen',
        name: 'Kairen',
        jpName: '解錬',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the damage dealt when shattering gold transmutations with physical strikes.',
        effect: '+25% Transmutation Shatter Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skull Lord', count: 6, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Shadow Wolf', count: 14, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Shadow Chimera', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Death Knight', count: 6, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'alc_aug_dragon_hunter',
        name: 'Dragon Hunter',
        jpName: '竜討',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage and knockdown values against Dragon-type monsters.',
        effect: '+20% Damage vs Dragons',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mist Drake', count: 4, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Elder Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_renka_defeat',
        name: 'Renka defeat',
        jpName: '錬華破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage against monsters suffering from gold transmutation encasement.',
        effect: '+25% Damage to Gold Encrusted Targets',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Hobgoblin', count: 10, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Bolgrimwarg', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_defeat',
        name: 'defeat',
        jpName: '撃破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases physical knockdown impact when hitting enraged monsters weak spots.',
        effect: '+20% Knockdown on Weak Points',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 7, minEnemyLevel: 50 },
          { targetRank: 5, targetEnemy: 'Lizardman\'s Sage', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_renbaku_defeat',
        name: 'Renbaku defeat',
        jpName: '錬爆破',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases explosion radius and blast damage of all elixir explosions.',
        effect: '+25% Elixir Blast Area & DMG',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_hard_vision',
        name: 'hard vision',
        jpName: '固視',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Locks monster aggression onto the Alchemist for a fixed minimum duration upon drawing aggro.',
        effect: 'Forced Aggro Lock Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 7, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_renchou_defeat',
        name: 'Renchou defeat',
        jpName: '錬蝶破',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the duration of status ailments applied through alchemical transmutations.',
        effect: '+30% Status Ailment Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Medusa', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Manticore', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Altered Zulu', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_robust',
        name: 'Robust',
        jpName: '剛体',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Grants continuous poise and hyper-armor, making the Alchemist impervious to small stagger attacks.',
        effect: 'Super-Armor against Light Attacks',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupted Orc Soldier', count: 5, minEnemyLevel: 60 },
          { targetRank: 5, targetEnemy: 'Corrupting Orc Banger', count: 5, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Stagnant Great Dragon Power', count: 2, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'alc_aug_breaking_and_crushing',
        name: 'Breaking and crushing',
        jpName: '破砕',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases damage dealt against hardened shell, armor plates, and enemy shields.',
        effect: '+30% Shield & Armor Shatter Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Mad Pixie', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'White Griffin', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'alc_aug_refinement_avoidance_crushing',
        name: 'Refinement Avoidance Crushing',
        jpName: '避錬砕',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Triggers an immediate alchemical counter-burst upon executing a perfect dodge.',
        effect: 'Perfect Dodge Counter Explosion',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frenzied Warg', count: 7, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Grigori Baird', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Spineback', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'alc_aug_alchemy_and_explosion',
        name: 'Alchemy and explosion',
        jpName: '錬爆',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Accelerates the speed at which consecutive transmutation spikes trigger chain explosions.',
        effect: '+35% Chain Detonation Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Footbiter', count: 14, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'The Frenzied Styparides', count: 14, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 1, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'alc_aug_empty_extinction',
        name: 'empty extinction',
        jpName: '空滅',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases damage dealt against airborne, flying, and hovering monsters.',
        effect: '+25% Aerial Target Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gargoyle', count: 10, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Little Spine', count: 10, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Gore Chimera', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'alc_aug_renkou_breaking',
        name: 'Renkou Breaking',
        jpName: '錬鋼破',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Significantly increases physical defense when standing in golden transmutation fields.',
        effect: '+30% Defense in Transmutation Fields',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Eliminator Slay', count: 4, minEnemyLevel: 70 },
          { targetRank: 5, targetEnemy: 'Green Guardian', count: 7, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Raging Griffin', count: 2, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'alc_aug_shuren',
        name: 'Shuren',
        jpName: '集錬',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Draws all residual alchemical particles in the battlefield directly back into the gauntlet to restore full elixir gauge.',
        effect: 'Instant Full Gauge Recharge on Call',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Finderent', count: 2, minEnemyLevel: 80 },
          { targetRank: 5, targetEnemy: 'Pixie King', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Scourge', count: 2, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 1, minEnemyLevel: 80 }
        ]
      }
    ]
  },

  // ==========================================
  // 11. HIGH SCEPTER (ハイセプター)
  // ==========================================
  {
    id: 'high_scepter',
    name: 'High Scepter',
    jpName: 'ハイセプター',
    role: 'Attacker (Physical & Magick)',
    weapon: 'Magic Sword (魔剣)',
    masterNpc: 'Kristy',
    masterLocation: '(the Plateau Shack) outside the city of Megadosys near the Eli Tower',
    unlockRequirement: 'Available in Season 3.2+ (Clear Season 3 Acker Island Chapter)',
    minVersion: '3.2',
    playstyle: 'Ultra-fast spellblade blinking across the battlefield with magical rapier slashes and instant runic blade arts.',
    customSkills: [
      {
        id: 'hsc_circular_moon',
        name: 'Circular Moon',
        jpName: 'ルナ・サーキュラー',
        type: 'custom',
        unlockLevel: 1,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Low',
        description: 'Imbue your sword with Holy attribute and attack surrounding enemies. Damage increases when the Magick Glyph grows.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Direwolf', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Armor Cyclops', count: 4, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Ent', count: 4, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Chimera', count: 5, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hsc_mirage_shift',
        name: 'Mirage Shift',
        jpName: 'ミラージュ・シフト',
        type: 'custom',
        unlockLevel: 20,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Low',
        description: 'Creates a phantom and teleports forward. Contact during warp deals magick damage. Two aerial uses.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Orb Enemy', count: 15, minEnemyLevel: 20 },
          { targetRank: 8, targetEnemy: 'Ogre', count: 4, minEnemyLevel: 20 },
          { targetRank: 9, targetEnemy: 'Sphinx', count: 4, minEnemyLevel: 20 },
          { targetRank: 10, targetEnemy: 'Lindworm', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'hsc_dim_slice',
        name: 'Dim Slice',
        jpName: 'ディム・スライス',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Dark',
        staminaCost: 'Medium',
        description: 'Ready your sword downwards, releases several magick blades towards enemies in front of you.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Grimwarg', count: 15, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'White', count: 4, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Griffin', count: 4, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Witch', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_black_flash_fang',
        name: 'Black Flash Fang',
        jpName: '黒閃牙',
        type: 'custom',
        unlockLevel: 27,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'Medium',
        description: 'Thrusts the blade imbued with dark magick into the target’s body before pulling it out. Damage is increased when the Magick Glyph grows.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Blue Newt', count: 15, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Golem', count: 4, minEnemyLevel: 30 },
          { targetRank: 9, targetEnemy: 'Colossus', count: 4, minEnemyLevel: 30 },
          { targetRank: 10, targetEnemy: 'Behemoth', count: 5, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'hsc_wall_barrier',
        name: 'Wall Barrier',
        jpName: 'ウォール・バリア',
        type: 'custom',
        unlockLevel: 33,
        maxRank: 10,
        element: 'None',
        staminaCost: 'Medium',
        description: 'Creates a magical barrier ahead that persists for fixed duration. Duration unaffected by pure magick activation.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Captain Oak', count: 6, minEnemyLevel: 30 },
          { targetRank: 8, targetEnemy: 'Silver Roar', count: 4, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Maltroll', count: 4, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Cockatrice', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_terror_blast',
        name: 'Terror Blast',
        jpName: 'テラー・ブラスト',
        type: 'custom',
        unlockLevel: 38,
        maxRank: 10,
        element: 'Dark',
        staminaCost: 'High',
        description: 'Slashes enemies with magick blades, inflicting continuous Dark and Slash damage. Extra inputs add hits.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Orb Enemy', count: 15, minEnemyLevel: 40 },
          { targetRank: 8, targetEnemy: 'Sphinx', count: 4, minEnemyLevel: 40 },
          { targetRank: 9, targetEnemy: 'Geo Golem', count: 4, minEnemyLevel: 40 },
          { targetRank: 10, targetEnemy: 'Black Griffin', count: 5, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_eclipse_bright',
        name: 'Eclipse Bright',
        jpName: 'エクリプス・ブライト',
        type: 'custom',
        unlockLevel: 67,
        maxRank: 10,
        element: 'Holy',
        staminaCost: 'High',
        description: 'Create a vortex that deals Holy and Impact damage.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Frost Machina', count: 5, minEnemyLevel: 60 },
          { targetRank: 8, targetEnemy: 'Erosion Behemoth', count: 4, minEnemyLevel: 60 },
          { targetRank: 9, targetEnemy: 'Corrupting Griffin', count: 4, minEnemyLevel: 60 },
          { targetRank: 10, targetEnemy: 'Scourge', count: 5, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hsc_phantom_edge',
        name: 'Phantom Edge',
        jpName: 'ファントム・エッジ',
        type: 'custom',
        unlockLevel: 78,
        maxRank: 10,
        element: 'Slash',
        staminaCost: 'High',
        description: 'Enchants sword with magick, adding afterimages to normal attacks. Extra input releases magic-absorbing strike scaling with hits. Drains magic.',
        levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
        jobTraining: [
          { targetRank: 7, targetEnemy: 'Black Knight', count: 3, minEnemyLevel: 80 },
          { targetRank: 8, targetEnemy: 'Evil Eye', count: 3, minEnemyLevel: 80 },
          { targetRank: 9, targetEnemy: 'Ifrit', count: 3, minEnemyLevel: 90 },
          { targetRank: 10, targetEnemy: 'Ushumgal', count: 3, minEnemyLevel: 90 }
        ]
      }
    ],
    normalSkills: [
      {
        id: 'hsc_norm_blink',
        name: 'Blink Dodge (瞬歩)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Teleports through enemy attacks with zero collision.'
      },
      {
        id: 'hsc_norm_runic_draw',
        name: 'Runic Draw (魔力吸収)',
        type: 'normal',
        unlockLevel: 1,
        maxRank: 6,
        description: 'Absorbs residual magical power on blade contact to charge sword runes.'
      }
    ],
    augments: [
      {
        id: 'hsc_aug_seal_seal',
        name: 'Seal seal',
        jpName: '封印',
        unlockLevel: 18,
        maxRank: 6,
        ppCost: 5,
        description: 'Enhances resistance against seal and silence status ailments.',
        effect: 'Seal Resistance Boost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Lizardman', count: 7, minEnemyLevel: 10 },
          { targetRank: 6, targetEnemy: 'Skeleton', count: 10, minEnemyLevel: 10 }
        ]
      },
      {
        id: 'hsc_aug_retsuto',
        name: 'Retsuto',
        jpName: '烈刀',
        unlockLevel: 23,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases slashing physical attack power of magical sword arts.',
        effect: '+10% Slash Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Troll', count: 2, minEnemyLevel: 16 },
          { targetRank: 6, targetEnemy: 'Cyclops', count: 2, minEnemyLevel: 18 }
        ]
      },
      {
        id: 'hsc_aug_seal',
        name: 'seal',
        jpName: '封絶',
        unlockLevel: 27,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases the likelihood of sealing enemy magical casting and special skills.',
        effect: '+20% Seal Infliction Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Rock Lizard', count: 7, minEnemyLevel: 25 },
          { targetRank: 6, targetEnemy: 'Dread Ape', count: 3, minEnemyLevel: 20 }
        ]
      },
      {
        id: 'hsc_aug_powerful_shot',
        name: 'Powerful shot',
        jpName: '豪放',
        unlockLevel: 30,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases knockdown and stagger values when landing heavy sword skills.',
        effect: '+15% Knockdown Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Hobgoblin Leader', count: 10, minEnemyLevel: 20 },
          { targetRank: 6, targetEnemy: 'Golem', count: 3, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'hsc_aug_danger',
        name: 'Danger',
        jpName: '危急',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Increases attack power when player HP drops below critical threshold.',
        effect: '+20% Low HP Attack Boost',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orc Soldier', count: 7, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Witch', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_aug_active_town',
        name: 'active town',
        jpName: '活鎮',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Reduces stamina consumption while maintaining continuous guard or parry stance.',
        effect: '-20% Stance Stamina Drain',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Blue Newt', count: 7, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Sphinx', count: 2, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_aug_seishin_35',
        name: 'Seishin',
        jpName: '清心',
        unlockLevel: 35,
        maxRank: 6,
        ppCost: 6,
        description: 'Accelerates recovery from mental debuffs and status conditions.',
        effect: '+30% Debuff Recovery Speed',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Wolf Alchemy', count: 9, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Griffin Alchemy', count: 3, minEnemyLevel: 50 }
        ]
      },
      {
        id: 'hsc_aug_intake',
        name: 'intake',
        jpName: '吸活',
        unlockLevel: 38,
        maxRank: 6,
        ppCost: 7,
        description: 'Restores a portion of stamina upon landing magic sword absorption skills.',
        effect: '+15% Stamina Drain Absorption',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'White', count: 4, minEnemyLevel: 30 },
          { targetRank: 6, targetEnemy: 'Lindworm', count: 2, minEnemyLevel: 30 }
        ]
      },
      {
        id: 'hsc_aug_military_fortune',
        name: 'Military fortune',
        jpName: '武運',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases critical hit damage and critical chance during continuous combos.',
        effect: '+12% Critical Rate & Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Silver Roar', count: 3, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Armor Cyclops', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_aug_magical_enthusiast',
        name: 'Magical Enthusiast',
        jpName: '魔熱',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases elemental magic sword attack power.',
        effect: '+10% Magick Attack',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Troll', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_aug_yongzhen',
        name: 'Yongzhen',
        jpName: '勇鎮',
        unlockLevel: 40,
        maxRank: 6,
        ppCost: 7,
        description: 'Grants stagger and flinch resistance when executing magic sword skills.',
        effect: 'Hyper-Armor on Skill Activation',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Orcbringer', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'General Oak', count: 7, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Captain Oak', count: 7, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_aug_seishin_45',
        name: 'Seishin (Lv45)',
        jpName: '精身',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Boosts maximum stamina and reduces stamina consumption during high-speed actions.',
        effect: '+200 Max Stamina',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Behemoth', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Golem', count: 3, minEnemyLevel: 46 }
        ]
      },
      {
        id: 'hsc_aug_demon_slayer',
        name: 'Demon Slayer',
        jpName: '魔滅',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Increases damage dealt against Demonic and Spirit-type fiends.',
        effect: '+15% Damage vs Demons',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Maltroll', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'White Chimera', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_aug_demon_transformation',
        name: 'Demon transformation',
        jpName: '魔変',
        unlockLevel: 45,
        maxRank: 6,
        ppCost: 7,
        description: 'Enhances magic energy conversion efficiency into sword blade enchantments.',
        effect: '+15% Elemental Enchant Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Colossus', count: 2, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Griffin', count: 3, minEnemyLevel: 40 }
        ]
      },
      {
        id: 'hsc_aug_thick_feet',
        name: 'Thick feet',
        jpName: '厚足',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 7,
        description: 'Reduces falling damage and decreases recovery time after landing or tumbling.',
        effect: 'Fall Damage Immunity & Quick Stand',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghoul', count: 3, minEnemyLevel: 46 },
          { targetRank: 6, targetEnemy: 'Chimera', count: 3, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'hsc_aug_source_luck',
        name: 'source luck',
        jpName: '源運',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the acquisition rate of rare enemy materials and drops.',
        effect: '+15% Rare Material Drop Rate',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Angles', count: 3, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Black Griffin', count: 4, minEnemyLevel: 56 }
        ]
      },
      {
        id: 'hsc_aug_guard',
        name: 'Guard',
        jpName: '守勢',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases guard defense and significantly reduces guard stamina consumption.',
        effect: '+25% Guard Strength',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Drake', count: 2, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Commander Dwarf Orc', count: 7, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Armored Gore Cyclops', count: 3, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_artillery_fire',
        name: 'Artillery fire',
        jpName: '砲撃',
        unlockLevel: 51,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases explosion and blast radius damage for magical projectile skills.',
        effect: '+20% Magical Blast Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ghost Mail', count: 5, minEnemyLevel: 40 },
          { targetRank: 6, targetEnemy: 'Throwing Dwarf Orcs', count: 10, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_crushing_armor',
        name: 'Crushing armor',
        jpName: '破鎧',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt against armored portions and shields of monsters.',
        effect: '+25% Damage vs Armored Enemies',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skull Lord', count: 5, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Armored Grimwarg', count: 10, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Armored Gore Manticore', count: 3, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_war_target',
        name: 'War Target',
        jpName: '戦的',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases critical attack power against targeted enemy weak spots.',
        effect: '+20% Weak Spot Critical Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Shadow Chimera', count: 2, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Armored Lizardman', count: 10, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Armored Nightmare', count: 3, minEnemyLevel: 90 }
        ]
      },
      {
        id: 'hsc_aug_supplement',
        name: 'Supplement',
        jpName: '追補',
        unlockLevel: 56,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases the duration and effect of active enchantments and enhancements.',
        effect: '+30% Enchantment Duration',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Geo Golem', count: 2, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Mistworm', count: 4, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hsc_aug_setuma',
        name: 'Setuma',
        jpName: '刹魔',
        unlockLevel: 60,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage dealt within the first 5 seconds of entering combat.',
        effect: '+25% Initial Burst Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Living Armor', count: 7, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Wilm', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hsc_aug_anti_decrease',
        name: 'anti-decrease',
        jpName: '抗減',
        unlockLevel: 60,
        maxRank: 6,
        ppCost: 8,
        description: 'Reduces durability wear and resists status parameter reduction effects.',
        effect: '+50% Stat Reduction Resistance',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Empress Ghost', count: 5, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Frenzied Gore Cyclops', count: 4, minEnemyLevel: 70 },
          { targetRank: 6, targetEnemy: 'Mad Invasion Behemoth', count: 4, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'hsc_aug_soaring_sword',
        name: 'Soaring Sword',
        jpName: '翔剣',
        unlockLevel: 60,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage and knockdown power when performing jumping or mid-air sword skills.',
        effect: '+18% Aerial Attack Power',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Death Knight', count: 4, minEnemyLevel: 50 },
          { targetRank: 6, targetEnemy: 'Cockatrice', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hsc_aug_defeated_in_four_hits',
        name: 'Defeated in four hits',
        jpName: '四撃破',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Significantly increases damage of the 4th hit in regular attack and combo chains.',
        effect: '+30% 4th Hit Combo Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Frost Machina', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Gorgoran', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hsc_aug_arc_attack',
        name: 'arc attack',
        jpName: '弧撃',
        unlockLevel: 57,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases sweeping wide-angle blade damage against multiple surrounding foes.',
        effect: '+15% Sweeping Blade Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Erosion Behemoth', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Curse Dragon', count: 3, minEnemyLevel: 60 }
        ]
      },
      {
        id: 'hsc_aug_sky_fork',
        name: 'sky fork',
        jpName: '天叉',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Enhances vertical descending thrust damage and knockdown impact.',
        effect: '+20% Plunging Strike Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Corrupting Griffin', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Tarasque', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'hsc_aug_ascent_and_fall',
        name: 'Ascent and fall',
        jpName: '昇墜',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases damage when alternating between rising and falling sword arts.',
        effect: '+20% Aerial Transition Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Erosion Gore Cyclops', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Adtarasque', count: 3, minEnemyLevel: 70 }
        ]
      },
      {
        id: 'hsc_aug_regular_attack',
        name: 'Regular attack',
        jpName: '常撃',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases base damage of normal attacks and light sword strikes.',
        effect: '+18% Normal Attack Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Altered Zulu', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Black Knight', count: 3, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_unbalanced_absorption',
        name: 'unbalanced absorption',
        jpName: '偏吸',
        unlockLevel: 62,
        maxRank: 6,
        ppCost: 8,
        description: 'Increases magic rune draw rate when attacking enraged or destabilized monsters.',
        effect: '+30% Magic Rune Absorption',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Stagnant Great Dragon Power', count: 3, minEnemyLevel: 60 },
          { targetRank: 6, targetEnemy: 'Spirit Dragon Wilmia', count: 3, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_four_hits_absorb',
        name: 'Four hits, absorb',
        jpName: '四撃吸',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Restores stamina on every 4th combo hit connecting with target.',
        effect: 'Stamina Drain on 4th Hit',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Ancestor Origins', count: 3, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Cragger', count: 3, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Evil Eye', count: 3, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_arc_sucking',
        name: 'arc sucking',
        jpName: '弧吸',
        unlockLevel: 67,
        maxRank: 6,
        ppCost: 9,
        description: 'Draws extra magical gauge when sweeping through multiple targets.',
        effect: '+25% Multi-Target Rune Draw',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Fodden', count: 3, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Armored Ogre', count: 3, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Ifrit', count: 3, minEnemyLevel: 90 }
        ]
      },
      {
        id: 'hsc_aug_sucking',
        name: 'Sucking',
        jpName: '吸衝',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Increases knockdown and impact shockwaves during magical absorption.',
        effect: '+25% Absorption Shockwave',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Warg', count: 10, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Skeleton Cyclops', count: 3, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Catoblepas', count: 3, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_ascension_sucking',
        name: 'Ascension sucking',
        jpName: '昇吸',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Draws magical power while executing rising launch attacks.',
        effect: '+20% Rising Strike Magic Draw',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Gore Manticore', count: 3, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'Greater Goblin', count: 10, minEnemyLevel: 80 },
          { targetRank: 6, targetEnemy: 'White Tarasque', count: 3, minEnemyLevel: 80 }
        ]
      },
      {
        id: 'hsc_aug_movement',
        name: 'Movement',
        jpName: '動連',
        unlockLevel: 72,
        maxRank: 6,
        ppCost: 9,
        description: 'Decreases delay between consecutive dodge blinks and follow-up skills.',
        effect: '-25% Post-Dodge Delay',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Skeleton Lord Abyss', count: 3, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Bolt eye', count: 3, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Ushumgal', count: 5, minEnemyLevel: 90 }
        ]
      },
      {
        id: 'hsc_aug_flow_attack',
        name: 'flow attack',
        jpName: '流撃',
        unlockLevel: 77,
        maxRank: 6,
        ppCost: 10,
        description: 'Continuously increases damage output as long as continuous attack combo remains unbroken.',
        effect: '+30% Momentum Combo Damage',
        jobTraining: [
          { targetRank: 5, targetEnemy: 'Burned Ent', count: 3, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Blaze Chimera', count: 3, minEnemyLevel: 90 },
          { targetRank: 6, targetEnemy: 'Evil Dragon', count: 3, minEnemyLevel: 90 }
        ]
      }
    ]
  }
];

export const ALL_VOCATIONS: VocationData[] = RAW_VOCATIONS.map(enrichVocationWithJobSkillData);

