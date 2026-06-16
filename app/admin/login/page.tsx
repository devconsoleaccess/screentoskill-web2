"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { LogoMark } from "@/components/icons/Logo";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // If already signed in, skip straight to the dashboard.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin");
      else setChecking(false);
    });
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      setError(
        /invalid login/i.test(error.message)
          ? "Incorrect email or password."
          : error.message
      );
      return;
    }

    router.replace("/admin");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-6 h-6 text-[var(--color-brand)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-10">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 w-[460px] h-[460px] rounded-full opacity-[0.10] dark:opacity-[0.16]"
        style={{ background: "var(--color-brand)", filter: "blur(100px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full opacity-[0.07] dark:opacity-[0.12]"
        style={{ background: "var(--color-brand)", filter: "blur(90px)" }}
      />

      {/* Dot-grid texture */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06] text-slate-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="login-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#login-dots)" />
      </svg>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[400px]">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="mb-5">
            <LogoMark />
          </Link>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-brand)] bg-[var(--color-brand)]/8 border border-[var(--color-brand)]/20 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Access
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-sm shadow-xl shadow-slate-900/[0.04] p-7">
          <div className="text-center mb-6">
            <h1 className="text-[22px] font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
              Sign in to the ScreenToSkill admin panel.
            </p>
          </div>

          <form onSubmit={submit} noValidate className="space-y-3.5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Email
              </label>
              <div className="flex items-center gap-3 border rounded-xl px-3.5 py-3 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus-within:border-[var(--color-brand)] focus-within:ring-2 focus-within:ring-[var(--color-brand)]/20 transition-all">
                <Mail className="w-[16px] h-[16px] text-slate-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="flex-1 bg-transparent text-[14px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none min-w-0"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <div className="flex items-center gap-3 border rounded-xl px-3.5 py-3 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus-within:border-[var(--color-brand)] focus-within:ring-2 focus-within:ring-[var(--color-brand)]/20 transition-all">
                <Lock className="w-[16px] h-[16px] text-slate-400 shrink-0" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-[14px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none min-w-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="flex items-center gap-2 text-[12.5px] text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-3.5 py-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] text-white font-semibold text-[14px] hover:opacity-90 active:opacity-80 disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-md shadow-[var(--color-brand)]/25"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[12px] text-slate-400 mt-5">
          <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
