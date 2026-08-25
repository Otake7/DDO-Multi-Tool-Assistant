import { CommunityFarmSpot } from '../types';

export const SEED_COMMUNITY_FARM_SPOTS: CommunityFarmSpot[] = [
  {
    id: 'spot-rising-volden-cyclops',
    name: 'Volden Mines Double Cyclops & Goblin Blitz',
    region: 'Volden Mines',
    levelRange: 'Lv 20–35',
    minLevel: 20,
    maxLevel: 35,
    xpPerRun: 14850,
    goldPerRun: 4200,
    runsToLevel: 4,
    targetEnemies: '2x Armored Cyclops, 12x Mine Goblin Miners',
    description: 'Fast circular cave loop right next to Tel Outpost camp. Clear the goblin tunnel, pull both Cyclops into the narrow corridor for huge Sorcerer/Alchemist AOE spell-sync burst.',
    recommendedVocations: ['Sorcerer', 'Alchemist', 'High Scepter', 'Fighter'],
    server: 'Rising',
    authorName: 'Klaus_Volden',
    authorClan: '[Rising Vanguard]',
    verified: true,
    upvotes: 42,
    createdAt: Date.now() - 86400000 * 5,
    quests: [
      {
        questId: 'q00020150',
        name: 'Volden Mine Cleanup Strike',
        xp: 9850,
        gold: 3000,
        recommendedQuantity: 3
      },
      {
        questId: 'q00020151',
        name: 'Ore Guardian Subjugation',
        xp: 5000,
        gold: 1200,
        recommendedQuantity: 3
      }
    ]
  },
  {
    id: 'spot-mergoda-golem-rush',
    name: 'Mergoda Central Core: Golem & Medusa Circuit',
    region: 'Mergoda Ruins',
    levelRange: 'Lv 55–70',
    minLevel: 55,
    maxLevel: 70,
    xpPerRun: 45600,
    goldPerRun: 11500,
    runsToLevel: 6,
    targetEnemies: 'Grand Golem, Shadow Medusa, Alchemic Guardians',
    description: 'Fastest mid-to-high rank circuit in Season 3.1. Requires Shield Sage or Element Archer for Torpor to lock down the Medusa gaze, followed by heavy physical blunt DPS on Golem medal cores.',
    recommendedVocations: ['Shield Sage', 'Warrior', 'Element Archer', 'Hunter'],
    server: 'Rising',
    authorName: 'GrandArisen_Vanessa',
    authorClan: '[WhiteWing]',
    verified: true,
    upvotes: 68,
    createdAt: Date.now() - 86400000 * 3,
    quests: [
      {
        questId: 'q20050000',
        name: 'Mergoda Lower Depths Investigation',
        xp: 22800,
        gold: 6000,
        recommendedQuantity: 4
      },
      {
        questId: 'q20050001',
        name: 'Ancient Core Awakening',
        xp: 22800,
        gold: 5500,
        recommendedQuantity: 4
      }
    ]
  },
  {
    id: 'spot-bloodbane-drake-run',
    name: 'Bloodbane Isle: Volcanic Drake & Wyrm Duo Sprint',
    region: 'Bloodbane Isle',
    levelRange: 'Lv 70–85',
    minLevel: 70,
    maxLevel: 85,
    xpPerRun: 78200,
    goldPerRun: 18400,
    runsToLevel: 8,
    targetEnemies: 'Fire Drake, Frost Wyrm, Hellhound Pack',
    description: 'Highest single-turn-in XP density for Level 70–85 before hitting the ring cutoff at Lv 90. Equip 50% XP ring and ice weapon enchants for maximum DPS multiplier.',
    recommendedVocations: ['High Scepter', 'Sorcerer', 'Priest', 'Spirit Lancer'],
    server: 'Rising',
    authorName: 'RiftWalker_Rex',
    authorClan: '[Dragonforged]',
    verified: true,
    upvotes: 95,
    createdAt: Date.now() - 86400000 * 1,
    quests: [
      {
        questId: 'q20060001',
        name: 'Bloodbane Shore Dragon Roar',
        xp: 39100,
        gold: 9200,
        recommendedQuantity: 5
      },
      {
        questId: 'q20060002',
        name: 'Volcano Core Dragon Trial',
        xp: 39100,
        gold: 9200,
        recommendedQuantity: 5
      }
    ]
  },
  {
    id: 'spot-megadosys-manticore-grind',
    name: 'Megadosys Plateau Manticore & Treant Route',
    region: 'Megadosys Plateau',
    levelRange: 'Lv 90–100',
    minLevel: 90,
    maxLevel: 100,
    xpPerRun: 94500,
    goldPerRun: 24000,
    runsToLevel: 12,
    targetEnemies: 'Ancient Manticore, Grand Treant, Dark Ogres',
    description: 'Premier Level 90+ endgame route. Focus on Tarred + Fire debuff combinations to melt the Ancient Treant HP bar in under 45 seconds.',
    recommendedVocations: ['Alchemist', 'Sorcerer', 'Seeker', 'Fighter'],
    server: 'Rising',
    authorName: 'LestaniaOverlord',
    authorClan: '[Apex]',
    verified: true,
    upvotes: 53,
    createdAt: Date.now() - 86400000 * 2,
    quests: [
      {
        questId: 'q22018037',
        name: 'Eager to Train (練磨の魁)',
        xp: 37800,
        gold: 5500,
        recommendedQuantity: 5
      },
      {
        questId: 'q22018038',
        name: 'Something Spilling from Darkness',
        xp: 37800,
        gold: 5500,
        recommendedQuantity: 5
      }
    ]
  }
];
