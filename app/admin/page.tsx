"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, TrendingUp, CalendarDays, ArrowUpRight, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";

type User = {
  userId: number;
  name: string;
  number: string;
  address: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });
      setUsers((data as User[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const today = users.filter(
    (u) => new Date(u.created_at).toDateString() === new Date().toDateString()
  ).length;

  const thisWeek = users.filter((u) => {
    const diff = (Date.now() - new Date(u.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const stats = [
    {
      label: "Total Registrations",
      value: loading ? "—" : users.length,
      icon: Users,
      sub: "All time",
      accent: true,
    },
    {
      label: "Joined Today",
      value: loading ? "—" : today,
      icon: TrendingUp,
      sub: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    },
    {
      label: "This Week",
      value: loading ? "—" : thisWeek,
      icon: CalendarDays,
      sub: "Last 7 days",
    },
  ];

  const recent = users.slice(0, 5);

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          Dashboard
        </h1>
        <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
          Overview of ScreenToSkill early-access registrations.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, sub, accent }) => (
          <div
            key={label}
            className={`relative rounded-2xl p-5 border overflow-hidden ${
              accent
                ? "bg-[var(--color-brand)] border-transparent text-white"
                : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800"
            }`}
          >
            {accent && (
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
            )}
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-widest mb-1.5 ${accent ? "text-white/70" : "text-slate-400"}`}>
                  {label}
                </p>
                <p className={`text-3xl font-display font-bold tracking-tight ${accent ? "text-white" : "text-slate-900 dark:text-slate-50"}`}>
                  {value}
                </p>
                <p className={`text-[11px] mt-1 ${accent ? "text-white/60" : "text-slate-400"}`}>{sub}</p>
              </div>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accent ? "bg-white/20" : "bg-[var(--color-brand)]/10"}`}>
                <Icon className={`w-[18px] h-[18px] ${accent ? "text-white" : "text-[var(--color-brand)]"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent registrations */}
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">Recent Registrations</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Last 5 sign-ups</p>
          </div>
          <Link
            href="/admin/users"
            className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-brand)] hover:underline"
          >
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="divide-y divide-slate-50 dark:divide-slate-800/60">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-32" />
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-48" />
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-16" />
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="w-8 h-8 text-slate-200 dark:text-slate-700 mb-2" />
            <p className="text-sm text-slate-400">No registrations yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-800/60">
            {recent.map((u) => (
              <div
                key={u.userId}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] font-bold text-[12px] shrink-0">
                  {u.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 truncate">{u.name}</p>
                  <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 shrink-0" /> {u.number}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-mono font-semibold text-[var(--color-brand)] bg-[var(--color-brand)]/8 border border-[var(--color-brand)]/15 px-2 py-0.5 rounded-md">
                    #{u.userId}
                  </p>
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    {new Date(u.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}