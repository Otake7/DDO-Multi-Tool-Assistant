import React, { useState } from 'react';
import { 
  Map, 
  ExternalLink, 
  RotateCw, 
  Maximize2,
  Compass,
  Globe
} from 'lucide-react';

const MAP_URL = 'https://play.dogmarising.org/interactive-map';

interface FindResourcesAndEnemiesProps {
  initialSearchQuery?: string;
  initialCategory?: any;
  initialStageScope?: any;
  onClearInitialSearch?: () => void;
}

export const FindResourcesAndEnemies: React.FC<FindResourcesAndEnemiesProps> = () => {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Top Banner & Hyperlink Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Map className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 flex-wrap">
                <span>Find resources and enemies</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  Dogma Rising Interactive World Map
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Explore Lestania's full world map with interactive pins for gathering nodes, enemy spawn zones, Job Training Trials (ジョブ修練), regional quest locations, and treasure chests.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Direct Link: </span>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-300 font-mono font-medium flex items-center gap-1"
              >
                play.dogmarising.org/interactive-map
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
            <button
              onClick={() => setIframeKey(k => k + 1)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Reload Interactive Map frame"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reload Map</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Toggle Fullscreen Map View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isFullscreen ? 'Exit Full Screen' : 'Expand View'}</span>
            </button>

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Open Dogma Rising Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Interactive Map Container */}
      <div className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 bg-slate-950 flex flex-col' : 'relative'
      }`}>
        {/* Frame Top Header Bar */}
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-slate-400">play.dogmarising.org/interactive-map</span>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold text-[11px]"
            >
              <span>Launch in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Map iframe */}
        <div className={`w-full ${isFullscreen ? 'flex-1 h-full' : 'h-[750px] sm:h-[820px]'}`}>
          <iframe
            key={iframeKey}
            src={MAP_URL}
            title="Dogma Rising Interactive Map"
            className="w-full h-full border-0 bg-slate-950"
            allow="fullscreen; clipboard-read; clipboard-write"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
