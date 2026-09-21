import React from 'react';
import { 
  X, Shield, Swords, Flame, Award, Trophy, HelpCircle, Map, 
  PackageCheck, Library, Skull, Compass, BookOpen, Table, 
  Monitor, Smartphone, User, Sparkles, Coffee, Layers, ChevronRight,
  MessageSquarePlus, Calculator
} from 'lucide-react';
import { BoosterSettings, GameVersion, UserProfile } from '../types';
import { GAME_VERSIONS, getMaxLevelForVersion, XP_RING_CAP_LEVEL } from '../data/levelTable';

interface MobileDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  plannedCount: number;
  uiMode: 'desktop' | 'mobile';
  onToggleUiMode: () => void;
  gameVersion: GameVersion;
  onSelectVersion: (version: GameVersion) => void;
  currentLevel: number;
  targetLevel: number;
  boosters: BoosterSettings;
  onToggleRing: () => void;
  currentUser?: UserProfile | null;
  onOpenProfileModal?: () => void;
}

export const MobileDrawerMenu: React.FC<MobileDrawerMenuProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  plannedCount,
  uiMode,
  onToggleUiMode,
  gameVersion,
  onSelectVersion,
  currentLevel,
  targetLevel,
  boosters,
  onToggleRing,
  currentUser,
  onOpenProfileModal,
}) => {
  if (!isOpen) return null;

  const isRingActiveAtCurrentLevel = boosters.useExpRing50 && currentLevel < XP_RING_CAP_LEVEL;
  const maxLevel = getMaxLevelForVersion(gameVersion);

  const pages = [
    {
      id: 'calculator',
      title: 'Level Progress & Goal',
      subtitle: 'XP calculator, level simulator & farm spots',
      icon: Shield,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'vocations',
      title: 'Vocations & Job Targets',
      subtitle: 'Skills, augments & training checklist',
      icon: Swords,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 'damage_calc',
      title: 'Damage Calculator',
      subtitle: 'Penetration rate, weapon mods & damage simulator',
      icon: Calculator,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'quests',
      title: 'Quest Database',
      subtitle: 'Complete list of DDON quests & rewards',
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10 border-orange-500/30',
    },
    {
      id: 'planner',
      title: 'Quest Planner',
      subtitle: 'Active leveling queue & custom grind route',
      icon: Award,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      badge: plannedCount > 0 ? `${plannedCount} in queue` : undefined,
    },
    {
      id: 'map',
      title: 'Find Resources & Enemies',
      subtitle: 'Spot search radar, materials & monster spawns',
      icon: Map,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: 'items',
      title: 'Item Library',
      subtitle: 'Bazaar items, ★0–★4 upgrades & stats',
      icon: PackageCheck,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
    },
    {
      id: 'knowledge',
      title: 'Knowledge Library',
      subtitle: 'Lore, systems, currencies & mechanics',
      icon: Library,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/30',
    },
    {
      id: 'exm',
      title: 'EXM (Extreme Missions)',
      subtitle: 'Endgame raids, 60-min trials & strategies',
      icon: Swords,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/30',
    },
    {
      id: 'bestiary',
      title: 'Bestiary & Monsters',
      subtitle: 'Boss weaknesses, drops & combat tactics',
      icon: Skull,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/30',
    },
    {
      id: 'fast_routes',
      title: 'Leveling Routes',
      subtitle: 'Fastest 1–90 sprint routes & community loops',
      icon: Compass,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'guides',
      title: 'Community Guides & Notes',
      subtitle: 'Player guides, custom articles & tips',
      icon: BookOpen,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10 border-teal-500/30',
    },
    {
      id: 'bbm_seals',
      title: 'BBM Seals',
      subtitle: 'Bracelets & Earrings seal tiers, stats & pool',
      icon: Layers,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'journal',
      title: 'Ask the Assistant',
      subtitle: 'AI-assisted DDON knowledge & queries',
      icon: HelpCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
    },
    {
      id: 'leaderboard',
      title: 'Speedrun Leaderboards',
      subtitle: 'Fastest level records & speedruns',
      icon: Trophy,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
    },
    {
      id: 'table',
      title: `Lv 1–${maxLevel} XP Table`,
      subtitle: 'Full XP thresholds & required points list',
      icon: Table,
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/10 border-slate-500/30',
    },
    {
      id: 'feedback',
      title: 'Feedback & Suggestions',
      subtitle: 'Public community voice, likes, dislikes & ideas',
      icon: MessageSquarePlus,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
    },
  ];

  const handleItemClick = (pageId: string) => {
    onSelectTab(pageId);
    onClose();
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-slate-900 border-r border-amber-500/30 text-slate-100 flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (onOpenProfileModal) {
                  onClose();
                  onOpenProfileModal();
                }
              }}
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center cursor-pointer"
              title="Open profile"
            >
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
            </button>
            <div>
              <h2 className="font-bold text-sm text-slate-100 tracking-tight flex items-center gap-1.5">
                <span>All Pages Menu</span>
              </h2>
              <p className="text-[11px] text-amber-400/90 font-medium">
                {currentUser?.characterName || currentUser?.username || 'Arisen'} • Lv {currentLevel}
              </p>
            </div>
          </div>

          <button
            id="btn-close-mobile-drawer"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* UI Switcher Card inside Drawer */}
        <div className="p-3 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {uiMode === 'mobile' ? (
                <Smartphone className="w-4 h-4 text-amber-400" />
              ) : (
                <Monitor className="w-4 h-4 text-cyan-400" />
              )}
              <span className="text-xs font-bold text-slate-200">
                Current View: <span className="text-amber-300">{uiMode === 'mobile' ? 'Mobile UI' : 'Desktop UI'}</span>
              </span>
            </div>
            <button
              id="btn-toggle-ui-mode-drawer"
              onClick={onToggleUiMode}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm cursor-pointer transition-all flex items-center gap-1"
            >
              {uiMode === 'mobile' ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop UI</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile UI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Config Bar: Season & 50% Ring */}
        <div className="px-3 py-2.5 bg-slate-950/60 border-b border-slate-800 grid grid-cols-2 gap-2 text-xs">
          {/* Season Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1.5 rounded-lg">
            <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={gameVersion}
              onChange={(e) => onSelectVersion(e.target.value as GameVersion)}
              className="bg-transparent text-amber-300 font-bold font-mono text-[11px] focus:outline-none w-full cursor-pointer"
            >
              {GAME_VERSIONS.map((v) => (
                <option key={v.version} value={v.version} className="bg-slate-900 text-slate-200">
                  {v.label} (Cap {v.maxLevel})
                </option>
              ))}
            </select>
          </div>

          {/* 50% XP Ring Toggle */}
          <button
            onClick={onToggleRing}
            className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              boosters.useExpRing50
                ? isRingActiveAtCurrentLevel
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-800 border-amber-500/30 text-amber-400/70 line-through'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>50% Ring: {boosters.useExpRing50 ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Scrollable Page List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-800/40">
          <div className="px-1 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Select Navigation Page
          </div>

          <div className="space-y-1 pt-1.5">
            {pages.map((page) => {
              const Icon = page.icon;
              const isActive = activeTab === page.id;

              return (
                <button
                  key={page.id}
                  id={`mobile-drawer-tab-${page.id}`}
                  onClick={() => handleItemClick(page.id)}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                      : 'hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isActive 
                        ? 'bg-slate-950 text-amber-400 border-amber-300' 
                        : `${page.bgColor} ${page.color}`
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate flex items-center gap-1.5">
                        <span>{page.title}</span>
                        {page.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                            isActive ? 'bg-slate-950 text-amber-300' : 'bg-emerald-500 text-slate-950'
                          }`}>
                            {page.badge}
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-slate-950/80 font-medium' : 'text-slate-400'}`}>
                        {page.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                    isActive ? 'text-slate-950' : 'text-slate-500'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer with Support and Profile Link */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/90 space-y-2">
          {currentUser && (
            <button
              onClick={() => {
                onClose();
                if (onOpenProfileModal) onOpenProfileModal();
              }}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Arisen Profile & Account Settings</span>
            </button>
          )}

          <a
            href="https://ko-fi.com/smutnymanga7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>Support on Ko-fi</span>
          </a>
        </div>

      </div>
    </div>
  );
};
