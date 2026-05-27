"use client";

import React from "react";
import Image from "next/image";
import { Heart, Shield, GraduationCap, Sparkles, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

type Pillar = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const PILLARS: Pillar[] = [
  {
    icon: <Shield className="w-4.5 h-4.5 text-[var(--color-brand)]" />,
    title: "COGNITIVE BOUNDARIES",
    desc: "Positive barriers that shield young concentration spaces from reels loops.",
  },
  {
    icon: <GraduationCap className="w-4.5 h-4.5 text-[var(--color-brand)]" />,
    title: "HIGH-PERFORMANCE ED",
    desc: "School-aligned curriculum targets designed to improve skills.",
  },
  {
    icon: <Sparkles className="w-4.5 h-4.5 text-[var(--color-brand)]" />,
    title: "ACTIVE CONVERSIONS",
    desc: "Converts idle scrolling directly into structured mental puzzles.",
  },
  {
    icon: <Clock className="w-4.5 h-4.5 text-[var(--color-brand)]" />,
    title: "FAMILY PEACE ENGINE",
    desc: "Earns local rewards proudly, converting screen-friction to harmony.",
  },
];

export default function FutureVision() {
  return (
    <Section
      id="vision"
      tone="elevated"
      bordered
      className="text-slate-800 dark:text-slate-200"
    >
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-emerald-50/20 dark:bg-emerald-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--color-brand)]/5 blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 bg-[var(--color-brand)]/[0.015] [background-size:24px_24px] bg-[radial-gradient(#22C55E_1px,transparent_1px)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative group rounded-2xl overflow-hidden p-1.5 bg-slate-50 dark:bg-slate-900 shadow-sm border border-[var(--border)]">
              <div className="absolute top-[-2%] right-[-2%] w-20 h-20 rounded-full bg-[var(--color-brand)]/15 blur-2xl pointer-events-none group-hover:scale-110 transition-all duration-700" />

              <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/case2.jpg"
                  alt="Mother and daughter sharing a smile while viewing parent analytics on mobile"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] duration-500 transition-transform"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/95 dark:bg-slate-900/90 border border-[var(--border)] p-3.5 rounded-lg text-left shadow-md">
                  <span className="text-[8px] tracking-widest font-mono font-bold text-[var(--color-brand)] uppercase block leading-none">
                    POSITIVE RELATIONSHIPS
                  </span>
                  <p className="text-slate-800 dark:text-slate-100 text-xs font-normal mt-1 leading-relaxed italic">
                    &ldquo;My son no longer throws screen tantrums because
                    ScreenToSkill handles the locks as a game challenge. He
                    earns his game time honestly and feels proud about it!&rdquo;
                  </p>
                  <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1.5">
                    &mdash; Sneha Kulkarni, Pune &mdash; mother of two
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border)] bg-emerald-50/50 dark:bg-emerald-500/10 text-[10px] sm:text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider select-none">
              <Heart className="w-3.5 h-3.5 text-[var(--color-brand)] fill-[var(--color-brand)] mr-1.5 inline animate-pulse" />
              <span>THE FUTURE WE SHARE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-slate-50 leading-tight tracking-tight">
              We believe technology should help children grow, not just consume.
            </h3>

            <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
              We started ScreenToSkill to fix a universal digital parent
              dilemma: kids love interactive gadgets, but passive
              overstimulation steals away their focus during peak cognitive
              development windows.
            </p>

            <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
              Instead of dictating harsh parental blocks that provoke daily
              household friction, we create healthy boundaries where children
              learn to enjoy active problem-solving. This steady shift from
              brain-rot scrolling to targeted curriculum challenges helps kids
              self-regulate proudly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-5 border-t border-[var(--border)]">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex space-x-3 items-start md:items-center">
                  <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                    {p.icon}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-900 dark:text-slate-50 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wide block">
                      {p.title}
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 text-[10.5px] font-normal leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 select-none pt-1">
              <span className="text-[var(--color-brand)]">★ ★ ★ ★ ★</span>
              <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px] font-medium">
                Empowering over 100,000+ digital families on 5 continents
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
