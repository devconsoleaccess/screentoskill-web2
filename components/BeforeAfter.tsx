'use client';

import React from 'react';
import Image from 'next/image';
import { HighlightUnderline } from './SubElements';
import { ShieldX, ShieldCheck, XCircle, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

export default function BeforeAfter() {
  return (
    <section id="comparison" className="relative py-14 sm:py-20 lg:py-24 bg-[#FBFDFE] border-b border-slate-100 overflow-hidden">
      
      {/* Light background glowing spheres */}
      <div className="absolute top-[35%] left-[-10%] w-[350px] h-[350px] bg-red-50/40 rounded-full blur-[80px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[380px] h-[380px] bg-emerald-50/40 rounded-full blur-[90px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header row */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-100 bg-white text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 tracking-wider uppercase select-none">
            <span>A Healthy Digital Partnership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight animate-fade-in">
            How ScreenToSkill <HighlightUnderline>Restores</HighlightUnderline> Balance
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
            We don&apos;t block devices entirely or cause daily friction. We swap passive consumption with gamified curriculum challenges.
          </p>
        </div>

        {/* Comparison Grid split-view */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch pt-2">
          
          {/* Before view card */}
          <div className="group relative bg-white border border-slate-100 hover:border-slate-200 rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs">
            
            {/* Visual background gloss effect for interactive depth */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-rose-50/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Premium Full-Width Header Image (No Card Padding) */}
            <div className="relative w-full h-[180px] sm:h-[240px] overflow-hidden rounded-t-2xl">
              <Image 
                src="/images/braindevelop/brainrot.jpg"
                alt="Overstimulated Child Passive Screen Time"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Premium dark overlays for rich contrast and readable typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-black/30" />
              
              {/* Floating Header Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="flex items-center space-x-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-white">
                  <ShieldX className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider">Before ScreenToSkill</span>
                </div>
                
                <span className="px-2.5 py-1 rounded bg-rose-500/20 backdrop-blur-md border border-rose-500/30 text-[9px] sm:text-[10px] font-mono font-bold text-rose-300 tracking-wide select-none">
                  PASSIVE CONSUMPTION
                </span>
              </div>

              {/* Floating Headline info on bottom of image */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                <span className="text-[9px] font-mono tracking-widest text-rose-400 font-bold uppercase">DAILY FRICTION</span>
                <p className="text-white text-base sm:text-lg font-display font-bold leading-tight mt-0.5">Endless Dopamine Loops</p>
              </div>
            </div>

            {/* Card Content (Padded Content Body) */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-6">
              
              {/* Point blocks list */}
              <div className="space-y-4 text-left">
                
                <div className="flex items-start space-x-3.5">
                  <XCircle className="w-4.5 h-4.5 text-rose-500 mt-1 shrink-0" />
                  <div className="text-xs sm:text-[13px] font-normal text-slate-500 leading-relaxed">
                    <span className="font-bold text-[#1E293B] block text-sm mb-0.5">Endless Brain Rot Scrolling</span>
                    Children remain glued to reels, gaming slots and videos for hours without a structured cooling period.
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <XCircle className="w-4.5 h-4.5 text-rose-500 mt-1 shrink-0" />
                  <div className="text-xs sm:text-[13px] font-normal text-slate-500 leading-relaxed">
                    <span className="font-bold text-[#1E293B] block text-sm mb-0.5">Passive Entertainment Mindset</span>
                    Passive, mindless ingestion of video feeds limits cognitive imagination or logical recall loops.
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <XCircle className="w-4.5 h-4.5 text-rose-500 mt-1 shrink-0" />
                  <div className="text-xs sm:text-[13px] font-normal text-slate-500 leading-relaxed">
                    <span className="font-bold text-[#1E293B] block text-sm mb-0.5">Constant Screentime Arguments</span>
                    Parents and kids enter daily disputes over rules, app limit agreements, and device confiscations.
                  </div>
                </div>

              </div>

              {/* Bottom warning panel with React Icon */}
              <div className="mt-auto p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start space-x-3 text-left">
                <AlertTriangle className="w-4.5 h-4.5 text-rose-500 mt-0.5 shrink-0" />
                <p className="text-xs text-rose-800 font-normal leading-relaxed">
                  Resulting in low attention spans, lack of focus on homework, and chronic evening device dependency.
                </p>
              </div>

            </div>

          </div>

          {/* After view card */}
          <div className="group relative bg-white border border-slate-100 hover:border-slate-200 rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs">
            
            {/* Visual background gloss effect for interactive depth */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-emerald-50/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Premium Full-Width Header Image (No Card Padding) */}
            <div className="relative w-full h-[180px] sm:h-[240px] overflow-hidden rounded-t-2xl">
              <Image 
                      src="/images/braindevelop/activechild.jpg"
                alt="Cognitively Engaged Children Learning Happily"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Premium dark overlays for rich contrast and readable typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-black/30" />
              
              {/* Floating Header Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="flex items-center space-x-1.5 bg-[#00D084]/20 backdrop-blur-md px-2.5 py-1 rounded border border-[#00D084]/35 text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" />
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-100">With ScreenToSkill</span>
                </div>
                
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-300 tracking-wide select-none">
                  ACTIVE GAMIFIED EDUCATION
                </span>
              </div>

              {/* Floating Headline info on bottom of image */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                <span className="text-[9px] font-mono tracking-widest text-emerald-300 font-bold uppercase">SELF-REGULATION</span>
                <p className="text-white text-base sm:text-lg font-display font-bold leading-tight mt-0.5">Focus Slots Earned Honestly</p>
              </div>
            </div>

            {/* Card Content (Padded Content Body) */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-6">
              
              {/* Point blocks list */}
              <div className="space-y-4 text-left">
                
                <div className="flex items-start space-x-3.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-1 shrink-0" />
                  <div className="text-xs sm:text-[13px] font-normal text-slate-500 leading-relaxed">
                    <span className="font-bold text-[#1E293B] block text-sm mb-0.5">Healthy Self-Regulation Habits</span>
                    Children willingly stop entertainment to solve curriculum quest challenges and earn focus slots independently.
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-1 shrink-0" />
                  <div className="text-xs sm:text-[13px] font-normal text-slate-500 leading-relaxed">
                    <span className="font-bold text-[#1E293B] block text-sm mb-0.5">Promotes Active Cognitive Engagement</span>
                    Custom mathematics, grammar, astronomy, and science overlays keep kids actively practicing core concepts daily.
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-1 shrink-0" />
                  <div className="text-xs sm:text-[13px] font-normal text-slate-500 leading-relaxed">
                    <span className="font-bold text-[#1E293B] block text-sm mb-0.5">Productive Learning Balance</span>
                    Screen locks encourage children to deliberate before opening apps, switching attention to math challenges first.
                  </div>
                </div>

              </div>

              {/* Bottom info panel with React Icon */}
              <div className="mt-auto p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100/60 flex items-start space-x-3 text-left">
                <Lightbulb className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-850 font-normal leading-relaxed">
                  Resulting in a 41% average reduction in idle scroll time, and a huge confidence peak in school curriculum exams.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
