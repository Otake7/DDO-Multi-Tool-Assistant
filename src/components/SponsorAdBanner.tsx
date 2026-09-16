import React from 'react';

interface SponsorAdBannerProps {
  placement?: 'bottom_sticky' | 'inline' | 'sidebar';
  onClose?: () => void;
}

// Ads and banners completely suppressed per user request
export const SponsorAdBanner: React.FC<SponsorAdBannerProps> = () => {
  return null;
};
