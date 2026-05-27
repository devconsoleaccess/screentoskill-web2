import React from "react";

type Props = {
  className?: string;
};

/**
 * Custom SVG illustration: child focused on a tablet with floating learning
 * symbols (ABC, 123, light bulb, star) and concentric focus rings.
 * Brand emerald accents; works on light and dark backgrounds.
 */
export function FocusedChildIllustration({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Focused child learning on a tablet with floating ABC, 123 and idea symbols"
    >
      {/* Background focus rings */}
      <g opacity="0.35">
        <circle cx="260" cy="200" r="150" stroke="#22C55E" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="260" cy="200" r="110" stroke="#22C55E" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="260" cy="200" r="70" stroke="#22C55E" strokeWidth="1" strokeDasharray="3 6" />
      </g>

      {/* Soft ground shadow */}
      <ellipse cx="260" cy="320" rx="120" ry="10" fill="#0F172A" opacity="0.08" />

      {/* === Floating learning glyphs === */}
      {/* ABC card top-left */}
      <g transform="translate(60 60) rotate(-10)">
        <rect width="78" height="60" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <text
          x="39"
          y="40"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="#0F172A"
        >
          A<tspan fill="#22C55E">B</tspan>C
        </text>
      </g>

      {/* 123 card top-right */}
      <g transform="translate(395 50) rotate(8)">
        <rect width="78" height="60" rx="12" fill="#22C55E" />
        <text
          x="39"
          y="40"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="#FFFFFF"
        >
          1 2 3
        </text>
      </g>

      {/* Star icon */}
      <g transform="translate(420 200) rotate(15)">
        <path
          d="M22 2l5.4 11.5L40 15.2l-9 8.4 2.2 12.5L22 30.4l-11.2 5.7L13 23.6 4 15.2l12.6-1.7L22 2z"
          fill="#F59E0B"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
      </g>

      {/* Sparkle */}
      <g transform="translate(72 220)">
        <path
          d="M14 0l2.6 11.4L28 14l-11.4 2.6L14 28l-2.6-11.4L0 14l11.4-2.6L14 0z"
          fill="#22C55E"
        />
      </g>

      {/* Lightbulb (focus / idea) — above child's head */}
      <g transform="translate(232 22)">
        {/* Rays */}
        <g stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
          <line x1="28" y1="-6" x2="28" y2="0" />
          <line x1="6" y1="6" x2="11" y2="11" />
          <line x1="50" y1="6" x2="45" y2="11" />
        </g>
        {/* Bulb */}
        <path
          d="M28 6c-9 0-16 7-16 15.5 0 6 3.4 10.6 7.4 13v5h17.2v-5c4-2.4 7.4-7 7.4-13C44 13 37 6 28 6z"
          fill="#FEF3C7"
          stroke="#0F172A"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Base */}
        <rect x="20" y="40" width="16" height="5" rx="1.5" fill="#0F172A" />
        <rect x="22" y="46" width="12" height="3" rx="1.2" fill="#0F172A" />
        {/* Filament glow */}
        <path
          d="M22 22c2 4 4 4 6 4s4 0 6-4"
          stroke="#F59E0B"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* === Child figure (sitting cross-legged with tablet) === */}
      {/* Hair */}
      <path
        d="M225 120c0-18 16-32 35-32s35 14 35 32v18H225v-18z"
        fill="#0F172A"
      />
      {/* Face */}
      <path
        d="M232 138c0-15 12-26 28-26s28 11 28 26v22c0 14-12 24-28 24s-28-10-28-24v-22z"
        fill="#FDE3CB"
      />
      {/* Hair fringe */}
      <path
        d="M232 138c2-10 10-18 22-19l8-1c14 0 24 8 26 20-6-4-14-6-22-6h-14c-8 0-14 2-20 6z"
        fill="#0F172A"
      />
      {/* Eyes (focused, looking down at tablet) */}
      <ellipse cx="248" cy="158" rx="2.4" ry="3" fill="#0F172A" />
      <ellipse cx="272" cy="158" rx="2.4" ry="3" fill="#0F172A" />
      {/* Brows (slight downward focus) */}
      <path d="M243 150c3-1.5 7-1.5 10 0" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <path d="M267 150c3-1.5 7-1.5 10 0" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      {/* Cheek blush */}
      <circle cx="240" cy="170" r="3.5" fill="#F8B4B4" opacity="0.7" />
      <circle cx="280" cy="170" r="3.5" fill="#F8B4B4" opacity="0.7" />
      {/* Smile */}
      <path
        d="M252 174c3 3 13 3 16 0"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Neck */}
      <rect x="252" y="180" width="16" height="10" fill="#FDE3CB" />

      {/* T-shirt body */}
      <path
        d="M222 220c0-18 14-32 38-32s38 14 38 32v40H222v-40z"
        fill="#22C55E"
      />
      {/* Shirt collar */}
      <path
        d="M250 188l10 12 10-12"
        stroke="#16a34a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Shirt highlight */}
      <path d="M232 230c4-8 12-12 20-12" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Arms holding tablet */}
      <path
        d="M226 232c-6 12-6 26 0 36l24-6c-2-8-2-18 0-26l-24-4z"
        fill="#FDE3CB"
      />
      <path
        d="M294 232c6 12 6 26 0 36l-24-6c2-8 2-18 0-26l24-4z"
        fill="#FDE3CB"
      />

      {/* Tablet */}
      <g>
        <rect x="220" y="252" width="80" height="58" rx="6" fill="#0F172A" />
        <rect x="224" y="256" width="72" height="50" rx="3" fill="#FFFFFF" />
        {/* Screen content: quiz UI */}
        <rect x="230" y="262" width="60" height="4" rx="2" fill="#E5E7EB" />
        <rect x="230" y="270" width="40" height="4" rx="2" fill="#22C55E" />
        {/* MCQ options */}
        <rect x="230" y="280" width="60" height="8" rx="2" fill="#ECFDF5" stroke="#22C55E" strokeWidth="0.8" />
        <rect x="230" y="291" width="60" height="8" rx="2" fill="#F8FAFC" />
        {/* Check icon on first option */}
        <circle cx="286" cy="284" r="2.2" fill="#22C55E" />
      </g>

      {/* Crossed legs */}
      <path
        d="M218 300c0 0 14 18 42 18s42-18 42-18v8c-2 12-18 22-42 22s-40-10-42-22v-8z"
        fill="#1E293B"
      />
      <ellipse cx="238" cy="324" rx="14" ry="6" fill="#0F172A" />
      <ellipse cx="282" cy="324" rx="14" ry="6" fill="#0F172A" />

      {/* Small focus arrow pointing into tablet */}
      <g transform="translate(330 245)">
        <path
          d="M0 0c-10 4-18 12-22 22"
          stroke="#22C55E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 4"
          fill="none"
        />
        <path d="M-22 22l-2-6 6 0" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
