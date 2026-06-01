"use client";

import React from "react";
import Link from "next/link";
import { LogoMark, LogoWordmark } from "@/components/icons/Logo";
import { Container } from "@/components/ui/Container";
import { FOOTER_COLUMNS } from "@/lib/constants";
import { Youtube, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const SOCIAL = [
    { label: "YouTube", href: "https://www.youtube.com/channel/UC3AjWqHr19dFpLkkGed0V1A", Icon: Youtube },
    { label: "Instagram", href: "https://www.instagram.com/screentoskillofficial/", Icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590154397942", Icon: Facebook },
  ] as const;

  return (
    <footer
      id="main-footer"
      className="relative bg-[var(--surface)] border-t border-[var(--border)] pt-16 pb-12 text-sm overflow-hidden"
    >
      <div className="absolute bottom-[20%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[var(--color-brand)]/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* Brand column */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 text-left space-y-4">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2.5 mb-3.5 hover:opacity-95 transition-all cursor-pointer"
              >
                <LogoMark size="sm" />
                <LogoWordmark />
              </Link>
              <p className="text-[13px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed max-w-sm">
                Educational Screen Time Solutions at Your Fingertips.
              </p>
            </div>

            <div className="border-t border-dashed border-[var(--border)] w-full max-w-xs pt-1" />

            <div className="flex items-center space-x-2 py-0.5 select-none font-sans">
              <div className="flex text-amber-400 space-x-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-[12px] font-bold text-slate-400 dark:text-slate-500 tracking-wide font-mono">
                4.9{" "}
                <span className="text-slate-300 dark:text-slate-600 font-light mx-1">
                  |
                </span>{" "}
                14 Reviews
              </span>
            </div>

            <div className="border-t border-dashed border-[var(--border)] w-full max-w-xs pb-1" />
          </div>

          {/* Link columns */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4 text-left">
                <span className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono">
                  {col.title}
                </span>
                <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400 font-sans">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`hover:text-[var(--color-brand)] transition-colors block ${
                          link.emphasized
                            ? "font-semibold text-[var(--color-brand)]"
                            : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs font-normal text-slate-400 dark:text-slate-500 text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} ScreenToSkill. All rights
            reserved.
          </div>

          <div className="flex items-center space-x-2.5 select-none">
            {SOCIAL.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="w-9 h-9 rounded-xl border border-[var(--border)] hover:border-[var(--color-brand)] hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[var(--color-brand)] transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}