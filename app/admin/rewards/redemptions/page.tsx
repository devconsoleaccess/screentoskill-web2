"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Wallet, Loader2, AlertCircle, X, Check, Ban, BadgeCheck, RotateCcw,
  Filter, User as UserIcon, Coins,
} from "lucide-react";
import { adminFetch } from "@/lib/adminFetch";
import { Pagination } from "@/components/admin/Pagination";
import type { Redemption, RedemptionStatus } from "@/lib/rewardsTypes";

const PAGE_SIZE = 10;

const STATUS_META: Record<RedemptionStatus, { label: string; badge: string }> = {
  pending:   { label: "Pending",   badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800" },
  approved:  { label: "Approved",  badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800" },
  rejected:  { label: "Rejected",  badge: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800" },
  fulfilled: { label: "Paid",      badge: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800" },
};

const FILTERS: { value: string; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "fulfilled", label: "Paid" },
  { value: "", label: "All" },
];

// Action → target status
type Action = { status: RedemptionStatus; label: string; icon: React.ElementType; cls: string };
const ACTIONS: Action[] = [
  { status: "approved",  label: "Approve",      icon: Check,      cls: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
  { status: "rejected",  label: "Reject",       icon: Ban,        cls: "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" },
  { status: "fulfilled", label: "Mark as Paid", icon: BadgeCheck, cls: "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" },
];

export default function RedemptionsPage() {
  const [rows, setRows] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState("pending"); // default = pending first
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [actionModal, setActionModal] = useState<{ row: Redemption; action: Action } | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
      if (statusFilter) params.set("status", statusFilter);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      const { data, count } = await adminFetch<{ data: Redemption[]; count: number }>(`/api/admin/redemptions?${params.toString()}`);
      if (data.length === 0 && count > 0 && page > 1) { setPage((p) => p - 1); return; }
      setRows(data);
      setTotal(count);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load redemptions.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, from, to, page]);

  useEffect(() => { load(); }, [load]);

  // Reset to the first page whenever a filter changes.
  useEffect(() => { setPage(1); }, [statusFilter, from, to]);

  const resetFilters = () => { setStatusFilter("pending"); setFrom(""); setTo(""); };
  const hasFilters = statusFilter !== "pending" || from || to;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
          <Wallet className="w-5 h-5 text-[var(--color-brand)]" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Redemptions</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            {loading ? "Loading…" : `${total} redemption${total !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Filters</span>
          {hasFilters && (
            <button onClick={resetFilters} className="ml-auto flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          {/* Status pills */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Status</label>
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.value || "all"}
                  onClick={() => setStatusFilter(f.value)}
                  className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg border transition-colors ${
                    statusFilter === f.value
                      ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
          </div>
        </div>
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
            <Loader2 className="w-4 h-4 animate-spin" /> Loading redemptions…
          </div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center">
            <Wallet className="w-8 h-8 text-slate-200 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-slate-400 text-[13px]">No redemptions match these filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 px-4 text-left font-semibold text-slate-500 dark:text-slate-400 w-32">Date</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400">User</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400">Reward</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-24">Cost</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-40">Details</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-24">Status</th>
                  <th className="py-3 px-4 text-right font-semibold text-slate-500 dark:text-slate-400 w-44">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors align-top">
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      <div className="text-[11px] text-slate-400">{new Date(r.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] shrink-0">
                          <UserIcon className="w-3.5 h-3.5" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 dark:text-slate-100 truncate max-w-[160px]">{r.profile?.name || "Unknown"}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[160px]">{r.profile?.email || r.user_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-200">{r.reward?.title || <span className="text-slate-400">—</span>}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                        <Coins className="w-3.5 h-3.5 text-amber-500" /> {r.cost_xp}
                      </div>
                      {r.reward_value != null && <span className="text-[11px] text-slate-400">value {r.reward_value}</span>}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      {(() => {
                        const text = formatDetails(r.redemption_details);
                        return <span className="block truncate max-w-[160px]" title={text}>{text || "—"}</span>;
                      })()}
                      {r.admin_note && <span className="block text-[11px] text-slate-400 italic truncate max-w-[160px]" title={r.admin_note}>“{r.admin_note}”</span>}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[r.status].badge}`}>
                        {STATUS_META[r.status].label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1 flex-wrap">
                        {ACTIONS.filter((a) => a.status !== r.status).map((a) => (
                          <button
                            key={a.status}
                            onClick={() => setActionModal({ row: r, action: a })}
                            title={a.label}
                            className={`p-1.5 rounded-lg text-slate-400 transition-colors ${a.cls}`}
                          >
                            <a.icon className="w-3.5 h-3.5" />
                          </button>
                        ))}
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

      {actionModal && (
        <StatusModal
          row={actionModal.row}
          action={actionModal.action}
          onClose={() => setActionModal(null)}
          onDone={() => {
            setActionModal(null);
            load(); // refresh current page + total (status change may move the row)
          }}
        />
      )}
    </div>
  );
}

// ── Status change modal ──
function StatusModal({
  row, action, onClose, onDone,
}: {
  row: Redemption;
  action: Action;
  onClose: () => void;
  onDone: (updated: Redemption, refunded: boolean) => void;
}) {
  const [note, setNote] = useState(row.admin_note ?? "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const isReject = action.status === "rejected";

  const submit = async () => {
    setSaving(true);
    setErr(null);
    try {
      const { data, refunded } = await adminFetch<{ data: Redemption; refunded: boolean }>(
        `/api/admin/redemptions/${row.id}/status`,
        { method: "POST", body: JSON.stringify({ status: action.status, admin_note: note.trim() }) }
      );
      onDone(data, refunded);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not update status.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[15px] font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <action.icon className="w-4 h-4" /> {action.label}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[13px] text-slate-500 mb-1">
          {row.reward?.title || "Reward"} · {row.profile?.name || row.user_id}
        </p>

        {isReject && (
          <div className="flex items-start gap-2 text-[12px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 rounded-lg px-3 py-2.5 my-3">
            <Coins className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Rejecting refunds <strong>{row.cost_xp} XP</strong> back to the user.</span>
          </div>
        )}

        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 mt-3">
          Admin note {isReject ? "(reason)" : "(optional)"}
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Add a note for this decision…"
          className={inputCls}
        />

        {err && <p className="flex items-center gap-2 text-[12.5px] text-red-600 dark:text-red-400 font-medium mt-3"><AlertCircle className="w-4 h-4 shrink-0" /> {err}</p>}

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className={`flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold rounded-lg text-white disabled:opacity-60 transition-opacity ${
              isReject ? "bg-red-500 hover:bg-red-600" : "bg-[var(--color-brand)] hover:opacity-90"
            }`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <action.icon className="w-4 h-4" />}
            {saving ? "Saving…" : action.label}
          </button>
        </div>
      </div>
    </div>
  );
}

// redemption_details may be a plain string (UPI/email/phone) or a JSON object
// like { upi_id, reward_title }. Render it as readable text either way.
function formatDetails(d: Redemption["redemption_details"]): string {
  if (!d) return "";
  if (typeof d === "string") return d;
  if (typeof d === "object") {
    const parts = Object.entries(d)
      .filter(([k]) => k !== "reward_title") // shown separately as the reward column
      .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`);
    return parts.join(" · ") || JSON.stringify(d);
  }
  return String(d);
}

const inputCls =
  "px-3 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30 transition-colors w-full";
