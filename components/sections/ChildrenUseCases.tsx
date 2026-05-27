"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Layers,
  Volume2,
  Sparkles,
  Gamepad2,
  BrainCircuit,
  GraduationCap,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";

interface MilestoneDetail {
  index: string;
  code: string;
  ageRange: string;
  groupName: string;
  title: string;
  subtitle: string;
  questsDescription: string;
  imageUrl: string;
  specs: string[];
  icon: React.ReactNode;
}

const earlyGroups: MilestoneDetail[] = [
  {
    index: "[01]",
    code: "STAGE.ALPHA",
    ageRange: "Ages 2–3 (Baby)",
    groupName: "TODDLER DISCOVERY",
    title: "Starter Audio-First Sounds",
    subtitle:
      "Audio-guided phonetic play built for active toddlers. Zero reading required.",
    questsDescription:
      "Identify animal sounds, friendly sound-matching puzzles, and phone voice guidance triggers that stimulate auditory memory.",
    imageUrl: "/images/agegroup/kidplaycolour.png",
    specs: ["Audio-first play", "Tactile screen taps", "Voice prompt guides"],
    icon: <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />,
  },
  {
    index: "[02]",
    code: "STAGE.KAPPA",
    ageRange: "Ages 4–5 (Tiny)",
    groupName: "EARLY COGNITION",
    title: "Shapes, Colours & Animal Recognition",
    subtitle:
      "Bright visual MCQs designed to build early recognition and choice-making.",
    questsDescription:
      "Children see vibrant shapes, colours and animal visuals, then pick the correct match from simple multiple-choice options.",
    imageUrl: "/images/agegroup/fiveyearkid.png",
    specs: ["Shape recognition", "Colour identification", "Animal visual MCQs"],
    icon: <Sparkles className="w-4 h-4 text-slate-600 dark:text-slate-400" />,
  },
];

const matureGroups: MilestoneDetail[] = [
  {
    index: "[03]",
    code: "STAGE.BETA",
    ageRange: "Ages 6–8 (Young)",
    groupName: "ELEMENTARY FOUNDATION",
    title: "Math, English & Science Basics",
    subtitle:
      "Early-school MCQs across single-digit math, simple English words and basic science facts.",
    questsDescription:
      "Children pick the right answer from MCQs on simple addition and subtraction, basic English vocabulary and spelling, and introductory science questions tuned for early-school understanding.",
    imageUrl: "/images/agegroup/eightyearkid.png",
    specs: ["Math (Grade 1–3)", "English vocabulary", "Basic science MCQs"],
    icon: <Gamepad2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />,
  },
  {
    index: "[04]",
    code: "STAGE.GAMMA",
    ageRange: "Ages 9–12 (Middle)",
    groupName: "SCHOLASTIC SYSTEMS",
    title: "Math, English, Science & History",
    subtitle:
      "Middle-school MCQs across multiplication & fractions, grammar, science concepts and history.",
    questsDescription:
      "Children answer MCQs covering multiplication, division and fractions, English grammar and reading questions, school-level science topics, and basic history facts at middle-school difficulty.",
    specs: ["Math (Grade 4–7)", "English grammar", "Science & History MCQs"],
    imageUrl: "/images/agegroup/twelveyear.png",
    icon: <BrainCircuit className="w-4 h-4 text-slate-600 dark:text-slate-400" />,
  },
  {
    index: "[05]",
    code: "STAGE.OMEGA",
    ageRange: "Ages 13+ (Teen)",
    groupName: "ADVANCED CRITICAL",
    title: "Math, English, Science & History",
    subtitle:
      "High-school MCQs across algebra, English comprehension, advanced science and history.",
    questsDescription:
      "Teens answer harder MCQs covering algebra and word problems, English comprehension and grammar, secondary-school science across physics, chemistry and biology, plus history concepts at exam-prep difficulty.",
    specs: ["Algebra & word problems", "English comprehension", "Science & History MCQs"],
    imageUrl: "/images/agegroup/thirteenplus.jpeg",
    icon: <GraduationCap className="w-4 h-4 text-slate-600 dark:text-slate-400" />,
  },
];

function MilestoneCard({ group, sizes }: { group: MilestoneDetail; sizes: string }) {
  return (
    <div className="group relative bg-[var(--surface)] border border-[var(--border)] hover:border-slate-200/60 dark:hover:border-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[350px] overflow-hidden bg-slate-50 dark:bg-slate-800 rounded-t-xl border-b border-[var(--border)]">
        <Image
          src={group.imageUrl}
          alt={`${group.title} representation`}
          fill
          sizes={sizes}
          className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-4 right-4 z-10 text-[11px] font-mono font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
          {group.index}
        </div>
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded bg-white/95 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-700 text-[10.5px] font-mono font-bold text-slate-800 dark:text-slate-100 tracking-wide shadow-sm select-none">
            {group.icon}
            <span>{group.ageRange}</span>
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <span className="block text-[9px] font-mono font-bold text-[var(--color-brand)] tracking-widest uppercase">
              {group.groupName}
            </span>
            <h3 className="font-display font-bold text-slate-900 dark:text-slate-50 text-lg leading-tight">
              {group.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] font-normal leading-relaxed">
              {group.subtitle}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 group-hover:bg-slate-50/50 dark:group-hover:bg-slate-800/60 border border-[var(--border)] rounded-lg p-3.5">
            <span className="block text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Learning Core Quest
            </span>
            <p className="text-xs text-slate-650 dark:text-slate-300 font-normal leading-relaxed">
              {group.questsDescription}
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-3.5 mt-4">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {group.specs.map((spec, si) => (
              <div
                key={si}
                className="flex items-center space-x-1.5 text-xs font-normal text-slate-550 dark:text-slate-400"
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[var(--color-brand)]" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-6 pointer-events-none select-none">
        <span className="text-[9px] font-mono text-slate-300 dark:text-slate-600 font-bold tracking-widest">
          {group.code}
        </span>
      </div>
    </div>
  );
}

export default function ChildrenUseCases() {
  return (
    <Section id="age-adapted" tone="subtle" bordered className="bg-[#FBFDFE] dark:bg-slate-950/40">
      <div className="absolute top-[8%] right-[-10%] w-[380px] h-[380px] bg-gradient-to-br from-indigo-50/45 to-amber-50/20 dark:from-indigo-500/5 dark:to-amber-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[420px] h-[420px] bg-slate-50/50 dark:bg-slate-800/30 rounded-full blur-[110px] pointer-events-none -z-10" />

      <Container>
        <SectionHeading
          className="mx-auto mb-10 sm:mb-14"
          eyebrow={
            <Badge icon={<Layers className="w-3.5 h-3.5 text-indigo-500" />}>
              Curriculum Framework
            </Badge>
          }
          title={
            <>
              Tailored Cognitive Quests for{" "}
              <HighlightUnderline>Every Age Group</HighlightUnderline>
            </>
          }
          description="ScreenToSkill automatically adapts challenge difficulties—ranging from sensory auditory play for pre-school toddlers to high-level science, grammar, and algebraic reasoning for teens."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-stretch">
          {earlyGroups.map((group) => (
            <MilestoneCard
              key={group.index}
              group={group}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {matureGroups.map((group) => (
            <MilestoneCard
              key={group.index}
              group={group}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
