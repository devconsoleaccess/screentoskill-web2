"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Compact page list with -1 sentinels for ellipses (same logic as the
// Questions admin page, extracted for reuse).
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

/**
 * Client-side pagination footer. Renders nothing when everything fits on one
 * page. The parent owns `page` state and slices its own rows.
 */
export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  disabled,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const go = (p: number) => onPageChange(Math.min(totalPages, Math.max(1, p)));

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border-t border-slate-100 dark:border-slate-800">
      <span className="text-[12px] text-slate-400">
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => go(page - 1)}
          disabled={page <= 1 || disabled}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageItems(page, totalPages).map((p, i) =>
          p === -1 ? (
            <span key={`e-${i}`} className="px-1.5 text-[12px] text-slate-300 select-none">…</span>
          ) : (
            <button
              key={p}
              onClick={() => go(p)}
              disabled={disabled}
              className={`min-w-[28px] h-7 px-1.5 rounded-lg text-[12px] font-medium transition-all ${
                p === page
                  ? "bg-[var(--color-brand)] text-white"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => go(page + 1)}
          disabled={page >= totalPages || disabled}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
