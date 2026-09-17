import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Clock, 
  Shield, 
  Sparkles, 
  AlertTriangle, 
  Flame, 
  Skull, 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  Package, 
  ChevronRight, 
  BookOpen, 
  Info, 
  UserCheck, 
  Layers,
  Zap,
  Users,
  Compass,
  Video,
  MessageSquare,
  Send,
  Award,
  Crown,
  Heart
} from 'lucide-react';
import { 
  EXM_MISSIONS, 
  EXMMission, 
  EXMMonsterInfo, 
  EXMReferenceVideo, 
  EXMSoloStrategy 
} from '../data/exmMissionsData';

interface UserComment {
  id: string;
  author: string;
  vocation: string;
  clearTime?: string;
  comment: string;
  timestamp: string;
}

const DEFAULT_COMMENTS: Record<string, UserComment[]> = {};

interface EXMPageProps {
  onNavigateToTab?: (tab: string) => void;
}

export const EXMPage: React.FC<EXMPageProps> = ({ onNavigateToTab }) => {
  const [selectedExmId, setSelectedExmId] = useState<string>('invitation-catacombs');
  const [activeTabSection, setActiveTabSection] = useState<'overview' | 'vocations' | 'solo' | 'walkthrough' | 'video' | 'comments'>('overview');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);

  // Community Comments state
  const [comments, setComments] = useState<Record<string, UserComment[]>>(() => {
    try {
      const saved = localStorage.getItem('ddon_exm_comments');
      if (!saved) return {};
      const parsed: Record<string, UserComment[]> = JSON.parse(saved);
      // Ensure all dummy comments (with IDs c1 to c99) are filtered out even if cached in localStorage
      const cleaned: Record<string, UserComment[]> = {};
      for (const [key, list] of Object.entries(parsed)) {
        if (Array.isArray(list)) {
          const valid = list.filter((item) => !/^c\d+$/.test(item.id));
          if (valid.length > 0) {
            cleaned[key] = valid;
          }
        }
      }
      return cleaned;
    } catch {
      return {};
    }
  });

  const [newAuthor, setNewAuthor] = useState('');
  const [newVocation, setNewVocation] = useState('Warrior');
  const [newClearTime, setNewClearTime] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const currentExm = EXM_MISSIONS.find(m => m.id === selectedExmId) || EXM_MISSIONS[0];

  const handleSelectMission = (id: string) => {
    setSelectedExmId(id);
    setSelectedVideoIndex(0);
    // If mission doesn't have solo strategy and active tab is solo, fall back to overview
    const mission = EXM_MISSIONS.find(m => m.id === id);
    if (!mission?.soloStrategy && activeTabSection === 'solo') {
      setActiveTabSection('overview');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newEntry: UserComment = {
      id: `comm_${Date.now()}`,
      author: newAuthor.trim() || 'Arisen Explorer',
      vocation: newVocation,
      clearTime: newClearTime.trim() ? newClearTime.trim() : undefined,
      comment: newCommentText.trim(),
      timestamp: 'Just now'
    };

    const missionComments = comments[currentExm.id] || [];
    const updated = {
      ...comments,
      [currentExm.id]: [newEntry, ...missionComments]
    };

    setComments(updated);
    try {
      localStorage.setItem('ddon_exm_comments', JSON.stringify(updated));
    } catch {
      // Storage quota or restriction
    }

    setNewCommentText('');
    setNewClearTime('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3500);
  };

  const activeVideo = currentExm.referenceVideos[selectedVideoIndex] || currentExm.referenceVideos[0];
  const currentComments = comments[currentExm.id] || [];

  const getSpeciesBadgeStyle = (speciesType: string) => {
    if (speciesType.includes('Spirit')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    if (speciesType.includes('Demon')) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (speciesType.includes('Corrupted') || speciesType.includes('Erosion')) return 'bg-red-500/20 text-red-300 border-red-500/40';
    if (speciesType.includes('Dragonkin') || speciesType.includes('Dragon')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    if (speciesType.includes('Ogrekin') || speciesType.includes('Ogre')) return 'bg-red-500/20 text-red-300 border-red-500/40';
    if (speciesType.includes('Beast')) return 'bg-amber-600/20 text-amber-200 border-amber-600/40';
    if (speciesType.includes('Cursed')) return 'bg-zinc-700/40 text-zinc-300 border-zinc-600';
    if (speciesType.includes('Giant')) return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    if (speciesType.includes('Skeleton')) return 'bg-slate-700/50 text-slate-300 border-slate-600';
    if (speciesType.includes('Construct') || speciesType.includes('Golem') || speciesType.includes('Alchemy')) return 'bg-violet-500/20 text-violet-300 border-violet-500/40';
    if (speciesType.includes('Winged')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    if (speciesType.includes('Demihuman')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (speciesType.includes('Reptile') || speciesType.includes('Lizard')) return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    if (speciesType.includes('Plant')) return 'bg-lime-500/20 text-lime-300 border-lime-500/40';
    if (speciesType.includes('Humanoid') || speciesType.includes('Pawn')) return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    if (speciesType.includes('Formless') || speciesType.includes('Soft')) return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  const getWeaknessBadgeStyle = (weakness: string) => {
    if (weakness.includes('Ice')) return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    if (weakness.includes('Lightning') || weakness.includes('Thunder')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    if (weakness.includes('Holy')) return 'bg-amber-400/20 text-amber-200 border-amber-400/40';
    if (weakness.includes('Fire')) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (weakness.includes('Dark')) return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    if (weakness.includes('Strike') || weakness.includes('Blunt')) return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    if (weakness.includes('Physical')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (weakness.includes('Magick')) return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40';
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
                <Swords className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>EXM</span>
                <span className="text-slate-400 text-sm font-normal">/ Extreme Missions (エクストリームミッション)</span>
              </h1>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                High Difficulty 4 & 8-Player Raids
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Extreme Missions are endgame cooperative trials with strict item quotas, punishing multi-boss waves, tight time limits, and rare crafting crystal rewards.
            </p>

            {/* Acknowledgment & Wiki Attribution */}
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Special thanks & acknowledgment: Most of the comprehensive strategy data, boss mechanics, and drop info for EXMs are archived courtesy of</span>
              <a
                href="https://h1g.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors ml-0.5"
              >
                <span>h1g.jp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Development Notice in Big Letters */}
            <div className="pt-2">
              <div className="p-3 sm:p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-2.5 text-amber-200 shadow-sm">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base font-bold tracking-tight leading-snug">
                  (Currently in development, so might contain various discrepancies or wrong translations while in most part should be accurate, if you find anything wrong however feel free to report it)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Active Mission</div>
              <div className="text-xs font-bold text-amber-400">{currentExm.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left-Side Mission List + Right-Side Mission Details */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Side: Mission List Selector */}
        <aside className="w-full lg:w-80 shrink-0 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Extreme Missions</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {EXM_MISSIONS.length} Missions
              </span>
            </div>

            {/* Vertical List of Missions */}
            <div className="space-y-2">
              {EXM_MISSIONS.map((exm, index) => {
                const isSelected = selectedExmId === exm.id;
                return (
                  <button
                    key={exm.id}
                    onClick={() => handleSelectMission(exm.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer group relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25 ring-1 ring-red-400'
                        : 'bg-slate-950/80 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800/90'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-900 text-red-400 border border-slate-800 group-hover:border-red-500/40'
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className={`text-[10px] uppercase font-mono font-bold ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                            EXM {index + 1}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                            isSelected 
                              ? 'bg-white/20 text-white' 
                              : exm.partySize?.includes('8')
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                          }`}>
                            {exm.partySize || '4 Players'}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono shrink-0 ${isSelected ? 'text-red-100' : 'text-slate-500'}`}>
                          {exm.timeLimit}
                        </span>
                      </div>
                      <div className={`text-xs font-bold truncate mt-0.5 ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-amber-300'}`}>
                        {exm.name}
                      </div>
                      {exm.japaneseName && (
                        <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-red-100/80' : 'text-slate-500'}`}>
                          {exm.japaneseName}
                        </div>
                      )}
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 mt-2 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-1.5 justify-center select-none">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Full archive active</span>
            </div>
          </div>
        </aside>

        {/* Right Side: Active Mission Detailed Workspace */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Mission Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    {currentExm.badge}
                  </span>
                  <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                    currentExm.partySize?.includes('8')
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}>
                    <Users className="w-3 h-3 text-blue-400" />
                    {currentExm.partySize ? `${currentExm.partySize} EXM` : '4-Player EXM'}
                  </span>
                  {currentExm.japaneseName && (
                    <span className="text-xs text-slate-400 font-mono">
                      {currentExm.japaneseName}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{currentExm.name}</h2>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                    <Users className="w-3 h-3 text-blue-400" />
                    Party Size
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-blue-300 truncate">
                    {currentExm.partySize || '4 Players'}
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                    <UserCheck className="w-3 h-3 text-amber-400" />
                    Level / Rank
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-amber-400 truncate">
                    {typeof currentExm.recommendedLevel === 'number' ? `Lv. ${currentExm.recommendedLevel}+` : currentExm.recommendedLevel}
                    {currentExm.itemRankRequirement && ` • IR ${currentExm.itemRankRequirement.replace(/[^0-9]/g, '')}+`}
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                    <Clock className="w-3 h-3 text-sky-400" />
                    Time Limit
                  </div>
                  <div className="text-sm font-bold text-sky-400">{currentExm.timeLimit}</div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    Target Def
                  </div>
                  <div className="text-sm font-bold text-emerald-400 truncate">{currentExm.minDefense.split('/')[0]}</div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Rewards
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-purple-300 truncate">
                    {currentExm.clearRewards[0]}
                    {currentExm.additionalHelpingRewards && (
                      <span className="text-[10px] text-emerald-400 block font-medium truncate">
                        + {currentExm.additionalHelpingRewards[0]} (Help)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section Navigation Tabs */}
            <div className="flex items-center gap-2 pt-4 flex-wrap">
              <button
                onClick={() => setActiveTabSection('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTabSection === 'overview'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                }`}
              >
                Overview, Prep & Bestiary
              </button>
              <button
                onClick={() => setActiveTabSection('vocations')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTabSection === 'vocations'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                }`}
              >
                Vocation Tactics
              </button>
              {currentExm.soloStrategy && (
                <button
                  onClick={() => setActiveTabSection('solo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTabSection === 'solo'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-amber-400 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                  }`}
                >
                  <Crown className="w-3 h-3" />
                  <span>Solo Strategy & Pawns</span>
                </button>
              )}
              <button
                onClick={() => setActiveTabSection('walkthrough')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTabSection === 'walkthrough'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                }`}
              >
                Walkthrough & Battles
              </button>
              <button
                onClick={() => setActiveTabSection('video')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabSection === 'video'
                    ? 'bg-red-500 text-white shadow'
                    : 'text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                }`}
              >
                <Play className="w-3 h-3 text-red-400 fill-current" />
                <span>Reference Videos ({currentExm.referenceVideos.length})</span>
              </button>
              <button
                onClick={() => setActiveTabSection('comments')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabSection === 'comments'
                    ? 'bg-sky-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>Discussion & Comments ({currentComments.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW, PREPARATION & BESTIARY DATA */}
          {(activeTabSection === 'overview' || activeTabSection === 'vocations') && (
            <div className="space-y-6">
              {/* Order Conditions Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Order Conditions</h3>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-sm font-medium text-slate-200">
                      {currentExm.orderConditions}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-900 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Party Format: <strong className="text-blue-300 font-semibold">4-Player Extreme Mission</strong> (Max 4 participants, Arisen & Pawns supported)</span>
                  </div>
                </div>
              </div>

              {/* Preparation & Defense Guideline */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Preparation & Defense Guidelines</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {currentExm.preparationNotes}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Minimum Defense Benchmark</span>
                        <span className="text-amber-400 font-bold font-mono text-sm">
                          {currentExm.minDefense}
                        </span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Clear Rewards</span>
                        <span className="text-purple-400 font-bold font-mono text-sm">
                          {currentExm.clearRewards.join(', ')}
                        </span>
                      </div>
                      {currentExm.additionalHelpingRewards && currentExm.additionalHelpingRewards.length > 0 && (
                        <div className="bg-slate-900 p-2.5 rounded-lg border border-emerald-500/30 text-xs sm:col-span-2">
                          <span className="text-emerald-400 block text-[10px] uppercase font-semibold">Additional rewards for helping out</span>
                          <span className="text-emerald-300 font-bold font-mono text-sm">
                            {currentExm.additionalHelpingRewards.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>

                    {currentExm.clearTimeRewards && currentExm.clearTimeRewards.length > 0 && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
                        <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Clear Time Rewards</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {currentExm.clearTimeRewards.map((ctr, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                              <span className="font-mono text-indigo-300 font-medium">{ctr.time}</span>
                              <span className="text-slate-200 font-bold text-right ml-2">{ctr.reward}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentExm.rankingRewards && currentExm.rankingRewards.length > 0 && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                          <Crown className="w-3.5 h-3.5" />
                          <span>Ranking Rewards (Tournament Brackets)</span>
                        </div>
                        <div className="space-y-1.5 text-xs max-h-60 overflow-y-auto pr-1">
                          {currentExm.rankingRewards.map((rr, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 gap-1">
                              <span className="font-bold text-amber-300 font-mono shrink-0">{rr.rank}</span>
                              <span className="text-slate-300 text-right text-[11px] leading-relaxed">{rr.reward}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {currentExm.troubleWinningAdvice && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 block mb-0.5 font-bold">For those who are having trouble winning:</strong>
                          <span className="text-slate-300">{currentExm.troubleWinningAdvice}</span>
                        </div>
                      </div>
                      {onNavigateToTab && (
                        <button
                          onClick={() => onNavigateToTab('items')}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow"
                        >
                          <span>View Strongest Weapons</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {currentExm.partyRecommendation && (
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-300 block mb-0.5">Recommended Team Lineup:</strong>
                        <span>{currentExm.partyRecommendation}</span>
                      </div>
                    </div>
                  )}

                  {currentExm.specialPreparationTips && currentExm.specialPreparationTips.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {currentExm.specialPreparationTips.map((tip, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentExm.remarks && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 w-full">
                        <strong className="text-emerald-300 block font-bold text-xs uppercase tracking-wide">Remarks & Rescue Bonuses:</strong>
                        <div className="text-slate-300 text-xs whitespace-pre-line leading-relaxed font-sans">
                          {currentExm.remarks}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentExm.sideNote && (
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 w-full">
                        <strong className="text-purple-300 block font-bold text-xs uppercase tracking-wide">Side note (Ghosts 'n Goblins Homages):</strong>
                        <div className="text-slate-300 text-xs whitespace-pre-line leading-relaxed font-sans">
                          {currentExm.sideNote}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Monsters Appearing & Bestiary Lore / Weaknesses Section */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400">
                      <Skull className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Monsters Appearing in {currentExm.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Species Type (from Bestiary) and Elemental Weaknesses
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    {currentExm.monstersAppearing.length} Unique Enemy Types
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentExm.monstersAppearing.map((m) => (
                    <div
                      key={m.name}
                      className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 space-y-2.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span>{m.name}</span>
                          </h4>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getSpeciesBadgeStyle(m.speciesType)}`}>
                              {m.speciesType}
                            </span>
                            {m.coreType && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                                {m.coreType}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-mono">
                            Weakness
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border inline-block mt-0.5 ${getWeaknessBadgeStyle(m.weakness)}`}>
                            {m.weakness}
                          </span>
                        </div>
                      </div>

                      {m.notes && (
                        <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-2">
                          {m.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOCATION TACTICS */}
          {(activeTabSection === 'vocations' || activeTabSection === 'overview') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Swords className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Vocation-Specific Tactics</h3>
                  <p className="text-xs text-slate-400">Class mechanics, core rotations, and skill assignments for this EM</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Warrior Strategy */}
                {currentExm.vocationAdvice.warrior && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <h4 className="text-base font-bold text-white">In the case of a Warrior</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                        Burst Core Destroyer
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.warrior.notes}
                    </p>
                  </div>
                )}

                {/* Fighter Strategy */}
                {currentExm.vocationAdvice.fighter && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <h4 className="text-base font-bold text-white">In the case of a Fighter</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        DPS & Sustainability
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.fighter.notes}
                    </p>

                    {currentExm.vocationAdvice.fighter.abilities && (
                      <div className="pt-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Recommended Ability Setup:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentExm.vocationAdvice.fighter.abilities.map((ability) => (
                            <span
                              key={ability}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 text-xs font-semibold"
                            >
                              {ability}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentExm.vocationAdvice.fighter.gearExample && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                        <strong className="text-slate-200 block mb-1">Defense Reference Benchmark:</strong>
                        {currentExm.vocationAdvice.fighter.gearExample}
                      </div>
                    )}
                  </div>
                )}

                {/* Seeker Strategy */}
                {currentExm.vocationAdvice.seeker && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <h4 className="text-base font-bold text-white">In the case of a Seeker</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Stagger & DPS
                      </span>
                    </div>

                    {currentExm.vocationAdvice.seeker.coreSkill && (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium">
                        Core Setup: <strong>{currentExm.vocationAdvice.seeker.coreSkill}</strong>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.seeker.notes}
                    </p>

                    {currentExm.vocationAdvice.seeker.combos && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                        <div className="font-semibold text-sky-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                          Stagger-Lock Rotation:
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {currentExm.vocationAdvice.seeker.combos}
                        </p>
                      </div>
                    )}

                    {currentExm.vocationAdvice.seeker.interrupts && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300/90 leading-relaxed">
                        <strong className="text-white block mb-1">Attack Interrupts:</strong>
                        {currentExm.vocationAdvice.seeker.interrupts}
                      </div>
                    )}
                  </div>
                )}

                {/* Sorcerer Strategy */}
                {currentExm.vocationAdvice.sorcerer && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        <h4 className="text-base font-bold text-white">In the case of a Sorcerer</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        Burst Magick DPS
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.sorcerer.notes}
                    </p>

                    {currentExm.vocationAdvice.sorcerer.spells && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Key Spells & Spell Rotations:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentExm.vocationAdvice.sorcerer.spells.map((spell) => (
                            <span
                              key={spell}
                              className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold font-mono"
                            >
                              ⚡ {spell}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentExm.vocationAdvice.sorcerer.targets && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Target Allocations:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {currentExm.vocationAdvice.sorcerer.targets.map((t) => (
                            <div key={t.spell} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                              <span className="font-bold text-purple-300 block">{t.spell}</span>
                              <span className="text-slate-400 text-[11px]">{t.target}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Shield Sage Strategy */}
                {currentExm.vocationAdvice.shieldSage && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        <h4 className="text-base font-bold text-white">In the case of a Shield Sage</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        Crowd Control & Aggro
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.shieldSage.notes}
                    </p>
                  </div>
                )}

                {/* Elemental Archer Strategy */}
                {currentExm.vocationAdvice.elementalArcher && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                        <h4 className="text-base font-bold text-white">In the case of an Elemental Archer</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        Ranged Debuff & Core Reveal
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.elementalArcher.notes}
                    </p>
                  </div>
                )}

                {/* Priest Strategy */}
                {currentExm.vocationAdvice.priest && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <h4 className="text-base font-bold text-white">In the case of a Priest</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Stamina Management & Curatives
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.priest.notes}
                    </p>
                  </div>
                )}

                {/* Hunter Strategy */}
                {currentExm.vocationAdvice.hunter && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                        <h4 className="text-base font-bold text-white">In the case of a Hunter</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-lime-500/10 text-lime-400 border border-lime-500/20">
                        Anti-Air & Mob Suppression
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.hunter.notes}
                    </p>

                    {currentExm.vocationAdvice.hunter.skills && (
                      <div className="pt-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Recommended Skills:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentExm.vocationAdvice.hunter.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-lime-300 text-xs font-semibold"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Alchemist Strategy */}
                {currentExm.vocationAdvice.alchemist && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <h4 className="text-base font-bold text-white">In the case of an Alchemist</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Damage Immunity & Defense
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentExm.vocationAdvice.alchemist.notes}
                    </p>

                    {currentExm.vocationAdvice.alchemist.skills && (
                      <div className="pt-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Key Survival Skill:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentExm.vocationAdvice.alchemist.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 text-xs font-semibold"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SOLO STRATEGY & PAWNS (Specific to missions like Shining Gate) */}
          {activeTabSection === 'solo' && currentExm.soloStrategy && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Solo Clear Strategy & Pawn Optimization</h3>
                  <p className="text-xs text-slate-400">Essential preparations for clearing {currentExm.name} solo with pawns</p>
                </div>
              </div>

              {/* 100% Gold Resistance Section */}
              <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>100% Gold Transformation Resistance (Critical Solo Last Resort)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentExm.soloStrategy.goldResistanceNotes}
                </p>
              </div>

              {/* Green Pawns Analysis */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Green Job Pawn Breakdown</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {currentExm.soloStrategy.greenPawnsAnalysis.map((pawn) => (
                    <div
                      key={pawn.job}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-sm text-emerald-300">{pawn.job}</h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {pawn.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {pawn.description}
                        </p>
                      </div>

                      {pawn.recommendedFor && (
                        <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Best for:</span>
                          <span className="text-amber-300 font-medium">{pawn.recommendedFor}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Key Solo Survival Directives:
                </h4>
                <div className="space-y-2">
                  {currentExm.soloStrategy.keyTakeaways.map((tip, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WALKTHROUGH & BATTLES */}
          {(activeTabSection === 'walkthrough' || activeTabSection === 'overview') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Full Mission Walkthrough</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Time Limit: {currentExm.timeLimit}</span>
                </div>
              </div>

              {/* Clean Integrated Supplied Items Line */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  <Package className="w-3.5 h-3.5" />
                  <span>Supplied Items Loadout:</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-mono">
                  {currentExm.suppliedItemsText}
                </p>
              </div>

              {/* Areas / Battles List */}
              <div className="space-y-4">
                {currentExm.walkthroughAreas.map((area) => (
                  <div
                    key={area.areaNumber}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 font-black text-xs flex items-center justify-center border border-red-500/30">
                          {area.areaNumber}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white">{area.title}</h4>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {area.enemies.map((e) => (
                          <span key={e} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {area.tactics}
                    </p>

                    {area.keyTips && area.keyTips.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {area.keyTips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-500/5 p-2 rounded-lg border border-amber-500/15">
                            <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {currentExm.remarks && (
                  <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4 sm:p-5 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Award className="w-4 h-4" />
                      <span>Mission Remarks & Rescue Mechanics</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                      {currentExm.remarks}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: REFERENCE VIDEOS (IN-APP EMBEDDED PLAYER) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-600/30">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Reference Video Guide (In-App Player)</h3>
                  <p className="text-xs text-slate-400">
                    Full clear demonstrations for "{currentExm.name}"
                  </p>
                </div>
              </div>

              {activeVideo && (
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-sm shadow-red-600/20 shrink-0"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Video Perspective Selector Tabs if more than 1 video */}
            {currentExm.referenceVideos.length > 1 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  Select Perspective:
                </span>
                {currentExm.referenceVideos.map((video, idx) => (
                  <button
                    key={video.youtubeVideoId}
                    onClick={() => setSelectedVideoIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedVideoIndex === idx
                        ? 'bg-red-500 text-white shadow ring-1 ring-red-400'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{video.perspective}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Embedded YouTube Player */}
            {activeVideo && (
              <div className="space-y-2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                  <iframe
                    key={activeVideo.youtubeVideoId}
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeVideoId}?rel=0&modestbranding=1`}
                    title={`${currentExm.name} - ${activeVideo.title}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>
                    Viewing: <strong className="text-slate-200">{activeVideo.title}</strong> ({activeVideo.perspective})
                  </span>
                  <span className="font-mono text-slate-500">Video ID: {activeVideo.youtubeVideoId}</span>
                </div>
                {activeVideo.note && (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{activeVideo.note}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* TAB 6: COMMUNITY TACTICAL DISCUSSION / COMMENT FORM */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Community Discussion & Strategy Notes</h3>
                  <p className="text-xs text-slate-400">Share your clear strategies, party comps, and pawn rentals for {currentExm.name}</p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                {currentComments.length} Notes
              </span>
            </div>

            {/* Comment Submission Form */}
            <form onSubmit={handleAddComment} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Arisen Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Leo of Lestania"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Primary Vocation</label>
                  <select
                    value={newVocation}
                    onChange={(e) => setNewVocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Warrior">Warrior</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Seeker">Seeker</option>
                    <option value="Shield Sage">Shield Sage</option>
                    <option value="Sorcerer">Sorcerer</option>
                    <option value="Priest">Priest</option>
                    <option value="Elemental Archer">Elemental Archer</option>
                    <option value="Hunter">Hunter</option>
                    <option value="Alchemist">Alchemist</option>
                    <option value="Spirit Lancer">Spirit Lancer</option>
                    <option value="High Scepter">High Scepter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Clear Time (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12:45"
                    value={newClearTime}
                    onChange={(e) => setNewClearTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tactics / Strategy Comment</label>
                <textarea
                  rows={2}
                  required
                  placeholder={`Share tactical advice, pawn recommendations, or questions regarding ${currentExm.name}...`}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                {commentSuccess ? (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Strategy comment added successfully!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    Comments are saved locally for this EXM guide.
                  </span>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-sky-600/20 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Post Strategy Note</span>
                </button>
              </div>
            </form>

            {/* List of Comments */}
            <div className="space-y-2.5">
              {currentComments.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-950 rounded-xl border border-slate-800">
                  No comments yet for this mission. Be the first to share your party composition and clear advice!
                </div>
              ) : (
                currentComments.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{c.author}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-400 border border-slate-800">
                          {c.vocation}
                        </span>
                        {c.clearTime && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {c.clearTime}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                      {c.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Attribution & Resource Footer Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-200 font-semibold block">Community Strategy Credit & Acknowledgment</span>
                <span className="text-slate-400">
                  Most of the strategy guidelines, boss breakdown mechanics, and drop rate data for Extreme Missions are sourced from the Dragon's Dogma Online community wiki at{' '}
                  <strong className="text-amber-300 font-normal">h1g.jp</strong>.
                </span>
              </div>
            </div>
            <a
              href="https://h1g.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold border border-slate-700 hover:border-amber-500/40 transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-sm cursor-pointer"
            >
              <span>Visit h1g.jp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};
