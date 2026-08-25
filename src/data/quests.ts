import { Quest, Region } from '../types';
import { MAIN_STORY_QUESTS } from './mainStoryQuests';
import { WORLD_QUESTS } from './worldQuests';
import { PERSONAL_QUESTS } from './personalQuests';

export { MAIN_STORY_QUESTS } from './mainStoryQuests';
export { WORLD_QUESTS } from './worldQuests';
export { PERSONAL_QUESTS } from './personalQuests';

export const ALL_QUESTS: Quest[] = [
  ...MAIN_STORY_QUESTS,
  ...WORLD_QUESTS,
  ...PERSONAL_QUESTS
];

export const REGIONS: Region[] = [
  'White Dragon Temple',
  'Hidell Plains',
  'Breya Coast',
  'Mysree Forest',
  'Volden Mines',
  'Dowe Valley',
  'Mysree Grove',
  'Deenan Woods',
  'Bettland Plains',
  'Northen Bettland Plains',
  'Zandora Wastelands',
  'Eastern Zandora',
  'Mergoda Ruins',
  'Bloodbane Isle',
  'Elan Water Grove',
  'Farana Plains',
  'Morrow Forrest',
  'Kingal Canyon',
  'Rathnite Foothills',
  'Feryana Wilderness',
  'Megadosys Plateau',
  'Urteca Moutains'
];
