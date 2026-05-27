"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";

const FAQ_ITEMS = [
  {
    q: "How does ScreenToSkill lock the apps my child uses?",
    a: "After you grant Accessibility, Display-Over-Other-Apps and Usage Access permissions, you pick the apps you want to regulate — for example YouTube, Instagram or any game. When your child opens one of those apps, a ScreenToSkill overlay appears and they must answer a short MCQ before the app becomes usable.",
  },
  {
    q: "What happens if my child picks the wrong answer?",
    a: "The locked app stays closed. The overlay shows the correct option as a gentle hint and serves another question of the same type so your child can try again — turning every mistake into a quick learning moment instead of frustration.",
  },
  {
    q: "What kind of questions does the app ask?",
    a: "Everything is multiple-choice, tuned to your child's age band. 2–3 year olds get animal-sound recognition. 4–5 year olds pick shapes, colours and animals from visual MCQs. 6–8 year olds get math, English and basic science. 9–12 year olds get math, English, science and history. 13+ teens get harder math, English, science and history at exam-prep difficulty.",
  },
  {
    q: "Can I choose which subjects appear in the quizzes?",
    a: "Yes. From the Question Settings screen you pick the subject mix for the active age group — for example only Math, only English, only Science, only History, or a Random Mix across the subjects available for that age. You can change this anytime; the next overlay uses the new mix.",
  },
  {
    q: "How much screen time does my child earn for each quiz?",
    a: "Each correctly-answered set unlocks the selected app for the focus window you have configured. Your child also earns XP and keeps a daily streak — but the app stays open only for the time you allow, so screen time never piles up unchecked.",
  },
  {
    q: "Does ScreenToSkill collect my child's data or track location?",
    a: "No. ScreenToSkill never reads messages, browsing history or location, and there is no cloud account. All XP, streaks and learning progress are stored locally on the device and are visible only to you in the parent dashboard.",
  },
] as const;

export default function FAQs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <Section id="faqs" tone="muted" bordered className="bg-slate-50/40 dark:bg-slate-950/40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 relative flex justify-center max-w-sm mx-auto lg:max-w-none w-full">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[482/650] rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] group">
              <div className="absolute inset-0 bg-[var(--color-brand)]/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
              <Image
                src="/Mobile-App-FAQ.webp"
                alt="Frequently Asked Questions ScreenToSkill"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-2 bg-[var(--surface)] border border-[var(--border)] p-3.5 rounded-xl shadow-xs max-w-[160px] hidden sm:block">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-brand)] font-bold block">
                PARENT TIP
              </span>
              <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium block mt-1">
                Start with simple math quizzes for instant child confidence!
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="text-left space-y-2.5">
              <Badge variant="brand">Questions &amp; Answers</Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                Frequently asked <HighlightUnderline>questions</HighlightUnderline>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-normal max-w-xl">
                Curious about childhood screen regulation, MCQs, or device
                remote setup? Find answers here.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xs transition-all hover:shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      suppressHydrationWarning
                      className="w-full text-left px-4.5 py-3.5 flex justify-between items-center font-medium text-slate-800 dark:text-slate-100 hover:text-[var(--color-brand)] transition-colors"
                    >
                      <span className="text-xs sm:text-sm md:text-base font-medium">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4.5 pb-4.5 pt-1 text-xs sm:text-[13px] font-normal text-slate-500 dark:text-slate-400 border-t border-[var(--border)] leading-relaxed text-left">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
