import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import WhyScreenToSkill from "@/components/sections/WhyScreenToSkill";
import ChildrenUseCases from "@/components/sections/ChildrenUseCases";
import BrainDevelopmentImpact from "@/components/sections/BrainDevelopmentImpact";
import BeforeAfter from "@/components/sections/BeforeAfter";
import HowItWorks from "@/components/sections/HowItWorks";
import ParentAnalytics from "@/components/sections/ParentAnalytics";
import ProjectCaseStudySection from "@/components/sections/ProjectCaseStudySection";
import FutureVision from "@/components/sections/FutureVision";
import MandatoryPermissions from "@/components/sections/MandatoryPermissions";
import FAQs from "@/components/sections/FAQs";
import DownloadApp from "@/components/sections/DownloadApp";
import SetupInstall from "@/components/sections/SetupInstall";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--background)]">
      {/* Ambient blur decorations */}
      <div className="absolute top-0 right-[-15%] w-[45vw] h-[45vw] rounded-full bg-emerald-100/30 dark:bg-emerald-500/5 blur-[130px] -z-20 pointer-events-none" />
      <div className="absolute top-[25%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-indigo-50/45 dark:bg-indigo-500/5 blur-[110px] -z-20 pointer-events-none" />

      <main className="w-full relative">
        <Header />
        <HeroSection />
        <WhyScreenToSkill />
        <ChildrenUseCases />
        <BrainDevelopmentImpact />
        <BeforeAfter />
        <HowItWorks />
        <MandatoryPermissions />
        <SetupInstall />
        <ParentAnalytics />
        <ProjectCaseStudySection />
        <FutureVision />
        <FAQs />
        <DownloadApp />
        <Footer />
      </main>
    </div>
  );
}
