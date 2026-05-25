'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HighlightUnderline } from './SubElements';

const steps = [
  {
    id: 1,
    stepBadge: "STEP 01",
    title: "Sign in & Create Profiles",
    description: "Create a secured family account and establish personalized learning profiles for your children.",
    subText: "ONBOARD SECURE",
    headingAccent: "Screen ",
    headingHighlight: "To Skill",
    subDescription: "Secure parent credentials, kid profile, and safe onboarding.",
    imageUrl: "/images/casestudy/casestudy2.png",
    badgeText: "Profile Sync Active",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/40",
    glowColor: "from-cyan-500/12 to-indigo-500/4",
    accentColor: "text-cyan-400"
  },
  {
    id: 2,
    stepBadge: "STEP 02",
    title: "Grant Device Permissions",
    description: "Enable required device settings: App Accessibility, Overlay on App, and Usage Permissions to run active block overlays smoothly.",
    subText: "DEVICE ACCESS",
    headingAccent: "App ",
    headingHighlight: "Permissions",
    subDescription: "Grant Accessibility, Overlay, and Usage access to run overlays.",
   imageUrl: "/images/casestudy/casestudy6.png",
    badgeText: "Granted (All 3)",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/40",
    glowColor: "from-rose-500/12 to-indigo-500/4",
    accentColor: "text-rose-400"
  },
  {
    id: 3,
    stepBadge: "STEP 03",
    title: "Select Apps for Learning",
    description: "Parents choose target gaming or entertainment apps like Roblox, TikTok, YouTube, or Fortnite to regulate.",
    subText: "APP SELECTION",
    headingAccent: "Select ",
    headingHighlight: "Target Apps",
    subDescription: "Choose which highly engaging apps will trigger ScreenToSkill overlays.",
imageUrl: "/images/casestudy/casestudy8.png",
    badgeText: "Roblox Selected",
    badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/40",
    glowColor: "from-pink-500/12 to-indigo-500/4",
    accentColor: "text-pink-400"
  },
  {
    id: 4,
    stepBadge: "STEP 04",
    title: "Set Focus & Time Locks",
    description: "Schedule custom active lock schedules or quick focus intervals during studies, dinner, or bedtime.",
    subText: "TIME CONTROL",
    headingAccent: "Quick ",
    headingHighlight: "Focus Locks",
    subDescription: "Schedule specific lock windows or custom focus periods easily.",
imageUrl: "/images/casestudy/casestudy9.png",
    badgeText: "Focus Lock: Active",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/40",
    glowColor: "from-yellow-500/12 to-indigo-500/4",
    accentColor: "text-yellow-400"
  },
  {
    id: 5,
    stepBadge: "STEP 05",
    title: "Choose Age-Group Curriculums",
    description: "Adjust form settings to calibrate challenges: age 2-3 (sounds), 3-4 (shapes, colors), 4-7 (math/words), or 13+ (equations/sciences).",
    subText: "FORM SETTING",
    headingAccent: "Select ",
    headingHighlight: "Age Group",
    subDescription: "Unlock syllabus calibration for toddlers up to teenagers.",
   imageUrl: "/images/casestudy/casestudy19.png",
    badgeText: "Set: Age 4-7 Math",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/40",
    glowColor: "from-amber-500/12 to-indigo-500/4",
    accentColor: "text-amber-400"
  },
  {
    id: 6,
    stepBadge: "STEP 06",
    title: "App Startup Overlay & Reward XP",
    description: "Opening selected apps triggers the learning quiz. Solving questions correctly awards XP, logs stats, and unlocks device use.",
    subText: "APP OVERLAY & XP",
    headingAccent: "Earn ",
    headingHighlight: "XP Rewards",
    subDescription: "Every correct solution logs progress analytics and unlocks time.",
  imageUrl: "/images/casestudy/casestudy11.png",
    badgeText: "Rewarded: +100 XP",
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/40",
    glowColor: "from-violet-500/12 to-indigo-500/4",
    accentColor: "text-violet-400"
  }
];

export default function HowItWorks() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section id="how-it-works" className="relative py-14 sm:py-20 lg:py-24 bg-slate-50/20 border-b border-slate-100 overflow-hidden">
      {/* Subtle grid pattern background texture */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#00D084_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.08]" />
      
      {/* Ambient glass blur decorations */}
      <div className="absolute top-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#00D084]/15 blur-[80px] -z-10 animate-pulse duration-[8s]" />
      <div className="absolute bottom-[15%] right-[10%] w-[320px] h-[320px] rounded-full bg-emerald-400/20 blur-[100px] -z-10 animate-pulse duration-[10s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50 text-xs font-semibold text-emerald-700">
            <span>Simplified Onboarding Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">
            How it <HighlightUnderline>works</HighlightUnderline>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
            Convert addictive screen time fights into an automatic academic feedback loop. Setup takes just 3 minutes.
          </p>
        </div>

        {/* 3-Column Premium Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {steps.map((step) => {
            const isActive = activeCard === step.id;
            return (
              <div 
                key={step.id}
                id={`how-it-works-card-${step.id}`}
                onClick={() => toggleCard(step.id)}
                className={`group relative bg-[#FAFCFC]/90 backdrop-blur-md border rounded-[24px] p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-start min-h-[390px] sm:min-h-[410px] overflow-visible ${
                  isActive 
                    ? 'border-[#00D084] shadow-2xl shadow-emerald-500/10 -translate-y-1.5' 
                    : 'border-slate-200/70 hover:border-[#00D084] hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5'
                }`}
              >
                {/* Floating Step Number Circle - Top Left Corner overlapping card border */}
                <div className="absolute -top-3.5 -left-3.5 w-10.5 h-10.5 rounded-full bg-[#00D084] text-white flex items-center justify-center font-display font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/30 z-20 select-none">
                  {step.id}
                </div>

                {/* Fine tactile micro-dot grid texture background for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.16] pointer-events-none -z-10 rounded-[24px]" />
                
                {/* Visual Glass glow element behind the card */}
                <div className={`absolute -bottom-12 -right-12 w-[160px] h-[160px] rounded-full bg-gradient-to-tr ${step.glowColor} blur-[40px] pointer-events-none group-hover:scale-125 transition-transform duration-700 -z-10`} />

                {/* Top Section: Graphic/Mock Image Container */}
                <div className="relative h-[340px] w-full rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center mb-4 select-none border border-slate-200/60 p-2">
                  
                  {/* STEP BADGE floating inside the image box top-left */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center px-2.5 py-1 rounded bg-white text-[10px] font-mono font-bold text-[#00D084] tracking-wider select-none uppercase border border-emerald-100/80 shadow-md z-20">
                    {step.stepBadge}
                  </div>

                  <div className="relative w-full h-full">
                    <Image 
                      src={step.imageUrl}
                      alt={step.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 33vw"
                      referrerPolicy="no-referrer"
                      className="object-contain object-center group-hover:scale-102 transition-transform duration-500"
                    />
                    
                    {/* Bottom floating tag / status pill */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${step.badgeColor} px-2.5 py-1 rounded border uppercase tracking-tight shadow-sm`}>
                        {step.badgeText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Title and Description */}
                <div className="text-left flex flex-col justify-start">
                  <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#00D084] transition-colors leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
