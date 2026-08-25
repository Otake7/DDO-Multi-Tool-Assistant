import { BoosterSettings, GameVersion, PlannedQuest, Quest, SimulationResult } from '../types';
import { getXpRequiredForLevel, getMaxLevelForVersion, XP_RING_CAP_LEVEL, calculateXpNeeded } from '../data/levelTable';

/**
 * Calculates the XP multiplier for a quest at a given player level.
 * The 50% XP ring only applies when level < XP_RING_CAP_LEVEL (i.e. Lv 1 to 89).
 */
export function getXpMultiplierForLevel(level: number, boosters: BoosterSettings): {
  totalMultiplier: number;
  ringActive: boolean;
  ringBonus: number;
  otherBonus: number;
} {
  const ringActive = boosters.useExpRing50 && level < XP_RING_CAP_LEVEL;
  const ringBonus = ringActive ? 0.5 : 0;

  let otherBonus = 0;
  if (boosters.passportCourseActive) otherBonus += 1.0;
  if (boosters.supportPawnActive) otherBonus += 0.25;
  if (boosters.restedXpBonus) otherBonus += 0.5;

  const serverMult = Math.max(0.1, boosters.serverMultiplier || 1.0);
  const totalMultiplier = (1 + ringBonus + otherBonus) * serverMult;

  return {
    totalMultiplier,
    ringActive,
    ringBonus,
    otherBonus
  };
}

/**
 * Calculates effective XP for 1 run of a quest at a given level.
 */
export function getSingleQuestXp(quest: Quest, level: number, boosters: BoosterSettings): {
  baseXp: number;
  effectiveXp: number;
  ringBonusXp: number;
  isRingActive: boolean;
} {
  const { totalMultiplier, ringActive, ringBonus } = getXpMultiplierForLevel(level, boosters);
  const effectiveXp = Math.round(quest.baseXp * totalMultiplier);
  const ringBonusXp = ringActive ? Math.round(quest.baseXp * ringBonus * (boosters.serverMultiplier || 1)) : 0;

  return {
    baseXp: quest.baseXp,
    effectiveXp,
    ringBonusXp,
    isRingActive: ringActive
  };
}

/**
 * Simulates executing all planned quests step-by-step, accurately tracking
 * level-ups, leftover XP, and applying the 50% XP ring cutoff when hitting Lv 90.
 */
export function simulateQuestPlan(
  startLevel: number,
  startCurrentXp: number,
  targetLevel: number,
  plannedQuests: PlannedQuest[],
  boosters: BoosterSettings,
  questDirectory: Quest[],
  gameVersion: GameVersion = '3.4'
): SimulationResult {
  const questMap = new Map<string, Quest>();
  questDirectory.forEach((q) => questMap.set(q.id, q));

  const maxLevel = getMaxLevelForVersion(gameVersion);
  let currentLvl = Math.max(1, Math.min(maxLevel, startLevel));
  const maxLvlXp = getXpRequiredForLevel(currentLvl, gameVersion);
  let currentXp = Math.min(maxLvlXp, Math.max(0, startCurrentXp));

  let totalXpGained = 0;
  let totalBaseXp = 0;
  let totalRingBonusXp = 0;
  let totalOtherBonusXp = 0;
  let totalGoldGained = 0;
  let totalBloodOrbsGained = 0;

  // Flatten quests into individual runs for granular level-up checking
  for (const item of plannedQuests) {
    const quest = item.customQuest || questMap.get(item.questId);
    if (!quest) continue;

    const runs = Math.max(0, item.quantity);
    for (let r = 0; r < runs; r++) {
      if (currentLvl >= maxLevel) {
        currentLvl = maxLevel;
        currentXp = 0;
        // Still add gold and BO even at cap
        totalGoldGained += quest.gold;
        totalBloodOrbsGained += quest.bloodOrbs || 0;
        continue;
      }

      // Check current level multiplier
      const { totalMultiplier, ringActive, ringBonus, otherBonus } = getXpMultiplierForLevel(currentLvl, boosters);
      const serverMult = boosters.serverMultiplier || 1.0;
      
      const earnedXp = Math.round(quest.baseXp * totalMultiplier);
      const ringPart = ringActive ? Math.round(quest.baseXp * ringBonus * serverMult) : 0;
      const otherPart = Math.round(quest.baseXp * otherBonus * serverMult);

      totalBaseXp += quest.baseXp;
      totalXpGained += earnedXp;
      totalRingBonusXp += ringPart;
      totalOtherBonusXp += otherPart;
      totalGoldGained += quest.gold;
      totalBloodOrbsGained += quest.bloodOrbs || 0;

      // Apply earned XP and handle level-ups
      currentXp += earnedXp;

      while (currentLvl < maxLevel) {
        const requiredForCurrent = getXpRequiredForLevel(currentLvl, gameVersion);
        if (currentXp >= requiredForCurrent) {
          currentXp -= requiredForCurrent;
          currentLvl++;
          if (currentLvl === maxLevel) {
            currentXp = 0;
            break;
          }
        } else {
          break;
        }
      }
    }
  }

  const remainingXpToTarget = calculateXpNeeded(currentLvl, currentXp, targetLevel, gameVersion);
  const targetReached = currentLvl >= targetLevel;

  const xpToNextLevel = getXpRequiredForLevel(currentLvl, gameVersion);
  const progressPercent = xpToNextLevel > 0 ? Math.min(100, Math.round((currentXp / xpToNextLevel) * 1000) / 10) : 100;

  return {
    startLevel,
    startCurrentXp,
    endLevel: currentLvl,
    endCurrentXp: currentXp,
    totalXpGained,
    totalGoldGained,
    totalBloodOrbsGained,
    levelsGained: Math.max(0, currentLvl - startLevel),
    ringBonusXp: totalRingBonusXp,
    otherBonusXp: totalOtherBonusXp,
    baseXp: totalBaseXp,
    remainingXpToTarget,
    targetReached,
    progressPercent,
    xpToNextLevelAfter: xpToNextLevel
  };
}

/**
 * Calculate how many runs of a given quest are needed to reach a target level from a given starting point.
 */
export function calculateRunsNeededForQuest(
  startLevel: number,
  startCurrentXp: number,
  targetLevel: number,
  quest: Quest,
  boosters: BoosterSettings,
  gameVersion: GameVersion = '3.4'
): {
  runsNeeded: number;
  totalXpNeeded: number;
  avgXpPerRun: number;
} {
  const maxLevel = getMaxLevelForVersion(gameVersion);
  if (startLevel >= targetLevel) {
    return { runsNeeded: 0, totalXpNeeded: 0, avgXpPerRun: quest.baseXp };
  }

  let testLvl = startLevel;
  let testXp = startCurrentXp;
  let runs = 0;
  let totalXp = 0;
  const maxSafetyRuns = 10000;

  while (testLvl < targetLevel && runs < maxSafetyRuns) {
    runs++;
    const { totalMultiplier } = getXpMultiplierForLevel(testLvl, boosters);
    const earnedXp = Math.round(quest.baseXp * totalMultiplier);
    totalXp += earnedXp;
    testXp += earnedXp;

    while (testLvl < maxLevel) {
      const needed = getXpRequiredForLevel(testLvl, gameVersion);
      if (testXp >= needed) {
        testXp -= needed;
        testLvl++;
      } else {
        break;
      }
    }
  }

  const rawNeeded = calculateXpNeeded(startLevel, startCurrentXp, targetLevel, gameVersion);
  const avgXp = runs > 0 ? Math.round(totalXp / runs) : quest.baseXp;

  return {
    runsNeeded: runs,
    totalXpNeeded: rawNeeded,
    avgXpPerRun: avgXp
  };
}

