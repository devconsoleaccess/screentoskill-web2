'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HighlightUnderline } from './SubElements';
import { 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Award, 
  Hourglass, 
  Smartphone, 
  ShieldCheck 
} from 'lucide-react';

export default function ProjectCaseStudySection() {
  return (
    <section id="case-study-teaser" className="relative py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E5E7EB] overflow-hidden text-slate-800">
      {/* Dynamic ambient highlights matching clean landing style */}
      <div className="absolute top-[20%] left-[-15%] w-[420px] h-[420px] rounded-full bg-[#22C55E]/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] rounded-full bg-[#22C55E]/5 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-emerald-50/50 text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 tracking-wider uppercase select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E] mr-1" />
            <span>Accredited Evaluation Studies</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Comprehensive <HighlightUnderline>Case Study Showcase</HighlightUnderline>
          </h2>
          
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
            Discover the rigorous data, early cognitive milestones, and behavioral framework that helped over 100,000+ tiny learners master self-regulation.
          </p>
        </div>

        {/* Premium Teaser Card of the Case Study - completely border-free and highly aesthetic */}
        <div className="bg-[#FAFCFC]/70 border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-5">
              
              <div className="inline-flex items-center space-x-2.5">
                <span className="text-[10px] font-mono font-bold text-[#22C55E] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                  Active Study • 100K+ Kids
                </span>
                <span className="text-[10px] text-slate-400 font-bold">•</span>
                <span className="text-[10px] text-slate-500 font-bold font-mono uppercase tracking-wider">
                  Toddlers & Preschool
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 leading-tight">
                Evaluating the ScreenToSkill Cognitive Intercept
              </h3>

              <p className="text-[#5C6E7F] text-xs sm:text-sm font-normal leading-relaxed">
                Rather than default, aggressive parental application shutdowns, ScreenToSkill implements helpful cognitive friction. This case study details the 12-week test window where idle screen-time was transformed into preschool math, verbal, and shape accomplishments.
              </p>

              {/* Action Stats list in Teaser */}
              <div className="grid grid-cols-3 gap-4 pt-1">
                <div className="space-y-1">
                  <span className="block text-xl sm:text-2xl font-display font-bold text-slate-800 leading-none">72%</span>
                  <span className="block text-[8.5px] uppercase font-mono font-bold tracking-wider text-slate-400">Screen Shifted</span>
                </div>
                <div className="space-y-1 border-l border-[#E5E7EB] pl-4">
                  <span className="block text-xl sm:text-2xl font-display font-bold text-slate-800 leading-none">94%</span>
                  <span className="block text-[8.5px] uppercase font-mono font-bold tracking-wider text-slate-400">Tantrum Drop</span>
                </div>
                <div className="space-y-1 border-l border-[#E5E7EB] pl-4">
                  <span className="block text-xl sm:text-2xl font-display font-bold text-[#22C55E] leading-none">92%</span>
                  <span className="block text-[8.5px] uppercase font-mono font-bold tracking-wider text-slate-400">Speech Focus</span>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href="/case-study"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#22C55E] hover:bg-[#16a34a] text-white rounded-full text-xs font-bold shadow-md shadow-[#22C55E]/15 hover:shadow-[#22C55E]/25 transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <span>Explore Deep Case Study Report</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Right Showcase Image Mockup Block */}
            <div className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xs border border-[#E5E7EB]">
                <Image 
                  src="/case.jpg"
                  alt="Pre-school learning study image"
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Micro Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md py-1 px-2.5 rounded border border-[#E5E7EB] flex items-center space-x-1.5 shadow-2xs select-none">
                  <Award className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="text-[9px] font-bold text-slate-800">Accredited Pilot</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
