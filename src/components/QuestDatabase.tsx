import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Check,
  Sparkles,
  MapPin,
  Coins,
  Shield,
  RotateCw,
  Flame,
  Swords,
  Scroll,
  Zap,
  Target,
  UserCheck,
  Globe,
  Compass
} from 'lucide-react';
import { BoosterSettings, PlannedQuest, Quest, QuestType, Region } from '../types';
import { ALL_QUESTS, REGIONS } from '../data/quests';
import { WORLD_QUEST_SUBCATEGORIES } from '../data/worldQuests';
import { PERSONAL_QUEST_SUBCATEGORIES } from '../data/personalQuests';
import { getSingleQuestXp, calculateRunsNeededForQuest } from '../utils/calculator';
import { XP_RING_CAP_LEVEL } from '../data/levelTable';

interface QuestDatabaseProps {
  currentLevel: number;
  targetLevel: number;
  boosters: BoosterSettings;
  plannedQuests: PlannedQuest[];
  onAddQuest: (questId: string, quantity?: number) => void;
  onUpdateQuantity: (questId: string, quantity: number) => void;
  onOpenCustomQuestModal: () => void;
}

export const QuestDatabase: React.FC<QuestDatabaseProps> = ({
  currentLevel,
  targetLevel,
  boosters,
  plannedQuests,
  onAddQuest,
  onUpdateQuantity,
  onOpenCustomQuestModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [personalSubcategory, setPersonalSubcategory] = useState<string>('ALL');
  const [worldSubcategory, setWorldSubcategory] = useState<string>('ALL');
  const [minLevelFilter, setMinLevelFilter] = useState<number | ''>(1);
  const [maxLevelFilter, setMaxLevelFilter] = useState<number | ''>(100);
  const [sortBy, setSortBy] = useState<'level_asc' | 'level_desc' | 'xp_desc' | 'gold_desc'>('level_asc');

  // Build a lookup map of planned quantities
  const plannedMap = useMemo(() => {
    const map = new Map<string, number>();
    plannedQuests.forEach((pq) => {
      map.set(pq.questId, (map.get(pq.questId) || 0) + pq.quantity);
    });
    return map;
  }, [plannedQuests]);

  // Filtered and sorted quests
  const filteredQuests = useMemo(() => {
    const minL = typeof minLevelFilter === 'number' ? minLevelFilter : 1;
    const maxL = typeof maxLevelFilter === 'number' ? maxLevelFilter : 100;

    return ALL_QUESTS.filter((quest) => {
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = quest.name.toLowerCase().includes(q);
        const matchesJp = quest.jpName?.toLowerCase().includes(q);
        const matchesLocation = quest.location?.toLowerCase().includes(q);
        const matchesEnemy = quest.targetEnemy?.toLowerCase().includes(q);
        const matchesObjective = quest.objective?.toLowerCase().includes(q);
        const matchesNotes = quest.notes?.toLowerCase().includes(q);
        const matchesAnnotation = quest.annotation?.toLowerCase().includes(q);
        const matchesCode = quest.questCode?.toLowerCase().includes(q) || quest.id.toLowerCase().includes(q);
        if (!matchesName && !matchesJp && !matchesLocation && !matchesEnemy && !matchesObjective && !matchesNotes && !matchesAnnotation && !matchesCode) {
          return false;
        }
      }

      // Region Filter
      if (selectedRegion !== 'all' && quest.region !== selectedRegion) {
        return false;
      }

      // Type Filter
      if (selectedType !== 'all') {
        if (selectedType.startsWith('personal:')) {
          const sub = selectedType.replace('personal:', '');
          if (quest.type !== 'personal' || quest.annotation !== sub) {
            return false;
          }
        } else if (selectedType.startsWith('world:')) {
          const sub = selectedType.replace('world:', '');
          if (quest.type !== 'world' || quest.annotation !== sub) {
            return false;
          }
        } else if (quest.type !== selectedType) {
          return false;
        }
      }

      // World Subcategory Filter (when world type or all is active)
      if ((selectedType === 'world' || selectedType === 'all') && worldSubcategory !== 'ALL') {
        if (quest.type === 'world' && quest.annotation !== worldSubcategory) {
          return false;
        }
        if (quest.type !== 'world' && selectedType === 'world') {
          return false;
        }
      }

      // Personal Subcategory Filter (when personal type or all is active)
      if ((selectedType === 'personal' || selectedType === 'all') && personalSubcategory !== 'ALL') {
        if (quest.type === 'personal' && quest.annotation !== personalSubcategory) {
          return false;
        }
        if (quest.type !== 'personal' && selectedType === 'personal') {
          return false;
        }
      }

      // Level Filter
      if (quest.minLevel < minL || quest.minLevel > maxL) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'level_asc') return a.minLevel - b.minLevel;
      if (sortBy === 'level_desc') return b.minLevel - a.minLevel;
      if (sortBy === 'xp_desc') return b.baseXp - a.baseXp;
      if (sortBy === 'gold_desc') return b.gold - a.gold;
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedType, worldSubcategory, personalSubcategory, minLevelFilter, maxLevelFilter, sortBy]);

  const typeBadges: Record<QuestType, { label: string; bg: string; text: string; icon: React.ElementType }> = {
    main: { label: 'Main Story Quest', bg: 'bg-purple-500/20 border-purple-500/40', text: 'text-purple-300', icon: Flame },
    world: { label: 'World Quest', bg: 'bg-emerald-500/20 border-emerald-500/40', text: 'text-emerald-300', icon: Swords },
    personal: { label: 'Personal Quest', bg: 'bg-cyan-500/20 border-cyan-500/40', text: 'text-cyan-300', icon: UserCheck },
    board: { label: 'Board Quest', bg: 'bg-blue-500/20 border-blue-500/40', text: 'text-blue-300', icon: Scroll },
    grand_mission: { label: 'Grand Mission', bg: 'bg-amber-500/20 border-amber-500/40', text: 'text-amber-300', icon: Sparkles },
    repeatable_grind: { label: 'Repeatable Grind', bg: 'bg-yellow-500/20 border-yellow-500/40', text: 'text-yellow-300', icon: RotateCw },
    trial: { label: 'Area Trial', bg: 'bg-rose-500/20 border-rose-500/40', text: 'text-rose-300', icon: Shield }
  };

  const isRingActiveAtCurrentLevel = boosters.useExpRing50 && currentLevel < XP_RING_CAP_LEVEL;

  const totalWorldQuests = ALL_QUESTS.filter(q => q.type === 'world').length;
  const totalPersonalQuests = ALL_QUESTS.filter(q => q.type === 'personal').length;
  const totalMainQuests = ALL_QUESTS.filter(q => q.type === 'main').length;

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        
        {/* Search Bar & Custom Quest Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quests by name, quest code (e.g. q20000000), enemy, region or rewards..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={onOpenCustomQuestModal}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Custom Quest / Mob Grind</span>
          </button>
        </div>

        {/* Filters Grid: Region, Level Range, Type, Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Region Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Region / Area</span>
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Regions ({ALL_QUESTS.length} Quests)</option>
              {REGIONS.map((r) => {
                const count = ALL_QUESTS.filter((q) => q.region === r).length;
                return (
                  <option key={r} value={r}>
                    {r} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Quest Type Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-400" />
              <span>Quest Category</span>
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                if (e.target.value !== 'personal' && !e.target.value.startsWith('personal:')) {
                  setPersonalSubcategory('ALL');
                }
                if (e.target.value !== 'world' && !e.target.value.startsWith('world:')) {
                  setWorldSubcategory('ALL');
                }
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Categories ({ALL_QUESTS.length})</option>
              <option value="main">Main Story Quests ({totalMainQuests})</option>
              <option value="world">World Quests: All 21 Subcategories ({totalWorldQuests})</option>
              <option value="personal">Personal Quests: All Subcategories ({totalPersonalQuests})</option>
              <option value="personal:Area Trials">↳ Personal: Area Trials (79)</option>
              <option value="personal:Job">↳ Personal: Job Quests (78)</option>
              <option value="personal:Season Events">↳ Personal: Season Events (25)</option>
              <option value="personal:Useful For Adventure">↳ Personal: Useful For Adventure (97)</option>
            </select>
          </div>

          {/* Level Range Filter */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Level Bracket</span>
              <span className="text-amber-400 font-mono">
                Lv {minLevelFilter === '' ? 1 : minLevelFilter} - {maxLevelFilter === '' ? 100 : maxLevelFilter}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={100}
                placeholder="1"
                value={minLevelFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setMinLevelFilter('');
                  } else {
                    const num = parseInt(val, 10);
                    if (!isNaN(num)) {
                      setMinLevelFilter(Math.min(100, Math.max(1, num)));
                    }
                  }
                }}
                className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-200 font-mono text-center focus:outline-none focus:border-amber-500"
              />
              <span className="text-slate-500 text-xs">to</span>
              <input
                type="number"
                min={1}
                max={100}
                placeholder="100"
                value={maxLevelFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setMaxLevelFilter('');
                  } else {
                    const num = parseInt(val, 10);
                    if (!isNaN(num)) {
                      setMaxLevelFilter(Math.min(100, Math.max(1, num)));
                    }
                  }
                }}
                className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-200 font-mono text-center focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => {
                  setMinLevelFilter(1);
                  setMaxLevelFilter(100);
                }}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Sort Results
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="level_asc">Level: Low to High</option>
              <option value="level_desc">Level: High to Low</option>
              <option value="xp_desc">XP Reward: Highest First</option>
              <option value="gold_desc">Gold Reward: Highest First</option>
            </select>
          </div>
        </div>

        {/* Quick Level Bracket Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Quick Levels:</span>
          {[
            { label: 'All', min: 1, max: 100 },
            { label: 'Lv 1-20 (Season 1.0)', min: 1, max: 20 },
            { label: 'Lv 20-40 (Mid S1)', min: 20, max: 40 },
            { label: 'Lv 40-55 (Season 1.1-1.2)', min: 40, max: 55 },
            { label: 'Lv 55-75 (Season 2.0-2.3)', min: 55, max: 75 },
            { label: 'Lv 75-100 (Season 3.0-3.4)', min: 75, max: 100 },
            { label: `Near My Level (${Math.max(1, currentLevel - 5)}-${Math.min(100, currentLevel + 5)})`, min: Math.max(1, currentLevel - 5), max: Math.min(100, currentLevel + 5) }
          ].map((b) => (
            <button
              key={b.label}
              onClick={() => {
                setMinLevelFilter(b.min);
                setMaxLevelFilter(b.max);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-all font-mono cursor-pointer ${
                minLevelFilter === b.min && maxLevelFilter === b.max
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* World Quest Subcategories Filter Bar */}
        {(selectedType === 'all' || selectedType === 'world' || selectedType.startsWith('world:')) && (
          <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>World Quest Subcategory (Area):</span>
              </span>
              {worldSubcategory !== 'ALL' && (
                <button
                  onClick={() => setWorldSubcategory('ALL')}
                  className="text-[10px] text-slate-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Show All Areas
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
              {WORLD_QUEST_SUBCATEGORIES.map((sub) => {
                const count = sub === 'ALL'
                  ? totalWorldQuests
                  : ALL_QUESTS.filter(q => q.type === 'world' && q.annotation === sub).length;

                const isActive = worldSubcategory === sub;

                return (
                  <button
                    key={sub}
                    onClick={() => {
                      if (selectedType !== 'world' && selectedType !== 'all') {
                        setSelectedType('world');
                      }
                      setWorldSubcategory(sub);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-all font-medium border whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>{sub}</span>
                    <span className="ml-1 opacity-75 font-mono text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Personal Quest Subcategories Filter Bar */}
        {(selectedType === 'all' || selectedType === 'personal' || selectedType.startsWith('personal:')) && (
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800/60 text-xs">
            <span className="text-[11px] text-cyan-400 font-semibold mr-1 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Personal Subcategory:</span>
            </span>
            {[
              { id: 'ALL', label: 'All Personal (279)' },
              { id: 'Area Trials', label: 'Area Trials (79)', color: 'border-rose-500/40 text-rose-300' },
              { id: 'Job', label: 'Job Quests (78)', color: 'border-indigo-500/40 text-indigo-300' },
              { id: 'Season Events', label: 'Season Events (25)', color: 'border-amber-500/40 text-amber-300' },
              { id: 'Useful For Adventure', label: 'Useful For Adventure (97)', color: 'border-emerald-500/40 text-emerald-300' }
            ].map((sub) => {
              const isActive = (selectedType === 'personal' || selectedType === 'all')
                ? personalSubcategory === sub.id
                : selectedType === `personal:${sub.id}`;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    if (selectedType.startsWith('personal:')) {
                      setSelectedType('personal');
                    }
                    setPersonalSubcategory(sub.id);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all font-medium border cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1 flex-wrap gap-2">
        <div className="text-xs text-slate-400">
          Showing <strong className="text-amber-400 font-mono">{filteredQuests.length}</strong> matching quests
          {selectedRegion !== 'all' && <span> in <strong className="text-slate-200">{selectedRegion}</strong></span>}
          {worldSubcategory !== 'ALL' && <span> • World Area: <strong className="text-emerald-300">{worldSubcategory}</strong></span>}
          {personalSubcategory !== 'ALL' && <span> • Personal: <strong className="text-cyan-300">{personalSubcategory}</strong></span>}
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            XP Ring Status: {isRingActiveAtCurrentLevel ? (
              <strong className="text-emerald-400">+50% Active (Lv {currentLevel})</strong>
            ) : boosters.useExpRing50 ? (
              <strong className="text-slate-400">Capped (Lv 90+)</strong>
            ) : (
              <strong className="text-slate-500">Disabled</strong>
            )}
          </span>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuests.map((quest) => {
          const badge = typeBadges[quest.type] || typeBadges.world;
          const BadgeIcon = badge.icon;
          
          const xpCalc = getSingleQuestXp(quest, currentLevel, boosters);
          const plannedQty = plannedMap.get(quest.id) || 0;

          // Runs needed to hit target level solely with this quest
          const runsToGoal = calculateRunsNeededForQuest(
            currentLevel,
            0,
            targetLevel,
            quest,
            boosters
          );

          // Get custom color styling for annotation badge
          let annotationBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
          if (quest.type === 'main') {
            annotationBadgeClass = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
          } else if (quest.type === 'world') {
            annotationBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
          } else if (quest.type === 'personal') {
            if (quest.annotation === 'Area Trials') {
              annotationBadgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
            } else if (quest.annotation === 'Job') {
              annotationBadgeClass = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
            } else if (quest.annotation === 'Season Events') {
              annotationBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
            } else if (quest.annotation === 'Useful For Adventure') {
              annotationBadgeClass = 'bg-teal-500/20 text-teal-300 border-teal-500/40';
            } else {
              annotationBadgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
            }
          }

          return (
            <div
              key={quest.id}
              className={`bg-slate-900/90 border rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-lg ${
                plannedQty > 0
                  ? 'border-amber-500/60 ring-1 ring-amber-500/20 bg-slate-900'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Card Top: Level, Annotation Badge, Type Badge & Region */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Level Number */}
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                      Lv {quest.minLevel}+
                    </span>

                    {/* Annotation Badge next to level */}
                    {quest.annotation && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${annotationBadgeClass}`}>
                        {quest.type === 'main' ? `Ver. ${quest.annotation}` : quest.annotation}
                      </span>
                    )}

                    {/* Category Type Badge */}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1 ${badge.bg} ${badge.text}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {quest.isRepeatable ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1" title="Repeatable Quest">
                      <RotateCw className="w-2.5 h-2.5" />
                      <span>Repeatable</span>
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      1-Time
                    </span>
                  )}
                </div>

                {/* Title & Japanese Name + Quest Code */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-100 tracking-tight leading-snug">
                      {quest.name}
                    </h3>
                    {quest.questCode && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                        {quest.questCode}
                      </span>
                    )}
                  </div>
                  {quest.jpName && (
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{quest.jpName}</p>
                  )}
                </div>

                {/* Location & Region */}
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">
                    {quest.region} {quest.location ? `• ${quest.location}` : ''}
                  </span>
                </div>

                {/* Target Enemy / Objective */}
                {(quest.targetEnemy || quest.objective) && (
                  <div className="bg-slate-950/60 rounded-lg p-2 text-xs border border-slate-800/60 space-y-1">
                    {quest.targetEnemy && (
                      <div className="text-slate-300 flex items-start gap-1">
                        <Swords className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-200">
                          Target: <span className="text-slate-300">{quest.targetEnemy}</span>
                        </span>
                      </div>
                    )}
                    {quest.objective && (
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {quest.objective}
                      </p>
                    )}
                  </div>
                )}

                {/* Item Rewards & Unlock Notes */}
                {(quest.fixedRewards || quest.selectRewards || quest.notes) && (
                  <div className="bg-slate-950/40 rounded-lg p-2 text-[11px] border border-slate-800/40 space-y-1">
                    {quest.fixedRewards && quest.fixedRewards.length > 0 && (
                      <div className="text-slate-300">
                        <span className="text-slate-500 font-semibold">Rewards: </span>
                        <span className="text-amber-200/90">{quest.fixedRewards.join(', ')}</span>
                      </div>
                    )}
                    {quest.selectRewards && quest.selectRewards.length > 0 && (
                      <div className="text-slate-400">
                        <span className="text-slate-500 font-semibold">Select 1: </span>
                        <span className="text-cyan-300/90">{quest.selectRewards.join(' / ')}</span>
                      </div>
                    )}
                    {quest.notes && (
                      <div className="text-emerald-400 font-medium">
                        ✦ {quest.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Bottom: XP, Gold & Add to Planner Action */}
              <div className="space-y-3 pt-3 mt-3 border-t border-slate-800">
                
                {/* Rewards Grid */}
                <div className="grid grid-cols-2 gap-2">
                  
                  {/* XP Box */}
                  <div className="bg-slate-950 rounded-lg p-2 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>XP Reward</span>
                      {xpCalc.isRingActive && (
                        <span className="text-amber-400 font-bold text-[9px]">+50% Ring</span>
                      )}
                    </div>
                    <div className="font-mono text-sm font-bold text-amber-300">
                      {xpCalc.effectiveXp.toLocaleString()} XP
                    </div>
                    {xpCalc.effectiveXp !== quest.baseXp && (
                      <div className="text-[9px] text-slate-500 font-mono">
                        Base: {quest.baseXp.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Gold, Rift & AP Box */}
                  <div className="bg-slate-950 rounded-lg p-2 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span>Currency</span>
                      </span>
                      {quest.rift ? (
                        <span className="text-cyan-400 font-mono text-[9px]">{quest.rift.toLocaleString()} RC</span>
                      ) : null}
                    </div>
                    <div className="font-mono text-xs font-semibold text-yellow-300">
                      {quest.gold.toLocaleString()} G
                    </div>
                    {quest.bloodOrbs ? (
                      <div className="text-[9px] text-purple-400 font-mono">
                        +{quest.bloodOrbs.toLocaleString()} BO
                      </div>
                    ) : quest.ap ? (
                      <div className="text-[9px] text-emerald-400 font-mono">
                        +{quest.ap} AP
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Runs to hit target level tooltip */}
                {currentLevel < targetLevel && (
                  <div className="text-[11px] text-slate-400 flex items-center justify-between bg-slate-950/40 px-2 py-1 rounded border border-slate-800/40">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-amber-400" />
                      <span>To hit Lv {targetLevel}:</span>
                    </span>
                    <span className="font-mono font-bold text-slate-200">
                      ~{runsToGoal.runsNeeded.toLocaleString()} runs
                    </span>
                  </div>
                )}

                {/* Add to Planner Controls */}
                <div className="flex items-center gap-2">
                  {plannedQty > 0 ? (
                    <div className="flex items-center justify-between w-full bg-amber-500/10 border border-amber-500/40 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(quest.id, plannedQty - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded text-slate-200 font-bold text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 px-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{plannedQty} in Plan</span>
                      </div>
                      <button
                        onClick={() => onUpdateQuantity(quest.id, plannedQty + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded text-slate-200 font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddQuest(quest.id, 1)}
                      className="w-full py-2 rounded-lg bg-slate-800 hover:bg-amber-500/20 hover:border-amber-500/50 border border-slate-700 text-slate-200 hover:text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Leveling Plan</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
