import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, ShieldCheck, X, Volume2, Info } from 'lucide-react';

export interface SponsorAdItem {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  badge: string;
  targetUrl: string;
  accentColor: string;
}

const DEFAULT_SPONSORS: SponsorAdItem[] = [
  {
    id: 'sponsor-dogma-rising',
    title: 'Dragon\'s Dogma Online: Dogma Rising Server',
    subtitle: 'Join the community revival project with active guilds, English translation patches & weekly raids.',
    ctaText: 'Join Discord & Play Free',
    badge: 'COMMUNITY SPONSOR',
    targetUrl: 'https://discord.gg/dragonsdogmaonline',
    accentColor: 'amber'
  },
  {
    id: 'sponsor-pawnhq',
    title: 'Arisen Pawn Vault & Gear Database',
    subtitle: 'Optimize weapon tier craftings, elemental runes, and master vocation secret skills.',
    ctaText: 'Explore Database',
    badge: 'PARTNER SPOTLIGHT',
    targetUrl: 'https://ddon.fandom.com',
    accentColor: 'purple'
  },
  {
    id: 'sponsor-crossplatform',
    title: 'Cross-Platform Companion for Windows, Linux & Android',
    subtitle: 'Calculate XP routes seamlessly offline on any device with synced Notice Board quest rotations.',
    ctaText: 'Get Desktop App',
    badge: 'MULTI-PLATFORM',
    targetUrl: '#',
    accentColor: 'emerald'
  }
];

interface SponsorAdBannerProps {
  placement?: 'bottom_sticky' | 'inline' | 'sidebar';
  onClose?: () => void;
}

export const SponsorAdBanner: React.FC<SponsorAdBannerProps> = ({
  placement = 'bottom_sticky',
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Rotate every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEFAULT_SPONSORS.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const currentAd = DEFAULT_SPONSORS[currentIndex];

  if (placement === 'bottom_sticky') {
    return (
      <aside
        id="cross-platform-sponsor-banner"
        aria-label="Community Sponsor and Announcements"
        className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-amber-500/30 px-3 py-2 sm:px-4 shadow-2xl relative z-30"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold tracking-wider shrink-0 uppercase">
              {currentAd.badge}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate text-xs">
              <strong className="text-slate-100 font-semibold truncate">
                {currentAd.title}
              </strong>
              <span className="hidden md:inline text-slate-400 truncate">
                — {currentAd.subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              id="sponsor-cta-button"
              href={currentAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 transition-all shadow-sm shadow-amber-500/20"
            >
              <span>{currentAd.ctaText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              id="dismiss-sponsor-ad"
              onClick={() => {
                setIsVisible(false);
                if (onClose) onClose();
              }}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
              title="Dismiss announcement banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div
      id="sponsor-inline-card"
      className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <div className="space-y-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
            {currentAd.badge}
          </span>
          <h4 className="text-sm font-bold text-white">{currentAd.title}</h4>
        </div>
        <p className="text-xs text-slate-400">{currentAd.subtitle}</p>
      </div>

      <a
        href={currentAd.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow shrink-0"
      >
        <span>{currentAd.ctaText}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
