import React, { useState, useMemo } from 'react';
import {
  Swords,
  Shield,
  Sparkles,
  Zap,
  Crosshair,
  Search,
  CheckCircle2,
  Circle,
  HelpCircle,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  MapPin,
  Lock,
  Unlock,
  Flame,
  Calculator,
  Coins,
  Info,
  RefreshCw,
  Sliders,
  Check,
  Table,
  LayoutGrid,
  List
} from 'lucide-react';
import { GameVersion, VocationData, VocationId, VocationType } from '../types';
import { ALL_VOCATIONS } from '../data/vocations';
import {
  getMaxLevelForVersion,
  CUSTOM_SKILL_JP_COSTS,
  NORMAL_SKILL_JP_COSTS,
  AUGMENT_JP_COSTS,
  JP_GAIN_MAX_LEVEL,
  getJpEarnedByLevel,
  getRemainingLevelingJp,
  calculateSkillUpgradeJp,
  getCustomSkillRankRequiredLevel,
  getNormalSkillRankRequiredLevel,
  getAugmentRankRequiredLevel
} from '../data/levelTable';

interface VocationSkillTreeProps {
  currentLevel: number;
  gameVersion: GameVersion;
  completedTrials?: Record<string, boolean>;
  onToggleTrial?: (trialKey: string) => void;
  selectedVocation?: VocationType;
  onSelectVocation?: (vocation: VocationType) => void;
}

export const VocationSkillTree: React.FC<VocationSkillTreeProps> = ({
  currentLevel,
  gameVersion,
  completedTrials = {},
  onToggleTrial,
  selectedVocation: controlledVocation,
  onSelectVocation
}) => {
  const [internalSelectedVocationId, setInternalSelectedVocationId] = useState<VocationId>('fighter');
  const [internalCompletedTrials, setInternalCompletedTrials] = useState<Record<string, boolean>>({});

  const selectedVocationId: VocationId = (controlledVocation as VocationId) || internalSelectedVocationId;
  const activeCompletedTrials = completedTrials && Object.keys(completedTrials).length > 0 ? completedTrials : (completedTrials || internalCompletedTrials);

  const handleSelectVocation = (vocId: VocationId) => {
    setInternalSelectedVocationId(vocId);
    if (onSelectVocation) {
      onSelectVocation(vocId as VocationType);
    }
  };

  const handleToggleTrial = (trialKey: string) => {
    if (onToggleTrial) {
      onToggleTrial(trialKey);
    } else {
      setInternalCompletedTrials((prev) => ({
        ...prev,
        [trialKey]: !prev[trialKey]
      }));
    }
  };

  const [viewMode, setViewMode] = useState<'skills' | 'normal_skills' | 'augments' | 'job_targets' | 'jp_planner'>('skills');
  const [jobTargetLayout, setJobTargetLayout] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnlockedOnly, setFilterUnlockedOnly] = useState(false);
  const [selectedRankFilter, setSelectedRankFilter] = useState<string>('all');
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});
  const [expandedJpTables, setExpandedJpTables] = useState<Record<string, boolean>>({});

  // JP Planner State: Target Ranks per Skill/Augment
  const [customSkillTargetRanks, setCustomSkillTargetRanks] = useState<Record<string, number>>({});
  const [normalSkillTargetRanks, setNormalSkillTargetRanks] = useState<Record<string, number>>({});
  const [augmentTargetRanks, setAugmentTargetRanks] = useState<Record<string, number>>({});

  const maxLevelForCurrentVersion = getMaxLevelForVersion(gameVersion);

  const selectedVocation = useMemo(() => {
    return ALL_VOCATIONS.find((v) => v.id === selectedVocationId) || ALL_VOCATIONS[0];
  }, [selectedVocationId]);

  const toggleSkillExpand = (skillId: string) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [skillId]: !prev[skillId]
    }));
  };

  const toggleJpTableExpand = (id: string) => {
    setExpandedJpTables((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Helper for generating consistent trial keys
  const getTrialKey = (
    vocId: string,
    type: 'skill' | 'aug',
    sourceId: string,
    targetRank: number,
    targetEnemy: string
  ) => {
    const slug = targetEnemy.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return `${vocId}_${type}_${sourceId}_rank_${targetRank}_${slug}`;
  };

  const isTrialCompleted = (key: string, legacyKey?: string) => {
    if (activeCompletedTrials[key]) return true;
    if (legacyKey && activeCompletedTrials[legacyKey]) return true;
    return false;
  };

  // Compile all Job Training Targets for the current vocation
  const allVocationTrials = useMemo(() => {
    const trials: {
      key: string;
      legacyKey: string;
      sourceType: 'skill' | 'augment';
      sourceId: string;
      sourceName: string;
      sourceJpName?: string;
      unlockLevel: number;
      targetRank: number;
      targetEnemy: string;
      count: number;
      minEnemyLevel: number;
      location: string;
      notes?: string;
    }[] = [];

    // From Custom Skills
    selectedVocation.customSkills.forEach((skill) => {
      if (skill.jobTraining) {
        skill.jobTraining.forEach((jt) => {
          const key = getTrialKey(selectedVocation.id, 'skill', skill.id, jt.targetRank, jt.targetEnemy);
          const legacyKey = `${selectedVocation.id}_skill_${skill.id}_rank_${jt.targetRank}`;
          trials.push({
            key,
            legacyKey,
            sourceType: 'skill',
            sourceId: skill.id,
            sourceName: skill.name,
            sourceJpName: skill.jpName,
            unlockLevel: skill.unlockLevel,
            targetRank: jt.targetRank,
            targetEnemy: jt.targetEnemy,
            count: jt.count,
            minEnemyLevel: jt.minEnemyLevel,
            location: jt.location,
            notes: jt.notes
          });
        });
      }
    });

    // From Augments
    selectedVocation.augments.forEach((aug) => {
      if (aug.jobTraining) {
        aug.jobTraining.forEach((jt) => {
          const key = getTrialKey(selectedVocation.id, 'aug', aug.id, jt.targetRank, jt.targetEnemy);
          const legacyKey = `${selectedVocation.id}_aug_${aug.id}_rank_${jt.targetRank}`;
          trials.push({
            key,
            legacyKey,
            sourceType: 'augment',
            sourceId: aug.id,
            sourceName: aug.name,
            sourceJpName: aug.jpName,
            unlockLevel: aug.unlockLevel,
            targetRank: jt.targetRank,
            targetEnemy: jt.targetEnemy,
            count: jt.count,
            minEnemyLevel: jt.minEnemyLevel,
            location: jt.location,
            notes: jt.notes
          });
        });
      }
    });

    return trials;
  }, [selectedVocation]);

  // Filtered Trials for the Job Target Directory
  const filteredTrials = useMemo(() => {
    return allVocationTrials.filter((trial) => {
      if (filterUnlockedOnly && currentLevel < trial.unlockLevel) return false;
      if (selectedRankFilter !== 'all') {
        if (selectedRankFilter === '5' && trial.targetRank !== 5) return false;
        if (selectedRankFilter === '6' && trial.targetRank !== 6) return false;
        if (selectedRankFilter === '7-9' && (trial.targetRank < 7 || trial.targetRank > 9)) return false;
        if (selectedRankFilter === '10' && trial.targetRank !== 10) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = trial.sourceName.toLowerCase().includes(q) || (trial.sourceJpName && trial.sourceJpName.includes(q));
        const matchesEnemy = trial.targetEnemy.toLowerCase().includes(q);
        const matchesLoc = trial.location.toLowerCase().includes(q);
        return matchesName || matchesEnemy || matchesLoc;
      }
      return true;
    });
  }, [allVocationTrials, filterUnlockedOnly, currentLevel, selectedRankFilter, searchQuery]);

  // Filtered Custom Skills
  const filteredCustomSkills = useMemo(() => {
    return selectedVocation.customSkills.filter((s) => {
      if (filterUnlockedOnly && currentLevel < s.unlockLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          (s.jpName && s.jpName.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedVocation, filterUnlockedOnly, currentLevel, searchQuery]);

  // Filtered Normal Skills
  const filteredNormalSkills = useMemo(() => {
    return selectedVocation.normalSkills.filter((s) => {
      if (filterUnlockedOnly && currentLevel < s.unlockLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          (s.jpName && s.jpName.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedVocation, filterUnlockedOnly, currentLevel, searchQuery]);

  // Filtered Augments
  const filteredAugments = useMemo(() => {
    return selectedVocation.augments.filter((a) => {
      if (filterUnlockedOnly && currentLevel < a.unlockLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          (a.jpName && a.jpName.toLowerCase().includes(q)) ||
          a.description.toLowerCase().includes(q) ||
          a.effect.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedVocation, filterUnlockedOnly, currentLevel, searchQuery]);

  // JP Calculations
  const currentEarnedLevelingJp = getJpEarnedByLevel(currentLevel);
  const maxLevelingJpPool = getJpEarnedByLevel(JP_GAIN_MAX_LEVEL);
  const remainingLevelingJp = getRemainingLevelingJp(currentLevel);

  // JP Planner totals
  const plannerTotals = useMemo(() => {
    let customSkillsJp = 0;
    let normalSkillsJp = 0;
    let augmentsJp = 0;
    let requiredTrialsCount = 0;

    // Custom skills JP
    selectedVocation.customSkills.forEach((skill) => {
      const isSkill1 = skill.skillNo === 1;
      const defaultRank = isSkill1 ? 1 : 0;
      const targetRank = customSkillTargetRanks[skill.id] ?? defaultRank;

      if (isSkill1) {
        if (targetRank > 1) {
          if (skill.jpCostPerRank && skill.jpCostPerRank.length >= targetRank) {
            let cost = 0;
            for (let r = 2; r <= targetRank; r++) {
              cost += skill.jpCostPerRank[r - 1] || 0;
            }
            customSkillsJp += cost;
          } else {
            customSkillsJp += calculateSkillUpgradeJp('custom', 1, targetRank);
          }
        }
      } else {
        if (targetRank >= 1) {
          if (skill.jpCostPerRank && skill.jpCostPerRank.length >= targetRank) {
            let cost = 0;
            for (let r = 1; r <= targetRank; r++) {
              cost += skill.jpCostPerRank[r - 1] || 0;
            }
            customSkillsJp += cost;
          } else {
            customSkillsJp += calculateSkillUpgradeJp('custom', 0, targetRank);
          }
        }
      }

      if (targetRank >= 6) {
        requiredTrialsCount += (targetRank - 5);
      }
    });

    // Normal skills JP
    selectedVocation.normalSkills.forEach((skill) => {
      const targetRank = normalSkillTargetRanks[skill.id] ?? 0;
      if (targetRank >= 1) {
        normalSkillsJp += calculateSkillUpgradeJp('normal', 0, targetRank);
      }
    });

    // Augments JP
    selectedVocation.augments.forEach((aug) => {
      const targetRank = augmentTargetRanks[aug.id] ?? 0;
      if (targetRank >= 1) {
        if (aug.jpCostPerRank && aug.jpCostPerRank.length >= targetRank) {
          let cost = 0;
          for (let r = 1; r <= targetRank; r++) {
            cost += aug.jpCostPerRank[r - 1] || 0;
          }
          augmentsJp += cost;
        } else {
          augmentsJp += calculateSkillUpgradeJp('augment', 0, targetRank);
        }
        if (targetRank === 5) {
          requiredTrialsCount += 1; // Rank 5 Augment Job Trial
        } else if (targetRank >= 6) {
          requiredTrialsCount += 2; // Rank 5 and Rank 6 Augment Job Trials
        }
      }
    });

    const totalBuildJp = customSkillsJp + normalSkillsJp + augmentsJp;
    const netCurrentBalance = currentEarnedLevelingJp - totalBuildJp;
    const netLv70Balance = maxLevelingJpPool - totalBuildJp;

    return {
      customSkillsJp,
      normalSkillsJp,
      augmentsJp,
      totalBuildJp,
      netCurrentBalance,
      netLv70Balance,
      requiredTrialsCount
    };
  }, [
    selectedVocation,
    customSkillTargetRanks,
    normalSkillTargetRanks,
    augmentTargetRanks,
    currentEarnedLevelingJp,
    maxLevelingJpPool
  ]);

  // Quick Preset Actions for JP Planner
  const handlePresetMaxTop4 = () => {
    const newCustom: Record<string, number> = {};
    const newNormal: Record<string, number> = {};
    const newAug: Record<string, number> = {};

    selectedVocation.customSkills.forEach((s, idx) => {
      if (idx < 4) {
        newCustom[s.id] = 10;
      } else {
        newCustom[s.id] = s.skillNo === 1 ? 1 : 0;
      }
    });
    selectedVocation.normalSkills.forEach((s) => {
      newNormal[s.id] = 6;
    });
    selectedVocation.augments.forEach((a) => {
      newAug[a.id] = 6;
    });

    setCustomSkillTargetRanks(newCustom);
    setNormalSkillTargetRanks(newNormal);
    setAugmentTargetRanks(newAug);
  };

  const handlePresetMaxAll = () => {
    const newCustom: Record<string, number> = {};
    const newNormal: Record<string, number> = {};
    const newAug: Record<string, number> = {};

    selectedVocation.customSkills.forEach((s) => {
      newCustom[s.id] = 10;
    });
    selectedVocation.normalSkills.forEach((s) => {
      newNormal[s.id] = 6;
    });
    selectedVocation.augments.forEach((a) => {
      newAug[a.id] = 6;
    });

    setCustomSkillTargetRanks(newCustom);
    setNormalSkillTargetRanks(newNormal);
    setAugmentTargetRanks(newAug);
  };

  const handleResetPlanner = () => {
    const newCustom: Record<string, number> = {};
    const newNormal: Record<string, number> = {};
    const newAug: Record<string, number> = {};

    selectedVocation.customSkills.forEach((s) => {
      newCustom[s.id] = s.skillNo === 1 ? 1 : 0;
    });
    selectedVocation.normalSkills.forEach((s) => {
      newNormal[s.id] = 0;
    });
    selectedVocation.augments.forEach((a) => {
      newAug[a.id] = 0;
    });

    setCustomSkillTargetRanks(newCustom);
    setNormalSkillTargetRanks(newNormal);
    setAugmentTargetRanks(newAug);
  };

  const totalTrialsForVocation = allVocationTrials.length;
  const completedTrialsCount = allVocationTrials.filter((t) => isTrialCompleted(t.key, t.legacyKey)).length;
  const trialsCompletionPercent =
    totalTrialsForVocation > 0 ? Math.round((completedTrialsCount / totalTrialsForVocation) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Vocation Selection Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-400" />
              <span>DDON Vocations, Skills & Job Points (JP) System</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select your class to view custom skill unlocks, augment slots, rank JP upgrade costs, and exact monster hunting trials (修練).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Character Level:</span>
            <span className="font-mono font-bold text-amber-400">Lv {currentLevel}</span>
            <span className="text-slate-600">/</span>
            <span className="font-mono text-slate-400">Cap {maxLevelForCurrentVersion}</span>
          </div>
        </div>

        {/* 11 Vocation Pill Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {ALL_VOCATIONS.map((voc) => {
            const isSelected = voc.id === selectedVocationId;
            const isHighScepterLocked = voc.id === 'high_scepter' && gameVersion === '3.1';

            return (
              <button
                key={voc.id}
                onClick={() => handleSelectVocation(voc.id)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-slate-100 ring-1 ring-amber-500 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                } ${isHighScepterLocked ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold truncate">{voc.name}</span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </div>

                <div className="text-[10px] text-slate-400 truncate mt-1">{voc.jpName}</div>

                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[9px] font-medium truncate max-w-[90px]">
                    {voc.role.split(' ')[0]}
                  </span>
                  {voc.id === 'high_scepter' && (
                    <span className="text-[9px] font-mono text-purple-300 bg-purple-500/20 px-1 rounded">
                      v3.2+
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Vocation Detailed Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight">
                {selectedVocation.name}
              </h3>
              <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                {selectedVocation.jpName}
              </span>
              <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                {selectedVocation.role}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {selectedVocation.playstyle}
            </p>
          </div>

          {/* Job Trials Progress Bar & JP Leveling Pool Card */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 min-w-[240px] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Job Targets Done</span>
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {completedTrialsCount} / {totalTrialsForVocation}
                </span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${trialsCompletionPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-right text-slate-400 font-mono">
                {trialsCompletionPercent}% Completed
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 min-w-[240px] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Leveling JP (Lv 1–70)</span>
                </span>
                <span className="font-mono font-bold text-yellow-300">
                  {currentEarnedLevelingJp.toLocaleString()} JP
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>Lv 70 Max Leveling Pool:</span>
                <span className="font-mono text-slate-300">{maxLevelingJpPool.toLocaleString()} JP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
            <span className="text-slate-400 block text-[11px]">Primary Weapon:</span>
            <span className="font-semibold text-slate-200">{selectedVocation.weapon}</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
            <span className="text-slate-400 block text-[11px]">Job Master & Location:</span>
            <span className="font-semibold text-slate-200">
              {selectedVocation.masterNpc} • {selectedVocation.masterLocation}
            </span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
            <span className="text-slate-400 block text-[11px]">Unlock Requirement:</span>
            <span className="font-semibold text-slate-200">{selectedVocation.unlockRequirement}</span>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation & Search Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setViewMode('skills')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                viewMode === 'skills'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Custom Skills ({selectedVocation.customSkills.length})</span>
            </button>

            <button
              onClick={() => setViewMode('normal_skills')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                viewMode === 'normal_skills'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Normal Skills ({selectedVocation.normalSkills.length})</span>
            </button>

            <button
              onClick={() => setViewMode('augments')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                viewMode === 'augments'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Augments & PP ({selectedVocation.augments.length})</span>
            </button>

            <button
              onClick={() => setViewMode('job_targets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                viewMode === 'job_targets'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Job Targets ({allVocationTrials.length})</span>
            </button>

            <button
              onClick={() => setViewMode('jp_planner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                viewMode === 'jp_planner'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-yellow-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>JP Cost & Build Planner</span>
            </button>
          </div>

          {/* Level Filter Toggle */}
          {viewMode !== 'jp_planner' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterUnlockedOnly(!filterUnlockedOnly)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  filterUnlockedOnly
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {filterUnlockedOnly ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{filterUnlockedOnly ? 'Unlocked at Lv ' + currentLevel : 'Show All Levels'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Search Bar & Rank filter */}
        {viewMode !== 'jp_planner' && (
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, augments, monsters (e.g. Cyclops, Dread Ape, Gorgon), locations..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {viewMode === 'job_targets' && (
              <div className="flex items-center gap-1.5 shrink-0 text-xs">
                <span className="text-slate-400 font-medium">Target Rank:</span>
                <select
                  value={selectedRankFilter}
                  onChange={(e) => setSelectedRankFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Ranks (5–10)</option>
                  <option value="5">Rank 5 (Augment Trials)</option>
                  <option value="6">Rank 6 Trials</option>
                  <option value="7-9">Rank 7–9 Trials</option>
                  <option value="10">Rank 10 (Master) Trials</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* VIEW 1: CUSTOM SKILLS */}
      {viewMode === 'skills' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Custom Skills & Job Training Trials (カスタムスキル)</span>
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                Rank 1–5: <strong className="text-yellow-400">1,550 JP</strong>
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                Rank 1–10: <strong className="text-yellow-400">15,750 JP</strong> + 5 Trials
              </span>
            </div>
          </div>

          {filteredCustomSkills.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No custom skills matched your filters.
            </div>
          ) : (
            filteredCustomSkills.map((skill) => {
              const isUnlocked = currentLevel >= skill.unlockLevel;
              const isExpanded = expandedSkills[skill.id] ?? true;
              const isJpTableOpen = expandedJpTables[skill.id] ?? false;

              return (
                <div
                  key={skill.id}
                  className={`bg-slate-900 border rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 transition-all ${
                    isUnlocked ? 'border-slate-800' : 'border-slate-900 opacity-75'
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl border shrink-0 ${
                          isUnlocked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-600 border-slate-800'
                        }`}
                      >
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="text-sm sm:text-base font-bold text-slate-100">{skill.name}</h5>
                          {skill.jpName && (
                            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                              {skill.jpName}
                            </span>
                          )}
                          {skill.element && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {skill.element}
                            </span>
                          )}
                          {skill.staminaCost && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              Stamina: {skill.staminaCost}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{skill.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-start shrink-0">
                      <span
                        className={`text-xs font-mono px-2.5 py-1 rounded-lg font-bold ${
                          isUnlocked
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-950 text-slate-500 border border-slate-800'
                        }`}
                      >
                        {isUnlocked ? `Unlocked (Vocation Lv ${skill.unlockLevel})` : `Locked (Req Vocation Lv ${skill.unlockLevel})`}
                      </span>

                      <button
                        onClick={() => toggleJpTableExpand(skill.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 transition-colors cursor-pointer ${
                          isJpTableOpen
                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        }`}
                        title="View Rank 1-10 JP Cost Table"
                      >
                        <Coins className="w-3.5 h-3.5 text-yellow-400" />
                        <span>JP Table</span>
                      </button>

                      <button
                        onClick={() => toggleSkillExpand(skill.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                        title="Toggle Job Trials Details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Vocation Level Requirements per Skill Rank Strip */}
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 font-semibold flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span>Vocation Level Requirements per Skill Rank:</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        R1–5: Job Master • R6–10: Job Training Trials (ジョブ修練)
                      </span>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center font-mono">
                      {Array.from({ length: 10 }).map((_, rIdx) => {
                        const rank = rIdx + 1;
                        const reqLvl = getCustomSkillRankRequiredLevel(skill.unlockLevel, rank, skill.reqLevelPerRank);
                        const isMet = currentLevel >= reqLvl;
                        const isTrial = rank >= 6;
                        return (
                          <div
                            key={rank}
                            className={`p-1.5 rounded-lg border text-[10px] transition-colors ${
                              isMet
                                ? isTrial
                                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                                  : 'bg-slate-900 border-slate-700 text-slate-200'
                                : 'bg-slate-950/80 border-slate-850 text-slate-500 opacity-60'
                            }`}
                            title={`Rank ${rank}: Requires Vocation Lv ${reqLvl}${isTrial ? ' + Job Training Trial' : ''}`}
                          >
                            <div className="font-bold">R{rank}</div>
                            <div className={`text-[10px] font-semibold ${isMet ? 'text-amber-400' : 'text-slate-500'}`}>
                              Lv {reqLvl}
                            </div>
                            {isTrial ? (
                              <div className="text-[8px] text-amber-400 font-sans mt-0.5">★ Trial</div>
                            ) : (
                              <div className="text-[8px] text-slate-400 font-sans mt-0.5">Master</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rank-by-Rank JP Cost Table (Expandable) */}
                  {isJpTableOpen && (
                    <div className="bg-slate-950 border border-yellow-500/30 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                        <span className="font-bold text-yellow-400 flex items-center gap-1.5">
                          <Coins className="w-4 h-4" />
                          <span>
                            {skill.name} {skill.skillNo ? `(Skill #${skill.skillNo})` : ''} — Rank 1–10 Requirements & JP Progression
                          </span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Total to Max:{' '}
                          <strong className="text-yellow-300 font-mono">
                            {(
                              skill.totalJpToMax ||
                              (skill.jpCostPerRank
                                ? skill.jpCostPerRank.reduce((a, b) => a + b, 0)
                                : 15750)
                            ).toLocaleString()}{' '}
                            JP
                          </strong>
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                              <th className="py-1 px-2">Rank</th>
                              <th className="py-1 px-2">Req Vocation Lv</th>
                              <th className="py-1 px-2">JP Cost</th>
                              <th className="py-1 px-2">Cumulative JP</th>
                              <th className="py-1 px-2">Requirement & Trial Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900 font-mono text-[11px]">
                            {Array.from({ length: 10 }).map((_, idx) => {
                              const rank = idx + 1;
                              const cost = skill.jpCostPerRank
                                ? skill.jpCostPerRank[idx] || 0
                                : CUSTOM_SKILL_JP_COSTS[idx]?.jpCost || 0;

                              let cum = 0;
                              if (skill.jpCostPerRank) {
                                for (let i = 0; i <= idx; i++) {
                                  cum += skill.jpCostPerRank[i] || 0;
                                }
                              } else {
                                cum = CUSTOM_SKILL_JP_COSTS[idx]?.cumulativeJp || 0;
                              }

                              const reqLvl = getCustomSkillRankRequiredLevel(skill.unlockLevel, rank, skill.reqLevelPerRank);
                              const isTrial = rank >= 6;
                              const isMet = currentLevel >= reqLvl;

                              return (
                                <tr key={rank} className="hover:bg-slate-900/50">
                                  <td className="py-1.5 px-2 font-bold text-slate-200">Rank {rank}</td>
                                  <td className="py-1.5 px-2 font-semibold">
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                                        isMet
                                          ? 'bg-emerald-500/20 text-emerald-300'
                                          : 'bg-slate-800 text-slate-400'
                                      }`}
                                    >
                                      Vocation Lv {reqLvl}
                                    </span>
                                  </td>
                                  <td className="py-1.5 px-2 text-yellow-400 font-semibold">
                                    {cost === 0 ? 'Free (Unlock)' : `${cost.toLocaleString()} JP`}
                                  </td>
                                  <td className="py-1.5 px-2 text-slate-300">
                                    {cum.toLocaleString()} JP
                                  </td>
                                  <td className="py-1.5 px-2 font-sans text-slate-400">
                                    {rank === 1 ? (
                                      <span className="text-slate-300">
                                        Initial Skill Unlock (Vocation Lv {reqLvl})
                                      </span>
                                    ) : isTrial ? (
                                      <span className="text-amber-300 font-medium flex items-center gap-1">
                                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span>Job Training Trial (Rank {rank} Trial Required)</span>
                                      </span>
                                    ) : (
                                      <span className="text-slate-300">
                                        Job Master Training (Req Vocation Lv {reqLvl})
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Job Training Targets (Ranks 6 to 10) */}
                  {isExpanded && skill.jobTraining && skill.jobTraining.length > 0 && (
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" />
                          <span>Job Training Targets (ジョブ修練) for Ranks 6–10</span>
                        </span>
                        <span className="text-[11px]">Click trial box to toggle completed status</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {skill.jobTraining.map((jt, jtIdx) => {
                          const trialKey = getTrialKey(selectedVocation.id, 'skill', skill.id, jt.targetRank, jt.targetEnemy);
                          const legacyKey = `${selectedVocation.id}_skill_${skill.id}_rank_${jt.targetRank}`;
                          const isDone = isTrialCompleted(trialKey, legacyKey);

                          return (
                            <div
                              key={`${jt.targetRank}_${jt.targetEnemy}_${jtIdx}`}
                              onClick={() => handleToggleTrial(trialKey)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-2 ${
                                isDone
                                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                  : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:bg-slate-950'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                                      isDone ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                                    }`}
                                  >
                                    Rank {jt.targetRank}
                                  </span>
                                  <span className="font-bold text-slate-100">{jt.targetEnemy}</span>
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Target: <strong className="text-amber-300 font-mono">x{jt.count}</strong> (Lv{' '}
                                  {jt.minEnemyLevel}+)
                                </div>
                                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate">{jt.location}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                className={`p-1 rounded transition-colors ${
                                  isDone ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                                ) : (
                                  <Circle className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW 2: NORMAL SKILLS */}
      {viewMode === 'normal_skills' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Normal Skills & Core Arts (ノーマルスキル)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Basic weapon mechanics, counter strikes, and core actions. Max Rank: 6 (Total: 2,000 JP).
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Rank 1–6 JP Cost:</span>
                <span className="font-mono text-yellow-400 font-bold">2,000 JP per skill</span>
              </div>
            </div>

            {/* Normal Skill Rank Cost Reference */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Normal Skill Rank Requirements & JP Cost Table:</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Upgraded directly at Job Master with JP
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                {NORMAL_SKILL_JP_COSTS.map((ns) => {
                  const reqLvl = getNormalSkillRankRequiredLevel(ns.rank);
                  const isMet = currentLevel >= reqLvl;
                  return (
                    <div
                      key={ns.rank}
                      className={`p-2 rounded-lg border ${
                        isMet
                          ? 'bg-slate-900 border-slate-700 text-slate-200'
                          : 'bg-slate-950 border-slate-850 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="font-bold text-slate-200">Rank {ns.rank}</div>
                      <div className="text-[10px] font-semibold text-amber-400 font-mono mt-0.5">
                        Req Lv {reqLvl}
                      </div>
                      <div className="text-yellow-400 font-mono font-semibold text-[11px] mt-0.5">
                        {ns.jpCost === 0 ? 'Free' : `+${ns.jpCost} JP`}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">({ns.cumulativeJp} Total)</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredNormalSkills.map((ns) => {
                const isUnlocked = currentLevel >= ns.unlockLevel;
                return (
                  <div
                    key={ns.id}
                    className={`p-4 rounded-xl border space-y-3 ${
                      isUnlocked
                        ? 'bg-slate-950/80 border-slate-800 text-slate-200'
                        : 'bg-slate-950/40 border-slate-900 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isUnlocked ? (
                          <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <h5 className="font-bold text-xs sm:text-sm text-slate-100">{ns.name}</h5>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                        Unlock: Vocation Lv {ns.unlockLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{ns.description}</p>

                    {/* Rank Unlock Level Grid */}
                    <div className="grid grid-cols-6 gap-1 text-center font-mono text-[10px] bg-slate-900/60 p-2 rounded-lg border border-slate-850">
                      {[1, 2, 3, 4, 5, 6].map((r) => {
                        const reqLvl = getNormalSkillRankRequiredLevel(r);
                        const isMet = currentLevel >= reqLvl;
                        return (
                          <div
                            key={r}
                            className={`p-1 rounded border ${
                              isMet
                                ? 'bg-slate-900 border-slate-700 text-slate-200'
                                : 'bg-slate-950 border-slate-900 text-slate-600'
                            }`}
                            title={`Rank ${r}: Requires Vocation Lv ${reqLvl}`}
                          >
                            <div className="font-bold">R{r}</div>
                            <div className={`text-[9px] ${isMet ? 'text-amber-400' : 'text-slate-500'}`}>
                              Lv {reqLvl}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>Max Rank: 6 (Core Action)</span>
                      <span className="text-yellow-400">Total: 2,000 JP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: AUGMENTS & PASSIVES */}
      {viewMode === 'augments' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-200 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Vocation Augments & Passive Abilities (アビリティ)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Cross-class passive skills equipable on any vocation once unlocked. Rank 1–6 (3,300 JP), Rank 1–10 (18,400 JP).
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Rank 1–6 JP:</span>
                <span className="font-mono text-yellow-400 font-bold">3,300 JP</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Rank 1–10 JP:</span>
                <span className="font-mono text-yellow-400 font-bold">18,400 JP</span>
              </div>
            </div>

            {/* Critical Augment Rule Banner */}
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 flex items-start gap-3 text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-300">
                  Augment Unlock & Trial Requirements Rule (アビリティ修練ルール):
                </span>
                <p className="text-slate-300 leading-relaxed">
                  • <strong>Ranks 1 to 4:</strong> Unlocked at the Job Master with Job Points (JP) as you reach each required vocation level.<br />
                  • <strong className="text-yellow-300">Rank 5 and Rank 6:</strong> <span className="underline decoration-amber-400 font-semibold">REQUIRE Job Training Trials (ジョブ修練)</span> from your Job Master in addition to meeting the vocation level requirement!
                </p>
              </div>
            </div>

            {filteredAugments.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                No augments matched your search filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAugments.map((aug) => {
                  const isUnlocked = currentLevel >= aug.unlockLevel;
                  const isJpTableOpen = expandedJpTables[aug.id] ?? false;
                  const maxRank = aug.maxRank || (aug.jpCostPerRank ? aug.jpCostPerRank.length : 6);

                  return (
                    <div
                      key={aug.id}
                      className={`bg-slate-950 border rounded-xl p-4 space-y-3 ${
                        isUnlocked ? 'border-slate-800 text-slate-200' : 'border-slate-900 opacity-70 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-slate-100">{aug.name}</h5>
                          {aug.jpName && (
                            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                              {aug.jpName}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                            {aug.ppCost} PP Cost
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              isUnlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {isUnlocked ? `Unlocked (Vocation Lv ${aug.unlockLevel})` : `Locked (Req Lv ${aug.unlockLevel})`}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{aug.description}</p>

                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 text-xs flex items-center justify-between">
                        <span className="text-slate-400">Bonus Effect:</span>
                        <strong className="text-amber-400 font-mono">{aug.effect}</strong>
                      </div>

                      {/* Rank Progression & Vocation Level Requirements */}
                      <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-850 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Rank Vocation Level Requirements:</span>
                          <span className="text-amber-400/90 font-mono">Rank 5 & 6 Require Trials</span>
                        </div>
                        <div className="grid grid-cols-6 gap-1 text-center font-mono text-[10px]">
                          {Array.from({ length: Math.min(6, maxRank) }).map((_, rIdx) => {
                            const rank = rIdx + 1;
                            const reqLvl = getAugmentRankRequiredLevel(aug.unlockLevel, rank, aug.reqLevelPerRank);
                            const isMet = currentLevel >= reqLvl;
                            const isTrial = rank === 5 || rank === 6;

                            return (
                              <div
                                key={rank}
                                className={`p-1 rounded border text-[10px] ${
                                  isMet
                                    ? isTrial
                                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                                      : 'bg-slate-950 border-slate-700 text-slate-200'
                                    : 'bg-slate-950 border-slate-900 text-slate-600'
                                }`}
                                title={`Rank ${rank}: Requires Vocation Lv ${reqLvl}${isTrial ? ' + Job Training Trial' : ''}`}
                              >
                                <div className="font-bold">R{rank}</div>
                                <div className={`text-[9px] ${isMet ? 'text-amber-400 font-semibold' : 'text-slate-500'}`}>
                                  Lv {reqLvl}
                                </div>
                                {isTrial && <div className="text-[7px] text-amber-400 font-sans">★ Trial</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Toggle Augment JP Table Button */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">
                          Max Total: <strong className="text-yellow-400 font-mono">{(aug.totalJpToMax || 8400).toLocaleString()} JP</strong>
                        </span>
                        <button
                          onClick={() => toggleJpTableExpand(aug.id)}
                          className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Coins className="w-3 h-3" />
                          <span>{isJpTableOpen ? 'Hide Rank JP' : 'View Rank JP & Requirements'}</span>
                        </button>
                      </div>

                      {/* Expandable Augment JP Cost Table */}
                      {isJpTableOpen && (
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-[11px] font-bold text-yellow-400 border-b border-slate-800 pb-1.5">
                            <span>{aug.name} — Rank Requirements & Upgrade Costs:</span>
                            <span className="text-slate-400 font-normal">Max: {maxRank} Ranks</span>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs font-mono">
                              <thead>
                                <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase font-sans">
                                  <th className="py-1 px-1.5">Rank</th>
                                  <th className="py-1 px-1.5">Req Vocation Lv</th>
                                  <th className="py-1 px-1.5">JP Cost</th>
                                  <th className="py-1 px-1.5 font-sans">Requirement & Trial Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-950 text-[11px]">
                                {Array.from({ length: maxRank }).map((_, idx) => {
                                  const rank = idx + 1;
                                  const cost = aug.jpCostPerRank
                                    ? aug.jpCostPerRank[idx] || 0
                                    : AUGMENT_JP_COSTS[idx]?.jpCost || 0;
                                  const reqLvl = getAugmentRankRequiredLevel(aug.unlockLevel, rank, aug.reqLevelPerRank);
                                  const isMet = currentLevel >= reqLvl;
                                  const isTrial = rank === 5 || rank === 6 || rank > 6;

                                  return (
                                    <tr key={rank} className="hover:bg-slate-950/50">
                                      <td className="py-1 px-1.5 font-bold text-slate-200">Rank {rank}</td>
                                      <td className="py-1 px-1.5">
                                        <span
                                          className={`px-1.5 py-0.2 rounded text-[10px] ${
                                            isMet ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-950 text-slate-400'
                                          }`}
                                        >
                                          Vocation Lv {reqLvl}
                                        </span>
                                      </td>
                                      <td className="py-1 px-1.5 text-yellow-400 font-semibold">
                                        {cost === 0 ? 'Free' : `+${cost.toLocaleString()} JP`}
                                      </td>
                                      <td className="py-1 px-1.5 font-sans">
                                        {rank === 1 ? (
                                          <span className="text-slate-300">Initial Unlock (Lv {reqLvl})</span>
                                        ) : rank === 5 ? (
                                          <span className="text-amber-300 font-medium flex items-center gap-1">
                                            <Award className="w-3 h-3 text-amber-400 shrink-0" />
                                            <span>Job Training Trial (Rank 5 Trial Required)</span>
                                          </span>
                                        ) : rank === 6 ? (
                                          <span className="text-amber-300 font-medium flex items-center gap-1">
                                            <Award className="w-3 h-3 text-amber-400 shrink-0" />
                                            <span>Job Training Trial (Rank 6 Trial Required)</span>
                                          </span>
                                        ) : isTrial ? (
                                          <span className="text-amber-300 font-medium flex items-center gap-1">
                                            <Award className="w-3 h-3 text-amber-400 shrink-0" />
                                            <span>Job Training Trial (Rank {rank})</span>
                                          </span>
                                        ) : (
                                          <span className="text-slate-300">Job Master (Req Lv {reqLvl})</span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Job Trials for Augment */}
                      {aug.jobTraining && aug.jobTraining.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-900">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-semibold text-amber-400 flex items-center gap-1">
                              <Award className="w-3.5 h-3.5" />
                              <span>Job Training Trials (Rank 5 & 6):</span>
                            </span>
                            <span className="text-[10px]">Click to toggle completion</span>
                          </div>
                          {aug.jobTraining.map((jt, jtIdx) => {
                            const trialKey = getTrialKey(selectedVocation.id, 'aug', aug.id, jt.targetRank, jt.targetEnemy);
                            const legacyKey = `${selectedVocation.id}_aug_${aug.id}_rank_${jt.targetRank}`;
                            const isDone = isTrialCompleted(trialKey, legacyKey);
                            const trialReqLv = getAugmentRankRequiredLevel(aug.unlockLevel, jt.targetRank, aug.reqLevelPerRank);

                            return (
                              <div
                                key={`${jt.targetRank}_${jt.targetEnemy}_${jtIdx}`}
                                onClick={() => handleToggleTrial(trialKey)}
                                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                                  isDone
                                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/40'
                                }`}
                              >
                                <div className="space-y-0.5">
                                  <div className="font-semibold text-slate-100 flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-mono px-1 rounded bg-amber-500 text-slate-950 font-bold">
                                      Rank {jt.targetRank} Trial
                                    </span>
                                    <span>{jt.targetEnemy} (x{jt.count}, Lv {jt.minEnemyLevel}+)</span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      (Req Vocation Lv {trialReqLv})
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-400">{jt.location}</div>
                                </div>

                                <button
                                  type="button"
                                  className={`p-1 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`}
                                >
                                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 4: JOB TARGETS DIRECTORY (修練一覧) */}
      {viewMode === 'job_targets' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-200 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Job Training Checklist & Targets (ジョブ修練一覧) — {selectedVocation.name}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Defeat specified monsters to unlock skill ranks (Ranks 6 to 10 for custom skills, Ranks 5–6 for abilities) at the Job Master.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* View Switcher: Table vs Cards */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setJobTargetLayout('table')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      jobTargetLayout === 'table'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Table className="w-3.5 h-3.5" />
                    <span>Table Matrix</span>
                  </button>
                  <button
                    onClick={() => setJobTargetLayout('cards')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      jobTargetLayout === 'cards'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid Cards</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Completed:</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {completedTrialsCount} / {totalTrialsForVocation} ({trialsCompletionPercent}%)
                  </span>
                </div>
              </div>
            </div>

            {/* If no trials exist for this vocation yet */}
            {allVocationTrials.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs space-y-2 bg-slate-950/60 rounded-xl border border-slate-800/80 p-6">
                <Info className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
                <p className="font-medium text-slate-300">
                  Job training targets for {selectedVocation.name} are currently cleared.
                </p>
                <p className="text-slate-500 max-w-md mx-auto">
                  Job training targets have been freshly populated for Spirit Lancer. Provide the next vocation dataset to populate its training requirements table!
                </p>
              </div>
            ) : jobTargetLayout === 'table' ? (
              /* TABULAR MATRIX VIEW */
              <div className="space-y-6">
                
                {/* 1. Custom Skills Table */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-2">
                      <Swords className="w-4 h-4" />
                      <span>1. {selectedVocation.name} — Custom Skills Job Training Table</span>
                    </h5>
                    <span className="text-[11px] text-slate-400">Click any target bullet to toggle completed status</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900/90 text-slate-300 font-semibold border-b border-slate-800 text-[11px]">
                          <th className="p-3 w-44">Skill</th>
                          <th className="p-3 w-28 text-center">Unlock Req.</th>
                          <th className="p-3 min-w-[200px]">Lv.7 Target & Amount</th>
                          <th className="p-3 min-w-[200px]">Lv.8 Target & Amount</th>
                          <th className="p-3 min-w-[200px]">Lv.9 Target & Amount</th>
                          <th className="p-3 min-w-[200px]">Lv.10 Target & Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {selectedVocation.customSkills.map((skill) => {
                          const isUnlocked = currentLevel >= skill.unlockLevel;
                          const r7Targets = skill.jobTraining?.filter((jt) => jt.targetRank === 7) || [];
                          const r8Targets = skill.jobTraining?.filter((jt) => jt.targetRank === 8) || [];
                          const r9Targets = skill.jobTraining?.filter((jt) => jt.targetRank === 9) || [];
                          const r10Targets = skill.jobTraining?.filter((jt) => jt.targetRank === 10) || [];

                          // Check if skill has any training
                          const hasTraining = (skill.jobTraining && skill.jobTraining.length > 0);

                          return (
                            <tr
                              key={skill.id}
                              className={`hover:bg-slate-900/50 transition-colors ${
                                !isUnlocked ? 'opacity-70 bg-slate-950/40' : ''
                              }`}
                            >
                              {/* Skill Info */}
                              <td className="p-3 align-top">
                                <div className="font-bold text-slate-100">{skill.name}</div>
                                {skill.jpName && (
                                  <div className="text-[10px] text-slate-400">{skill.jpName}</div>
                                )}
                                <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                                  {skill.element || skill.role || 'Active'}
                                </div>
                              </td>

                              {/* Unlock Level */}
                              <td className="p-3 align-top text-center">
                                <span
                                  className={`inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                                    isUnlocked
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  Lv {skill.unlockLevel}
                                </span>
                              </td>

                              {/* Target Ranks 7, 8, 9, 10 */}
                              {[
                                { rank: 7, targets: r7Targets },
                                { rank: 8, targets: r8Targets },
                                { rank: 9, targets: r9Targets },
                                { rank: 10, targets: r10Targets }
                              ].map(({ rank, targets }) => (
                                <td key={rank} className="p-3 align-top">
                                  {targets.length === 0 ? (
                                    <span className="text-slate-600 text-[11px] font-mono">—</span>
                                  ) : (
                                    <div className="space-y-1.5">
                                      {targets.map((jt, idx) => {
                                        const trialKey = getTrialKey(
                                          selectedVocation.id,
                                          'skill',
                                          skill.id,
                                          jt.targetRank,
                                          jt.targetEnemy
                                        );
                                        const legacyKey = `${selectedVocation.id}_skill_${skill.id}_rank_${jt.targetRank}`;
                                        const isDone = isTrialCompleted(trialKey, legacyKey);

                                        return (
                                          <div
                                            key={`${rank}_${jt.targetEnemy}_${idx}`}
                                            onClick={() => handleToggleTrial(trialKey)}
                                            className={`p-1.5 rounded-lg border text-[11px] cursor-pointer transition-all flex items-start justify-between gap-1.5 ${
                                              isDone
                                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:bg-slate-850'
                                            }`}
                                          >
                                            <div className="space-y-0.5 flex-1">
                                              <div className="font-semibold text-slate-100 leading-tight">
                                                • Lv{jt.minEnemyLevel} {jt.targetEnemy} x{jt.count}
                                              </div>
                                              {jt.location && (
                                                <div className="text-[10px] text-slate-400 truncate">
                                                  {jt.location}
                                                </div>
                                              )}
                                            </div>
                                            <span className="shrink-0 mt-0.5">
                                              {isDone ? (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/20" />
                                              ) : (
                                                <Circle className="w-3.5 h-3.5 text-slate-600" />
                                              )}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Abilities (Augments) Table */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>2. {selectedVocation.name} — Abilities (Augments) Job Training Table</span>
                    </h5>
                    <span className="text-[11px] text-slate-400">Ranks 5–6 Trials</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900/90 text-slate-300 font-semibold border-b border-slate-800 text-[11px]">
                          <th className="p-3 w-48">Ability</th>
                          <th className="p-3 w-28 text-center">Unlock Req.</th>
                          <th className="p-3 min-w-[280px]">Target & Amount (ジョブ修練)</th>
                          <th className="p-3 w-64">Cost & Effect</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {selectedVocation.augments.map((aug) => {
                          const isUnlocked = currentLevel >= aug.unlockLevel;
                          const hasTraining = aug.jobTraining && aug.jobTraining.length > 0;

                          return (
                            <tr
                              key={aug.id}
                              className={`hover:bg-slate-900/50 transition-colors ${
                                !isUnlocked ? 'opacity-70 bg-slate-950/40' : ''
                              }`}
                            >
                              {/* Ability Name */}
                              <td className="p-3 align-top">
                                <div className="font-bold text-slate-100">{aug.name}</div>
                                {aug.jpName && (
                                  <div className="text-[10px] text-slate-400">{aug.jpName}</div>
                                )}
                              </td>

                              {/* Unlock Req */}
                              <td className="p-3 align-top text-center">
                                <span
                                  className={`inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                                    isUnlocked
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  Lv {aug.unlockLevel}
                                </span>
                              </td>

                              {/* Targets */}
                              <td className="p-3 align-top">
                                {!hasTraining ? (
                                  <span className="text-slate-600 text-[11px] font-mono">—</span>
                                ) : (
                                  <div className="space-y-1.5">
                                    {aug.jobTraining!.map((jt, idx) => {
                                      const trialKey = getTrialKey(
                                        selectedVocation.id,
                                        'aug',
                                        aug.id,
                                        jt.targetRank,
                                        jt.targetEnemy
                                      );
                                      const legacyKey = `${selectedVocation.id}_aug_${aug.id}_rank_${jt.targetRank}`;
                                      const isDone = isTrialCompleted(trialKey, legacyKey);

                                      return (
                                        <div
                                          key={`${jt.targetRank}_${jt.targetEnemy}_${idx}`}
                                          onClick={() => handleToggleTrial(trialKey)}
                                          className={`p-2 rounded-lg border text-[11px] cursor-pointer transition-all flex items-start justify-between gap-2 ${
                                            isDone
                                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:bg-slate-850'
                                          }`}
                                        >
                                          <div className="space-y-0.5 flex-1">
                                            <div className="flex items-center gap-1.5 font-semibold text-slate-100">
                                              <span className="text-[9px] font-mono px-1 rounded bg-amber-500 text-slate-950 font-bold">
                                                Rank {jt.targetRank}
                                              </span>
                                              <span>• Lv{jt.minEnemyLevel} {jt.targetEnemy} x{jt.count}</span>
                                            </div>
                                            {jt.location && (
                                              <div className="text-[10px] text-slate-400 truncate">
                                                {jt.location}
                                              </div>
                                            )}
                                          </div>
                                          <span className="shrink-0 mt-0.5">
                                            {isDone ? (
                                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                                            ) : (
                                              <Circle className="w-4 h-4 text-slate-600" />
                                            )}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </td>

                              {/* Cost & Effect */}
                              <td className="p-3 align-top">
                                <div className="space-y-1">
                                  <div className="text-[10px] font-mono text-yellow-400 font-bold">
                                    {aug.cost} PP
                                  </div>
                                  <div className="text-[11px] text-slate-300 leading-snug">
                                    {aug.effect || aug.description}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              /* GRID CARDS VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTrials.map((trial) => {
                  const isDone = isTrialCompleted(trial.key, trial.legacyKey);
                  const isLevelUnlocked = currentLevel >= trial.unlockLevel;

                  return (
                    <div
                      key={trial.key}
                      onClick={() => handleToggleTrial(trial.key)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-2.5 ${
                        isDone
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : isLevelUnlocked
                          ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-500/40 hover:bg-slate-950/80'
                          : 'bg-slate-950/50 border-slate-900 opacity-60 text-slate-500'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                              isDone ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                            }`}
                          >
                            Rank {trial.targetRank}
                          </span>
                          <span className="font-bold text-slate-100 text-xs truncate max-w-[150px]">
                            {trial.sourceName}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono px-1 rounded bg-slate-800">
                            {trial.sourceType}
                          </span>
                        </div>

                        <div className="text-xs text-amber-300/90 font-medium">
                          Hunt: <strong className="text-white font-bold">{trial.targetEnemy}</strong> x{trial.count}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                          <span>Min Monster: Lv {trial.minEnemyLevel}+</span>
                          <span>Skill Req: Lv {trial.unlockLevel}</span>
                        </div>

                        <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-800/60">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{trial.location}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`p-1 shrink-0 ${isDone ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 5: JP COST & BUILD PLANNER */}
      {viewMode === 'jp_planner' && (
        <div className="space-y-5">
          
          {/* Top JP Balance & Budget Dashboard */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <span>Job Points (JP) Build & Budget Calculator — {selectedVocation.name}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Select your desired target ranks for Custom Skills, Normal Skills, and Augments to calculate exact total JP required.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={handlePresetMaxTop4}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Preset: 4 Skills + Passives
                </button>
                <button
                  onClick={handlePresetMaxAll}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors cursor-pointer"
                >
                  Max All Skills
                </button>
                <button
                  onClick={handleResetPlanner}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title="Reset all ranks to 1"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Summary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
              
              {/* Card 1: Total JP Required */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-sans text-slate-400 font-semibold block">
                  Total JP Required for Build
                </span>
                <div className="text-xl font-bold text-yellow-400">
                  {plannerTotals.totalBuildJp.toLocaleString()} JP
                </div>
                <div className="text-[10px] text-slate-500 font-sans flex justify-between">
                  <span>Skills: {plannerTotals.customSkillsJp.toLocaleString()}</span>
                  <span>Augs: {plannerTotals.augmentsJp.toLocaleString()}</span>
                </div>
              </div>

              {/* Card 2: Leveling JP Earned */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-sans text-slate-400 font-semibold block">
                  Leveling JP at Lv {currentLevel}
                </span>
                <div className="text-xl font-bold text-amber-300">
                  {currentEarnedLevelingJp.toLocaleString()} JP
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  {currentLevel >= JP_GAIN_MAX_LEVEL ? 'Lv 70 Cap Reached (Max)' : `+${remainingLevelingJp.toLocaleString()} JP to Lv 70`}
                </div>
              </div>

              {/* Card 3: Current Net Balance */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-sans text-slate-400 font-semibold block">
                  Net Balance (At Current Lv)
                </span>
                <div
                  className={`text-xl font-bold ${
                    plannerTotals.netCurrentBalance >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {plannerTotals.netCurrentBalance >= 0 ? '+' : ''}
                  {plannerTotals.netCurrentBalance.toLocaleString()} JP
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  {plannerTotals.netCurrentBalance >= 0 ? 'Leveling JP covers build!' : 'Deficit (Quests/BO needed)'}
                </div>
              </div>

              {/* Card 4: Required Job Trials */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-sans text-slate-400 font-semibold block">
                  Job Trials (修練) Required
                </span>
                <div className="text-xl font-bold text-purple-300">
                  {plannerTotals.requiredTrialsCount} Trials
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  For Rank 6–10 Upgrades
                </div>
              </div>
            </div>

            {/* Explanatory Notice */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Job Points Leveling Rule:</strong> Leveling from <strong>Lv 1 to Lv 70</strong> grants a total of <strong>722 000. JP JP</strong>. Level-up JP gain terminates upon hitting Lv 70. Any JP deficit beyond your leveling pool is earned from  Grand Missions and on Rising server Ophilia via Rift currency (The numbers of needed JP !
              </div>
            </div>
          </div>

          {/* Interactive Rank Selector Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Custom Skills Builder */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h5 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Custom Skills Target Ranks (Skill #1 starts at Lv 1)</span>
                </h5>
                <span className="text-xs font-mono text-yellow-400 font-semibold">
                  {plannerTotals.customSkillsJp.toLocaleString()} JP
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedVocation.customSkills.map((skill) => {
                  const isSkill1 = skill.skillNo === 1;
                  const defaultRank = isSkill1 ? 1 : 0;
                  const targetRank = customSkillTargetRanks[skill.id] ?? defaultRank;
                  let jpCost = 0;

                  if (isSkill1) {
                    if (targetRank > 1) {
                      if (skill.jpCostPerRank && skill.jpCostPerRank.length >= targetRank) {
                        for (let r = 2; r <= targetRank; r++) {
                          jpCost += skill.jpCostPerRank[r - 1] || 0;
                        }
                      } else {
                        jpCost = calculateSkillUpgradeJp('custom', 1, targetRank);
                      }
                    }
                  } else {
                    if (targetRank >= 1) {
                      if (skill.jpCostPerRank && skill.jpCostPerRank.length >= targetRank) {
                        for (let r = 1; r <= targetRank; r++) {
                          jpCost += skill.jpCostPerRank[r - 1] || 0;
                        }
                      } else {
                        jpCost = calculateSkillUpgradeJp('custom', 0, targetRank);
                      }
                    }
                  }

                  const options = isSkill1
                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

                  return (
                    <div
                      key={skill.id}
                      className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-200">{skill.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Skill #{skill.skillNo}</span>
                          {isSkill1 && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                              Base Skill (Lv 1)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Upgrade Cost: <strong className="text-yellow-400 font-mono">+{jpCost.toLocaleString()} JP</strong>
                          {targetRank >= 6 && (
                            <span className="ml-1 text-amber-400">({targetRank - 5} Trials)</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-400 font-mono">Rank</span>
                        <select
                          value={targetRank}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setCustomSkillTargetRanks((prev) => ({
                              ...prev,
                              [skill.id]: val
                            }));
                          }}
                          className="bg-slate-900 border border-slate-700 text-slate-100 font-mono font-bold text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-amber-500"
                        >
                          {options.map((r) => {
                            const reqLvl = r > 0 ? getCustomSkillRankRequiredLevel(skill.unlockLevel, r, skill.reqLevelPerRank) : 0;
                            return (
                              <option key={r} value={r}>
                                {r === 0
                                  ? 'Rank 0 (Not Learned)'
                                  : `Rank ${r} (Req Lv ${reqLvl}${r >= 6 ? ' • ★ Trial' : ''})`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Augments Builder */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h5 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Augments Target Ranks (Default Rank 0)</span>
                </h5>
                <span className="text-xs font-mono text-yellow-400 font-semibold">
                  {plannerTotals.augmentsJp.toLocaleString()} JP
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedVocation.augments.map((aug) => {
                  const targetRank = augmentTargetRanks[aug.id] ?? 0;
                  let jpCost = 0;
                  if (targetRank >= 1) {
                    if (aug.jpCostPerRank && aug.jpCostPerRank.length >= targetRank) {
                      for (let r = 1; r <= targetRank; r++) {
                        jpCost += aug.jpCostPerRank[r - 1] || 0;
                      }
                    } else {
                      jpCost = calculateSkillUpgradeJp('augment', 0, targetRank);
                    }
                  }

                  const maxRank = aug.maxRank || (aug.jpCostPerRank ? aug.jpCostPerRank.length : 6);
                  const rankOptions = Array.from({ length: maxRank + 1 }, (_, i) => i);

                  return (
                    <div
                      key={aug.id}
                      className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-200">{aug.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                            {aug.ppCost} PP
                          </span>
                          {aug.abilityNo && (
                            <span className="text-[10px] text-slate-500 font-mono">#{aug.abilityNo}</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Upgrade Cost: <strong className="text-yellow-400 font-mono">+{jpCost.toLocaleString()} JP</strong>
                          {targetRank === 5 && (
                            <span className="ml-1 text-amber-400 font-semibold">(1 Trial)</span>
                          )}
                          {targetRank >= 6 && (
                            <span className="ml-1 text-amber-400 font-semibold">(2 Trials)</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-400 font-mono">Rank</span>
                        <select
                          value={targetRank}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setAugmentTargetRanks((prev) => ({
                              ...prev,
                              [aug.id]: val
                            }));
                          }}
                          className="bg-slate-900 border border-slate-700 text-slate-100 font-mono font-bold text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-amber-500"
                        >
                          {rankOptions.map((r) => {
                            const reqLvl = r > 0 ? getAugmentRankRequiredLevel(aug.unlockLevel, r, aug.reqLevelPerRank) : 0;
                            return (
                              <option key={r} value={r}>
                                {r === 0
                                  ? 'Rank 0 (Not Learned)'
                                  : `Rank ${r} (Req Lv ${reqLvl}${
                                      r === 5 ? ' • ★ Rank 5 Trial' : r === 6 ? ' • ★ Rank 6 Trial' : ''
                                    })`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
