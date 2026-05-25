'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { HighlightUnderline } from './SubElements';

export default function FAQs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-14 sm:py-20 lg:py-24 bg-slate-50/40 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image on FAQ section */}
          <div className="lg:col-span-5 relative flex justify-center max-w-sm mx-auto lg:max-w-none w-full">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[482/650] rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
              <div className="absolute inset-0 bg-[#22C55E]/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
              <Image 
                src="https://cdn.gtbg.uicore.pro/2025/12/Mobile-App-FAQ-Image-2-482x650.webp" 
                alt="Frequently Asked Questions ScreenToSkill" 
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
            {/* Absolute high-fidelity accent overlay badge */}
            <div className="absolute -bottom-4 -right-2 bg-white border border-slate-100 p-3.5 rounded-xl shadow-xs max-w-[160px] hidden sm:block">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#22C55E] font-bold block">PARENT TIP</span>
              <span className="text-[10.5px] text-slate-500 font-medium block mt-1">Start with simple math quizzes for instant child confidence!</span>
            </div>
          </div>

          {/* Right Column: Custom adapted FAQs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-left space-y-2.5">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50 text-[10px] sm:text-[11px] font-mono font-bold text-[#22C55E]">
                <span>Questions & Answers</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Frequently asked <HighlightUnderline>questions</HighlightUnderline>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal max-w-xl">
                Curious about childhood screen regulation, MCQs, or device remote setup? Find answers here.
              </p>
            </div>

            {/* Accordions */}
            <div className="space-y-3">
              {[
                {
                  q: "How does ScreenToSkill lock other mobile apps?",
                  a: "ScreenToSkill uses standard device accessibility and device-management permissions. When a child attempts to tap YouTube, Roblox, lock screen layers activate instantly and prompt them to solve age-aligned MCQs before session approval."
                },
                {
                  q: "What happens if my child inputs an incorrect MCQ answer?",
                  a: "The selected app remains closed. The system displays friendly clues and gives children opportunities to study the question and attempt again, converting mindless scrolling into active study training."
                },
                {
                  q: "Can I choose which school subjects to lock with?",
                  a: "Absolutely! Parents have full dashboard access to adjust subject curriculum mixes. Choose from Math (Grade 1-6), Grammar, Science, Vocabulary, or logic puzzles to match their homework goals."
                },
                {
                  q: "Is there a limit on daily screen time awards?",
                  a: "Yes. From the Master controls, parents can establish customized daily app session quotas (e.g. max 5 sessions of 15-minutes each), reinforcing high-performance limits."
                },
                {
                  q: "Does the app store child data or track location?",
                  a: "Never. We enforce strict privacy guidelines. ScreenToSkill does not collect user telemetry or search histories. All progress logs are encrypted locally to preserve child safety."
                }
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index} 
                    className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-2xs transition-all hover:shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      suppressHydrationWarning
                      className="w-full text-left px-4.5 py-3.5 flex justify-between items-center font-medium text-slate-800 hover:text-[#22C55E] transition-colors"
                    >
                      <span className="text-xs sm:text-sm md:text-base font-medium">{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                    </button>
 
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4.5 pb-4.5 pt-1 text-xs sm:text-[13px] font-normal text-slate-500 border-t border-slate-50/60 leading-relaxed text-left">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
