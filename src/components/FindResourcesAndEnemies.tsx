import React, { useState } from 'react';
import { 
  Map, 
  ExternalLink, 
  RotateCw, 
  Maximize2,
  Compass,
  Globe,
  Layers,
  Sparkles,
  Search,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ZonePreset {
  id: string;
  name: string;
  hash: string;
  category: 'Major Plains' | 'Coastal' | 'Highlands & Forts' | 'Endgame / Dungeon';
}

const ZONE_PRESETS: ZonePreset[] = [
  { id: 'lestania', name: 'Hidell Plains (Lestania)', hash: '#field000_m00:st0100', category: 'Major Plains' },
  { id: 'breya', name: 'Breya Coast', hash: '#field004_m00:st0104', category: 'Coastal' },
  { id: 'misery', name: 'Misery Coast', hash: '#field002_m00:st0102', category: 'Coastal' },
  { id: 'gritten', name: 'Gritten Fort Outer', hash: '#field001_m00:st0101', category: 'Highlands & Forts' },
  { id: 'temple', name: 'White Dragon Temple', hash: '#rm000_m00:st0200', category: 'Major Plains' },
  { id: 'dowe', name: 'Dowe Valley', hash: '#field003_m00:st0103', category: 'Highlands & Forts' },
  { id: 'barmika', name: 'Barmika Plains', hash: '#field005_m00:st0105', category: 'Highlands & Forts' },
];

const DIRECT_MAP_BASE = 'https://edelarrow.github.io/ddo-map-viewer-normal-channels';
const DOGMA_PORTAL_URL = 'https://play.dogmarising.org/interactive-map';
const SEIYRIA_SEARCH_URL = 'https://seiyria.com/ddon-item-locations/#';

interface FindResourcesAndEnemiesProps {
  initialSearchQuery?: string;
  initialCategory?: any;
  initialStageScope?: any;
  onClearInitialSearch?: () => void;
}

export const FindResourcesAndEnemies: React.FC<FindResourcesAndEnemiesProps> = () => {
  const [engineSource, setEngineSource] = useState<'direct' | 'portal'>('direct');
  const [selectedZoneHash, setSelectedZoneHash] = useState<string>('#field000_m00:st0100');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Search tool state
  const [searchIframeKey, setSearchIframeKey] = useState<number>(0);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(true);
  const [isSearchFullscreen, setIsSearchFullscreen] = useState<boolean>(false);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState<boolean>(false);

  // Compute active URL
  const currentUrl = engineSource === 'direct'
    ? `${DIRECT_MAP_BASE}/${selectedZoneHash}`
    : DOGMA_PORTAL_URL;

  const handleZoneSelect = (hash: string) => {
    setSelectedZoneHash(hash);
    setEngineSource('direct');
    setIsLoading(true);
    setIframeKey(k => k + 1);
  };

  const handleEngineSwitch = (engine: 'direct' | 'portal') => {
    setEngineSource(engine);
    setIsLoading(true);
    setIframeKey(k => k + 1);
  };

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
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400 flex-wrap">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Active Source: </span>
              <span className="font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {engineSource === 'direct' ? 'Direct Leaflet Engine (Bypasses double iframe)' : 'Dogma Rising Portal Shell'}
              </span>
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-300 font-mono font-medium flex items-center gap-1 ml-1"
              >
                Open in external browser
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
            <button
              id="btn-map-reload-frame"
              onClick={() => {
                setIsLoading(true);
                setIframeKey(k => k + 1);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Reload Interactive Map frame"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span>Reload Map</span>
            </button>

            <button
              id="btn-map-fullscreen-toggle"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Toggle Fullscreen Map View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isFullscreen ? 'Exit Full Screen' : 'Expand View'}</span>
            </button>

            <a
              id="btn-map-open-external"
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Engine Switcher and Quick Zone Jump Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Engine:
            </span>
            <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              <button
                id="btn-engine-direct"
                onClick={() => handleEngineSwitch('direct')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  engineSource === 'direct'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Loads directly from GitHub CDN Leaflet (remedies black center screen in desktop apps)"
              >
                Direct Engine (Recommended)
              </button>
              <button
                id="btn-engine-portal"
                onClick={() => handleEngineSwitch('portal')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  engineSource === 'portal'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Loads via play.dogmarising.org wrapper"
              >
                Dogma Rising Portal
              </button>
            </div>
          </div>
        </div>

        {/* Quick Zone Presets Bar */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Quick Zone Jump:
          </span>
          {ZONE_PRESETS.map(preset => {
            const isSelected = engineSource === 'direct' && selectedZoneHash === preset.hash;
            return (
              <button
                key={preset.id}
                id={`btn-zone-${preset.id}`}
                onClick={() => handleZoneSelect(preset.hash)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                    : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title={`Instantly jump to ${preset.name}`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map of the Rising Server (Now on top) */}
      <div 
        id="section-rising-map"
        className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
          isFullscreen ? 'fixed inset-2 sm:inset-4 z-50 bg-slate-950 flex flex-col' : 'relative'
        }`}
      >
        {/* Clarification Note Callout */}
        <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/10 border-b border-amber-500/30 px-4 sm:px-6 py-3.5 flex items-start sm:items-center gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs sm:text-sm text-amber-200 font-medium leading-snug">
            <span className="font-semibold text-amber-300">Note: </span>
            This is interactive map for the Rising server, for original setting of Dragon's Dogma online use tool below
          </div>
        </div>

        {/* Frame Top Header Bar */}
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className="font-mono text-slate-400 truncate max-w-xs sm:max-w-md">
              {currentUrl}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsLoading(true);
                setIframeKey(k => k + 1);
              }}
              className="text-slate-400 hover:text-amber-300 flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
            >
              <RotateCw className="w-3 h-3" />
              <span>Refresh Frame</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-slate-400 hover:text-amber-300 flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
              <span>{isFullscreen ? 'Restore Window' : 'Full Screen'}</span>
            </button>

            <a
              href={currentUrl}
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
        <div className={`w-full relative ${isFullscreen ? 'flex-1 h-full' : 'h-[750px] sm:h-[840px]'}`}>
          {isLoading && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-xs text-amber-300 font-medium">Initializing Map Engine...</div>
              <div className="text-[11px] text-slate-400">Loading Leaflet pins and world coordinates</div>
            </div>
          )}

          <iframe
            key={iframeKey}
            src={currentUrl}
            title="Dogma Rising Interactive Map"
            className="w-full h-full border-0 bg-slate-950"
            allow="fullscreen; geolocation; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* DDON Item Locations Search Tool (Now below the Rising Server map) */}
      <div 
        id="section-ddon-search-tool"
        className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
          isSearchFullscreen ? 'fixed inset-2 sm:inset-4 z-50 bg-slate-950 flex flex-col' : 'relative'
        }`}
      >
        {/* Search Tool Top Header Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <span>DDON Item Locations Search Tool</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                  seiyria.com
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                  Original Setting
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Original Dragon's Dogma Online drop tables & gather location database
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="btn-search-toggle-collapse"
              onClick={() => setIsSearchCollapsed(!isSearchCollapsed)}
              className="text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 font-medium text-xs cursor-pointer transition-all"
              title={isSearchCollapsed ? 'Show Search Tool Frame' : 'Collapse Search Tool Frame'}
            >
              {isSearchCollapsed ? (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Show Tool</span>
                </>
              ) : (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  <span>Collapse</span>
                </>
              )}
            </button>

            {!isSearchCollapsed && (
              <>
                <button
                  id="btn-search-reload-frame"
                  onClick={() => {
                    setIsSearchLoading(true);
                    setSearchIframeKey(k => k + 1);
                  }}
                  className="text-slate-400 hover:text-amber-300 flex items-center gap-1 font-semibold text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 cursor-pointer transition-all"
                  title="Reload search tool frame"
                >
                  <RotateCw className={`w-3 h-3 ${isSearchLoading ? 'animate-spin text-amber-400' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <button
                  id="btn-search-fullscreen-toggle"
                  onClick={() => setIsSearchFullscreen(!isSearchFullscreen)}
                  className="text-slate-400 hover:text-amber-300 flex items-center gap-1 font-semibold text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 cursor-pointer transition-all"
                  title="Toggle Fullscreen Search View"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span className="hidden sm:inline">{isSearchFullscreen ? 'Restore' : 'Expand'}</span>
                </button>
              </>
            )}

            <a
              id="btn-search-open-external"
              href={SEIYRIA_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search Tool Iframe */}
        {!isSearchCollapsed && (
          <div className={`w-full relative ${isSearchFullscreen ? 'flex-1 h-full' : 'h-[520px] sm:h-[580px]'}`}>
            {isSearchLoading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <div className="text-xs text-sky-300 font-medium">Loading DDON Item Locations Database...</div>
                <div className="text-[11px] text-slate-400">Connecting to seiyria.com/ddon-item-locations</div>
              </div>
            )}

            <iframe
              key={searchIframeKey}
              src={SEIYRIA_SEARCH_URL}
              title="DDON Item Locations Search Tool"
              className="w-full h-full border-0 bg-white"
              allow="clipboard-write; clipboard-read"
              onLoad={() => setIsSearchLoading(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

