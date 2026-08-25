import React from 'react';
import { Sparkles, Swords, Shield, Zap, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { LEVELING_PRESETS } from '../data/levelingPresets';

interface DogmaRisingGuidesProps {
  onLoadPreset: (presetId: string) => void;
  onGoToPlanner: () => void;
}

export const DogmaRisingGuides: React.FC<DogmaRisingGuidesProps> = ({
  onLoadPreset,
  onGoToPlanner
}) => {
  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              Dogma Rising Power-Leveling Strategy Guide
            </h2>
            <p className="text-xs text-slate-400">
              Essential tips for maximizing Notice Board quest repeat loops, booster stacking, and rapid progression to Lv 93.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Tip 1: 50% XP Ring */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>1. Equip the 50% XP Ring</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always keep the 50% Level Up Speed Booster Ring equipped from Level 1 all the way up to Level 89. It provides an uninterrupted +50% XP multiplier on all quest hand-ins and mob kills until Level 90.
            </p>
          </div>

          {/* Tip 2: Board Quest Density */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>2. Notice Board Loops</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Repeatable Board Quests (e.g. Tel Goblins, Misriu Dread Apes, Volden Miners, Megado Enforcers) can be stacked and turned in repeatedly. Use our <strong>Planner tab</strong> with repeat quantities (e.g. 10x runs) to map exact routes.
            </p>
          </div>

          {/* Tip 3: Pawn Composition */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>3. Fast Clear Pawn Setup</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bring a high-level Sorcerer, Alchemist or High Scepter and Elementar Archer support pawn for quickest possible progress (note that if you are playing on Rising server if the pawn have 21+ more levels than your lowest level in team, you wont be getting any XP)
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Routes Step-by-Step */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          <span>Dogma Rising Leveling Route Roadmap (1 → 93)</span>
        </h3>

        <div className="space-y-4">
          {LEVELING_PRESETS.map((preset, idx) => (
            <div
              key={preset.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-amber-500/40 transition-all"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100">{preset.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {preset.levelRange}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {preset.description}
                </p>
                <div className="text-[11px] text-slate-500">
                  Region: <strong className="text-slate-300">{preset.region}</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  onLoadPreset(preset.id);
                  onGoToPlanner();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 hover:border-amber-400 transition-all whitespace-nowrap"
              >
                Load into Planner
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
