class QuestItem {
  final String id;
  final String name;
  final String zone;
  final int minLevel;
  final int baseExp;
  final int gold;
  final String targetEnemy;
  final String category; // 'NoticeBoard', 'World', 'Main', 'Custom'

  const QuestItem({
    required this.id,
    required this.name,
    required this.zone,
    required this.minLevel,
    required this.baseExp,
    required this.gold,
    required this.targetEnemy,
    this.category = 'NoticeBoard',
  });
}

class LevelingPresetItem {
  final String id;
  final String name;
  final String levelRange;
  final String description;
  final List<String> questIds;

  const LevelingPresetItem({
    required this.id,
    required this.name,
    required this.levelRange,
    required this.description,
    required this.questIds,
  });
}

final List<QuestItem> SAMPLE_QUESTS = [
  const QuestItem(
    id: 'q_tinder_goblins',
    name: 'Goblin Scouting Party',
    zone: 'Tel Village Outskirts',
    minLevel: 1,
    baseExp: 1250,
    gold: 300,
    targetEnemy: '8x Tinder Goblins',
  ),
  const QuestItem(
    id: 'q_orc_clearing',
    name: 'Orc Raiding Patrol',
    zone: 'Blandas Grasslands',
    minLevel: 10,
    baseExp: 4200,
    gold: 850,
    targetEnemy: '6x Blandas Orcs, 1x Leader',
  ),
  const QuestItem(
    id: 'q_cyclops_threat',
    name: 'Raging One-Eyed Colossus',
    zone: 'Hidell Plains Valley',
    minLevel: 25,
    baseExp: 18500,
    gold: 2400,
    targetEnemy: '1x Armored Cyclops',
  ),
  const QuestItem(
    id: 'q_griffin_hunt',
    name: 'Skyward Apex Predator',
    zone: 'Deceitful Mountains',
    minLevel: 45,
    baseExp: 54000,
    gold: 6200,
    targetEnemy: '1x Elder Griffin',
  ),
  const QuestItem(
    id: 'q_tarasque_trial',
    name: 'Behemoth Subjugation Trial',
    zone: 'Mishan Peak Ruins',
    minLevel: 65,
    baseExp: 145000,
    gold: 15000,
    targetEnemy: '1x Tarasque Dragonkin',
  ),
];

final List<LevelingPresetItem> SAMPLE_PRESETS = [
  const LevelingPresetItem(
    id: 'preset_beginner',
    name: 'Tel Outskirts Speedrun',
    levelRange: 'Lv. 1 - 15',
    description: 'Fast early loop clearing goblin camps and field notice boards.',
    questIds: ['q_tinder_goblins', 'q_orc_clearing'],
  ),
  const LevelingPresetItem(
    id: 'preset_midgame',
    name: 'Hidell Cyclops & Boss Loop',
    levelRange: 'Lv. 25 - 45',
    description: 'High XP boss rotations with pawns and elemental enchantments.',
    questIds: ['q_cyclops_threat', 'q_griffin_hunt'],
  ),
  const LevelingPresetItem(
    id: 'preset_endgame',
    name: 'Mishan Peak Dragonkin Farm',
    levelRange: 'Lv. 65 - 90',
    description: 'Endgame XP maximization route with server boost events stacked.',
    questIds: ['q_tarasque_trial'],
  ),
];
