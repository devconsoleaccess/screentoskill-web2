"use client";

import React, { useEffect, useState } from "react";
import {
  Coins, Save, Loader2, AlertCircle, CheckCircle2, Power, Calculator,
} from "lucide-react";
import { adminFetch } from "@/lib/adminFetch";
import { Toggle } from "@/components/admin/Toggle";
import type { RewardSettings } from "@/lib/rewardsTypes";

type FormState = {
  xp_per_unit: string;
  currency_per_unit: string;
  currency_symbol: string;
  min_redeem_xp: string;
  is_redemption_enabled: boolean;
};

const EMPTY: FormState = {
  xp_per_unit: "",
  currency_per_unit: "",
  currency_symbol: "₹",
  min_redeem_xp: "",
  is_redemption_enabled: true,
};

function toForm(s: RewardSettings): FormState {
  return {
    xp_per_unit: String(s.xp_per_unit ?? ""),
    currency_per_unit: String(s.currency_per_unit ?? ""),
    currency_symbol: s.currency_symbol ?? "₹",
    min_redeem_xp: String(s.min_redeem_xp ?? ""),
    is_redemption_enabled: s.is_redemption_enabled ?? true,
  };
}

export default function RewardSettingsPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await adminFetch<{ data: RewardSettings | null }>("/api/admin/reward-settings");
        if (!active) return;
        if (data) setForm(toForm(data));
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Failed to load settings.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  // ── Live preview numbers ──
  const xpUnit = Number(form.xp_per_unit) || 0;
  const moneyUnit = Number(form.currency_per_unit) || 0;
  const symbol = form.currency_symbol || "₹";
  const perXp = xpUnit > 0 ? moneyUnit / xpUnit : 0;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);

    if (!(Number(form.xp_per_unit) > 0)) return setError("XP per unit must be a positive integer.");
    if (!(Number(form.currency_per_unit) >= 0)) return setError("Currency per unit must be 0 or more.");
    if (!form.currency_symbol.trim()) return setError("Currency symbol is required.");
    if (!(Number(form.min_redeem_xp) >= 0)) return setError("Minimum redeem XP must be 0 or more.");

    setSaving(true);
    try {
      await adminFetch("/api/admin/reward-settings", {
        method: "PATCH",
        body: JSON.stringify({
          xp_per_unit: Number(form.xp_per_unit),
          currency_per_unit: Number(form.currency_per_unit),
          currency_symbol: form.currency_symbol.trim(),
          min_redeem_xp: Number(form.min_redeem_xp),
          is_redemption_enabled: form.is_redemption_enabled,
        }),
      });
      setSaved(true);
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
          <Coins className="w-5 h-5 text-[var(--color-brand)]" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Reward Settings
          </h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Conversion rate and redemption rules for the rewards system.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 flex items-center justify-center gap-2 text-slate-400 text-[13px]">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading settings…
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-7 space-y-5"
        >
          {/* Master toggle */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <Power className={`w-4 h-4 ${form.is_redemption_enabled ? "text-green-500" : "text-slate-400"}`} />
              <div>
                <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100">Redemptions enabled</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Master on/off switch for all reward redemptions.</p>
              </div>
            </div>
            <Toggle
              checked={form.is_redemption_enabled}
              onChange={(v) => set("is_redemption_enabled", v)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="XP per unit" hint="How many XP equal one money unit.">
              <input
                type="number" min={1} step={1}
                value={form.xp_per_unit}
                onChange={(e) => set("xp_per_unit", e.target.value)}
                placeholder="e.g. 100"
                className={inputCls}
              />
            </Field>
            <Field label="Currency per unit" hint={`Money value of ${xpUnit || "N"} XP.`}>
              <input
                type="number" min={0} step="0.01"
                value={form.currency_per_unit}
                onChange={(e) => set("currency_per_unit", e.target.value)}
                placeholder="e.g. 10"
                className={inputCls}
              />
            </Field>
            <Field label="Currency symbol">
              <input
                type="text" maxLength={4}
                value={form.currency_symbol}
                onChange={(e) => set("currency_symbol", e.target.value)}
                placeholder="₹"
                className={inputCls}
              />
            </Field>
            <Field label="Minimum redeem XP" hint="Balance required before redeeming.">
              <input
                type="number" min={0} step={1}
                value={form.min_redeem_xp}
                onChange={(e) => set("min_redeem_xp", e.target.value)}
                placeholder="e.g. 500"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Live preview */}
          <div className="rounded-xl border border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 px-4 py-3.5">
            <div className="flex items-center gap-1.5 mb-2">
              <Calculator className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-brand)]">Live preview</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <p className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">
                {xpUnit || "—"} XP = {symbol}{moneyUnit.toFixed(2)}
              </p>
              <p className="text-[13px] text-slate-500 dark:text-slate-400">
                1 XP = {symbol}{perXp.toFixed(perXp > 0 && perXp < 0.01 ? 4 : 2)}
              </p>
            </div>
          </div>

          {error && (
            <p className="flex items-center gap-2 text-[12.5px] text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-3.5 py-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}
          {saved && (
            <p className="flex items-center gap-2 text-[12.5px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/60 rounded-xl px-3.5 py-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Settings saved.
            </p>
          )}

          <div className="flex justify-end border-t border-slate-100 dark:border-slate-800 -mx-6 sm:-mx-7 px-6 sm:px-7 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save settings</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ── Tiny helpers ──
const inputCls =
  "w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30 transition-colors";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}
