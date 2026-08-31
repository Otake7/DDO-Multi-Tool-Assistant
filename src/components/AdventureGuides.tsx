import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  PlusCircle, 
  Search, 
  FileText, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  ChevronRight, 
  ExternalLink, 
  Tag, 
  Calendar, 
  User, 
  Share2, 
  Bookmark, 
  Copy, 
  RotateCcw,
  ArrowLeft,
  Eye,
  Layers,
  HelpCircle,
  Hash,
  Image as ImageIcon,
  ZoomIn,
  X,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { GuideSubPage, UserProfile, GuideSortOption, VoteDirection } from '../types';
import { BUILTIN_GUIDES } from '../data/guidesData';
import { isImageUrl, normalizeImageUrl } from '../utils/imageHelper';
import { getItemEngagementStats, getUserVotesMap, voteItem } from '../utils/communityStats';
import { CommunityCommentsSection } from './CommunityCommentsSection';
import { fetchRemoteGuides, saveRemoteGuide, deleteRemoteGuide } from '../utils/guidesApi';

interface AdventureGuidesProps {
  onNavigateToTab?: (tab: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const AdventureGuides: React.FC<AdventureGuidesProps> = ({
  onNavigateToTab,
  currentUser,
  onOpenAuth
}) => {
  const isGuest = !currentUser || currentUser.isGuest;
  const [showAuthGateModal, setShowAuthGateModal] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [guideSortOption, setGuideSortOption] = useState<GuideSortOption>('top_rated');
  const [engagementUpdateCounter, setEngagementUpdateCounter] = useState(0);

  // --- Persistent User Guides State ---
  const [guides, setGuides] = useState<GuideSubPage[]>(() => {
    const saved = localStorage.getItem('ddon_adventure_guides_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out old deleted built-in guides
          const deletedBuiltinIds = new Set([
            'guide-pawn-team-optimization',
            'guide-vocations-and-unlocks',
            'guide-crafting-and-upgrades',
            'guide-combat-debuff-combos'
          ]);
          const userCustomOnly = parsed.filter((g: any) => !g.isBuiltIn && !deletedBuiltinIds.has(g.id));
          return [...BUILTIN_GUIDES, ...userCustomOnly];
        }
      } catch (e) {
        console.error('Failed to load saved guides', e);
      }
    }
    return BUILTIN_GUIDES;
  });

  const [selectedGuideId, setSelectedGuideId] = useState<string>(() => {
    return BUILTIN_GUIDES[0]?.id || 'guide-rising-server-rules';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const userVotes = useMemo(() => getUserVotesMap(), [engagementUpdateCounter]);

  const handleVote = (guideId: string, direction: VoteDirection, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    voteItem(guideId, direction, currentUser?.id);
    setEngagementUpdateCounter((c) => c + 1);
  };
  
  // Editor State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editCategory, setEditCategory] = useState<GuideSubPage['category']>('Progression');
  const [editAuthor, setEditAuthor] = useState<string>('');
  const [editSummary, setEditSummary] = useState<string>('');
  const [editTags, setEditTags] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage and fetch remote guides on load
  useEffect(() => {
    localStorage.setItem('ddon_adventure_guides_v2', JSON.stringify(guides));
  }, [guides]);

  // Fetch guides from Aiven database on mount
  useEffect(() => {
    fetchRemoteGuides().then((remoteGuides) => {
      if (remoteGuides && remoteGuides.length > 0) {
        setGuides((prev) => {
          const map = new Map<string, GuideSubPage>();
          // Builtins first
          BUILTIN_GUIDES.forEach((bg) => map.set(bg.id, bg));
          // Remote cloud guides next
          remoteGuides.forEach((rg) => map.set(rg.id, rg));
          // Local customs
          prev.filter((g) => !g.isBuiltIn).forEach((cg) => map.set(cg.id, cg));
          return Array.from(map.values());
        });
      }
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const categories = ['ALL', 'Progression', 'Combat & Classes', 'Pawns', 'Crafting & Gear', 'Raids & Bosses', 'Server Rules', 'Community'];

  const filteredGuides = useMemo(() => {
    const list = guides.filter((g) => {
      const matchCat = selectedCategory === 'ALL' || g.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchSummary = g.summary.toLowerCase().includes(q);
      const matchContent = g.content.toLowerCase().includes(q);
      const matchTags = g.tags.some((t) => t.toLowerCase().includes(q));
      const matchAuthor = g.author.toLowerCase().includes(q);

      return matchTitle || matchSummary || matchContent || matchTags || matchAuthor;
    });

    return list.sort((a, b) => {
      const statsA = getItemEngagementStats(a.id);
      const statsB = getItemEngagementStats(b.id);

      if (guideSortOption === 'top_rated') {
        return statsB.score - statsA.score;
      }
      if (guideSortOption === 'lowest_rated') {
        return statsA.score - statsB.score;
      }
      if (guideSortOption === 'newest') {
        return (statsB.createdAt || 0) - (statsA.createdAt || 0);
      }
      if (guideSortOption === 'oldest') {
        return (statsA.createdAt || 0) - (statsB.createdAt || 0);
      }
      return 0;
    });
  }, [guides, selectedCategory, searchQuery, guideSortOption, engagementUpdateCounter]);

  const activeGuide = useMemo(() => {
    return guides.find((g) => g.id === selectedGuideId) || filteredGuides[0] || guides[0];
  }, [guides, selectedGuideId, filteredGuides]);

  // Handlers for Sub-Page Creation & Editing
  const handleOpenCreateModal = () => {
    if (isGuest) {
      setShowAuthGateModal(true);
      return;
    }
    const defaultAuthor = currentUser?.characterName || currentUser?.username || 'Arisen';
    const authorWithClan = currentUser?.clanTag ? `${defaultAuthor} ${currentUser.clanTag}` : defaultAuthor;

    setEditingGuideId(null);
    setEditTitle('');
    setEditCategory('Progression');
    setEditAuthor(authorWithClan);
    setEditSummary('');
    setEditTags('Leveling, Guide, Strategy');
    setEditContent(`# New Adventure Guide Title

Write your custom walkthrough, route, boss strategy, or notes here.

## 1. Overview & Setup
* Point 1: Key equipment or skill requirements
* Point 2: Recommended party or pawn setup

## 2. Step-by-Step Walkthrough
Explain the strategy or farming route in detail...

> **Pro Tip**: Keep the 50% XP ring equipped from Lv 1 to 89!`);
    setIsEditing(true);
    setEditorTab('write');
  };

  const handleOpenEditModal = (guide: GuideSubPage) => {
    if (isGuest) {
      setShowAuthGateModal(true);
      return;
    }
    setEditingGuideId(guide.id);
    setEditTitle(guide.title);
    setEditCategory(guide.category);
    setEditAuthor(guide.author);
    setEditSummary(guide.summary);
    setEditTags(guide.tags.join(', '));
    setEditContent(guide.content);
    setIsEditing(true);
    setEditorTab('write');
  };

  const handleSaveGuide = () => {
    if (!editTitle.trim()) {
      showToast('Please enter a guide title.');
      return;
    }

    const tagArray = editTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingGuideId) {
      // Update existing
      const updatedGuide: GuideSubPage = {
        id: editingGuideId,
        title: editTitle.trim(),
        category: editCategory,
        author: editAuthor.trim() || 'Arisen Scholar',
        summary: editSummary.trim() || editTitle.trim(),
        tags: tagArray,
        content: editContent,
        lastUpdated: 'Recently edited',
        isBuiltIn: false,
      };

      setGuides((prev) =>
        prev.map((g) => (g.id === editingGuideId ? { ...g, ...updatedGuide } : g))
      );
      saveRemoteGuide(updatedGuide);
      showToast(`Updated sub-page "${editTitle}"`);
    } else {
      // Create new
      const newId = `custom-guide-${Date.now()}`;
      const newGuide: GuideSubPage = {
        id: newId,
        title: editTitle.trim(),
        category: editCategory,
        author: editAuthor.trim() || 'Arisen Scholar',
        summary: editSummary.trim() || editTitle.trim(),
        tags: tagArray.length > 0 ? tagArray : ['Custom Guide'],
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isBuiltIn: false,
        content: editContent
      };
      setGuides((prev) => [newGuide, ...prev]);
      setSelectedGuideId(newId);
      saveRemoteGuide(newGuide);
      showToast(`Created & published new guide "${editTitle}"`);
    }

    setIsEditing(false);
  };

  const handleDeleteGuide = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the guide "${title}"?`)) {
      setGuides((prev) => prev.filter((g) => g.id !== id));
      deleteRemoteGuide(id);
      if (selectedGuideId === id) {
        const remaining = guides.filter((g) => g.id !== id);
        setSelectedGuideId(remaining[0]?.id || '');
      }
      showToast(`Deleted "${title}"`);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset all guides and sub-pages to the default built-in compendium? Any custom guides will be replaced.')) {
      setGuides(BUILTIN_GUIDES);
      setSelectedGuideId(BUILTIN_GUIDES[0].id);
      showToast('Reset guides to official compendium');
    }
  };

  const handleCopyGuide = (content: string) => {
    navigator.clipboard.writeText(content);
    showToast('Guide content copied to clipboard!');
  };

  // Helper function to render simple markdown with full image support
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    return (
      <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // Markdown Image Syntax: ![Alt text](image_url)
          const mdImgMatch = trimmed.match(/^!\[(.*?)\]\((https?:\/\/[^\s\)]+)\)$/i);
          if (mdImgMatch) {
            const altText = mdImgMatch[1] || 'Guide Illustration';
            const imgUrl = normalizeImageUrl(mdImgMatch[2]);
            return (
              <figure key={idx} className="my-4 group">
                <div 
                  onClick={() => setPreviewImageUrl(imgUrl)}
                  className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-xl cursor-zoom-in hover:border-amber-500/50 transition-all max-w-2xl mx-auto"
                >
                  <img
                    src={imgUrl}
                    alt={altText}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-96 object-contain bg-slate-950"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] text-amber-300 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3 h-3" />
                    <span>Enlarge</span>
                  </div>
                </div>
                {altText && (
                  <figcaption className="text-center text-xs text-slate-400 mt-2 font-medium">
                    {altText}
                  </figcaption>
                )}
              </figure>
            );
          }

          // Direct Standalone Image URL on its own line (e.g. Imgur, PNG, JPG, BMP)
          if (trimmed.startsWith('http') && isImageUrl(trimmed)) {
            const imgUrl = normalizeImageUrl(trimmed);
            return (
              <figure key={idx} className="my-4 group">
                <div 
                  onClick={() => setPreviewImageUrl(imgUrl)}
                  className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-xl cursor-zoom-in hover:border-amber-500/50 transition-all max-w-2xl mx-auto"
                >
                  <img
                    src={imgUrl}
                    alt="Guide Screenshot"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-96 object-contain bg-slate-950"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] text-amber-300 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3 h-3" />
                    <span>Enlarge Photo</span>
                  </div>
                </div>
              </figure>
            );
          }

          if (trimmed.startsWith('# ')) {
            return (
              <h1 key={idx} className="text-xl sm:text-2xl font-black text-white pt-4 pb-2 border-b border-slate-800 flex items-center gap-2">
                <span className="text-amber-400">#</span>
                <span>{trimmed.replace('# ', '')}</span>
              </h1>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-lg sm:text-xl font-bold text-amber-300 pt-3 pb-1 border-b border-slate-800/60 flex items-center gap-2">
                <span className="text-amber-500">##</span>
                <span>{trimmed.replace('## ', '')}</span>
              </h2>
            );
          }
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-100 pt-2 flex items-center gap-1.5">
                <span className="text-amber-500/80">###</span>
                <span>{trimmed.replace('### ', '')}</span>
              </h3>
            );
          }
          if (trimmed.startsWith('---')) {
            return <hr key={idx} className="border-slate-800 my-4" />;
          }
          if (trimmed.startsWith('> ')) {
            return (
              <div key={idx} className="bg-amber-500/10 border-l-4 border-amber-500 p-3 rounded-r-xl text-amber-200 text-xs sm:text-sm font-medium my-2">
                {renderFormattedInline(trimmed.replace('> ', ''))}
              </div>
            );
          }
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const itemText = trimmed.replace(/^[\*\-]\s+/, '');
            return (
              <li key={idx} className="ml-5 list-disc text-slate-300 text-xs sm:text-sm py-0.5">
                {renderFormattedInline(itemText)}
              </li>
            );
          }
          if (/^\d+\.\s/.test(trimmed)) {
            return (
              <div key={idx} className="ml-2 pl-2 text-slate-300 text-xs sm:text-sm py-0.5 font-medium">
                {renderFormattedInline(trimmed)}
              </div>
            );
          }
          if (trimmed === '') {
            return <div key={idx} className="h-1" />;
          }

          return (
            <p key={idx} className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {renderFormattedInline(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // Helper for bold, code, links and inline image links
  const renderFormattedInline = (text: string) => {
    // Match bold, italic, code, markdown link [text](url), or raw URLs
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(https?:\/\/[^\s\)]+\)|https?:\/\/[^\s<>"']+)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={pIdx} className="text-amber-300 italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={pIdx} className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs border border-slate-800">{part.slice(1, -1)}</code>;
      }

      // Markdown Link: [label](url)
      const linkMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s\)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1];
        const rawUrl = linkMatch[2];
        if (isImageUrl(rawUrl)) {
          const imgUrl = normalizeImageUrl(rawUrl);
          return (
            <button
              key={pIdx}
              type="button"
              onClick={() => setPreviewImageUrl(imgUrl)}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-950 border border-amber-500/40 hover:border-amber-400 text-amber-300 rounded-lg text-xs font-semibold mx-1 cursor-zoom-in"
              title="Click to preview image"
            >
              <ImageIcon className="w-3 h-3 text-amber-400" />
              <span>{label || 'View Photo'}</span>
            </button>
          );
        }
        return (
          <a
            key={pIdx}
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-0.5 font-semibold mx-0.5"
          >
            <span>{label}</span>
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }

      // Standalone inline URL
      if (part.startsWith('http://') || part.startsWith('https://')) {
        if (isImageUrl(part)) {
          const imgUrl = normalizeImageUrl(part);
          return (
            <button
              key={pIdx}
              type="button"
              onClick={() => setPreviewImageUrl(imgUrl)}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-950 border border-amber-500/40 hover:border-amber-400 text-amber-300 rounded-lg text-xs font-semibold mx-1 cursor-zoom-in"
              title="Click to preview photo"
            >
              <ImageIcon className="w-3 h-3 text-amber-400" />
              <span>[Photo / Image Link]</span>
            </button>
          );
        }
        return (
          <a
            key={pIdx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-0.5 font-mono text-xs mx-0.5"
          >
            <span className="truncate max-w-[200px] inline-block align-bottom">{part}</span>
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }

      return part;
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-300 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Dragon's Dogma Online Adventure Guides & Compendium</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {guides.length} Sub-Pages
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Read community and official strategy guides, or create your own custom sub-pages and walkthroughs. All custom guides are saved directly to your local journal storage.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Guide / Sub-Page</span>
            </button>

            <button
              onClick={handleResetToDefaults}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
              title="Reset to default compendium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="text"
              placeholder="Search guides, sub-pages, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-slate-950 border border-slate-800 focus:border-amber-500/60 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            {/* Guide Sorting Filter */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={guideSortOption}
                onChange={(e) => setGuideSortOption(e.target.value as GuideSortOption)}
                className="bg-transparent text-amber-300 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="top_rated" className="bg-slate-950 text-slate-200">⭐ Top Rated</option>
                <option value="lowest_rated" className="bg-slate-950 text-slate-200">🔻 Lowest Rated</option>
                <option value="newest" className="bg-slate-950 text-slate-200">✨ Newest First</option>
                <option value="oldest" className="bg-slate-950 text-slate-200">⏳ Oldest First</option>
              </select>
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Sidebar of Sub-Pages + Active Guide Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Sub-Page Directory List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Guide Sub-Pages ({filteredGuides.length})</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Sorted by {guideSortOption.replace('_', ' ')}
            </span>
          </div>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1 no-scrollbar">
            {filteredGuides.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-center text-slate-500 text-xs">
                No guide sub-pages match your search. Click <strong>+ New Guide / Sub-Page</strong> above to write one!
              </div>
            ) : (
              filteredGuides.map((guide) => {
                const isSelected = activeGuide?.id === guide.id;
                const stats = getItemEngagementStats(guide.id);
                const userVote = userVotes[guide.id] || null;

                return (
                  <div
                    key={guide.id}
                    onClick={() => setSelectedGuideId(guide.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                            guide.isBuiltIn
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {guide.category}
                          </span>
                          {!guide.isBuiltIn && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                              User Created
                            </span>
                          )}
                        </div>

                        <h4 className={`text-sm font-bold leading-snug line-clamp-2 ${isSelected ? 'text-amber-300' : 'text-slate-200 group-hover:text-white'}`}>
                          {guide.title}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {guide.summary}
                        </p>
                      </div>

                      <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 font-mono">
                        <button
                          onClick={(e) => handleVote(guide.id, 'up', e)}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
                            userVote === 'up'
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                              : 'text-slate-400 hover:text-emerald-400'
                          }`}
                          title="Upvote guide"
                        >
                          <ThumbsUp className="w-2.5 h-2.5" />
                          <span>{stats.upvotes}</span>
                        </button>
                        <button
                          onClick={(e) => handleVote(guide.id, 'down', e)}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
                            userVote === 'down'
                              ? 'bg-rose-500/20 text-rose-300 font-bold'
                              : 'text-slate-400 hover:text-rose-400'
                          }`}
                          title="Downvote guide"
                        >
                          <ThumbsDown className="w-2.5 h-2.5" />
                          <span>{stats.downvotes}</span>
                        </button>
                        <span className="text-slate-500 flex items-center gap-1">
                          <MessageSquare className="w-2.5 h-2.5 text-amber-400" />
                          <span>{stats.commentsCount}</span>
                        </span>
                      </div>

                      <span className="text-slate-500 truncate max-w-[110px]">{guide.author}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Sub-Page Reader (8 cols) */}
        <div className="lg:col-span-8">
          {activeGuide ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
              
              {/* Reader Top Bar & Action Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {activeGuide.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{activeGuide.author}</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{activeGuide.lastUpdated}</span>
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {activeGuide.title}
                  </h2>
                </div>

                {/* Reader Toolbar: Upvote, Downvote, Edit, Copy, Delete */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {(() => {
                    const readerStats = getItemEngagementStats(activeGuide.id);
                    const readerVote = userVotes[activeGuide.id] || null;
                    return (
                      <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 font-mono text-xs">
                        <button
                          onClick={() => handleVote(activeGuide.id, 'up')}
                          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                            readerVote === 'up'
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                              : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                          }`}
                          title="Upvote guide"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{readerStats.upvotes}</span>
                        </button>
                        <button
                          onClick={() => handleVote(activeGuide.id, 'down')}
                          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                            readerVote === 'down'
                              ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                              : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                          }`}
                          title="Downvote guide"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span>{readerStats.downvotes}</span>
                        </button>
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => handleCopyGuide(activeGuide.content)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    title="Copy guide markdown to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(activeGuide)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Sub-Page</span>
                  </button>

                  {!activeGuide.isBuiltIn && (
                    <button
                      onClick={() => handleDeleteGuide(activeGuide.id, activeGuide.title)}
                      className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/50 transition-colors cursor-pointer"
                      title="Delete this custom guide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Tags List */}
              {activeGuide.tags && activeGuide.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  {activeGuide.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Rendered Guide Body */}
              <div className="prose prose-invert max-w-none">
                {renderMarkdown(activeGuide.content)}
              </div>

              {/* Embedded Guide Community Comments & Notes */}
              <div className="pt-6 border-t border-slate-800">
                <CommunityCommentsSection
                  itemId={activeGuide.id}
                  itemTitle={activeGuide.title}
                  itemType="guide"
                  currentUser={currentUser}
                  onOpenAuth={onOpenAuth}
                  isModal={false}
                />
              </div>

              {/* Reader Footer Navigation */}
              <div className="border-t border-slate-800/80 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Sub-page ID: <span className="font-mono text-slate-400">{activeGuide.id}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    ↑ Back to Top
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <BookOpen className="w-10 h-10 text-amber-400 mx-auto opacity-60" />
              <h3 className="text-base font-bold text-white">No Guide Selected</h3>
              <p className="text-xs text-slate-500">Select a sub-page from the left directory or write a new one.</p>
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal for Writing / Editing Guide Sub-Pages */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-5 sm:p-6 space-y-5 shadow-2xl my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {editingGuideId ? 'Edit Guide Sub-Page' : 'Create New Guide Sub-Page'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Write, format, and save custom guides and notes to your Adventure Journal.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Inputs: Title, Category, Author, Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Guide Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Volden Mines High-Speed XP Loop & Boss Strategy"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                >
                  <option value="Progression">Progression</option>
                  <option value="Combat & Classes">Combat & Classes</option>
                  <option value="Pawns">Pawns</option>
                  <option value="Crafting & Gear">Crafting & Gear</option>
                  <option value="Raids & Bosses">Raids & Bosses</option>
                  <option value="Server Rules">Server Rules</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Author Name</label>
                  <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Arisen Profile
                  </span>
                </div>
                <input
                  type="text"
                  value={editAuthor}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-950/80 border border-amber-500/40 text-amber-300 font-semibold rounded-xl focus:outline-none cursor-not-allowed"
                  title="Automatically bound to your logged-in Arisen profile"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Leveling, Volden, Sorcerer, Loop"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Short Summary</label>
                <input
                  type="text"
                  placeholder="A concise 1-2 sentence overview shown in the guide directory..."
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Write vs. Preview Tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditorTab('write')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      editorTab === 'write'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Write (Markdown)
                  </button>
                  <button
                    onClick={() => setEditorTab('preview')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      editorTab === 'preview'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Live Preview
                  </button>
                </div>

                <span className="text-[11px] text-slate-500">
                  Supports # Headings, * Lists, **Bold**, &gt; Tips
                </span>
              </div>

              {editorTab === 'write' ? (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-[11px] text-amber-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Image & Imgur links supported:</strong> Paste any direct image URL (Imgur, .png, .jpg, .bmp, .webp) on its own line or using markdown <code className="text-amber-400 font-mono">![Caption](https://i.imgur.com/example.png)</code> to display images in your guide.
                    </span>
                  </div>
                  <textarea
                    rows={13}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Type your guide content in markdown format..."
                    className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-y"
                  />
                </div>
              ) : (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-h-[350px] overflow-y-auto no-scrollbar">
                  {renderMarkdown(editContent || '*Nothing to preview yet.*')}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGuide}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Save Sub-Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Resolution Image Lightbox Modal */}
      {previewImageUrl && (
        <div 
          onClick={() => setPreviewImageUrl(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
          >
            <div className="w-full p-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300 truncate">
                <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-slate-400 truncate">{previewImageUrl}</span>
              </div>
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-auto max-h-[calc(90vh-60px)] flex items-center justify-center bg-slate-950">
              <img
                src={previewImageUrl}
                alt="Enlarged Preview"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Account Required Auth Gate Modal */}
      {showAuthGateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Arisen Account Required</h3>
                <p className="text-xs text-slate-400">Guide authorship & publishing</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              To create or edit adventure guides and custom sub-pages, you must be logged in with an Arisen account. This ensures all community walkthroughs are linked to their author's character name and server.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowAuthGateModal(false);
                  if (onOpenAuth) onOpenAuth();
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Log In / Create Account</span>
              </button>
              <button
                onClick={() => setShowAuthGateModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
