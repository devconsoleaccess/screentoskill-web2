"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  Users,
  Phone,
  MapPin,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Download,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type User = {
  userId: number;
  name: string;
  number: string;
  address: string;
  created_at: string;
};

type SortKey = keyof User;
type SortDir = "asc" | "desc";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("userId");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("userId", { ascending: false });
      if (error) {
        setLoadError(error.message);
      } else if (!data || data.length === 0) {
        // Read succeeded but nothing came back — almost always an RLS policy
        // that doesn't grant the logged-in (authenticated) role SELECT access.
        setLoadError(null);
      }
      setUsers((data as User[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.number.includes(q) ||
        u.address.toLowerCase().includes(q) ||
        String(u.userId).includes(q)
    );
  }, [users, search]);

const sorted = useMemo(() => {
  return [...filtered].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];

    const cmp = av < bv ? -1 : av > bv ? 1 : 0;

    return sortDir === "asc" ? cmp : -cmp;
  });
}, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [search]);

  const exportCSV = () => {
    const rows = [
      ["User ID", "Name", "Phone", "Address", "Registered"],
      ...sorted.map((u) => [
        u.userId,
        u.name,
        u.number,
        u.address,
        new Date(u.created_at).toLocaleString("en-IN"),
      ]),
    ];
    const csv = rows.map((r) => r.map(String).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screentoskill-users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortDir === "desc"
        ? <ChevronUp className="w-3.5 h-3.5" />
        : <ChevronDown className="w-3.5 h-3.5" />
    ) : (
      <ChevronsUpDown className="w-3.5 h-3.5 opacity-30" />
    );

  return (
    <div className="space-y-5 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Users
          </h1>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
            {loading
              ? "Loading…"
              : `${filtered.length} registration${filtered.length !== 1 ? "s" : ""}${search ? ` for "${search}"` : ""}`}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-white dark:bg-slate-950 focus-within:border-[var(--color-brand)] transition-colors w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
            />
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Load error banner */}
      {loadError && (
        <div className="flex items-start gap-2.5 text-[12.5px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl px-4 py-3">
          <span className="font-semibold shrink-0">Couldn't load users:</span>
          <span className="break-all">{loadError}</span>
        </div>
      )}

      {/* Table card */}
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {(
                  [
                    { key: "userId" as SortKey, label: "ID" },
                    { key: "name" as SortKey, label: "Name" },
                    { key: "number" as SortKey, label: "Phone" },
                    { key: "address" as SortKey, label: "Address" },
                    { key: "created_at" as SortKey, label: "Registered" },
                  ] as const
                ).map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => toggleSort(key)}
                    className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors select-none whitespace-nowrap"
                  >
                    <span className="flex items-center gap-1.5">
                      {label} <SortIcon k={key} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse border-b border-slate-50 dark:border-slate-800/60">
                    {[40, 80, 70, 120, 60].map((w, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded" style={{ width: `${w}px` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <Users className="w-8 h-8 text-slate-200 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">
                      {search ? "No users match your search." : "No registrations yet."}
                    </p>
                  </td>
                </tr>
              ) : (
                paginated.map((u) => (
                  <tr
                    key={u.userId}
                    className="border-b border-slate-50 dark:border-slate-800/60 last:border-0 hover:bg-slate-50/70 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    {/* ID */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="text-[11px] font-mono font-semibold text-[var(--color-brand)] bg-[var(--color-brand)]/8 border border-[var(--color-brand)]/15 px-2 py-0.5 rounded-md">
                        #{u.userId}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] font-bold text-[11px] shrink-0">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] font-medium text-slate-800 dark:text-slate-100">
                          {u.name}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-[12.5px] text-slate-600 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
                        {u.number}
                      </span>
                    </td>

                    {/* Address */}
                    <td className="px-5 py-3.5 max-w-[220px]">
                      <span className="flex items-start gap-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-snug">{u.address}</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p className="text-[12.5px] text-slate-600 dark:text-slate-300">
                        {new Date(u.created_at).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(u.created_at).toLocaleTimeString("en-IN", {
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && sorted.length > PER_PAGE && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[12px] text-slate-400">
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-[12px] font-medium transition-all ${
                    p === page
                      ? "bg-[var(--color-brand)] text-white"
                      : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}