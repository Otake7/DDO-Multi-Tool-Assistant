import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Shield, Flame, Sparkles, Filter, CheckCircle2, Circle, AlertCircle,
  BookOpen, HelpCircle, Layers, ChevronRight, Swords, Skull, Award, X,
  RotateCcw, Info, Check, Eye
} from 'lucide-react';
import {
  BBM_BRACELETS_DATA,
  BBM_EARRINGS_DATA,
  BBM_SEALING_GUIDE,
  TIER_DEFINITIONS,
  BBMSealTier,
  BBMBraceletSeal,
  BBMEarringAttribute
} from '../data/bbmSealsData';

export const BBMSealsPage: React.FC = () => {
  // Navigation: Sub-Pages
  const [activeSubPage, setActiveSubPage] = useState<'bracelets' | 'earrings' | 'guide'>('bracelets');

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedPage, setSelectedPage] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Sealed Items Interactive Tracker (Persisted in localStorage)
  const [sealedIds, setSealedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ddon_bbm_sealed_items');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('ddon_bbm_sealed_items', JSON.stringify(sealedIds));
  }, [sealedIds]);

  const toggleSeal = (id: string) => {
    setSealedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleResetSeals = () => {
    if (window.confirm('Reset all marked seals in your tracker?')) {
      setSealedIds({});
    }
  };

  const handleSealAllTierC = () => {
    const next = { ...sealedIds };
    BBM_BRACELETS_DATA.filter((b) => b.tier === 'C').forEach((b) => {
      next[b.id] = true;
    });
    BBM_EARRINGS_DATA.filter((e) => e.tier === 'C').forEach((e) => {
      next[e.id] = true;
    });
    setSealedIds(next);
  };

  // Filtered Bracelets
  const filteredBracelets = useMemo(() => {
    return BBM_BRACELETS_DATA.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.effect.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesExp = item.explanation.toLowerCase().includes(q);
        const matchesVoc = item.vocations?.some((v) => v.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesExp && !matchesVoc) return false;
      }

      // Tier
      if (selectedTier !== 'ALL' && item.tier !== selectedTier) {
        return false;
      }

      // Page
      if (selectedPage !== 'ALL' && item.page.toString() !== selectedPage) {
        return false;
      }

      // Category
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTier, selectedPage, selectedCategory]);

  // Filtered Earrings
  const filteredEarrings = useMemo(() => {
    return BBM_EARRINGS_DATA.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesNotes = item.notes.toLowerCase().includes(q);
        const matchesVoc = item.bestVocations.some((v) => v.toLowerCase().includes(q));
        if (!matchesName && !matchesNotes && !matchesVoc) return false;
      }

      if (selectedTier !== 'ALL' && item.tier !== selectedTier) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTier]);

  const sealedCount = Object.values(sealedIds).filter(Boolean).length;
  const totalItemsCount = BBM_BRACELETS_DATA.length + BBM_EARRINGS_DATA.length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Title Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Bitterblack Maze Compendium</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Normal BBM & Abyss</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight flex items-center gap-3">
              <span>BBM Seals & Jewelry Roll Pool</span>
            </h1>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete drop pool, tier classifications, and sealing strategies for Bitterblack Maze Bracelets and % Damage Earrings.
              Use Red Dragon Marks to seal away low-value attributes and guarantee higher chances of rolling best-in-slot Tier A and Keeper augments.
            </p>
          </div>

          {/* Interactive Sealer Progress Stat */}
          <div className="flex flex-col items-start md:items-end justify-center bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 sm:p-4 shrink-0 min-w-[200px]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Marked as Sealed</span>
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-amber-400">{sealedCount}</span>
              <span className="text-xs text-slate-400 font-mono">/ {totalItemsCount} pool</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (sealedCount / totalItemsCount) * 100)}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2 mt-2 w-full justify-between">
              <button
                onClick={handleSealAllTierC}
                className="text-[10px] text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer hover:underline"
                title="Mark all Tier C effects as sealed in your tracker"
              >
                + Seal Tier C
              </button>
              {sealedCount > 0 && (
                <button
                  onClick={handleResetSeals}
                  className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Pages Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4 mt-5 overflow-x-auto no-scrollbar">
          <button
            id="subpage-tab-bracelets"
            onClick={() => setActiveSubPage('bracelets')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubPage === 'bracelets'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Sub Page: Bracelets (Pages 1–6)</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              activeSubPage === 'bracelets' ? 'bg-slate-950 text-amber-300' : 'bg-slate-900 text-slate-400'
            }`}>
              {BBM_BRACELETS_DATA.length}
            </span>
          </button>

          <button
            id="subpage-tab-earrings"
            onClick={() => setActiveSubPage('earrings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubPage === 'earrings'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Sub Page: Earrings (% Damage Pool)</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              activeSubPage === 'earrings' ? 'bg-slate-950 text-amber-300' : 'bg-slate-900 text-slate-400'
            }`}>
              {BBM_EARRINGS_DATA.length}
            </span>
          </button>

          <button
            id="subpage-tab-guide"
            onClick={() => setActiveSubPage('guide')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubPage === 'guide'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tier Descriptions & Sealing Guide</span>
          </button>
        </div>
      </div>

      {/* Tier Descriptions Legend Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Keeper
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Never Seal</span>
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            Essential Best-in-Slot priorities (e.g. Critical Strike, Knockdown Boost, Dragon Slayer). Keep always.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Tier A
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Keep by Default</span>
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            Keep by default but can be discarded if needed/not played (e.g. Physical Attack +30, Elemental Forces).
          </p>
        </div>

        <div className="bg-slate-900/90 border border-blue-500/30 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
              Tier B
            </span>
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">Seal (Niche Use)</span>
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            Seal by default, but can be kept for niche use cases (e.g. specific boss resistances, Rope Reversal).
          </p>
        </div>

        <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Tier C
            </span>
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">Seal Immediately</span>
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            Seal. Eliminating these low-impact rolls permanently removes them from your drop pool.
          </p>
        </div>
      </div>

      {/* Main Search & Filter Control Bar */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Live Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="bbm-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, stat, category, or note... (e.g. Physical Attack, Fire Force)"
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Stats & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-slate-400 font-mono">
              Showing <strong className="text-amber-300">{activeSubPage === 'bracelets' ? filteredBracelets.length : filteredEarrings.length}</strong> items
            </span>

            {activeSubPage === 'bracelets' && (
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'table' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'cards' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Card View
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tier Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            <span>Tier:</span>
          </span>

          {['ALL', 'Keeper', 'A', 'B', 'C', '?'].map((tier) => (
            <button
              key={tier}
              id={`filter-tier-${tier}`}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedTier === tier
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{tier === 'ALL' ? 'All Tiers' : tier === 'Keeper' ? 'Keeper' : `Tier ${tier}`}</span>
              {tier !== 'ALL' && (
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  selectedTier === tier ? 'bg-slate-950 text-amber-300' : 'bg-slate-900 text-slate-400'
                }`}>
                  {activeSubPage === 'bracelets'
                    ? BBM_BRACELETS_DATA.filter((b) => b.tier === tier).length
                    : BBM_EARRINGS_DATA.filter((e) => e.tier === tier).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Page Filter Tabs for Bracelets */}
        {activeSubPage === 'bracelets' && (
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Page:</span>
            </span>

            {['ALL', '1', '2', '3', '4', '5', '6'].map((pg) => (
              <button
                key={pg}
                id={`filter-page-${pg}`}
                onClick={() => setSelectedPage(pg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPage === pg
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                }`}
              >
                {pg === 'ALL' ? 'All Pages (1–6)' : `Page ${pg}`}
              </button>
            ))}

            <div className="hidden lg:flex items-center gap-2 ml-auto text-xs text-slate-400 italic">
              <span>Page 1: Core Stats • Page 2: Forces & Slayers • Pages 3–6: Augments</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SUB PAGE 1: BRACELETS VIEW */}
      {/* ========================================================================= */}
      {activeSubPage === 'bracelets' && (
        <div className="space-y-4">
          {filteredBracelets.length === 0 ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">No matching bracelet seals found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No effects matched your search or tier filter. Try clearing your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTier('ALL');
                  setSelectedPage('ALL');
                  setSelectedCategory('ALL');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* Table View */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/90 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3 sm:px-4 text-center w-12">Seal</th>
                      <th className="py-3 px-3 sm:px-4">Page</th>
                      <th className="py-3 px-3 sm:px-4">Effect</th>
                      <th className="py-3 px-3 sm:px-4">Tier</th>
                      <th className="py-3 px-3 sm:px-4">Max Value</th>
                      <th className="py-3 px-3 sm:px-4">Tier Description & Recommendation</th>
                      <th className="py-3 px-3 sm:px-4">Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredBracelets.map((item) => {
                      const isSealed = Boolean(sealedIds[item.id]);
                      const tierDef = TIER_DEFINITIONS[item.tier];

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-slate-800/40 transition-colors ${
                            isSealed ? 'bg-rose-950/15' : ''
                          }`}
                        >
                          {/* Interactive Seal Toggle Checkbox */}
                          <td className="py-3 px-3 sm:px-4 text-center">
                            <button
                              onClick={() => toggleSeal(item.id)}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                isSealed
                                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30 ring-1 ring-rose-400'
                                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-amber-400/60'
                              }`}
                              title={isSealed ? 'Marked as Sealed (Click to unmark)' : 'Click to mark as Sealed in-game'}
                            >
                              {isSealed ? <Check className="w-3.5 h-3.5 font-black" /> : <Circle className="w-3.5 h-3.5" />}
                            </button>
                          </td>

                          {/* Page */}
                          <td className="py-3 px-3 sm:px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-300 font-bold whitespace-nowrap">
                              Page {item.page}
                            </span>
                          </td>

                          {/* Effect Name */}
                          <td className="py-3 px-3 sm:px-4 font-bold text-slate-100 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className={isSealed ? 'line-through text-slate-400' : 'text-amber-200'}>
                                {item.effect}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono font-normal">
                                {item.category}
                              </span>
                            </div>
                          </td>

                          {/* Tier */}
                          <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono border ${tierDef.badgeColor}`}>
                              {item.tier}
                            </span>
                          </td>

                          {/* Max Value */}
                          <td className="py-3 px-3 sm:px-4 font-mono font-bold text-slate-200 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300">
                              {item.max}
                            </span>
                          </td>

                          {/* Tier Description & Action */}
                          <td className="py-3 px-3 sm:px-4">
                            <div className="flex flex-col gap-0.5">
                              <span className={`text-xs font-bold ${
                                item.tier === 'Keeper' ? 'text-emerald-400' :
                                item.tier === 'A' ? 'text-amber-300' :
                                item.tier === 'B' ? 'text-blue-300' :
                                item.tier === 'C' ? 'text-rose-400' : 'text-purple-300'
                              }`}>
                                {item.tierDescription}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                Action: <strong className="text-slate-200">{item.recommendedAction}</strong>
                              </span>
                            </div>
                          </td>

                          {/* Explanation */}
                          <td className="py-3 px-3 sm:px-4 text-xs text-slate-300 max-w-xs leading-snug">
                            {item.explanation}
                            {item.vocations && item.vocations.length > 0 && (
                              <div className="mt-1 flex items-center gap-1 flex-wrap">
                                <span className="text-[10px] text-slate-400">Best for:</span>
                                {item.vocations.map((v) => (
                                  <span key={v} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                                    {v}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Cards View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredBracelets.map((item) => {
                const isSealed = Boolean(sealedIds[item.id]);
                const tierDef = TIER_DEFINITIONS[item.tier];

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                      isSealed
                        ? 'bg-slate-900/60 border-rose-500/30'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300 font-bold">
                          Page {item.page} • {item.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono border ${tierDef.badgeColor}`}>
                            Tier {item.tier}
                          </span>
                          <button
                            onClick={() => toggleSeal(item.id)}
                            className={`p-1 rounded-lg border transition-all cursor-pointer ${
                              isSealed
                                ? 'bg-rose-500 text-white border-rose-400'
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-amber-400/60'
                            }`}
                            title={isSealed ? 'Sealed in-game' : 'Mark as sealed'}
                          >
                            {isSealed ? <Check className="w-3 h-3 font-bold" /> : <Circle className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between gap-2 pt-1">
                        <h4 className={`text-base font-bold ${isSealed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                          {item.effect}
                        </h4>
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300 font-mono font-bold text-xs shrink-0">
                          Max: {item.max}
                        </span>
                      </div>

                      <div className="text-[11px] font-medium text-slate-400">
                        {item.tierDescription}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                        {item.explanation}
                      </p>
                    </div>

                    {item.vocations && item.vocations.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center gap-1 flex-wrap">
                        <span className="text-[10px] text-slate-400 font-mono">Vocations:</span>
                        {item.vocations.map((v) => (
                          <span key={v} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB PAGE 2: EARRINGS VIEW (% Damage Multipliers Pool) */}
      {/* ========================================================================= */}
      {activeSubPage === 'earrings' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Swords className="w-4 h-4 text-amber-400" />
                <span>BBM Abyss % Damage Earrings Matrix</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Earrings drop exclusively in Bitterblack Maze Abyss. Unlike bracelets, earrings roll percentage damage boosts
                (Slash, Impact, Piercing, Null, and 5 elements) with max values up to +15% / +20%.
                Always seal pure defense and resistance earrings to guarantee damage rolls on every drop!
              </p>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 shrink-0">
              <span>Target: Dual +15% Rolls</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/90 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3 sm:px-4 text-center w-12">Seal</th>
                    <th className="py-3 px-3 sm:px-4">Earring Focus</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Slash</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Impact</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Piercing</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Null</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Fire</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Ice</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Thunder</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Holy</th>
                    <th className="py-3 px-2 sm:px-3 text-center">Dark</th>
                    <th className="py-3 px-3 sm:px-4">Max Value</th>
                    <th className="py-3 px-3 sm:px-4">Tier</th>
                    <th className="py-3 px-3 sm:px-4">Best Vocations & Tactical Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredEarrings.map((item) => {
                    const isSealed = Boolean(sealedIds[item.id]);
                    const tierDef = TIER_DEFINITIONS[item.tier];

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          isSealed ? 'bg-rose-950/15' : ''
                        }`}
                      >
                        {/* Interactive Seal Toggle */}
                        <td className="py-3 px-3 sm:px-4 text-center">
                          <button
                            onClick={() => toggleSeal(item.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isSealed
                                ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-amber-400/60'
                            }`}
                            title={isSealed ? 'Marked as Sealed' : 'Click to mark as Sealed'}
                          >
                            {isSealed ? <Check className="w-3.5 h-3.5 font-black" /> : <Circle className="w-3.5 h-3.5" />}
                          </button>
                        </td>

                        {/* Name */}
                        <td className="py-3 px-3 sm:px-4 font-bold text-slate-100 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className={isSealed ? 'line-through text-slate-400' : 'text-amber-200 font-bold'}>
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.recommendedAction}
                            </span>
                          </div>
                        </td>

                        {/* Slash */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.slash.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                              {item.slash}
                            </span>
                          ) : item.slash !== '—' ? (
                            <span className="text-slate-300">{item.slash}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Impact */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.impact.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                              {item.impact}
                            </span>
                          ) : item.impact !== '—' ? (
                            <span className="text-slate-300">{item.impact}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Piercing */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.piercing.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                              {item.piercing}
                            </span>
                          ) : item.piercing !== '—' ? (
                            <span className="text-slate-300">{item.piercing}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Null */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.nullType.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                              {item.nullType}
                            </span>
                          ) : item.nullType !== '—' ? (
                            <span className="text-slate-300">{item.nullType}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Fire */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.fire.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/40">
                              {item.fire}
                            </span>
                          ) : item.fire !== '—' ? (
                            <span className="text-slate-300">{item.fire}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Ice */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.ice.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                              {item.ice}
                            </span>
                          ) : item.ice !== '—' ? (
                            <span className="text-slate-300">{item.ice}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Thunder */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.thunder.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-bold border border-yellow-500/40">
                              {item.thunder}
                            </span>
                          ) : item.thunder !== '—' ? (
                            <span className="text-slate-300">{item.thunder}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Holy */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.holy.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 font-bold border border-amber-400/40">
                              {item.holy}
                            </span>
                          ) : item.holy !== '—' ? (
                            <span className="text-slate-300">{item.holy}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Dark */}
                        <td className="py-3 px-2 sm:px-3 text-center font-mono text-xs">
                          {item.dark.includes('★') ? (
                            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
                              {item.dark}
                            </span>
                          ) : item.dark !== '—' ? (
                            <span className="text-slate-300">{item.dark}</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>

                        {/* Max Value */}
                        <td className="py-3 px-3 sm:px-4 font-mono font-bold text-slate-200 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300">
                            {item.maxValue}
                          </span>
                        </td>

                        {/* Tier */}
                        <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono border ${tierDef.badgeColor}`}>
                            {item.tier}
                          </span>
                        </td>

                        {/* Best Vocations & Notes */}
                        <td className="py-3 px-3 sm:px-4 text-xs text-slate-300 max-w-sm leading-snug">
                          <p>{item.notes}</p>
                          {item.bestVocations && item.bestVocations.length > 0 && (
                            <div className="mt-1 flex items-center gap-1 flex-wrap">
                              <span className="text-[10px] text-slate-400">Recommended:</span>
                              {item.bestVocations.map((v) => (
                                <span key={v} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                                  {v}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB PAGE 3: TIER DESCRIPTIONS & DETAILED SEALING GUIDE */}
      {/* ========================================================================= */}
      {activeSubPage === 'guide' && (
        <div className="space-y-6">
          {/* Detailed Tier Definitions Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>BBM Tier Descriptions & Action Guidelines</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                    Keeper (S-Tier)
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Never Seal</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  Essential / Best-in-Slot priorities for all endgame raids.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  These abilities define peak combat performance in Dragon's Dogma Online:
                  <strong> Critical Strike</strong> (+crit rate), <strong>Knockdown Boost</strong> (breaks boss Enrage states quickly),
                  <strong> Fighting Spirit</strong> (+physical attack above 50% stamina), <strong>Composure</strong> (+magick attack above 50% stamina),
                  <strong> Heavy Step</strong> (negates dragon wind pressure), <strong>Dragon Slayer</strong> (+90 dragonkin damage),
                  and <strong>Quick Cast</strong> (shortens chanting for Sorcerers and Priests).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/50">
                    Tier A
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">Keep by Default</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  Keep by default but can be discarded if needed/not played.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Includes flat stats like <strong>Physical Attack (+30)</strong> and <strong>Magick Attack (+30)</strong>,
                  elemental forces (<strong>Fire Force, Light Force, Ice Force, Thunder Force</strong>), monster slayers (<strong>Skeleton, Cursed, Undead, Colossus</strong>),
                  and foundational combat augments (<strong>Resilience, Enduring Grip, Great Enchantment, Fortunes of War</strong>).
                  If you do not play a specific vocation (e.g. you never play casters), Magick Attack can be discarded or sealed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-blue-500/20 text-blue-300 border border-blue-500/50">
                    Tier B
                  </span>
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase">Seal (Niche Use)</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  Seal by default, but can be kept for niche use cases.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-utility or vocation-specific mechanics that are not required for universal DPS. Examples include
                  <strong> Rope Reversal</strong> (Seeker aerial recovery), <strong>Skilled Reload</strong> (Hunter arrow cycling),
                  <strong> Agile Motion</strong>, and situational resistances like <strong>Petrifaction, Curse, or Torpor</strong> resist.
                  Keep only if you actively play that niche build or lack cleansing curatives.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/50">
                    Tier C
                  </span>
                  <span className="text-xs font-mono text-rose-400 font-bold uppercase">Seal Immediately</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  Seal. Eliminate immediately to clean up the drop pool.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  These items dilute your drop pool with low effective combat value:
                  <strong> Physical Defence (+60)</strong>, <strong>Magick Defence (+60)</strong>, <strong>Healing Power (+50)</strong>,
                  <strong> Poison Resist</strong>, <strong>Blind Resist</strong>, <strong>Counter</strong>, <strong>Perky</strong>,
                  <strong> Heal Thyself</strong>, and <strong>Provocation</strong>.
                  Sealing all Tier C items guarantees that future drops roll higher-tier stats.
                </p>
              </div>
            </div>
          </div>

          {/* Sealing Mechanics Compendium */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" />
              <span>{BBM_SEALING_GUIDE.title}</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {BBM_SEALING_GUIDE.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {BBM_SEALING_GUIDE.keyRules.map((rule) => (
                <div key={rule.title} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{rule.title}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
