"use client";

import React from "react";
import Link from "next/link";
import { LogoSvg } from "./SubElements";

export default function Footer() {
  return (
    <footer
      className="relative bg-white border-t border-slate-200/60 pt-16 pb-12 text-sm overflow-hidden"
      id="main-footer"
    >
      {/* Transparent responsive glow blobs behind layout */}
      <div className="absolute bottom-[20%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#22C55E]/4 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-indigo-500/3 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* Column 1: Left Brand, tagline, and star reviews with dashed separators exactly like the image */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 text-left space-y-4">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2.5 mb-3.5 hover:opacity-95 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-md shadow-emerald-500/10 shrink-0">
                  <LogoSvg className="w-5.2 h-5.2 text-white" />
                </div>
                <span className="text-2xl font-display font-black tracking-tight text-slate-900 leading-none">
                  Screen<span className="text-[#22C55E]">ToSkill</span>
                </span>
              </Link>
              <p className="text-[13px] text-slate-400 font-semibold leading-relaxed max-w-sm">
                Educational Screen Time Solutions at Your Fingertips.
              </p>
            </div>

            {/* Slogan Top Separator (Dashed, exactly like image) */}
            <div className="border-t border-dashed border-slate-200/80 w-full max-w-xs pt-1" />

            {/* Star rating and reviews display exactly matching image */}
            <div className="flex items-center space-x-2 py-0.5 select-none font-sans">
              <div className="flex text-amber-400 space-x-1.5 focus:outline-none">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-[12px] font-bold text-slate-400 tracking-wide font-mono">
                4.9 <span className="text-slate-300 font-light mx-1">|</span>{" "}
                256 Reviews
              </span>
            </div>

            {/* Slogan Bottom Separator (Dashed, exactly like image) */}
            <div className="border-t border-dashed border-slate-200/80 w-full max-w-xs pb-1" />
          </div>

          {/* Right columns with lowercase-style tiny labels and bold black/charcoal links, exactly matching image columns */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Platform column */}
            <div className="space-y-4 text-left">
              <span className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                Platform
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-600 font-sans">
                <li>
                  <Link
                    href="/#how-it-works"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Core Methodology
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#brain-impact"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Brain Impact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#parent-portal"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Parent Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#mandatory-permissions"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Accessibility Setup
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solutions column */}
            <div className="space-y-4 text-left">
              <span className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                Solutions
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-600 font-sans">
                <li>
                  <Link
                    href="/#download"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Family Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-study"
                    className="hover:text-emerald-500 transition-colors block font-semibold text-[#22C55E]"
                  >
                    Interactive Case Study
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#download"
                    className="hover:text-emerald-500 transition-colors block text-left"
                  >
                    Direct Download
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore column */}
            <div className="space-y-4 text-left">
              <span className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                Explore
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-600 font-sans">
                <li>
                  <Link
                    href="/#why-screentoskill"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Why ScreenToSkill
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#comparison"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Before & After
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#age-adapted"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Age-Adapted Focus
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company columns */}
            <div className="space-y-4 text-left">
              <span className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                Company
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-600 font-sans">
                <li>
                  <Link
                    href="/#vision"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Science & Vision
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faqs"
                    className="hover:text-emerald-500 transition-colors block"
                  >
                    Curriculum FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#download"
                    className="hover:text-emerald-500 transition-colors block font-medium"
                  >
                    Get App Free
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row: Left Copyright of premium theme style, Right crisp social circles with borders exactly like image */}
        <div className="mt-12 pt-8 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs font-normal text-slate-400 text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} ScreenToSkill. All rights
            reserved.
          </div>

          {/* Social media circle icons exactly matching layout & theme colors */}
          <div className="flex items-center space-x-2.5 select-none">
            {/* Facebook circular icon */}
            <a
              href="#facebook"
              className="w-9 h-9 rounded-xl border border-slate-200 hover:border-[#E5E7EB]-500 hover:bg-emerald-50/50 flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-all cursor-pointer group hover:scale-[1.02]"
              aria-label="Facebook"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>

            {/* X / Twitter circular icon */}
            <a
              href="#twitter"
              className="w-9 h-9 rounded-xl border border-slate-200 hover:border-[#E5E7EB]-500 hover:bg-emerald-50/50 flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-all cursor-pointer group hover:scale-[1.02]"
              aria-label="X Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram circular icon */}
            <a
              href="#instagram"
              className="w-9 h-9 rounded-xl border border-slate-200 hover:border-[#E5E7EB]-500 hover:bg-emerald-50/50 flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-all cursor-pointer group hover:scale-[1.02]"
              aria-label="Instagram"
            >
              <svg
                className="w-4 h-4 stroke-current stroke-2 fill-none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
