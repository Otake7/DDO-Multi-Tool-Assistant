import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Trash2,
  User,
  Shield,
  Flame,
  Award,
  Crown,
  Sparkles,
  X,
  Clock,
  Heart
} from 'lucide-react';
import { CommunityComment, UserProfile, VoteDirection } from '../types';
import {
  addCommunityComment,
  deleteCommunityComment,
  getAllComments,
  getItemEngagementStats,
  getUserVotesMap,
  upvoteComment,
  voteItem
} from '../utils/communityStats';

interface CommunityCommentsSectionProps {
  itemId: string;
  itemTitle: string;
  itemType: 'quest' | 'preset' | 'farm_spot' | 'guide';
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const CommunityCommentsSection: React.FC<CommunityCommentsSectionProps> = ({
  itemId,
  itemTitle,
  itemType,
  currentUser,
  onOpenAuth,
  isOpen = true,
  onClose,
  isModal = false
}) => {
  const [commentText, setCommentText] = useState('');
  const [commentsVersion, setCommentsVersion] = useState(0);

  const stats = getItemEngagementStats(itemId);
  const userVotes = getUserVotesMap();
  const currentVote = userVotes[itemId] || null;

  const allComments = getAllComments();
  const itemComments = allComments
    .filter((c) => c.itemId === itemId)
    .sort((a, b) => b.createdAt - a.createdAt);

  const isGuest = !currentUser || currentUser.isGuest;

  const handleVote = (direction: VoteDirection) => {
    voteItem(itemId, direction, currentUser?.id);
    setCommentsVersion((v) => v + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addCommunityComment(itemId, itemType, commentText, currentUser);
    setCommentText('');
    setCommentsVersion((v) => v + 1);
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommunityComment(commentId);
    setCommentsVersion((v) => v + 1);
  };

  const handleUpvoteComment = (commentId: string) => {
    upvoteComment(commentId);
    setCommentsVersion((v) => v + 1);
  };

  if (!isOpen) return null;

  const content = (
    <div className="space-y-4">
      {/* Header & Item Rating Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 line-clamp-1">
              Community Discussion • {itemTitle}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Share advice, weapon recommendations, and player feedback.
          </p>
        </div>

        {/* Voting & Score Pill */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => handleVote('up')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentVote === 'up'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-900'
            }`}
            title="Upvote this"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{stats.upvotes}</span>
          </button>

          <div className="w-[1px] h-4 bg-slate-800" />

          <button
            onClick={() => handleVote('down')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentVote === 'down'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-900'
            }`}
            title="Downvote this"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>{stats.downvotes}</span>
          </button>

          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ml-1 ${
              stats.score > 0
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : stats.score < 0
                ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            Rating: {stats.score > 0 ? `+${stats.score}` : stats.score}
          </span>
        </div>
      </div>

      {/* Write Comment Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-2">
        <div className="relative">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              isGuest
                ? "Write a comment as Guest Arisen (or sign in to attach your character & clan)..."
                : `Post a note or advice as ${currentUser?.characterName || currentUser?.username}...`
            }
            rows={2}
            maxLength={400}
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            {currentUser && !currentUser.isGuest ? (
              <span className="flex items-center gap-1 text-amber-300 font-medium">
                <User className="w-3 h-3" />
                <span>Posting as: {currentUser.characterName || currentUser.username}</span>
                {currentUser.clanTag && <span className="text-slate-400">[{currentUser.clanTag}]</span>}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-slate-500">
                <User className="w-3 h-3" />
                <span>Guest mode</span>
                {onOpenAuth && (
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="text-amber-400 hover:underline cursor-pointer ml-1"
                  >
                    • Login to save author identity
                  </button>
                )}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!commentText.trim()}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <span>Post Note</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {itemComments.length > 0 ? (
          itemComments.map((comment) => {
            const isOwner = comment.authorRole === 'owner' || comment.authorName.includes('Otake7');
            const isMod = comment.authorRole === 'moderator';
            const isAuthor = currentUser?.id && comment.authorId === currentUser.id;

            return (
              <div
                key={comment.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                      {isOwner ? (
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                      ) : isMod ? (
                        <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{comment.authorName}</span>
                    </span>

                    {comment.authorClan && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {comment.authorClan}
                      </span>
                    )}

                    {isOwner && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        OWNER
                      </span>
                    )}

                    {isMod && !isOwner && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        MOD
                      </span>
                    )}

                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleUpvoteComment(comment.id)}
                      className="text-[11px] font-mono text-slate-400 hover:text-amber-300 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 transition-colors cursor-pointer"
                      title="Like comment"
                    >
                      <Heart className="w-2.5 h-2.5 text-rose-400" />
                      <span>{comment.upvotes || 1}</span>
                    </button>

                    {(isAuthor || currentUser?.role === 'owner' || currentUser?.role === 'moderator') && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                        title="Delete comment"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-1">
                  {comment.content}
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-center py-5 bg-slate-950/40 border border-dashed border-slate-800/80 rounded-xl space-y-1">
            <MessageSquare className="w-6 h-6 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">No comments yet</p>
            <p className="text-[11px] text-slate-500">Be the first to share your notes or routing advice!</p>
          </div>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-slate-100">
                Community Notes & Feedback
              </h3>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
      {content}
    </div>
  );
};
