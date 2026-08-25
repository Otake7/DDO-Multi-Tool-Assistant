import React, { useState } from 'react';
import { X, Plus, Sparkles, Coins, MapPin, Swords, Shield, User } from 'lucide-react';
import { Quest, QuestType, Region, UserProfile } from '../types';
import { REGIONS } from '../data/quests';

interface CustomQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomQuest: (quest: Quest, initialQuantity: number) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const CustomQuestModal: React.FC<CustomQuestModalProps> = ({
  isOpen,
  onClose,
  onAddCustomQuest,
  currentUser,
  onOpenAuth
}) => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState<Region>('White Dragon Temple');
  const [type, setType] = useState<QuestType>('repeatable_grind');
  const [minLevel, setMinLevel] = useState(1);
  const [baseXp, setBaseXp] = useState(10000);
  const [gold, setGold] = useState(2500);
  const [bloodOrbs, setBloodOrbs] = useState(0);
  const [targetEnemy, setTargetEnemy] = useState('');
  const [isRepeatable, setIsRepeatable] = useState(true);
  const [initialQuantity, setInitialQuantity] = useState(5);

  if (!isOpen) return null;

  const isGuest = !currentUser || currentUser.isGuest;

  if (isGuest) {
    return (
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
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Creating custom grind spots and personal farm routes is only available to logged-in Arisen accounts. This ensures your custom spots are saved to your profile and attributed with your character name across the tool.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                onClose();
                if (onOpenAuth) onOpenAuth();
              }}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Log In / Create Account</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const authorName = currentUser.characterName || currentUser.username || 'Arisen';
    const authorClan = currentUser.clanTag || undefined;
    const server = currentUser.servers?.[0] || 'Rising';

    const newQuest: Quest = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      region,
      type,
      minLevel: Math.max(1, Math.min(93, minLevel)),
      baseXp: Math.max(1, baseXp),
      gold: Math.max(0, gold),
      bloodOrbs: Math.max(0, bloodOrbs),
      targetEnemy: targetEnemy.trim() || undefined,
      isRepeatable,
      notes: 'Custom spot or server event grind',
      authorName,
      authorClan,
      server,
      createdAt: Date.now()
    };

    onAddCustomQuest(newQuest, Math.max(1, initialQuantity));
    onClose();
  };

  const authorDisplayName = currentUser.characterName || currentUser.username;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Add Custom Quest / Mob Grind Spot
              </h3>
              <p className="text-[11px] text-slate-400">
                Created by <span className="text-amber-400 font-semibold">{authorDisplayName}</span>
                {currentUser.clanTag && <span className="text-slate-400"> {currentUser.clanTag}</span>}
                <span className="text-slate-500 font-mono"> • {currentUser.servers?.[0] || 'Rising'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Quest / Grind Spot Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gran Soren Orc Camp, Taro 100 Mob Loop..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
            />
          </div>

          {/* Region & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Quest Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestType)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="repeatable_grind">Repeatable Grind</option>
                <option value="board">Notice Board Quest</option>
                <option value="world">World Quest</option>
                <option value="grand_mission">Grand Mission / Raid</option>
                <option value="main">Main Story Quest</option>
              </select>
            </div>
          </div>

          {/* Min Level & Base XP */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Min Level Requirement</label>
              <input
                type="number"
                min={1}
                max={93}
                value={minLevel}
                onChange={(e) => setMinLevel(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center justify-between">
                <span>Base XP per Run</span>
                <span className="text-amber-400 font-mono text-[10px]">Unboosted</span>
              </label>
              <input
                type="number"
                min={1}
                step={50}
                value={baseXp}
                onChange={(e) => setBaseXp(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-amber-500/40 rounded-lg px-3 py-2 text-amber-300 font-mono font-bold text-xs"
              />
            </div>
          </div>

          {/* Gold & Blood Orbs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Gold Reward</label>
              <input
                type="number"
                min={0}
                value={gold}
                onChange={(e) => setGold(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Blood Orbs (BO / AP)</label>
              <input
                type="number"
                min={0}
                value={bloodOrbs}
                onChange={(e) => setBloodOrbs(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs"
              />
            </div>
          </div>

          {/* Target Enemy */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Target Enemy / Objective (Optional)</label>
            <input
              type="text"
              value={targetEnemy}
              onChange={(e) => setTargetEnemy(e.target.value)}
              placeholder="e.g. Armored Cyclops x2, Dire Wolves x10"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-xs"
            />
          </div>

          {/* Quantity & Repeatable */}
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="custom-repeatable"
                checked={isRepeatable}
                onChange={(e) => setIsRepeatable(e.target.checked)}
                className="accent-amber-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="custom-repeatable" className="font-semibold text-slate-200 cursor-pointer">
                Repeatable Quest
              </label>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Add with runs:</span>
              <input
                type="number"
                min={1}
                max={999}
                value={initialQuantity}
                onChange={(e) => setInitialQuantity(parseInt(e.target.value) || 1)}
                className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center font-mono text-amber-300 font-bold text-xs"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Add to Calculator & Planner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
