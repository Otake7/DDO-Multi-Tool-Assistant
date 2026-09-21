import React, { useState } from 'react';
import { 
  Sparkles, Shield, Flame, RotateCcw, Award, Swords, Layers, Map, 
  PackageCheck, BookOpen, HelpCircle, Compass, Trophy, User, Coffee, 
  PanelLeft, PanelTop, Skull, Library, Menu, X, Smartphone, Monitor,
  MessageSquarePlus, Download, Calculator
} from 'lucide-react';
import { BoosterSettings, GameVersion, UserProfile } from '../types';
import { GAME_VERSIONS, getMaxLevelForVersion, XP_RING_CAP_LEVEL } from '../data/levelTable';
import { PWAInstallModal } from './PWAInstallModal';

interface HeaderProps {
  currentLevel: number;
  targetLevel: number;
  boosters: BoosterSettings;
  gameVersion: GameVersion;
  onSelectVersion: (version: GameVersion) => void;
  onToggleRing: () => void;
  onReset: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  plannedCount: number;
  currentUser?: UserProfile | null;
  onOpenProfileModal?: () => void;
  navLayout?: 'top' | 'sidebar';
  onToggleNavLayout?: () => void;
  uiMode: 'desktop' | 'mobile';
  onToggleUiMode: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLevel,
  targetLevel,
  boosters,
  gameVersion,
  onSelectVersion,
  onToggleRing,
  onReset,
  activeTab,
  setActiveTab,
  plannedCount,
  currentUser,
  onOpenProfileModal,
  navLayout = 'top',
  onToggleNavLayout,
  uiMode,
  onToggleUiMode,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const isRingActiveAtCurrentLevel = boosters.useExpRing50 && currentLevel < XP_RING_CAP_LEVEL;
  const maxLevel = getMaxLevelForVersion(gameVersion);

  const getActiveTabTitle = (tab: string) => {
    switch (tab) {
      case 'calculator': return 'Level Progress & Goal';
      case 'vocations': return 'Vocations & Targets';
      case 'damage_calc': return 'Damage Calculator';
      case 'quests': return 'Quest Database';
      case 'planner': return `Planner (${plannedCount})`;
      case 'map': return 'Find Spots & Monsters';
      case 'items': return 'Item Library';
      case 'knowledge': return 'Knowledge Library';
      case 'bestiary': return 'Bestiary & Enemies';
      case 'fast_routes': return 'Leveling Routes';
      case 'exm': return 'EXM (Missions)';
      case 'guides': return 'Guides & Notes';
      case 'bbm_seals': return 'BBM Seals';
      case 'journal': return 'Ask Assistant';
      case 'leaderboard': return 'Leaderboard';
      case 'table': return `Lv 1–${maxLevel} Table`;
      case 'feedback': return 'Community Feedback';
      default: return 'Assistant';
    }
  };

  // --- Render Mobile Header Layout when uiMode === 'mobile' ---
  if (uiMode === 'mobile') {
    return (
      <header className="bg-slate-900 border-b border-amber-500/30 text-slate-100 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-slate-900/95">
        <div className="px-1.5 sm:px-3 py-2 w-full max-w-full">
          <div className="flex items-center justify-between gap-1.5">
            
            {/* Left Edge: 3-Bars Hamburger Button right against the top-left edge */}
            <div className="flex items-center gap-1.5">
              <button
                id="btn-mobile-hamburger-menu"
                onClick={onToggleMobileMenu}
                className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isMobileMenuOpen
                    ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold ring-2 ring-amber-400/50'
                    : 'bg-slate-800/95 text-amber-400 border-amber-500/50 hover:bg-slate-700 active:scale-95'
                }`}
                title={isMobileMenuOpen ? 'Close pages menu' : 'Open all pages menu (3 bars)'}
                aria-label="Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Tap-to-Change Page Badge Indicator */}
              <button
                onClick={onToggleMobileMenu}
                className="flex flex-col text-left cursor-pointer group max-w-[130px] sm:max-w-[200px]"
                title="Tap to change page"
              >
                <span className="text-[10px] font-mono text-amber-400/90 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>Page (Tap)</span>
                </span>
                <span className="text-xs font-bold text-slate-100 truncate group-hover:text-amber-300 transition-colors">
                  {getActiveTabTitle(activeTab)}
                </span>
              </button>
            </div>

            {/* Right: Mobile/Desktop UI Switcher Button + Profile / Ring Quick Actions */}
            <div className="flex items-center gap-1.5">
              
              {/* Dedicated Mobile/Desktop UI Switcher Button */}
              <button
                id="btn-mobile-desktop-ui-toggle-mobile-bar"
                onClick={onToggleUiMode}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer border border-amber-300 active:scale-95"
                title="Click to switch back to Desktop UI layout"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop UI</span>
                <span className="sm:hidden">Desktop</span>
              </button>

              {/* 50% XP Ring Quick Toggle */}
              <button
                onClick={onToggleRing}
                title="Toggle 50% XP Ring"
                className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  boosters.useExpRing50
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </button>

              {/* Install / Download App Button */}
              <button
                id="btn-mobile-install-app"
                onClick={() => setIsInstallModalOpen(true)}
                title="Download / Install App on Windows & Linux Desktop"
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 hover:border-amber-500/50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Profile Icon */}
              <button
                id="btn-mobile-profile"
                onClick={onOpenProfileModal}
                title="Account & Profile"
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                <Flame className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* PWA Install Modal for Mobile */}
        <PWAInstallModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </header>
    );
  }

  // --- Render Desktop Header Layout when uiMode === 'desktop' ---
  return (
    <header className="bg-slate-900 border-b border-amber-500/20 text-slate-100 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              {/* 3-Bars Hamburger Button placed at the very top-left edge */}
              <button
                id="btn-desktop-top-left-hamburger"
                onClick={onToggleMobileMenu}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 ${
                  isMobileMenuOpen
                    ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold ring-2 ring-amber-400/50'
                    : 'bg-slate-800/95 text-amber-400 border-amber-500/50 hover:bg-slate-700 hover:text-amber-300 active:scale-95'
                }`}
                title={isMobileMenuOpen ? 'Close pages menu' : 'Open all pages menu (3 bars)'}
                aria-label="Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Interactive Flame Icon Button - Opens Profile / Account Details */}
              <button
                id="btn-open-profile-modal"
                onClick={onOpenProfileModal}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center transition-all transform hover:scale-105 hover:shadow-amber-500/40 active:scale-95 cursor-pointer group shrink-0"
                title={
                  currentUser?.isGuest
                    ? 'Guest Arisen • Click to view account info or log in'
                    : `Arisen: ${currentUser?.characterName || currentUser?.username || 'Profile'} • Click to view and edit details`
                }
              >
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center group-hover:bg-slate-900 transition-colors relative">
                  <Flame className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
                  {!currentUser?.isGuest && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
                  )}
                </div>
              </button>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
                    <span>DDO Multi Tool Assistant</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                      Dogma Rising
                    </span>
                  </h1>

                  {/* Arisen Profile Tag Trigger */}
                  {currentUser && (
                    <button
                      onClick={onOpenProfileModal}
                      className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
                      title="Click to view/edit your Arisen Profile"
                    >
                      <User className="w-3 h-3 text-amber-400" />
                      <span>
                        {currentUser.characterName || currentUser.username}
                        {currentUser.clanTag ? ` ${currentUser.clanTag}` : ''}
                      </span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <p className="text-xs text-slate-400">
                    Leveling & Quest Planner, Item Library, Guides & Multi Tool Assistant (Season {gameVersion} Cap Lv {maxLevel})
                  </p>
                  {onToggleNavLayout && (
                    <button
                      id="btn-toggle-nav-layout-subtitle"
                      onClick={onToggleNavLayout}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all shadow-sm cursor-pointer group"
                      title={`Switch menu style between Top Bar and Left Sidebar (Currently: ${navLayout === 'sidebar' ? 'Left Sidebar View' : 'Top Bar View'})`}
                    >
                      {navLayout === 'sidebar' ? (
                        <>
                          <PanelTop className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                          <span>Switch to Top Menu View</span>
                        </>
                      ) : (
                        <>
                          <PanelLeft className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                          <span>Switch to Left Sidebar View</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Small screen top actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                id="btn-header-install-app-small"
                onClick={() => setIsInstallModalOpen(true)}
                title="Download / Install App"
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                id="btn-mobile-desktop-ui-toggle-small"
                onClick={onToggleUiMode}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 cursor-pointer"
                title="Switch to Mobile UI"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile UI</span>
              </button>
              <button
                onClick={onOpenProfileModal}
                title="Account & Profile"
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300"
              >
                <Flame className="w-4 h-4" />
              </button>
              <button
                onClick={onToggleRing}
                title="Toggle 50% XP Ring"
                className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                  boosters.useExpRing50
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={onReset}
                title="Reset Plan & Levels"
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controls: Mobile/Desktop UI Switcher, Game Version, 50% XP Ring, Ko-fi */}
          <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
            {/* Top Row: Mobile/Desktop UI Button, Version Selector, 50% Ring, Level Range */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center md:justify-end">

              {/* Dedicated Mobile/Desktop UI Switcher Button */}
              <button
                id="btn-toggle-ui-mode-header"
                onClick={onToggleUiMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border border-amber-300 shadow-md shadow-amber-500/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                title="Toggle between Mobile UI and Desktop UI layouts"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile/Desktop UI</span>
              </button>

              {/* Game Version Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400 hidden sm:inline">Season:</span>
                <select
                  id="version-select-header"
                  value={gameVersion}
                  onChange={(e) => onSelectVersion(e.target.value as GameVersion)}
                  className="bg-transparent text-amber-300 font-bold font-mono text-xs focus:outline-none cursor-pointer"
                  title="Change Game Season / Version & Level Cap"
                >
                  {GAME_VERSIONS.map((v) => (
                    <option key={v.version} value={v.version} className="bg-slate-900 text-slate-200">
                      {v.label} (Cap {v.maxLevel})
                    </option>
                  ))}
                </select>
              </div>

              {/* 50% XP Booster Ring Toggle */}
              <button
                id="xp-ring-toggle-header"
                onClick={onToggleRing}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shadow-sm cursor-pointer ${
                  boosters.useExpRing50
                    ? isRingActiveAtCurrentLevel
                      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-400/60 text-amber-300 shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'bg-slate-800/80 border-amber-500/30 text-amber-400/70 line-through'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
                title={
                  currentLevel >= XP_RING_CAP_LEVEL
                    ? 'XP Ring is equipped but inactive at Lv 90+ (Cap reached)'
                    : '50% Level Up Speed XP Ring (Active for Lv 1 to 89)'
                }
              >
                <Sparkles className={`w-3.5 h-3.5 ${boosters.useExpRing50 ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">50% Ring (Lv 1–89)</span>
                <span className="sm:hidden">50% Ring</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  boosters.useExpRing50
                    ? isRingActiveAtCurrentLevel ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {boosters.useExpRing50 ? (isRingActiveAtCurrentLevel ? 'ACTIVE' : 'CAP REACHED') : 'OFF'}
                </span>
              </button>

              {/* Level Range Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Lv <strong className="text-white font-mono">{currentLevel}</strong> → <strong className="text-amber-300 font-mono">{targetLevel}</strong></span>
              </div>
            </div>

            {/* Bottom Row: Ko-fi Support Link & Reset */}
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
              {/* Ko-fi Link under 50% ring */}
              <a
                id="kofi-support-header"
                href="https://ko-fi.com/smutnymanga7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/30 hover:border-amber-400/70 text-amber-300 hover:text-amber-200 text-xs font-medium transition-all shadow-sm group cursor-pointer"
                title="Support on Ko-fi: https://ko-fi.com/smutnymanga7"
              >
                <Coffee className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[11px] sm:text-xs">If you want support me Buy me a Ko-fi</span>
              </a>

              {/* Install / Download App Button */}
              <button
                id="btn-header-install-app"
                onClick={() => setIsInstallModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-amber-300 text-xs font-semibold transition-all shadow-sm cursor-pointer"
                title="Download / Install DDO Multi Tool Assistant on Windows & Linux Desktop"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Install App</span>
              </button>

              {/* Reset Button */}
              <button
                onClick={onReset}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
                title="Reset level inputs and clear planner"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Displayed when in top menu mode) */}
        {navLayout === 'top' && (
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800 pt-2 pb-2 text-sm font-medium">
            <button
              id="tab-calculator"
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Level Progress & Goal</span>
            </button>

            <button
              id="tab-vocations"
              onClick={() => setActiveTab('vocations')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'vocations'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>Vocations & Job Targets</span>
            </button>

            <button
              id="tab-damage-calc"
              onClick={() => setActiveTab('damage_calc')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'damage_calc'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Damage Calculator</span>
            </button>

            <button
              id="tab-quests"
              onClick={() => setActiveTab('quests')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'quests'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Quest Database</span>
            </button>

            <button
              id="tab-planner"
              onClick={() => setActiveTab('planner')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 relative ${
                activeTab === 'planner'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Quest Planner</span>
              {plannedCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'planner'
                    ? 'bg-slate-950 text-amber-300'
                    : 'bg-amber-500 text-slate-950'
                }`}>
                  {plannedCount}
                </span>
              )}
            </button>

            <button
              id="tab-leaderboard"
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'leaderboard'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </button>

            <button
              id="tab-journal"
              onClick={() => setActiveTab('journal')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'journal'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ask the Assistant</span>
            </button>

            <button
              id="tab-map"
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'map'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Find resources and enemies</span>
            </button>

            <button
              id="tab-items"
              onClick={() => setActiveTab('items')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'items'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span>Item Library</span>
            </button>

            <button
              id="tab-knowledge"
              onClick={() => setActiveTab('knowledge')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'knowledge'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Library className="w-4 h-4" />
              <span>Knowledge Library</span>
            </button>

            <button
              id="tab-exm"
              onClick={() => setActiveTab('exm')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'exm'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>EXM</span>
            </button>

            <button
              id="tab-bestiary"
              onClick={() => setActiveTab('bestiary')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'bestiary'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Skull className="w-4 h-4" />
              <span>Bestiary</span>
            </button>

            <button
              id="tab-fast-routes"
              onClick={() => setActiveTab('fast_routes')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'fast_routes'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Leveling Routes</span>
            </button>

            <button
              id="tab-guides"
              onClick={() => setActiveTab('guides')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'guides'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guides</span>
            </button>

            <button
              id="tab-bbm-seals"
              onClick={() => setActiveTab('bbm_seals')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'bbm_seals'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>BBM Seals</span>
            </button>

            <button
              id="tab-table"
              onClick={() => setActiveTab('table')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'table'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Lv 1–{maxLevel} Table</span>
            </button>

            <button
              id="tab-feedback"
              onClick={() => setActiveTab('feedback')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'feedback'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Feedback</span>
            </button>
          </div>
        )}
      </div>

      {/* PWA Install Modal for Desktop */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </header>
  );
};
