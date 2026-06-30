// app/admin/questions/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus, Trash2, Pencil, Search, SlidersHorizontal, ChevronLeft,
  ChevronRight, RotateCcw, Volume2, Eye, X, Check, Loader2, BarChart3,
} from "lucide-react";
import {
  useGetQuestionsQuery,
  useDeleteQuestionMutation,
  useBulkDeleteQuestionsMutation,
  useGetQuestionStatsQuery,
  Question,
  QuestionsFilter,
} from "@/store/api/questionsApi";
import { AGE_GROUPS, SUBJECTS } from "@/data/questionsData";

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;

const OPTION_TYPE_LABELS: Record<string, string> = {
  text: "Text",
  emoji: "Emoji",
  color: "Colour",
};

const AGE_GROUP_COLORS: Record<string, string> = {
  baby:   "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800",
  tiny:   "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
  young:  "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  middle: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  teen:   "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
};

// ── Pagination helper ──────────────────────────────────────────────────────────
// Returns a compact page list with -1 sentinels for ellipses.
function getPageItems(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: number[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) items.push(-1);
  for (let p = left; p <= right; p++) items.push(p);
  if (right < total - 1) items.push(-1);
  items.push(total);
  return items;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ subject_id, age_group, count }: { subject_id: string; age_group: string; count: number }) {
  const subject = SUBJECTS.find(s => s.id === subject_id);
  const group   = AGE_GROUPS.find(g => g.id === age_group);
  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{subject?.emoji ?? "❓"}</span>
        <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 truncate">{subject?.title ?? subject_id}</span>
      </div>
      <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${AGE_GROUP_COLORS[age_group] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
        {group?.label ?? age_group}
      </span>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{count}</p>
      <p className="text-[11px] text-slate-400">questions</p>
    </div>
  );
}

function Badge({ label, color }: { label: string; color?: string }) {
  return (
    <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${color ?? "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"}`}>
      {label}
    </span>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function QuestionsPage() {
  // ── filter state ──
  const [filters, setFilters] = useState<QuestionsFilter>({ page: 1, pageSize: PAGE_SIZE });
  const [searchInput, setSearchInput] = useState("");
  const [showStats, setShowStats] = useState(false);

  // ── selection ──
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // ── modal state (view + delete only) ──
  const [viewQuestion, setViewQuestion] = useState<Question | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Question | null>(null);

  // ── queries ──
  const { data, isLoading, isFetching } = useGetQuestionsQuery(filters);
  const { data: stats } = useGetQuestionStatsQuery();

  const [deleteQuestion, { isLoading: deleting }] = useDeleteQuestionMutation();
  const [bulkDelete, { isLoading: bulkDeleting }] = useBulkDeleteQuestionsMutation();

  const questions = data?.data ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = filters.page ?? 1;

  // ── Debounced search ────────────────────────────────────────────────────────
  // Auto-applies the search box value after the user stops typing.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      setFilters(f => {
        const next = searchInput.trim() || undefined;
        if (next === f.search) return f; // no change → don't reset page
        return { ...f, search: next, page: 1 };
      });
      setSelected(new Set());
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchInput]);

  // ── helpers ──────────────────────────────────────────────────────────────────

  const setFilter = (key: keyof QuestionsFilter, value: string | undefined) => {
    setFilters(f => ({ ...f, [key]: value || undefined, page: 1 }));
    setSelected(new Set());
  };

  const goToPage = (p: number) => {
    setFilters(f => ({ ...f, page: Math.min(totalPages, Math.max(1, p)) }));
    setSelected(new Set());
  };

  const resetFilters = () => {
    setFilters({ page: 1, pageSize: PAGE_SIZE });
    setSearchInput("");
    setSelected(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === questions.length) setSelected(new Set());
    else setSelected(new Set(questions.map(q => q.id)));
  };

  const handleDelete = async (q: Question) => {
    await deleteQuestion(q.id);
    setDeleteConfirm(null);
  };

  const handleBulkDelete = async () => {
    await bulkDelete(Array.from(selected));
    setSelected(new Set());
  };

  const activeFilterCount = [filters.subject_id, filters.age_group, filters.option_type, filters.search].filter(Boolean).length;

  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Questions</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">{totalCount} total questions across all subjects</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStats(v => !v)}
            className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {showStats ? "Hide stats" : "Show stats"}
          </button>
          <Link
            href="/admin/questions/new"
            className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add question
          </Link>
        </div>
      </div>

      {/* ── Stats grid ── */}
      {showStats && stats && stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map(s => (
            <StatCard key={`${s.subject_id}-${s.age_group}`} {...s} />
          ))}
        </div>
      )}

      {/* ── Filter bar ── */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 p-4">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Filters</span>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="ml-auto flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset ({activeFilterCount})
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3 items-end">

          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search question text…"
                className="w-full pl-8 pr-9 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
              />
              {/* Spinner while the debounced query is in flight, or a clear button */}
              {isFetching ? (
                <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 animate-spin" />
              ) : searchInput ? (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Subject filter */}
          <div className="min-w-[150px]">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Subject</label>
            <select
              value={filters.subject_id ?? ""}
              onChange={e => setFilter("subject_id", e.target.value)}
              className="w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
            >
              <option value="">All subjects</option>
              {SUBJECTS.map(s => (
                <option key={s.id} value={s.id}>{s.emoji} {s.title}</option>
              ))}
            </select>
          </div>

          {/* Age group filter */}
          <div className="min-w-[150px]">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Age group</label>
            <select
              value={filters.age_group ?? ""}
              onChange={e => setFilter("age_group", e.target.value)}
              className="w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
            >
              <option value="">All ages</option>
              {AGE_GROUPS.map(g => (
                <option key={g.id} value={g.id}>{g.emoji} {g.label}</option>
              ))}
            </select>
          </div>

          {/* Option type filter */}
          <div className="min-w-[130px]">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Option type</label>
            <select
              value={filters.option_type ?? ""}
              onChange={e => setFilter("option_type", e.target.value)}
              className="w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
            >
              <option value="">All types</option>
              <option value="text">Text</option>
              <option value="emoji">Emoji</option>
              <option value="color">Colour</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Bulk action bar ── */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--color-brand)]/5 border border-[var(--color-brand)]/20 rounded-xl">
          <span className="text-[13px] font-semibold text-[var(--color-brand)]">{selected.size} selected</span>
          <button
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
            className="flex items-center gap-1.5 ml-auto px-3 py-1.5 text-[12px] font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {bulkDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            {bulkDeleting ? "Deleting…" : `Delete ${selected.size}`}
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex items-center justify-center gap-2 text-slate-400 text-[13px]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading questions…
          </div>
        ) : questions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-[13px]">No questions found.</p>
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="mt-2 text-[13px] text-[var(--color-brand)] hover:underline">Clear filters</button>
            )}
          </div>
        ) : (
          <div className={`overflow-x-auto transition-opacity ${isFetching ? "opacity-60" : ""}`}>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 pl-4 pr-2 text-left w-8">
                    <input
                      type="checkbox"
                      checked={selected.size === questions.length && questions.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 accent-[var(--color-brand)]"
                    />
                  </th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-24">ID</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400">Question</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-28">Subject</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-28">Age group</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-20">Type</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-28">Answer</th>
                  <th className="py-3 px-3 text-left font-semibold text-slate-500 dark:text-slate-400 w-8"></th>
                  <th className="py-3 px-4 text-right font-semibold text-slate-500 dark:text-slate-400 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {questions.map((q) => {
                  const subject  = SUBJECTS.find(s => s.id === q.subject_id);
                  const ageGroup = AGE_GROUPS.find(g => g.id === q.age_group);
                  return (
                    <tr
                      key={q.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors ${selected.has(q.id) ? "bg-[var(--color-brand)]/5" : ""}`}
                    >
                      <td className="py-3 pl-4 pr-2">
                        <input
                          type="checkbox"
                          checked={selected.has(q.id)}
                          onChange={() => toggleSelect(q.id)}
                          className="rounded border-slate-300 accent-[var(--color-brand)]"
                        />
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{q.id}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-200 max-w-xs">
                        <span className="line-clamp-2">{q.question}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                          {subject?.emoji} {subject?.title ?? q.subject_id}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          label={`${ageGroup?.emoji ?? ""} ${ageGroup?.label ?? q.age_group}`}
                          color={AGE_GROUP_COLORS[q.age_group]}
                        />
                      </td>
                      <td className="py-3 px-3">
                        <Badge label={OPTION_TYPE_LABELS[q.option_type] ?? q.option_type} />
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium truncate max-w-[120px]">
                        {q.answer}
                      </td>
                      <td className="py-3 px-3">
                        {q.sound_key && (
                          <span title={q.sound_key}>
                            <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewQuestion(q)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/admin/questions/${encodeURIComponent(q.id)}/edit`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--color-brand)] hover:bg-[var(--color-brand)]/10 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(q)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[12px] text-slate-400">
              {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1 || isFetching}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageItems(currentPage, totalPages).map((p, i) =>
                p === -1 ? (
                  <span key={`ellipsis-${i}`} className="px-1.5 text-[12px] text-slate-300 select-none">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    disabled={isFetching}
                    className={`min-w-[28px] h-7 px-1.5 rounded-lg text-[12px] font-medium transition-all ${
                      p === currentPage
                        ? "bg-[var(--color-brand)] text-white"
                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages || isFetching}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── View modal ── */}
      {viewQuestion && (
        <ViewModal question={viewQuestion} onClose={() => setViewQuestion(null)} />
      )}

      {/* ── Delete confirm modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl w-full max-w-sm p-6">
            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-2">Delete question?</h3>
            <p className="text-[13px] text-slate-500 mb-5">
              <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{deleteConfirm.id}</span>{" "}
              will be permanently removed.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── View Modal ────────────────────────────────────────────────────────────────

function ViewModal({ question: q, onClose }: { question: Question; onClose: () => void }) {
  const subject  = SUBJECTS.find(s => s.id === q.subject_id);
  const ageGroup = AGE_GROUPS.find(g => g.id === q.age_group);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">Question detail</h3>
          <div className="flex items-center gap-1">
            <Link
              href={`/admin/questions/${encodeURIComponent(q.id)}/edit`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-semibold rounded-lg text-[var(--color-brand)] hover:bg-[var(--color-brand)]/10 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Link>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <Row label="ID"><code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{q.id}</code></Row>
          <Row label="Question"><span className="text-slate-800 dark:text-slate-200">{q.question}</span></Row>
          <Row label="Subject"><span>{subject?.emoji} {subject?.title ?? q.subject_id}</span></Row>
          <Row label="Age group"><span>{ageGroup?.emoji} {ageGroup?.label ?? q.age_group}</span></Row>
          <Row label="Option type"><Badge label={OPTION_TYPE_LABELS[q.option_type] ?? q.option_type} /></Row>
          <Row label="Options">
            <div className="flex flex-wrap gap-1.5">
              {q.options.map(opt => (
                <span
                  key={opt}
                  className={`px-2 py-1 rounded-lg text-[12px] border ${opt === q.answer ? "bg-green-50 border-green-200 text-green-700 font-semibold dark:bg-green-900/20 dark:border-green-800 dark:text-green-300" : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"}`}
                >
                  {opt === q.answer && <Check className="inline w-3 h-3 mr-0.5" />}
                  {opt}
                </span>
              ))}
            </div>
          </Row>
          <Row label="Answer"><span className="text-green-700 dark:text-green-400 font-semibold">{q.answer}</span></Row>
          {q.sound_key && (
            <Row label="Audio">
              {/^https?:\/\//i.test(q.sound_key) ? (
                <audio controls src={q.sound_key} className="w-full max-w-xs h-9" />
              ) : (
                <code className="text-[12px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{q.sound_key}</code>
              )}
            </Row>
          )}
          {q.visual    && <Row label="Visual"><span className="text-2xl">{q.visual}</span></Row>}
          {q.option_colors && (
            <Row label="Option colours">
              <div className="flex flex-wrap gap-2">
                {Object.entries(q.option_colors).map(([label, hex]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full border border-slate-200" style={{ background: hex }} />
                    <span className="text-[12px] text-slate-600 dark:text-slate-300">{label}</span>
                  </div>
                ))}
              </div>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 w-28 shrink-0 pt-0.5">{label}</span>
      <div className="text-[13px] text-slate-700 dark:text-slate-200">{children}</div>
    </div>
  );
}
