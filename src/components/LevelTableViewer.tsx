import React, { useState } from 'react';
import {
  LEVEL_TABLE,
  getMaxLevelForVersion,
  XP_RING_CAP_LEVEL,
  JP_GAIN_MAX_LEVEL,
  getJpEarnedByLevel,
  getRemainingLevelingJp
} from '../data/levelTable';
import { Search, Sparkles, Award, Shield, Zap, Info } from 'lucide-react';
import { GameVersion } from '../types';

interface LevelTableViewerProps {
  currentLevel: number;
  setCurrentLevel: (lvl: number) => void;
  setTargetLevel: (lvl: number) => void;
  gameVersion: GameVersion;
}

export const LevelTableViewer: React.FC<LevelTableViewerProps> = ({
  currentLevel,
  setCurrentLevel,
  setTargetLevel,
  gameVersion
}) => {
  const [searchLevel, setSearchLevel] = useState<string>('');
  const [filterMilestoneOnly, setFilterMilestoneOnly] = useState<boolean>(false);

  const maxLevel = getMaxLevelForVersion(gameVersion);
  const visibleLevelTable = LEVEL_TABLE.filter((row) => row.level <= maxLevel);
  const maxCapTotal = visibleLevelTable[visibleLevelTable.length - 1]?.cumulativeXp || 0;

  const currentEarnedJp = getJpEarnedByLevel(currentLevel);
  const maxLevelingJp = getJpEarnedByLevel(JP_GAIN_MAX_LEVEL);
  const remainingJp = getRemainingLevelingJp(currentLevel);

  const filteredLevels = visibleLevelTable.filter((row) => {
    if (searchLevel.trim()) {
      const q = searchLevel.trim();
      const matchesLvl = row.level.toString().includes(q);
      const matchesFeature = row.unlockedFeatures?.toLowerCase().includes(q.toLowerCase());
      if (!matchesLvl && !matchesFeature) return false;
    }

    if (filterMilestoneOnly && !row.unlockedFeatures) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Dragon's Dogma Online Level 1–{maxLevel} Progression & JP Table</span>
          </h2>
          <p className="text-xs text-slate-400">
            Season {gameVersion} XP curves, Job Points (JP) leveling rewards (Lv 1–70), cumulative totals, and milestone unlocks.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchLevel}
              onChange={(e) => setSearchLevel(e.target.value)}
              placeholder="Filter by level or unlock..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={() => setFilterMilestoneOnly(!filterMilestoneOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer ${
              filterMilestoneOnly
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Milestones Only
          </button>
        </div>
      </div>

      {/* Info Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">50% XP Ring Active Zone</div>
            <div className="text-[11px] text-slate-400">Level 1 → Level 89 (+50% bonus)</div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center gap-3">
          <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">Leveling JP Pool (Lv 1–70)</div>
            <div className="text-[11px] text-slate-400">
              <span className="font-mono text-yellow-400 font-semibold">{currentEarnedJp.toLocaleString()}</span> / {maxLevelingJp.toLocaleString()} JP
            </div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center gap-3">
          <Shield className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">JP Leveling Gain Cap</div>
            <div className="text-[11px] text-slate-400">
              {currentLevel >= JP_GAIN_MAX_LEVEL ? (
                <span className="text-purple-300 font-semibold">Capped at Lv 70 (0 JP/lvl)</span>
              ) : (
                <span>{remainingJp.toLocaleString()} JP remaining to Lv 70</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center gap-3">
          <Award className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">Season {gameVersion} Max Cap</div>
            <div className="text-[11px] text-slate-400">Level {maxLevel} Maximum Level</div>
          </div>
        </div>
      </div>

      {/* JP Rule Notice Banner */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-200/90">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">DDON Job Points (JP) Rule: </span>
          Job Points gained directly from character level-ups terminate upon reaching <strong>Level 70</strong> (yielding a cumulative leveling pool of ~{maxLevelingJp.toLocaleString()} JP per vocation). Beyond Level 70, additional JP is acquired through World Quests, Blood Orbs (BO) shop exchange, and Grand Missions.
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/50">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <th className="py-3 px-4">Level</th>
              <th className="py-3 px-4">XP to Next Level</th>
              <th className="py-3 px-4">Cumulative Total XP</th>
              <th className="py-3 px-4 text-yellow-300">JP Gain (Lvl)</th>
              <th className="py-3 px-4 text-yellow-300">Cumulative JP</th>
              <th className="py-3 px-4">% Journey</th>
              <th className="py-3 px-4">XP Ring</th>
              <th className="py-3 px-4">Unlock / Feature Milestone</th>
              <th className="py-3 px-4 text-right">Quick Set</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredLevels.map((row) => {
              const isCurrent = row.level === currentLevel;
              const isRingActive = row.level < XP_RING_CAP_LEVEL;
              const pctOfGame = maxCapTotal > 0 ? ((row.cumulativeXp / maxCapTotal) * 100).toFixed(2) : '100';
              const isJpGainActive = row.level <= JP_GAIN_MAX_LEVEL;

              return (
                <tr
                  key={row.level}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    isCurrent
                      ? 'bg-amber-500/10 border-l-4 border-l-amber-500 text-amber-300 font-bold'
                      : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-bold text-slate-100 flex items-center gap-2">
                    <span>Lv {row.level}</span>
                    {isCurrent && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-bold font-sans">
                        YOU
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-slate-200">
                    {row.level === maxLevel ? (
                      <span className="text-amber-400 font-sans font-semibold">MAX CAP</span>
                    ) : (
                      `${row.xpToNext.toLocaleString()} XP`
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-slate-300">
                    {row.cumulativeXp.toLocaleString()} XP
                  </td>
                  <td className="py-2.5 px-4">
                    {row.level === 1 ? (
                      <span className="text-slate-500 font-sans">—</span>
                    ) : isJpGainActive ? (
                      <span className="text-yellow-400 font-semibold">+{row.jpGain.toLocaleString()} JP</span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-sans">
                        0 JP (Cap)
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-yellow-300/90 font-semibold">
                    {row.cumulativeJp.toLocaleString()} JP
                  </td>
                  <td className="py-2.5 px-4 text-slate-400 text-[11px]">
                    {pctOfGame}%
                  </td>
                  <td className="py-2.5 px-4">
                    {isRingActive ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-sans border border-emerald-500/20">
                        +50% Active
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-sans">
                        1.0x (Cap)
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-300">
                    {row.unlockedFeatures ? (
                      <span className="text-amber-300/90 font-medium">
                        ✦ {row.unlockedFeatures}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-right font-sans">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setCurrentLevel(row.level)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[10px] font-semibold transition-colors cursor-pointer"
                        title={`Set current level to ${row.level}`}
                      >
                        Set Current
                      </button>
                      <button
                        onClick={() => setTargetLevel(row.level)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[10px] font-semibold transition-colors cursor-pointer"
                        title={`Set target goal level to ${row.level}`}
                      >
                        Set Target
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

