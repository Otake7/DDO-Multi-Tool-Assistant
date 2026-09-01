import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Trash2,
  User,
  Shield,
  Crown,
  Sparkles,
  X,
  Clock,
  Reply,
  CornerDownRight,
  ChevronDown,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { CommunityComment, UserProfile, VoteDirection } from '../types';
import {
  addCommunityComment,
  deleteCommunityComment,
  fetchRemoteComments,
  getAllComments,
  getItemEngagementStats,
  getUserCommentVotesMap,
  getUserVotesMap,
  voteComment,
  voteItem
} from '../utils/communityStats';

interface CommunityCommentsSectionProps {
  itemId: string;
  itemTitle: string;
  itemType: 'quest' | 'preset' | 'farm_spot' | 'guide' | 'feedback';
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

// Single Threaded Node Component with visual ladder indentation & indicators
interface CommentNodeProps {
  comment: CommunityComment;
  allRepliesMap: Record<string, CommunityComment[]>;
  currentUser?: UserProfile | null;
  voterId: string;
  commentVotesMap: Record<string, VoteDirection>;
  replyingToId: string | null;
  setReplyingToId: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleReplySubmit: (parentId: string, parentAuthorName: string) => Promise<void>;
  isSubmittingReply: boolean;
  handleCommentVote: (commentId: string, direction: VoteDirection) => Promise<void>;
  handleDeleteComment: (commentId: string) => Promise<void>;
  depth: number;
}

const CommentNode: React.FC<CommentNodeProps> = ({
  comment,
  allRepliesMap,
  currentUser,
  voterId,
  commentVotesMap,
  replyingToId,
  setReplyingToId,
  replyText,
  setReplyText,
  handleReplySubmit,
  isSubmittingReply,
  handleCommentVote,
  handleDeleteComment,
  depth
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const replies = allRepliesMap[comment.id] || [];

  const isDeleted = Boolean(comment.isDeleted || comment.content === '[deleted]' || comment.authorName === '[deleted]');
  const isOwner = !isDeleted && (comment.authorRole === 'owner' || comment.authorName.toLowerCase().includes('otake7'));
  const isMod = !isDeleted && comment.authorRole === 'moderator';
  const isAuthor = !isDeleted && currentUser?.id && comment.authorId === currentUser.id;
  const userVote = commentVotesMap[comment.id] || null;
  const isReplying = replyingToId === comment.id;

  // Max visual indentation ladder clamping
  const indentLevel = Math.min(depth, 4);

  // Ladder border colors based on depth
  const ladderColors = [
    'border-amber-500/30 hover:border-amber-500/60',
    'border-sky-500/30 hover:border-sky-500/60',
    'border-emerald-500/30 hover:border-emerald-500/60',
    'border-purple-500/30 hover:border-purple-500/60',
    'border-rose-500/30 hover:border-rose-500/60'
  ];
  const borderStyle = ladderColors[indentLevel % ladderColors.length];

  return (
    <div
      className={`relative ${
        depth > 0
          ? `ml-3 sm:ml-6 pl-3 sm:pl-4 border-l-2 ${borderStyle} transition-colors mt-2.5`
          : 'mt-3'
      }`}
    >
      {/* Visual connector tick for replies */}
      {depth > 0 && (
        <div className="absolute -left-[2px] top-4 w-2.5 sm:w-3.5 h-[2px] bg-slate-700/80 rounded-r" />
      )}

      {/* Main Comment Bubble */}
      <div className={`rounded-xl border transition-all p-3 space-y-2 ${
        isDeleted
          ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
          : depth === 0 
          ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 shadow-sm'
          : 'bg-slate-900/85 border-slate-800/80 hover:border-slate-700/90'
      }`}>
        {/* Comment Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Collapse/Expand button */}
            {replies.length > 0 && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-0.5 rounded text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer mr-0.5"
                title={isCollapsed ? 'Expand thread' : 'Collapse thread'}
              >
                {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Author Avatar Badge */}
            <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
              isDeleted
                ? 'bg-slate-900 text-slate-600 border border-slate-800'
                : isOwner 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                : isMod 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                : 'bg-slate-800 text-slate-400'
            }`}>
              {isDeleted ? <Trash2 className="w-3 h-3 text-slate-600" /> : isOwner ? <Crown className="w-3 h-3 text-amber-400" /> : isMod ? <Shield className="w-3 h-3 text-cyan-400" /> : <User className="w-3 h-3 text-slate-400" />}
            </div>

            <span className={`text-xs font-bold ${isDeleted ? 'text-slate-500 italic font-mono' : isOwner ? 'text-amber-400' : isMod ? 'text-cyan-400' : 'text-slate-200'}`}>
              {isDeleted ? '[deleted]' : comment.authorName}
            </span>

            {!isDeleted && comment.authorClan && (
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

            {/* Reply pill indicator showing who this comment replies to */}
            {comment.parentAuthorName && (
              <span className="text-[10px] font-medium text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                <CornerDownRight className="w-2.5 h-2.5 text-amber-400" />
                <span>replying to <strong className="text-amber-300 font-semibold">@{comment.parentAuthorName}</strong></span>
              </span>
            )}

            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>{new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </span>
          </div>

          {/* Action Bar: Upvote, Downvote, Reply, Delete */}
          {!isDeleted && (
            <div className="flex items-center gap-1.5">
              {/* Upvote & Downvote Pill (1 Vote Limit) */}
              <div className="flex items-center gap-1 bg-slate-900/90 px-1.5 py-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => handleCommentVote(comment.id, 'up')}
                  className={`text-[11px] font-mono flex items-center gap-1 px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    userVote === 'up'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-emerald-400'
                  }`}
                  title="Upvote comment"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{comment.upvotes || 0}</span>
                </button>

                <div className="w-[1px] h-3 bg-slate-800" />

                <button
                  onClick={() => handleCommentVote(comment.id, 'down')}
                  className={`text-[11px] font-mono flex items-center gap-1 px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    userVote === 'down'
                      ? 'bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30'
                      : 'text-slate-400 hover:text-rose-400'
                  }`}
                  title="Downvote comment"
                >
                  <ThumbsDown className="w-3 h-3" />
                  <span>{comment.downvotes || 0}</span>
                </button>
              </div>

              {/* Reply Button */}
              <button
                onClick={() => {
                  if (isReplying) {
                    setReplyingToId(null);
                  } else {
                    setReplyingToId(comment.id);
                    setReplyText('');
                  }
                }}
                className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  isReplying
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-800'
                }`}
                title={`Reply to ${comment.authorName}`}
              >
                <Reply className="w-3 h-3" />
                <span>Reply</span>
              </button>

              {/* Delete button (Author or Owner/Mod only) */}
              {(isAuthor || currentUser?.role === 'owner' || currentUser?.role === 'moderator' || currentUser?.username?.toLowerCase() === 'otake7') && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Delete comment"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Comment Body */}
        {!isCollapsed && (
          <>
            {isDeleted ? (
              <p className="text-xs text-slate-500 italic pl-1 font-mono">
                [This comment has been deleted by its author, but responses remain visible below]
              </p>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed pl-1 whitespace-pre-wrap break-words">
                {comment.content}
              </p>
            )}

            {/* Inline Nested Reply Form */}
            {!isDeleted && isReplying && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 bg-slate-950/60 p-2.5 rounded-xl border border-slate-850">
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] text-amber-400 font-medium">
                  <CornerDownRight className="w-3 h-3" />
                  <span>Replying to <strong>@{comment.authorName}</strong>:</span>
                </div>

                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write your reply to ${comment.authorName}...`}
                  rows={2}
                  maxLength={400}
                  className="w-full bg-slate-900 border border-slate-750 focus:border-amber-500/80 rounded-lg p-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all resize-none"
                  autoFocus
                />

                <div className="flex items-center justify-between gap-2 mt-1.5">
                  <span className="text-[10px] text-slate-500">
                    Posting as: {currentUser?.characterName || currentUser?.username || 'Guest Arisen'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingToId(null);
                        setReplyText('');
                      }}
                      className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!replyText.trim() || isSubmittingReply}
                      onClick={() => handleReplySubmit(comment.id, comment.authorName)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg shadow cursor-pointer transition-all flex items-center gap-1"
                    >
                      <span>{isSubmittingReply ? 'Posting...' : 'Post Reply'}</span>
                      <Send className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Collapsed indicator */}
        {isCollapsed && (
          <div className="text-[11px] text-slate-500 italic pl-1 flex items-center gap-1.5">
            <span>Thread collapsed ({1 + replies.length} {1 + replies.length === 1 ? 'message' : 'messages'})</span>
            <button
              onClick={() => setIsCollapsed(false)}
              className="text-amber-400 hover:underline cursor-pointer font-medium not-italic"
            >
              Expand
            </button>
          </div>
        )}
      </div>

      {/* Nested Replies Ladder (Recursive Child Nodes) */}
      {!isCollapsed && replies.length > 0 && (
        <div className="space-y-1">
          {replies.map((child) => (
            <CommentNode
              key={child.id}
              comment={child}
              allRepliesMap={allRepliesMap}
              currentUser={currentUser}
              voterId={voterId}
              commentVotesMap={commentVotesMap}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              replyText={replyText}
              setReplyText={setReplyText}
              handleReplySubmit={handleReplySubmit}
              isSubmittingReply={isSubmittingReply}
              handleCommentVote={handleCommentVote}
              handleDeleteComment={handleDeleteComment}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentsVersion, setCommentsVersion] = useState(0);

  // Replying state for nested Reddit-style threading
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const stats = getItemEngagementStats(itemId);
  const userVotes = getUserVotesMap();
  const currentVote = userVotes[itemId] || null;
  const commentVotesMap = getUserCommentVotesMap();

  const allComments = getAllComments();

  // All comments for this item
  const itemComments = useMemo(() => {
    return allComments.filter((c) => c.itemId === itemId);
  }, [allComments, itemId, commentsVersion]);

  // Root top-level comments
  const rootComments = useMemo(() => {
    return itemComments
      .filter((c) => !c.parentId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [itemComments]);

  // Group child replies by parent ID
  const repliesByParentId = useMemo(() => {
    const map: Record<string, CommunityComment[]> = {};
    itemComments.forEach((c) => {
      if (c.parentId) {
        if (!map[c.parentId]) map[c.parentId] = [];
        map[c.parentId].push(c);
      }
    });
    // Sort replies chronologically (earliest to latest) for natural conversation ladder
    Object.keys(map).forEach((pid) => {
      map[pid].sort((a, b) => a.createdAt - b.createdAt);
    });
    return map;
  }, [itemComments]);

  const isGuest = !currentUser || currentUser.isGuest;
  const voterId = currentUser?.id || 'guest-session';

  // Live polling for comments across all screens & database
  useEffect(() => {
    let isMounted = true;
    const sync = async () => {
      if (!itemId) return;
      try {
        await fetchRemoteComments(itemId);
        if (isMounted) setCommentsVersion((v) => v + 1);
      } catch (err) {
        // ignore
      }
    };

    sync();
    const interval = setInterval(sync, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [itemId]);

  const handleVote = (direction: VoteDirection) => {
    voteItem(itemId, direction, currentUser?.id);
    setCommentsVersion((v) => v + 1);
  };

  // Submit top-level comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addCommunityComment(itemId, itemType, commentText, null, null, currentUser);
      setCommentText('');
      setCommentsVersion((v) => v + 1);
      // Immediately refresh remote
      await fetchRemoteComments(itemId);
      setCommentsVersion((v) => v + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit reply to a specific comment (ladder reply)
  const handleReplySubmit = async (parentId: string, parentAuthorName: string) => {
    if (!replyText.trim() || isSubmittingReply) return;

    setIsSubmittingReply(true);
    try {
      await addCommunityComment(itemId, itemType, replyText, parentId, parentAuthorName, currentUser);
      setReplyText('');
      setReplyingToId(null);
      setCommentsVersion((v) => v + 1);
      // Immediately refresh remote
      await fetchRemoteComments(itemId);
      setCommentsVersion((v) => v + 1);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteCommunityComment(commentId);
    setCommentsVersion((v) => v + 1);
  };

  const handleCommentVote = async (commentId: string, direction: VoteDirection) => {
    await voteComment(commentId, direction, voterId);
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
            Join the discussion, reply directly to players, and share advice. ({itemComments.length} {itemComments.length === 1 ? 'total note' : 'total notes'})
          </p>
        </div>

        {/* Voting & Score Pill for Item/Guide */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => handleVote('up')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentVote === 'up'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
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

      {/* Write New Top-Level Comment Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-2">
        <div className="relative">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              isGuest
                ? "Write a comment as Guest Arisen (or sign in to attach your character & clan)..."
                : `Start a new discussion or note as ${currentUser?.characterName || currentUser?.username}...`
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
            disabled={!commentText.trim() || isSubmitting}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <span>{isSubmitting ? 'Posting...' : 'Post Note'}</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* Reddit-Style Hierarchical Threaded Ladder List */}
      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
        {rootComments.length > 0 ? (
          rootComments.map((rootComment) => (
            <CommentNode
              key={rootComment.id}
              comment={rootComment}
              allRepliesMap={repliesByParentId}
              currentUser={currentUser}
              voterId={voterId}
              commentVotesMap={commentVotesMap}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              replyText={replyText}
              setReplyText={setReplyText}
              handleReplySubmit={handleReplySubmit}
              isSubmittingReply={isSubmittingReply}
              handleCommentVote={handleCommentVote}
              handleDeleteComment={handleDeleteComment}
              depth={0}
            />
          ))
        ) : (
          <div className="text-center py-6 bg-slate-950/40 border border-dashed border-slate-800/80 rounded-xl space-y-1">
            <MessageSquare className="w-6 h-6 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">No comments yet</p>
            <p className="text-[11px] text-slate-500">Be the first to share notes or start a discussion ladder!</p>
          </div>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 w-full max-w-2xl shadow-2xl space-y-4 max-h-[90vh] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-slate-100">
                Community Notes & Threaded Discussion
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
