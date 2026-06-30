"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Target, Plus, Pencil, Trash2, Loader2, AlertCircle, X, Save, Flag, Info,
} from "lucide-react";
import { adminFetch } from "@/lib/adminFetch";
import { Toggle } from "@/components/admin/Toggle";
import { Pagination } from "@/components/admin/Pagination";

const PAGE_SIZE = 10;

type Category = "learning" | "focus" | "other";
type Frequency = "one_time" | "daily";

interface Challenge {
  id: string;
  icon: string | null;
  title: string;
  description: string | null;
  goal: number;
  points: number;
  category: Category;
  frequency: Frequency;
  is_active: boolean;
}

const CATEGORIES: Category[] = ["learning", "focus", "other"];

const CATEGORY_BADGE: Record<Category, string> = {
  learning: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  focus:    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
  other:    "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

const FREQ_FILTERS: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "daily", label: "Daily" },
  { value: "one_time", label: "One-time" },
];

type FormState = {
  icon: string;
  title: string;
  description: string;
  goal: string;
  points: string;
  category: Category;
  frequency: Frequency;
  is_active: boolean;
};

const EMPTY_FORM: FormState = {
  icon: "", title: "", description: "", goal: "1", points: "10",
  category: "learning", frequency: "daily", is_active: true,
};

function toForm(c: Challenge): FormState {
  return {
    icon: c.icon ?? "",
    title: c.title ?? "",
    description: c.description ?? "",
    goal: String(c.goal ?? ""),
    points: String(c.points ?? ""),
    category: c.category ?? "learning",
    frequency: c.frequency ?? "daily",
    is_active: c.is_active ?? true,
  };
}

export default function ChallengesPage() {
  const [items, setItems] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [freqFilter, setFreqFilter] = useState("");

  const [editing, setEditing] = useState<Challenge | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Challenge | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
      if (freqFilter) params.set("frequency", freqFilter);
      const { data, count } = await adminFetch<{ data: Challenge[]; count: number }>(`/api/admin/challenges?${params.toString()}`);
      if (data.length === 0 && count > 0 && page > 1) { setPage((p) => p - 1); return; }
      setItems(data);
      setTotal(count);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load challenges.");
    } finally {
      setLoading(false);
    }
  }, [freqFilter, page]);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (c: Challenge) => {
    setTogglingId(c.id);
    setItems((prev) => prev.map((i) => (i.id === c.id ? { ...i, is_active: !i.is_active } : i)));
    try {
      await adminFetch(`/api/admin/challenges/${c.id}`, { method: "PATCH", body: JSON.stringify({ is_active: !c.is_active }) });
    } catch {
      setItems((prev) => prev.map((i) => (i.id === c.id ? { ...i, is_active: c.is_active } : i)));
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminFetch(`/api/admin/challenges/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      await load(); // refresh current page + total
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete challenge.");
    } finally {
      setDeleting(false);
    }
  };

  const showForm = creating || !!editing;

  // Reset to the first page whenever the frequency filter changes.
  useEffect(() => { setPage(1); }, [freqFilter]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-[var(--color-brand)]" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Daily Challenges</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              {loading ? "Loading…" : `${total} challenge${total !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null); }}
          className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add challenge
        </button>
      </div>

      {/* Info note about sync RPC */}
      <div className="flex items-start gap-2.5 text-[12.5px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-[var(--color-brand)]" />
        <span>
          Active <strong>daily</strong> challenges are auto-assigned to every user (and progress reset) by the
          app&rsquo;s <code className="text-[11px] bg-slate-200/60 dark:bg-slate-800 px-1 py-0.5 rounded">sync_daily_challenges</code> RPC.
          Just define the challenge here — no per-user work needed.
        </span>
      </div>

      {/* Frequency filter */}
      <div className="flex items-center gap-1.5">
        {FREQ_FILTERS.map((f) => (
          <button
            key={f.value || "all"}
            onClick={() => setFreqFilter(f.value)}
            className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg border transition-colors ${
              freqFilter === f.value
                ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-start gap-2.5 text-[12.5px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> <span className="break-all">{error}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center gap-2 text-slate-400 text-[13px]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading challenges…
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <Flag className="w-8 h-8 text-slate-200 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-slate-400 text-[13px]">No challenges yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-500 dark:text-slate-400">Challenge</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-28">Category</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-24">Frequency</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-16">Goal</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-20">Points</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-20">Active</th>
                  <th className="py-3 px-4 text-right font-semibold text-slate-500 dark:text-slate-400 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {items.map((c) => (
                  <tr key={c.id} className={`hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors ${!c.is_active ? "opacity-60" : ""}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] shrink-0">
                          <Target className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 dark:text-slate-100 truncate max-w-[260px]">
                            {c.title}
                            {c.icon && <span className="ml-1.5 text-[11px] text-slate-400 font-mono">({c.icon})</span>}
                          </p>
                          {c.description && <p className="text-[11px] text-slate-400 truncate max-w-[260px]">{c.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${CATEGORY_BADGE[c.category]}`}>{c.category}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                        {c.frequency === "daily" ? "Daily" : "One-time"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{c.goal}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium">+{c.points}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Toggle size="sm" checked={c.is_active} disabled={togglingId === c.id} onChange={() => toggleActive(c)} />
                        {togglingId === c.id && <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setEditing(c); setCreating(false); }} className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--color-brand)] hover:bg-[var(--color-brand)]/10 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} disabled={loading} />
      </div>

      {showForm && (
        <ChallengeFormModal
          initial={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => {
            setEditing(null);
            setCreating(false);
            load(); // refresh current page + total
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl w-full max-w-sm p-6">
            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-2">Delete challenge?</h3>
            <p className="text-[13px] text-slate-500 mb-5"><strong className="text-slate-700 dark:text-slate-200">{deleteTarget.title}</strong> will be permanently removed.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors">
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Form modal ──
function ChallengeFormModal({
  initial, onClose, onSaved,
}: {
  initial: Challenge | null;
  onClose: () => void;
  onSaved: (saved: Challenge, isNew: boolean) => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<FormState>(initial ? toForm(initial) : EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!(Number(form.goal) > 0) || !Number.isInteger(Number(form.goal))) e.goal = "Goal must be an integer greater than 0.";
    if (!(Number(form.points) >= 0) || !Number.isInteger(Number(form.points))) e.points = "Points must be a non-negative integer.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    const payload = {
      icon: form.icon.trim() || null,
      title: form.title.trim(),
      description: form.description.trim() || null,
      goal: Number(form.goal),
      points: Number(form.points),
      category: form.category,
      frequency: form.frequency,
      is_active: form.is_active,
    };

    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/challenges/${initial!.id}` : "/api/admin/challenges";
      const { data } = await adminFetch<{ data: Challenge }>(url, {
        method: isEdit ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      onSaved(data, !isEdit);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Could not save challenge.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h3 className="text-[15px] font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {isEdit ? <Pencil className="w-4 h-4 text-[var(--color-brand)]" /> : <Plus className="w-4 h-4 text-[var(--color-brand)]" />}
            {isEdit ? "Edit challenge" : "New challenge"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto">
          <FormField label="Title" error={errors.title}>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Complete 3 lessons" className={fieldCls(!!errors.title)} />
          </FormField>

          <FormField label="Description">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} placeholder="Short description" className={fieldCls(false)} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Icon (Feather name)">
              <input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="e.g. book-open" className={fieldCls(false)} />
            </FormField>
            <FormField label="Category">
              <select value={form.category} onChange={(e) => set("category", e.target.value as Category)} className={fieldCls(false)}>
                {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Goal" error={errors.goal}>
              <input type="number" min={1} step={1} value={form.goal} onChange={(e) => set("goal", e.target.value)} className={fieldCls(!!errors.goal)} />
            </FormField>
            <FormField label="Points" error={errors.points}>
              <input type="number" min={0} step={1} value={form.points} onChange={(e) => set("points", e.target.value)} className={fieldCls(!!errors.points)} />
            </FormField>
            <FormField label="Frequency">
              <select value={form.frequency} onChange={(e) => set("frequency", e.target.value as Frequency)} className={fieldCls(false)}>
                <option value="daily">Daily</option>
                <option value="one_time">One-time</option>
              </select>
            </FormField>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3">
            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-200">Active</span>
            <Toggle checked={form.is_active} onChange={(v) => set("is_active", v)} />
          </div>

          {form.frequency === "daily" && (
            <p className="text-[11px] text-slate-400">Daily challenges are auto-assigned to all users by the sync RPC each day.</p>
          )}

          {serverError && (
            <p className="flex items-center gap-2 text-[12.5px] text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-3.5 py-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" /> {serverError}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 -mx-6 px-6 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 disabled:opacity-60 transition-opacity">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {isEdit ? "Save changes" : "Create challenge"}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Tiny helpers ──
function fieldCls(hasError: boolean) {
  return [
    "w-full px-3 py-2 text-[13px] rounded-lg border transition-colors",
    "bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200",
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30",
    hasError ? "border-red-300 dark:border-red-700" : "border-slate-200 dark:border-slate-700",
  ].join(" ");
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
