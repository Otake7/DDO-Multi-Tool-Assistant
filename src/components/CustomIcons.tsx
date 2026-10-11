import React from 'react';

/**
 * XpUpIcon: Icon representing character Level & XP with a diagonally right-up arrow (XP↗).
 * Matches Lucide icon styling (24x24 viewBox, stroke-based, currentColor, round caps/joins).
 */
export const XpUpIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-4 h-4',
  size
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    aria-hidden="true"
  >
    {/* Diagonal Up-Right Arrow (top right) */}
    <path
      d="M13.5 3h7.5v7.5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 3L12.5 11.5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* 'X' Lettermark */}
    <path
      d="M2.5 13.5L7.5 21"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 13.5L2.5 21"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* 'P' Lettermark */}
    <path
      d="M10.5 21V13.5h3.6a3 3 0 0 1 0 6h-3.6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * JpIcon: Big, bold Job Points (JP) icon for Vocations & Job Targets.
 * Matches Lucide icon styling (24x24 viewBox, stroke-based, currentColor, round caps/joins).
 */
export const JpIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-4 h-4',
  size
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    aria-hidden="true"
  >
    {/* Big 'J' Lettermark */}
    <path
      d="M5 4.5h5.5v11.5a3.5 3.5 0 0 1-7 0"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Big 'P' Lettermark */}
    <path
      d="M13.5 20.5V4.5h4.8a4 4 0 0 1 0 8h-4.8"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
