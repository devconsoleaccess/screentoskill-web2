"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Send, Loader2, AlertCircle, CheckCircle2, Users, User as UserIcon,
  Search, X, Megaphone, Tag, Gift, Settings as SettingsIcon, Bell,
} from "lucide-react";
import { adminFetch } from "@/lib/adminFetch";

type Audience = "all" | "single";
type NotifType = "announcement" | "promo" | "reward" | "system";

interface ProfileHit {
  id: string;
  name: string | null;
  email: string | null;
}

interface SendSummary {
  audience: Audience;
  targetedUsers: number;
  inAppCreated: number;
  tokensFound: number;
  pushSent: number;
  pushFailed: number;
  prunedTokens: number;
  pushError: string | null;
}

const TYPE_OPTIONS: { value: NotifType; label: string; icon: React.ElementType }[] = [
  { value: "announcement", label: "Announcement", icon: Megaphone },
  { value: "promo", label: "Promo", icon: Tag },
  { value: "reward", label: "Reward", icon: Gift },
  { value: "system", label: "System", icon: SettingsIcon },
];

export default function SendNotificationPage() {
  const [audience, setAudience] = useState<Audience>("all");
  const [type, setType] = useState<NotifType>("announcement");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // single-user search
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<ProfileHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<ProfileHit | null>(null);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SendSummary | null>(null);

  // ── Debounced profile search ──
  const firstRender = useRef(true);
  useEffect(() => {
    if (audience !== "single") return;
    if (firstRender.current) { firstRender.current = false; }
    if (selected && query === labelFor(selected)) return; // don't re-search a picked user
    if (query.trim().length < 2) { setHits([]); return; }

    const t = setTimeout(async () => {
      setSearching(true);
      try {
        const { data } = await adminFetch<{ data: ProfileHit[] }>(`/api/admin/profiles/search?q=${encodeURIComponent(query.trim())}`);
        setHits(data);
      } catch {
        setHits([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query, audience, selected]);

  const pickUser = (u: ProfileHit) => {
    setSelected(u);
    setQuery(labelFor(u));
    setHits([]);
  };

  const clearUser = () => {
    setSelected(null);
    setQuery("");
    setHits([]);
  };

  const canSend = title.trim() && body.trim() && (audience === "all" || selected);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSummary(null);
    if (!title.trim()) return setError("Title is required.");
    if (!body.trim()) return setError("Body is required.");
    if (audience === "single" && !selected) return setError("Select a user to notify.");

    setSending(true);
    try {
      const payload: Record<string, unknown> = { audience, type, title: title.trim(), body: body.trim() };
      if (audience === "single") payload.user_id = selected!.id;
      const result = await adminFetch<SendSummary>("/api/admin/notifications/send", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setSummary(result);
      // reset message fields, keep audience/type for convenience
      setTitle("");
      setBody("");
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Could not send notification.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5 text-[var(--color-brand)]" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Send Notification</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Post to the in-app inbox and push to devices via FCM.</p>
        </div>
      </div>

      <form onSubmit={handleSend} className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-7 space-y-5">
        {/* Audience */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Audience</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { setAudience("all"); clearUser(); }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[13px] font-semibold transition-colors ${
                audience === "all" ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Users className="w-4 h-4" /> All users
            </button>
            <button
              type="button"
              onClick={() => setAudience("single")}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[13px] font-semibold transition-colors ${
                audience === "single" ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <UserIcon className="w-4 h-4" /> Single user
            </button>
          </div>
        </div>

        {/* Single-user search */}
        {audience === "single" && (
          <div className="relative">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Find user</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); if (selected) setSelected(null); }}
                placeholder="Search by email or name…"
                className="w-full pl-9 pr-9 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
              />
              {searching ? (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 animate-spin" />
              ) : selected ? (
                <button type="button" onClick={clearUser} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600" aria-label="Clear">
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>

            {/* Results dropdown */}
            {!selected && hits.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto">
                {hits.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => pickUser(u)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] shrink-0">
                      <UserIcon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-slate-800 dark:text-slate-100 truncate">{u.name || "Unnamed"}</p>
                      <p className="text-[11px] text-slate-400 truncate">{u.email || u.id}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selected && (
              <p className="mt-1.5 text-[12px] text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Notifying <strong>{selected.name || selected.email || selected.id}</strong>
              </p>
            )}
          </div>
        )}

        {/* Type */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border text-[12px] font-semibold transition-colors ${
                  type === value ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder="Notification title" className={inputCls} />
        </div>

        {/* Body */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} maxLength={500} placeholder="Notification message…" className={inputCls} />
        </div>

        {error && (
          <p className="flex items-center gap-2 text-[12.5px] text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-3.5 py-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </p>
        )}

        {summary && (
          <div className="rounded-xl border border-green-200 dark:border-green-800/60 bg-green-50 dark:bg-green-900/20 px-4 py-3.5 space-y-1.5">
            <p className="flex items-center gap-2 text-[13px] font-semibold text-green-700 dark:text-green-300">
              <CheckCircle2 className="w-4 h-4" /> Notification sent
            </p>
            <ul className="text-[12.5px] text-green-700/90 dark:text-green-300/90 space-y-0.5 pl-6 list-disc">
              <li>{summary.inAppCreated} in-app message{summary.inAppCreated !== 1 ? "s" : ""} created ({summary.targetedUsers} user{summary.targetedUsers !== 1 ? "s" : ""})</li>
              <li>{summary.pushSent} of {summary.tokensFound} device token{summary.tokensFound !== 1 ? "s" : ""} pushed{summary.pushFailed ? ` · ${summary.pushFailed} failed` : ""}</li>
              {summary.prunedTokens > 0 && <li>{summary.prunedTokens} stale token{summary.prunedTokens !== 1 ? "s" : ""} pruned</li>}
            </ul>
            {summary.pushError && (
              <p className="text-[12px] text-amber-700 dark:text-amber-300 flex items-start gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                In-app delivered, but push failed: {summary.pushError}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end border-t border-slate-100 dark:border-slate-800 -mx-6 sm:-mx-7 px-6 sm:px-7 pt-5">
          <button
            type="submit"
            disabled={sending || !canSend}
            className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send notification</>}
          </button>
        </div>
      </form>
    </div>
  );
}

function labelFor(u: ProfileHit) {
  return u.email || u.name || u.id;
}

const inputCls =
  "w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30 transition-colors";
