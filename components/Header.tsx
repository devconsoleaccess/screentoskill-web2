"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { LogoSvg } from "./SubElements";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ FIXED: redirect to home first then scroll to section
  const handleSectionNavigation = (sectionId: string) => {
    setMobileMenuOpen(false);

    // If already on homepage
    if (pathname === "/") {
      const element = document.querySelector(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // Redirect to homepage with hash
      router.push(`/${sectionId}`);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <header
        id="navbar"
        className={`mx-auto max-w-7xl w-full rounded-full transition-all duration-300 pointer-events-auto border ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-slate-200/50 py-2.5 px-6 shadow-lg shadow-slate-100/10"
            : "bg-white/40 backdrop-blur-md border-white/20 py-3.5 px-6 shadow-xs"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2.5 hover:opacity-95 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-md shadow-emerald-500/10 shrink-0">
              <LogoSvg className="w-5.5 h-5.5 text-white" />
            </div>

            <span className="text-2xl font-display font-black tracking-tight text-slate-900 leading-none">
              Screen<span className="text-[#22C55E]">ToSkill</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-[13px] font-semibold text-slate-500">
            <button
              onClick={() => handleSectionNavigation("#why-screentoskill")}
              className="hover:text-slate-900 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>Why ScreenToSkill</span>
              {/* <ChevronDown className="w-3 h-3 mt-0.5 text-slate-400 stroke-[2]" /> */}
            </button>

            <button
              onClick={() => handleSectionNavigation("#how-it-works")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              How It Works
            </button>

            <Link
              href="/case-study"
              className="hover:text-slate-900 transition-colors"
            >
              Case Study
            </Link>

            <button
              onClick={() => handleSectionNavigation("#faqs")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              FAQ
            </button>

            <button
              onClick={() => handleSectionNavigation("#download")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Download App
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://drive.google.com/file/d/1vfOt_-MySyfuIOark4P9tWVzm1UaDGD2/view?usp=drive_link"
              target="_blank"
              className="px-5 py-2 bg-[#22C55E] hover:bg-[#02bd78] text-white rounded-full text-xs font-bold shadow-sm shadow-[#22C55E]/20 hover:shadow-[#22C55E]/30 hover:-translate-y-0.5 transition-all text-center cursor-pointer"
            >
              Download App
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            suppressHydrationWarning
            className="md:hidden p-2.5 rounded-full bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-150 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              className="fixed inset-0 w-full h-[100dvh] bg-white/99 backdrop-blur-3xl z-[99999] p-6 flex flex-col justify-between overflow-y-auto"
            >
              {/* Top */}
              <div className="flex items-center justify-between w-full pb-6 border-b border-[#E5E7EB]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2.5 hover:opacity-95 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-md shadow-emerald-500/10 shrink-0">
                    <LogoSvg className="w-5 h-5 text-white" />
                  </div>

                  <span className="text-xl font-display font-black tracking-tight text-slate-900 leading-none">
                    Screen<span className="text-[#22C55E]">ToSkill</span>
                  </span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/55 text-slate-700 hover:text-slate-950 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="my-auto py-8 flex flex-col space-y-5">
                <button
                  onClick={() => handleSectionNavigation("#why-screentoskill")}
                  className="group flex items-baseline justify-between py-1.5 border-b border-[#E5E7EB] text-left text-slate-800 hover:text-[#22C55E] transition-all text-base sm:text-lg font-display font-bold"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono font-bold text-[#22C55E]">
                      01 //
                    </span>
                    <span>Why ScreenToSkill</span>
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#22C55E] transition-colors" />
                </button>

                <button
                  onClick={() => handleSectionNavigation("#how-it-works")}
                  className="group flex items-baseline justify-between py-1.5 border-b border-[#E5E7EB] text-left text-slate-800 hover:text-[#22C55E] transition-all text-base sm:text-lg font-display font-bold"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono font-bold text-[#22C55E]">
                      02 //
                    </span>
                    <span>How It Works</span>
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#22C55E] transition-colors" />
                </button>

                <button
                  onClick={() => handleSectionNavigation("#faqs")}
                  className="group flex items-baseline justify-between py-1.5 border-b border-[#E5E7EB] text-left text-slate-800 hover:text-[#22C55E] transition-all text-base sm:text-lg font-display font-bold"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono font-bold text-[#22C55E]">
                      03 //
                    </span>
                    <span>FAQs</span>
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#22C55E] transition-colors" />
                </button>

                <Link
                  href="/case-study"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline justify-between py-1.5 border-b border-[#E5E7EB] text-left text-slate-800 hover:text-[#22C55E] transition-all text-base sm:text-lg font-display font-bold"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono font-bold text-[#22C55E]">
                      04 //
                    </span>
                    <span>Case Study</span>
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#22C55E] transition-colors" />
                </Link>

                <button
                  onClick={() => handleSectionNavigation("#download")}
                  className="group flex items-baseline justify-between py-1.5 text-left text-slate-800 hover:text-[#22C55E] transition-all text-base sm:text-lg font-display font-bold"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono font-bold text-[#22C55E]">
                      05 //
                    </span>
                    <span>Download App</span>
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#22C55E] transition-colors" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
