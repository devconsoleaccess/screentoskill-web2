import React from "react";

type Props = { className?: string };

/**
 * AFTER illustration: a child sits upright at a desk with a book, surrounded
 * by emerald rewards — trophy, +XP coins, rising bar chart, A+ grade.
 * Bright emerald palette and confident posture communicate progress.
 */
export function ActiveLearningIllustration({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Child sitting upright at a desk learning, surrounded by trophies, XP coins and rising progress chart"
    >
      {/* Bright ground */}
      <ellipse cx="260" cy="320" rx="170" ry="14" fill="#0F172A" opacity="0.08" />

      {/* Soft brand halo behind figure */}
      <ellipse cx="260" cy="160" rx="170" ry="90" fill="#22C55E" opacity="0.08" />

      {/* === Floating reward elements === */}

      {/* Trophy top-left */}
      <g transform="translate(58 60)">
        {/* Cup */}
        <path
          d="M14 6h36v18c0 12-8 22-18 22s-18-10-18-22V6z"
          fill="#F59E0B"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Handles */}
        <path
          d="M14 12c-8 0-12 4-12 8s4 8 12 8M50 12c8 0 12 4 12 8s-4 8-12 8"
          stroke="#0F172A"
          strokeWidth="2"
          fill="none"
        />
        {/* Stem */}
        <rect x="28" y="44" width="8" height="10" fill="#F59E0B" stroke="#0F172A" strokeWidth="2" />
        {/* Base */}
        <rect x="18" y="54" width="28" height="6" rx="1" fill="#F59E0B" stroke="#0F172A" strokeWidth="2" />
        {/* Star */}
        <path
          d="M32 18l2.2 4.5 5 .7-3.6 3.4.9 5L32 29l-4.5 2.6.9-5L24.8 23.2l5-.7L32 18z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="1.2"
        />
      </g>

      {/* A+ grade card top-right */}
      <g transform="translate(400 50) rotate(8)">
        <rect width="74" height="60" rx="12" fill="#FFFFFF" stroke="#22C55E" strokeWidth="2" />
        <text
          x="37"
          y="42"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="26"
          fontWeight="900"
          fill="#22C55E"
        >
          A+
        </text>
      </g>

      {/* +XP coin floating mid-right */}
      <g transform="translate(420 170)">
        <circle cx="22" cy="22" r="22" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
        <circle cx="22" cy="22" r="16" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="2 3" />
        <text
          x="22"
          y="27"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="11"
          fontWeight="900"
          fill="#0F172A"
        >
          +XP
        </text>
      </g>

      {/* Rising bar chart bottom-left */}
      <g transform="translate(50 230)">
        <rect width="68" height="48" rx="8" fill="#ECFDF5" stroke="#22C55E" strokeWidth="1.5" />
        <g fill="#22C55E">
          <rect x="10" y="30" width="8" height="10" rx="1.5" />
          <rect x="22" y="22" width="8" height="18" rx="1.5" />
          <rect x="34" y="14" width="8" height="26" rx="1.5" />
          <rect x="46" y="8" width="8" height="32" rx="1.5" />
        </g>
        {/* Trend arrow */}
        <path
          d="M10 36l14-12 12 6 14-18"
          stroke="#16a34a"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Star burst left */}
      <g transform="translate(82 160)">
        <path
          d="M14 0l3.4 8.6L26 12l-8.6 3.4L14 24l-3.4-8.6L2 12l8.6-3.4L14 0z"
          fill="#22C55E"
        />
      </g>

      {/* Lightbulb idea on top */}
      <g transform="translate(232 16)">
        <g stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
          <line x1="28" y1="-6" x2="28" y2="0" />
          <line x1="6" y1="6" x2="11" y2="11" />
          <line x1="50" y1="6" x2="45" y2="11" />
        </g>
        <path
          d="M28 6c-9 0-16 7-16 15.5 0 6 3.4 10.6 7.4 13v5h17.2v-5c4-2.4 7.4-7 7.4-13C44 13 37 6 28 6z"
          fill="#DCFCE7"
          stroke="#0F172A"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <rect x="20" y="40" width="16" height="5" rx="1.5" fill="#0F172A" />
        <rect x="22" y="46" width="12" height="3" rx="1.2" fill="#0F172A" />
        <path
          d="M22 22c2 4 4 4 6 4s4 0 6-4"
          stroke="#22C55E"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* === Confident child sitting at desk === */}
      {/* Hair */}
      <path
        d="M225 116c0-18 16-32 35-32s35 14 35 32v18H225v-18z"
        fill="#0F172A"
      />
      {/* Face — upright */}
      <path
        d="M232 134c0-15 12-26 28-26s28 11 28 26v22c0 14-12 24-28 24s-28-10-28-24v-22z"
        fill="#FDE3CB"
      />
      {/* Hair fringe */}
      <path
        d="M232 134c2-10 10-18 22-19l8-1c14 0 24 8 26 20-6-4-14-6-22-6h-14c-8 0-14 2-20 6z"
        fill="#0F172A"
      />
      {/* Eyes (bright, looking forward) */}
      <circle cx="248" cy="154" r="3" fill="#0F172A" />
      <circle cx="272" cy="154" r="3" fill="#0F172A" />
      <circle cx="249" cy="153" r="1" fill="#FFFFFF" />
      <circle cx="273" cy="153" r="1" fill="#FFFFFF" />
      {/* Brows — relaxed */}
      <path d="M243 146c3-2 7-2 10 0" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <path d="M267 146c3-2 7-2 10 0" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="240" cy="166" r="3.5" fill="#F8B4B4" opacity="0.8" />
      <circle cx="280" cy="166" r="3.5" fill="#F8B4B4" opacity="0.8" />
      {/* Big smile */}
      <path
        d="M248 172c4 5 16 5 24 0"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M250 173c3 3 14 3 20 0"
        fill="#F8B4B4"
        opacity="0.6"
      />

      {/* Neck */}
      <rect x="252" y="176" width="16" height="10" fill="#FDE3CB" />

      {/* T-shirt body — emerald brand */}
      <path
        d="M218 218c0-18 14-32 42-32s42 14 42 32v40H218v-40z"
        fill="#22C55E"
      />
      <path
        d="M250 186l10 12 10-12"
        stroke="#16a34a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Shirt fold */}
      <path
        d="M228 226c4-8 12-12 22-12"
        stroke="#4ade80"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Arms forward holding open book */}
      <path
        d="M222 232c-4 12-4 24 2 32l28-2c-2-8-2-18 0-26l-30-4z"
        fill="#FDE3CB"
      />
      <path
        d="M298 232c4 12 4 24-2 32l-28-2c2-8 2-18 0-26l30-4z"
        fill="#FDE3CB"
      />

      {/* Open book */}
      <g>
        <path
          d="M212 260l48-8 48 8v44l-48-6-48 6v-44z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Spine */}
        <line x1="260" y1="252" x2="260" y2="298" stroke="#0F172A" strokeWidth="2" />
        {/* Left-page lines */}
        <g stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round">
          <line x1="220" y1="270" x2="252" y2="266" />
          <line x1="220" y1="278" x2="252" y2="274" />
          <line x1="220" y1="286" x2="252" y2="282" />
        </g>
        {/* Right-page math (1 + 1 = 2) */}
        <text
          x="284"
          y="284"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#22C55E"
        >
          1 + 1 = 2
        </text>
        {/* Green check on left page */}
        <path
          d="M236 274l3 3 6-6"
          stroke="#22C55E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Crossed legs */}
      <path
        d="M214 300c0 0 14 18 46 18s46-18 46-18v8c-2 12-22 22-46 22s-44-10-46-22v-8z"
        fill="#1E293B"
      />
      <ellipse cx="234" cy="324" rx="14" ry="6" fill="#0F172A" />
      <ellipse cx="286" cy="324" rx="14" ry="6" fill="#0F172A" />
    </svg>
  );
}
