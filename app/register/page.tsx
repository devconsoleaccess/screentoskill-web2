"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { User, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { LogoMark, LogoWordmark } from "@/components/icons/Logo";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";
import { supabase } from "@/lib/supabase";

type Form = { name: string; number: string; address: string };
type Touched = Record<keyof Form, boolean>;

function validate(f: Form): Partial<Form> {
  const e: Partial<Form> = {};
  if (!f.name.trim()) e.name = "Name is required.";
  else if (f.name.trim().length < 2) e.name = "At least 2 characters.";
  if (!f.number.trim()) e.number = "Phone number is required.";
  else if (!/^\+?[\d\s\-()]{7,15}$/.test(f.number.trim()))
    e.number = "Enter a valid phone number.";
  if (!f.address.trim()) e.address = "Address is required.";
  else if (f.address.trim().length < 8) e.address = "Enter a full address.";
  return e;
}

export default function RegisterPage() {
  const [form, setForm] = useState<Form>({ name: "", number: "", address: "" });
  const [touched, setTouched] = useState<Touched>({
    name: false,
    number: false,
    address: false,
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0 ;

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const blur = (k: keyof Touched) => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, number: true, address: true });
    if (!isValid) return;

    setLoading(true);
    setServerError(null);

    const { error } = await supabase.from("users").insert([
      {
        name: form.name.trim(),
        number: form.number.trim(),
        address: form.address.trim(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Supabase error:", error.message);
      setServerError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", number: "", address: "" });
    setTouched({ name: false, number: false, address: false });
    setAgreed(false);
    setServerError(null);
  };

  return (
    /*
     * Outer wrapper:
     * – On desktop (lg+): side-by-side, full viewport height, no overflow
     * – On mobile: single column, min-h-screen so it grows with content
     */
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
      {/* ══════════════════════════════════════════════
          LEFT — image panel (hidden on mobile)
      ══════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col h-screen sticky top-0 p-3 bg-white dark:bg-slate-950">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/ScreenToSkill.png"
            alt="ScreenToSkill"
            fill
            priority
            className="object-cover"
            sizes="55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 via-slate-900/45 to-slate-900/20" />

          {/* Logo */}
          <Link
            href="/"
            className="absolute top-8 left-8 z-20 flex items-center gap-2.5 group"
            aria-label="Go to home"
          >
            <LogoMark />
            <span
              className={`font-display font-black tracking-tight text-white dark:text-slate-50 leading-none text-lg`}
            >
              Screen<span className="text-[var(--color-brand)]">ToSkill</span>
            </span>
          </Link>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-10 pb-10 space-y-4">
          

            <h2 className="text-white font-display font-bold text-[28px] leading-snug tracking-tight">
              Turn screen time into
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">skill-building</span>
                <svg
                  aria-hidden
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 10"
                  fill="none"
                >
                  <path
                    d="M2 7 C50 2, 150 2, 198 7"
                    stroke="var(--color-brand)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </span>{" "}
              moments
            </h2>

            <p className="text-white/60 text-[13px] leading-relaxed max-w-sm">
              Every app unlock is a learning opportunity — math, English,
              science and more, perfectly tuned to your child's age.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {["Age-tuned MCQs", "XP & Streaks", "100% Private"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="text-[11px] font-medium text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {chip}
                  </span>
                ),
              )}
            </div>

          
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          RIGHT — form panel (full page on mobile)
      ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col relative bg-white dark:bg-slate-950 overflow-hidden">
        {/* Background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-[0.07] dark:opacity-[0.12]"
          style={{ background: "var(--color-brand)", filter: "blur(90px)" }}
        />
        {/* <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-[0.05] dark:opacity-[0.10]"
          style={{ background: "var(--color-brand)", filter: "blur(70px)" }}
        /> */}

        {/* Dot-grid pattern */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="1.5"
                cy="1.5"
                r="1.5"
                fill="currentColor"
                className="text-slate-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Top accent line */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[3px] opacity-60"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--color-brand), transparent)",
          }}
        />

        {/* Mobile logo bar */}
        <div className="relative z-10 lg:hidden flex items-center justify-between px-6 pt-4 pb-1 shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <LogoWordmark />
          </Link>
          <Link
            href="/login"
            className="text-xs font-semibold text-[var(--color-brand)] border border-[var(--color-brand)]/30 rounded-full px-4 py-1.5 hover:bg-[var(--color-brand)]/5 transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Form — centred vertically on desktop, top-aligned with padding on mobile */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-12 xl:px-14 py-2 overflow-hidden">
          <div className="w-full max-w-[380px]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-5 py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[var(--color-brand)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-50">
                      You're on the list!
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
                      We'll reach out when ScreenToSkill launches. Keep an eye
                      on your phone.
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="text-sm font-semibold text-[var(--color-brand)] hover:underline"
                  >
                    Register another →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* Heading */}
                  <div className="space-y-1">
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[var(--color-brand)] bg-[var(--color-brand)]/8 border border-[var(--color-brand)]/20 px-3 py-1 rounded-full">
                      Early Access
                    </span>
                    <h1 className="text-[26px] sm:text-3xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
                      Register to{" "}
                      <HighlightUnderline>ScreenToSkill</HighlightUnderline>
                    </h1>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Be the first to know when we launch. No spam, ever.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={submit} noValidate className="space-y-3">
                    <BoxField
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={change}
                      onBlur={() => blur("name")}
                      error={touched.name ? errors.name : undefined}
                      icon={<User className="w-[15px] h-[15px]" />}
                    />
                    <BoxField
                      id="number"
                      name="number"
                      type="tel"
                      placeholder="Phone number"
                      value={form.number}
                      onChange={change}
                      onBlur={() => blur("number")}
                      error={touched.number ? errors.number : undefined}
                      icon={<Phone className="w-[15px] h-[15px]" />}
                    />
                    <BoxTextarea
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={form.address}
                      onChange={change}
                      onBlur={() => blur("address")}
                      error={touched.address ? errors.address : undefined}
                      icon={<MapPin className="w-[15px] h-[15px]" />}
                    />

                    {/* Server error */}
                    {serverError && (
                      <p className="text-[12px] text-red-500 font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2.5">
                        {serverError}
                      </p>
                    )}

                    {/* Agreement */}
                    {/* <label className="flex items-start gap-2.5 cursor-pointer group pt-0.5">
                      <div
                        role="checkbox"
                        aria-checked={agreed}
                        tabIndex={0}
                        onClick={() => setAgreed((v) => !v)}
                        onKeyDown={(e) => e.key === " " && setAgreed((v) => !v)}
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                          agreed
                            ? "bg-[var(--color-brand)] border-[var(--color-brand)]"
                            : "border-slate-300 dark:border-slate-600 group-hover:border-[var(--color-brand)]"
                        }`}
                      >
                        {agreed && (
                          <svg
                            viewBox="0 0 12 10"
                            fill="none"
                            className="w-2.5 h-2.5"
                          >
                            <path
                              d="M1 5l3.5 3.5L11 1"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-[12.5px] text-slate-500 dark:text-slate-400 leading-relaxed select-none">
                        I agree with the{" "}
                        <Link
                          href="/terms"
                          className="text-[var(--color-brand)] font-medium hover:underline"
                        >
                          Terms of service
                        </Link>{" "}
                        &amp;{" "}
                        <Link
                          href="/privacy"
                          className="text-[var(--color-brand)] font-medium hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label> */}

                    {/* CTA */}
                    <button
                      type="submit"
                      disabled={loading }
                      className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] text-white font-semibold text-[13.5px] hover:opacity-90 active:opacity-80 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-[var(--color-brand)]/25"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          Registering…
                        </>
                      ) : (
                        "Register for Early Access"
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Box input ─────────────────────────────────────── */
type BoxFieldProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  icon: React.ReactNode;
};

function BoxField({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon,
}: BoxFieldProps) {
  return (
    <div className="space-y-1">
      <div
        className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-900 transition-colors ${
          error
            ? "border-red-400 dark:border-red-500"
            : "border-slate-200 dark:border-slate-800 focus-within:border-[var(--color-brand)] focus-within:bg-white dark:focus-within:bg-slate-950"
        }`}
      >
        <span className="text-slate-400 shrink-0">{icon}</span>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={name}
          className="flex-1 bg-transparent text-[13.5px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none min-w-0"
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-500 font-medium pl-1">{error}</p>
      )}
    </div>
  );
}

/* ─── Box textarea ──────────────────────────────────── */
type BoxTextareaProps = {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  error?: string;
  icon: React.ReactNode;
};

function BoxTextarea({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon,
}: BoxTextareaProps) {
  return (
    <div className="space-y-1">
      <div
        className={`flex items-start gap-3 border rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-900 transition-colors ${
          error
            ? "border-red-400 dark:border-red-500"
            : "border-slate-200 dark:border-slate-800 focus-within:border-[var(--color-brand)] focus-within:bg-white dark:focus-within:bg-slate-950"
        }`}
      >
        <span className="text-slate-400 shrink-0 mt-0.5">{icon}</span>
        <textarea
          id={id}
          name={name}
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="flex-1 bg-transparent text-[13.5px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none resize-none min-w-0"
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-500 font-medium pl-1">{error}</p>
      )}
    </div>
  );
}
