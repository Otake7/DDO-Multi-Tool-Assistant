import { LevelPresetRoute } from '../types';

export const LEVELING_PRESETS: LevelPresetRoute[] = [
  {
    id: 'starter_sprint_1_15',
    name: 'Starter Sprint (Lv 1 → 15)',
    levelRange: 'Lv 1 - 15',
    region: 'Hidell Plains & Tel Village',
    description: 'Fastest opening route. Notice board wolf and goblin runs combined with the Cyclops world quest and early Main Story.',
    quests: [
      { questId: 'q00010010', quantity: 1 },
      { questId: 'q00010030', quantity: 1 },
      { questId: 'q00010040', quantity: 1 },
      { questId: 'wq_01_03', quantity: 8 },
      { questId: 'wq_01_04', quantity: 4 },
      { questId: 'pq_job_01', quantity: 1 }
    ]
  },
  {
    id: 'coastal_forest_15_30',
    name: 'Coast & Dread Ape Loop (Lv 15 → 30)',
    levelRange: 'Lv 15 - 30',
    region: 'Breya Coast & Mysree Forest',
    description: 'Breya Sahuagin repeats into Mysree Dread Ape and Ent hunts. Solid Blood Orb collection and fast leveling.',
    quests: [
      { questId: 'wq_02_01', quantity: 8 },
      { questId: 'wq_02_02', quantity: 5 },
      { questId: 'wq_03_01', quantity: 10 },
      { questId: 'wq_03_03', quantity: 6 },
      { questId: 'q00010080', quantity: 1 }
    ]
  },
  {
    id: 'volden_dow_30_50',
    name: 'Volden Mine & Dow Castle Assault (Lv 30 → 50)',
    levelRange: 'Lv 30 - 50',
    region: 'Volden Mines & Dowe Valley',
    description: 'High-density Orc and Magma Golem runs. Rapid level jumps when combined with the 50% XP ring boost.',
    quests: [
      { questId: 'wq_04_01', quantity: 8 },
      { questId: 'wq_04_02', quantity: 6 },
      { questId: 'wq_05_01', quantity: 10 },
      { questId: 'wq_05_03', quantity: 6 },
      { questId: 'q00010110', quantity: 1 }
    ]
  },
  {
    id: 'grand_ent_zandora_50_70',
    name: 'Deenan Tree & Zandora Behemoth (Lv 50 → 70)',
    levelRange: 'Lv 50 - 70',
    region: 'Deenan Woods & Zandora Wastelands',
    description: 'Deenan Griffin and Zandora border Drake clearing for rapid Season 1.2 and Season 2 progression.',
    quests: [
      { questId: 'wq_07_01', quantity: 8 },
      { questId: 'wq_07_03', quantity: 6 },
      { questId: 'wq_10_01', quantity: 10 },
      { questId: 'wq_10_03', quantity: 6 },
      { questId: 'q00012020', quantity: 1 }
    ]
  },
  {
    id: 'mergoda_megado_70_85',
    name: 'Mergoda Palace & Megadosys Plateau (Lv 70 → 85)',
    levelRange: 'Lv 70 - 85',
    region: 'Mergoda Ruins & Megadosys Plateau',
    description: 'Automaton suppression combined with Megadosys Plateau daily blitz. The core 70-85 powerleveling path.',
    quests: [
      { questId: 'wq_12_01', quantity: 8 },
      { questId: 'wq_12_02', quantity: 6 },
      { questId: 'wq_20_01', quantity: 10 },
      { questId: 'wq_20_02', quantity: 8 },
      { questId: 'q00030010', quantity: 1 }
    ]
  },
  {
    id: 'finis_cap_85_100',
    name: 'Urteca Mountains & 100 Maximum Cap Rush (Lv 85 → 100)',
    levelRange: 'Lv 85 - 100',
    region: 'Urteca Moutains & White Dragon Pinnacle',
    description: 'Max level push. Uses high-tier XP boosts and grinds Urteca Mountain dragon trials and Season 3.4 finale.',
    quests: [
      { questId: 'wq_21_01', quantity: 10 },
      { questId: 'wq_21_02', quantity: 8 },
      { questId: 'pq_at_12', quantity: 5 },
      { questId: 'q00033010', quantity: 1 },
      { questId: 'q00034010', quantity: 1 }
    ]
  },
  {
    id: 'paragon_cap_100_120',
    name: 'Paragon Mastery & 120 Grand Cap Grind (Lv 100 → 120)',
    levelRange: 'Lv 100 - 120',
    region: 'Urteca Mountains & High Endgame Raids',
    description: 'Ultimate endgame leveling loop to reach Level 120 Cap. High-density repeatable World Quests and Area Trials.',
    quests: [
      { questId: 'wq_21_01', quantity: 25 },
      { questId: 'wq_21_02', quantity: 20 },
      { questId: 'pq_at_12', quantity: 15 },
      { questId: 'q00034010', quantity: 10 }
    ]
  }
];
