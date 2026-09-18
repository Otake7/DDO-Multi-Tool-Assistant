import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle, 
  BookOpen, 
  ExternalLink,
  ThumbsUp,
  Tag,
  Database,
  ChevronDown,
  RotateCcw,
  Layers,
  FileText,
  User,
  Calendar,
  Image as ImageIcon,
  ZoomIn,
  X,
  Server
} from 'lucide-react';
import { JournalQuestion, GuideServer } from '../types';
import { INITIAL_JOURNAL_QUESTIONS, JOURNAL_CATEGORIES, searchJournalQuestions } from '../data/journalData';
import { isImageUrl, normalizeImageUrl } from '../utils/imageHelper';
import { ServerBadge } from './ServerBadge';
import { getServerBadgeTheme } from '../utils/serverBadgeStyles';

interface AskTheJournalProps {
  onNavigateToTab?: (tab: string) => void;
}

const STORAGE_KEY = 'ddon_dogma_rising_qa_v3';

export const AskTheJournal: React.FC<AskTheJournalProps> = ({ onNavigateToTab }) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  // --- Persistent Dogma Rising Q&A Database State ---
  const [questions, setQuestions] = useState<JournalQuestion[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const initialMap = new Map(INITIAL_JOURNAL_QUESTIONS.map(q => [q.id, q.server]));
          return parsed.map((item: JournalQuestion) => ({
            ...item,
            server: item.server || initialMap.get(item.id) || (item.category === 'Installation & Setup' || item.category === 'Account & Login' ? 'Rising' : 'All')
          }));
        }
      } catch (e) {
        console.error('Failed to load saved Dogma Rising Q&A questions', e);
      }
    }
    return INITIAL_JOURNAL_QUESTIONS;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedServer, setSelectedServer] = useState<string>('ALL');
  const [includeUniversal, setIncludeUniversal] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<string | null>(() => INITIAL_JOURNAL_QUESTIONS[0]?.id || null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Question Form State
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newAnswerText, setNewAnswerText] = useState<string>('');
  const [newCategory, setNewCategory] = useState<JournalQuestion['category']>('Gameplay Basics');
  const [newServer, setNewServer] = useState<GuideServer>('All');
  const [newTags, setNewTags] = useState<string>('');
  const [newSource, setNewSource] = useState<string>('');

  // Sync questions to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset the Q&A database to the official Dogma Rising Knowledge Base?')) {
      setQuestions(INITIAL_JOURNAL_QUESTIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOURNAL_QUESTIONS));
      showToast('Restored official Dogma Rising Q&A database!');
    }
  };

  const quickPrompts = [
    'Why am I getting no XP in a party?',
    'What does the Rookie Ring do?',
    'What is the best starting vocation?',
    'How do I unlock EX skills?',
    'Why do I do no damage?',
    'What are the crafting exam levels?',
    'How do I unlock Bitterblack Maze?',
    'Why does my UI break or have missing text?'
  ];

  // Filtered and Searched Questions
  const filteredQuestions = useMemo(() => {
    let list = questions;

    // Server filtering
    if (selectedServer !== 'ALL') {
      list = list.filter((q) => {
        const srv = q.server || 'All';
        if (includeUniversal) {
          return srv === selectedServer || srv === 'All';
        }
        return srv === selectedServer;
      });
    }

    if (selectedCategory !== 'ALL') {
      list = list.filter((q) => q.category === selectedCategory);
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const qLower = searchQuery.toLowerCase().trim();
    const qTerms = qLower.split(/\s+/).filter((t) => t.length > 0);

    return list
      .map((item) => {
        let score = 0;
        const questionLower = item.question.toLowerCase();
        const answerLower = item.answer.toLowerCase();
        const tagsLower = item.tags.map((t) => t.toLowerCase());
        const sourceLower = (item.source || '').toLowerCase();
        const serverLower = (item.server || 'all').toLowerCase();
        const numberStr = item.number ? `${item.number}` : '';

        // Exact phrase match
        if (questionLower.includes(qLower)) score += 100;
        if (answerLower.includes(qLower)) score += 50;
        if (sourceLower.includes(qLower)) score += 40;
        if (serverLower.includes(qLower)) score += 30;
        if (numberStr === qLower || `#${numberStr}` === qLower) score += 120;

        // Term matches
        for (const term of qTerms) {
          if (questionLower.includes(term)) score += 20;
          if (tagsLower.some((t) => t.includes(term))) score += 15;
          if (answerLower.includes(term)) score += 10;
          if (sourceLower.includes(term)) score += 8;
          if (serverLower.includes(term)) score += 8;
        }

        return { item, score };
      })
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score || (b.item.popularity || 0) - (a.item.popularity || 0))
      .map((res) => res.item);
  }, [questions, selectedServer, includeUniversal, selectedCategory, searchQuery]);

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleToggleHelpful = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHelpfulFeedback((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? 'Thank you for your feedback!' : 'Feedback updated');
      return next;
    });
  };

  const handleAddCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      showToast('Please type your question.');
      return;
    }

    const tagArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newEntry: JournalQuestion = {
      id: `dr-custom-${Date.now()}`,
      question: newQuestionText.trim(),
      answer:
        newAnswerText.trim() ||
        'This inquiry has been logged into the Dogma Rising database. Community veterans will update verified server details shortly.',
      category: newCategory,
      server: newServer,
      tags: tagArray.length > 0 ? tagArray : ['Community Question'],
      popularity: 50,
      source: newSource.trim() || 'Community Arisen',
      verified: !!newAnswerText.trim()
    };

    setQuestions((prev) => [newEntry, ...prev]);
    setExpandedId(newEntry.id);
    setNewQuestionText('');
    setNewAnswerText('');
    setNewServer('All');
    setNewTags('');
    setNewSource('');
    setIsAddingQuestion(false);
    showToast('Question saved to Dogma Rising database!');
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-300 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Hero Ask The Assistant / Dogma Rising Q&A Database Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Dogma Rising Q&A Database</span>
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Server Chat Logs & FAQ Archive
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Official reference compiled from server chat logs and community veterans (Wren, September Everglow, Font, and contributors). Search 100+ verified answers across setup, leveling, vocations, crafting, Bitterblack Maze, and endgame progression.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleResetToDefault}
              title="Reset to Official Dogma Rising QA Database"
              className="px-3 py-1.5 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>

        {/* Primary Interactive Search / Type Bar */}
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <Search className="w-5 h-5 text-amber-400" />
            </div>
            <input
              type="text"
              id="assistant-question-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Dogma Rising Q&A database... (e.g. '0 XP', 'Rookie Ring', 'High Scepter', 'BBM tickets', 'WordWrap=0')"
              className="w-full pl-12 pr-28 py-4 bg-slate-950 border-2 border-amber-500/40 focus:border-amber-400 rounded-2xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Prompts Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Popular Questions:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(prompt)}
                  className="text-xs px-3 py-1.5 bg-slate-950/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Server & Category Filters Bar */}
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Relevant Server Filter */}
              {(() => {
                const currentTheme = getServerBadgeTheme(selectedServer === 'ALL' ? 'All' : selectedServer);
                return (
                  <div className={`flex items-center gap-1.5 border rounded-xl px-2.5 py-1.5 transition-all ${
                    selectedServer === 'ALL' ? 'bg-slate-950 border-slate-800' : `${currentTheme.bgClass} ${currentTheme.borderClass}`
                  }`}>
                    <Server className={`w-3.5 h-3.5 shrink-0 ${currentTheme.textClass}`} />
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">Server:</span>
                    <select
                      id="select-journal-server-filter"
                      value={selectedServer}
                      onChange={(e) => setSelectedServer(e.target.value)}
                      className={`bg-transparent text-xs font-bold focus:outline-none cursor-pointer ${currentTheme.textClass}`}
                      title="Filter questions by relevant server"
                    >
                      <option value="ALL" className="bg-slate-950 text-slate-200">🌐 All Servers</option>
                      <option value="Rising" className="bg-[#2b1e09] text-[#facc15]">⚡ Rising</option>
                      <option value="Revival" className="bg-[#2d0b0e] text-[#f87171]">🌿 Revival</option>
                      <option value="Legacy" className="bg-[#1e232a] text-[#e2e8f0]">🏛️ Legacy</option>
                    </select>
                  </div>
                );
              })()}

              {selectedServer !== 'ALL' && (
                <button
                  type="button"
                  onClick={() => setIncludeUniversal(!includeUniversal)}
                  className={`px-2 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                    includeUniversal
                      ? 'bg-amber-950/40 text-amber-300 border-amber-500/50 hover:bg-amber-900/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title="Toggle including universal 'All' questions when filtering by server"
                >
                  <span>{includeUniversal ? '✓ Incl. All' : 'Strict Only'}</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setIsAddingQuestion(!isAddingQuestion)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isAddingQuestion ? 'Close Form' : 'Add Custom Q&A'}</span>
            </button>
          </div>

          {/* Categories horizontal scroll row */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full py-1">
            {JOURNAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-950/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Log Custom Question Form Accordion */}
      {isAddingQuestion && (
        <form onSubmit={handleAddCustomQuestion} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400">
            <MessageSquare className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Add Entry to Dogma Rising Database</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300 font-bold uppercase">Question *</label>
              <input
                type="text"
                required
                placeholder="e.g. How does /autoloot command function on Rising?"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              >
                {JOURNAL_CATEGORIES.filter((c) => c !== 'ALL').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Relevant Server */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold uppercase flex items-center gap-1">
                  <Server className="w-3 h-3 text-amber-400" />
                  Relevant Server
                </label>
                <ServerBadge server={newServer} size="xs" />
              </div>
              <select
                value={newServer}
                onChange={(e) => setNewServer(e.target.value as GuideServer)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              >
                <option value="All">🌐 All (Universal to all servers)</option>
                <option value="Rising">⚡ Rising Server</option>
                <option value="Revival">🌿 Revival Server</option>
                <option value="Legacy">🏛️ Legacy Server</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300 font-bold uppercase">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Commands, Autoloot, Looting"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300 font-bold uppercase">Source Attribution (Optional)</label>
              <input
                type="text"
                placeholder="e.g. @September Everglow, 05/15/2026"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300 font-bold uppercase">Answer Statement</label>
              <textarea
                rows={3}
                placeholder="Enter the verified response..."
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none text-xs leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingQuestion(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20"
            >
              Save to Knowledge Base
            </button>
          </div>
        </form>
      )}

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-amber-400" />
          <span>Dogma Rising Q&A Archive ({filteredQuestions.length} Entries)</span>
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>Server: <strong className="text-amber-300">{selectedServer === 'ALL' ? 'All' : selectedServer}</strong></span>
          <span>Filtered by: <strong className="text-amber-300">{selectedCategory}</strong></span>
        </div>
      </div>

      {/* List of Questions & Answers */}
      <div className="space-y-3.5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-amber-400/60 mx-auto" />
            <h4 className="text-base font-bold text-white">No Matching Q&A Found</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn't find an existing answer for "{searchQuery}". You can log this question above to add it to the assistant knowledge base!
            </p>
            <button
              onClick={() => {
                setNewQuestionText(searchQuery);
                setIsAddingQuestion(true);
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all cursor-pointer"
            >
              Log "{searchQuery}" to Database
            </button>
          </div>
        ) : (
          filteredQuestions.map((item) => {
            const isExpanded = expandedId === item.id;
            const isHelpful = helpfulFeedback[item.id];

            return (
              <div
                key={item.id}
                onClick={() => handleToggleExpand(item.id)}
                className={`bg-slate-900 border rounded-2xl transition-all cursor-pointer overflow-hidden ${
                  isExpanded
                    ? 'border-amber-500/70 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                {/* Question Header Card */}
                <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.number && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-amber-500 text-slate-950">
                          #{item.number}
                        </span>
                      )}
                      <ServerBadge server={item.server || 'All'} size="xs" />
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {item.category}
                      </span>
                      {item.verified !== false && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Server Fact</span>
                        </span>
                      )}
                      {item.source && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-500" />
                          <span>{item.source}</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    <div className={`p-1.5 rounded-xl transition-transform ${isExpanded ? 'bg-amber-500/20 text-amber-300 rotate-180' : 'bg-slate-800 text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Answer Section */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                    
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Verified Answer</span>
                        </div>
                        {item.date && (
                          <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1 lowercase font-normal">
                            <Calendar className="w-3 h-3" />
                            <span>{item.date}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 font-sans">
                        {item.answer.split('\n').map((paragraph, pIdx) => {
                          const trimmed = paragraph.trim();
                          if (!trimmed) return null;
                          if (trimmed.startsWith('http') && isImageUrl(trimmed)) {
                            const imgUrl = normalizeImageUrl(trimmed);
                            return (
                              <figure key={pIdx} className="my-2 group">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewImageUrl(imgUrl);
                                  }}
                                  className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-md cursor-zoom-in hover:border-amber-500/50 transition-all max-w-lg"
                                >
                                  <img
                                    src={imgUrl}
                                    alt="Answer Reference Screenshot"
                                    referrerPolicy="no-referrer"
                                    className="w-full max-h-72 object-contain bg-slate-950"
                                    loading="lazy"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] text-amber-300 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ZoomIn className="w-3 h-3" />
                                    <span>Enlarge</span>
                                  </div>
                                </div>
                              </figure>
                            );
                          }
                          return (
                            <p key={pIdx}>
                              {paragraph.split(/(https?:\/\/[^\s<>"']+)/g).map((chunk, cIdx) => {
                                if (chunk.startsWith('http://') || chunk.startsWith('https://')) {
                                  if (isImageUrl(chunk)) {
                                    const imgUrl = normalizeImageUrl(chunk);
                                    return (
                                      <button
                                        key={cIdx}
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPreviewImageUrl(imgUrl);
                                        }}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-950 border border-amber-500/40 hover:border-amber-400 text-amber-300 rounded-lg text-xs font-semibold mx-1 cursor-zoom-in"
                                        title="Click to preview image"
                                      >
                                        <ImageIcon className="w-3 h-3 text-amber-400" />
                                        <span>[View Image]</span>
                                      </button>
                                    );
                                  }
                                  return (
                                    <a
                                      key={cIdx}
                                      href={chunk}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-amber-400 hover:text-amber-300 underline font-semibold inline-flex items-center gap-0.5 mx-0.5"
                                    >
                                      <span>{chunk}</span>
                                      <ExternalLink className="w-3 h-3 inline" />
                                    </a>
                                  );
                                }
                                return chunk;
                              })}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    {/* Source, Discord Link, Tags & Action Link Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Tag className="w-3.5 h-3.5 text-slate-500" />
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
                        {item.discordLink && (
                          <a
                            href={item.discordLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                          >
                            <span>Discord Message</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {item.relatedTab && onNavigateToTab && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateToTab(item.relatedTab!);
                            }}
                            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>{item.relatedActionText || 'Open Tool'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          onClick={(e) => handleToggleHelpful(item.id, e)}
                          className={`p-1.5 px-3 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isHelpful
                              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                          title="Mark as helpful"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="text-[11px]">{isHelpful ? 'Helpful!' : 'Helpful?'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      {/* Full-Resolution Image Lightbox Modal */}
      {previewImageUrl && (
        <div 
          onClick={() => setPreviewImageUrl(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
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
                alt="Enlarged Screenshot"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
