import React, { useState, useEffect } from 'react';
import { 
  MessageSquarePlus, ThumbsUp, ThumbsDown, Star, Sparkles, Send, 
  Smile, Frown, Lightbulb, MessageCircle, Heart, User, Shield, 
  Flame, Award, Crown, CheckCircle2, AlertCircle, RefreshCw, Filter,
  MessageSquare, Edit3, Trash2, X, Check, ArrowRight, Clock
} from 'lucide-react';
import { UserProfile } from '../types';
import { 
  RemoteFeedback, 
  fetchRemoteFeedback, 
  submitRemoteFeedback, 
  updateRemoteFeedback,
  deleteRemoteFeedback,
  voteRemoteFeedback 
} from '../utils/communityRoutesAndFeedbackApi';
import { CommunityCommentsSection } from './CommunityCommentsSection';
import { getAllComments } from '../utils/communityStats';

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

  // Discussion modal state
  const [activeDiscussionFeedback, setActiveDiscussionFeedback] = useState<RemoteFeedback | null>(null);

  // Edit modal / inline edit state
  const [editingFeedback, setEditingFeedback] = useState<RemoteFeedback | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editType, setEditType] = useState<RemoteFeedback['type']>('feature_request');
  const [editRating, setEditRating] = useState<number>(5);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete confirm modal
  const [feedbackToDelete, setFeedbackToDelete] = useState<RemoteFeedback | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [filterType, setFilterType] = useState<'all' | 'praise' | 'critique' | 'feature_request' | 'general'>('all');
  const [feedbackType, setFeedbackType] = useState<'praise' | 'critique' | 'feature_request' | 'general'>('feature_request');
  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [anonymousName, setAnonymousName] = useState('');

  // Persistent User Votes map: { [feedbackId]: 'like' | 'dislike' }
  const [userVoted, setUserVoted] = useState<Record<string, 'like' | 'dislike'>>(() => {
    try {
      const saved = localStorage.getItem('ddon_feedback_user_votes_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track comment counts per feedback item
  const [commentsCountMap, setCommentsCountMap] = useState<Record<string, number>>({});

  // Voter ID: unique per user profile or persistent anonymous client ID
  const voterId = React.useMemo(() => {
    if (currentUser?.id && !currentUser.isGuest) return currentUser.id;
    let anon = localStorage.getItem('ddon_anon_voter_id');
    if (!anon) {
      anon = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem('ddon_anon_voter_id', anon);
    }
    return anon;
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const refreshCommentCounts = () => {
    try {
      const allComments = getAllComments();
      const map: Record<string, number> = {};
      allComments.forEach(c => {
        if (c.itemType === 'feedback' || c.itemId.startsWith('feedback-')) {
          map[c.itemId] = (map[c.itemId] || 0) + 1;
        }
      });
      setCommentsCountMap(map);
    } catch {
      // ignore
    }
  };

  const loadFeedback = async () => {
    setIsLoading(true);
    const data = await fetchRemoteFeedback();
    if (data && data.length > 0) {
      setFeedbacks(data);
    }
    refreshCommentCounts();
    setIsLoading(false);
  };

  useEffect(() => {
    loadFeedback();
    const interval = setInterval(loadFeedback, 8000);
    return () => clearInterval(interval);
  }, []);

  // Check if current logged-in user can edit or delete this feedback item
  const canModify = (item: RemoteFeedback) => {
    if (!currentUser || currentUser.isGuest) return false;
    const isOwner = currentUser.role === 'owner' || 
                    currentUser.roles?.includes('owner') || 
                    currentUser.username?.toLowerCase() === 'otake7' || 
                    currentUser.id === 'arisen-otake7-master';
    const isMod = currentUser.role === 'moderator' || 
                  currentUser.roles?.includes('moderator');
    const isAuthor = Boolean(item.authorId && item.authorId === currentUser.id);

    return isOwner || isMod || isAuthor;
  };

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
      authorId: currentUser && !currentUser.isGuest ? currentUser.id : undefined,
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

  // Fixed Strict Voting: Single vote per item, untoggle on duplicate, swap on opposite
  const handleVote = async (id: string, type: 'like' | 'dislike', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const prevVote = userVoted[id] || null;
    let nextVote: 'like' | 'dislike' | null = type;

    // Optimistic local state update
    if (prevVote === type) {
      // Untoggle vote
      nextVote = null;
      setUserVoted(prev => {
        const next = { ...prev };
        delete next[id];
        try { localStorage.setItem('ddon_feedback_user_votes_v2', JSON.stringify(next)); } catch {}
        return next;
      });

      setFeedbacks(prev =>
        prev.map(f => {
          if (f.id === id) {
            return {
              ...f,
              likes: type === 'like' ? Math.max(0, (f.likes || 0) - 1) : f.likes,
              dislikes: type === 'dislike' ? Math.max(0, (f.dislikes || 0) - 1) : f.dislikes,
            };
          }
          return f;
        })
      );
    } else if (prevVote) {
      // Swap vote
      setUserVoted(prev => {
        const next = { ...prev, [id]: type };
        try { localStorage.setItem('ddon_feedback_user_votes_v2', JSON.stringify(next)); } catch {}
        return next;
      });

      setFeedbacks(prev =>
        prev.map(f => {
          if (f.id === id) {
            if (type === 'like') {
              return {
                ...f,
                likes: (f.likes || 0) + 1,
                dislikes: Math.max(0, (f.dislikes || 0) - 1),
              };
            } else {
              return {
                ...f,
                dislikes: (f.dislikes || 0) + 1,
                likes: Math.max(0, (f.likes || 0) - 1),
              };
            }
          }
          return f;
        })
      );
    } else {
      // Fresh vote
      setUserVoted(prev => {
        const next = { ...prev, [id]: type };
        try { localStorage.setItem('ddon_feedback_user_votes_v2', JSON.stringify(next)); } catch {}
        return next;
      });

      setFeedbacks(prev =>
        prev.map(f => {
          if (f.id === id) {
            return {
              ...f,
              likes: type === 'like' ? (f.likes || 0) + 1 : f.likes,
              dislikes: type === 'dislike' ? (f.dislikes || 0) + 1 : f.dislikes,
            };
          }
          return f;
        })
      );
    }

    // Call server API
    const result = await voteRemoteFeedback(id, type, voterId);
    if (result) {
      setFeedbacks(prev =>
        prev.map(f => {
          if (f.id === id) {
            return {
              ...f,
              likes: result.likes,
              dislikes: result.dislikes,
            };
          }
          return f;
        })
      );

      if (result.userVote) {
        setUserVoted(prev => {
          const next = { ...prev, [id]: result.userVote! };
          try { localStorage.setItem('ddon_feedback_user_votes_v2', JSON.stringify(next)); } catch {}
          return next;
        });
      } else {
        setUserVoted(prev => {
          const next = { ...prev };
          delete next[id];
          try { localStorage.setItem('ddon_feedback_user_votes_v2', JSON.stringify(next)); } catch {}
          return next;
        });
      }
    }
  };

  // Open Edit Modal
  const handleStartEdit = (item: RemoteFeedback, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingFeedback(item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditType(item.type);
    setEditRating(item.rating || 5);
  };

  // Submit Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFeedback || !editTitle.trim() || !editContent.trim()) {
      showToast('Please provide both title and content.');
      return;
    }

    setIsSavingEdit(true);
    const requesterRole = currentUser?.role || (currentUser?.username?.toLowerCase() === 'otake7' ? 'owner' : 'user');
    const success = await updateRemoteFeedback(editingFeedback.id, {
      title: editTitle.trim(),
      content: editContent.trim(),
      type: editType,
      rating: editRating,
      requesterId: currentUser?.id,
      requesterRole,
    });

    if (success) {
      showToast('Feedback successfully updated!');
      setFeedbacks(prev =>
        prev.map(f => {
          if (f.id === editingFeedback.id) {
            return {
              ...f,
              title: editTitle.trim(),
              content: editContent.trim(),
              type: editType,
              rating: editRating,
              updatedAt: Date.now()
            };
          }
          return f;
        })
      );
      if (activeDiscussionFeedback?.id === editingFeedback.id) {
        setActiveDiscussionFeedback(prev => prev ? ({
          ...prev,
          title: editTitle.trim(),
          content: editContent.trim(),
          type: editType,
          rating: editRating,
          updatedAt: Date.now()
        }) : null);
      }
      setEditingFeedback(null);
    } else {
      showToast('Failed to update feedback. Please check authorization.');
    }
    setIsSavingEdit(false);
  };

  // Confirm and execute delete
  const handleConfirmDelete = async () => {
    if (!feedbackToDelete) return;
    setIsDeleting(true);

    const requesterRole = currentUser?.role || (currentUser?.username?.toLowerCase() === 'otake7' ? 'owner' : 'user');
    const success = await deleteRemoteFeedback(feedbackToDelete.id, currentUser?.id, requesterRole);

    if (success) {
      showToast('Feedback post deleted successfully.');
      setFeedbacks(prev => prev.filter(f => f.id !== feedbackToDelete.id));
      if (activeDiscussionFeedback?.id === feedbackToDelete.id) {
        setActiveDiscussionFeedback(null);
      }
      setFeedbackToDelete(null);
    } else {
      showToast('Failed to delete feedback post.');
    }
    setIsDeleting(false);
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
              <span>Public Community Feedback & Interactive Discussions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Community Voice & Suggestions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Tell us what you love, what feels awkward, and what new features you want. Click any feedback item to join the discussion and share your thoughts underneath it!
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
              {filteredFeedbacks.map((item) => {
                const commentCount = commentsCountMap[item.id] || 0;
                const userVoteState = userVoted[item.id] || null;
                const permitted = canModify(item);

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveDiscussionFeedback(item)}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 hover:border-amber-500/50 transition-all cursor-pointer group relative"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
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

                          {item.updatedAt && (
                            <span className="text-[10px] text-slate-500 italic">
                              (edited)
                            </span>
                          )}
                        </div>
                        
                        <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      {/* Author Badge and Action Controls */}
                      <div className="flex items-start gap-2 shrink-0">
                        <div className="text-right text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-200">{item.authorName}</span>
                          {item.authorClan && (
                            <span className="text-amber-400 font-mono ml-1">[{item.authorClan}]</span>
                          )}
                          <div className="text-[10px] text-slate-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {permitted && (
                          <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                            <button
                              type="button"
                              onClick={(e) => handleStartEdit(item, e)}
                              title="Edit Feedback"
                              className="p-1 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFeedbackToDelete(item);
                              }}
                              title="Delete Feedback"
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/40 rounded-xl p-3 border border-slate-800/50">
                      {item.content}
                    </p>

                    {/* Upvote / Downvote & Discussion Action Bar */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => handleVote(item.id, 'like', e)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer active:scale-95 ${
                            userVoteState === 'like'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 ring-1 ring-amber-400 font-bold'
                              : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="font-mono">{item.likes || 0}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleVote(item.id, 'dislike', e)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer active:scale-95 ${
                            userVoteState === 'dislike'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 ring-1 ring-rose-400 font-bold'
                              : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span className="font-mono">{item.dislikes || 0}</span>
                        </button>
                      </div>

                      {/* Discuss button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDiscussionFeedback(item);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Discuss Idea</span>
                        {commentCount > 0 && (
                          <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                            {commentCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Discussion Modal Popup */}
      {activeDiscussionFeedback && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-start justify-between gap-3 bg-slate-950/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getTypeBadge(activeDiscussionFeedback.type)}
                  <span className="text-xs text-slate-400">Feedback Idea Discussion</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {activeDiscussionFeedback.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveDiscussionFeedback(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Original Feedback Details */}
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/40 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">{activeDiscussionFeedback.authorName}</span>
                  {activeDiscussionFeedback.authorClan && (
                    <span className="text-amber-400 font-mono">[{activeDiscussionFeedback.authorClan}]</span>
                  )}
                  <span>•</span>
                  <span>{new Date(activeDiscussionFeedback.createdAt).toLocaleDateString()}</span>
                  {activeDiscussionFeedback.updatedAt && (
                    <span className="text-[10px] text-slate-500 italic">(edited)</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleVote(activeDiscussionFeedback.id, 'like', e)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs cursor-pointer ${
                      userVoted[activeDiscussionFeedback.id] === 'like'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 ring-1 ring-amber-400'
                        : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{activeDiscussionFeedback.likes || 0}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleVote(activeDiscussionFeedback.id, 'dislike', e)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs cursor-pointer ${
                      userVoted[activeDiscussionFeedback.id] === 'dislike'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 ring-1 ring-rose-400'
                        : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <ThumbsDown className="w-3 h-3" />
                    <span>{activeDiscussionFeedback.dislikes || 0}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                {activeDiscussionFeedback.content}
              </p>
            </div>

            {/* Embedded Discussion & Comments Section */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <CommunityCommentsSection
                itemId={activeDiscussionFeedback.id}
                itemTitle={activeDiscussionFeedback.title}
                itemType="feedback"
                currentUser={currentUser}
                onOpenAuth={onOpenAuth}
                isOpen={true}
                isModal={false}
              />
            </div>

          </div>
        </div>
      )}

      {/* Edit Feedback Modal */}
      {editingFeedback && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-slate-100">Edit Feedback Post</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingFeedback(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/60"
                >
                  <option value="praise">What I Like</option>
                  <option value="critique">What Needs Work</option>
                  <option value="feature_request">Feature Request</option>
                  <option value="general">General Thought</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Star Rating
                </label>
                <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 rounded-xl p-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= editRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-2">{editRating} / 5</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Summary / Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                  maxLength={120}
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Feedback Details
                </label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 resize-none leading-relaxed"
                  maxLength={2000}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingFeedback(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  {isSavingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {feedbackToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100">Delete Feedback</h3>
                <p className="text-xs text-slate-400">Are you sure you want to remove this post?</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 line-clamp-3">
              "{feedbackToDelete.title}"
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setFeedbackToDelete(null)}
                disabled={isDeleting}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
