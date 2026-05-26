"use client";

import React from "react";
import Image from "next/image";
import { Heart, Shield, GraduationCap, Sparkles, Clock } from "lucide-react";

export default function FutureVision() {
  return (
    <section
      id="vision"
      className="relative py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E5E7EB] overflow-hidden text-slate-800"
    >
      {/* Immersive subtle emerald brand background details to keep it cohesive and high contrast */}
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-emerald-50/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#22C55E]/5 blur-[120px] pointer-events-none" />

      {/* Delicate non-distracting dot background structure */}
      <div className="absolute inset-0 bg-[#22C55E]/[0.015] [background-size:24px_24px] bg-[radial-gradient(#22C55E_1px,transparent_1px)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Core Vision Philosophy Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual container of parent-child bonding */}
          <div className="lg:col-span-6 animate-none max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative group rounded-2xl overflow-hidden p-1.5 bg-slate-50 shadow-sm border border-[#E5E7EB]">
              {/* Outer light glow details */}
              <div className="absolute top-[-2%] right-[-2%] w-20 h-20 rounded-full bg-[#22C55E]/15 blur-2xl pointer-events-none group-hover:scale-110 transition-all duration-700" />

              <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/case2.jpg"
                  alt="Mother and daughter sharing a smile while viewing parent analytics on mobile"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] duration-500 transition-transform"
                  referrerPolicy="no-referrer"
                />

                {/* Visual Glassmorphism highlight floating badge */}
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/95 border border-[#E5E7EB]/90 p-3.5 rounded-lg text-left shadow-md">
                  <span className="text-[8px] tracking-widest font-mono font-bold text-[#22C55E] uppercase block leading-none">
                    POSITIVE RELATIONSHIPS
                  </span>
                  <p className="text-slate-800 text-xs font-normal mt-1 leading-relaxed italic">
                    &ldquo;My son no longer throws screen tantrums because
                    ScreenToSkill handles the locks as a game challenge. He
                    earns Roblox access honest and proud!&rdquo;
                  </p>
                  <span className="block text-[10px] font-medium text-slate-500 mt-1.5">
                    &mdash; Emily S., Chicago Mother of 2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Emotional educational storytelling copy */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#E5E7EB]-150 bg-emerald-50/50 text-[10px] sm:text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider select-none">
              <Heart className="w-3.5 h-3.5 text-[#22C55E] fill-[#22C55E] mr-1.5 inline animate-pulse" />
              <span>THE FUTURE WE SHARE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 leading-tight tracking-tight">
              We believe technology should help children grow, not just consume.
            </h3>

            <p className="text-slate-550 text-xs sm:text-sm leading-relaxed font-normal">
              We started ScreenToSkill to fix a universal digital parent
              dilemma: kids love interactive gadgets, but passive
              overstimulation steals away their focus during peak cognitive
              development windows.
            </p>

            <p className="text-slate-550 text-xs sm:text-sm leading-relaxed font-normal">
              Instead of dictating harsh parental blocks that provoke daily
              household friction, we create healthy boundaries where children
              learn to enjoy active problem-solving. This steady shift from
              brain-rot scrolling to targeted curriculum challenges helps kids
              self-regulate proudly.
            </p>

            {/* Micro pills of company mission pillars with Rect Icons ( Lucide vector inside rounded-2xl blocks ) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-5 border-t border-[#E5E7EB]">
              <div className="flex space-x-3 items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-[#E5E7EB]-100 shadow-sm">
                  <Shield className="w-4.5 h-4.5 text-[#22C55E]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wide block">
                    COGNITIVE BOUNDARIES
                  </span>
                  <p className="text-slate-500 text-[10.5px] font-normal leading-relaxed">
                    Positive barriers that shield young concentration spaces
                    from reels loops.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-[#E5E7EB]-100 shadow-sm">
                  <GraduationCap className="w-4.5 h-4.5 text-[#22C55E]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wide block">
                    HIGH-PERFORMANCE ED
                  </span>
                  <p className="text-slate-500 text-[10.5px] font-normal leading-relaxed">
                    School-aligned curriculum targets designed to improve
                    skills.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-[#E5E7EB]-100/50 shadow-sm">
                  <Sparkles className="w-4.5 h-4.5 text-[#22C55E]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wide block">
                    ACTIVE CONVERSIONS
                  </span>
                  <p className="text-slate-500 text-[10.5px] font-normal leading-relaxed">
                    Converts idle scrolling directly into structured mental
                    puzzles.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start md:items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-[#E5E7EB]-100/50 shadow-sm">
                  <Clock className="w-4.5 h-4.5 text-[#22C55E]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wide block">
                    FAMILY PEACE ENGINE
                  </span>
                  <p className="text-slate-500 text-[10.5px] font-normal leading-relaxed">
                    Earns local rewards proudly, converting screen-friction to
                    harmony.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick trust metrics badge */}
            <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-500 select-none pt-1">
              <span className="text-[#22C55E]">★ ★ ★ ★ ★</span>
              <span className="text-slate-400 font-mono text-[10px] font-medium">
                Empowering over 100,000+ digital families on 5 continents
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
