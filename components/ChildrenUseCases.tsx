'use client';

import React from 'react';
import Image from 'next/image';
import { HighlightUnderline } from './SubElements';
import { 
  CheckCircle2, 
  Layers,
  Volume2,
  Sparkles,
  Gamepad2,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';

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

export default function ChildrenUseCases() {
  // 5 distinct user-curated age bands matching cognitive progress perfectly
  const earlyGroups: MilestoneDetail[] = [
    {
      index: '[01]',
      code: 'STAGE.ALPHA',
      ageRange: 'Ages 2–3 (Baby)',
      groupName: 'TODDLER DISCOVERY',
      title: 'Starter Audio-First Sounds',
      subtitle: 'Audio-guided phonetic play built for active toddlers. Zero reading required.',
      questsDescription: 'Identify animal sounds, friendly sound-matching puzzles, and phone voice guidance triggers that stimulate auditory memory.',
      imageUrl: '/images/agegroup/kidplaycolour.png',
      specs: [
        'Audio-first play',
        'Tactile screen taps',
        'Voice prompt guides'
      ],
      icon: <Volume2 className="w-4 h-4 text-slate-600" />
    },
    {
      index: '[02]',
      code: 'STAGE.KAPPA',
      ageRange: 'Ages 4–5 (Tiny)',
      groupName: 'EARLY COGNITION',
      title: 'Colour & Shape Discoveries',
      subtitle: 'Eye-catching visual activities designed to construct early spatial memory.',
      questsDescription: 'Vibrant shape matching, chromatic sorting grids, and drag-and-drop silhouette puzzles that build motor skills.',
      imageUrl: '/images/agegroup/fiveyearkid.png',
      specs: [
        'Interactive colors',
        'Spatial identification',
        'Simple cartoon cards'
      ],
      icon: <Sparkles className="w-4 h-4 text-slate-600" />
    }
  ];

  const matureGroups: MilestoneDetail[] = [
    {
      index: '[03]',
      code: 'STAGE.BETA',
      ageRange: 'Ages 6–8 (Young)',
      groupName: 'ELEMENTARY FOUNDATION',
      title: 'Explorer Core Logic',
      subtitle: 'Simple single-digit arithmetic, phonetic spelling, and introductory science trivia.',
      questsDescription: 'Solve math equations, practice spelling drills, and explore outer space layouts with guided interactive card flips.',
          imageUrl: '/images/agegroup/eightyearkid.png',
      specs: [
        'Math equations',
        'Phonetic memory skills',
        'Nature facts trivia'
      ],
      icon: <Gamepad2 className="w-4 h-4 text-slate-600" />
    },
    {
      index: '[04]',
      code: 'STAGE.GAMMA',
      ageRange: 'Ages 9–12 (Middle)',
      groupName: 'SCHOLASTIC SYSTEMS',
      title: 'Academic Reasoning',
      subtitle: 'Intermediate reading grammar, fractions logic, and world geography overview.',
      questsDescription: 'Complete fractional equations, assemble syntactically correct sentence paths, and identify international landmarks on world maps.',
      specs: [
        'Mental logic drills',
        'Grammar analysis',
        'Geographical map puzzles'
      ],
      imageUrl: '/images/agegroup/twelveyear.png',
      icon: <BrainCircuit className="w-4 h-4 text-slate-600" />
    },
    {
      index: '[05]',
      code: 'STAGE.OMEGA',
      ageRange: 'Ages 13+ (Teen)',
      groupName: 'ADVANCED CRITICAL',
      title: 'Logical Mastery Academy',
      subtitle: 'Analytical algebraic equations, chemistry structures, and passage comprehension.',
      questsDescription: 'Refine algebraic reasoning variables, balance molecular symbols, and map paragraph structures for contextual core concepts.',
      specs: [
        'Algebraic reasoning',
        'Physics & Chemistry basics',
        'Advanced word meanings'
      ],
      imageUrl: '/images/agegroup/thirteenplus.jpeg',
      icon: <GraduationCap className="w-4 h-4 text-slate-600" />
    }
  ];

  return (
    <section id="age-adapted" className="relative py-14 sm:py-20 lg:py-24 bg-[#FBFDFE] border-b border-slate-100 overflow-hidden">
      {/* Soft elegant ambient blurs */}
      <div className="absolute top-[8%] right-[-10%] w-[380px] h-[380px] bg-gradient-to-br from-indigo-50/45 to-amber-50/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[420px] h-[420px] bg-slate-50/50 rounded-full blur-[110px] pointer-events-none -z-10" />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Crisp aligned typography header matching card content */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-100 bg-slate-50 text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 tracking-wider uppercase select-none">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Curriculum Framework</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Tailored Cognitive Quests for <HighlightUnderline>Every Age Group</HighlightUnderline>
          </h2>
          
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
            ScreenToSkill automatically adapts challenge difficulties—ranging from sensory auditory play for pre-school toddlers to high-level science, grammar, and algebraic reasoning for teens.
          </p>
        </div>

        {/* BENTO GRID: ROW 1 (Two Half-Width Cards for early age categories) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-stretch">
          {earlyGroups.map((group) => (
            <div 
              key={group.index}
              className="group relative bg-white border border-slate-100 hover:border-slate-200/60 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image segment - elevated image height, edge-to-edge, clean aspect ratio */}
              <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[350px] overflow-hidden bg-slate-50 rounded-t-xl border-b border-slate-100">
                <Image 
                  src={group.imageUrl} 
                  alt={`${group.title} representation`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Minimalist index tag inside image frame */}
                <div className="absolute top-4 right-4 z-10 text-[11px] font-mono font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                  {group.index}
                </div>

                {/* Ultra-premium glassmorphism floating age tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded bg-white/95 backdrop-blur border border-slate-200 text-[10.5px] font-mono font-bold text-slate-800 tracking-wide shadow-sm select-none">
                    {group.icon}
                    <span>{group.ageRange}</span>
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block text-[9px] font-mono font-bold text-[#00D084] tracking-widest uppercase">
                      {group.groupName}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-lg leading-tight">
                      {group.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-[13px] font-normal leading-relaxed">
                      {group.subtitle}
                    </p>
                  </div>

                  <div className="bg-slate-50 group-hover:bg-slate-50/50 border border-slate-100 rounded-lg p-3.5">
                    <span className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Learning Core Quest
                    </span>
                    <p className="text-xs text-slate-650 font-normal leading-relaxed">
                      {group.questsDescription}
                    </p>
                  </div>
                </div>

                {/* Minimalist inline specifications */}
                <div className="border-t border-slate-100 pt-3.5 mt-4">
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {group.specs.map((spec, si) => (
                      <div key={si} className="flex items-center space-x-1.5 text-xs font-normal text-slate-550">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00D084]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Aesthetic subtle bottom code element */}
              <div className="absolute bottom-3 right-6 pointer-events-none select-none">
                <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest">{group.code}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BENTO GRID: ROW 2 (Three 1/3-Width Cards for young, middle, and older age categories) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {matureGroups.map((group) => (
            <div 
              key={group.index}
              className="group relative bg-white border border-slate-100 hover:border-slate-200/60 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image segment - elevated image height, edge-to-edge, perfect grid aspect ratio */}
              <div className="relative w-full h-[180px] sm:h-[230px] lg:h-[320px] overflow-hidden bg-slate-50 rounded-t-xl border-b border-slate-100">
                <Image 
                  src={group.imageUrl} 
                  alt={`${group.title} representation`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Minimalist index tag inside image frame */}
                <div className="absolute top-4 right-4 z-10 text-[11px] font-mono font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                  {group.index}
                </div>

                {/* Ultra-premium glassmorphism floating age tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded bg-white/95 backdrop-blur border border-slate-200 text-[10.5px] font-mono font-bold text-slate-800 tracking-wide shadow-sm select-none">
                    {group.icon}
                    <span>{group.ageRange}</span>
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block text-[9px] font-mono font-bold text-[#00D084] tracking-widest uppercase">
                      {group.groupName}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg leading-tight">
                      {group.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-[13px] font-normal leading-relaxed">
                      {group.subtitle}
                    </p>
                  </div>

                  <div className="bg-slate-50 group-hover:bg-slate-50/50 border border-slate-100 rounded-lg p-3.5">
                    <span className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Learning Core Quest
                    </span>
                    <p className="text-xs text-slate-650 font-normal leading-relaxed">
                      {group.questsDescription}
                    </p>
                  </div>
                </div>

                {/* Minimalist inline specifications */}
                <div className="border-t border-slate-100 pt-3.5 mt-4">
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {group.specs.map((spec, si) => (
                      <div key={si} className="flex items-center space-x-1.5 text-xs font-normal text-slate-550">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00D084]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Aesthetic subtle bottom code element */}
              <div className="absolute bottom-3 right-5 pointer-events-none select-none">
                <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest">{group.code}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
