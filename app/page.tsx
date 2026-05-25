import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyScreenToSkill from '@/components/WhyScreenToSkill';
import ChildrenUseCases from '@/components/ChildrenUseCases';
import BrainDevelopmentImpact from '@/components/BrainDevelopmentImpact';
import BeforeAfter from '@/components/BeforeAfter';
import HowItWorks from '@/components/HowItWorks';
import ParentAnalytics from '@/components/ParentAnalytics';
import ProjectCaseStudySection from '@/components/ProjectCaseStudySection';
import FutureVision from '@/components/FutureVision';
import MandatoryPermissions from '@/components/MandatoryPermissions';
import FAQs from '@/components/FAQs';
import DownloadApp from '@/components/DownloadApp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50/50">
      {/* Absolute high-fidelity ambient blur decorations background and lights */}
      <div className="absolute top-0 right-[-15%] w-[45vw] h-[45vw] rounded-full bg-emerald-100/30 blur-[130px] -z-20 pointer-events-none" />
      <div className="absolute top-[25%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-indigo-50/45 blur-[110px] -z-20 pointer-events-none" />
      
      {/* 1. Header Navigation Component */}
      <Header />
      
      {/* Main Container Content */}
      <main className="w-full relative">
        {/* 2. Hero Interactive Stage Component */}
        <HeroSection />

        {/* 3. Why Choose ScreenToSkill Illustration/Feature matrix Component */}
        <WhyScreenToSkill />

        {/* 3b. Milestone Age-Based Learning & Children Use Cases Component */}
        <ChildrenUseCases />

        {/* 3c. Brain Development Support Paradigm Section */}
        <BrainDevelopmentImpact />

        {/* 3c. Emotional before & after comparison grid */}
        <BeforeAfter />

        {/* 4. Onboarding process flow with interactive CSS cards Component */}
        <HowItWorks />

        {/* 4c. Analytics reports dashboard Component */}
        <ParentAnalytics />

        {/* 4ca. Showcase App Case Study Teaser Component */}
        <ProjectCaseStudySection />

        {/* 4d. Future vision values storytelling Component */}
        <FutureVision />

        {/* 5. Device-level security onboarding & permissions setup block Component */}
        <MandatoryPermissions />

        {/* 6. Active state Accordions & parent hint block Component */}
        <FAQs />

        {/* 7. CTA App install Component */}
        <DownloadApp />
      </main>

      {/* 8. Responsive footer structure Component */}
      <Footer />
    </div>
  );
}
