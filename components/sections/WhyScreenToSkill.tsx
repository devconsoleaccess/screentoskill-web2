"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, Lock, BarChart3 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  accentHover: string;
  iconBg: string;
  iconBgHover: string;
  iconText: string;
};

const FEATURES: Feature[] = [
  {
    icon: <GraduationCap className="w-5.5 h-5.5 stroke-[2]" />,
    title: "Reliability Parents Trust",
    desc: "Your peace of mind and child safety online are our absolute top priorities. Grade-specific locks activate instantly.",
    accent: "#553CFA",
    accentHover: "#553CFA",
    iconBg: "bg-[#EBE9FE] dark:bg-violet-500/15",
    iconBgHover: "hover:bg-[#E0DCFE] dark:hover:bg-violet-500/25",
    iconText: "text-[#553CFA] dark:text-violet-300",
  },
  {
    icon: <Lock className="w-5 h-5 stroke-[2]" />,
    title: "Outstanding Pedagogy Blocks",
    desc: "Commitment to high-performance learning values doesn't end with dry quizzes. Engage children in core skill games.",
    accent: "#0284C7",
    accentHover: "#0284C7",
    iconBg: "bg-[#E0F2FE] dark:bg-sky-500/15",
    iconBgHover: "hover:bg-[#D0ECFE] dark:hover:bg-sky-500/25",
    iconText: "text-[#0284C7] dark:text-sky-300",
  },
  {
    icon: <BarChart3 className="w-5 h-5 stroke-[2]" />,
    title: "Customized to Grade Milestone",
    desc: "Select exactly from Mathematics, elementary Science, grammar and logic puzzles matching school levels dynamically.",
    accent: "#0D9488",
    accentHover: "#0D9488",
    iconBg: "bg-[#E2F7F2] dark:bg-teal-500/15",
    iconBgHover: "hover:bg-[#CEF1EA] dark:hover:bg-teal-500/25",
    iconText: "text-[#0D9488] dark:text-teal-300",
  },
];

export default function WhyScreenToSkill() {
  return (
    <Section
      id="why-screentoskill"
      tone="subtle"
      bordered
      className="bg-[#FBFDFF]/80 dark:bg-slate-950/40"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left large visual card */}
          <div className="lg:col-span-6">
            <div className="bg-[#EBF8F4] dark:bg-emerald-950/40 border border-[#d2efe4] dark:border-emerald-900/60 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between min-h-[420px] sm:min-h-[500px] shadow-xs group">
              <div className="space-y-3 max-w-md relative z-10 text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-display font-bold text-[#0D1B15] dark:text-emerald-50 tracking-tight leading-[1.15]">
                  Why <HighlightUnderline>choose</HighlightUnderline>{" "}
                  <br className="hidden sm:block" />
                  ScreenToSkill?
                </h2>
                <p className="text-xs sm:text-sm text-[#1F5441]/85 dark:text-emerald-200/80 leading-relaxed font-normal">
                  We&apos;re your dedicated partner in converting idle
                  screen-time into valuable, parent-approved skill building
                  sessions.
                </p>
              </div>

              <div className="relative mt-6 sm:mt-10 flex justify-center w-full h-[260px] sm:h-[340px] overflow-hidden rounded-2xl">
                <Image
                  src="/kidlearn.png"
                  alt="Focused child engaged in interactive learning"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-[1.03] duration-500 ease-out transition-transform"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right feature list */}
          <div className="lg:col-span-6 space-y-20 pl-0 lg:pl-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 group text-left"
              >
                <div
                  className={`w-12 h-12 rounded-full ${feature.iconBg} ${feature.iconBgHover} flex items-center justify-center ${feature.iconText} shrink-0 shadow-xs transition-all relative overflow-hidden`}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 top-1/2 pointer-events-none opacity-5"
                    style={{ backgroundColor: feature.accent }}
                  />
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div className="space-y-1 pt-0.5">
                  <h3
                    className="font-display font-bold text-[#0D0F12] dark:text-slate-50 text-lg transition-colors leading-tight group-hover:text-[var(--accent)]"
                    style={{ "--accent": feature.accentHover } as React.CSSProperties}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
