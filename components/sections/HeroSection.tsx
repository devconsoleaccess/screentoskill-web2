"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

const MOCKUPS = [
  { src: "/images/casestudy/casestudy13.webp", alt: "ScreenToSkill Challenge Interface Mockup" },
  { src: "/images/casestudy/casestudy18.webp", alt: "Parent App Lock Filters Screen" },
  { src: "/images/casestudy/casestudy19.webp", alt: "Parental Analytics App Screenshot" },
  { src: "/images/casestudy/casestudy2.webp", alt: "ScreenToSkill Quiz Overlay" },
  { src: "/images/casestudy/casestudy8.webp", alt: "ScreenToSkill Quiz Overlay" },
  { src: "/images/casestudy/casestudy9.webp", alt: "ScreenToSkill Quiz Overlay" },
  { src: "/images/casestudy/casestudy12.webp", alt: "ScreenToSkill Quiz Overlay" },
  { src: "/images/casestudy/casestudy20.webp", alt: "ScreenToSkill Quiz Overlay" },

];

const STATS = [
  {
    value: "20+",
    label: "Active Families",
    desc: "Nurturing high-performance study habits and reducing device dependencies daily.",
  },
  {
    value: "1K+",
    label: "Correct MCQ Quests",
    desc: "Our comprehensive curriculum empowers core skill tracking dynamically.",
    green: true,
  },
  {
    value: "45+ Mins",
    label: "Saved Daily",
    desc: "Replaced addictive brain rot with constructive mental fitness workouts.",
    green: true,
  },
];

export default function HeroSection() {
  return (
    <>
      <section
        id="hero"
        className="relative pt-32 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
      >
        <div
          className="absolute top-[15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-250/15 blur-[120px] -z-10 pointer-events-none animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute top-[35%] left-[-15%] w-[550px] h-[550px] rounded-full bg-indigo-200/10 dark:bg-indigo-500/5 blur-[130px] -z-10 pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border)] bg-emerald-50/60 dark:bg-emerald-500/10 text-[10px] sm:text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 backdrop-blur-sm shadow-2xs select-none">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-brand)]" />
                </span>
                <span className="font-mono tracking-wider font-bold uppercase">
                  ScreenToSkill Regulation
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-display font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15] pt-0.5 text-center lg:text-left">
                Turn Screen Time <br className="hidden sm:inline" />
                Into Skill Time
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal text-center lg:text-left">
                Every app unlock becomes a learning opportunity for your child.
                ScreenToSkill transforms addictive scrolling into fun
                educational challenges like math, spelling, science, sounds, and
                memory games while helping parents build healthier screen habits
                for their children.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <LinkButton
                  href="#download"
                  size="lg"
                  className="group w-full sm:w-auto min-w-[200px] space-x-2"
                >
                  <span>Download App Free</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </LinkButton>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-2 pt-3 text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
                <span className="text-amber-500 font-sans text-sm leading-none">
                  ★ ★ ★ ★ ★
                </span>
                <span>4.9 rating loved by 20+ families</span>
              </div>
            </div>

            {/* Right Column: Coverflow Mockup Slider */}
            <div
              id="install-interactive"
              className="lg:col-span-6 flex justify-center items-center relative select-none min-h-[440px] sm:min-h-[560px] lg:min-h-[660px] py-6 sm:py-10 overflow-visible isolate"
            >
              <div className="absolute inset-x-0 inset-y-0 -z-30 pointer-events-none overflow-hidden dark:opacity-40 rounded-4xl">
                <Image
                  src="/Mobile-App-Hero-BG.webp"
                  alt="Mobile App Hero BG"
                  fill
                  priority
                  className="object-cover scale-102 opacity-100 select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {[
                "absolute top-[8%] left-[-4%] w-[260px] h-[360px] rounded-[90px] bg-[#EDE9FE]/60 dark:bg-violet-500/10 blur-[10px] -rotate-12 -z-20",
                "absolute bottom-[5%] left-[-15%] w-[290px] h-[300px] rounded-[110px] bg-[#D1F7EC]/60 dark:bg-emerald-500/10 blur-[8px] rotate-[35deg] -z-20",
                "absolute bottom-[-2%] right-[-8%] w-[280px] h-[280px] rounded-full bg-[#FAE2FF]/70 dark:bg-fuchsia-500/10 blur-[12px] -z-20",
                "absolute top-[18%] right-[-14%] w-[240px] h-[460px] rounded-[100px] bg-[#E1F7F1]/70 dark:bg-teal-500/10 blur-[6px] rotate-[15deg] -z-20",
              ].map((cls, i) => (
                <div key={i} className={`${cls} pointer-events-none`} />
              ))}

              <div className="relative w-full flex justify-center items-center h-[460px] sm:h-[520px] lg:h-[560px] -translate-x-2 sm:-translate-x-4 lg:-translate-x-8">
                <Swiper
                  modules={[Autoplay, EffectCoverflow]}
                  effect="coverflow"
                  grabCursor
                  loop
                  centeredSlides
                  slidesPerView={3}
                  spaceBetween={-30}
                  speed={700}
                  watchSlidesProgress
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  coverflowEffect={{
                    rotate: 28,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  className="!w-full !overflow-hidden !py-4"
                >
                  {MOCKUPS.map((mockup, i) => (
                    <SwiperSlide
                      key={i}
                      className="!flex justify-center items-center !w-auto [&:not(.swiper-slide-prev):not(.swiper-slide-next):not(.swiper-slide-active)]:opacity-0 transition-opacity duration-500"
                      style={{ width: "clamp(170px, 26vw, 230px)" }}
                    >
                      <div
                        className="relative overflow-hidden"
                        style={{
                          width: "clamp(170px, 26vw, 225px)",
                          aspectRatio: "390/840",
                        }}
                      >
                        <Image
                          src={mockup.src}
                          alt={mockup.alt}
                          fill
                          loading={i < 3 ? 'eager' : 'lazy'}
                          sizes="(max-width: 640px) 170px, (max-width: 1024px) 200px, 230px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {STATS.map(({ value, label, desc, green }) => (
              <div key={label} className="py-2.5 md:py-0">
                <span
                  className={`block text-2xl sm:text-3xl font-bold ${
                    green
                      ? "text-[var(--color-brand)]"
                      : "text-slate-800 dark:text-slate-100"
                  }`}
                >
                  {value}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500 font-bold block mt-1">
                  {label}
                </span>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-xs mx-auto mt-1 font-normal leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
