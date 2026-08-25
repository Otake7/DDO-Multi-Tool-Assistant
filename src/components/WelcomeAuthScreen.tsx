import React, { useState } from 'react';
import {
  Flame,
  User,
  Shield,
  Swords,
  Lock,
  Sparkles,
  ArrowRight,
  UserCheck,
  Crown,
  Compass,
  Zap,
  Check,
  AlertCircle,
  HelpCircle,
  KeyRound,
  Users
} from 'lucide-react';
import { UserProfile, VocationId } from '../types';

interface WelcomeAuthScreenProps {
  onLogin: (user: UserProfile) => void;
  onContinueAsGuest: () => void;
}

const VOCATION_OPTIONS: { id: VocationId; name: string; icon: string; color: string }[] = [
  { id: 'fighter', name: 'Fighter', icon: '⚔️', color: 'text-amber-400' },
  { id: 'hunter', name: 'Hunter', icon: '🏹', color: 'text-emerald-400' },
  { id: 'priest', name: 'Priest', icon: '✨', color: 'text-cyan-400' },
  { id: 'shield_sage', name: 'Shield Sage', icon: '🛡️', color: 'text-blue-400' },
  { id: 'seeker', name: 'Seeker', icon: '🗡️', color: 'text-red-400' },
  { id: 'sorcerer', name: 'Sorcerer', icon: '🔮', color: 'text-purple-400' },
  { id: 'element_archer', name: 'Element Archer', icon: '🌿', color: 'text-teal-400' },
  { id: 'warrior', name: 'Warrior', icon: '🪓', color: 'text-orange-400' },
  { id: 'alchemist', name: 'Alchemist', icon: '🧪', color: 'text-yellow-400' },
  { id: 'spirit_lancer', name: 'Spirit Lancer', icon: '🔱', color: 'text-indigo-400' },
  { id: 'high_scepter', name: 'High Scepter', icon: '🪄', color: 'text-rose-400' },
];

export const WelcomeAuthScreen: React.FC<WelcomeAuthScreenProps> = ({
  onLogin,
  onContinueAsGuest
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'guest'>('login');
  
  // Login Form
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register Form
  const [regUsername, setRegUsername] = useState<string>('');
  const [regCharacterName, setRegCharacterName] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regServers, setRegServers] = useState<string[]>(['Rising']);
  const [regVocations, setRegVocations] = useState<VocationId[]>(['fighter']);
  const [regClanTag, setRegClanTag] = useState<string>('');
  const [regTitle, setRegTitle] = useState<string>('Dragonforged Arisen');
  const [regBio, setRegBio] = useState<string>('');
  const [regError, setRegError] = useState<string | null>(null);

  // Available Server Options
  const AVAILABLE_SERVERS = ['Rising', 'Revival', 'Legacy', 'Others'];

  const toggleServer = (server: string) => {
    setRegServers((prev) => {
      if (prev.includes(server)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((s) => s !== server);
      } else {
        return [...prev, server];
      }
    });
  };

  const toggleVocation = (vId: VocationId) => {
    setRegVocations((prev) => {
      if (prev.includes(vId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((v) => v !== vId);
      } else {
        if (prev.length >= 3) {
          // If already 3, replace the oldest selection
          return [...prev.slice(1), vId];
        }
        return [...prev, vId];
      }
    });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Stored accounts for fast switching
  const [storedAccounts, setStoredAccounts] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('ddon_saved_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Handle Login (STRICT: only permits previously created accounts)
  const handlePerformLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError(null);

    const cleanUser = loginUsername.trim();
    if (!cleanUser) {
      setLoginError('Please enter your Arisen username or character name.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Attempt server-side login (backed by Aiven PostgreSQL if configured)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanUser,
          password: loginPassword.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        const user: UserProfile = data.user;

        // Cache locally for fast switching
        const saved = localStorage.getItem('ddon_saved_accounts');
        let accounts: UserProfile[] = saved ? JSON.parse(saved) : [];
        const existingIdx = accounts.findIndex((a) => a.id === user.id || a.username.toLowerCase() === user.username.toLowerCase());
        if (existingIdx >= 0) {
          accounts[existingIdx] = user;
        } else {
          accounts.push(user);
        }
        localStorage.setItem('ddon_saved_accounts', JSON.stringify(accounts));
        localStorage.setItem('ddon_current_user', JSON.stringify(user));

        onLogin(user);
        return;
      } else if (res.status === 404 || res.status === 401 || res.status === 400) {
        const errData = await res.json().catch(() => ({}));
        setLoginError(errData.error || 'Account not found. Please click "Register New Arisen" to create an account first.');
        return;
      }
    } catch (networkErr) {
      console.warn('[Auth] Server unreachable, checking local registered accounts:', networkErr);
    } finally {
      setIsLoading(false);
    }

    // 2. Client-side local storage check fallback (STRICT: no auto-creation)
    const saved = localStorage.getItem('ddon_saved_accounts');
    let accounts: UserProfile[] = saved ? JSON.parse(saved) : [];
    const found = accounts.find(
      (a) =>
        a.username.toLowerCase() === cleanUser.toLowerCase() ||
        a.characterName.toLowerCase() === cleanUser.toLowerCase()
    );

    if (found) {
      if (found.password && found.password !== loginPassword.trim()) {
        setLoginError('Incorrect password or PIN. Please try again.');
        return;
      }

      const updatedUser: UserProfile = {
        ...found,
        lastLoginAt: Date.now()
      };

      const updatedAccounts = accounts.map((a) => (a.id === updatedUser.id ? updatedUser : a));
      localStorage.setItem('ddon_saved_accounts', JSON.stringify(updatedAccounts));
      localStorage.setItem('ddon_current_user', JSON.stringify(updatedUser));

      onLogin(updatedUser);
    } else {
      setLoginError(
        `Account "${cleanUser}" does not exist. Please click "Register New Arisen" to create your account first.`
      );
    }
  };

  // Handle Registration
  const handlePerformRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    const cleanUser = regUsername.trim();
    const cleanChar = regCharacterName.trim() || cleanUser;

    if (!cleanUser) {
      setRegError('Please choose a username for your account.');
      return;
    }

    setIsLoading(true);

    const payload = {
      username: cleanUser,
      characterName: cleanChar,
      password: regPassword.trim() || undefined,
      mainVocation: regVocations[0] || 'fighter',
      mainVocations: regVocations.length > 0 ? regVocations : ['fighter'],
      servers: regServers.length > 0 ? regServers : ['Rising'],
      clanTag: regClanTag.trim(),
      title: regTitle.trim() || 'Dragonforged Arisen',
      bio: regBio.trim() || 'Leveling & exploring the world of Dragon\'s Dogma Online.',
      avatarIcon: 'flame',
      avatarColor: 'amber'
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        const newUser: UserProfile = data.user;

        const saved = localStorage.getItem('ddon_saved_accounts');
        let accounts: UserProfile[] = saved ? JSON.parse(saved) : [];
        accounts.push(newUser);
        localStorage.setItem('ddon_saved_accounts', JSON.stringify(accounts));
        localStorage.setItem('ddon_current_user', JSON.stringify(newUser));

        onLogin(newUser);
        return;
      } else {
        const errData = await res.json().catch(() => ({}));
        setRegError(errData.error || 'Failed to create account.');
        return;
      }
    } catch (networkErr) {
      console.warn('[Auth] Server registration unreachable, registering locally:', networkErr);
    } finally {
      setIsLoading(false);
    }

    // Local fallback registration
    const saved = localStorage.getItem('ddon_saved_accounts');
    let accounts: UserProfile[] = saved ? JSON.parse(saved) : [];

    if (accounts.some((a) => a.username.toLowerCase() === cleanUser.toLowerCase())) {
      setRegError(`Username "${cleanUser}" is already taken. Please choose another.`);
      return;
    }

    const newUser: UserProfile = {
      id: `arisen-${Date.now()}`,
      ...payload,
      isGuest: false,
      createdAt: Date.now(),
      lastLoginAt: Date.now()
    };

    accounts.push(newUser);
    localStorage.setItem('ddon_saved_accounts', JSON.stringify(accounts));
    localStorage.setItem('ddon_current_user', JSON.stringify(newUser));

    onLogin(newUser);
  };

  // Fast Select Stored Account
  const handleSelectStoredAccount = (acc: UserProfile) => {
    const updatedUser: UserProfile = {
      ...acc,
      lastLoginAt: Date.now()
    };
    localStorage.setItem('ddon_current_user', JSON.stringify(updatedUser));
    onLogin(updatedUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-xl bg-slate-900/95 border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          {/* Flame Icon with glowing border (matches provided visual) */}
          <div className="inline-flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-xl shadow-amber-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Flame className="w-9 h-9 text-amber-400 drop-shadow-md animate-pulse" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight flex items-center justify-center gap-2">
              <span>Dragon's Dogma Online</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40">
                Dogma Rising Assistant
              </span>
              <span className="text-xs text-slate-400 font-mono">
                v3.4 Multi-Tool
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Choose how you'd like to access your leveling simulator, quest archives, fast routes, and item library.
          </p>
        </div>

        {/* Tab Selector: Log In / Register / Guest */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950/90 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setLoginError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setRegError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('guest');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'guest'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Guest Access</span>
          </button>
        </div>

        {/* ================= MODE 1: LOG IN ================= */}
        {authMode === 'login' && (
          <form onSubmit={handlePerformLogin} className="space-y-4">
            
            {/* Quick Profile Switcher if accounts exist */}
            {storedAccounts.length > 0 && (
              <div className="space-y-2 pb-3 border-b border-slate-800">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Quick Sign-In on this Device:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {storedAccounts.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleSelectStoredAccount(acc)}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 text-left transition-all flex items-center gap-2.5 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                          {acc.characterName || acc.username}
                        </div>
                        <div className="text-[10px] text-slate-400 capitalize truncate">
                          {acc.mainVocation} • {acc.title || 'Arisen'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Username or Character Name</span>
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. Klaus, Vanessa, DogmaArisen"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Password / PIN (Optional for local account)</span>
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter PIN / Password if set"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <span>Authenticating Arisen...</span>
                ) : (
                  <>
                    <span>Enter Arisen Realm</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onContinueAsGuest}
                className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Or Continue as Guest instead</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= MODE 2: REGISTER ================= */}
        {authMode === 'register' && (
          <form onSubmit={handlePerformRegister} className="space-y-4">
            
            {regError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Account Username <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="e.g. MasterArisen"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Character Name (In-Game)
                </label>
                <input
                  type="text"
                  value={regCharacterName}
                  onChange={(e) => setRegCharacterName(e.target.value)}
                  placeholder="e.g. Klaus the Brave"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            {/* Server Multi-Select */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Game Server(s) Played At <span className="text-amber-400">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Select all that apply</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AVAILABLE_SERVERS.map((server) => {
                  const isSelected = regServers.includes(server);
                  return (
                    <button
                      key={server}
                      type="button"
                      onClick={() => toggleServer(server)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-md shadow-amber-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'border border-slate-600'}`}>
                        {isSelected ? '✓' : ''}
                      </span>
                      <span>{server}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Up to 3 Main Vocations Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Main Vocations <span className="text-amber-400">*</span>
                </label>
                <span className="text-[11px] text-amber-400/90 font-medium">
                  {regVocations.length}/3 selected (Pick up to 3)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-44 overflow-y-auto pr-1">
                {VOCATION_OPTIONS.map((v) => {
                  const isSelected = regVocations.includes(v.id);
                  const selectedIndex = regVocations.indexOf(v.id);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => toggleVocation(v.id)}
                      className={`p-2 rounded-xl text-xs border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/60 text-slate-100 font-semibold'
                          : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span>{v.icon}</span>
                        <span className="truncate">{v.name}</span>
                      </span>
                      {isSelected && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-extrabold shrink-0">
                          #{selectedIndex + 1}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Guild / Clan Tag (Optional)
                </label>
                <input
                  type="text"
                  value={regClanTag}
                  onChange={(e) => setRegClanTag(e.target.value)}
                  placeholder="e.g. [Rising], [Lestania]"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Arisen Honor Title
                </label>
                <input
                  type="text"
                  value={regTitle}
                  onChange={(e) => setRegTitle(e.target.value)}
                  placeholder="e.g. Dragon Slayer, High Sorcerer"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                PIN / Password (Optional)
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Protect profile on device"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Arisen Bio / Leveling Notes
              </label>
              <textarea
                value={regBio}
                onChange={(e) => setRegBio(e.target.value)}
                placeholder="Write goals, main party pawn setups, or preferred grinding spots..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <span>Registering Arisen...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Create & Launch Profile</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onContinueAsGuest}
                className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Continue as Guest instead</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= MODE 3: GUEST ================= */}
        {authMode === 'guest' && (
          <div className="space-y-5 text-center py-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Compass className="w-4 h-4" />
                <span>Instant Guest Exploration</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You can immediately access all calculators, databases, speedrun leaderboards, maps, and guides as a Guest without creating an account.
              </p>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300/90">
                <Flame className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>
                  <strong>Tip:</strong> Click the <span className="text-white font-bold">Flame Icon</span> in the top header at any time to check or update your profile details or register a permanent account!
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onContinueAsGuest}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Launch Assistant as Guest</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Prefer to log in with an existing account?</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer info note */}
        <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-800/80">
          <span>Dragon's Dogma Online • Dogma Rising Season 3.4 Community Toolkit</span>
        </div>
      </div>
    </div>
  );
};
