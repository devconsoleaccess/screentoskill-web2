"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";
import {
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  BookOpen,
  Sliders,
  Volume2,
  Trophy,
  Triangle,
  Binary,
  ShieldCheck,
  BarChart3,
  Zap,
} from "lucide-react";
import DownloadApp from "@/components/sections/DownloadApp";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CaseStudyPage() {
  // Age-based curriculum cards
  const ageGroupCards = [
    {
      ageGroup: "Ages 2-3",
      title: "Developmental Cues & Sounds",
      desc: "Develops cognitive and speech readiness. Toddlers engage in playful sonic associations like animal sound recognition and primitive audio rhythms.",
      metric: "Auditory recognition metrics",
      icon: <Volume2 className="w-5 h-5 text-[var(--color-brand)]" />,
      detail:
        "Matching nature audio patterns to vibrant animal representations.",
    },
    {
      ageGroup: "Ages 3-4",
      title: "Shapes & Primary Colors",
      desc: "Promotes fine spatial recognition and coordination. Children are presented with responsive color palettes and basic vector shapes to drag-and-drop.",
      metric: "Spatial reasoning maps",
      icon: <Triangle className="w-5 h-5 text-[var(--color-brand)]" />,
      detail: "Sorting circles, triangles, and primary colors correctly.",
    },
    {
      ageGroup: "Ages 4-7",
      title: "Linguistic Letters & Tracing",
      desc: "Accelerates preschool reading fundamentals. Kids interact with basic phonics loops, spelling builders, and character trace activities.",
      metric: "Pre-reading fluency trackers",
      icon: <BookOpen className="w-5 h-5 text-[var(--color-brand)]" />,
      detail:
        "Identifying simple letter sounds and spelling basic 3-letter nouns.",
    },
    {
      ageGroup: "Ages 13+",
      title: "English, Science & Math",
      desc: "Tailored to intermediate education challenges. Prompts school-age teens with algebraic equations, geological cycles, and literary grammar.",
      metric: "Advanced logic velocity reports",
      icon: <Binary className="w-5 h-5 text-[var(--color-brand)]" />,
      detail: "Completing multi-step science challenges or algebra worksheets.",
    },
  ];

  // Screenshots slider dataset
  const screenshotSlides = [
    { image: "/images/casestudy/casestudy1.webp", tag: "STEP 1: SECURE LOCKS" },
    {
      image: "/images/casestudy/casestudy2.webp",
      tag: "STEP 2: GENTLE BARRIER",
    },
    {
      image: "/images/casestudy/casestudy3.webp",
      tag: "STEP 3: SENSORY PUZZLE",
    },
    {
      image: "/images/casestudy/casestudy4.webp",
      tag: "STEP 4: UNLOCKED SUCCESS",
    },
    // { image: "/images/casestudy/casestudy5.webp", tag: "STEP 5: VISUAL CHARTS" },
    { image: "/images/casestudy/casestudy6.webp", tag: "STEP 6: PROGRESS VIEW" },
    { image: "/images/casestudy/casestudy7.webp", tag: "STEP 7: MILESTONES" },
    { image: "/images/casestudy/casestudy8.webp", tag: "STEP 8: REWARDS" },
    { image: "/images/casestudy/casestudy9.webp", tag: "STEP 9: STREAKS" },
    { image: "/images/casestudy/casestudy10.webp", tag: "STEP 10: ANALYTICS" },
    { image: "/images/casestudy/casestudy11.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy12.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy13.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy14.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy15.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy16.webp", tag: "STEP 11: DASHBOARD" },
    // { image: "/images/casestudy/casestudy17.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy18.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy19.webp", tag: "STEP 11: DASHBOARD" },
    { image: "/images/casestudy/casestudy20.webp", tag: "STEP 11: DASHBOARD" },
  ];

  return (
    <>
            <Header />
    
    <div className="relative min-h-screen w-full bg-[var(--background-subtle)] dark:bg-slate-950 overflow-x-hidden text-slate-800 dark:text-slate-200 font-sans">
      {/* Background radial highlights */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-brand)]/5 blur-[130px] -z-20 pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-[var(--color-brand)]/5 blur-[120px] -z-20 pointer-events-none" />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation button */}
        <div className="mb-8 text-left">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[var(--border)] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-all shadow-2xs cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Landing Hub</span>
          </Link>
        </div>

        {/* ================= SECTION 1: APP OVERVIEW ================= */}
        <div className="text-left space-y-6 w-full mb-12 border-b border-[var(--border)] pb-12">
          <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 dark:text-slate-50 tracking-tight leading-none">
            Deep Study: <HighlightUnderline>ScreenToSkill</HighlightUnderline>{" "}
            Core Methodology
          </h1>

          <p className="text-slate-500 dark:text-slate-500 text-sm sm:text-lg leading-relaxed font-semibold max-w-3xl">
            Meet **ScreenToSkill**, a developmental companion application
            designed to turn passive entertainment loops into interactive
            learning quests. Learn how our software helps children self-regulate
            digital habits gracefully.
          </p>

          {/* Core Concept Overview with Parent & Child Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] p-6 rounded-2xl flex gap-4 shadow-2xs items-start">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center font-black text-xs text-[var(--color-brand)] shrink-0 mt-0.5 animate-pulse">
                  1
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-slate-50 font-bold text-sm sm:text-base uppercase tracking-wider">
                    Parent Guided Lock Config
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-relaxed mt-1">
                    Parents secure the child&apos;s most high-volume,
                    high-stimulation apps (such as video streaming, online feeds
                    or games) directly through our secure local lock module.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] p-6 rounded-2xl flex gap-4 shadow-2xs items-start animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center font-black text-xs text-[var(--color-brand)] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-[var(--color-brand)] font-bold text-sm sm:text-base uppercase tracking-wider">
                    Cognitive Interrupt Overlay
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-relaxed mt-1">
                    When a restricted app is opened, our lock overlay pops up
                    immediately, holding screen focus to present age-matched
                    logical questions and brain-building milestones.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] p-6 rounded-2xl flex gap-4 shadow-2xs items-start">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center font-black text-xs text-[var(--color-brand)] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-slate-50 font-bold text-sm sm:text-base uppercase tracking-wider">
                    Correct Answers Unlock
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-relaxed mt-1">
                    Answering correctly instantly rewards your child with active
                    tokens, unlocks the restricted app automatically, and
                    securely gathers progressive child analytic records.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="relative w-full h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-xs group bg-white">
                <Image
                  src="/childlearn.webp"
                  alt="Mother and cute preschool child daughter learning with screen overlay together"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent animate-fade-in" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs p-5 rounded-2xl border border-white/20 text-center shadow-xs">
                  <span className="text-xs font-mono font-bold text-[var(--color-brand)] uppercase tracking-widest block">
                    Active Shared Co-Regulation
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-500 font-normal leading-relaxed mt-1.5">
                    Bridging device screen-time with genuine mental milestones
                    and cozy family connections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Age-based Curriculum Blocks with Visual Guides */}
        <div className="py-16 border-b border-[var(--border)] text-left">
          <div className="space-y-4 mb-10 max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[var(--color-brand)] font-bold leading-none">
              DEVELOPMENTAL SCAFFOLDING
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              Age-Customized Learning Questions Overlay
            </h2>
            <p className="text-slate-600 dark:text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              ScreenToSkill adjusts curriculum task categories dynamically based
              on the child&apos;s age category, ensuring challenges are highly
              motivating, rewarding, and ideal for early cognitive development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Age cards grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ageGroupCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-[var(--border)] hover:border-[#22C55E] p-6 rounded-2xl flex flex-col justify-between space-y-6  hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                      <span className="text-xs font-mono font-bold text-[var(--color-brand)] uppercase tracking-wider">
                        {card.ageGroup}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/5 flex items-center justify-center">
                        {card.icon}
                      </div>
                    </div>
                    <h3 className="text-base font-display font-bold text-slate-900 dark:text-slate-50 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--border)] flex flex-col space-y-1">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      PROGRESS METRIC:
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-100 font-medium">
                      {card.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accompanying Preschooler image card */}
            <div className="lg:col-span-4 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)]  bg-white p-5 flex flex-col justify-between min-h-[440px]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/kidlearn.webp"
                    alt="Active early childhood learning blocks"
                    fill
                    className="object-cover animate-fade-in hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600/95 text-white font-mono font-bold text-[10px] tracking-wide py-1 px-2.5 rounded-md shadow-xs">
                    COGNITIVE FOUNDATIONS
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <h4 className="text-sm font-display font-bold text-slate-950 dark:text-slate-50 uppercase tracking-wide">
                    Continuous Growth Adaptive Pipeline
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-500 font-normal leading-relaxed">
                    Designed side-by-side with pediatric insights. Screens
                    evolve alongside your standard preschool, kindergarten, or
                    teen developmental curriculum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: CHILDREN PROGRESS ANALYTICS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-b border-[var(--border)] items-center text-left">
          {/* LEFT: Full image */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-[var(--border)]  group">
              <Image
                src="/childanalytics.webp"
                alt="Parent and child reviewing progress analytics dashboard together"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-2xl border border-[var(--border)] shadow-lg">
                <span className="text-xs font-mono font-bold text-[var(--color-brand)] uppercase tracking-widest block mb-1">
                  On-Device Progress Sandbox
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-500 font-normal leading-relaxed">
                  All analytics stored locally. Zero cloud exports, zero
                  registrations — complete family privacy guaranteed.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Rich readable content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[var(--color-brand)]/10 text-xs font-mono font-bold text-[var(--color-brand)] tracking-wider uppercase">
                REAL-TIME INSIGHT SYSTEMS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
                Track Your Child's Progress — In Complete Privacy
              </h2>
              <p className="text-slate-500 dark:text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                Every answered question, every unlocked app, every earned coin
                is silently recorded into a local analytics engine. Parents get
                deep visibility into cognitive development without sacrificing
                any data to the cloud.
              </p>
            </div>

            {/* Four insight blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-2xl p-5 space-y-2  hover:border-[#22C55E] hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-[var(--color-brand)]" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug">
                  Weekly Accuracy Charts
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 font-normal leading-relaxed">
                  Visual graphs tracking accuracy across math, geometry,
                  phonics, and science — updated daily after each session.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-2xl p-5 space-y-2  hover:border-[#22C55E] hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[var(--color-brand)]" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug">
                  Focus Velocity Scoring
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 font-normal leading-relaxed">
                  Response speed is measured per prompt so parents can see
                  whether cognitive reaction time is improving over weeks.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-2xl p-5 space-y-2  hover:border-[#22C55E] hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-[var(--color-brand)]" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug">
                  Coin & Streak Milestones
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 font-normal leading-relaxed">
                  Daily streaks and earned coins show at a glance how
                  consistently a child is engaging with educational challenges.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-2xl p-5 space-y-2  hover:border-[#22C55E] hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-brand)]" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug">
                  100% On-Device Storage
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 font-normal leading-relaxed">
                  No accounts, no cloud syncing, no third-party tracking.
                  Analytics live entirely on the family's device, under the
                  parent's pin.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[var(--border)]">
              {[
                "Adaptive difficulty adjusts based on real-time correctness speed",
                "Category proficiency split across all age-group subjects",
                "Visual coin tracking vs. screen-time earned ratio",
                "Progress shared with child to boost learning confidence",
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-brand)] mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-snug">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: APP FEATURES ================= */}
        <div className="py-20 border-b border-[var(--border)] space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[var(--color-brand)] font-bold leading-none">
              CORE UTILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-snug">
              A Solution Crafted for Household Devicetime Harmony
            </h2>
            <p className="text-slate-600 dark:text-slate-500 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
              ScreenToSkill provides fully local parental tools and educational
              templates with zero cloud security footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-4 text-left">
            {/* Left Child Portrait */}
            <div className="lg:col-span-5 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)]  h-[440px] lg:h-[500px] group bg-white">
                <Image
                  src="/kidscreen.webp"
                  alt="Pre-school learner celebrating milestone victory"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs p-4 rounded-xl border border-[var(--border)] shadow-xs">
                  <span className="text-[11px] font-mono font-bold text-[var(--color-brand)] uppercase tracking-wider block text-center">
                    INSTANT POSITIVE REINFORCEMENT
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-500 font-normal mt-1 text-center">
                    Replacing screen lockout frustration with delightful
                    milestone awards.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Features List */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-2xl p-6 flex gap-4 items-start  hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-950 dark:text-slate-50 leading-tight">
                    Universally Compatible App Lock
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-relaxed mt-1.55">
                    App lock parameters support standard entertainment apps,
                    social feeds, and web browsers. Instantly detects bypass
                    triggers while maintaining seamless local system response.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-2xl p-6 flex gap-4 items-start  hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-950 dark:text-slate-50 leading-tight">
                    Responsive Age Categorizer
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-relaxed mt-1.55">
                    Toggles challenges dynamically based on selected profiles
                    ranging from auditory sound cue cards (2-3) up to high
                    school sciences and intermediate mathematics (13+).
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-2xl p-6 flex gap-4 items-start  hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-950 dark:text-slate-50 leading-tight">
                    Earned Milestone Rewards
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500 font-normal leading-relaxed mt-1.55">
                    Earn dynamic custom coins with every correct math block or
                    spelling choice. Redirecting attention trains positive habit
                    cycles and builds healthy screen-time reward relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 4: COVERFLOW SCREENSHOTS SLIDER ================= */}
        <div className="py-20 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[var(--color-brand)] font-bold leading-none">
              PREMIUM INTERACTIVE GALLERIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-none">
              Interactive Application Screenshots
            </h2>
            <p className="text-slate-600 dark:text-slate-500 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
              Browse through the exact on-device ScreenToSkill flow, from secure
              parent setup to real-time progress analytics.
            </p>
          </div>

          {/* Coverflow Swiper */}
          <div className="relative w-full">
            {/* Left fade shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--background-subtle)] dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            {/* Right fade shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--background-subtle)] dark:from-slate-950 to-transparent z-10 pointer-events-none" />

            <Swiper
              effect="coverflow"
              grabCursor={true}
              loop={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 120,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-bullet",
                bulletActiveClass: "swiper-bullet-active",
              }}
              modules={[EffectCoverflow, Pagination]}
              className="w-full pb-12"
              style={
                {
                  "--swiper-pagination-color": "#22C55E",
                  "--swiper-pagination-bullet-inactive-color": "#CBD5E1",
                  "--swiper-pagination-bullet-inactive-opacity": "1",
                  "--swiper-pagination-bullet-size": "6px",
                  "--swiper-pagination-bullet-horizontal-gap": "4px",
                } as React.CSSProperties
              }
            >
              {screenshotSlides.map((slide, i) => (
                <SwiperSlide
                  key={i}
                  style={{ width: "220px" }}
                  className="!w-[180px] sm:!w-[220px]"
                >
                  <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl bg-white">
                    <div className="relative aspect-[9/19] w-full">
                      <Image
                        src={slide.image}
                        alt={slide.tag}
                        fill
                        className="object-cover"
                        priority={i < 4}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>

      <DownloadApp />
    </div>
    <Footer/>
    </>

  );
}
