"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { HighlightUnderline } from "./SubElements";
import {
  Lightbulb,
  CheckCircle2,
  Quote,
  Star,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CaseStudy {
  name: string;
  age: number;
  cohort: string;
  badge: string;
  title: string;
  description: string;
  quote: string;
  reviewer: string;
  reviewerStatus: string;
  observationTag: string;
  observationText: string;
  image: string;
}

export default function ParentAnalytics() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: CaseStudy[] = [
    {
      name: "Leo",
      age: 3,
      cohort: "CASE COHORT 01 • ACTIVE MIND",
      badge: "TODDLER ADAPTATION",
      title: "Leo's Early Preschool Transition",
      description:
        "Leo swapped passive video autoplay loops for interactive audio matching and sensory discovery milestones. Handled completely gracefully, resolving the daily toddler screen-friction problem.",
      quote:
        "Leo would scream whenever we tried taking away his tablet. With ScreenToSkill, there are no tantrums because he sees the locked screen as an interactive game challenge. He eagerly taps on sound clues and animal pairs, and is incredibly proud when he unlocks his content.",
      reviewer: "Clara M., Toddler Coordinator & Mother",
      reviewerStatus: "Verified Parent",
      observationTag: "Teacher Observation Details",
      observationText:
        "Leo demonstrated improved cognitive focus, swapping over-stimulating cartoon screens for sensory matching mechanics. Restored organic bedtime routines and interactive speech mimicry.",
      image: "/images/stories/story.jpg",
    },
    {
      name: "Mia",
      age: 5,
      cohort: "CASE COHORT 02 • CORE INTUITION",
      badge: "PRESCHOOL COHORT",
      title: "Mia's Self-Regulation Triumph",
      description:
        "Instead of default high-frequency video scrolling, Mia learned basic logic sequences and counting milestones natively, proudly earning minor game rewards at scheduled times.",
      quote:
        "I watched Mia shift entirely from passive watching channels into active math and count puzzles. It aligns school-prep milestones so intuitively that we noticed her vocabulary skyrocket in weeks. It teaches self-regulation early and proud.",
      reviewer: "Jacob R., Early Childhood Educator & Father",
      reviewerStatus: "Verified Educator",
      observationTag: "Independent Progress Tracking",
      observationText:
        "Helps children map focus intervals to content availability naturally. ScreenToSkill locks convert idle scrolling into a predictable pattern where active learning equals rewarded outcomes.",
      image: "/images/stories/story.jpg",
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[activeSlide];

  return (
    <section
      id="parent-portal"
      className="relative py-14 sm:py-20 lg:py-24 bg-[#FAFCFC]/85 border-b border-[#E5E7EB] overflow-hidden text-slate-800"
    >
      {/* Subtle brand glow matching landing page style */}
      <div className="absolute top-[25%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#22C55E]/5 blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-slate-100/40 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modernized Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-emerald-50/50 text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 tracking-wider uppercase select-none">
            <Users className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Digital Balance Case Studies</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Child Case Studies:{" "}
            <HighlightUnderline>Real Progress</HighlightUnderline> Stories
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
            Observe genuine screen-time transformation. Toddlers and tiny
            learners swapping passive stimulation for cognitive playful
            challenges. No invasive tracking—just healthy family balance.
          </p>
        </div>

        {/* ACTIVE CASE STUDY CONTAINER (AnimatePresence for premium slider feel) */}
        <div className="relative min-h-[460px] lg:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Image Column - Reduced Border Radius, Clean Slate, NO Dark/Black Borders */}
              <div className="lg:col-span-5 relative group max-w-md mx-auto lg:max-w-none w-full">
                <div className="relative w-full aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] rounded-xl overflow-hidden bg-slate-50 shadow-sm border border-[#E5E7EB]">
                  <Image
                    src={current.image}
                    alt={`${current.name} learning and studying setup`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-60" />

                  {/* Floating Info Badge - Soft and Minimal */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 backdrop-blur-md bg-white/95 border border-[#E5E7EB] rounded-lg flex items-center space-x-2.5 shadow-xs">
                    <div className="w-7 h-7 rounded bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono font-bold text-[#22C55E] uppercase tracking-wider leading-none">
                        {current.badge}
                      </span>
                      <span className="block text-[11px] font-display font-bold text-slate-900 mt-1">
                        {current.name} • Age {current.age}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content Column - Completely Border-Free or Extremely Soft Accents */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-50 text-[9px] font-mono font-bold text-[#22C55E] tracking-wider select-none uppercase">
                    <span>{current.cohort}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-[#5C6E7F] text-xs sm:text-sm font-normal leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Main Quote Block - Highly Polished, No Dark Borders */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 relative space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-[#22C55E] fill-[#22C55E]"
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-emerald-100/55 shrink-0" />
                  </div>

                  <p className="text-slate-600 italic text-xs sm:text-sm font-normal leading-relaxed">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div className="border-t border-[#E5E7EB]/60 pt-2.5 flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span>&mdash; {current.reviewer}</span>
                    <span className="text-[9px] font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                      {current.reviewerStatus}
                    </span>
                  </div>
                </div>

                {/* Observation / Practical Milestone Progress Card */}
                <div className="bg-emerald-50/15 border border-[#E5E7EB] rounded-2xl p-4 space-y-1 shadow-2xs">
                  <span className="block text-[9px] font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                    {current.observationTag}
                  </span>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {current.observationText}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Arrow Navigation Left & Right Overlay with Pagination Dots besides buttons */}
          <div className="flex justify-between items-center mt-8 lg:mt-5 border-t border-[#E5E7EB]/60 pt-5">
            {/* Dots besides buttons */}
            <div className="flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.25 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none ${
                    activeSlide === idx
                      ? "w-5 bg-[#22C55E]"
                      : "w-1.25 bg-slate-350 hover:bg-[#22C55E]/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-lg bg-white text-slate-700 hover:text-[#22C55E] border border-[#E5E7EB] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-lg bg-white text-slate-700 hover:text-[#22C55E] border border-[#E5E7EB] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
