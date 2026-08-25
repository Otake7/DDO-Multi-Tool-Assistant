import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Shield,
  Flame,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Skull,
  Crosshair,
  AlertTriangle,
  Layers,
  Sword,
  Target,
  Info,
  Compass,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { BESTIARY_SPECIES, SPECIFIC_ENEMIES, BestiarySpecies, SpecificEnemyDetail } from '../data/bestiaryData';

interface BestiaryProps {
  onNavigateToTab?: (tab: string) => void;
}

export const Bestiary: React.FC<BestiaryProps> = ({ onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCoreFilter, setSelectedCoreFilter] = useState<string>('All');
  const [expandedSpeciesId, setExpandedSpeciesId] = useState<string | null>(null);
  const [selectedEnemy, setSelectedEnemy] = useState<SpecificEnemyDetail | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'species' | 'enemies'>('species');

  const categories = useMemo(() => {
    const cats = ['All', ...BESTIARY_SPECIES.map((s) => s.category)];
    return Array.from(new Set(cats));
  }, []);

  const coreTypes = ['All', 'Elemental Core', 'Chance Core', 'Spore Spikes', 'Armor Peeling', 'None'];

  // Filtered Species
  const filteredSpecies = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return BESTIARY_SPECIES.filter((species) => {
      const matchesCategory = selectedCategory === 'All' || species.category === selectedCategory;
      const matchesCore = selectedCoreFilter === 'All' || species.coreType === selectedCoreFilter;

      if (!q) return matchesCategory && matchesCore;

      const matchesName = species.name.toLowerCase().includes(q);
      const matchesExplanation = species.explanation.toLowerCase().includes(q);
      const matchesStrategy = species.strategy.toLowerCase().includes(q);
      const matchesEnemies = species.includedEnemies.some((e) => e.toLowerCase().includes(q));
      const matchesWeakness = species.weaknesses?.some((w) => w.toLowerCase().includes(q));
      const matchesSeason = species.season?.toLowerCase().includes(q);

      return matchesCategory && matchesCore && (matchesName || matchesExplanation || matchesStrategy || matchesEnemies || matchesWeakness || matchesSeason);
    });
  }, [searchQuery, selectedCategory, selectedCoreFilter]);

  // Filtered Specific Enemies
  const filteredEnemies = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SPECIFIC_ENEMIES.filter((enemy) => {
      const matchesCategory = selectedCategory === 'All' || enemy.speciesName === selectedCategory;
      if (!q) return matchesCategory;

      const matchesName = enemy.name.toLowerCase().includes(q);
      const matchesSpecies = enemy.speciesName.toLowerCase().includes(q);
      const matchesStrategy = enemy.strategyTip.toLowerCase().includes(q);
      const matchesWeakness = enemy.elementalWeakness.toLowerCase().includes(q);
      const matchesLocations = enemy.locations.some((l) => l.toLowerCase().includes(q));

      return matchesCategory && (matchesName || matchesSpecies || matchesStrategy || matchesWeakness || matchesLocations);
    });
  }, [searchQuery, selectedCategory]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCoreBadgeStyle = (coreType?: string) => {
    switch (coreType) {
      case 'Elemental Core':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Chance Core':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Spore Spikes':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Armor Peeling':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getDangerBadgeStyle = (danger?: string) => {
    switch (danger) {
      case 'Extreme':
        return 'bg-red-950/80 text-red-400 border-red-800';
      case 'High':
        return 'bg-orange-950/80 text-orange-400 border-orange-800';
      case 'Medium':
        return 'bg-amber-950/80 text-amber-400 border-amber-800';
      default:
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div id="table-of-contents" className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center text-slate-950 font-bold text-2xl">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-100 uppercase tracking-wider">
                  DDON Bestiary & Species Compendium
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {BESTIARY_SPECIES.length} Species Categories
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Comprehensive classification of all Dragon&apos;s Dogma Online monster species, handling tactics, core mechanics & handling strategies.
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveViewMode('species')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeViewMode === 'species'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Species Categories ({BESTIARY_SPECIES.length})</span>
            </button>
            <button
              onClick={() => setActiveViewMode('enemies')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeViewMode === 'enemies'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Skull className="w-3.5 h-3.5" />
              <span>Named Boss & Mob Roster ({SPECIFIC_ENEMIES.length})</span>
            </button>
          </div>
        </div>

        {/* Quick Table of Contents Jump Anchors */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Table of Contents • Quick Jump</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {BESTIARY_SPECIES.map((species) => (
              <a
                key={species.id}
                href={`#species-${species.id}`}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-[11px] font-semibold transition-all flex items-center gap-1"
              >
                <span>{species.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by enemy name, species (e.g. Saurian, Chimera, Zuhl, Golgorran, War-Ready, Dark weakness)..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category & Core Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 text-xs">
          {/* Category Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-slate-500 font-mono text-[11px] uppercase mr-1 shrink-0">Filter:</span>
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Core Mechanics Filter */}
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <span className="text-slate-500 font-mono text-[11px] uppercase">Core:</span>
            <select
              value={selectedCoreFilter}
              onChange={(e) => setSelectedCoreFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-amber-400"
            >
              {coreTypes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mode 1: Species Categories View */}
      {activeViewMode === 'species' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>Showing {filteredSpecies.length} species categories</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Table of Contents</span>
            </button>
          </div>

          {filteredSpecies.map((species) => {
            const isExpanded = expandedSpeciesId === species.id;
            return (
              <article
                key={species.id}
                id={`species-${species.id}`}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl transition-all relative overflow-hidden group"
              >
                {/* Species Top Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-lg">
                      {species.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg sm:text-xl font-black text-slate-100 tracking-wide">
                          {species.name}
                        </h2>
                        {species.season && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {species.season}
                          </span>
                        )}
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCoreBadgeStyle(species.coreType)}`}>
                          {species.coreType || 'Standard'}
                        </span>
                        {species.dangerLevel && (
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getDangerBadgeStyle(species.dangerLevel)}`}>
                            {species.dangerLevel} Threat
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        Classification: {species.category}
                      </span>
                    </div>
                  </div>

                  {/* Back to top jump link */}
                  <a
                    href="#table-of-contents"
                    className="self-start sm:self-auto text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 font-medium bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 hover:border-amber-500/30 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>Back to Top</span>
                  </a>
                </div>

                {/* 2-Column Responsive Layout: Explanation & Strategy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                  {/* Left Column: Included Enemies and Explanation */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>Included Enemies & Explanation</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {species.explanation}
                      </p>
                    </div>

                    {/* Included Monster Chips */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">
                        Notable Enemies in Category:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {species.includedEnemies.map((enemyName) => (
                          <button
                            key={enemyName}
                            onClick={() => {
                              setSearchQuery(enemyName);
                              setActiveViewMode('enemies');
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 transition-colors cursor-pointer"
                            title={`Search ${enemyName} details in named mob roster`}
                          >
                            {enemyName}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Handling and Strategy */}
                  <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2.5">
                        <Sword className="w-3.5 h-3.5" />
                        <span>Handling and Strategy</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {species.strategy}
                      </p>
                    </div>

                    {/* Weaknesses & Key Combat Tags */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {species.weaknesses && species.weaknesses.length > 0 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                            Weaknesses / Breakpoints:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {species.weaknesses.map((w, idx) => (
                              <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {species.keyDebilitations && species.keyDebilitations.length > 0 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                            Recommended Debilitations:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {species.keyDebilitations.map((d, idx) => (
                              <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lore & Combat Mechanix Footer */}
                {species.loreNote && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-200 font-semibold">Pro Arisen Tip:</strong> {species.loreNote}</span>
                  </div>
                )}
              </article>
            );
          })}

          {filteredSpecies.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Skull className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">No species found matching &ldquo;{searchQuery}&rdquo;</h3>
              <p className="text-xs text-slate-400">Try searching for generic terms like &ldquo;Goblin&rdquo;, &ldquo;Chimera&rdquo;, &ldquo;Dragon&rdquo;, &ldquo;Infected&rdquo;, or &ldquo;Holy&rdquo;.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedCoreFilter('All');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Named Boss & Enemy Lookup View */}
      {activeViewMode === 'enemies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
            <span>Showing {filteredEnemies.length} specific monster entries</span>
            <button
              onClick={() => setActiveViewMode('species')}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs cursor-pointer"
            >
              <span>Switch to Species Overview</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEnemies.map((enemy, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{enemy.name}</span>
                      </h3>
                      <span className="text-[11px] font-mono text-amber-400">
                        {enemy.speciesName} • {enemy.size}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {enemy.size}
                    </span>
                  </div>

                  {/* Core & Weakness Specs */}
                  <div className="space-y-2 text-xs mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Elemental Weakness:</span>
                      <span className="text-emerald-300 font-semibold">{enemy.elementalWeakness}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Core Location:</span>
                      <span className="text-amber-300 font-semibold">{enemy.coreInfo}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {enemy.strategyTip}
                  </p>
                </div>

                {/* Locations */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    Spawn / Encounter Zones:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {enemy.locations.map((loc, lIdx) => (
                      <span key={lIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={scrollToTop}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to Table of Contents</span>
        </button>
      </div>
    </div>
  );
};
