import React from 'react';
import {
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { BoosterSettings, GameVersion } from '../types';
import {
  getXpRequiredForLevel,
  calculateXpNeeded,
  getMaxLevelForVersion,
  XP_RING_CAP_LEVEL,
  JP_GAIN_MAX_LEVEL,
  getJpEarnedByLevel,
  getRemainingLevelingJp,
  getLevelData
} from '../data/levelTable';

interface LevelOverviewCardProps {
  currentLevel: number;
  setCurrentLevel: (lvl: number) => void;
  currentXp: number;
  setCurrentXp: (xp: number) => void;
  targetLevel: number;
  setTargetLevel: (lvl: number) => void;
  boosters: BoosterSettings;
  setBoosters: React.Dispatch<React.SetStateAction<BoosterSettings>>;
  gameVersion: GameVersion;
  onGoToPlanner: () => void;
}

export const LevelOverviewCard: React.FC<LevelOverviewCardProps> = ({
  currentLevel,
  setCurrentLevel,
  currentXp,
  setCurrentXp,
  targetLevel,
  setTargetLevel,
  boosters,
  setBoosters,
  gameVersion,
  onGoToPlanner
}) => {
  const [showAdvancedBoosters, setShowAdvancedBoosters] = React.useState(false);

  const maxLevel = getMaxLevelForVersion(gameVersion);
  const xpRequiredForCurrentLevel = getXpRequiredForLevel(currentLevel, gameVersion);
  const currentLvlData = getLevelData(currentLevel, gameVersion);
  const targetLvlData = getLevelData(targetLevel, gameVersion);

  // Clamped current XP
  const clampedXp = Math.min(xpRequiredForCurrentLevel, Math.max(0, currentXp));
  const currentLevelProgressPct =
    xpRequiredForCurrentLevel > 0
      ? Math.min(100, (clampedXp / xpRequiredForCurrentLevel) * 100)
      : 100;

  // XP needed to target
  const xpNeededToTarget = calculateXpNeeded(currentLevel, clampedXp, targetLevel, gameVersion);

  // Total XP across the whole game up to version cap
  const maxCapCumulativeXp = getLevelData(maxLevel, gameVersion).cumulativeXp;
  const currentTotalCumulativeXp = currentLvlData.cumulativeXp + clampedXp;
  const overallGameProgressPct =
    maxCapCumulativeXp > 0
      ? Math.min(100, (currentTotalCumulativeXp / maxCapCumulativeXp) * 100)
      : 100;

  // Set XP by percentage
  const handleSetPercent = (pct: number) => {
    const calculated = Math.round((xpRequiredForCurrentLevel * pct) / 100);
    setCurrentXp(calculated);
  };

  const isRingActiveAtCurrentLevel = boosters.useExpRing50 && currentLevel < XP_RING_CAP_LEVEL;

  // Generate sensible target presets based on maxLevel
  const targetPresets = React.useMemo(() => {
    const defaultList = [40, 60, 75, 80, 85, 90, 93, 95, 100, 110, 120];
    return defaultList.filter((lvl) => lvl <= maxLevel);
  }, [maxLevel]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      
      {/* Top Banner / Level Pickers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Current Level Box */}
        <div className="lg:col-span-4 bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Current Level
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">
              Cap: Lv {maxLevel} (v{gameVersion})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={maxLevel}
              value={currentLevel}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                const clamped = Math.max(1, Math.min(maxLevel, val));
                setCurrentLevel(clamped);
                if (clamped >= targetLevel) {
                  setTargetLevel(Math.min(maxLevel, clamped + 1));
                }
              }}
              className="w-24 bg-slate-900 border border-amber-500/40 rounded-lg px-3 py-2 text-2xl font-bold text-amber-400 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <div className="flex-1">
              <input
                type="range"
                min={1}
                max={maxLevel}
                value={currentLevel}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setCurrentLevel(val);
                  if (val >= targetLevel) {
                    setTargetLevel(Math.min(maxLevel, val + 1));
                  }
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>Lv 1</span>
                <span>Lv {Math.round(maxLevel * 0.45)}</span>
                <span>Lv {Math.round(maxLevel * 0.75)}</span>
                <span>Lv {maxLevel}</span>
              </div>
            </div>
          </div>

          {/* Current XP Input */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Current XP in Level</span>
              <span className="font-mono text-slate-300">
                {clampedXp.toLocaleString()} / {xpRequiredForCurrentLevel.toLocaleString()} XP
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={xpRequiredForCurrentLevel}
                value={clampedXp}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setCurrentXp(Math.min(xpRequiredForCurrentLevel, Math.max(0, val)));
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="XP amount"
                disabled={currentLevel >= maxLevel}
              />
            </div>
            {/* Quick % buttons */}
            <div className="flex gap-1">
              {[0, 25, 50, 75].map((pct) => (
                <button
                  key={pct}
                  onClick={() => handleSetPercent(pct)}
                  disabled={currentLevel >= maxLevel}
                  className="flex-1 text-[10px] py-0.5 rounded bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700/50 disabled:opacity-40"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Arrow & Progression Metric */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-3 bg-gradient-to-b from-slate-950/40 to-slate-950/90 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <Target className="w-4 h-4" />
            <span>Target Progression</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xl font-bold font-mono text-slate-200">
              Lv {currentLevel}
            </div>
            <div className="p-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold font-mono text-amber-400">
              Lv {targetLevel}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400">
              XP Needed to Goal:{' '}
              <strong className="text-amber-300 font-mono text-sm">
                {xpNeededToTarget.toLocaleString()} XP
              </strong>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Levels to gain:{' '}
              <span className="text-emerald-400 font-bold">
                +{Math.max(0, targetLevel - currentLevel)}
              </span>
            </div>
          </div>

          {/* Quick preset target buttons */}
          <div className="flex flex-wrap gap-1.5 justify-center pt-1">
            {targetPresets.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setTargetLevel(lvl)}
                className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium transition-all ${
                  targetLevel === lvl
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                Lv {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Target Level Box */}
        <div className="lg:col-span-4 bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Target Goal Level
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Target
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min={Math.min(maxLevel, currentLevel + 1)}
              max={maxLevel}
              value={targetLevel}
              onChange={(e) => {
                const val = parseInt(e.target.value) || currentLevel + 1;
                setTargetLevel(Math.max(currentLevel + 1, Math.min(maxLevel, val)));
              }}
              className="w-24 bg-slate-900 border border-amber-500/40 rounded-lg px-3 py-2 text-2xl font-bold text-amber-400 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <div className="flex-1">
              <input
                type="range"
                min={1}
                max={maxLevel}
                value={targetLevel}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setTargetLevel(Math.max(currentLevel, val));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>Lv 1</span>
                <span>Lv {Math.round(maxLevel * 0.45)}</span>
                <span>Lv {Math.round(maxLevel * 0.75)}</span>
                <span>Lv {maxLevel} (Cap)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Goal Unlock Feature:</span>
              <span className="text-slate-200 text-right truncate max-w-[180px]">
                {targetLvlData?.unlockedFeatures || 'Progression Tier'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        
        {/* Current Level Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Current Level Progress (Lv {currentLevel} → Lv {Math.min(maxLevel, currentLevel + 1)})</span>
            </span>
            <span className="font-mono text-amber-300 font-bold">
              {currentLevelProgressPct.toFixed(1)}%
              <span className="text-slate-400 font-normal ml-1">
                ({clampedXp.toLocaleString()} / {xpRequiredForCurrentLevel.toLocaleString()} XP)
              </span>
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-300 shadow-sm shadow-amber-500/50"
              style={{ width: `${currentLevelProgressPct}%` }}
            />
          </div>
        </div>

        {/* Total Journey Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <span>Overall Game Journey Progress (Lv 1 to Max Lv {maxLevel})</span>
            </span>
            <span className="font-mono text-slate-300 text-xs">
              {overallGameProgressPct.toFixed(2)}% of Version {gameVersion} Cap
            </span>
          </div>

          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
            <div
              className="h-full bg-gradient-to-r from-slate-600 via-amber-600 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${overallGameProgressPct}%` }}
            />
          </div>
        </div>

        {/* Leveling Job Points (JP) Progress Bar (Lv 1 to 70 Cap) */}
        {(() => {
          const currentEarnedJp = getJpEarnedByLevel(currentLevel);
          const maxLevelingJp = getJpEarnedByLevel(JP_GAIN_MAX_LEVEL);
          const jpProgressPct = Math.min(100, (currentEarnedJp / maxLevelingJp) * 100);
          const nextLevelJp = currentLevel < JP_GAIN_MAX_LEVEL ? (getLevelData(currentLevel + 1, gameVersion)?.jpGain || 0) : 0;

          return (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Job Points (JP) Leveling Pool (Lv 1–70 Cap)</span>
                  {currentLevel >= JP_GAIN_MAX_LEVEL && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Leveling JP Capped
                    </span>
                  )}
                </span>
                <span className="font-mono text-yellow-300 text-xs font-semibold">
                  {currentEarnedJp.toLocaleString()} / {maxLevelingJp.toLocaleString()} JP
                  <span className="text-slate-400 font-normal ml-1">
                    ({jpProgressPct.toFixed(1)}%)
                  </span>
                </span>
              </div>

              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-300 rounded-full transition-all duration-300"
                  style={{ width: `${jpProgressPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400">
                {currentLevel < JP_GAIN_MAX_LEVEL ? (
                  <span>
                    Next Level (Lv {currentLevel + 1}) awards <strong className="text-yellow-300">+{nextLevelJp.toLocaleString()} JP</strong>
                  </span>
                ) : (
                  <span className="text-purple-300">
                    Lv 70 reached: Level-up JP stops here. Farm JP from World Quests, Blood Orbs & Grand Missions.
                  </span>
                )}
                <span>{getRemainingLevelingJp(currentLevel).toLocaleString()} JP remaining to Lv 70</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 50% XP Boost Ring & Booster Settings Card */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-4">
        
        {/* Main 50% XP Ring Highlight Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-100">
                  50% Level Up Speed XP Ring (Lv 1 to 90)
                </span>
                {isRingActiveAtCurrentLevel ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Active (+50% XP)
                  </span>
                ) : boosters.useExpRing50 ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-amber-500/40">
                    Capped at Lv 90+ (1.0x Base)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    Disabled
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Boosts all Quest & Monster XP by +50% for character levels 1 to 89. Automatically ceases bonus at Lv 90 cap.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={boosters.useExpRing50}
              onChange={(e) =>
                setBoosters((prev) => ({ ...prev, useExpRing50: e.target.checked }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {/* Toggle Advanced Boosters Dropdown */}
        <div>
          <button
            onClick={() => setShowAdvancedBoosters(!showAdvancedBoosters)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Advanced Boosters (Server Event Multipliers, Passport Course, Support Pawn)</span>
            {showAdvancedBoosters ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showAdvancedBoosters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/80">
              
              {/* Server Rate Multiplier */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1.5">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dogma Rising Server Rate</span>
                </div>
                <select
                  value={boosters.serverMultiplier}
                  onChange={(e) =>
                    setBoosters((prev) => ({
                      ...prev,
                      serverMultiplier: parseFloat(e.target.value) || 1.0
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-200 font-mono"
                >
                  <option value="1.0">1.0x Standard Rate</option>
                  <option value="1.5">1.5x Weekend Boost</option>
                  <option value="2.0">2.0x Double XP Event</option>
                  <option value="3.0">3.0x Special Server Event</option>
                </select>
              </div>

              {/* Passport Growth Course (+100%) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-300">Growth Course (Passport)</div>
                  <div className="text-[10px] text-slate-400">+100% Base XP</div>
                </div>
                <input
                  type="checkbox"
                  checked={boosters.passportCourseActive}
                  onChange={(e) =>
                    setBoosters((prev) => ({
                      ...prev,
                      passportCourseActive: e.target.checked
                    }))
                  }
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                />
              </div>

              {/* Rested XP Bonus (+50%) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-300">Rested Hot Spring XP</div>
                  <div className="text-[10px] text-slate-400">+50% Rested Bonus</div>
                </div>
                <input
                  type="checkbox"
                  checked={boosters.restedXpBonus}
                  onChange={(e) =>
                    setBoosters((prev) => ({
                      ...prev,
                      restedXpBonus: e.target.checked
                    }))
                  }
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {currentLevel < XP_RING_CAP_LEVEL && boosters.useExpRing50
              ? 'Your XP Ring is currently granting a +50% bonus on all quests below Lv 90!'
              : 'Add quests to your plan to simulate exact level gains.'}
          </span>
        </div>

        <button
          onClick={onGoToPlanner}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          <span>Open Quest Planner & Repeats</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

