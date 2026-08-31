import React, { useState, useEffect } from 'react';
import { 
  MessageSquarePlus, ThumbsUp, ThumbsDown, Star, Sparkles, Send, 
  Smile, Frown, Lightbulb, MessageCircle, Heart, User, Shield, 
  Flame, Award, Crown, CheckCircle2, AlertCircle, RefreshCw, Filter 
} from 'lucide-react';
import { UserProfile } from '../types';
import { 
  RemoteFeedback, 
  fetchRemoteFeedback, 
  submitRemoteFeedback, 
  voteRemoteFeedback 
} from '../utils/communityRoutesAndFeedbackApi';

interface FeedbackPageProps {
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({
  currentUser,
  onOpenAuth,
}) => {
  const [feedbacks, setFeedbacks] = useState<RemoteFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [filterType, setFilterType] = useState<'all' | 'praise' | 'critique' | 'feature_request' | 'general'>('all');
  const [feedbackType, setFeedbackType] = useState<'praise' | 'critique' | 'feature_request' | 'general'>('feature_request');
  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [anonymousName, setAnonymousName] = useState('');
  const [userVoted, setUserVoted] = useState<Record<string, 'like' | 'dislike'>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadFeedback = async () => {
    setIsLoading(true);
    const data = await fetchRemoteFeedback();
    if (data && data.length > 0) {
      setFeedbacks(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadFeedback();
    const interval = setInterval(loadFeedback, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Please provide both a title and details for your feedback.');
      return;
    }

    setIsSubmitting(true);
    const author = currentUser && !currentUser.isGuest
      ? currentUser.characterName || currentUser.username
      : anonymousName.trim() || 'Anonymous Arisen';

    const newFeedback: Omit<RemoteFeedback, 'likes' | 'dislikes'> = {
      id: `feedback-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      authorName: author,
      authorClan: currentUser?.clanTag,
      authorRole: currentUser?.role || (currentUser?.username?.toLowerCase() === 'otake7' ? 'owner' : 'user'),
      avatarIcon: currentUser?.avatarIcon || 'flame',
      avatarColor: currentUser?.avatarColor || 'amber',
      type: feedbackType,
      rating,
      title: title.trim(),
      content: content.trim(),
      createdAt: Date.now(),
    };

    const success = await submitRemoteFeedback(newFeedback);
    if (success) {
      setTitle('');
      setContent('');
      showToast('Thank you! Your feedback has been posted publicly to the community wall.');
      loadFeedback();
    } else {
      // Local fallback
      setFeedbacks(prev => [{ ...newFeedback, likes: 0, dislikes: 0 }, ...prev]);
      setTitle('');
      setContent('');
      showToast('Feedback submitted locally! (Will sync when database is active)');
    }
    setIsSubmitting(false);
  };

  const handleVote = async (id: string, type: 'like' | 'dislike') => {
    if (userVoted[id] === type) return;
    setUserVoted(prev => ({ ...prev, [id]: type }));

    setFeedbacks(prev =>
      prev.map(f => {
        if (f.id === id) {
          return {
            ...f,
            likes: type === 'like' ? f.likes + 1 : f.likes,
            dislikes: type === 'dislike' ? f.dislikes + 1 : f.dislikes,
          };
        }
        return f;
      })
    );

    await voteRemoteFeedback(id, type);
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    if (filterType === 'all') return true;
    return f.type === filterType;
  });

  const getTypeBadge = (type: RemoteFeedback['type']) => {
    switch (type) {
      case 'praise':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <Smile className="w-3 h-3 text-emerald-400" />
            <span>What I Like</span>
          </span>
        );
      case 'critique':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <Frown className="w-3 h-3 text-rose-400" />
            <span>What Needs Work</span>
          </span>
        );
      case 'feature_request':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            <span>Feature Request</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <MessageCircle className="w-3 h-3 text-blue-400" />
            <span>General Thoughts</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-300 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-slate-950" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Community Feedback & Suggestions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Community Voice & Suggestions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Tell us what you love, what feels awkward, and what new features or quality-of-life tools you would like to see in the Dragon's Dogma Online Multi Tool Assistant.
            </p>
          </div>

          <button
            onClick={loadFeedback}
            disabled={isLoading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
            <span>Refresh Board</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Submit Feedback Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 sticky top-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <MessageSquarePlus className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm text-slate-100">Leave Your Feedback</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Feedback Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('praise')}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      feedbackType === 'praise'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 ring-1 ring-emerald-400'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <Smile className="w-4 h-4 text-emerald-400" />
                    <span>What I Like</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeedbackType('critique')}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      feedbackType === 'critique'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 ring-1 ring-rose-400'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <Frown className="w-4 h-4 text-rose-400" />
                    <span>What I Don't Like</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeedbackType('feature_request')}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      feedbackType === 'feature_request'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 ring-1 ring-amber-400'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Feature Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeedbackType('general')}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      feedbackType === 'general'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/60 ring-1 ring-blue-400'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span>General Thought</span>
                  </button>
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Overall App Rating
                </label>
                <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 rounded-xl p-2.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-2">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Summary / Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Would love an automatic route export or Dark Knight calculator"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                  maxLength={120}
                  required
                />
              </div>

              {/* Details Content */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Detailed Feedback & Suggestions
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Explain what works well, what bugs you encountered, or what new tools would make your leveling journey smoother..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 resize-none leading-relaxed"
                  maxLength={2000}
                  required
                />
              </div>

              {/* Author field for guests */}
              {(!currentUser || currentUser.isGuest) && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Arisen Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={anonymousName}
                    onChange={(e) => setAnonymousName(e.target.value)}
                    placeholder="e.g., Arisen of Volden"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Posting...' : 'Post Public Feedback'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Public Feedback Wall */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 flex-wrap shadow-lg">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Feedback' },
                { id: 'praise', label: 'Likes' },
                { id: 'critique', label: 'Dislikes' },
                { id: 'feature_request', label: 'Features' },
                { id: 'general', label: 'General' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    filterType === tab.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 font-mono">
              {filteredFeedbacks.length} post{filteredFeedbacks.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Feedback Cards List */}
          {filteredFeedbacks.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center space-y-3">
              <Lightbulb className="w-12 h-12 text-amber-400/40 mx-auto" />
              <h4 className="text-base font-bold text-slate-300">No feedback in this category yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Be the first to share your thoughts, ideas, or suggestions on the wall!
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredFeedbacks.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 hover:border-amber-500/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getTypeBadge(item.type)}
                        
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= item.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-sm text-slate-100">{item.title}</h4>
                    </div>

                    {/* Author Badge */}
                    <div className="text-right text-[11px] text-slate-400 shrink-0">
                      <span className="font-semibold text-slate-200">{item.authorName}</span>
                      {item.authorClan && (
                        <span className="text-amber-400 font-mono ml-1">[{item.authorClan}]</span>
                      )}
                      <div className="text-[10px] text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/40 rounded-xl p-3 border border-slate-800/50">
                    {item.content}
                  </p>

                  {/* Upvote / Downvote Action Bar */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleVote(item.id, 'like')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          userVoted[item.id] === 'like'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                            : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="font-mono">{item.likes || 0}</span>
                      </button>

                      <button
                        onClick={() => handleVote(item.id, 'dislike')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          userVoted[item.id] === 'dislike'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                            : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span className="font-mono">{item.dislikes || 0}</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-500">
                      Community Vote
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
