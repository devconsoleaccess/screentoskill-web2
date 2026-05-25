'use client';

import React from 'react';
import { 
  Brain, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { HighlightUnderline } from './SubElements';

export default function BrainDevelopmentImpact() {
  const impacts = [
    {
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      title: 'Active Cognitive Engagement',
      description: 'Replaces passive dopamine-scrolling loops with active critical thinking problems. Promotes growth of synaptic density in the prefrontal cortex.',
      stat: '+40%',
      statLabel: 'Focus Retention'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00D084]" />,
      title: 'Healthy Dopamine Regulation',
      description: 'Delayed-gratification cycles reward accomplishments at set milestones, reducing screen dependence and irritability behaviors.',
      stat: '-35%',
      statLabel: 'Screen Irritability'
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: 'Adaptive Learning Agility',
      description: 'Personalized neural-pacing paths adjust to correct errors on the fly. Concepts stick through multi-sensory association games.',
      stat: '2.5x',
      statLabel: 'Concept Mastery'
    }
  ];

  return (
    <section id="brain-impact" className="relative py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-100 bg-slate-50 text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 tracking-wider uppercase select-none">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              <span>Scientific Foundation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              A Healthy Path to <HighlightUnderline>Digital Balance</HighlightUnderline>
            </h2>

            <p className="text-slate-505 text-xs sm:text-sm leading-relaxed font-normal">
              Passive video stream consumption stunts verbal memory growth. ScreenToSkill reverses this effect by transforming screen sessions into active mental exercises verified by neurodevelopment research.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Recommended Daily Usage
                </span>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Just 20-30 minutes of interactive play replacement yields significant improvements in task switching & cognitive focus compared to passive cartoon streaming.
              </p>
            </div>
          </div>

          {/* Right Cards Stack Layout */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {impacts.map((item, index) => (
              <div 
                key={index}
                className="group relative bg-white border border-slate-100 hover:border-slate-200/60 p-5 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  {/* Styled Icon Wrapper */}
                  <div className="p-2.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50/50 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-normal leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Stat Display Box */}
                <div className="sm:text-right w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex sm:flex-col justify-between items-center sm:items-end shrink-0">
                  <span className="text-xl sm:text-2xl font-display font-bold text-slate-900 leading-none">
                    {item.stat}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block sm:mt-1">
                    {item.statLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
