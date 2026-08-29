import React, { useMemo, useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  RotateCw,
  Coins,
  Shield,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  Zap,
  User,
  X,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Filter,
  Flame,
  ArrowUpDown
} from 'lucide-react';
import { BoosterSettings, GameVersion, PlannedQuest, Quest, UserProfile, PlannerSortOption, VoteDirection } from '../types';
import { ALL_QUESTS } from '../data/quests';
import { simulateQuestPlan, getSingleQuestXp } from '../utils/calculator';
import { LEVELING_PRESETS } from '../data/levelingPresets';
import { XP_RING_CAP_LEVEL } from '../data/levelTable';
import { getItemEngagementStats, getUserVotesMap, voteItem } from '../utils/communityStats';
import { CommunityCommentsSection } from './CommunityCommentsSection';

interface QuestPlannerProps {
  currentLevel: number;
  setCurrentLevel: (lvl: number) => void;
  currentXp: number;
  setCurrentXp: (xp: number) => void;
  targetLevel: number;
  boosters: BoosterSettings;
  setBoosters: React.Dispatch<React.SetStateAction<BoosterSettings>>;
  plannedQuests: PlannedQuest[];
  onUpdateQuantity: (questId: string, quantity: number) => void;
  onRemoveQuest: (questId: string) => void;
  onClearPlan: () => void;
  onLoadPreset: (presetId: string) => void;
  onGoToDatabase: () => void;
  onOpenCustomQuestModal: () => void;
  gameVersion: GameVersion;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const QuestPlanner: React.FC<QuestPlannerProps> = ({
  currentLevel,
  setCurrentLevel,
  currentXp,
  setCurrentXp,
  targetLevel,
  boosters,
  setBoosters,
  plannedQuests,
  onUpdateQuantity,
  onRemoveQuest,
  onClearPlan,
  onLoadPreset,
  onGoToDatabase,
  onOpenCustomQuestModal,
  gameVersion,
  currentUser,
  onOpenAuth
}) => {
  const [showAuthGateModal, setShowAuthGateModal] = useState(false);
  const [presetSortOption, setPresetSortOption] = useState<PlannerSortOption>('most_used');
  const [commentsModal, setCommentsModal] = useState<{
    itemId: string;
    itemTitle: string;
    itemType: 'preset' | 'quest' | 'farm_spot' | 'guide';
  } | null>(null);
  const [engagementUpdateCounter, setEngagementUpdateCounter] = useState(0);

  const isGuest = !currentUser || currentUser.isGuest;

  const handleCustomSpotClick = () => {
    if (isGuest) {
      setShowAuthGateModal(true);
    } else {
      onOpenCustomQuestModal();
    }
  };

  const handleVote = (itemId: string, direction: VoteDirection, e: React.MouseEvent) => {
    e.stopPropagation();
    voteItem(itemId, direction, currentUser?.id);
    setEngagementUpdateCounter((c) => c + 1);
  };
  // Map of all available quests (including custom)
  const questMap = useMemo(() => {
    const map = new Map<string, Quest>();
    ALL_QUESTS.forEach((q) => map.set(q.id, q));
    plannedQuests.forEach((pq) => {
      if (pq.customQuest) {
        map.set(pq.customQuest.id, pq.customQuest);
      }
    });
    return map;
  }, [plannedQuests]);

  // Run the full simulation
  const simulation = useMemo(() => {
    return simulateQuestPlan(
      currentLevel,
      currentXp,
      targetLevel,
      plannedQuests,
      boosters,
      Array.from(questMap.values()),
      gameVersion
    );
  }, [currentLevel, currentXp, targetLevel, plannedQuests, boosters, questMap, gameVersion]);

  const userVotes = useMemo(() => getUserVotesMap(), [engagementUpdateCounter]);

  const sortedPresets = useMemo(() => {
    const list = [...LEVELING_PRESETS];
    return list.sort((a, b) => {
      const statsA = getItemEngagementStats(a.id);
      const statsB = getItemEngagementStats(b.id);
      if (presetSortOption === 'most_used') {
        return (statsB.timesPlanned || 0) - (statsA.timesPlanned || 0);
      }
      if (presetSortOption === 'top_rated') {
        return statsB.score - statsA.score;
      }
      if (presetSortOption === 'lowest_rated') {
        return statsA.score - statsB.score;
      }
      if (presetSortOption === 'newest') {
        return (statsB.createdAt || 0) - (statsA.createdAt || 0);
      }
      if (presetSortOption === 'oldest') {
        return (statsA.createdAt || 0) - (statsB.createdAt || 0);
      }
      return 0;
    });
  }, [presetSortOption, engagementUpdateCounter]);

  // Total runs in plan
  const totalRuns = useMemo(() => {
    return plannedQuests.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [plannedQuests]);

  const isRingActiveAtCurrentLevel = boosters.useExpRing50 && currentLevel < XP_RING_CAP_LEVEL;

  // Apply simulated level as actual current level
  const handleApplyToCharacter = () => {
    setCurrentLevel(simulation.endLevel);
    setCurrentXp(simulation.endCurrentXp);
  };

  return (
    <div className="space-y-6">
      
      {/* Simulation Result Projection Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
        
        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100">
                  Level Simulation Projection
                </h2>
                {simulation.levelsGained > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
                    +{simulation.levelsGained} Levels Gained!
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Calculates total XP earned from all planned quest runs with active XP Ring & Boosters.
              </p>
            </div>
          </div>

          {plannedQuests.length > 0 && simulation.levelsGained > 0 && (
            <button
              onClick={handleApplyToCharacter}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              title="Set your current level to the simulated result"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Progress to Character</span>
            </button>
          )}
        </div>

        {/* Level Progression Visual Transition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950/80 border border-slate-800 rounded-xl p-4">
          
          {/* Starting State */}
          <div className="text-center md:text-left space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Starting Point
            </div>
            <div className="text-2xl font-bold font-mono text-slate-200">
              Lv {simulation.startLevel}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {simulation.startCurrentXp.toLocaleString()} XP in level
            </div>
          </div>

          {/* Center Jump Details */}
          <div className="flex flex-col items-center justify-center text-center space-y-1.5 py-2 border-y md:border-y-0 md:border-x border-slate-800">
            <div className="flex items-center gap-2 text-amber-400">
              <span className="text-xs font-semibold">Planned Execution</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold font-mono text-amber-300">
              +{simulation.totalXpGained.toLocaleString()} XP
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Across <strong className="text-slate-200">{totalRuns}</strong> Total Quest Runs
            </div>
          </div>

          {/* Ending Projected State */}
          <div className="text-center md:text-right space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Projected Outcome
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400">
              Lv {simulation.endLevel}
            </div>
            <div className="text-xs text-slate-300 font-mono">
              {simulation.endCurrentXp.toLocaleString()} / {simulation.xpToNextLevelAfter.toLocaleString()} XP ({simulation.progressPercent}%)
            </div>
          </div>
        </div>

        {/* Projected Progress Bar towards Next Level */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Projected Level {simulation.endLevel} Progress</span>
            </span>
            <span className="font-mono text-amber-300 font-bold">
              {simulation.progressPercent}% to Lv {Math.min(93, simulation.endLevel + 1)}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500 shadow-md shadow-amber-500/40"
              style={{ width: `${simulation.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Summary Breakdown Metrics (Base XP, Ring Bonus, Gold, BO, Remaining) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
          
          {/* Total Boosted XP */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              <span>Total XP Gained</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="font-mono text-sm sm:text-base font-bold text-amber-300">
              {simulation.totalXpGained.toLocaleString()}
            </div>
            {simulation.ringBonusXp > 0 && (
              <div className="text-[10px] text-emerald-400 font-mono">
                (+{simulation.ringBonusXp.toLocaleString()} from XP Ring)
              </div>
            )}
          </div>

          {/* Raw Base XP */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="text-[10px] text-slate-400">Raw Base XP</div>
            <div className="font-mono text-sm sm:text-base font-semibold text-slate-200">
              {simulation.baseXp.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Unboosted Value</div>
          </div>

          {/* Gold Earned */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Coins className="w-3 h-3 text-yellow-400" />
              <span>Total Gold</span>
            </div>
            <div className="font-mono text-sm sm:text-base font-semibold text-yellow-300">
              {simulation.totalGoldGained.toLocaleString()} G
            </div>
            <div className="text-[10px] text-purple-400 font-mono">
              +{simulation.totalBloodOrbsGained.toLocaleString()} BO
            </div>
          </div>

          {/* Remaining to Goal */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="text-[10px] text-slate-400">Goal: Lv {targetLevel}</div>
            <div className="font-mono text-sm sm:text-base font-semibold">
              {simulation.targetReached ? (
                <span className="text-emerald-400 font-bold">Goal Met!</span>
              ) : (
                <span className="text-amber-400 font-mono">
                  {simulation.remainingXpToTarget.toLocaleString()} XP left
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {simulation.targetReached ? 'Target Exceeded' : 'Still required'}
            </div>
          </div>
        </div>

        {/* 50% XP Ring Mechanic Notice Banner */}
        <div className="bg-slate-950/90 border border-amber-500/20 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-300">
              50% XP Ring is{' '}
              {boosters.useExpRing50 ? (
                <strong className="text-emerald-400">EQUIPPED</strong>
              ) : (
                <strong className="text-slate-400">OFF</strong>
              )}
              . (Active for Levels 1–89; automatically cuts off bonus at Lv 90 cap)
            </span>
          </div>
          <button
            onClick={() =>
              setBoosters((prev) => ({ ...prev, useExpRing50: !prev.useExpRing50 }))
            }
            className={`px-3 py-1 rounded-lg font-semibold border transition-all ${
              boosters.useExpRing50
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {boosters.useExpRing50 ? 'Disable Ring' : 'Equip 50% XP Ring'}
          </button>
        </div>
      </div>

      {/* Preset Leveling Routes Quick Loader */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Fast Leveling Presets (Dogma Rising Community Routes)</span>
          </div>

          {/* Sort Filters for Presets: Most Used, Top Rated, Lowest Rated, Newest, Oldest */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
              <Filter className="w-3 h-3 text-amber-400" />
              <span>Sort Routes:</span>
            </span>
            <select
              value={presetSortOption}
              onChange={(e) => setPresetSortOption(e.target.value as PlannerSortOption)}
              className="bg-slate-950 border border-slate-800 text-amber-300 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
            >
              <option value="most_used">🔥 Most Used in Planner</option>
              <option value="top_rated">⭐ Top Rated (Highest Score)</option>
              <option value="lowest_rated">🔻 Lowest Rated</option>
              <option value="newest">✨ Newest First</option>
              <option value="oldest">⏳ Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {sortedPresets.map((preset) => {
            const stats = getItemEngagementStats(preset.id);
            const userVote = userVotes[preset.id] || null;

            return (
              <div
                key={preset.id}
                className="bg-slate-950/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/50 rounded-xl p-3 transition-all space-y-2 group flex flex-col justify-between"
              >
                <div
                  onClick={() => onLoadPreset(preset.id)}
                  className="space-y-1.5 cursor-pointer"
                  title="Click to populate this route into your quest plan"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
                      {preset.levelRange}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                    {preset.description}
                  </p>
                </div>

                {/* Footer bar with Upvotes, Downvotes, Times Planned and Comments */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleVote(preset.id, 'up', e)}
                      className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                        userVote === 'up'
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                          : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                      }`}
                      title="Upvote preset"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{stats.upvotes}</span>
                    </button>

                    <button
                      onClick={(e) => handleVote(preset.id, 'down', e)}
                      className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                        userVote === 'down'
                          ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                          : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                      }`}
                      title="Downvote preset"
                    >
                      <ThumbsDown className="w-3 h-3" />
                      <span>{stats.downvotes}</span>
                    </button>

                    <span className="text-[10px] text-slate-500 ml-1">
                      {stats.timesPlanned > 0 && `• ${stats.timesPlanned} uses`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setCommentsModal({
                          itemId: preset.id,
                          itemTitle: preset.name,
                          itemType: 'preset'
                        })
                      }
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                      title="View & post comments"
                    >
                      <MessageSquare className="w-3 h-3 text-amber-400" />
                      <span>{stats.commentsCount}</span>
                    </button>

                    <button
                      onClick={() => onLoadPreset(preset.id)}
                      className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-[10px] font-sans font-bold border border-amber-500/30 transition-all cursor-pointer"
                    >
                      Load
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Planned Quests List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Selected Quests & Repeat Quantities ({plannedQuests.length})</span>
              </h3>
              {currentUser && !currentUser.isGuest ? (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-medium">
                  <User className="w-3 h-3 text-amber-400" />
                  <span>Plan Architect: {currentUser.characterName || currentUser.username}</span>
                  {currentUser.clanTag && <span className="text-slate-400">{currentUser.clanTag}</span>}
                </span>
              ) : (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-slate-400" />
                  <span>Guest Plan</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust the quantity counter on repeatable board quests to simulate multiple runs.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button
              onClick={handleCustomSpotClick}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Custom Spot Farm</span>
            </button>

            <button
              onClick={onGoToDatabase}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Browse All Quests</span>
            </button>

            {plannedQuests.length > 0 && (
              <button
                onClick={onClearPlan}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-colors cursor-pointer"
                title="Clear all quests from plan"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quest List */}
        {plannedQuests.length > 0 ? (
          <div className="space-y-3">
            {plannedQuests.map((item) => {
              const quest = item.customQuest || questMap.get(item.questId);
              if (!quest) return null;

              const singleXp = getSingleQuestXp(quest, currentLevel, boosters);
              const totalBaseForQuest = quest.baseXp * item.quantity;
              const totalBoostedForQuest = singleXp.effectiveXp * item.quantity;

              return (
                <div
                  key={item.questId}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  {/* Left: Quest Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-mono font-bold border border-amber-500/30">
                        Lv {quest.minLevel}+
                      </span>
                      {quest.annotation && (
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                          quest.type === 'main'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : quest.type === 'personal'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}>
                          {quest.type === 'main' ? `Ver. ${quest.annotation}` : quest.annotation}
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {quest.region}
                      </span>
                      {quest.isRepeatable && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                          <RotateCw className="w-2.5 h-2.5" />
                          <span>Repeatable</span>
                        </span>
                      )}
                      {quest.authorName && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium flex items-center gap-1">
                          <User className="w-2.5 h-2.5" />
                          <span>Author: {quest.authorName} {quest.authorClan || ''}</span>
                          {quest.server && <span className="text-slate-400 font-mono">• {quest.server}</span>}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-100">{quest.name}</h4>
                        {quest.questCode && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            {quest.questCode}
                          </span>
                        )}
                      </div>
                      {quest.jpName && (
                        <p className="text-[11px] text-slate-400 font-mono">{quest.jpName}</p>
                      )}
                    </div>

                    {quest.targetEnemy && (
                      <p className="text-xs text-slate-400">
                        Target: <span className="text-slate-300 font-medium">{quest.targetEnemy}</span>
                      </p>
                    )}

                    {/* Quest Row Community Engagement (Upvote, Downvote, Comments) */}
                    {(() => {
                      const qStats = getItemEngagementStats(quest.id);
                      const qVote = userVotes[quest.id] || null;
                      return (
                        <div className="flex items-center gap-2 pt-1 font-mono text-[11px]">
                          <button
                            onClick={(e) => handleVote(quest.id, 'up', e)}
                            className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                              qVote === 'up'
                                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                                : 'text-slate-400 hover:text-emerald-400 bg-slate-900 border border-slate-800'
                            }`}
                            title="Upvote quest"
                          >
                            <ThumbsUp className="w-2.5 h-2.5" />
                            <span>{qStats.upvotes}</span>
                          </button>

                          <button
                            onClick={(e) => handleVote(quest.id, 'down', e)}
                            className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                              qVote === 'down'
                                ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                                : 'text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800'
                            }`}
                            title="Downvote quest"
                          >
                            <ThumbsDown className="w-2.5 h-2.5" />
                            <span>{qStats.downvotes}</span>
                          </button>

                          <button
                            onClick={() =>
                              setCommentsModal({
                                itemId: quest.id,
                                itemTitle: quest.name,
                                itemType: 'quest'
                              })
                            }
                            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                            title="Quest discussions & notes"
                          >
                            <MessageSquare className="w-2.5 h-2.5 text-amber-400" />
                            <span>{qStats.commentsCount} notes</span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Center: Repetition Counter (Quantity Controls) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider pl-1">
                      Runs:
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateQuantity(quest.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center border border-slate-700"
                        title="Decrease runs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="number"
                        min={1}
                        max={999}
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          onUpdateQuantity(quest.id, Math.max(1, val));
                        }}
                        className="w-16 bg-slate-950 border border-amber-500/40 rounded-lg py-1 text-center font-mono font-bold text-amber-300 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />

                      <button
                        onClick={() => onUpdateQuantity(quest.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center shadow"
                        title="Increase runs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick increment buttons */}
                    <div className="flex gap-1">
                      {[+5, +10, +25].map((inc) => (
                        <button
                          key={inc}
                          onClick={() => onUpdateQuantity(quest.id, item.quantity + inc)}
                          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[10px] font-mono border border-slate-700/60"
                        >
                          +{inc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Calculated Yield & Delete */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    <div className="text-right space-y-0.5">
                      <div className="text-[10px] text-slate-400">Total Yield ({item.quantity}x)</div>
                      <div className="text-sm font-bold font-mono text-amber-300">
                        {totalBoostedForQuest.toLocaleString()} XP
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {(quest.gold * item.quantity).toLocaleString()} G
                        {quest.bloodOrbs ? ` • ${(quest.bloodOrbs * item.quantity).toLocaleString()} BO` : ''}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveQuest(quest.id)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors"
                      title="Remove from plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-8 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">Your leveling plan is empty</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Add quests from the <strong>Quest Database</strong> or pick one of the <strong>community leveling presets</strong> above to calculate your total XP earnings and simulate repeat runs!
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={onGoToDatabase}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Browse Quest Database</span>
              </button>
              <button
                onClick={() => onLoadPreset('starter_sprint_1_15')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 hover:bg-slate-700"
              >
                Load Starter 1-15 Preset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Community Comments Modal */}
      {commentsModal && (
        <CommunityCommentsSection
          itemId={commentsModal.itemId}
          itemTitle={commentsModal.itemTitle}
          itemType={commentsModal.itemType}
          currentUser={currentUser}
          onOpenAuth={onOpenAuth}
          isModal={true}
          isOpen={true}
          onClose={() => setCommentsModal(null)}
        />
      )}

      {/* Auth Gate Modal for Custom Spot Farm */}
      {showAuthGateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  Arisen Account Required
                </h3>
              </div>
              <button
                onClick={() => setShowAuthGateModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Adding custom farm spots and mob loops is available exclusively to registered Arisen accounts. Creating an account lets you author custom spots, attach your character and clan name, and browse & share player farm spots.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowAuthGateModal(false);
                  if (onOpenAuth) onOpenAuth();
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Log In / Create Account</span>
              </button>
              <button
                onClick={() => setShowAuthGateModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
