"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HighlightUnderline } from "@/components/SubElements";
import {
  ArrowLeft,
  Sparkles,
  Brain,
  CheckCircle2,
  Star,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  Lock,
  Unlock,
  Award,
  BookOpen,
  Sliders,
  Settings,
  LineChart,
  Volume2,
  Trophy,
  Activity,
  Palette,
  Hash,
  Triangle,
  Binary,
} from "lucide-react";
import DownloadApp from "@/components/DownloadApp";

export default function CaseStudyPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedAgeForAnalytics, setSelectedAgeForAnalytics] = useState("3-4");
  const [analyticsHoveredIndex, setAnalyticsHoveredIndex] = useState<
    number | null
  >(null);

  const ageSpecificAnalytics = {
    "2-3": {
      ageTitle: "AGES 2-3",
      averageSpeed: "6.4s / prompt",
      accuracyValue: "81%",
      streak: "4 Days",
      tokens: "310 Coins",
      metrics: [
        {
          label: "Sensory Mimicking & Audio",
          val: "91%",
          icon: <Volume2 className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Animal Sounds Recognition",
          val: "84%",
          icon: <Sparkles className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Audio Rhythm & Music Sync",
          val: "76%",
          icon: <Activity className="w-4 h-4 text-[#22C55E]" />,
        },
      ],
      weeklyTrend: [55, 62, 70, 68, 76, 84, 91],
    },
    "3-4": {
      ageTitle: "AGES 3-4",
      averageSpeed: "4.8s / prompt",
      accuracyValue: "84%",
      streak: "5 Days",
      tokens: "420 Coins",
      metrics: [
        {
          label: "Sensory & Sounds Mimicking",
          val: "92%",
          icon: <Volume2 className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Shapes Matching & Geometry",
          val: "78%",
          icon: <Triangle className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Colors Recognition Speed",
          val: "85%",
          icon: <Palette className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Simple Character Counting",
          val: "64%",
          icon: <Hash className="w-4 h-4 text-[#22C55E]" />,
        },
      ],
      weeklyTrend: [70, 75, 82, 80, 88, 92, 90],
    },
    "4-7": {
      ageTitle: "AGES 4-7",
      averageSpeed: "3.9s / prompt",
      accuracyValue: "88%",
      streak: "7 Days",
      tokens: "580 Coins",
      metrics: [
        {
          label: "Letter Trace Fluency",
          val: "80%",
          icon: <BookOpen className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Spelling Nouns Logic",
          val: "74%",
          icon: <Brain className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Speech Pronunciation Sync",
          val: "88%",
          icon: <Volume2 className="w-4 h-4 text-[#22C55E]" />,
        },
      ],
      weeklyTrend: [60, 68, 75, 81, 79, 85, 84],
    },
    "13+": {
      ageTitle: "AGES 13+",
      averageSpeed: "2.6s / prompt",
      accuracyValue: "76%",
      streak: "12 Days",
      tokens: "950 Coins",
      metrics: [
        {
          label: "Algebra Formulas Mastery",
          val: "72%",
          icon: <Binary className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Geological Earth Cycles",
          val: "65%",
          icon: <Activity className="w-4 h-4 text-[#22C55E]" />,
        },
        {
          label: "Advanced Vocabulary Logic",
          val: "82%",
          icon: <BookOpen className="w-4 h-4 text-[#22C55E]" />,
        },
      ],
      weeklyTrend: [55, 62, 70, 68, 76, 78, 80],
    },
  };

  // Clean, high-contrast, age-based questions curriculum data cards with Lucide icons (No emojis!)
  const ageGroupCards = [
    {
      ageGroup: "Ages 2-3",
      title: "Developmental Cues & Sounds",
      desc: "Develops cognitive and speech readiness. Toddlers engage in playful sonic associations like animal sound recognition and primitive audio rhythms.",
      metric: "Auditory recognition metrics",
      icon: <Volume2 className="w-5 h-5 text-[#22C55E]" />,
      detail:
        "Matching nature audio patterns to vibrant animal representations.",
    },
    {
      ageGroup: "Ages 3-4",
      title: "Shapes & Primary Colors",
      desc: "Promotes fine spatial recognition and coordination. Children are presented with responsive color palettes and basic vector shapes to drag-and-drop.",
      metric: "Spatial reasoning maps",
      icon: <Triangle className="w-5 h-5 text-[#22C55E]" />,
      detail: "Sorting circles, triangles, and primary colors correctly.",
    },
    {
      ageGroup: "Ages 4-7",
      title: "Linguistic Letters & Tracing",
      desc: "Accelerates preschool reading fundamentals. Kids interact with basic phonics loops, spelling builders, and character trace activities.",
      metric: "Pre-reading fluency trackers",
      icon: <BookOpen className="w-5 h-5 text-[#22C55E]" />,
      detail:
        "Identifying simple letter sounds and spelling basic 3-letter nouns.",
    },
    {
      ageGroup: "Ages 13+",
      title: "English, Science & Math",
      desc: "Tailored to intermediate education challenges. Prompts school-age teens with algebraic equations, geological cycles, and literary grammar.",
      metric: "Advanced logic velocity reports",
      icon: <Binary className="w-5 h-5 text-[#22C55E]" />,
      detail: "Completing multi-step science challenges or algebra worksheets.",
    },
  ];

  // Screenshots slider dataset
  const screenshotSlides = [
    {
      title: "1. Parent Setup & App Guard",
      subtitle: "Choose target applications to restrict",
      description:
        "From the secure parent configuration dashboard, select which high-stimulation apps you want your children to earn access to (e.g., social feeds or online video scrolling). Setup custom times dynamically.",
      tag: "STEP 1: SECURE LOCKS",
      image: "/images/casestudy/casestudy1.png",
      icon: <Settings className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "setup",
    },
    {
      title: "2. Automatic App Interrupt",
      subtitle: "Instant non-hostile intercept overlay",
      description:
        "The moment the child touches a targeted high-stimulation application, ScreenToSkill displays a warm full-screen overlay in place of standard lock blocks. The friendly layout points directly to the next educational challenge.",
      tag: "STEP 2: GENTLE BARRIER",
      image: "/images/casestudy/casestudy2.png",
      icon: <Lock className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "overlay",
    },
    {
      title: "3. Interactive Active Challenges",
      subtitle: "Curriculum tailored to your child's age",
      description:
        "Children are prompted with active learning cards matching their age category. From auditory sound matching up to algebra and natural science concepts — turning screens into productive classrooms.",
      tag: "STEP 3: SENSORY PUZZLE",
      image: "/images/casestudy/casestudy3.png",
      icon: <Brain className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "challenge",
    },
    {
      title: "4. Success Reward & Instant Unlock",
      subtitle: "Correct answers immediately slide open gates",
      description:
        "Upon giving the correct question answers, children receive encouraging tokens and milestone coins. The locked app is unlocked automatically and immediately prepared to play for their preloaded window of time.",
      tag: "STEP 4: UNLOCKED SUCCESS",
      image: "/images/casestudy/casestudy4.png",
      icon: <Unlock className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "unlock",
    },
    {
      title: "5. Real-Time Progressive Analytics",
      subtitle: "Sovereign local tracking dashboard",
      description:
        "Track speed metrics, category mastery level, and daily milestones on-device. Our analytics dashboard keeps parents deeply connected to their child's cognitive growth with zero external data exports.",
      tag: "STEP 5: VISUAL CHARTS",
      image: "/images/casestudy/casestudy5.png",
      icon: <LineChart className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "analytics",
    },
    {
      title: "5. Real-Time Progressive Analytics",
      subtitle: "Sovereign local tracking dashboard",
      description:
        "Track speed metrics, category mastery level, and daily milestones on-device. Our analytics dashboard keeps parents deeply connected to their child's cognitive growth with zero external data exports.",
      tag: "STEP 5: VISUAL CHARTS",
      image: "/images/casestudy/casestudy6.png",
      icon: <LineChart className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "analytics",
    },
    {
      title: "5. Real-Time Progressive Analytics",
      subtitle: "Sovereign local tracking dashboard",
      description:
        "Track speed metrics, category mastery level, and daily milestones on-device. Our analytics dashboard keeps parents deeply connected to their child's cognitive growth with zero external data exports.",
      tag: "STEP 5: VISUAL CHARTS",
      image: "/images/casestudy/casestudy7.png",
      icon: <LineChart className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "analytics",
    },
    {
      title: "5. Real-Time Progressive Analytics",
      subtitle: "Sovereign local tracking dashboard",
      description:
        "Track speed metrics, category mastery level, and daily milestones on-device. Our analytics dashboard keeps parents deeply connected to their child's cognitive growth with zero external data exports.",
      tag: "STEP 5: VISUAL CHARTS",
      image: "/images/casestudy/casestudy8.png",
      icon: <LineChart className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "analytics",
    },
    {
      title: "5. Real-Time Progressive Analytics",
      subtitle: "Sovereign local tracking dashboard",
      description:
        "Track speed metrics, category mastery level, and daily milestones on-device. Our analytics dashboard keeps parents deeply connected to their child's cognitive growth with zero external data exports.",
      tag: "STEP 5: VISUAL CHARTS",
      image: "/images/casestudy/casestudy9.png",
      icon: <LineChart className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "analytics",
    },
    {
      title: "5. Real-Time Progressive Analytics",
      subtitle: "Sovereign local tracking dashboard",
      description:
        "Track speed metrics, category mastery level, and daily milestones on-device. Our analytics dashboard keeps parents deeply connected to their child's cognitive growth with zero external data exports.",
      tag: "STEP 5: VISUAL CHARTS",
      image: "/images/casestudy/casestudy10.png",
      icon: <LineChart className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "analytics",
    },
    {
      title: "5. Real-Time Progressive Analytics",
      subtitle: "Sovereign local tracking dashboard",
      description:
        "Track speed metrics, category mastery level, and daily milestones on-device. Our analytics dashboard keeps parents deeply connected to their child's cognitive growth with zero external data exports.",
      tag: "STEP 5: VISUAL CHARTS",
      image: "/images/casestudy/casestudy11.png",
      icon: <LineChart className="w-5 h-5 text-[#22C55E]" />,
      mockupType: "analytics",
    },
  ];

  const handleNextSlide = () => {
    setActiveSlide((prev) =>
      prev === screenshotSlides.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? screenshotSlides.length - 1 : prev - 1,
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAFCFC]/90 overflow-x-hidden text-slate-800 font-sans">
      {/* Background radial highlights */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#22C55E]/5 blur-[130px] -z-20 pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#22C55E]/5 blur-[120px] -z-20 pointer-events-none" />

      {/* Upper Navigation Header */}
      <Header />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation button */}
        <div className="mb-8 text-left">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[#E5E7EB] bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all shadow-2xs cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Landing Hub</span>
          </Link>
        </div>

        {/* ================= SECTION 1: APP OVERVIEW ================= */}
        <div className="text-left space-y-6 w-full mb-12 border-b border-[#E5E7EB] pb-12">
          <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">
            Deep Study: <HighlightUnderline>ScreenToSkill</HighlightUnderline>{" "}
            Core Methodology
          </h1>

          <p className="text-slate-500 text-sm sm:text-lg leading-relaxed font-semibold max-w-3xl">
            Meet **ScreenToSkill**, a developmental companion application
            designed to turn passive entertainment loops into interactive
            learning quests. Learn how our software helps children self-regulate
            digital habits gracefully.
          </p>

          {/* Core Concept Overview with Parent & Child Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl flex gap-4 shadow-2xs items-start">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center font-black text-xs text-[#22C55E] shrink-0 mt-0.5 animate-pulse">
                  1
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-sm sm:text-base uppercase tracking-wider">
                    Parent Guided Lock Config
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mt-1">
                    Parents secure the child&apos;s most high-volume,
                    high-stimulation apps (such as video streaming, online feeds
                    or games) directly through our secure local lock module.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl flex gap-4 shadow-2xs items-start animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center font-black text-xs text-[#22C55E] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-[#22C55E] font-bold text-sm sm:text-base uppercase tracking-wider">
                    Cognitive Interrupt Overlay
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mt-1">
                    When a restricted app is opened, our lock overlay pops up
                    immediately, holding screen focus to present age-matched
                    logical questions and brain-building milestones.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl flex gap-4 shadow-2xs items-start">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center font-black text-xs text-[#22C55E] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-sm sm:text-base uppercase tracking-wider">
                    Correct Answers Unlock
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mt-1">
                    Answering correctly instantly rewards your child with active
                    tokens, unlocks the restricted app automatically, and
                    securely gathers progressive child analytic records.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="relative w-full h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-xs group bg-white">
                <Image
                  src="/childlearn.jpg"
                  alt="Mother and cute preschool child daughter learning with screen overlay together"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent animate-fade-in" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-white/20 text-center shadow-xs">
                  <span className="text-xs font-mono font-bold text-[#22C55E] uppercase tracking-widest block">
                    Active Shared Co-Regulation
                  </span>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed mt-1.5">
                    Bridging device screen-time with genuine mental milestones
                    and cozy family connections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Age-based Curriculum Blocks with Visual Guides */}
        <div className="py-16 border-b border-[#E5E7EB] text-left">
          <div className="space-y-4 mb-10 max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#22C55E] font-bold leading-none">
              DEVELOPMENTAL SCAFFOLDING
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Age-Customized Learning Questions Overlay
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
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
                  className="bg-white border border-[#E5E7EB] hover:border-[#22C55E] p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                        {card.ageGroup}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#22C55E]/5 flex items-center justify-center">
                        {card.icon}
                      </div>
                    </div>
                    <h3 className="text-base font-display font-bold text-slate-900 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex flex-col space-y-1">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                      PROGRESS METRIC:
                    </span>
                    <p className="text-xs text-slate-800 font-medium">
                      {card.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accompanying Preschooler image card */}
            <div className="lg:col-span-4 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm bg-white p-5 flex flex-col justify-between min-h-[440px]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/kidlearn.png"
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
                  <h4 className="text-sm font-display font-bold text-slate-950 uppercase tracking-wide">
                    Continuous Growth Adaptive Pipeline
                  </h4>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    Designed side-by-side with pediatric insights. Screens
                    evolve alongside your standard preschool, kindergarten, or
                    teen developmental curriculum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ================= SECTION 2: CHILDREN PROGRESS ANALYTICS CHART ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-16 border-b border-[#E5E7EB] items-center text-left">
          <div className="lg:col-span-5 relative">
            {/* Live Interactive Child Progress Sandbox Dashboard */}
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl space-y-5 shadow-sm select-none">
              {/* Header with Selector Segment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      Analytics Engine
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-emerald-50 text-[#22C55E] px-2 py-0.5 rounded font-black uppercase tracking-wider">
                    {
                      ageSpecificAnalytics[
                        selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                      ].ageTitle
                    }
                  </span>
                </div>

                {/* Switcher Buttons */}
                <div className="grid grid-cols-4 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  {(["2-3", "3-4", "4-7", "13+"] as const).map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setSelectedAgeForAnalytics(age)}
                      className={`py-1.5 text-center text-[10px] sm:text-xs font-medium rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAgeForAnalytics === age
                          ? "bg-white text-slate-900 shadow-xs border border-slate-150"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {age} Yrs
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stat Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="bg-[#22C55E]/5 p-3 rounded-xl border border-[#22C55E]/10 space-y-0.5 text-left">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    FOCUS VELOCITY
                  </span>
                  <p className="text-xs sm:text-sm font-display font-bold text-slate-900 leading-none">
                    {
                      ageSpecificAnalytics[
                        selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                      ].averageSpeed
                    }
                  </p>
                </div>
                <div className="bg-[#22C55E]/5 p-3 rounded-xl border border-[#22C55E]/10 space-y-0.5 text-left">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    ACCURACY RATE
                  </span>
                  <p className="text-xs sm:text-sm font-display font-bold text-[#22C55E] leading-none">
                    {
                      ageSpecificAnalytics[
                        selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                      ].accuracyValue
                    }
                  </p>
                </div>
              </div>

              {/* Progress Categories (Dynamic based on selectedAgeForAnalytics) */}
              <div className="space-y-3.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-dashed border-slate-100">
                  Category Proficiency
                </span>
                {ageSpecificAnalytics[
                  selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                ].metrics.map((metric, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-slate-700 items-center">
                      <span className="flex items-center gap-2">
                        {metric.icon}
                        <span>{metric.label}</span>
                      </span>
                      <span className="text-[#22C55E] font-bold">
                        {metric.val}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#22C55E] rounded-full transition-all duration-500 ease-out"
                        style={{ width: metric.val }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Actual Custom SVG Line Chart */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    Weekly Accuracy Trend
                  </span>
                  <span className="font-semibold text-[#22C55E]">
                    Hover values below to inspect
                  </span>
                </div>

                <div className="relative bg-slate-50 border border-slate-100 rounded-xl p-3 h-28 flex items-center justify-center">
                  {/* Tooltip Overlay */}
                  {analyticsHoveredIndex !== null && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-mono py-1 px-2.5 rounded-lg border border-slate-800 shadow-md pointer-events-none z-10 animate-fade-in whitespace-nowrap">
                      {
                        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                          analyticsHoveredIndex
                        ]
                      }
                      :{" "}
                      <span className="text-[#22C55E] font-black">
                        {
                          ageSpecificAnalytics[
                            selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                          ].weeklyTrend[analyticsHoveredIndex]
                        }
                        %
                      </span>
                    </div>
                  )}

                  {/* SVG Line Graph */}
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 320 80"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22C55E"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#22C55E"
                          stopOpacity="0.0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Area under the line */}
                    <path
                      d={`M 10 75 L ${ageSpecificAnalytics[
                        selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                      ].weeklyTrend
                        .map((val, idx) => {
                          const x = (idx / 6) * 300 + 10;
                          const y = 70 - (val / 100) * 55;
                          return `${x} ${y}`;
                        })
                        .join(" L ")} L 310 75 Z`}
                      fill="url(#chartGrad)"
                    />

                    {/* Path Line */}
                    <path
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={`M ${ageSpecificAnalytics[
                        selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                      ].weeklyTrend
                        .map((val, idx) => {
                          const x = (idx / 6) * 300 + 10;
                          const y = 70 - (val / 100) * 55;
                          return `${x} ${y}`;
                        })
                        .join(" L ")}`}
                    />

                    {/* Interactive Dot Nodes */}
                    {ageSpecificAnalytics[
                      selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                    ].weeklyTrend.map((val, idx) => {
                      const x = (idx / 6) * 300 + 10;
                      const y = 70 - (val / 100) * 55;
                      return (
                        <g key={idx} className="cursor-pointer">
                          {/* Invisible larger hover ring for easy hover targeting */}
                          <circle
                            cx={x}
                            cy={y}
                            r="10"
                            fill="transparent"
                            onMouseEnter={() => setAnalyticsHoveredIndex(idx)}
                            onMouseLeave={() => setAnalyticsHoveredIndex(null)}
                          />
                          {/* Visible tiny circle */}
                          <circle
                            cx={x}
                            cy={y}
                            r={analyticsHoveredIndex === idx ? "5" : "3"}
                            fill={
                              analyticsHoveredIndex === idx
                                ? "#22C55E"
                                : "#ffffff"
                            }
                            stroke="#22C55E"
                            strokeWidth={
                              analyticsHoveredIndex === idx ? "2" : "1.5"
                            }
                            style={{ transition: "all 150ms ease" }}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Total Rewards Meter */}
              <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border border-slate-100">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#22C55E]" />
                  <span>On-Device Streak Badge</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-800 bg-[#22C55E]/10 text-[#22C55E] px-2 py-0.5 rounded-md font-sans text-[10px]">
                    {
                      ageSpecificAnalytics[
                        selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                      ].streak
                    }
                  </span>
                  <span className="font-bold text-slate-800 font-sans">
                    {
                      ageSpecificAnalytics[
                        selectedAgeForAnalytics as keyof typeof ageSpecificAnalytics
                      ].tokens
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[#22C55E]/10 text-xs font-mono font-bold text-[#22C55E] tracking-wider uppercase">
              <span>REAL-TIME INSIGHT SYSTEMS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              Create Children Progress Analytics
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              ScreenToSkill automatically converts every solved logic riddle
              into tangible educational accuracy, memory response speed, and
              cognitive progress indicators. Our software creates highly
              granular analysis charts stored completely on-device, accessible
              only inside the secure parent gate settings.
            </p>

            {/* Parent children reviewing reports together visual */}
            <div className="relative w-full h-[340px] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs group bg-white">
              <Image
                src="/childanalytics.jpg"
                alt="Parent and children review educational cognitive progress metrics together happily at home"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider block">
                    REINFORCED MOTIVATION
                  </span>
                  <p className="text-xs text-slate-600 font-normal mt-1">
                    Allow children to look at their learning curve triumphs to
                    boost confidence.
                  </p>
                </div>
                <div className="hidden sm:block text-[11px] font-mono bg-slate-100 text-slate-700 py-1.5 px-3 border border-slate-155 rounded-lg shrink-0 font-medium">
                  On-Device Local Sandbox
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex space-x-2.5 items-start">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600 font-normal">
                  Weekly learning graphs across math, geometry, and phonics
                  indicators.
                </p>
              </div>
              <div className="flex space-x-2.5 items-start">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600 font-normal">
                  Difficulty automatically adapts based on real-time correctness
                  speed.
                </p>
              </div>
              <div className="flex space-x-2.5 items-start">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600 font-normal">
                  Visual tracking of coin earnings to evaluate screen-time
                  versus active work.
                </p>
              </div>
              <div className="flex space-x-2.5 items-start">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600 font-normal">
                  Safe on-device sandbox. No registration, credentials, or cloud
                  tracking needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: APP FEATURES ================= */}
        <div className="py-20 border-b border-[#E5E7EB] space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#22C55E] font-bold leading-none">
              CORE UTILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-snug">
              A Solution Crafted for Household Devicetime Harmony
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
              ScreenToSkill provides fully local parental tools and educational
              templates with zero cloud security footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-4 text-left">
            {/* Left Child Portrait */}
            <div className="lg:col-span-5 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm h-[440px] lg:h-[500px] group bg-white">
                <Image
                  src="/kidscreen.jpg"
                  alt="Pre-school learner celebrating milestone victory"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-slate-100 shadow-xs">
                  <span className="text-[11px] font-mono font-bold text-[#22C55E] uppercase tracking-wider block text-center">
                    INSTANT POSITIVE REINFORCEMENT
                  </span>
                  <p className="text-xs text-slate-600 font-normal mt-1 text-center">
                    Replacing screen lockout frustration with delightful
                    milestone awards.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Features List */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Feature 1 */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-950 leading-tight">
                    Universally Compatible App Lock
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mt-1.55">
                    App lock parameters support standard entertainment apps,
                    social feeds, and web browsers. Instantly detects bypass
                    triggers while maintaining seamless local system response.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-950 leading-tight">
                    Responsive Age Categorizer
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mt-1.55">
                    Toggles challenges dynamically based on selected profiles
                    ranging from auditory sound cue cards (2-3) up to high
                    school sciences and intermediate mathematics (13+).
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-950 leading-tight">
                    Earned Milestone Rewards
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mt-1.55">
                    Earn dynamic custom coins with every correct math block or
                    spelling choice. Redirecting attention trains positive habit
                    cycles and builds healthy screen-time reward relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 4: APP SCREENSHOTS SLIDER ================= */}
        <div className="py-20  text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#22C55E] font-bold leading-none">
              PREMIUM INTERACTIVE GALLERIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-none bg-linear-to-r from-slate-950 to-slate-800 bg-clip-text text-transparent">
              Interactive Application Screenshots Slider
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
              Swipe or toggle between these UI mockup screens representing the
              exact on-device ScreenToSkill flow.
            </p>
          </div>

          {/* Interactive Screen Slider Layout */}
          <div className="grid grid-cols-1  gap-10 items-center max-w-5xl mx-auto bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 text-left shadow-2xs">
            {/* Left Description Side */}
      
            {/* Right Screen Device Side */}
            {/* Right Screenshot Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full max-w-[250px] sm:max-w-[320px]"
                >
                  {/* Phone Frame */}
                  <div className="relative aspect-[9/19] rounded-[36px] border-[10px] border-slate-200 bg-black overflow-hidden shadow-2xl">
                   

                    {/* Screenshot */}
                    <Image
                      src={screenshotSlides[activeSlide].image}
                      alt={screenshotSlides[activeSlide].title}
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                  </div>

                  {/* Floating Label */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-lg px-4 py-2 rounded-2xl">
                    <p className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                      {screenshotSlides[activeSlide].tag}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
               <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handlePrevSlide}
                  className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-slate-600 hover:text-[#22C55E] hover:border-[#22C55E] transition-all cursor-pointer focus:outline-none"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex space-x-1">
                  {screenshotSlides.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeSlide === i
                          ? "w-6 bg-[#22C55E]"
                          : "w-1.5 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextSlide}
                  className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-slate-600 hover:text-[#22C55E] hover:border-[#22C55E] transition-all cursor-pointer focus:outline-none"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
          </div>
        </div>
      </main>
      <DownloadApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
