import { GuideServer } from '../types';

export interface ServerTheme {
  server: GuideServer;
  label: string;
  badgeClass: string;
  textClass: string;
  borderClass: string;
  bgClass: string;
  dotClass: string;
}

/**
 * Returns distinct styling for each DDON Private Server:
 * - Rising: Authentic dark bronze/warm amber background (#2b1e09), gold border (#b48226), bright gold text (#facc15) - matching in-game / screenshot aesthetic
 * - Revival: Deep crimson red background (#2d0b0e), dark crimson border (#991b1b), bright rose/red text (#f87171)
 * - Legacy: Polished silver metallic background (#1e232a), silver slate border (#94a3b8), bright metallic platinum text (#e2e8f0)
 * - All: Neutral dark slate (#0f172a), border-slate-700, text-slate-300
 */
export function getServerBadgeTheme(server?: string | null): ServerTheme {
  const norm = (server || 'All').trim().toLowerCase();

  if (norm === 'rising') {
    return {
      server: 'Rising',
      label: 'Rising',
      badgeClass: 'bg-[#2b1e09] text-[#facc15] border-[#b48226]',
      textClass: 'text-[#facc15]',
      borderClass: 'border-[#b48226]',
      bgClass: 'bg-[#2b1e09]',
      dotClass: 'bg-[#facc15]'
    };
  }

  if (norm === 'revival') {
    return {
      server: 'Revival',
      label: 'Revival',
      badgeClass: 'bg-[#2d0b0e] text-[#f87171] border-[#991b1b]',
      textClass: 'text-[#f87171]',
      borderClass: 'border-[#991b1b]',
      bgClass: 'bg-[#2d0b0e]',
      dotClass: 'bg-[#f87171]'
    };
  }

  if (norm === 'legacy') {
    return {
      server: 'Legacy',
      label: 'Legacy',
      badgeClass: 'bg-[#1e232a] text-[#e2e8f0] border-[#94a3b8]',
      textClass: 'text-[#e2e8f0]',
      borderClass: 'border-[#94a3b8]',
      bgClass: 'bg-[#1e232a]',
      dotClass: 'bg-[#e2e8f0]'
    };
  }

  return {
    server: 'All',
    label: 'All Servers',
    badgeClass: 'bg-slate-900/90 text-slate-300 border-slate-700',
    textClass: 'text-slate-300',
    borderClass: 'border-slate-700',
    bgClass: 'bg-slate-900/90',
    dotClass: 'bg-slate-400'
  };
}
