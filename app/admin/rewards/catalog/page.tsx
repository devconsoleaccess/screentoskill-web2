"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Gift, Plus, Pencil, Trash2, Loader2, AlertCircle, X, Save, Coins, Package,
} from "lucide-react";
import { adminFetch } from "@/lib/adminFetch";
import { Toggle } from "@/components/admin/Toggle";
import { Pagination } from "@/components/admin/Pagination";
import {
  RewardCatalogItem, RewardSettings, RewardType, xpToMoney, formatMoney,
} from "@/lib/rewardsTypes";

const REWARD_TYPES: RewardType[] = ["cash", "voucher", "coupon", "custom"];
const PAGE_SIZE = 10;

const TYPE_BADGE: Record<RewardType, string> = {
  cash:    "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  voucher: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  coupon:  "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
  custom:  "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

type FormState = {
  title: string;
  description: string;
  icon: string;
  image_url: string;
  cost_xp: string;
  reward_type: RewardType;
  reward_value: string;
  stock: string;
  is_active: boolean;
  sort_order: string;
};

const EMPTY_FORM: FormState = {
  title: "", description: "", icon: "", image_url: "",
  cost_xp: "", reward_type: "cash", reward_value: "", stock: "",
  is_active: true, sort_order: "0",
};

function toForm(r: RewardCatalogItem): FormState {
  return {
    title: r.title ?? "",
    description: r.description ?? "",
    icon: r.icon ?? "",
    image_url: r.image_url ?? "",
    cost_xp: String(r.cost_xp ?? ""),
    reward_type: r.reward_type ?? "cash",
    reward_value: String(r.reward_value ?? ""),
    stock: r.stock === null || r.stock === undefined ? "" : String(r.stock),
    is_active: r.is_active ?? true,
    sort_order: String(r.sort_order ?? 0),
  };
}

export default function RewardsCatalogPage() {
  const [items, setItems] = useState<RewardCatalogItem[]>([]);
  const [settings, setSettings] = useState<RewardSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [editing, setEditing] = useState<RewardCatalogItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<RewardCatalogItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
      const [cat, set] = await Promise.all([
        adminFetch<{ data: RewardCatalogItem[]; count: number }>(`/api/admin/rewards-catalog?${params}`),
        adminFetch<{ data: RewardSettings | null }>("/api/admin/reward-settings").catch(() => ({ data: null })),
      ]);
      // If a deletion emptied the last page, step back a page.
      if (cat.data.length === 0 && cat.count > 0 && page > 1) {
        setPage((p) => p - 1);
        return;
      }
      setItems(cat.data);
      setTotal(cat.count);
      setSettings(set.data);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Failed to load catalog.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (item: RewardCatalogItem) => {
    setTogglingId(item.id);
    // optimistic
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_active: !i.is_active } : i)));
    try {
      await adminFetch(`/api/admin/rewards-catalog/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: !item.is_active }),
      });
    } catch {
      // revert on failure
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_active: item.is_active } : i)));
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminFetch(`/api/admin/rewards-catalog/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      await load(); // refresh current page + total
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Could not delete reward.");
    } finally {
      setDeleting(false);
    }
  };

  const showForm = creating || !!editing;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-[var(--color-brand)]" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Rewards Catalog</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              {loading ? "Loading…" : `${total} reward${total !== 1 ? "s" : ""}`}
              {settings && ` · ${settings.xp_per_unit} XP = ${formatMoney(settings.currency_per_unit, settings)}`}
            </p>
          </div>
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null); }}
          className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add reward
        </button>
      </div>

      {loadError && (
        <div className="flex items-start gap-2.5 text-[12.5px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="break-all">{loadError}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center gap-2 text-slate-400 text-[13px]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading rewards…
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-8 h-8 text-slate-200 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-slate-400 text-[13px]">No rewards yet. Add your first one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-500 dark:text-slate-400 w-12">#</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400">Reward</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-24">Type</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-36">Cost</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-24">Value</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-20">Stock</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-20">Active</th>
                  <th className="py-3 px-4 text-right font-semibold text-slate-500 dark:text-slate-400 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {items.map((r) => (
                  <tr key={r.id} className={`hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors ${!r.is_active ? "opacity-60" : ""}`}>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{r.sort_order}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        {r.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image_url} alt="" className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0" />
                        ) : (
                          <span className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] shrink-0">
                            <Gift className="w-4 h-4" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 dark:text-slate-100 truncate max-w-[220px]">{r.title}</p>
                          {r.description && <p className="text-[11px] text-slate-400 truncate max-w-[220px]">{r.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${TYPE_BADGE[r.reward_type]}`}>
                        {r.reward_type}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                        <Coins className="w-3.5 h-3.5 text-amber-500" /> {r.cost_xp}
                      </div>
                      {settings && (
                        <span className="text-[11px] text-slate-400">≈ {formatMoney(xpToMoney(r.cost_xp, settings), settings)}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {settings ? formatMoney(r.reward_value, settings) : r.reward_value}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {r.stock === null ? <span className="text-slate-400">∞</span> : r.stock}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Toggle size="sm" checked={r.is_active} disabled={togglingId === r.id} onChange={() => toggleActive(r)} />
                        {togglingId === r.id && <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setEditing(r); setCreating(false); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--color-brand)] hover:bg-[var(--color-brand)]/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(r)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
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

      {/* Create / Edit modal */}
      {showForm && (
        <RewardFormModal
          initial={editing}
          settings={settings}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => {
            setEditing(null);
            setCreating(false);
            load(); // refresh current page (new/edited row may re-sort)
          }}
        />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl w-full max-w-sm p-6">
            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-2">Delete reward?</h3>
            <p className="text-[13px] text-slate-500 mb-5">
              <strong className="text-slate-700 dark:text-slate-200">{deleteTarget.title}</strong> will be permanently removed from the catalog.
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors">
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Form modal ────────────────────────────────────────────────────────────────
function RewardFormModal({
  initial, settings, onClose, onSaved,
}: {
  initial: RewardCatalogItem | null;
  settings: RewardSettings | null;
  onClose: () => void;
  onSaved: (saved: RewardCatalogItem, isNew: boolean) => void;
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

  const moneyPreview = useMemo(() => {
    const cost = Number(form.cost_xp);
    if (!settings || !(cost > 0)) return null;
    return formatMoney(xpToMoney(cost, settings), settings);
  }, [form.cost_xp, settings]);

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!(Number(form.cost_xp) > 0) || !Number.isInteger(Number(form.cost_xp))) e.cost_xp = "Cost must be an integer greater than 0.";
    if (!(Number(form.reward_value) >= 0)) e.reward_value = "Reward value must be 0 or more.";
    if (form.stock !== "" && (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0)) e.stock = "Stock must be a whole number (or blank for unlimited).";
    if (!Number.isInteger(Number(form.sort_order))) e.sort_order = "Sort order must be a whole number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      icon: form.icon.trim() || null,
      image_url: form.image_url.trim() || null,
      cost_xp: Number(form.cost_xp),
      reward_type: form.reward_type,
      reward_value: Number(form.reward_value),
      stock: form.stock === "" ? null : Number(form.stock),
      is_active: form.is_active,
      sort_order: Number(form.sort_order),
    };

    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/rewards-catalog/${initial!.id}` : "/api/admin/rewards-catalog";
      const { data } = await adminFetch<{ data: RewardCatalogItem }>(url, {
        method: isEdit ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      onSaved(data, !isEdit);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Could not save reward.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h3 className="text-[15px] font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {isEdit ? <Pencil className="w-4 h-4 text-[var(--color-brand)]" /> : <Plus className="w-4 h-4 text-[var(--color-brand)]" />}
            {isEdit ? "Edit reward" : "New reward"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto">
          <FormField label="Title" error={errors.title}>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. ₹50 Amazon voucher" className={fieldCls(!!errors.title)} />
          </FormField>

          <FormField label="Description">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} placeholder="Short description shown to users" className={fieldCls(false)} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Icon (Feather name)">
              <input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="e.g. gift" className={fieldCls(false)} />
            </FormField>
            <FormField label="Image URL">
              <input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://…" className={fieldCls(false)} />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Cost (XP)" error={errors.cost_xp} hint={moneyPreview ? `≈ ${moneyPreview}` : undefined}>
              <input type="number" min={1} step={1} value={form.cost_xp} onChange={(e) => set("cost_xp", e.target.value)} placeholder="e.g. 500" className={fieldCls(!!errors.cost_xp)} />
            </FormField>
            <FormField label="Reward type">
              <select value={form.reward_type} onChange={(e) => set("reward_type", e.target.value as RewardType)} className={fieldCls(false)}>
                {REWARD_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Reward value" error={errors.reward_value}>
              <input type="number" min={0} step="0.01" value={form.reward_value} onChange={(e) => set("reward_value", e.target.value)} placeholder="e.g. 50" className={fieldCls(!!errors.reward_value)} />
            </FormField>
            <FormField label="Stock" error={errors.stock} hint="Blank = unlimited">
              <input type="number" min={0} step={1} value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="∞" className={fieldCls(!!errors.stock)} />
            </FormField>
            <FormField label="Sort order" error={errors.sort_order}>
              <input type="number" step={1} value={form.sort_order} onChange={(e) => set("sort_order", e.target.value)} className={fieldCls(!!errors.sort_order)} />
            </FormField>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3">
            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-200">Active (visible to users)</span>
            <Toggle checked={form.is_active} onChange={(v) => set("is_active", v)} />
          </div>

          {serverError && (
            <p className="flex items-center gap-2 text-[12.5px] text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-3.5 py-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" /> {serverError}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 -mx-6 px-6 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 disabled:opacity-60 transition-opacity">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {isEdit ? "Save changes" : "Create reward"}</>}
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

function FormField({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      {children}
      {error ? <p className="text-[11px] text-red-500 mt-1">{error}</p> : hint ? <p className="text-[11px] text-slate-400 mt-1">{hint}</p> : null}
    </div>
  );
}
