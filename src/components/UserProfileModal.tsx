import React, { useState } from 'react';
import {
  X,
  Flame,
  User,
  Shield,
  Swords,
  Edit3,
  Check,
  LogOut,
  Calendar,
  Tag,
  KeyRound,
  Sparkles,
  Users,
  AlertCircle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { UserProfile, VocationId } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onOpenAuthScreen: () => void;
  currentLevel: number;
}

const VOCATION_INFO: Record<VocationId, { name: string; icon: string; role: string; color: string }> = {
  fighter: { name: 'Fighter', icon: '⚔️', role: 'Attacker (Physical)', color: 'text-amber-400' },
  hunter: { name: 'Hunter', icon: '🏹', role: 'Attacker (Physical)', color: 'text-emerald-400' },
  priest: { name: 'Priest', icon: '✨', role: 'Healer / Support', color: 'text-cyan-400' },
  shield_sage: { name: 'Shield Sage', icon: '🛡️', role: 'Tank', color: 'text-blue-400' },
  seeker: { name: 'Seeker', icon: '🗡️', role: 'Attacker (Physical)', color: 'text-red-400' },
  sorcerer: { name: 'Sorcerer', icon: '🔮', role: 'Attacker (Magick)', color: 'text-purple-400' },
  element_archer: { name: 'Element Archer', icon: '🌿', role: 'Healer / Support & Ranged', color: 'text-teal-400' },
  warrior: { name: 'Warrior', icon: '🪓', role: 'Attacker (Physical)', color: 'text-orange-400' },
  alchemist: { name: 'Alchemist', icon: '🧪', role: 'Tank & Aggro Control', color: 'text-yellow-400' },
  spirit_lancer: { name: 'Spirit Lancer', icon: '🔱', role: 'Attacker & Buff Support', color: 'text-indigo-400' },
  high_scepter: { name: 'High Scepter', icon: '🪄', role: 'Attacker (Physical & Magick)', color: 'text-rose-400' },
};

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onLogout,
  onOpenAuthScreen,
  currentLevel
}) => {
  if (!isOpen) return null;

  const isGuest = !currentUser || currentUser.isGuest;

  // Edit Mode state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [charName, setCharName] = useState<string>(currentUser?.characterName || 'Guest Arisen');
  const [vocations, setVocations] = useState<VocationId[]>(
    currentUser?.mainVocations && currentUser.mainVocations.length > 0
      ? currentUser.mainVocations
      : [currentUser?.mainVocation || 'fighter']
  );
  const [servers, setServers] = useState<string[]>(
    currentUser?.servers && currentUser.servers.length > 0 ? currentUser.servers : ['Rising']
  );
  const [title, setTitle] = useState<string>(currentUser?.title || 'Arisen of Lestania');
  const [clanTag, setClanTag] = useState<string>(currentUser?.clanTag || '');
  const [bio, setBio] = useState<string>(currentUser?.bio || '');
  const [password, setPassword] = useState<string>(currentUser?.password || '');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const AVAILABLE_SERVERS = ['Rising', 'Revival', 'Legacy', 'Others'];

  const toggleServer = (server: string) => {
    setServers((prev) => {
      if (prev.includes(server)) {
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== server);
      } else {
        return [...prev, server];
      }
    });
  };

  const toggleVocation = (vId: VocationId) => {
    setVocations((prev) => {
      if (prev.includes(vId)) {
        if (prev.length === 1) return prev;
        return prev.filter((v) => v !== vId);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), vId];
        }
        return [...prev, vId];
      }
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: UserProfile = {
      ...currentUser,
      characterName: charName.trim() || currentUser.username,
      mainVocation: vocations[0] || 'fighter',
      mainVocations: vocations.length > 0 ? vocations : ['fighter'],
      servers: servers.length > 0 ? servers : ['Rising'],
      title: title.trim(),
      clanTag: clanTag.trim(),
      bio: bio.trim(),
      password: password.trim() || undefined,
      isGuest: false // If guest edits and saves, upgrades to local account
    };

    // Sync to PostgreSQL backend if online
    if (!currentUser.isGuest) {
      try {
        fetch('/api/auth/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: updated.id,
            characterName: updated.characterName,
            mainVocation: updated.mainVocation,
            mainVocations: updated.mainVocations,
            servers: updated.servers,
            clanTag: updated.clanTag,
            title: updated.title,
            bio: updated.bio,
            avatarIcon: updated.avatarIcon,
            avatarColor: updated.avatarColor,
          })
        }).catch((err) => console.warn('[Profile Update] Backend sync skipped:', err));
      } catch (e) {
        // ignore
      }
    }

    // Update in localStorage
    localStorage.setItem('ddon_current_user', JSON.stringify(updated));

    const saved = localStorage.getItem('ddon_saved_accounts');
    let accounts: UserProfile[] = saved ? JSON.parse(saved) : [];
    const existingIndex = accounts.findIndex((a) => a.id === updated.id);
    if (existingIndex >= 0) {
      accounts[existingIndex] = updated;
    } else {
      accounts.push(updated);
    }
    localStorage.setItem('ddon_saved_accounts', JSON.stringify(accounts));

    onUpdateUser(updated);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const vocInfo = VOCATION_INFO[currentUser?.mainVocation || 'fighter'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            {/* Visual Flame Icon matching uploaded image */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>Arisen Profile & Account Information</span>
              </h2>
              <p className="text-xs text-slate-400">
                {isGuest ? 'Guest Session details' : `Logged in as @${currentUser?.username}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Profile information updated successfully!</span>
            </div>
          )}

          {/* Profile Card Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3.5">
                {/* Avatar container */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[13px] flex items-center justify-center">
                    <Flame className="w-7 h-7 text-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-extrabold text-slate-100">
                      {currentUser?.characterName || 'Guest Arisen'}
                    </h3>
                    {currentUser?.clanTag && (
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {currentUser.clanTag}
                      </span>
                    )}
                    {isGuest ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                        Guest Mode
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                        Active Account
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-400/90 font-medium">
                    {currentUser?.title || 'Wandering Arisen'}
                  </p>
                </div>
              </div>

              {!isGuest && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Main Vocation(s)</span>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {(currentUser?.mainVocations && currentUser.mainVocations.length > 0
                    ? currentUser.mainVocations
                    : [currentUser?.mainVocation || 'fighter']
                  ).map((vId) => {
                    const info = VOCATION_INFO[vId];
                    return (
                      <span
                        key={vId}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-semibold"
                      >
                        <span>{info?.icon}</span>
                        <span>{info?.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Current Level</span>
                <span className="font-bold font-mono text-amber-400 mt-1 block">
                  Lv {currentLevel}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Server(s)</span>
                <div className="flex flex-wrap items-center gap-1 mt-1">
                  {(currentUser?.servers && currentUser.servers.length > 0
                    ? currentUser.servers
                    : ['Rising']
                  ).map((srv) => (
                    <span
                      key={srv}
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio section */}
            {currentUser?.bio && !isEditing && (
              <div className="pt-2 text-xs text-slate-300/90 leading-relaxed italic bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                "{currentUser.bio}"
              </div>
            )}
          </div>

          {/* ================= EDIT MODE ================= */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="space-y-4 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Profile Information</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Character Name
                  </label>
                  <input
                    type="text"
                    value={charName}
                    onChange={(e) => setCharName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Honor Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Dragonforged Arisen"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              {/* Server Multi-Select */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Game Server(s) Played At
                  </label>
                  <span className="text-[11px] text-slate-400">Select all that apply</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_SERVERS.map((server) => {
                    const isSelected = servers.includes(server);
                    return (
                      <button
                        key={server}
                        type="button"
                        onClick={() => toggleServer(server)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
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
                    Main Vocations (Pick up to 3)
                  </label>
                  <span className="text-[11px] text-amber-400/90 font-medium">
                    {vocations.length}/3 selected
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {(Object.keys(VOCATION_INFO) as VocationId[]).map((vId) => {
                    const isSelected = vocations.includes(vId);
                    const selectedIndex = vocations.indexOf(vId);
                    const v = VOCATION_INFO[vId];
                    return (
                      <button
                        key={vId}
                        type="button"
                        onClick={() => toggleVocation(vId)}
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
                    Guild / Clan Tag
                  </label>
                  <input
                    type="text"
                    value={clanTag}
                    onChange={(e) => setClanTag(e.target.value)}
                    placeholder="e.g. [Rising]"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Password / PIN (Optional)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set or update PIN code"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Arisen Bio / Notes
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  placeholder="Notes on current build, pawn party setups, or farming goals..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Password / PIN (Optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set or update PIN code"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* ================= GUEST CONVERSION PROMPT ================= */}
          {isGuest && !isEditing && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Save Your Leveling & Planner Data</span>
              </div>
              <p className="text-xs text-slate-300">
                You are currently in guest mode. You can create a named Arisen profile to keep your goals, quest plan, and presets organized across sessions.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuthScreen();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Log In or Create Account</span>
                </button>
              </div>
            </div>
          )}

          {/* Account Management Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAuthScreen();
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Switch / Change Account</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isGuest ? 'Exit Guest Session' : 'Log Out'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
