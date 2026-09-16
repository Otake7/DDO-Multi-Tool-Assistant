import React, { useState, useEffect } from 'react';
import { Info, MessageSquarePlus, CheckCircle2, X, ExternalLink, AlertTriangle } from 'lucide-react';

interface StartupNoticeModalProps {
  onNavigateToFeedback?: () => void;
}

export const StartupNoticeModal: React.FC<StartupNoticeModalProps> = ({ onNavigateToFeedback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if dismissed previously
    const dismissed = localStorage.getItem('ddon_startup_notice_dismissed');
    if (!dismissed) {
      // Small timeout to allow initial render smoothly on boot
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Allow reopening through custom window event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open_startup_notice_modal', handleOpen);
    return () => window.removeEventListener('open_startup_notice_modal', handleOpen);
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('ddon_startup_notice_dismissed', 'true');
    }
    setIsOpen(false);
  };

  const handleFeedbackClick = () => {
    handleClose();
    if (onNavigateToFeedback) {
      onNavigateToFeedback();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="startup-notice-title"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="startup-notice-title" className="text-base sm:text-lg font-black text-white tracking-wide flex items-center gap-2">
                <span>Welcome to DDO Assistant</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Beta Notice
                </span>
              </h2>
              <p className="text-xs text-slate-400">Important info regarding server data & game versions</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 text-slate-200">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 leading-relaxed text-sm sm:text-base font-medium text-slate-200 shadow-inner">
            <p className="leading-relaxed">
              &ldquo;Keep in mind the data in the app is taken in the vast majority from the original game, while a little some information might be true only to the Rising server, so if your server did modify some things, the app might not show everything 100% correctly, and it's currently in the beta, so please notify me about some kinds of bugs, or discrepancies, at either Dogma Rising forum, DDO Multi-Tool Assistant page, or in the app in feedback section itself.&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Community feedback helps us continuously update drop rates, boss stats, and server customizations!</span>
          </div>

          {/* Do not show again checkbox */}
          <label className="flex items-center gap-2.5 pt-1 text-xs text-slate-400 hover:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-amber-500/20"
            />
            <span>Don't show this message automatically on boot</span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleFeedbackClick}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span>Open Feedback Section</span>
          </button>

          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs tracking-wide uppercase transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Understand / Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
};
