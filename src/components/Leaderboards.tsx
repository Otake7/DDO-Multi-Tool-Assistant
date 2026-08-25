import React, { useState } from 'react';
import { 
  Trophy, 
  ExternalLink, 
  RefreshCw, 
  Globe, 
  Crown,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export const Leaderboards: React.FC = () => {
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);

  const speedrunUrl = 'https://www.speedrun.com/dragons_dogma_online';

  const handleRefreshIframe = () => {
    setIframeLoaded(false);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold font-mono border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>SPEEDRUN LEADERBOARD</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>speedrun.com/dragons_dogma_online</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Live Speedrun.com Portal</span>
              <Crown className="w-5 h-5 text-amber-400" />
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official Dragon's Dogma Online global leaderboards, time trials, and verified speedruns.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleRefreshIframe}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Refresh Speedrun portal view"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reload Frame</span>
            </button>

            <a
              href={speedrunUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Speedrun.com Portal */}
      <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col">
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
            </div>
            <span className="font-mono text-slate-300 text-xs ml-2 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
              https://www.speedrun.com/dragons_dogma_online
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshIframe}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="Reload frame"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a
              href={speedrunUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors"
              title="Open full site externally"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Loading State Overlay */}
        {!iframeLoaded && (
          <div className="absolute inset-0 top-12 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm z-20 space-y-3 pointer-events-none min-h-[600px]">
            <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Loading Speedrun.com Portal...</p>
          </div>
        )}

        {/* Live Speedrun.com Embed */}
        <iframe
          key={iframeKey}
          src={speedrunUrl}
          title="Dragon's Dogma Online Speedrun Leaderboard"
          className="w-full border-0 h-[85vh] min-h-[750px] bg-slate-950"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation"
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>
    </div>
  );
};
