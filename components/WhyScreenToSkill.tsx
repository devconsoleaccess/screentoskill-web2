"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, Lock, BarChart3 } from "lucide-react";
import { HighlightUnderline } from "./SubElements";

export default function WhyScreenToSkill() {
  return (
    <section
      id="why-screentoskill"
      className="relative py-14 sm:py-20 lg:py-24 bg-[#FBFDFF]/80 border-b border-[#E5E7EB] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left large visual card with sage green backdrop */}
          <div className="lg:col-span-6">
            <div className="bg-[#EBF8F4] border border-[#d2efe4] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between min-h-[420px] sm:min-h-[500px] shadow-xs group">
              {/* Heading context */}
              <div className="space-y-3 max-w-md relative z-10 text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-display font-bold text-[#0D1B15] tracking-tight leading-[1.15]">
                  Why <HighlightUnderline>choose</HighlightUnderline>{" "}
                  <br className="hidden sm:block" />
                  ScreenToSkill?
                </h2>
                <p className="text-xs sm:text-sm text-[#1F5441]/85 leading-relaxed font-normal">
                  We&apos;re your dedicated partner in converting idle
                  screen-time into valuable, parent-approved skill building
                  sessions.
                </p>
              </div>

              {/* Genuine Premium Illustration Image from uicore.pro */}
              <div className="relative mt-6 sm:mt-10 flex justify-center w-full h-[220px] sm:h-[300px] overflow-hidden rounded-b-2xl">
                <Image
                  src="https://cdn.gtbg.uicore.pro/2025/12/Mobile-App-Why-Image.webp"
                  alt="Why Choose ScreenToSkill Illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-bottom group-hover:scale-[1.03] duration-500 ease-out transition-transform"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right side beautifully formatted list items as shown in image */}
          <div className="lg:col-span-6 space-y-20 pl-0 lg:pl-4">
            {/* Feature Item 1 */}
            <div className="flex items-start space-x-4 group text-left">
              <div className="w-12 h-12 rounded-full bg-[#EBE9FE] hover:bg-[#E0DCFE] flex items-center justify-center text-[#553CFA] shrink-0 shadow-xs transition-all relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#553CFA]/5 pointer-events-none" />
                <GraduationCap className="w-5.5 h-5.5 stroke-[2] group-hover:scale-110 transition-transform duration-300 relative z-10" />
              </div>
              <div className="space-y-1 pt-0.5">
                <h3 className="font-display font-bold text-[#0D0F12] text-lg group-hover:text-[#553CFA] transition-colors leading-tight">
                  Reliability Parents Trust
                </h3>
                <p className="text-xs sm:text-sm text-slate-550 font-normal leading-relaxed">
                  Your peace of mind and child safety online are our absolute
                  top priorities. Grade-specific locks activate instantly.
                </p>
              </div>
            </div>

            {/* Feature Item 2 */}
            <div className="flex items-start space-x-4 group text-left">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] hover:bg-[#D0ECFE] flex items-center justify-center text-[#0284C7] shrink-0 shadow-xs transition-all relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#0284C7]/5 pointer-events-none" />
                <Lock className="w-5 h-5 stroke-[2] group-hover:scale-110 transition-transform duration-300 relative z-10" />
              </div>
              <div className="space-y-1 pt-0.5">
                <h3 className="font-display font-bold text-[#0D0F12] text-lg group-hover:text-[#0284C7] transition-colors leading-tight">
                  Outstanding Pedagogy Blocks
                </h3>
                <p className="text-xs sm:text-sm text-slate-550 font-normal leading-relaxed">
                  Commitment to high-performance learning values doesn&apos;t
                  end with dry quizzes. Engage children in core skill games.
                </p>
              </div>
            </div>

            {/* Feature Item 3 */}
            <div className="flex items-start space-x-4 group text-left">
              <div className="w-12 h-12 rounded-full bg-[#E2F7F2] hover:bg-[#CEF1EA] flex items-center justify-center text-[#0D9488] shrink-0 shadow-xs transition-all relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#0D9488]/5 pointer-events-none" />
                <BarChart3 className="w-5 h-5 stroke-[2] group-hover:scale-110 transition-transform duration-300 relative z-10" />
              </div>
              <div className="space-y-1 pt-0.5">
                <h3 className="font-display font-bold text-[#0D0F12] text-lg group-hover:text-[#0D9488] transition-colors leading-tight">
                  Customized to Grade Milestone
                </h3>
                <p className="text-xs sm:text-sm text-slate-550 font-normal leading-relaxed">
                  Select exactly from Mathematics, elementary Science, grammar
                  and logic puzzles matching school levels dynamically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
