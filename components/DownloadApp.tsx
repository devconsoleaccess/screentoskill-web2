'use client';

import React from 'react';
import Image from 'next/image';

export default function DownloadApp() {
  return (
    <section id="download" className="relative py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-lg shadow-emerald-600/10">
          {/* Background design coordinates */}
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left text column */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">
                Download the app now
              </h2>
              <p className="text-emerald-50 text-xs sm:text-sm font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                Join over 100k+ families who turned daily device screen time struggles into a playful curriculum game with ScreenToSkill. Ready for iOS & Android.
              </p>

              {/* Store buttons with actual premium styles/icons */}
             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                
                {/* App Store */}
                <a
                  href="#download"
                  className="group transition-all hover:scale-105 active:scale-95"
                >
                  <Image
                    src={'/appstoreicon.png'}
                    alt="Download on App Store"
                    width={180}
                    height={56}
                    className="h-[54px] w-auto object-contain drop-shadow-lg"
                    priority
                  />
                </a>

                {/* Google Play */}
                <a
                  href="#download"
                  className="group transition-all hover:scale-105 active:scale-95"
                >
                  <Image
                    src={'/playstoreicon.png'}
                    alt="Get it on Google Play"
                    width={180}
                    height={56}
                    className="h-[54px] w-auto object-contain drop-shadow-lg"
                    priority
                  />
                </a>
              </div>
            </div>
            {/* Right column: Custom Mockup images on download section */}
            <div className="lg:col-span-6 flex justify-center relative max-w-md mx-auto lg:max-w-none w-full">
              <div className="relative w-full aspect-[650/472] rounded-xl overflow-hidden   group">
                <Image 
                  src="https://cdn.gtbg.uicore.pro/2025/12/Mobile-App-App-Image-2-650x472.webp" 
                  alt="ScreenToSkill App Dashboard Demonstration" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
