"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";

type Step = {
  id: number;
  stepBadge: string;
  title: string;
  description: string;
  imageUrl: string;
  badgeText: string;
  badgeColor: string;
  glowColor: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    stepBadge: "STEP 01",
    title: "Sign in & Create Profiles",
    description:
      "Create a secured family account and establish personalized learning profiles for your children.",
    imageUrl: "/images/casestudy/casestudy2.webp",
    badgeText: "Profile Sync Active",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/40",
    glowColor: "from-cyan-500/12 to-indigo-500/4",
  },
  {
    id: 2,
    stepBadge: "STEP 02",
    title: "Grant Device Permissions",
    description:
      "Enable required device settings: App Accessibility, Overlay on App, and Usage Permissions to run active block overlays smoothly.",
    imageUrl: "/images/casestudy/casestudy6.webp",
    badgeText: "Granted (All 3)",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/40",
    glowColor: "from-rose-500/12 to-indigo-500/4",
  },
  {
    id: 3,
    stepBadge: "STEP 03",
    title: "Select Apps for Learning",
    description:
      "Parents choose target gaming or entertainment apps like Roblox, TikTok, YouTube, or Fortnite to regulate.",
    imageUrl: "/images/casestudy/casestudy8.webp",
    badgeText: "Roblox Selected",
    badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/40",
    glowColor: "from-pink-500/12 to-indigo-500/4",
  },
  {
    id: 4,
    stepBadge: "STEP 04",
    title: "Set Focus & Time Locks",
    description:
      "Schedule custom active lock schedules or quick focus intervals during studies, dinner, or bedtime.",
    imageUrl: "/images/casestudy/casestudy9.webp",
    badgeText: "Focus Lock: Active",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/40",
    glowColor: "from-yellow-500/12 to-indigo-500/4",
  },
  {
    id: 5,
    stepBadge: "STEP 05",
    title: "Choose Age-Group Curriculums",
    description:
      "Adjust form settings to calibrate challenges: age 2-3 (sounds), 3-4 (shapes, colors), 4-7 (math/words), or 13+ (equations/sciences).",
    imageUrl: "/images/casestudy/casestudy19.webp",
    badgeText: "Set: Age 4-7 Math",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/40",
    glowColor: "from-amber-500/12 to-indigo-500/4",
  },
  {
    id: 6,
    stepBadge: "STEP 06",
    title: "App Startup Overlay & Reward XP",
    description:
      "Opening selected apps triggers the learning quiz. Solving questions correctly awards XP, logs stats, and unlocks device use.",
    imageUrl: "/images/casestudy/casestudy11.webp",
    badgeText: "Rewarded: +100 XP",
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/40",
    glowColor: "from-violet-500/12 to-indigo-500/4",
  },
];

export default function HowItWorks() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <Section id="how-it-works" tone="muted" bordered className="bg-slate-50/20 dark:bg-slate-950/40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#22C55E_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.08]" />

      <div className="absolute top-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-[var(--color-brand)]/15 blur-[80px] -z-10 animate-pulse [animation-duration:8s]" />
      <div className="absolute bottom-[15%] right-[10%] w-[320px] h-[320px] rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-[100px] -z-10 animate-pulse [animation-duration:10s]" />

      <Container className="relative">
        <SectionHeading
          className="mx-auto mb-14 sm:mb-18"
          eyebrow={<Badge variant="brand">Simplified Onboarding Process</Badge>}
          title={
            <>
              How it <HighlightUnderline>works</HighlightUnderline>
            </>
          }
          description="Convert addictive screen time fights into an automatic academic feedback loop. Setup takes just 3 minutes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {STEPS.map((step) => {
            const isActive = activeCard === step.id;
            return (
              <div
                key={step.id}
                id={`how-it-works-card-${step.id}`}
                onClick={() => setActiveCard(isActive ? null : step.id)}
                className={`group relative bg-[#FAFCFC]/90 dark:bg-slate-900/60 backdrop-blur-md border rounded-[24px] p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-start min-h-[390px] sm:min-h-[410px] overflow-visible ${
                  isActive
                    ? "border-[var(--color-brand)] shadow-2xl shadow-emerald-500/10 -translate-y-1.5"
                    : "border-slate-200/70 dark:border-slate-700/60 hover:border-[var(--color-brand)] hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5"
                }`}
              >
                <div className="absolute -top-3.5 -left-3.5 w-10.5 h-10.5 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center font-display font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/30 z-20 select-none">
                  {step.id}
                </div>

                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.16] pointer-events-none -z-10 rounded-[24px]" />

                <div
                  className={`absolute -bottom-12 -right-12 w-[160px] h-[160px] rounded-full bg-gradient-to-tr ${step.glowColor} blur-[40px] pointer-events-none group-hover:scale-125 transition-transform duration-700 -z-10`}
                />

                <div className="relative h-[340px] w-full rounded-2xl bg-slate-50 dark:bg-slate-800/60 overflow-hidden flex items-center justify-center mb-4 select-none border border-slate-200/60 dark:border-slate-700 p-2">
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center px-2.5 py-1 rounded bg-white dark:bg-slate-900 text-[10px] font-mono font-bold text-[var(--color-brand)] tracking-wider select-none uppercase border border-emerald-100/80 dark:border-emerald-500/30 shadow-md z-20">
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

                    <div className="absolute bottom-3 left-3 z-20">
                      <span
                        className={`text-[10px] sm:text-[11px] font-mono font-bold ${step.badgeColor} px-2.5 py-1 rounded border uppercase tracking-tight shadow-sm`}
                      >
                        {step.badgeText}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left flex flex-col justify-start">
                  <h3 className="font-display font-bold text-slate-900 dark:text-slate-50 text-sm sm:text-base group-hover:text-[var(--color-brand)] transition-colors leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
