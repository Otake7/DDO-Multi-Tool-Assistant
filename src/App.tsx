import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LevelOverviewCard } from './components/LevelOverviewCard';
import { QuestDatabase } from './components/QuestDatabase';
import { QuestPlanner } from './components/QuestPlanner';
import { LevelTableViewer } from './components/LevelTableViewer';
import { VocationSkillTree } from './components/VocationSkillTree';
import { FindResourcesAndEnemies } from './components/FindResourcesAndEnemies';
import { ItemLibrary } from './components/ItemLibrary';
import { LevelingRoutes } from './components/LevelingRoutes';
import { FeedbackPage } from './components/FeedbackPage';
import { AdventureGuides } from './components/AdventureGuides';
import { AskTheJournal } from './components/AskTheJournal';
import { Leaderboards } from './components/Leaderboards';
import { Bestiary } from './components/Bestiary';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { CustomQuestModal } from './components/CustomQuestModal';
import { WelcomeAuthScreen } from './components/WelcomeAuthScreen';
import { UserProfileModal } from './components/UserProfileModal';
import { CommunityFarmSpotsBrowser } from './components/CommunityFarmSpotsBrowser';
import { SponsorAdBanner } from './components/SponsorAdBanner';
import { GDPRConsentModal } from './components/GDPRConsentModal';
import { MobileDrawerMenu } from './components/MobileDrawerMenu';
import { BoosterSettings, CommunityFarmSpot, GameVersion, PlannedQuest, Quest, SpotSearchCategory, SpotSearchStageScope, UserProfile, VocationType } from './types';
import { LEVELING_PRESETS } from './data/levelingPresets';
import { ALL_QUESTS } from './data/quests';
import { getMaxLevelForVersion } from './data/levelTable';
import { incrementTimesPlanned } from './utils/communityStats';
import { Check, Sparkles, AlertCircle, Coffee, Shield, Swords, Flame, Award, Trophy, HelpCircle, Map, PackageCheck, Compass, BookOpen, Table, PanelTop, PanelLeft, Skull, Library, Menu, MessageSquarePlus } from 'lucide-react';

export default function App() {
  // --- Account & User Profile State ---
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ddon_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [isSessionStarted, setIsSessionStarted] = useState<boolean>(() => {
    const savedUser = localStorage.getItem('ddon_current_user');
    const guestSession = sessionStorage.getItem('ddon_guest_session');
    return !!(savedUser || guestSession === 'true');
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Navigation Layout State ('top' bar or 'sidebar' left menu)
  const [navLayout, setNavLayout] = useState<'top' | 'sidebar'>(() => {
    const saved = localStorage.getItem('ddon_nav_layout');
    return saved === 'sidebar' ? 'sidebar' : 'top';
  });

  // UI Mode State ('desktop' | 'mobile') - As requested by user for explicit switch & mobile friendly experience
  const [uiMode, setUiMode] = useState<'desktop' | 'mobile'>(() => {
    const saved = localStorage.getItem('ddon_ui_mode');
    if (saved === 'mobile' || saved === 'desktop') return saved;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 'mobile';
    return 'desktop';
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleToggleUiMode = () => {
    const next = uiMode === 'desktop' ? 'mobile' : 'desktop';
    setUiMode(next);
    localStorage.setItem('ddon_ui_mode', next);
    showToast(`Switched to ${next === 'mobile' ? 'Mobile Friendly UI' : 'Desktop UI'}`);
  };

  const handleToggleNavLayout = () => {
    const next = navLayout === 'top' ? 'sidebar' : 'top';
    setNavLayout(next);
    localStorage.setItem('ddon_nav_layout', next);
    showToast(`Switched navigation view to ${next === 'sidebar' ? 'Left Sidebar' : 'Top Bar'}`);
  };

  // --- Persistent State ---
  const [gameVersion, setGameVersion] = useState<GameVersion>(() => {
    const saved = localStorage.getItem('ddon_game_version');
    if (saved === '3.1' || saved === '3.2' || saved === '3.3' || saved === '3.4' || saved === '95' || saved === '100' || saved === '120') {
      return saved as GameVersion;
    }
    return '3.4';
  });

  const [selectedVocation, setSelectedVocation] = useState<VocationType>(() => {
    const saved = localStorage.getItem('ddon_selected_vocation');
    return (saved as VocationType) || 'fighter';
  });

  const [completedTrials, setCompletedTrials] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('ddon_completed_trials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {};
  });

  const [currentLevel, setCurrentLevel] = useState<number>(() => {
    const saved = localStorage.getItem('ddon_current_lvl');
    return saved ? parseInt(saved) : 1;
  });

  const [currentXp, setCurrentXp] = useState<number>(() => {
    const saved = localStorage.getItem('ddon_current_xp');
    return saved ? parseInt(saved) : 0;
  });

  const [targetLevel, setTargetLevel] = useState<number>(() => {
    const saved = localStorage.getItem('ddon_target_lvl');
    return saved ? parseInt(saved) : 90;
  });

  const [boosters, setBoosters] = useState<BoosterSettings>(() => {
    const saved = localStorage.getItem('ddon_boosters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      useExpRing50: true, // Default to wearing the 50% XP ring as requested!
      passportCourseActive: false,
      serverMultiplier: 1.0,
      supportPawnActive: false,
      restedXpBonus: false
    };
  });

  const [plannedQuests, setPlannedQuests] = useState<PlannedQuest[]>(() => {
    const saved = localStorage.getItem('ddon_planned_quests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Start with starter sprint preset for immediate rich utility
    return LEVELING_PRESETS[0].quests.map((q) => ({
      questId: q.questId,
      quantity: q.quantity,
      addedAt: Date.now()
    }));
  });

  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Spot Search Cross-Page Navigation State
  const [spotSearchQuery, setSpotSearchQuery] = useState<string>('');
  const [spotSearchCategory, setSpotSearchCategory] = useState<SpotSearchCategory>('ITEMS');
  const [spotSearchStageScope, setSpotSearchStageScope] = useState<SpotSearchStageScope>('ALL STAGES');

  const handleSelectItemForSpotSearch = (itemName: string) => {
    setSpotSearchQuery(itemName);
    setSpotSearchCategory('ITEMS');
    setSpotSearchStageScope('ALL STAGES');
    setActiveTab('map');
    showToast(`Transferred "${itemName}" to Spot Search (Items • All Stages)`);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('ddon_game_version', gameVersion);
  }, [gameVersion]);

  useEffect(() => {
    localStorage.setItem('ddon_selected_vocation', selectedVocation);
  }, [selectedVocation]);

  useEffect(() => {
    localStorage.setItem('ddon_current_lvl', currentLevel.toString());
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem('ddon_current_xp', currentXp.toString());
  }, [currentXp]);

  useEffect(() => {
    localStorage.setItem('ddon_target_lvl', targetLevel.toString());
  }, [targetLevel]);

  useEffect(() => {
    localStorage.setItem('ddon_boosters', JSON.stringify(boosters));
  }, [boosters]);

  useEffect(() => {
    localStorage.setItem('ddon_completed_trials', JSON.stringify(completedTrials));
  }, [completedTrials]);

  useEffect(() => {
    localStorage.setItem('ddon_planned_quests', JSON.stringify(plannedQuests));
  }, [plannedQuests]);

  // Sync state to Aiven PostgreSQL if logged in
  useEffect(() => {
    if (!currentUser || currentUser.isGuest) return;

    const timer = setTimeout(() => {
      fetch('/api/auth/sync-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          progressData: {
            gameVersion,
            selectedVocation,
            currentLevel,
            currentXp,
            targetLevel,
            boosters,
            completedTrials,
            plannedQuests
          }
        })
      }).catch((e) => console.warn('[Sync] Progress sync deferred:', e));
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentUser, gameVersion, selectedVocation, currentLevel, currentXp, targetLevel, boosters, completedTrials, plannedQuests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Handlers
  const handleToggleRing = () => {
    setBoosters((prev) => {
      const next = !prev.useExpRing50;
      showToast(next ? '50% XP Ring Equipped (Active Lv 1–89)' : '50% XP Ring Unequipped');
      return { ...prev, useExpRing50: next };
    });
  };

  const handleReset = () => {
    setCurrentLevel(1);
    setCurrentXp(0);
    setTargetLevel(90);
    setPlannedQuests([]);
    showToast('Plan & Levels Reset to Defaults');
  };

  const handleSelectVersion = (version: GameVersion) => {
    setGameVersion(version);
    const maxLvl = getMaxLevelForVersion(version);
    if (currentLevel > maxLvl) {
      setCurrentLevel(maxLvl);
    }
    if (targetLevel > maxLvl) {
      setTargetLevel(maxLvl);
    }
    showToast(`Switched to Season ${version} (Max Cap: Lv ${maxLvl})`);
  };

  const handleAddQuest = (questId: string, quantity = 1) => {
    incrementTimesPlanned(questId);
    setPlannedQuests((prev) => {
      const existingIdx = prev.findIndex((p) => p.questId === questId);
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        showToast(`Updated quest quantity in plan (+${quantity})`);
        return next;
      } else {
        showToast(`Added quest to planner (${quantity} run${quantity > 1 ? 's' : ''})`);
        return [...prev, { questId, quantity, addedAt: Date.now() }];
      }
    });
  };

  const handleUpdateQuantity = (questId: string, quantity: number) => {
    setPlannedQuests((prev) => {
      if (quantity <= 0) {
        return prev.filter((p) => p.questId !== questId);
      }
      return prev.map((p) => (p.questId === questId ? { ...p, quantity } : p));
    });
  };

  const handleRemoveQuest = (questId: string) => {
    setPlannedQuests((prev) => prev.filter((p) => p.questId !== questId));
    showToast('Quest removed from planner');
  };

  const handleClearPlan = () => {
    setPlannedQuests([]);
    showToast('Cleared all quests from plan');
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = LEVELING_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    incrementTimesPlanned(presetId);
    preset.quests.forEach((q) => incrementTimesPlanned(q.questId));

    const newPlanned: PlannedQuest[] = preset.quests.map((q) => ({
      questId: q.questId,
      quantity: q.quantity,
      addedAt: Date.now()
    }));

    setPlannedQuests(newPlanned);
    showToast(`Loaded preset: ${preset.name}`);
  };

  const handleAddCustomQuest = (customQuest: Quest, initialQuantity: number) => {
    incrementTimesPlanned(customQuest.id);
    setPlannedQuests((prev) => [
      ...prev,
      {
        questId: customQuest.id,
        customQuest,
        quantity: initialQuantity,
        addedAt: Date.now()
      }
    ]);
    showToast(`Custom quest "${customQuest.name}" added to planner`);
  };

  const handleAddSpotToPlan = (spot: CommunityFarmSpot) => {
    incrementTimesPlanned(spot.id);
    if (spot.quests && spot.quests.length > 0) {
      spot.quests.forEach((q) => incrementTimesPlanned(q.questId));
      const newItems: PlannedQuest[] = spot.quests.map((q) => ({
        questId: q.questId,
        customQuest: {
          id: q.questId,
          name: q.name,
          region: spot.region,
          type: 'repeatable_grind',
          minLevel: spot.minLevel,
          baseXp: q.xp,
          gold: q.gold,
          isRepeatable: true,
          targetEnemy: spot.targetEnemies,
          notes: spot.description,
          authorName: spot.authorName,
          authorClan: spot.authorClan,
          server: spot.server,
          createdAt: Date.now()
        },
        quantity: q.recommendedQuantity,
        addedAt: Date.now()
      }));
      setPlannedQuests((prev) => [...prev, ...newItems]);
      showToast(`Added community spot "${spot.name}" (${spot.quests.length} quests) to planner!`);
    } else {
      const newQuest: Quest = {
        id: spot.id,
        name: spot.name,
        region: spot.region,
        type: 'repeatable_grind',
        minLevel: spot.minLevel,
        baseXp: spot.xpPerRun,
        gold: spot.goldPerRun,
        isRepeatable: true,
        targetEnemy: spot.targetEnemies,
        notes: spot.description,
        authorName: spot.authorName,
        authorClan: spot.authorClan,
        server: spot.server,
        createdAt: Date.now()
      };
      handleAddCustomQuest(newQuest, spot.runsToLevel || 3);
    }
  };

  const handleToggleTrial = (trialKey: string) => {
    setCompletedTrials((prev) => {
      const next = { ...prev, [trialKey]: !prev[trialKey] };
      const isCompleted = next[trialKey];
      showToast(isCompleted ? 'Job Target marked as completed!' : 'Job Target unmarked');
      return next;
    });
  };

  // --- Auth Handlers ---
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setIsSessionStarted(true);
    if (user.mainVocation) {
      setSelectedVocation(user.mainVocation);
    }
    if (user.progress) {
      if (user.progress.gameVersion) setGameVersion(user.progress.gameVersion);
      if (user.progress.selectedVocation) setSelectedVocation(user.progress.selectedVocation);
      if (typeof user.progress.currentLevel === 'number') setCurrentLevel(user.progress.currentLevel);
      if (typeof user.progress.currentXp === 'number') setCurrentXp(user.progress.currentXp);
      if (typeof user.progress.targetLevel === 'number') setTargetLevel(user.progress.targetLevel);
      if (user.progress.boosters) setBoosters(user.progress.boosters);
      if (user.progress.completedTrials) setCompletedTrials(user.progress.completedTrials);
      if (user.progress.plannedQuests) setPlannedQuests(user.progress.plannedQuests);
    }
    showToast(`Welcome back, Arisen ${user.characterName || user.username}!`);
  };

  const handleGuest = () => {
    const guestUser: UserProfile = {
      id: 'guest',
      username: 'Guest Arisen',
      characterName: 'Guest Arisen',
      mainVocation: selectedVocation,
      mainVocations: [selectedVocation],
      servers: ['Rising'],
      title: 'Wandering Arisen',
      clanTag: '',
      bio: 'Exploring Dragon\'s Dogma Online as a Guest.',
      avatarIcon: 'flame',
      avatarColor: 'amber',
      isGuest: true,
      createdAt: Date.now(),
      lastLoginAt: Date.now()
    };
    setCurrentUser(guestUser);
    sessionStorage.setItem('ddon_guest_session', 'true');
    setIsSessionStarted(true);
    showToast('Browsing in Guest Mode (Click Flame Icon in header to save profile)');
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setCurrentUser(updated);
    if (updated.mainVocation) {
      setSelectedVocation(updated.mainVocation);
    }
    showToast(`Profile updated for ${updated.characterName || updated.username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('ddon_current_user');
    sessionStorage.removeItem('ddon_guest_session');
    setCurrentUser(null);
    setIsSessionStarted(false);
    setIsProfileModalOpen(false);
    showToast('Logged out successfully');
  };

  const handleOpenAuthScreen = () => {
    setIsProfileModalOpen(false);
    setIsSessionStarted(false);
  };

  // If user has not logged in or chosen guest mode yet, show Welcome screen first
  if (!isSessionStarted) {
    return (
      <WelcomeAuthScreen
        onLogin={handleLogin}
        onContinueAsGuest={handleGuest}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Header
        currentLevel={currentLevel}
        targetLevel={targetLevel}
        boosters={boosters}
        onToggleRing={handleToggleRing}
        onReset={handleReset}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        plannedCount={plannedQuests.length}
        gameVersion={gameVersion}
        onSelectVersion={handleSelectVersion}
        currentUser={currentUser}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        navLayout={navLayout}
        onToggleNavLayout={handleToggleNavLayout}
        uiMode={uiMode}
        onToggleUiMode={handleToggleUiMode}
        isMobileMenuOpen={isDrawerOpen}
        onToggleMobileMenu={() => setIsDrawerOpen((prev) => !prev)}
      />

      {/* Mobile Drawer Menu (Pop-up with all 13 pages triggered by 3-bars button) */}
      <MobileDrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsDrawerOpen(false);
        }}
        plannedCount={plannedQuests.length}
        uiMode={uiMode}
        onToggleUiMode={handleToggleUiMode}
        gameVersion={gameVersion}
        onSelectVersion={handleSelectVersion}
        currentLevel={currentLevel}
        targetLevel={targetLevel}
        boosters={boosters}
        onToggleRing={handleToggleRing}
        currentUser={currentUser}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Body with Dynamic Top/Sidebar Flex Layout */}
      <div className={`flex-1 flex ${uiMode === 'desktop' && navLayout === 'sidebar' ? 'flex-col md:flex-row' : 'flex-col'}`}>
        
        {/* Left Sidebar Navigation (Rendered ONLY in desktop mode when navLayout === 'sidebar') */}
        {uiMode === 'desktop' && navLayout === 'sidebar' && (
          <aside className="w-full md:w-64 shrink-0 bg-slate-900/90 border-b md:border-b-0 md:border-r border-amber-500/20 p-3 md:p-4 space-y-1.5 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto z-30">
            <div className="flex items-center justify-between px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-2">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <PanelLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>Pages Menu</span>
              </span>
              <button
                onClick={handleToggleNavLayout}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px] lowercase font-sans cursor-pointer hover:underline"
                title="Switch back to top bar"
              >
                <PanelTop className="w-3 h-3" />
                <span>top bar</span>
              </button>
            </div>

            <nav className="space-y-1">
              <button
                id="sidebar-tab-calculator"
                onClick={() => setActiveTab('calculator')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'calculator'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span className="truncate">Level Progress & Goal</span>
              </button>

              <button
                id="sidebar-tab-vocations"
                onClick={() => setActiveTab('vocations')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'vocations'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Swords className="w-4 h-4 shrink-0" />
                <span className="truncate">Vocations & Job Targets</span>
              </button>

              <button
                id="sidebar-tab-quests"
                onClick={() => setActiveTab('quests')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'quests'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Flame className="w-4 h-4 shrink-0" />
                <span className="truncate">Quest Database</span>
              </button>

              <button
                id="sidebar-tab-planner"
                onClick={() => setActiveTab('planner')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between gap-3 transition-all cursor-pointer text-left relative ${
                  activeTab === 'planner'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Award className="w-4 h-4 shrink-0" />
                  <span className="truncate">Quest Planner</span>
                </div>
                {plannedQuests.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold shrink-0 ${
                    activeTab === 'planner'
                      ? 'bg-slate-950 text-amber-300'
                      : 'bg-amber-500 text-slate-950'
                  }`}>
                    {plannedQuests.length}
                  </span>
                )}
              </button>

              <button
                id="sidebar-tab-leaderboard"
                onClick={() => setActiveTab('leaderboard')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'leaderboard'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4 shrink-0" />
                <span className="truncate">Leaderboard</span>
              </button>

              <button
                id="sidebar-tab-journal"
                onClick={() => setActiveTab('journal')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'journal'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span className="truncate">Ask the Assistant</span>
              </button>

              <button
                id="sidebar-tab-map"
                onClick={() => setActiveTab('map')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'map'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Map className="w-4 h-4 shrink-0" />
                <span className="truncate">Find resources & enemies</span>
              </button>

              <button
                id="sidebar-tab-items"
                onClick={() => setActiveTab('items')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'items'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <PackageCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">Item Library</span>
              </button>

              <button
                id="sidebar-tab-knowledge"
                onClick={() => setActiveTab('knowledge')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'knowledge'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Library className="w-4 h-4 shrink-0" />
                <span className="truncate">Knowledge Library</span>
              </button>

              <button
                id="sidebar-tab-bestiary"
                onClick={() => setActiveTab('bestiary')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'bestiary'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Skull className="w-4 h-4 shrink-0" />
                <span className="truncate">Bestiary & Enemies</span>
              </button>

              <button
                id="sidebar-tab-fast-routes"
                onClick={() => setActiveTab('fast_routes')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'fast_routes'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span className="truncate">Leveling Routes</span>
              </button>

              <button
                id="sidebar-tab-guides"
                onClick={() => setActiveTab('guides')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'guides'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span className="truncate">Guides</span>
              </button>

              <button
                id="sidebar-tab-table"
                onClick={() => setActiveTab('table')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'table'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Table className="w-4 h-4 shrink-0" />
                <span className="truncate">Lv 1–{getMaxLevelForVersion(gameVersion)} Table</span>
              </button>

              <button
                id="sidebar-tab-feedback"
                onClick={() => setActiveTab('feedback')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer text-left ${
                  activeTab === 'feedback'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <MessageSquarePlus className="w-4 h-4 shrink-0" />
                <span className="truncate">Feedback</span>
              </button>
            </nav>
          </aside>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 ${uiMode === 'mobile' ? 'pb-28' : ''}`}>
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-300 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs sm:text-sm">{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Level Overview & Goal Simulator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <LevelOverviewCard
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
              currentXp={currentXp}
              setCurrentXp={setCurrentXp}
              targetLevel={targetLevel}
              setTargetLevel={setTargetLevel}
              boosters={boosters}
              setBoosters={setBoosters}
              onGoToPlanner={() => setActiveTab('planner')}
              gameVersion={gameVersion}
            />

            {/* Community Farm Spots & Player Grind Routes Browser */}
            <CommunityFarmSpotsBrowser
              currentUser={currentUser}
              onOpenAuth={handleOpenAuthScreen}
              onAddSpotToPlan={handleAddSpotToPlan}
            />

            {/* Quick Planner Preview Section on Main Tab */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Active Leveling Plan Preview
                </h3>
                <button
                  onClick={() => setActiveTab('planner')}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  View Full Planner ({plannedQuests.length} Quests) →
                </button>
              </div>

              <QuestPlanner
                currentLevel={currentLevel}
                setCurrentLevel={setCurrentLevel}
                currentXp={currentXp}
                setCurrentXp={setCurrentXp}
                targetLevel={targetLevel}
                boosters={boosters}
                setBoosters={setBoosters}
                plannedQuests={plannedQuests}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveQuest={handleRemoveQuest}
                onClearPlan={handleClearPlan}
                onLoadPreset={handleLoadPreset}
                onGoToDatabase={() => setActiveTab('quests')}
                onOpenCustomQuestModal={() => setIsCustomModalOpen(true)}
                gameVersion={gameVersion}
                currentUser={currentUser}
                onOpenAuth={handleOpenAuthScreen}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Quest Database with search & filters */}
        {activeTab === 'quests' && (
          <QuestDatabase
            currentLevel={currentLevel}
            targetLevel={targetLevel}
            boosters={boosters}
            plannedQuests={plannedQuests}
            onAddQuest={handleAddQuest}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenCustomQuestModal={() => setIsCustomModalOpen(true)}
          />
        )}

        {/* Tab 3: Dedicated Quest Planner Page */}
        {activeTab === 'planner' && (
          <QuestPlanner
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            currentXp={currentXp}
            setCurrentXp={setCurrentXp}
            targetLevel={targetLevel}
            boosters={boosters}
            setBoosters={setBoosters}
            plannedQuests={plannedQuests}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveQuest={handleRemoveQuest}
            onClearPlan={handleClearPlan}
            onLoadPreset={handleLoadPreset}
            onGoToDatabase={() => setActiveTab('quests')}
            onOpenCustomQuestModal={() => setIsCustomModalOpen(true)}
            gameVersion={gameVersion}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuthScreen}
          />
        )}

        {/* Tab 4: Vocations, Skills, Augments & Job Targets */}
        {activeTab === 'vocations' && (
          <VocationSkillTree
            currentLevel={currentLevel}
            selectedVocation={selectedVocation}
            onSelectVocation={setSelectedVocation}
            gameVersion={gameVersion}
            completedTrials={completedTrials}
            onToggleTrial={handleToggleTrial}
          />
        )}

        {/* Tab 5: Find resources and enemies (Interactive Map & Spot Search) */}
        {activeTab === 'map' && (
          <FindResourcesAndEnemies
            initialSearchQuery={spotSearchQuery}
            initialCategory={spotSearchCategory}
            initialStageScope={spotSearchStageScope}
            onClearInitialSearch={() => setSpotSearchQuery('')}
          />
        )}

        {/* Tab 6: Item Library */}
        {activeTab === 'items' && (
          <ItemLibrary
            onSelectItemForSpotSearch={handleSelectItemForSpotSearch}
          />
        )}

        {/* Tab 7: Leveling Routes (Community & Official Speed Guides) */}
        {activeTab === 'fast_routes' && (
          <LevelingRoutes
            onLoadPreset={handleLoadPreset}
            onGoToPlanner={() => setActiveTab('planner')}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuthScreen}
            activePlannedQuests={plannedQuests}
          />
        )}

        {/* Tab 8: Bestiary & Monster Compendium */}
        {activeTab === 'bestiary' && (
          <Bestiary
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Tab 9: Knowledge Library */}
        {activeTab === 'knowledge' && (
          <KnowledgeLibrary
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Tab 10: Interactive Guides Compendium & Sub-Pages Creator */}
        {activeTab === 'guides' && (
          <AdventureGuides
            onNavigateToTab={(tab) => setActiveTab(tab)}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuthScreen}
          />
        )}

        {/* Tab 11: Ask the Journal Knowledge Base & Q&A */}
        {activeTab === 'journal' && (
          <AskTheJournal
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Tab 12: Speedrun Leaderboard & speedrun.com Portal */}
        {activeTab === 'leaderboard' && (
          <Leaderboards />
        )}

        {/* Tab 13: Level Reference Table */}
        {activeTab === 'table' && (
          <LevelTableViewer
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            setTargetLevel={setTargetLevel}
            gameVersion={gameVersion}
          />
        )}

        {/* Tab 14: Public Community Feedback & Feature Requests */}
        {activeTab === 'feedback' && (
          <FeedbackPage
            currentUser={currentUser}
            onOpenAuth={handleOpenAuthScreen}
          />
        )}
      </main>
      </div>

      {/* Custom Quest / Mob Grind Modal */}
      <CustomQuestModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onAddCustomQuest={handleAddCustomQuest}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuthScreen}
      />

      {/* Arisen Profile & Account Information Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateProfile}
        onLogout={handleLogout}
        onOpenAuthScreen={handleOpenAuthScreen}
        currentLevel={currentLevel}
      />

      {/* Cross-Platform Community Sponsor / Ad Banner */}
      <SponsorAdBanner placement="bottom_sticky" />

      {/* First-Launch GDPR & Privacy Consent Dialog */}
      <GDPRConsentModal />

      {/* Mobile Friendly Bottom Quick Action Bar (Visible exclusively in Mobile UI mode) */}
      {uiMode === 'mobile' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 border-t border-amber-500/30 backdrop-blur-md px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
          <button
            onClick={() => {
              setActiveTab('calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'calculator' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Progress</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vocations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'vocations' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Vocations</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('quests');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'quests' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Quests</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'planner' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Planner</span>
            {plannedQuests.length > 0 && (
              <span className="absolute top-0 right-1.5 w-4 h-4 bg-amber-500 text-slate-950 rounded-full text-[9px] font-bold flex items-center justify-center">
                {plannedQuests.length}
              </span>
            )}
          </button>

          {/* 3-bars button on bottom bar to pop up all pages */}
          <button
            id="btn-bottom-bar-3-bars"
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all cursor-pointer shadow-sm"
            title="Open all pages menu (3 bars)"
          >
            <Menu className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">All Pages</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-500 py-6 pb-24 sm:pb-8 text-center text-xs space-y-2.5">
        <p className="font-semibold text-slate-400">
          DDO Multi Tool Assistant • Built for Dogma Rising Private Server
        </p>
        <p className="text-[11px] text-slate-500">
          Season {gameVersion} configuration • Max Cap Level {getMaxLevelForVersion(gameVersion)} • 50% XP ring boost cutoff mechanics • Full Job Training Targets, Item Library & Multi Tool Assistant.
        </p>
        <p className="text-[10px] text-slate-500/80 max-w-3xl mx-auto px-4 leading-relaxed">
          This app is an unofficial, fan-made tool and is not affiliated with, endorsed, sponsored, or specifically approved by Capcom Co., Ltd. All game assets, trademarks, and copyright material belong to Capcom.
        </p>
        <div className="pt-1 flex items-center justify-center">
          <a
            href="https://ko-fi.com/smutnymanga7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-slate-400 hover:text-amber-300 text-xs transition-colors"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>If you want support me Buy me a Ko-fi</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
