"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldX,
  ShieldCheck,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";

type Point = { title: string; body: string };

type Side = {
  variant: "before" | "after";
  badge: { icon: React.ReactNode; label: string };
  tag: string;
  eyebrow: { label: string; tone: string };
  headline: string;
  image: { src: string; alt: string };
  points: Point[];
  footer: { icon: React.ReactNode; body: string };
};

const BEFORE: Side = {
  variant: "before",
  badge: {
    icon: <ShieldX className="w-3.5 h-3.5 text-rose-400" />,
    label: "Before ScreenToSkill",
  },
  tag: "PASSIVE CONSUMPTION",
  eyebrow: { label: "DAILY FRICTION", tone: "text-rose-400" },
  headline: "Endless Dopamine Loops",
  image: {
    src: "/images/braindevelop/brainrot.jpg",
    alt: "Overstimulated child passive screen time",
  },
  points: [
    {
      title: "Endless Brain Rot Scrolling",
      body: "Children remain glued to reels, gaming slots and videos for hours without a structured cooling period.",
    },
    {
      title: "Passive Entertainment Mindset",
      body: "Passive, mindless ingestion of video feeds limits cognitive imagination or logical recall loops.",
    },
    {
      title: "Constant Screentime Arguments",
      body: "Parents and kids enter daily disputes over rules, app limit agreements, and device confiscations.",
    },
  ],
  footer: {
    icon: <AlertTriangle className="w-4.5 h-4.5 text-rose-500 mt-0.5 shrink-0" />,
    body: "Resulting in low attention spans, lack of focus on homework, and chronic evening device dependency.",
  },
};

const AFTER: Side = {
  variant: "after",
  badge: {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand)]" />,
    label: "With ScreenToSkill",
  },
  tag: "ACTIVE GAMIFIED EDUCATION",
  eyebrow: { label: "SELF-REGULATION", tone: "text-emerald-300" },
  headline: "Focus Slots Earned Honestly",
  image: {
    src: "/images/braindevelop/activechild.jpg",
    alt: "Cognitively engaged child learning happily",
  },
  points: [
    {
      title: "Healthy Self-Regulation Habits",
      body: "Children willingly stop entertainment to solve curriculum quest challenges and earn focus slots independently.",
    },
    {
      title: "Promotes Active Cognitive Engagement",
      body: "Custom mathematics, grammar, astronomy, and science overlays keep kids actively practicing core concepts daily.",
    },
    {
      title: "Productive Learning Balance",
      body: "Screen locks encourage children to deliberate before opening apps, switching attention to math challenges first.",
    },
  ],
  footer: {
    icon: <Lightbulb className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />,
    body: "Resulting in a 41% average reduction in idle scroll time, and a huge confidence peak in school curriculum exams.",
  },
};

function ComparisonCard({ side }: { side: Side }) {
  const isBefore = side.variant === "before";
  const tagColor = isBefore
    ? "bg-rose-500/20 backdrop-blur-md border-rose-500/30 text-rose-300"
    : "bg-emerald-500/20 backdrop-blur-md border-emerald-500/30 text-emerald-300";
  const PointIcon = isBefore ? XCircle : CheckCircle2;
  const pointColor = isBefore ? "text-rose-500" : "text-emerald-500";
  const footerBg = isBefore
    ? "bg-rose-50/70 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-800 dark:text-rose-200"
    : "bg-emerald-50/70 dark:bg-emerald-500/10 border-emerald-100/60 dark:border-emerald-500/20 text-emerald-850 dark:text-emerald-200";
  return (
    <div className="group relative bg-[var(--surface)] border border-[var(--border)] hover:border-slate-200 dark:hover:border-slate-700 rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs">
      <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[440px] overflow-hidden rounded-t-2xl">
        <Image
          src={side.image.src}
          alt={side.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-black/30" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className={`flex items-center space-x-1.5 backdrop-blur-md px-2.5 py-1 rounded border text-white ${
            isBefore ? "bg-black/45 border-white/10" : "bg-emerald-500/20 border-[var(--color-brand)]/35"
          }`}>
            {side.badge.icon}
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider">
              {side.badge.label}
            </span>
          </div>
          <span className={`px-2.5 py-1 rounded border text-[9px] sm:text-[10px] font-mono font-bold tracking-wide select-none ${tagColor}`}>
            {side.tag}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
          <span className={`text-[9px] font-mono tracking-widest font-bold uppercase ${side.eyebrow.tone}`}>
            {side.eyebrow.label}
          </span>
          <p className="text-white text-base sm:text-lg font-display font-bold leading-tight mt-0.5">
            {side.headline}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4 text-left">
          {side.points.map((p) => (
            <div key={p.title} className="flex items-start space-x-3.5">
              <PointIcon className={`w-4.5 h-4.5 mt-1 shrink-0 ${pointColor}`} />
              <div className="text-xs sm:text-[13px] font-normal text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="font-bold text-[#1E293B] dark:text-slate-100 block text-sm mb-0.5">
                  {p.title}
                </span>
                {p.body}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-auto p-3.5 rounded-xl border flex items-start space-x-3 text-left ${footerBg}`}>
          {side.footer.icon}
          <p className="text-xs font-normal leading-relaxed">{side.footer.body}</p>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <Section id="comparison" tone="subtle" bordered className="bg-[#FBFDFE] dark:bg-slate-950/40">
      <div className="absolute top-[35%] left-[-10%] w-[350px] h-[350px] bg-red-50/40 dark:bg-rose-500/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[380px] h-[380px] bg-emerald-50/40 dark:bg-emerald-500/5 rounded-full blur-[90px]" />

      <Container>
        <SectionHeading
          className="mx-auto mb-10 sm:mb-14"
          eyebrow={<Badge variant="accent">A Healthy Digital Partnership</Badge>}
          title={
            <>
              How ScreenToSkill <HighlightUnderline>Restores</HighlightUnderline> Balance
            </>
          }
          description="We don't block devices entirely or cause daily friction. We swap passive consumption with gamified curriculum challenges."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch pt-2">
          <ComparisonCard side={BEFORE} />
          <ComparisonCard side={AFTER} />
        </div>
      </Container>
    </Section>
  );
}
