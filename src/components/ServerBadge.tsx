import React from 'react';
import { Server } from 'lucide-react';
import { getServerBadgeTheme } from '../utils/serverBadgeStyles';

interface ServerBadgeProps {
  server?: string | null;
  size?: 'xs' | 'sm' | 'md';
  showIcon?: boolean;
  prefix?: string;
  className?: string;
}

export const ServerBadge: React.FC<ServerBadgeProps> = ({
  server,
  size = 'sm',
  showIcon = true,
  prefix = '',
  className = ''
}) => {
  const theme = getServerBadgeTheme(server);

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5 rounded gap-1',
    sm: 'text-[10px] px-2 py-0.5 rounded-full gap-1 tracking-tight',
    md: 'text-xs px-2.5 py-1 rounded-full gap-1.5'
  }[size];

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5'
  }[size];

  return (
    <span
      className={`inline-flex items-center font-mono font-bold border transition-all select-none ${theme.badgeClass} ${sizeClasses} ${className}`}
      title={`Target Server: ${theme.label}`}
    >
      {showIcon && <Server className={`${iconSizes} opacity-85 shrink-0`} />}
      <span>
        {prefix}{theme.label}
      </span>
    </span>
  );
};
