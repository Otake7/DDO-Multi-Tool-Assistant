import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Sparkles,
  ThumbsUp,
  MapPin,
  Swords,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  User,
  CheckCircle2,
  Filter,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';
import { CommunityFarmSpot, Region, UserProfile, VocationId } from '../types';
import { SEED_COMMUNITY_FARM_SPOTS } from '../data/communityFarmSpots';
import { REGIONS } from '../data/quests';

interface CommunityFarmSpotsBrowserProps {
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  onAddSpotToPlan: (spot: CommunityFarmSpot) => void;
}

const VOCATION_OPTIONS: { id: string; label: string }[] = [
  { id: 'Fighter', label: 'Fighter' },
  { id: 'Hunter', label: 'Hunter' },
  { id: 'Priest', label: 'Priest' },
  { id: 'Shield Sage', label: 'Shield Sage' },
  { id: 'Seeker', label: 'Seeker' },
  { id: 'Sorcerer', label: 'Sorcerer' },
  { id: 'Element Archer', label: 'Element Archer' },
  { id: 'Warrior', label: 'Warrior' },
  { id: 'Alchemist', label: 'Alchemist' },
  { id: 'Spirit Lancer', label: 'Spirit Lancer' },
  { id: 'High Scepter', label: 'High Scepter' }
];

export const CommunityFarmSpotsBrowser: React.FC<CommunityFarmSpotsBrowserProps> = ({
  currentUser,
  onOpenAuth,
  onAddSpotToPlan
}) => {
  // Load community spots from local storage + default seeds
  const [spots, setSpots] = useState<CommunityFarmSpot[]>(() => {
    const saved = localStorage.getItem('ddon_community_farm_spots_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return SEED_COMMUNITY_FARM_SPOTS;
  });

  const [upvotedSpots, setUpvotedSpots] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('ddon_upvoted_spots_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServer, setSelectedServer] = useState<string>('All');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showAuthGateModal, setShowAuthGateModal] = useState(false);
  const [expandedSpotId, setExpandedSpotId] = useState<string | null>(null);

  // Upload Form State
  const [newSpotName, setNewSpotName] = useState('');
  const [newSpotRegion, setNewSpotRegion] = useState<Region>('Volden Mines');
  const [newSpotServer, setNewSpotServer] = useState<string>(currentUser?.servers?.[0] || 'Rising');
  const [newSpotMinLevel, setNewSpotMinLevel] = useState(20);
  const [newSpotMaxLevel, setNewSpotMaxLevel] = useState(45);
  const [newSpotXp, setNewSpotXp] = useState(25000);
  const [newSpotGold, setNewSpotGold] = useState(6500);
  const [newSpotRunsToLevel, setNewSpotRunsToLevel] = useState(4);
  const [newSpotEnemies, setNewSpotEnemies] = useState('');
  const [newSpotDesc, setNewSpotDesc] = useState('');
  const [newSpotVocations, setNewSpotVocations] = useState<string[]>(['Sorcerer', 'High Scepter']);
  const [newSpotQuests, setNewSpotQuests] = useState<{ name: string; xp: number; quantity: number }[]>([
    { name: 'Core Subjugation Sweep', xp: 18000, quantity: 3 }
  ]);

  // Sync spots to localStorage
  useEffect(() => {
    localStorage.setItem('ddon_community_farm_spots_v2', JSON.stringify(spots));
  }, [spots]);

  useEffect(() => {
    localStorage.setItem('ddon_upvoted_spots_v2', JSON.stringify(upvotedSpots));
  }, [upvotedSpots]);

  const isGuest = !currentUser || currentUser.isGuest;

  const handleOpenUpload = () => {
    if (isGuest) {
      setShowAuthGateModal(true);
    } else {
      setNewSpotServer(currentUser.servers?.[0] || 'Rising');
      setIsUploadModalOpen(true);
    }
  };

  const handleUpvote = (spotId: string) => {
    const isUpvoted = !!upvotedSpots[spotId];
    setUpvotedSpots((prev) => ({ ...prev, [spotId]: !isUpvoted }));

    setSpots((prev) =>
      prev.map((s) => {
        if (s.id === spotId) {
          return {
            ...s,
            upvotes: isUpvoted ? Math.max(0, s.upvotes - 1) : s.upvotes + 1
          };
        }
        return s;
      })
    );
  };

  const handleToggleVocation = (voc: string) => {
    setNewSpotVocations((prev) =>
      prev.includes(voc) ? prev.filter((v) => v !== voc) : [...prev, voc]
    );
  };

  const handleCreateSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpotName.trim()) return;

    const authorName = currentUser?.characterName || currentUser?.username || 'Arisen';
    const authorClan = currentUser?.clanTag || undefined;

    const newSpot: CommunityFarmSpot = {
      id: `spot_${Date.now()}`,
      name: newSpotName.trim(),
      region: newSpotRegion,
      levelRange: `Lv ${newSpotMinLevel}–${newSpotMaxLevel}`,
      minLevel: newSpotMinLevel,
      maxLevel: newSpotMaxLevel,
      xpPerRun: newSpotXp,
      goldPerRun: newSpotGold,
      runsToLevel: newSpotRunsToLevel,
      targetEnemies: newSpotEnemies.trim() || 'Bosses and Elite Mobs',
      description: newSpotDesc.trim() || 'Player submitted leveling route and mob farm.',
      recommendedVocations: newSpotVocations.length > 0 ? newSpotVocations : undefined,
      server: newSpotServer,
      authorName,
      authorClan,
      verified: false,
      upvotes: 1,
      createdAt: Date.now(),
      quests: newSpotQuests.map((q, idx) => ({
        questId: `custom_q_${Date.now()}_${idx}`,
        name: q.name || 'Custom Farm Step',
        xp: q.xp || Math.round(newSpotXp / (newSpotQuests.length || 1)),
        gold: Math.round(newSpotGold / (newSpotQuests.length || 1)),
        recommendedQuantity: q.quantity || 1
      }))
    };

    setSpots((prev) => [newSpot, ...prev]);
    setIsUploadModalOpen(false);
    // Reset fields
    setNewSpotName('');
    setNewSpotEnemies('');
    setNewSpotDesc('');
  };

  // Filtered spots
  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      // Server match
      if (selectedServer !== 'All' && spot.server !== selectedServer) {
        return false;
      }

      // Level match
      if (selectedLevelFilter === '1-30' && (spot.maxLevel < 1 || spot.minLevel > 30)) return false;
      if (selectedLevelFilter === '31-60' && (spot.maxLevel < 31 || spot.minLevel > 60)) return false;
      if (selectedLevelFilter === '61-80' && (spot.maxLevel < 61 || spot.minLevel > 80)) return false;
      if (selectedLevelFilter === '81-95' && (spot.maxLevel < 81 || spot.minLevel > 95)) return false;
      if (selectedLevelFilter === '96+' && spot.maxLevel < 96) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = spot.name.toLowerCase().includes(q);
        const matchesRegion = spot.region.toLowerCase().includes(q);
        const matchesEnemies = spot.targetEnemies.toLowerCase().includes(q);
        const matchesAuthor = spot.authorName.toLowerCase().includes(q);
        const matchesDesc = spot.description.toLowerCase().includes(q);
        const matchesVoc = spot.recommendedVocations?.some((v) => v.toLowerCase().includes(q));

        if (!matchesName && !matchesRegion && !matchesEnemies && !matchesAuthor && !matchesDesc && !matchesVoc) {
          return false;
        }
      }

      return true;
    });
  }, [spots, selectedServer, selectedLevelFilter, searchQuery]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      
      {/* Header with Title & Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Community Farm Spots & Player Grind Routes</span>
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/30">
              {spots.length} Routes Available
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
            Browse high-yield leveling routes and mob circuits contributed by players across Dogma Rising, Revival, and Legacy. One-click import routes into your personal leveling planner!
          </p>
        </div>

        <button
          onClick={handleOpenUpload}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Your Farm Spot</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farm spots by monster, region, creator, or vocation..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Server Filter */}
        <div className="md:col-span-3 flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2 flex items-center gap-1">
            <Globe className="w-3 h-3 text-amber-400" />
            <span>Server:</span>
          </span>
          <select
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer py-1"
          >
            <option value="All" className="bg-slate-900">All Servers</option>
            <option value="Rising" className="bg-slate-900">Dogma Rising</option>
            <option value="Revival" className="bg-slate-900">Revival</option>
            <option value="Legacy" className="bg-slate-900">Legacy</option>
            <option value="Others" className="bg-slate-900">Others</option>
          </select>
        </div>

        {/* Level Range Filter */}
        <div className="md:col-span-3 flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            <span>Level:</span>
          </span>
          <select
            value={selectedLevelFilter}
            onChange={(e) => setSelectedLevelFilter(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer py-1"
          >
            <option value="All" className="bg-slate-900">All Levels</option>
            <option value="1-30" className="bg-slate-900">Lv 1–30 (Early Game)</option>
            <option value="31-60" className="bg-slate-900">Lv 31–60 (Mid Game)</option>
            <option value="61-80" className="bg-slate-900">Lv 61–80 (Late Game)</option>
            <option value="81-95" className="bg-slate-900">Lv 81–95 (Endgame)</option>
            <option value="96+" className="bg-slate-900">Lv 96+ (Cap Push)</option>
          </select>
        </div>
      </div>

      {/* Spot Cards Grid */}
      {filteredSpots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSpots.map((spot) => {
            const isUpvoted = !!upvotedSpots[spot.id];
            const isExpanded = expandedSpotId === spot.id;

            return (
              <div
                key={spot.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  {/* Top Bar: Badges and Upvote */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-mono font-bold border border-amber-500/30">
                        {spot.levelRange}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                        {spot.region}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                        {spot.server}
                      </span>
                      {spot.verified && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleUpvote(spot.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isUpvoted
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                          : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                      }`}
                      title="Upvote this spot"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{spot.upvotes}</span>
                    </button>
                  </div>

                  {/* Title */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 leading-snug">
                      {spot.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {spot.description}
                    </p>
                  </div>

                  {/* Target Enemies & Vocations */}
                  <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Swords className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="text-slate-400 font-semibold">Targets:</span>
                      <span className="truncate">{spot.targetEnemies}</span>
                    </div>

                    {spot.recommendedVocations && spot.recommendedVocations.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap pt-1">
                        <span className="text-[10px] text-slate-400 font-semibold">Recommended:</span>
                        {spot.recommendedVocations.map((voc, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          >
                            {voc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Yield & Runs preview */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">XP Yield / Run</div>
                      <div className="text-xs font-mono font-bold text-amber-300 mt-0.5">
                        +{spot.xpPerRun.toLocaleString()} XP
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Gold Yield / Run</div>
                      <div className="text-xs font-mono font-bold text-slate-300 mt-0.5">
                        +{spot.goldPerRun.toLocaleString()} G
                      </div>
                    </div>
                  </div>

                  {/* Quests included breakdown (Accordion) */}
                  {spot.quests && spot.quests.length > 0 && (
                    <div>
                      <button
                        onClick={() => setExpandedSpotId(isExpanded ? null : spot.id)}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide quest breakdown' : `View ${spot.quests.length} included quest steps`}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 space-y-1.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                          {spot.quests.map((q, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300">
                              <span className="truncate">{q.name} ({q.recommendedQuantity}x)</span>
                              <span className="font-mono text-amber-400 shrink-0">+{(q.xp * q.recommendedQuantity).toLocaleString()} XP</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer: Author info & Import Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>Author: <strong className="text-slate-200">{spot.authorName}</strong></span>
                    {spot.authorClan && <span className="text-slate-400 font-medium">{spot.authorClan}</span>}
                  </div>

                  <button
                    onClick={() => onAddSpotToPlan(spot)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Add to Planner</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-8 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">No community farm spots match your criteria</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your server or level filters, or be the first Arisen to publish a grind spot for this bracket!
          </p>
          <button
            onClick={handleOpenUpload}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Your Farm Spot</span>
          </button>
        </div>
      )}

      {/* Upload Farm Spot Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-4 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Upload Custom Farm Spot to Community
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Published by <span className="text-amber-400 font-semibold">{currentUser?.characterName || currentUser?.username}</span>
                    {currentUser?.clanTag && <span className="text-slate-400"> {currentUser?.clanTag}</span>}
                    <span className="text-slate-500 font-mono"> • {currentUser?.servers?.[0] || 'Rising'}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateSpot} className="space-y-4 text-xs">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Farm Spot / Grind Route Name</label>
                <input
                  type="text"
                  required
                  value={newSpotName}
                  onChange={(e) => setNewSpotName(e.target.value)}
                  placeholder="e.g. Volden Mines Double Cyclops Rush"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Region & Server */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Region</label>
                  <select
                    value={newSpotRegion}
                    onChange={(e) => setNewSpotRegion(e.target.value as Region)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Server Target</label>
                  <select
                    value={newSpotServer}
                    onChange={(e) => setNewSpotServer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="Rising">Dogma Rising</option>
                    <option value="Revival">Revival</option>
                    <option value="Legacy">Legacy</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {/* Level Range */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Min Level</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={newSpotMinLevel}
                    onChange={(e) => setNewSpotMinLevel(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Max Level (Recommended Cap)</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={newSpotMaxLevel}
                    onChange={(e) => setNewSpotMaxLevel(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs"
                  />
                </div>
              </div>

              {/* XP and Gold Yield per run */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">XP per Run</label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={newSpotXp}
                    onChange={(e) => setNewSpotXp(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-amber-500/40 rounded-lg px-3 py-2 text-amber-300 font-mono font-bold text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Gold per Run</label>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={newSpotGold}
                    onChange={(e) => setNewSpotGold(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Runs / Level</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={newSpotRunsToLevel}
                    onChange={(e) => setNewSpotRunsToLevel(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Target Enemies */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Target Enemies / Pull Order</label>
                <input
                  type="text"
                  value={newSpotEnemies}
                  onChange={(e) => setNewSpotEnemies(e.target.value)}
                  placeholder="e.g. 2x Armored Cyclops, 12x Mine Goblin Miners"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-xs"
                />
              </div>

              {/* Recommended Vocations Multi-Select */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Recommended Vocations</label>
                <div className="flex flex-wrap gap-1.5">
                  {VOCATION_OPTIONS.map((voc) => {
                    const isSelected = newSpotVocations.includes(voc.id);
                    return (
                      <button
                        key={voc.id}
                        type="button"
                        onClick={() => handleToggleVocation(voc.id)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {voc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description & Route Strategy */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Route Strategy & Tips</label>
                <textarea
                  rows={3}
                  value={newSpotDesc}
                  onChange={(e) => setNewSpotDesc(e.target.value)}
                  placeholder="Explain pull route, camp proximity, crowd control tactics, spell-syncing..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Publish Spot to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Auth Gate Modal */}
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
              Uploading custom farm spots is available to registered Arisen accounts. When you post a spot, your Arisen name and Clan Tag are prominently credited so other players can find and upvote your routes!
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
