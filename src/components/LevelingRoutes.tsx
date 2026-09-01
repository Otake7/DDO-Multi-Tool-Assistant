import React, { useState, useEffect } from 'react';
import { 
  Compass, Sparkles, Swords, Shield, Zap, BookOpen, Target, 
  Plus, CheckCircle2, ThumbsUp, ThumbsDown, MessageSquare, 
  Trash2, User, Share2, Search, ArrowUpDown, Filter, AlertCircle, X
} from 'lucide-react';
import { LevelPresetRoute, UserProfile, PlannedQuest } from '../types';
import { LEVELING_PRESETS } from '../data/levelingPresets';
import { ALL_QUESTS, REGIONS } from '../data/quests';
import { 
  fetchRemoteRoutes, 
  saveRemoteRoute, 
  deleteRemoteRoute 
} from '../utils/communityRoutesAndFeedbackApi';
import { 
  getItemEngagementStats, 
  getUserVotesMap, 
  voteItem 
} from '../utils/communityStats';
import { CommunityCommentsSection } from './CommunityCommentsSection';

interface LevelingRoutesProps {
  onLoadPreset: (presetId: string) => void;
  onGoToPlanner: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  activePlannedQuests?: PlannedQuest[];
}

export const LevelingRoutes: React.FC<LevelingRoutesProps> = ({
  onLoadPreset,
  onGoToPlanner,
  currentUser,
  onOpenAuth,
  activePlannedQuests = []
}) => {
  const [routes, setRoutes] = useState<LevelPresetRoute[]>(() => {
    const saved = localStorage.getItem('ddon_custom_leveling_routes_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...LEVELING_PRESETS, ...parsed];
      } catch (e) {
        return LEVELING_PRESETS;
      }
    }
    return LEVELING_PRESETS;
  });

  const [activeCommentRoute, setActiveCommentRoute] = useState<LevelPresetRoute | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'level' | 'newest'>('rating');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [refreshStatsKey, setRefreshStatsKey] = useState(0);

  // Form State for creating a route
  const [routeName, setRouteName] = useState('');
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(20);
  const [routeRegion, setRouteRegion] = useState(REGIONS[0] || 'Hidell Plains');
  const [routeDescription, setRouteDescription] = useState('');
  const [selectedQuests, setSelectedQuests] = useState<{ questId: string; quantity: number }[]>([]);
  const [questSearch, setQuestSearch] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch community routes from backend on mount & poll every 5s for live updates
  const syncRemoteRoutes = async () => {
    try {
      const remote = await fetchRemoteRoutes();
      if (Array.isArray(remote)) {
        setRoutes([...LEVELING_PRESETS, ...remote]);
        localStorage.setItem('ddon_custom_leveling_routes_v2', JSON.stringify(remote));
      }
    } catch (err) {
      console.warn('Error syncing routes:', err);
    }
  };

  useEffect(() => {
    syncRemoteRoutes();
    const interval = setInterval(syncRemoteRoutes, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (routeId: string, direction: 'up' | 'down') => {
    voteItem(routeId, direction);
    setRefreshStatsKey(prev => prev + 1);
  };

  const handleImportFromPlanner = () => {
    if (!activePlannedQuests || activePlannedQuests.length === 0) {
      showToast('Your Quest Planner is currently empty. Add some quests first or select below.');
      return;
    }
    const imported = activePlannedQuests.map(pq => ({
      questId: pq.quest.id,
      quantity: pq.quantity
    }));
    setSelectedQuests(imported);
    showToast(`Imported ${imported.length} quest(s) from your active planner!`);
  };

  const handleAddQuestToRoute = (questId: string) => {
    if (selectedQuests.some(q => q.questId === questId)) {
      setSelectedQuests(prev => prev.map(q => q.questId === questId ? { ...q, quantity: q.quantity + 1 } : q));
    } else {
      setSelectedQuests(prev => [...prev, { questId, quantity: 1 }]);
    }
  };

  const handleRemoveQuestFromRoute = (questId: string) => {
    setSelectedQuests(prev => prev.filter(q => q.questId !== questId));
  };

  const handleUpdateQuestQty = (questId: string, delta: number) => {
    setSelectedQuests(prev => prev.map(q => {
      if (q.questId === questId) {
        const next = Math.max(1, q.quantity + delta);
        return { ...q, quantity: next };
      }
      return q;
    }));
  };

  const handleCreateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeName.trim()) {
      showToast('Please enter a route name.');
      return;
    }
    if (selectedQuests.length === 0) {
      showToast('Please add at least 1 quest to your leveling route.');
      return;
    }

    const newId = `custom-route-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newRoute: LevelPresetRoute & { author?: string } = {
      id: newId,
      name: routeName.trim(),
      levelRange: `Lv ${minLevel} - ${maxLevel}`,
      description: routeDescription.trim() || 'Custom community power-leveling route.',
      region: routeRegion,
      quests: selectedQuests,
      author: currentUser && !currentUser.isGuest ? (currentUser.characterName || currentUser.username) : 'Community Arisen'
    };

    // Save locally
    const customOnly = routes.filter(r => !LEVELING_PRESETS.some(lp => lp.id === r.id));
    const updatedCustom = [newRoute, ...customOnly];
    localStorage.setItem('ddon_custom_leveling_routes_v2', JSON.stringify(updatedCustom));
    setRoutes(prev => [newRoute, ...prev]);

    // Save remotely
    await saveRemoteRoute(newRoute);

    // Reset Form
    setRouteName('');
    setRouteDescription('');
    setSelectedQuests([]);
    setIsCreateModalOpen(false);
    showToast(`Leveling Route "${newRoute.name}" created and shared successfully!`);
  };

  const handleDeleteRoute = async (routeId: string) => {
    const isPreset = LEVELING_PRESETS.some(lp => lp.id === routeId);
    if (isPreset) return;

    if (!confirm('Are you sure you want to delete this custom route?')) return;

    setRoutes(prev => prev.filter(r => r.id !== routeId));
    const customOnly = routes.filter(r => !LEVELING_PRESETS.some(lp => lp.id === r.id) && r.id !== routeId);
    localStorage.setItem('ddon_custom_leveling_routes_v2', JSON.stringify(customOnly));
    await deleteRemoteRoute(routeId);
    showToast('Route deleted.');
  };

  // Filter and Sort routes
  const filteredRoutes = routes.filter(r => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.region.toLowerCase().includes(q) ||
      r.levelRange.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    const statsA = getItemEngagementStats(a.id);
    const statsB = getItemEngagementStats(b.id);
    if (sortBy === 'rating') {
      return statsB.score - statsA.score;
    }
    if (sortBy === 'level') {
      const getLv = (s: string) => {
        const m = s.match(/\d+/);
        return m ? parseInt(m[0], 10) : 0;
      };
      return getLv(a.levelRange) - getLv(b.levelRange);
    }
    return 0;
  });

  const questMap = new Map(ALL_QUESTS.map(q => [q.id, q]));
  const userVotes = getUserVotesMap();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-300 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-slate-950" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[11px] font-semibold border border-amber-500/30 mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Leveling Routes & Strategy Guides</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                Community Leveling Routes & Guides
              </h2>
              <p className="text-xs text-slate-400">
                Browse verified fast speedrun paths, create & share your own custom grinding routes, upvote and comment with fellow Arisens.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Share Leveling Route</span>
          </button>
        </div>

        {/* 3 Core Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>1. Equip 50% XP Ring</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Equip the 50% Level Up Speed Booster Ring from Level 1 to 89. Multiplies all Notice Board and World Quest turn-in XP.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>2. Notice Board Loops</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Stack notice board tasks (e.g. Tel Goblins, Misriu Dread Apes, Volden Miners, Megado Enforcers) for rapid repeatable XP turn-ins.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>3. Fast Pawn Composition</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bring high-tier Sorcerer, Alchemist or High Scepter pawns with Element Archer support (max 20 level difference on Rising server).
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leveling routes or regions..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-amber-500/60"
          >
            <option value="rating">Top Rated (Community Votes)</option>
            <option value="level">Level Requirement (Ascending)</option>
            <option value="newest">All Routes</option>
          </select>
        </div>
      </div>

      {/* Routes Grid / List */}
      <div className="space-y-4">
        {filteredRoutes.map((route, idx) => {
          const stats = getItemEngagementStats(route.id);
          const userVote = userVotes[route.id];
          const isPreset = LEVELING_PRESETS.some(lp => lp.id === route.id);

          // Calculate total XP of the route
          let totalRouteXp = 0;
          route.quests.forEach(rq => {
            const q = questMap.get(rq.questId);
            if (q) totalRouteXp += (q.baseXp || 0) * (rq.quantity || 1);
          });

          return (
            <div
              key={route.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-amber-500/40 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* Route Header Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-100">{route.name}</h3>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {route.levelRange}
                    </span>
                    {isPreset ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                        Official Guide
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        Community Route
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {route.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
                    <span>Region: <strong className="text-slate-200">{route.region}</strong></span>
                    <span>Total Base XP: <strong className="text-amber-300 font-mono">+{totalRouteXp.toLocaleString()} XP</strong></span>
                    <span>Quests Included: <strong className="text-slate-200">{route.quests.length}</strong></span>
                  </div>
                </div>

                {/* Right Side: Upvote/Downvote & Action Buttons */}
                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  {/* Upvote & Downvote Control */}
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 shadow-inner">
                    <button
                      onClick={() => handleVote(route.id, 'up')}
                      className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${
                        userVote === 'up'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                      }`}
                      title="Upvote this leveling route"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-mono">{stats.upvotes || 0}</span>
                    </button>

                    <button
                      onClick={() => handleVote(route.id, 'down')}
                      className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${
                        userVote === 'down'
                          ? 'bg-rose-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800'
                      }`}
                      title="Downvote this route"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span className="font-mono">{stats.downvotes || 0}</span>
                    </button>
                  </div>

                  {/* Comments Button */}
                  <button
                    onClick={() => setActiveCommentRoute(activeCommentRoute?.id === route.id ? null : route)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Discuss</span>
                    {stats.commentsCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold font-mono">
                        {stats.commentsCount}
                      </span>
                    )}
                  </button>

                  {/* Load into Planner */}
                  <button
                    onClick={() => {
                      onLoadPreset(route.id);
                      onGoToPlanner();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Load Route</span>
                  </button>

                  {!isPreset && (
                    <button
                      onClick={() => handleDeleteRoute(route.id)}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 transition-colors cursor-pointer"
                      title="Delete your custom route"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quest Breakdown Pills */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Quests & Repeats in this Loop
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {route.quests.map((rq, qIdx) => {
                    const quest = questMap.get(rq.questId);
                    return (
                      <div
                        key={qIdx}
                        className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 flex items-center justify-between text-xs"
                      >
                        <div className="truncate mr-2">
                          <span className="font-semibold text-slate-200">
                            {quest?.name || rq.questId}
                          </span>
                          <div className="text-[10px] text-slate-400">
                            {quest ? `+${(quest.baseXp * rq.quantity).toLocaleString()} XP` : ''}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono font-bold text-[11px] shrink-0">
                          {rq.quantity}x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inline Comments Section when toggled */}
              {activeCommentRoute?.id === route.id && (
                <div className="pt-2 border-t border-slate-800">
                  <CommunityCommentsSection
                    itemId={route.id}
                    itemTitle={route.name}
                    itemType="preset"
                    currentUser={currentUser}
                    onOpenAuth={onOpenAuth}
                    isOpen={true}
                    onClose={() => setActiveCommentRoute(null)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Create & Share Custom Leveling Route */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-slate-100">
                  Create New Leveling Route
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="space-y-4">
              
              {/* Route Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Route Name *
                </label>
                <input
                  type="text"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  placeholder="e.g. Volden Goblin & Ore Rush (Lv 25-40)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                  required
                />
              </div>

              {/* Level Range & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Min Level
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={minLevel}
                    onChange={(e) => setMinLevel(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Max Level
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={maxLevel}
                    onChange={(e) => setMaxLevel(parseInt(e.target.value, 10) || 100)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Primary Region
                  </label>
                  <select
                    value={routeRegion}
                    onChange={(e) => setRouteRegion(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/60"
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description & Strategy Tips */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Strategy Description & Tips
                </label>
                <textarea
                  value={routeDescription}
                  onChange={(e) => setRouteDescription(e.target.value)}
                  placeholder="Explain optimal turn-in orders, recommended pawns, element weaknesses, or notice board refresh tips..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 resize-none"
                />
              </div>

              {/* Selected Quests Builder */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Included Quests ({selectedQuests.length})
                  </label>

                  <button
                    type="button"
                    onClick={handleImportFromPlanner}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                  >
                    Import Active Planner Quests
                  </button>
                </div>

                {selectedQuests.length === 0 ? (
                  <div className="p-4 bg-slate-950/60 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-500">
                    No quests added yet. Pick from the database below or click "Import Active Planner Quests".
                  </div>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {selectedQuests.map((sq) => {
                      const quest = questMap.get(sq.questId);
                      return (
                        <div
                          key={sq.questId}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-xs"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-slate-200">
                              {quest?.name || sq.questId}
                            </span>
                            <div className="text-[10px] text-slate-500">
                              {quest?.region} • Lv {quest?.minLevel}+
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuestQty(sq.questId, -1)}
                                className="text-slate-400 hover:text-white px-1 font-bold"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-amber-300 text-xs px-1">
                                {sq.quantity}x
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuestQty(sq.questId, 1)}
                                className="text-slate-400 hover:text-white px-1 font-bold"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveQuestFromRoute(sq.questId)}
                              className="p-1 text-rose-400 hover:text-rose-300 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add Quests Search Box */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Add Quests from Database
                </label>
                <input
                  type="text"
                  value={questSearch}
                  onChange={(e) => setQuestSearch(e.target.value)}
                  placeholder="Search quests by name or region to add..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                />

                {questSearch.trim().length > 1 && (
                  <div className="max-h-36 overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-1 space-y-1">
                    {ALL_QUESTS.filter(q => 
                      q.name.toLowerCase().includes(questSearch.toLowerCase()) ||
                      q.region.toLowerCase().includes(questSearch.toLowerCase())
                    ).slice(0, 10).map((q) => (
                      <div
                        key={q.id}
                        onClick={() => handleAddQuestToRoute(q.id)}
                        className="p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between text-xs cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-slate-200">{q.name}</span>
                          <span className="text-[10px] text-slate-500 ml-2">{q.region}</span>
                        </div>
                        <span className="text-amber-400 text-xs font-bold">+ Add</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Save & Publish Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
