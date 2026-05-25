'use client';

import React from 'react';

export default function MandatoryPermissions() {
  return (
    <section id="mandatory-permissions" className="relative py-24 sm:py-32 bg-white border-b border-slate-100 overflow-hidden">
      {/* Abstract vector tech lines or dots matching premium style */}
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(0,208,132,0.03),transparent)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[90px] -z-10 animate-pulse duration-[12s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with high fidelity badging */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50 text-[11px] font-mono font-extrabold text-[#00D084] tracking-wider uppercase select-none">
            <span>Configuration Steps</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-display font-black text-slate-900 tracking-tight leading-tight">
            Mandatory <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D084] to-emerald-600">System Permissions</span>
          </h2>
          
          <p className="text-base text-slate-500 font-semibold leading-relaxed max-w-xl mx-auto">
            Follow these simple device setup steps to unlock seamless, uninterrupted parental locking and instant gamified quizzing.
          </p>
        </div>

        {/* Unique 3 Grid Card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
          
          {/* PERMISSION 1: Accessibility Service */}
          <div className="group relative bg-[#FAFCFC]/90 backdrop-blur-md border border-slate-200/90 hover:border-[#00D084]/40 rounded-[1.8rem] sm:rounded-[2.2rem] p-5 sm:p-7 transition-all duration-300 flex flex-col justify-between min-h-[380px] sm:min-h-[460px] overflow-visible">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none -z-10 rounded-[1.8rem] sm:rounded-[2.2rem]" />
            
            {/* Float Step Number Circle above corner of card */}
            <div className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 w-8.5 h-8.5 sm:w-11 sm:h-11 rounded-full bg-[#00D084] text-white flex items-center justify-center font-display font-black text-sm sm:text-lg shadow-lg shadow-emerald-500/30 z-20 select-none animate-bounce" style={{ animationDuration: '6s' }}>
              1
            </div>

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/40 text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-wider select-none">
                  STEP 01 • ACCESSIBILITY
                </div>
                <span className="text-[10px] text-[#00D084] font-black font-mono tracking-wider">REQUIRED</span>
              </div>

              {/* High fidelity mockup screenshot showing settings list and allowed option */}
              <div className="h-[135px] sm:h-[155px] w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-2.5xl relative overflow-hidden flex flex-col p-3.5 mb-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[9.5px] text-slate-400 font-bold uppercase font-mono tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                    Settings &gt; Accessibility
                  </span>
                  <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-[#00D084]">
                    ALLOW SCREENSHOT GUIDE
                  </span>
                </div>

                {/* Settings list mockup */}
                <div className="space-y-2 text-left text-[9px] font-semibold">
                  <div className="bg-slate-800/25 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#00D084] rounded flex items-center justify-center text-[10px] text-white font-bold leading-none">S</div>
                      <span className="text-white">ScreenToSkill Service</span>
                    </div>
                    <span className="text-[#00D084] font-bold">Enabled • ON</span>
                  </div>

                  <div className="bg-slate-800/10 p-2 rounded-lg border border-slate-900/40 flex items-center justify-between opacity-55">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center text-[10px] text-white font-bold leading-none">O</div>
                      <span className="text-slate-300">Other Services</span>
                    </div>
                    <span className="text-slate-500">Disabled</span>
                  </div>
                </div>
              </div>

              {/* Text explanation */}
              <div className="text-left">
                <h3 className="font-display font-black text-slate-900 text-[17px] sm:text-[18px] leading-tight flex items-center gap-2">
                  App Accessibility
                </h3>
                <p className="text-[12.5px] text-slate-500 mt-2 font-semibold leading-relaxed">
                  Set <strong className="text-slate-800 font-bold">ScreenToSkill</strong> utility to <strong className="text-[#00D084] font-bold">{"'Enabled'"}</strong> within Accessibility Settings. This allows instant launcher interception to intercept restricted social screens in under 10 milliseconds.
                </p>
              </div>
            </div>

            {/* Guide steps badge at bottom */}
            <div className="border-t border-slate-150 pt-3.5 mt-5 flex items-center justify-between">
              <span className="text-[9.5px] text-slate-400 font-bold tracking-wider uppercase font-mono">SYSTEM MONITOR INTERFACE</span>
              <span className="text-[10px] text-[#00D084] font-black font-mono">STEP 1 COMPLETE ✓</span>
            </div>
          </div>

          {/* PERMISSION 2: Overlay over App */}
          <div className="group relative bg-[#FAFCFC]/90 backdrop-blur-md border border-slate-200/90 hover:border-[#00D084]/40 rounded-[1.8rem] sm:rounded-[2.2rem] p-5 sm:p-7 transition-all duration-300 flex flex-col justify-between min-h-[380px] sm:min-h-[460px] overflow-visible">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none -z-10 rounded-[1.8rem] sm:rounded-[2.2rem]" />
            
            {/* Float Step Number Circle above corner of card */}
            <div className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 w-8.5 h-8.5 sm:w-11 sm:h-11 rounded-full bg-[#00D084] text-white flex items-center justify-center font-display font-black text-sm sm:text-lg shadow-lg shadow-emerald-500/30 z-20 select-none animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>
              2
            </div>

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/40 text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-wider select-none">
                  STEP 02 • SYSTEM OVERLAY
                </div>
                <span className="text-[10px] text-[#00D084] font-black font-mono tracking-wider">REQUIRED</span>
              </div>

              {/* High fidelity mockup screenshot showing overlay permissions list */}
              <div className="h-[135px] sm:h-[155px] w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-2.5xl relative overflow-hidden flex flex-col p-3.5 mb-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[9.5px] text-slate-400 font-bold uppercase font-mono tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                    Settings &gt; Draw Over Apps
                  </span>
                  <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-[#00D084]">
                    ALLOWED TARGET
                  </span>
                </div>

                {/* System overlays settings mockup list layout */}
                <div className="space-y-2 text-left text-[9px] font-semibold">
                  <div className="bg-slate-800/10 p-1.5 rounded-lg border border-slate-900/40 flex items-center justify-between opacity-55">
                    <span className="text-slate-300">Roblox Games</span>
                    <span className="text-slate-500">Not Allowed</span>
                  </div>

                  <div className="bg-slate-800/25 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#00D084] rounded flex items-center justify-center text-[10px] text-white font-bold leading-none">O</div>
                      <span className="text-white">ScreenToSkill Overlay</span>
                    </div>
                    <span className="text-[#00D084] font-bold">Allowed • ON</span>
                  </div>
                </div>
              </div>

              {/* Text explanation */}
              <div className="text-left">
                <h3 className="font-display font-black text-slate-900 text-[17px] sm:text-[18px] leading-tight flex items-center gap-2">
                  Overlay on App
                </h3>
                <p className="text-[12.5px] text-slate-500 mt-2 font-semibold leading-relaxed">
                  Permit <strong className="text-slate-800 font-bold">ScreenToSkill</strong> to <strong className="text-[#00D084] font-bold">{"'Draw over other apps'"}</strong>. This ensures the customized gamified quiz popup displays instantly on top of addictive games.
                </p>
              </div>
            </div>

            {/* Guide steps badge at bottom */}
            <div className="border-t border-slate-150 pt-3.5 mt-5 flex items-center justify-between">
              <span className="text-[9.5px] text-slate-400 font-bold tracking-wider uppercase font-mono">QUIZ LAYERING PERMISSION</span>
              <span className="text-[10px] text-[#00D084] font-black font-mono">STEP 2 COMPLETE ✓</span>
            </div>
          </div>

          {/* PERMISSION 3: Usage Access */}
          <div className="group relative bg-[#FAFCFC]/90 backdrop-blur-md border border-slate-200/90 hover:border-[#00D084]/40 rounded-[1.8rem] sm:rounded-[2.2rem] p-5 sm:p-7 transition-all duration-300 flex flex-col justify-between min-h-[380px] sm:min-h-[460px] overflow-visible">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none -z-10 rounded-[1.8rem] sm:rounded-[2.2rem]" />
            
            {/* Float Step Number Circle above corner of card */}
            <div className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 w-8.5 h-8.5 sm:w-11 sm:h-11 rounded-full bg-[#00D084] text-white flex items-center justify-center font-display font-black text-sm sm:text-lg shadow-lg shadow-emerald-500/30 z-20 select-none animate-bounce" style={{ animationDuration: '6s', animationDelay: '3s' }}>
              3
            </div>

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/40 text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-wider select-none">
                  STEP 03 • USAGE STATISTICS
                </div>
                <span className="text-[10px] text-[#00D084] font-black font-mono tracking-wider">REQUIRED</span>
              </div>

              {/* High fidelity mockup screenshot showing usage data guide */}
              <div className="h-[135px] sm:h-[155px] w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-2.5xl relative overflow-hidden flex flex-col p-3.5 mb-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[9.5px] text-slate-400 font-bold uppercase font-mono tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                    Settings &gt; Usage Stats API
                  </span>
                  <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-[#00D084]">
                    TRACKING ENABLED
                  </span>
                </div>

                {/* Usage access settings list mockup */}
                <div className="space-y-2 text-left text-[9px] font-semibold">
                  <div className="bg-slate-800/25 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#00D084] rounded flex items-center justify-center text-[10px] text-white font-bold leading-none">U</div>
                      <span className="text-white">ScreenToSkill Usage</span>
                    </div>
                    <span className="text-[#00D084] font-bold">Allowed • ON</span>
                  </div>

                  <div className="bg-slate-800/10 p-1.5 rounded-lg border border-slate-900/40 flex items-center justify-between opacity-55">
                    <span className="text-slate-300">Default Web Browsers</span>
                    <span className="text-slate-500">Allowed</span>
                  </div>
                </div>
              </div>

              {/* Text explanation */}
              <div className="text-left">
                <h3 className="font-display font-black text-slate-900 text-[17px] sm:text-[18px] leading-tight flex items-center gap-2">
                  Usage Permissions
                </h3>
                <p className="text-[12.5px] text-slate-500 mt-2 font-semibold leading-relaxed">
                  Configure <strong className="text-slate-800 font-bold">ScreenToSkill</strong> to <strong className="text-[#00D084] font-bold">{"'Allow Usage Tracking'"}</strong>. This permits our software to calculate cumulative screen time metrics and trigger block layers accurately.
                </p>
              </div>
            </div>

            {/* Guide steps badge at bottom */}
            <div className="border-t border-slate-150 pt-3.5 mt-5 flex items-center justify-between">
              <span className="text-[9.5px] text-slate-400 font-bold tracking-wider uppercase font-mono">AUTOMATED DRILLDOWN REC</span>
              <span className="text-[10px] text-[#00D084] font-black font-mono">STEP 3 COMPLETE ✓</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
