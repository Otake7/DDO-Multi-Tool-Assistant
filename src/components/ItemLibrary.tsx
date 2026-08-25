import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  Shield, 
  Flame, 
  Coins, 
  Hammer, 
  TrendingUp, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Swords, 
  ChevronRight, 
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpRight,
  PackageCheck,
  Tag,
  Star,
  Award,
  BookOpen,
  Compass,
  FileText
} from 'lucide-react';
import { ItemCategory, ItemData } from '../types';
import { ALL_ITEMS, ITEM_CATEGORIES, searchItems } from '../data/itemsData';

interface ItemLibraryProps {
  onSelectItemForSpotSearch: (itemName: string) => void;
}

export const ItemLibrary: React.FC<ItemLibraryProps> = ({ onSelectItemForSpotSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'ALL'>('ALL');
  const [selectedItemDetail, setSelectedItemDetail] = useState<ItemData | null>(null);
  const [bazaarFilter, setBazaarFilter] = useState<'ALL' | 'YES' | 'NO'>('ALL');
  const [craftFilter, setCraftFilter] = useState<'ALL' | 'CRAFTABLE' | 'NON_CRAFTABLE'>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'reqLevel' | 'physAtk' | 'physDef' | 'sellPrice' | 'ir'>('reqLevel');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(36);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, bazaarFilter, craftFilter, sortBy, sortOrder, itemsPerPage]);

  const filteredItems = useMemo(() => {
    let items = searchItems(searchQuery, selectedCategory);

    if (bazaarFilter === 'YES') {
      items = items.filter(i => i.bazaar);
    } else if (bazaarFilter === 'NO') {
      items = items.filter(i => !i.bazaar);
    }

    if (craftFilter === 'CRAFTABLE') {
      items = items.filter(i => i.craftable);
    } else if (craftFilter === 'NON_CRAFTABLE') {
      items = items.filter(i => !i.craftable);
    }

    return items.sort((a, b) => {
      let valA: any = 0;
      let valB: any = 0;

      if (sortBy === 'name') {
        valA = a.name;
        valB = b.name;
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (sortBy === 'reqLevel') {
        valA = a.reqLevel;
        valB = b.reqLevel;
      } else if (sortBy === 'ir') {
        valA = Number(a.ir) || 0;
        valB = Number(b.ir) || 0;
      } else if (sortBy === 'physAtk') {
        valA = a.physAtk || 0;
        valB = b.physAtk || 0;
      } else if (sortBy === 'physDef') {
        valA = a.physDef || 0;
        valB = b.physDef || 0;
      } else if (sortBy === 'sellPrice') {
        valA = a.sellPrice || 0;
        valB = b.sellPrice || 0;
      }

      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [searchQuery, selectedCategory, bazaarFilter, craftFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const currentCategoryInfo = useMemo(() => {
    if (selectedCategory === 'ALL') return null;
    return ITEM_CATEGORIES.find(c => c.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Dragon's Dogma Online Item Library</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  All 16 Sub-Categories
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-4xl leading-relaxed">
              Complete reference catalog matching{' '}
              <a
                href="https://reference.dd-on.com/build/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline font-semibold inline-flex items-center gap-1 mx-1 transition-colors"
                title="Open DDON Reference Database"
              >
                <span>reference.dd-on.com</span>
                <ExternalLink className="w-3.5 h-3.5 inline" />
              </a>{' '}
              for all equipment, weapons, armors, wears, accessories, materials, consumables, lanterns, job items, and key items. Inspect craft recipes, ★0 to ★4 star reinforcement requirements, Bazaar listing eligibility, and click any item to locate its world drops in <strong>Find resources and enemies</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Showing <strong className="text-amber-400">{filteredItems.length}</strong> items
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              id="item-library-search"
              type="text"
              placeholder="Search by name, ID (e.g. 5563, 13775), Japanese, IR, stats, recipes, or gathering..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950/90 border border-slate-800 focus:border-amber-500/60 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters: Bazaar Listing & Craftable */}
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
              <span className="text-slate-500 px-1.5 text-[11px]">Bazaar:</span>
              <button
                onClick={() => setBazaarFilter('ALL')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer ${bazaarFilter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setBazaarFilter('YES')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer ${bazaarFilter === 'YES' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Yes
              </button>
              <button
                onClick={() => setBazaarFilter('NO')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer ${bazaarFilter === 'NO' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                No
              </button>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
              <span className="text-slate-500 px-1.5 text-[11px]">Craft:</span>
              <button
                onClick={() => setCraftFilter('ALL')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer ${craftFilter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setCraftFilter('CRAFTABLE')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer ${craftFilter === 'CRAFTABLE' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Craftable
              </button>
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-2.5 py-2 rounded-xl focus:outline-none focus:border-amber-500/50"
            >
              <option value="reqLevel">Sort: Req Level</option>
              <option value="ir">Sort: Item Rating (IR)</option>
              <option value="physAtk">Sort: Phys Atk</option>
              <option value="physDef">Sort: Phys Def</option>
              <option value="sellPrice">Sort: Sell Value (G)</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 16 Sub-Category Selector Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Sub-Category (16 Categories)</span>
          </h3>
          {currentCategoryInfo && (
            <a
              href={currentCategoryInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Reference Page ({currentCategoryInfo.name})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="truncate w-full text-center">All Categories</span>
          </button>

          {ITEM_CATEGORIES.map((cat) => {
            const count = ALL_ITEMS.filter(i => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer relative group ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className="truncate w-full text-center">{cat.name}</span>
                <span className={`text-[10px] truncate w-full text-center ${selectedCategory === cat.id ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  {count} items
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls Top */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 px-4 text-xs">
        <div className="text-slate-400 font-mono flex items-center gap-1.5">
          <span>Showing</span>
          <strong className="text-amber-400">
            {filteredItems.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          </strong>
          <span>–</span>
          <strong className="text-amber-400">
            {Math.min(currentPage * itemsPerPage, filteredItems.length)}
          </strong>
          <span>of</span>
          <strong className="text-slate-200">{filteredItems.length.toLocaleString()}</strong>
          <span>items</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-slate-300">
            <span className="text-[11px] text-slate-500">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer"
            >
              <option value={24} className="bg-slate-900">24</option>
              <option value={36} className="bg-slate-900">36</option>
              <option value={72} className="bg-slate-900">72</option>
              <option value={144} className="bg-slate-900">144</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-slate-200">
              Page <strong className="text-amber-400">{currentPage}</strong> / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Item Grid & Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedItems.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-slate-900/95 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xl hover:shadow-2xl group relative"
            >
              {/* Item Card Banner: Header matching Screenshot Black Top Bar */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 text-center space-y-0.5">
                <div className="text-xs text-amber-500/80 font-mono">
                  Items / {item.subType || item.category}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {item.name}
                </h3>
                {item.itemId && (
                  <div className="text-xs font-mono text-slate-400">
                    {item.itemId}
                  </div>
                )}
              </div>

              {/* Japanese Name with Direct Reference Link */}
              {item.jpName && (
                <div className="bg-slate-900 px-4 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{item.jpName}</span>
                  <a
                    href="https://reference.dd-on.com/build/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors group/link"
                    title="View on reference.dd-on.com"
                  >
                    <span className="text-[11px] underline">reference.dd-on.com</span>
                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              )}

              {/* Stars & IR & LV bar */}
              {(item.stars || item.ir || item.reqLevel) && (
                <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800 text-xs">
                  {item.stars && (
                    <div className="flex items-center justify-center gap-1 text-amber-400 text-sm font-bold pb-1">
                      {'★'.repeat(item.stars)}
                    </div>
                  )}
                  <div className="flex items-center justify-around font-bold text-slate-300 text-xs">
                    {item.ir !== undefined && (
                      <span className="font-mono text-amber-300">IR.{item.ir}</span>
                    )}
                    {item.reqLevel !== undefined && (
                      <span className="font-mono text-slate-200">LV.{item.reqLevel}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Jobs section */}
              {item.equipJobs && item.equipJobs.length > 0 && (
                <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-center mb-1">
                    Jobs
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {item.equipJobs.map((job, jIdx) => (
                      <span
                        key={jIdx}
                        className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-200 rounded text-[10px] font-semibold"
                      >
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Body Content: Stats Table */}
              <div className="p-4 space-y-3 flex-1">
                {/* Primary Stats Table (Defense, Magic Defense, Attack, Magic Attack, Crest Slot, Weight) */}
                {(item.physAtk !== undefined || item.magAtk !== undefined || item.physDef !== undefined || item.magDef !== undefined || item.crestSlots !== undefined || item.weight !== undefined) && (
                  <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                    <div className="bg-slate-950 px-3 py-1 font-bold text-amber-400 text-center border-b border-slate-800 text-[11px] uppercase tracking-wider">
                      Stats
                    </div>
                    <div className="divide-y divide-slate-800/60 bg-slate-950/40">
                      {item.physAtk !== undefined && (
                        <div className="flex justify-between px-3 py-1 text-slate-300">
                          <span className="text-slate-400">Attack</span>
                          <span className="font-mono font-bold text-amber-400">{item.physAtk}</span>
                        </div>
                      )}
                      {item.physDef !== undefined && (
                        <div className="flex justify-between px-3 py-1 text-slate-300">
                          <span className="text-slate-400">Defense</span>
                          <span className="font-mono font-bold text-amber-400">{item.physDef}</span>
                        </div>
                      )}
                      {item.magAtk !== undefined && (
                        <div className="flex justify-between px-3 py-1 text-slate-300">
                          <span className="text-slate-400">Magic Attack</span>
                          <span className="font-mono font-bold text-cyan-400">{item.magAtk}</span>
                        </div>
                      )}
                      {item.magDef !== undefined && (
                        <div className="flex justify-between px-3 py-1 text-slate-300">
                          <span className="text-slate-400">Magic Defense</span>
                          <span className="font-mono font-bold text-cyan-400">{item.magDef}</span>
                        </div>
                      )}
                      {item.crestSlots !== undefined && (
                        <div className="flex justify-between px-3 py-1 text-slate-300">
                          <span className="text-slate-400">Crest Slot</span>
                          <span className="font-mono font-bold text-amber-300">{item.crestSlots}</span>
                        </div>
                      )}
                      {item.weight !== undefined && (
                        <div className="flex justify-between px-3 py-1 text-slate-300">
                          <span className="text-slate-400">Weight</span>
                          <span className="font-mono text-slate-300">{item.weight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Params Section (Endurance, Max Health, Max Stamina, Slayers, Resistances) */}
                {item.params && Object.keys(item.params).length > 0 && (
                  <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                    <div className="bg-slate-950 px-3 py-1 font-bold text-amber-400 text-center border-b border-slate-800 text-[11px] uppercase tracking-wider">
                      Params
                    </div>
                    <div className="divide-y divide-slate-800/60 bg-slate-950/40">
                      {Object.entries(item.params).map(([paramKey, paramVal]) => (
                        <div key={paramKey} className="flex justify-between px-3 py-1 text-slate-300">
                          <span className="text-slate-400">{paramKey}</span>
                          <span className="font-mono font-bold text-emerald-400">{paramVal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info / Description */}
                {item.description && (
                  <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Info</span>
                    <p className="leading-relaxed">{item.description}</p>
                  </div>
                )}

                {/* Recipe Crafting requirements if present */}
                {item.craftMaterials && item.craftMaterials.length > 0 && (
                  <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                    <div className="bg-slate-950 px-3 py-1 font-bold text-amber-400 text-center border-b border-slate-800 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1">
                      <Hammer className="w-3 h-3" />
                      <span>Recipe</span>
                    </div>
                    <div className="divide-y divide-slate-800/60 bg-slate-950/40">
                      {item.craftMaterials.map((mat, mIdx) => (
                        <div key={mIdx} className="flex items-center justify-between px-3 py-1">
                          <button
                            onClick={() => onSelectItemForSpotSearch(mat.name)}
                            className="text-amber-400 hover:text-amber-300 text-left underline cursor-pointer truncate max-w-[160px]"
                            title={`Search ${mat.name} in Spot Finder`}
                          >
                            {mat.name}
                          </button>
                          <span className="font-mono font-bold text-slate-200">{mat.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Found by Gathering if present */}
                {item.gatheringLocations && item.gatheringLocations.length > 0 && (
                  <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                    <div className="bg-slate-950 px-3 py-1 font-bold text-amber-400 text-center border-b border-slate-800 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1">
                      <Compass className="w-3 h-3" />
                      <span>Found by Gathering</span>
                    </div>
                    <div className="p-2 bg-slate-950/40 space-y-1">
                      {item.gatheringLocations.map((loc, lIdx) => (
                        <div key={lIdx} className="text-slate-300 text-[11px]">
                          {loc}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Referenced in Quest Rewards or Gradeup Recipes */}
                {(item.questRewards || item.gradeupRecipes) && (
                  <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                    <div className="bg-slate-950 px-3 py-1 font-bold text-amber-400 text-center border-b border-slate-800 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Referenced in ...</span>
                    </div>
                    <div className="p-2 bg-slate-950/40 space-y-1.5 max-h-32 overflow-y-auto no-scrollbar">
                      {item.questRewards && (
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">Quest Rewards:</span>
                          <div className="space-y-0.5">
                            {item.questRewards.map((q, qIdx) => (
                              <div key={qIdx} className="text-amber-400 text-[11px]">
                                {q}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.gradeupRecipes && (
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">Gradeup Recipes:</span>
                          <div className="space-y-0.5">
                            {item.gradeupRecipes.slice(0, 6).map((gr, grIdx) => (
                              <div key={grIdx} className="text-amber-400 text-[11px]">
                                {gr}
                              </div>
                            ))}
                            {item.gradeupRecipes.length > 6 && (
                              <div className="text-slate-500 text-[10px] italic">
                                + {item.gradeupRecipes.length - 6} more gradeup recipes...
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Table: Bazaar & Gold Price (G) matching screenshot */}
              <div className="border-t border-slate-800 bg-slate-950 text-xs">
                <div className="grid grid-cols-2 divide-x divide-slate-800 border-b border-slate-800/80 text-center">
                  <div className="py-1.5">
                    <span className="text-[10px] text-slate-500 block uppercase">Bazaar</span>
                    <span className={`font-bold font-mono ${item.bazaar ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {item.bazaar ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="py-1.5">
                    <span className="text-[10px] text-slate-500 block uppercase">G (Sell Price)</span>
                    <span className="font-bold font-mono text-amber-300">
                      {item.sellPrice !== undefined ? item.sellPrice.toLocaleString() : 0}
                    </span>
                  </div>
                </div>

                {/* Bottom Action buttons */}
                <div className="p-2.5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedItemDetail(item)}
                    className="flex-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details & Star Tiers</span>
                  </button>

                  <button
                    onClick={() => onSelectItemForSpotSearch(item.name)}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-1 cursor-pointer"
                    title="Find locations on radar"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Locate</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls Bottom */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 px-4 text-xs">
          <div className="text-slate-400 font-mono flex items-center gap-1.5">
            <span>Showing</span>
            <strong className="text-amber-400">
              {(currentPage - 1) * itemsPerPage + 1}
            </strong>
            <span>–</span>
            <strong className="text-amber-400">
              {Math.min(currentPage * itemsPerPage, filteredItems.length)}
            </strong>
            <span>of</span>
            <strong className="text-slate-200">{filteredItems.length.toLocaleString()}</strong>
            <span>items</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setCurrentPage(1);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-slate-200">
              Page <strong className="text-amber-400">{currentPage}</strong> of {totalPages}
            </span>

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentPage(totalPages);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal: Full Item View & Upgrade Progression Table */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-5 shadow-2xl relative my-8">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs text-amber-500/80 font-mono">
                  Items / {selectedItemDetail.subType || selectedItemDetail.category}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>{selectedItemDetail.name}</span>
                  {selectedItemDetail.itemId && (
                    <span className="text-xs font-mono text-slate-400">
                      #{selectedItemDetail.itemId}
                    </span>
                  )}
                </h3>

                {/* Japanese Name with Direct Link to reference.dd-on.com */}
                {selectedItemDetail.jpName && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-amber-400 font-mono">{selectedItemDetail.jpName}</span>
                    <a
                      href="https://reference.dd-on.com/build/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-300 hover:text-white underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>https://reference.dd-on.com/build/index.html</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <p className="text-xs text-slate-400 mt-1">{selectedItemDetail.description}</p>
              </div>

              <button
                onClick={() => setSelectedItemDetail(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stars, IR, LV, and Jobs */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              {selectedItemDetail.stars && (
                <div className="text-amber-400 font-bold text-sm">
                  {'★'.repeat(selectedItemDetail.stars)}
                </div>
              )}
              {selectedItemDetail.ir !== undefined && (
                <div>
                  <span className="text-slate-500 mr-1">Rating:</span>
                  <strong className="text-amber-300 font-mono">IR.{selectedItemDetail.ir}</strong>
                </div>
              )}
              {selectedItemDetail.reqLevel !== undefined && (
                <div>
                  <span className="text-slate-500 mr-1">Level:</span>
                  <strong className="text-slate-200 font-mono">LV.{selectedItemDetail.reqLevel}</strong>
                </div>
              )}
              <div>
                <span className="text-slate-500 mr-1">Bazaar:</span>
                <strong className={`font-mono ${selectedItemDetail.bazaar ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {selectedItemDetail.bazaar ? 'Yes' : 'No'}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 mr-1">Price (G):</span>
                <strong className="text-amber-300 font-mono">
                  {selectedItemDetail.sellPrice !== undefined ? selectedItemDetail.sellPrice.toLocaleString() : 0} G
                </strong>
              </div>
            </div>

            {/* Jobs list */}
            {selectedItemDetail.equipJobs && (
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Equippable Jobs</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItemDetail.equipJobs.map((j, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold">
                      {j}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats & Params Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Stats Table */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1">
                  Base Stats
                </h4>
                <div className="space-y-1">
                  {selectedItemDetail.physAtk !== undefined && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Attack</span>
                      <span className="font-mono text-amber-400 font-bold">{selectedItemDetail.physAtk}</span>
                    </div>
                  )}
                  {selectedItemDetail.physDef !== undefined && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Defense</span>
                      <span className="font-mono text-amber-400 font-bold">{selectedItemDetail.physDef}</span>
                    </div>
                  )}
                  {selectedItemDetail.magAtk !== undefined && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Magic Attack</span>
                      <span className="font-mono text-cyan-400 font-bold">{selectedItemDetail.magAtk}</span>
                    </div>
                  )}
                  {selectedItemDetail.magDef !== undefined && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Magic Defense</span>
                      <span className="font-mono text-cyan-400 font-bold">{selectedItemDetail.magDef}</span>
                    </div>
                  )}
                  {selectedItemDetail.crestSlots !== undefined && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Crest Slot</span>
                      <span className="font-mono text-amber-300 font-bold">{selectedItemDetail.crestSlots}</span>
                    </div>
                  )}
                  {selectedItemDetail.weight !== undefined && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Weight</span>
                      <span className="font-mono text-slate-300">{selectedItemDetail.weight}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Params Table */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1">
                  Params & Attributes
                </h4>
                <div className="space-y-1">
                  {selectedItemDetail.params && Object.keys(selectedItemDetail.params).length > 0 ? (
                    Object.entries(selectedItemDetail.params).map(([pk, pv]) => (
                      <div key={pk} className="flex justify-between text-slate-300">
                        <span className="text-slate-400">{pk}</span>
                        <span className="font-mono text-emerald-400 font-bold">{pv}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 italic text-[11px] py-1">
                      No specialized parameter modifiers.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Crafting Requirements / Recipe */}
            {selectedItemDetail.craftMaterials && selectedItemDetail.craftMaterials.length > 0 && (
              <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5" />
                    <span>Recipe & Materials</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    Fee: <strong>{selectedItemDetail.craftFee?.toLocaleString() || 0} G</strong>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {selectedItemDetail.craftMaterials.map((mat, idx) => (
                    <div key={idx} className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-200">{mat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{mat.quantity}x</span>
                        <button
                          onClick={() => {
                            setSelectedItemDetail(null);
                            onSelectItemForSpotSearch(mat.name);
                          }}
                          className="text-[10px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                          title="Locate gathering or monster drop location"
                        >
                          Locate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upgrade Progression Table (★1 to ★4 Stars) */}
            {selectedItemDetail.upgradable && selectedItemDetail.upgradeTiers && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Reinforcement Progression (★0 Base to ★4 Stars)</span>
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                  {selectedItemDetail.upgradeTiers.map((tier, idx) => (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 font-bold font-mono border border-amber-500/30">
                          {tier.grade}
                        </span>
                        <span className="text-slate-400 font-mono">{tier.costGold.toLocaleString()} G</span>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        {tier.physAtkBonus && <span className="text-amber-400 font-mono">+{tier.physAtkBonus} Atk</span>}
                        {tier.magAtkBonus && <span className="text-cyan-400 font-mono">+{tier.magAtkBonus} M.Atk</span>}
                        {tier.physDefBonus && <span className="text-amber-400 font-mono">+{tier.physDefBonus} Def</span>}
                        {tier.magDefBonus && <span className="text-cyan-400 font-mono">+{tier.magDefBonus} M.Def</span>}
                        {tier.crestSlots && <span className="text-amber-300 font-mono">+{tier.crestSlots} Slot</span>}
                      </div>

                      <div className="text-[11px] text-slate-400">
                        {tier.materials.map(m => `${m.quantity}x ${m.name}`).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referenced In / Drop Sources */}
            {selectedItemDetail.gradeupRecipes && (
              <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Referenced in Gradeup Recipes ({selectedItemDetail.gradeupRecipes.length} recipes)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-36 overflow-y-auto no-scrollbar">
                  {selectedItemDetail.gradeupRecipes.map((gr, idx) => (
                    <div key={idx} className="text-[11px] text-amber-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 truncate">
                      {gr}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Transfer Action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const targetName = selectedItemDetail.name;
                  setSelectedItemDetail(null);
                  onSelectItemForSpotSearch(targetName);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Find in World Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
