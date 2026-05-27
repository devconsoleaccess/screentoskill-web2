import React from "react";

type Props = { className?: string };

/**
 * BEFORE illustration: child slumped over a phone, chaotic doom-scroll icons
 * raining out of the screen (TV static, infinity loop, hourglass, X reaction).
 * Desaturated rose/slate palette signals the negative state.
 */
export function PassiveScreenIllustration({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Slumped child glued to a phone, chaotic doom-scroll icons spilling out"
    >
      {/* Dim radial ground */}
      <ellipse cx="260" cy="320" rx="160" ry="14" fill="#0F172A" opacity="0.1" />

      {/* Doom-scroll cloud (background gradient blob) */}
      <ellipse cx="260" cy="120" rx="200" ry="80" fill="#FB7185" opacity="0.08" />

      {/* === Chaotic icons spilling out of the phone === */}
      {/* Infinity loop */}
      <g transform="translate(80 60)" opacity="0.85">
        <path
          d="M0 14c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14zm14-7c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"
          fill="#FB7185"
        />
        <path
          d="M28 14c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14zm14-7c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"
          fill="#F43F5E"
        />
      </g>

      {/* X reaction bubble top-right */}
      <g transform="translate(400 50) rotate(12)">
        <rect width="64" height="48" rx="10" fill="#FFFFFF" stroke="#FECACA" strokeWidth="1.5" />
        <path
          d="M22 16l20 18M42 16L22 34"
          stroke="#F43F5E"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* TV static card top-left */}
      <g transform="translate(40 130) rotate(-8)">
        <rect width="58" height="44" rx="8" fill="#FECACA" />
        <rect x="4" y="4" width="50" height="36" rx="4" fill="#FFFFFF" />
        <g stroke="#94A3B8" strokeWidth="1.2">
          <line x1="8" y1="12" x2="50" y2="12" />
          <line x1="8" y1="18" x2="50" y2="18" />
          <line x1="8" y1="24" x2="50" y2="24" />
          <line x1="8" y1="30" x2="50" y2="30" />
        </g>
      </g>

      {/* Hourglass icon */}
      <g transform="translate(420 200)" opacity="0.9">
        <path
          d="M4 0h28v6c0 6-10 12-10 16s10 10 10 16v6H4v-6c0-6 10-10 10-16S4 12 4 6V0z"
          fill="#FB7185"
        />
        <path
          d="M4 0h28v4H4zM4 40h28v4H4z"
          fill="#0F172A"
        />
      </g>

      {/* Heart-broken */}
      <g transform="translate(380 140)">
        <path
          d="M12 4c-4-4-10-4-12 0s-4 8 0 14l12 12 12-12c4-6 2-12 0-14s-8-4-12 0z"
          fill="#FB7185"
        />
        <path
          d="M12 4l3 8-4 6 5 4-2 8"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Z (sleepy) */}
      <text
        x="100"
        y="240"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        fill="#94A3B8"
        opacity="0.7"
      >
        z
      </text>
      <text
        x="120"
        y="220"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="20"
        fontWeight="800"
        fill="#94A3B8"
        opacity="0.5"
      >
        z
      </text>

      {/* === Slumped child figure === */}
      {/* Hair */}
      <path
        d="M205 130c0-16 16-28 35-28s35 12 35 28v22H205v-22z"
        fill="#1E293B"
      />
      {/* Face — tilted down */}
      <path
        d="M212 156c0-12 12-22 28-22s28 10 28 22v16c0 12-12 20-28 20s-28-8-28-20v-16z"
        fill="#FDE3CB"
      />
      {/* Hair fringe drooping */}
      <path
        d="M212 156c2-10 12-16 22-16h14c8 0 16 4 20 12-4-2-10-4-16-4h-22c-6 0-12 2-18 8z"
        fill="#1E293B"
      />
      {/* Eyes — dull, half-closed */}
      <path d="M225 168c2-1 6-1 8 0" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M245 168c2-1 6-1 8 0" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Dark circles under eyes */}
      <ellipse cx="229" cy="174" rx="5" ry="1.4" fill="#94A3B8" opacity="0.6" />
      <ellipse cx="249" cy="174" rx="5" ry="1.4" fill="#94A3B8" opacity="0.6" />
      {/* Flat mouth */}
      <path d="M232 184h14" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

      {/* Neck (slumped forward) */}
      <rect x="232" y="192" width="16" height="10" fill="#FDE3CB" />

      {/* Hoodie body — rose tint */}
      <path
        d="M198 230c0-18 14-32 42-32s42 14 42 32v50H198v-50z"
        fill="#FB7185"
      />
      {/* Hood */}
      <path
        d="M218 210c4-6 14-10 22-10s18 4 22 10c-4 4-12 6-22 6s-18-2-22-6z"
        fill="#E11D48"
      />

      {/* Arms holding phone, hunched */}
      <path
        d="M210 240c-4 12-2 28 8 36l24-8c-4-8-4-14-2-22l-30-6z"
        fill="#FDE3CB"
      />
      <path
        d="M310 240c4 12 2 28-8 36l-24-8c4-8 4-14 2-22l30-6z"
        fill="#FDE3CB"
      />

      {/* Phone (held close to face, screen glow) */}
      <g>
        <rect x="232" y="244" width="56" height="80" rx="8" fill="#0F172A" />
        <rect x="235" y="248" width="50" height="72" rx="3" fill="#1E293B" />
        {/* Endless scroll lines on screen */}
        <g fill="#475569">
          <rect x="240" y="256" width="40" height="10" rx="2" />
          <rect x="240" y="270" width="40" height="10" rx="2" />
          <rect x="240" y="284" width="40" height="10" rx="2" />
          <rect x="240" y="298" width="40" height="10" rx="2" />
        </g>
        {/* Screen glow */}
        <rect x="235" y="248" width="50" height="72" rx="3" fill="#FB7185" opacity="0.18" />
      </g>

      {/* Crossed/limp legs */}
      <path
        d="M196 312c0 0 16 16 44 16s44-16 44-16v8c-4 14-20 22-44 22s-40-8-44-22v-8z"
        fill="#475569"
      />
      <ellipse cx="218" cy="332" rx="14" ry="6" fill="#1E293B" />
      <ellipse cx="262" cy="332" rx="14" ry="6" fill="#1E293B" />
    </svg>
  );
}
