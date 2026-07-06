import type { Metadata } from "next";
import { ShieldCheck, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ScreenToSkill",
  description:
    "Learn how ScreenToSkill collects, uses, and protects your child's data and your family's information.",
};

type PolicySection = {
  heading: string;
  body: React.ReactNode;
};

const SECTIONS: PolicySection[] = [
  {
    heading: "1. Information We Collect",
    body: (
      <>
        We collect information you provide directly to us when you create a
        parent account, set up a child profile, or contact our support team.
        This may include your name, email address, your child&apos;s first name,
        age or grade level, and learning progress data such as quiz scores and
        completed challenges. We do not knowingly collect more personal
        information from children than is reasonably necessary to provide the
        learning experience.
      </>
    ),
  },
  {
    heading: "2. How We Use Information",
    body: (
      <>
        We use the information we collect to operate and improve ScreenToSkill,
        personalize learning content to your child&apos;s age and grade level,
        track progress and award in-app rewards, communicate with parents about
        account activity, and maintain the safety and security of our platform.
      </>
    ),
  },
  {
    heading: "3. Parental Controls",
    body: (
      <>
        ScreenToSkill is designed for parents to stay in control. Parents can
        review, update, or delete their child&apos;s profile information at any
        time from the account dashboard. We never allow children to make
        purchases, change account settings, or share personal information
        without parental permission.
      </>
    ),
  },
  {
    heading: "4. Children's Privacy",
    body: (
      <>
        We are committed to protecting children&apos;s privacy and comply with
        applicable children&apos;s privacy laws, including the Children&apos;s
        Online Privacy Protection Act (COPPA) where applicable. We do not
        knowingly sell or share children&apos;s personal information with third
        parties for advertising purposes, and we do not display behavioral
        advertising to children within the app.
      </>
    ),
  },
  {
    heading: "5. Data Sharing",
    body: (
      <>
        We do not sell your personal information or your child&apos;s personal
        information. We may share limited information with trusted service
        providers who help us operate the app, such as hosting and analytics
        providers, and only to the extent necessary to provide our services.
        These providers are contractually required to protect your data.
      </>
    ),
  },
  {
    heading: "6. Data Security",
    body: (
      <>
        We use industry-standard technical and organizational measures,
        including encryption in transit and restricted access controls, to
        protect the information we collect against unauthorized access,
        alteration, or disclosure.
      </>
    ),
  },
  {
    heading: "7. Data Retention",
    body: (
      <>
        We retain account and learning progress information for as long as your
        account remains active or as needed to provide our services. You may
        request deletion of your account and associated data at any time by
        contacting us.
      </>
    ),
  },
  {
    heading: "8. Your Rights",
    body: (
      <>
        Depending on your location, you may have the right to access, correct,
        export, or delete your personal information, and your child&apos;s
        personal information, held by ScreenToSkill. To exercise these rights,
        please contact us using the details below.
      </>
    ),
  },
  {
    heading: "9. Changes to This Policy",
    body: (
      <>
        We may update this Privacy Policy from time to time. We will notify
        parents of material changes by posting the updated policy on this page
        and updating the &quot;Last updated&quot; date below.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <Section
        id="privacy-policy"
        tone="subtle"
        bordered
        className="bg-[#FBFDFF]/80 dark:bg-slate-950/40"
      >
        <Container>
          {/* Header card, mirrors the "Why ScreenToSkill" hero card styling */}
          <div className="bg-[#EBF8F4] dark:bg-emerald-950/40 border border-[#d2efe4] dark:border-emerald-900/60 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#EBE9FE] dark:bg-violet-500/15 flex items-center justify-center text-[#553CFA] dark:text-violet-300 shrink-0 shadow-xs">
                <ShieldCheck className="w-5.5 h-5.5 stroke-[2]" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-display font-bold text-[#0D1B15] dark:text-emerald-50 tracking-tight leading-[1.15]">
                Privacy <HighlightUnderline>Policy</HighlightUnderline>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#1F5441]/85 dark:text-emerald-200/80 leading-relaxed font-normal max-w-2xl">
              At ScreenToSkill, protecting your family&apos;s privacy and your
              child&apos;s safety is at the heart of everything we build. This
              policy explains what information we collect, how we use it, and
              the choices parents have.
            </p>
            <p className="text-xs text-[#1F5441]/60 dark:text-emerald-200/60 mt-4 font-medium">
              Last updated: June 23, 2026
            </p>
          </div>

          {/* Policy content */}
          <div className="max-w-3xl mx-auto space-y-10 text-left">
            {SECTIONS.map((section) => (
              <div key={section.heading} className="space-y-2">
                <h2 className="font-display font-bold text-[#0D0F12] dark:text-slate-50 text-lg sm:text-xl leading-tight">
                  {section.heading}
                </h2>
                <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}

            {/* Contact card */}
            <div className="flex items-start space-x-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] dark:bg-sky-500/15 flex items-center justify-center text-[#0284C7] dark:text-sky-300 shrink-0 shadow-xs">
                <Mail className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-1 pt-0.5">
                <h3 className="font-display font-bold text-[#0D0F12] dark:text-slate-50 text-lg leading-tight">
                  Contact Us
                </h3>
                <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
                  If you have questions about this Privacy Policy or wish to
                  exercise your data rights, please reach out to us at{" "}
                  <a
                    href="mailto:screentoskill@appinlay.com"
                    className="text-[#0284C7] dark:text-sky-300 font-medium hover:underline"
                  >
                    screentoskill@appinlay.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Footer />
    </>
    // me
  );
}
