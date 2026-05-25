'use client';

import React from 'react';

/* Beautiful custom hexagonal soundwave vector brand logo representing ScreenToSkill */
export function LogoSvg({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="11" y1="24" x2="11" y2="76" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="24" y1="17" x2="24" y2="83" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="37" y1="10" x2="37" y2="90" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="50" y1="4" x2="50" y2="96" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="63" y1="10" x2="63" y2="90" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="76" y1="17" x2="76" y2="83" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="89" y1="24" x2="89" y2="76" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
    </svg>
  );
}

/* Organic hand-drawn brush style underline to match the theme mockup exactly */
export function HighlightUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10 font-bold">{children}</span>
      <svg
        className="absolute left-0 bottom-[-4px] w-full h-[8px] text-[#00D084] pointer-events-none"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M3 6 C 25 3, 75 7, 97 4"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
