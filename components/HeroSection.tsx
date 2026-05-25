'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

export default function HeroSection() {
  return (
    <>
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Soft elegant pastel background circles */}
        <div className="absolute top-[15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-250/15 blur-[120px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[35%] left-[-15%] w-[550px] h-[550px] rounded-full bg-indigo-200/10 blur-[130px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle & CTAs */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-150 bg-emerald-50/60 text-[10px] sm:text-[11px] font-semibold text-emerald-800 backdrop-blur-sm shadow-2xs select-none">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D084] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00D084]"></span>
                </span>
                <span className="font-mono tracking-wider font-bold uppercase">ScreenToSkill Regulation</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-display font-bold tracking-tight text-slate-900 leading-[1.15] pt-0.5 text-center lg:text-left">
                Turn Screen Time <br className="hidden sm:inline" />
                Into Skill Time
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal text-center lg:text-left">
                Every app unlock becomes a learning opportunity for your child. Convert addictive scrolling into curriculum-aligned active education seamlessly.
              </p>

              {/* Primary action btn - Download App Only */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <a 
                  href="#download"
                  className="group relative w-full sm:w-auto px-6 py-3 bg-[#00D084] hover:bg-[#02bd78] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all text-center cursor-pointer flex items-center justify-center space-x-2 min-w-[200px]"
                >
                  <span>Download App Free</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Trust badge reviews displaying cleanly, removing duplicate stats strip */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 pt-3 text-[11px] font-mono font-medium text-slate-400">
                <span className="text-amber-500 font-sans text-sm leading-none">★ ★ ★ ★ ★</span>
                <span>4.9 rating loved by 100k+ families</span>
              </div>

            </div>

            {/* Right Column: High Fidelity 6-inch Mockup Images in Coverflow 3D style */}
            <div id="install-interactive" className="lg:col-span-6 flex justify-center items-center relative select-none min-h-[440px] sm:min-h-[560px] lg:min-h-[660px] py-6 sm:py-10 overflow-visible isolate">
              
              {/* High-fidelity WebP Background of Mockdevices matching requested theme URL */}
              <div className="absolute inset-x-0 inset-y-0 -z-30 pointer-events-none rounded-[3rem] overflow-hidden">
                <Image 
                  src="https://cdn.gtbg.uicore.pro/2025/12/Mobile-App-Hero-BG.webp" 
                  alt="Mobile App Hero BG" 
                  fill
                  priority
                  className="object-cover scale-102 opacity-100 select-none animate-fade-in"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Backing Blobs matching the premium theme mockup exactly */}
              <div className="absolute top-[8%] left-[-4%] w-[260px] h-[360px] rounded-[90px] bg-[#EDE9FE]/60 blur-[10px] -rotate-12 -z-20 pointer-events-none" />
              <div className="absolute bottom-[5%] left-[-15%] w-[290px] h-[300px] rounded-[110px] bg-[#D1F7EC]/60 blur-[8px] rotate-[35deg] -z-20 pointer-events-none" />
              <div className="absolute bottom-[-2%] right-[-8%] w-[280px] h-[280px] rounded-full bg-[#FAE2FF]/70 blur-[12px] -z-20 pointer-events-none" />
              <div className="absolute top-[18%] right-[-14%] w-[240px] h-[460px] rounded-[100px] bg-[#E1F7F1]/70 blur-[6px] rotate-[15deg] -z-20 pointer-events-none" />

              {/* Beautiful Coverflow Stack */}
              <div className="relative w-full flex justify-center items-center h-[380px] sm:h-[500px] lg:h-[580px] perspective-[1200px] overflow-visible">

                {/* LEFT MOCKUP (6-inch phone app view: Stats & Analytics) */}
                <div 
                  className="hidden md:flex absolute w-[240px] h-[520px]   overflow-hidden flex-col z-10 transition-all duration-500 hover:scale-99 group"
                  style={{ 
                    transform: 'perspective(1200px) rotateY(15deg) scale(0.85) translateX(-185px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                 

                  {/* Inner Mockup Image representing Parent Analytics Screen */}
                  <div className="relative w-full h-full  overflow-hidden">
                     <Image
                      src="/mobile3.png"
                      alt="Parental Analytics App Screenshot"
                      fill
                      sizes="235px"
                      className="object-cover group-hover:scale-99 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Glamorous overlay reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                  </div>
                </div>

                {/* MIDDLE MOCKUP (Center primary 6-inch phone app view: Live Gamified Study Quiz) */}
                <div 
                  className="w-[160px] h-[320px] sm:w-[210px] sm:h-[420px] lg:w-[290px] lg:h-[620px]   relative overflow-hidden flex flex-col z-20 transition-all duration-500 hover:scale-102 hover:shadow-emerald-500/10 group"
                  style={{ transform: 'perspective(1200px) rotateY(0deg)' }}
                >
                

                  {/* High Quality Screen Showcase Image representing beautiful Math MCQs */}
                  <div className="relative w-full h-full  overflow-hidden">
                    <Image
                      src="/mobile1.png"
                      alt="ScreenToSkill Challenge Interface Mockup"
                      fill
                      priority
                      sizes="270px"
                      className="object-cover group-hover:scale-99 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Shiny sheen cover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-white/5 pointer-events-none" />
                  </div>
                </div>

                {/* RIGHT MOCKUP (6-inch phone app view: Restricted Block filters list) */}
                <div 
                  className="hidden lg:flex absolute w-[240px] h-[520px]  overflow-hidden flex-col z-10 transition-all duration-500 hover:scale-95 group"
                  style={{ 
                    transform: 'perspective(1200px) rotateY(-15deg) scale(0.85) translateX(165px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                
                  {/* App Locks Screenshot Mockup image */}
                  <div className="relative w-full h-full overflow-hidden">
                       <Image
                      src="/mobile2.png"
                      alt="Parent App Lock Filters Screen"
                      fill
                      sizes="235px"
                      className="object-cover group-hover:scale-99 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Elegant light highlights */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/0 pointer-events-none" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* STATS STRIP SECTION */}
      <section className="border-y border-slate-100 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="py-2.5 md:py-0">
              <span className="block text-2xl sm:text-3xl font-bold text-slate-800">100k+</span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold block mt-1">Active Families</span>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1 font-normal leading-relaxed">Nurturing high-performance study habits and reducing device dependencies daily.</p>
            </div>
            
            <div className="py-2.5 md:py-0">
              <span className="block text-2xl sm:text-3xl font-bold text-[#00D084]">5M+</span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold block mt-1">Correct MCQ Quests</span>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1 font-normal leading-relaxed">Our comprehensive curriculum empowers core skill tracking dynamically.</p>
            </div>

            <div className="py-2.5 md:py-0">
              <span className="block text-2xl sm:text-3xl font-bold text-[#00D084]">45+ Mins</span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold block mt-1">Saved Daily</span>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1 font-normal leading-relaxed">Replaced addictive brain rot with constructive mental fitness workouts.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
