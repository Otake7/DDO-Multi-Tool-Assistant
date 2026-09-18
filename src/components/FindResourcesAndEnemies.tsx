import React, { useState, useEffect, useMemo } from 'react';
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
  CheckCircle2,
  Server
} from 'lucide-react';
import { UserProfile } from '../types';
import { ServerBadge } from './ServerBadge';
import { getServerBadgeTheme } from '../utils/serverBadgeStyles';

export type MapSearchTool = 'rising_map' | 'revival_map' | 'legacy_map' | 'original_locator';

interface MapZonePreset {
  id: string;
  name: string;
  fieldId: string;
  risingHash: string;
  category: 'Major Plains' | 'Coastal' | 'Highlands & Forts' | 'Endgame / Dungeon';
}

const MAP_ZONE_PRESETS: MapZonePreset[] = [
  { id: 'lestania', name: 'Hidell Plains (Lestania)', fieldId: 'field000_m00', risingHash: '#field000_m00:st0100', category: 'Major Plains' },
  { id: 'breya', name: 'Breya Coast', fieldId: 'field004_m00', risingHash: '#field004_m00:st0104', category: 'Coastal' },
  { id: 'misery', name: 'Misery Coast', fieldId: 'field002_m00', risingHash: '#field002_m00:st0102', category: 'Coastal' },
  { id: 'gritten', name: 'Gritten Fort Outer', fieldId: 'field001_m00', risingHash: '#field001_m00:st0101', category: 'Highlands & Forts' },
  { id: 'temple', name: 'White Dragon Temple', fieldId: 'rm000_m00', risingHash: '#rm000_m00:st0200', category: 'Major Plains' },
  { id: 'dowe', name: 'Dowe Valley', fieldId: 'field003_m00', risingHash: '#field003_m00:st0103', category: 'Highlands & Forts' },
  { id: 'barmika', name: 'Barmika Plains', fieldId: 'field005_m00', risingHash: '#field005_m00:st0105', category: 'Highlands & Forts' },
];

const EMBEDDED_MAP_BASE = '/rising-map/';
const DIRECT_MAP_BASE = 'https://edelarrow.github.io/ddo-map-viewer-normal-channels/';
const DOGMA_PORTAL_URL = 'https://play.dogmarising.org/interactive-map';
const LEGACY_MAP_PORTAL_URL = 'https://legacyddon.com/map';
const LEGACY_MAP_DIRECT_BASE = 'https://legacyddon.com/map/map.html';
const SEIYRIA_SEARCH_URL = 'https://seiyria.com/ddon-item-locations/#';
const REVIVAL_DEFAULT_MAP_URL = 'https://live.ddon.org/map.html#field000_m00@-1.00/2425.0/3070.0!elc;0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,40,41,42,43,44,45,46,48,50,51,52,53,54,55,56,58,59,61,62,63,64,65,67,68,69,70,71,73,74,75,76,77,78,79,81,82,83,86,87,88,89,90,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,135,137,139,141,142,143,145,147,149,150,151,152,153,154,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,173,174,175,176,177,179,181,182,183,184,185,186,188,189,190,191,193,194,195,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,213,214,215,216,217,219,220,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,243,244,245,246,247,248,249,250,251,252,254,256,257,258,259,260,262,263,266,267,268,272,273,274,275,276,277,278,279,281,282,283,285,286,287,288,289,290,291,292,293,294,295,296,297,298,300,301,303,304,306,307,308,310,311,312,313,314,317,318,319,320,321,322,323,324,325,326,327,329,330,331,332,333,334,336,337,338,339,341,342,343,344,345,346,347,349,352,353,354,356,357,358,359,360,361,363,364,365,366,367,368,369,370,371,372,373,375,376,377,378,379,380,381,382,383,384,385,387,388,389,390,392,393,394,395,398,399,400,401,402,403,404,405,406,408,409,410,411,412,413,415,416,418,419,421,422,423,424,425,426,428,431,432,437,438,439,442,443,444,448,451,453,454,455,456,457,458,460,462,464,466,467,474,475,478,479,480,481,482,483,484,485,487,488,489,490,491,492,493,494,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511';

// Element layer list extracted from user's full Revival map URL
const REVIVAL_ELEMENT_LAYERS = '0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,40,41,42,43,44,45,46,48,50,51,52,53,54,55,56,58,59,61,62,63,64,65,67,68,69,70,71,73,74,75,76,77,78,79,81,82,83,86,87,88,89,90,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,135,137,139,141,142,143,145,147,149,150,151,152,153,154,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,173,174,175,176,177,179,181,182,183,184,185,186,188,189,190,191,193,194,195,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,213,214,215,216,217,219,220,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,243,244,245,246,247,248,249,250,251,252,254,256,257,258,259,260,262,263,266,267,268,272,273,274,275,276,277,278,279,281,282,283,285,286,287,288,289,290,291,292,293,294,295,296,297,298,300,301,303,304,306,307,308,310,311,312,313,314,317,318,319,320,321,322,323,324,325,326,327,329,330,331,332,333,334,336,337,338,339,341,342,343,344,345,346,347,349,352,353,354,356,357,358,359,360,361,363,364,365,366,367,368,369,370,371,372,373,375,376,377,378,379,380,381,382,383,384,385,387,388,389,390,392,393,394,395,398,399,400,401,402,403,404,405,406,408,409,410,411,412,413,415,416,418,419,421,422,423,424,425,426,428,431,432,437,438,439,442,443,444,448,451,453,454,455,456,457,458,460,462,464,466,467,474,475,478,479,480,481,482,483,484,485,487,488,489,490,491,492,493,494,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511';

interface FindResourcesAndEnemiesProps {
  currentUser?: UserProfile | null;
  initialSearchQuery?: string;
  initialCategory?: any;
  initialStageScope?: any;
  onClearInitialSearch?: () => void;
}

type EngineType = 'embedded' | 'direct' | 'portal';

/**
 * Computes default searching tool based on user's account servers:
 * - If account chose Revival instead of Rising/Legacy: Revival Map by default
 * - If account chose Legacy instead of Rising/Revival: Legacy Map by default
 * - If account chose both Rising and Revival/Legacy: Rising Map by default
 * - Any other case (only Rising, no account, guest): Rising Map by default
 */
export function computeDefaultMapTool(user?: UserProfile | null): MapSearchTool {
  let profile = user;
  if (!profile) {
    try {
      const saved = localStorage.getItem('ddon_current_user');
      if (saved) profile = JSON.parse(saved);
    } catch {
      // ignore
    }
  }

  if (profile && Array.isArray(profile.servers) && profile.servers.length > 0) {
    const hasRising = profile.servers.includes('Rising');
    const hasRevival = profile.servers.includes('Revival');
    const hasLegacy = profile.servers.includes('Legacy');

    // Case 1: Account chose Revival only
    if (hasRevival && !hasRising && !hasLegacy) {
      return 'revival_map';
    }
    // Case 2: Account chose Legacy only
    if (hasLegacy && !hasRising && !hasRevival) {
      return 'legacy_map';
    }
    // Case 3: Account chose Rising (with or without others)
    if (hasRising) {
      return 'rising_map';
    }
    // Case 4: Revival + Legacy
    if (hasRevival) {
      return 'revival_map';
    }
    if (hasLegacy) {
      return 'legacy_map';
    }
    return 'rising_map';
  }

  return 'rising_map';
}

export const FindResourcesAndEnemies: React.FC<FindResourcesAndEnemiesProps> = ({
  currentUser,
  initialSearchQuery,
  onClearInitialSearch
}) => {
  // Compute default tool based on user account
  const defaultTool = useMemo(() => computeDefaultMapTool(currentUser), [currentUser]);

  // Selected tool state (defaults according to server preference rules)
  const [selectedTool, setSelectedTool] = useState<MapSearchTool>(() => {
    const manualChoice = sessionStorage.getItem('ddon_selected_map_tool') as MapSearchTool | null;
    if (manualChoice && ['rising_map', 'revival_map', 'legacy_map', 'original_locator'].includes(manualChoice)) {
      return manualChoice;
    }
    return defaultTool;
  });

  // Sync with default tool if user switches account and hasn't manually selected in session
  useEffect(() => {
    const manualChoice = sessionStorage.getItem('ddon_selected_map_tool');
    if (!manualChoice) {
      setSelectedTool(defaultTool);
    }
  }, [defaultTool]);

  const handleSelectTool = (tool: MapSearchTool) => {
    setSelectedTool(tool);
    sessionStorage.setItem('ddon_selected_map_tool', tool);
  };

  // --- Rising Map State ---
  const [risingEngineSource, setRisingEngineSource] = useState<EngineType>('embedded');
  const [risingZoneHash, setRisingZoneHash] = useState<string>('#field000_m00:st0100');
  const [risingIframeKey, setRisingIframeKey] = useState<number>(0);
  const [isRisingFullscreen, setIsRisingFullscreen] = useState<boolean>(false);
  const [isRisingLoading, setIsRisingLoading] = useState<boolean>(true);

  // Compute active Rising Map URL
  const currentRisingUrl = risingEngineSource === 'embedded'
    ? `${EMBEDDED_MAP_BASE}${risingZoneHash}`
    : risingEngineSource === 'direct'
      ? `${DIRECT_MAP_BASE}${risingZoneHash}`
      : DOGMA_PORTAL_URL;

  // --- Revival Map State ---
  const [revivalZoneField, setRevivalZoneField] = useState<string>('field000_m00');
  const [revivalIframeKey, setRevivalIframeKey] = useState<number>(0);
  const [isRevivalFullscreen, setIsRevivalFullscreen] = useState<boolean>(false);
  const [isRevivalLoading, setIsRevivalLoading] = useState<boolean>(true);

  // Compute active Revival Map URL (uses full URL provided by user, allows changing zone field)
  const currentRevivalUrl = useMemo(() => {
    if (revivalZoneField === 'field000_m00') {
      return REVIVAL_DEFAULT_MAP_URL;
    }
    return `https://live.ddon.org/map.html#${revivalZoneField}@-1.00/2425.0/3070.0!elc;${REVIVAL_ELEMENT_LAYERS}`;
  }, [revivalZoneField]);

  // --- Legacy Map State ---
  const [legacyEngineSource, setLegacyEngineSource] = useState<'direct' | 'portal'>('direct');
  const [legacyZoneHash, setLegacyZoneHash] = useState<string>('#field000_m00:st0100');
  const [legacyIframeKey, setLegacyIframeKey] = useState<number>(0);
  const [isLegacyFullscreen, setIsLegacyFullscreen] = useState<boolean>(false);
  const [isLegacyLoading, setIsLegacyLoading] = useState<boolean>(true);

  // Compute active Legacy Map URL
  const currentLegacyUrl = legacyEngineSource === 'direct'
    ? `${LEGACY_MAP_DIRECT_BASE}${legacyZoneHash}`
    : LEGACY_MAP_PORTAL_URL;

  // --- Original DDON Locator State (Seiyria) ---
  const [searchIframeKey, setSearchIframeKey] = useState<number>(0);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(true);
  const [isSearchFullscreen, setIsSearchFullscreen] = useState<boolean>(false);

  // Zone Jump Handlers
  const handleRisingZoneSelect = (hash: string) => {
    setRisingZoneHash(hash);
    if (risingEngineSource === 'portal') {
      setRisingEngineSource('embedded');
    }
    setIsRisingLoading(true);
    setRisingIframeKey(k => k + 1);
  };

  const handleRevivalZoneSelect = (fieldId: string) => {
    setRevivalZoneField(fieldId);
    setIsRevivalLoading(true);
    setRevivalIframeKey(k => k + 1);
  };

  const handleLegacyZoneSelect = (hash: string) => {
    setLegacyZoneHash(hash);
    if (legacyEngineSource === 'portal') {
      setLegacyEngineSource('direct');
    }
    setIsLegacyLoading(true);
    setLegacyIframeKey(k => k + 1);
  };

  // Determine user server badge for context
  const userHasRevivalOnly = currentUser?.servers?.includes('Revival') && !currentUser?.servers?.includes('Rising') && !currentUser?.servers?.includes('Legacy');
  const userHasLegacyOnly = currentUser?.servers?.includes('Legacy') && !currentUser?.servers?.includes('Rising') && !currentUser?.servers?.includes('Revival');
  const userHasBoth = (currentUser?.servers?.length ?? 0) > 1;

  return (
    <div className="space-y-6">
      {/* Top Banner & Searching Tool Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Map className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 flex-wrap">
                <span>Find Resources & Enemies</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                  Radar & Map Tools
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Explore Lestania's world maps with interactive pins for gathering nodes, monster spawns, Job Training Trials (ジョブ修練), regional quests, and chests.
            </p>
          </div>

          {/* Account Affiliation & Default Hint */}
          {currentUser && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              <Server className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Server Profile:</span>
              <div className="flex items-center gap-1">
                {currentUser.servers && currentUser.servers.length > 0 ? (
                  currentUser.servers.map(srv => (
                    <ServerBadge key={srv} server={srv} size="xs" />
                  ))
                ) : (
                  <ServerBadge server="Rising" size="xs" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* ==================================================================== */}
        {/* TOOL SELECTION CARDS (Option to change searching tool)               */}
        {/* ==================================================================== */}
        <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Searching & Map Tool:
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {userHasLegacyOnly ? (
                <span>⚡ Defaulted to <strong className="text-[#e2e8f0]">Legacy Map</strong> based on your account</span>
              ) : userHasRevivalOnly ? (
                <span>⚡ Defaulted to <strong className="text-[#f87171]">Revival Map</strong> based on your account</span>
              ) : userHasBoth ? (
                <span>⚡ Defaulted to <strong className="text-[#facc15]">Rising Map</strong> (you have multiple servers chosen)</span>
              ) : (
                <span>⚡ Defaulted to <strong className="text-[#facc15]">Rising Map</strong></span>
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Tool 1: Rising Map */}
            <button
              type="button"
              id="btn-tool-rising-map"
              onClick={() => handleSelectTool('rising_map')}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                selectedTool === 'rising_map'
                  ? 'bg-gradient-to-br from-[#2b1e09]/90 to-slate-950 border-[#b48226] shadow-md shadow-amber-500/10 ring-1 ring-[#b48226]/50'
                  : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${selectedTool === 'rising_map' ? 'bg-[#b48226]/20 text-[#facc15]' : 'bg-slate-800 text-slate-400'}`}>
                      <Map className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-bold ${selectedTool === 'rising_map' ? 'text-[#facc15]' : 'text-slate-200'}`}>
                      Rising Map
                    </span>
                  </div>
                  <ServerBadge server="Rising" size="xs" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive map for the Rising Server with Leaflet spot pins, gathering nodes & job trials.
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className={selectedTool === 'rising_map' ? 'text-[#facc15] font-semibold flex items-center gap-1' : 'text-slate-500'}>
                  {selectedTool === 'rising_map' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Tool</span>
                    </>
                  ) : (
                    <span>Click to open</span>
                  )}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">play.dogmarising.org</span>
              </div>
            </button>

            {/* Tool 2: Revival Map */}
            <button
              type="button"
              id="btn-tool-revival-map"
              onClick={() => handleSelectTool('revival_map')}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                selectedTool === 'revival_map'
                  ? 'bg-gradient-to-br from-[#2d0b0e]/90 to-slate-950 border-[#991b1b] shadow-md shadow-red-500/10 ring-1 ring-[#991b1b]/50'
                  : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${selectedTool === 'revival_map' ? 'bg-[#991b1b]/20 text-[#f87171]' : 'bg-slate-800 text-slate-400'}`}>
                      <Compass className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-bold ${selectedTool === 'revival_map' ? 'text-[#f87171]' : 'text-slate-200'}`}>
                      Revival MAP
                    </span>
                  </div>
                  <ServerBadge server="Revival" size="xs" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Live interactive map viewer with full coordinates, element layers, chests & monster spawns.
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className={selectedTool === 'revival_map' ? 'text-[#f87171] font-semibold flex items-center gap-1' : 'text-slate-500'}>
                  {selectedTool === 'revival_map' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Tool</span>
                    </>
                  ) : (
                    <span>Click to open</span>
                  )}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">live.ddon.org</span>
              </div>
            </button>

            {/* Tool 3: Legacy Map */}
            <button
              type="button"
              id="btn-tool-legacy-map"
              onClick={() => handleSelectTool('legacy_map')}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                selectedTool === 'legacy_map'
                  ? 'bg-gradient-to-br from-[#1e232a]/95 to-slate-950 border-[#94a3b8] shadow-md shadow-slate-400/10 ring-1 ring-[#94a3b8]/50'
                  : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${selectedTool === 'legacy_map' ? 'bg-[#1e232a] text-[#e2e8f0] border border-[#94a3b8]/40' : 'bg-slate-800 text-slate-400'}`}>
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-bold ${selectedTool === 'legacy_map' ? 'text-[#e2e8f0]' : 'text-slate-200'}`}>
                      Legacy Map
                    </span>
                  </div>
                  <ServerBadge server="Legacy" size="xs" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive map with all areas, enemy spawns, shops, and gathering nodes for LegacyDDON.
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className={selectedTool === 'legacy_map' ? 'text-[#e2e8f0] font-semibold flex items-center gap-1' : 'text-slate-500'}>
                  {selectedTool === 'legacy_map' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Tool</span>
                    </>
                  ) : (
                    <span>Click to open</span>
                  )}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">legacyddon.com</span>
              </div>
            </button>

            {/* Tool 4: Original DDON Locator (Seiyria) */}
            <button
              type="button"
              id="btn-tool-original-locator"
              onClick={() => handleSelectTool('original_locator')}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                selectedTool === 'original_locator'
                  ? 'bg-gradient-to-br from-sky-950/70 to-slate-950 border-sky-500 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/50'
                  : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${selectedTool === 'original_locator' ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Search className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-bold ${selectedTool === 'original_locator' ? 'text-sky-300' : 'text-slate-200'}`}>
                      Original DDON Locator
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#1e232a] text-[#e2e8f0] border border-[#94a3b8]/50">
                    Original Setting
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Original Dragon's Dogma Online drop tables, item gather coordinates & monster spawn search.
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className={selectedTool === 'original_locator' ? 'text-sky-400 font-semibold flex items-center gap-1' : 'text-slate-500'}>
                  {selectedTool === 'original_locator' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Tool</span>
                    </>
                  ) : (
                    <span>Click to open</span>
                  )}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">seiyria.com</span>
              </div>
            </button>
          </div>
        </div>

        {/* Notice for Search Query Transfer from Item Library if any */}
        {initialSearchQuery && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <Search className="w-4 h-4 shrink-0" />
              <span>Transferred search item: <strong className="font-mono text-white">{initialSearchQuery}</strong></span>
            </div>
            {onClearInitialSearch && (
              <button
                onClick={onClearInitialSearch}
                className="text-amber-400 hover:text-amber-200 underline font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* VIEW 1: RISING MAP (Displayed when 'rising_map' is active)            */}
      {/* ==================================================================== */}
      {selectedTool === 'rising_map' && (
        <div 
          id="section-rising-map"
          className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
            isRisingFullscreen ? 'fixed inset-2 sm:inset-4 z-50 bg-slate-950 flex flex-col' : 'relative'
          }`}
        >
          {/* Header & Sub-toolbar */}
          <div className="bg-gradient-to-r from-[#2b1e09]/70 via-slate-900 to-[#2b1e09]/40 border-b border-[#b48226]/30 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#b48226]/20 border border-[#b48226]/40 text-[#facc15] shrink-0">
                <Map className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2 flex-wrap">
                  <span>Dogma Rising Interactive World Map</span>
                  <ServerBadge server="Rising" size="xs" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Interactive radar with nodes, monsters, and Job Training for Rising Server
                </div>
              </div>
            </div>

            {/* Rising Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                id="btn-rising-reload"
                onClick={() => {
                  setIsRisingLoading(true);
                  setRisingIframeKey(k => k + 1);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Reload Rising Map frame"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRisingLoading ? 'animate-spin text-amber-400' : ''}`} />
                <span>Reload</span>
              </button>

              <button
                id="btn-rising-fullscreen"
                onClick={() => setIsRisingFullscreen(!isRisingFullscreen)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Toggle Fullscreen Map View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isRisingFullscreen ? 'Exit Full Screen' : 'Expand View'}</span>
              </button>

              <a
                id="btn-rising-open-external"
                href={currentRisingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#b48226] hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Engine & Quick Jump Bar */}
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Engine:
              </span>
              <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                <button
                  onClick={() => {
                    setRisingEngineSource('embedded');
                    setIsRisingLoading(true);
                    setRisingIframeKey(k => k + 1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    risingEngineSource === 'embedded' ? 'bg-[#b48226] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Local Engine
                </button>
                <button
                  onClick={() => {
                    setRisingEngineSource('direct');
                    setIsRisingLoading(true);
                    setRisingIframeKey(k => k + 1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    risingEngineSource === 'direct' ? 'bg-[#b48226] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Direct CDN
                </button>
                <button
                  onClick={() => {
                    setRisingEngineSource('portal');
                    setIsRisingLoading(true);
                    setRisingIframeKey(k => k + 1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    risingEngineSource === 'portal' ? 'bg-[#b48226] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dogma Rising Portal
                </button>
              </div>
            </div>

            {/* Quick Zone Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Zone:
              </span>
              {MAP_ZONE_PRESETS.map(preset => {
                const isSelected = risingEngineSource !== 'portal' && risingZoneHash === preset.risingHash;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleRisingZoneSelect(preset.risingHash)}
                    className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rising Map iframe */}
          <div className={`w-full relative ${isRisingFullscreen ? 'flex-1 h-full' : 'h-[750px] sm:h-[840px]'}`}>
            {isRisingLoading && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <div className="text-xs text-amber-300 font-medium">Initializing Rising Map Engine...</div>
                <div className="text-[11px] text-slate-400">Loading Leaflet pins and world coordinates</div>
              </div>
            )}

            <iframe
              key={risingIframeKey}
              src={currentRisingUrl}
              title="Dogma Rising Interactive Map"
              className="w-full h-full border-0 bg-slate-950"
              allow="fullscreen; geolocation; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              onLoad={() => setIsRisingLoading(false)}
            />
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VIEW 2: REVIVAL MAP (Displayed when 'revival_map' is active)           */}
      {/* ==================================================================== */}
      {selectedTool === 'revival_map' && (
        <div 
          id="section-revival-map"
          className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
            isRevivalFullscreen ? 'fixed inset-2 sm:inset-4 z-50 bg-slate-950 flex flex-col' : 'relative'
          }`}
        >
          {/* Header & Sub-toolbar */}
          <div className="bg-gradient-to-r from-[#2d0b0e]/80 via-slate-900 to-[#2d0b0e]/40 border-b border-[#991b1b]/30 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#991b1b]/20 border border-[#991b1b]/40 text-[#f87171] shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2 flex-wrap">
                  <span>DDON Revival Live Interactive Map</span>
                  <ServerBadge server="Revival" size="xs" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Full coordinates, active gathering elements, Area Masters, chests & enemy radar for Revival Server
                </div>
              </div>
            </div>

            {/* Revival Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                id="btn-revival-reload"
                onClick={() => {
                  setIsRevivalLoading(true);
                  setRevivalIframeKey(k => k + 1);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Reload Revival Map frame"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRevivalLoading ? 'animate-spin text-[#f87171]' : ''}`} />
                <span>Reload</span>
              </button>

              <button
                id="btn-revival-fullscreen"
                onClick={() => setIsRevivalFullscreen(!isRevivalFullscreen)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Toggle Fullscreen Map View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isRevivalFullscreen ? 'Exit Full Screen' : 'Expand View'}</span>
              </button>

              <a
                id="btn-revival-open-external"
                href={currentRevivalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#991b1b] hover:bg-red-600 text-white text-xs font-bold transition-all shadow cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Zone Presets Bar for Revival */}
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span className={`w-2 h-2 rounded-full ${isRevivalLoading ? 'bg-[#f87171] animate-ping' : 'bg-emerald-400'}`} />
              <span className="font-mono text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                live.ddon.org/map.html
              </span>
            </div>

            {/* Quick Zone Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-[#f87171]" />
                Jump Zone:
              </span>
              {MAP_ZONE_PRESETS.map(preset => {
                const isSelected = revivalZoneField === preset.fieldId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleRevivalZoneSelect(preset.fieldId)}
                    className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#991b1b]/30 border-[#991b1b] text-[#f87171] font-bold shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Revival Map iframe */}
          <div className={`w-full relative ${isRevivalFullscreen ? 'flex-1 h-full' : 'h-[750px] sm:h-[840px]'}`}>
            {isRevivalLoading && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-8 h-8 border-2 border-[#f87171] border-t-transparent rounded-full animate-spin" />
                <div className="text-xs text-[#f87171] font-medium">Connecting to Revival Live Map (live.ddon.org)...</div>
                <div className="text-[11px] text-slate-400">Loading element layers, chests, and monster coordinates</div>
              </div>
            )}

            <iframe
              key={revivalIframeKey}
              src={currentRevivalUrl}
              title="DDON Revival Interactive Live Map"
              className="w-full h-full border-0 bg-slate-950"
              allow="fullscreen; geolocation; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              onLoad={() => setIsRevivalLoading(false)}
            />
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VIEW 3: LEGACY MAP (Displayed when 'legacy_map' is active)           */}
      {/* ==================================================================== */}
      {selectedTool === 'legacy_map' && (
        <div 
          id="section-legacy-map"
          className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
            isLegacyFullscreen ? 'fixed inset-2 sm:inset-4 z-50 bg-slate-950 flex flex-col' : 'relative'
          }`}
        >
          {/* Header & Sub-toolbar */}
          <div className="bg-gradient-to-r from-[#1e232a]/90 via-slate-900 to-[#1e232a]/50 border-b border-[#94a3b8]/30 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#1e232a] border border-[#94a3b8]/40 text-[#e2e8f0] shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2 flex-wrap">
                  <span>LegacyDDON Interactive World Map</span>
                  <ServerBadge server="Legacy" size="xs" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Interactive map with enemy spawns, shops, and gathering nodes for the LegacyDDON Server
                </div>
              </div>
            </div>

            {/* Legacy Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                type="button"
                id="btn-legacy-reload"
                onClick={() => {
                  setIsLegacyLoading(true);
                  setLegacyIframeKey(k => k + 1);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Reload Legacy Map frame"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLegacyLoading ? 'animate-spin text-[#e2e8f0]' : ''}`} />
                <span>Reload</span>
              </button>

              <button
                type="button"
                id="btn-legacy-fullscreen"
                onClick={() => setIsLegacyFullscreen(!isLegacyFullscreen)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Toggle Fullscreen Map View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isLegacyFullscreen ? 'Exit Full Screen' : 'Expand View'}</span>
              </button>

              <a
                id="btn-legacy-open-external"
                href={currentLegacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#334155] hover:bg-[#475569] text-white text-xs font-bold transition-all shadow cursor-pointer border border-[#94a3b8]/40"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Engine & Quick Jump Bar for Legacy */}
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#94a3b8]" />
                View Mode:
              </span>
              <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setLegacyEngineSource('direct');
                    setIsLegacyLoading(true);
                    setLegacyIframeKey(k => k + 1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    legacyEngineSource === 'direct' ? 'bg-[#334155] text-[#e2e8f0] font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Direct Map Canvas
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLegacyEngineSource('portal');
                    setIsLegacyLoading(true);
                    setLegacyIframeKey(k => k + 1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    legacyEngineSource === 'portal' ? 'bg-[#334155] text-[#e2e8f0] font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  LegacyDDON Portal
                </button>
              </div>
            </div>

            {/* Quick Zone Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-[#94a3b8]" />
                Zone:
              </span>
              {MAP_ZONE_PRESETS.map(preset => {
                const isSelected = legacyEngineSource !== 'portal' && legacyZoneHash === preset.risingHash;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleLegacyZoneSelect(preset.risingHash)}
                    className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-700/60 border-[#94a3b8] text-[#e2e8f0] font-bold shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legacy Map iframe */}
          <div className={`w-full relative ${isLegacyFullscreen ? 'flex-1 h-full' : 'h-[750px] sm:h-[840px]'}`}>
            {isLegacyLoading && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-8 h-8 border-2 border-[#94a3b8] border-t-transparent rounded-full animate-spin" />
                <div className="text-xs text-[#e2e8f0] font-medium">Connecting to LegacyDDON Map (legacyddon.com/map)...</div>
                <div className="text-[11px] text-slate-400">Loading interactive areas, enemy spawns, and shops</div>
              </div>
            )}

            <iframe
              key={legacyIframeKey}
              src={currentLegacyUrl}
              title="LegacyDDON Interactive Map"
              className="w-full h-full border-0 bg-slate-950"
              allow="fullscreen; geolocation; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              onLoad={() => setIsLegacyLoading(false)}
            />
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VIEW 4: ORIGINAL DDON LOCATOR (Displayed when 'original_locator')      */}
      {/* ==================================================================== */}
      {selectedTool === 'original_locator' && (
        <div 
          id="section-ddon-search-tool"
          className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
            isSearchFullscreen ? 'fixed inset-2 sm:inset-4 z-50 bg-slate-950 flex flex-col' : 'relative'
          }`}
        >
          {/* Header & Sub-toolbar */}
          <div className="bg-gradient-to-r from-sky-950/60 via-slate-900 to-sky-950/30 border-b border-sky-500/30 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2 flex-wrap">
                  <span>DDON Item Locations Search Tool</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                    seiyria.com
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                    Original Setting
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Original Dragon's Dogma Online drop tables, gathering spots & monster spawn database
                </div>
              </div>
            </div>

            {/* Original Search Tool Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                id="btn-search-reload-frame"
                onClick={() => {
                  setIsSearchLoading(true);
                  setSearchIframeKey(k => k + 1);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Reload search tool frame"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSearchLoading ? 'animate-spin text-sky-400' : ''}`} />
                <span>Reload</span>
              </button>

              <button
                id="btn-search-fullscreen-toggle"
                onClick={() => setIsSearchFullscreen(!isSearchFullscreen)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title="Toggle Fullscreen Search View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isSearchFullscreen ? 'Exit Full Screen' : 'Expand View'}</span>
              </button>

              <a
                id="btn-search-open-external"
                href={SEIYRIA_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all shadow cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Info callout */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Search items, monster materials, and gathering spot tables directly in the original Capcom DDON database.</span>
          </div>

          {/* Search Tool Iframe */}
          <div className={`w-full relative ${isSearchFullscreen ? 'flex-1 h-full' : 'h-[680px] sm:h-[750px]'}`}>
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
        </div>
      )}
    </div>
  );
};
