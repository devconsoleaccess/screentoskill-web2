"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ListChecks,
  Gift,
  Coins,
  Wallet,
  Target,
  Bell,
  LogOut,
  Menu,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { LogoMark, LogoWordmark } from "@/components/icons/Logo";
import { useAdminAuth, signOutAdmin } from "@/lib/useAdminAuth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/questions", label: "Questions", icon: ListChecks },
  { href: "/admin/challenges", label: "Daily Challenges", icon: Target },
  { href: "/admin/rewards/catalog", label: "Rewards Catalog", icon: Gift },
  { href: "/admin/rewards/redemptions", label: "Redemptions", icon: Wallet },
  { href: "/admin/rewards/settings", label: "Reward Settings", icon: Coins },
  { href: "/admin/notifications", label: "Send Notification", icon: Bell },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, loading } = useAdminAuth();

  const isLoginRoute = pathname === "/admin/login";

  // Redirect unauthenticated users to login (except on the login route itself).
  useEffect(() => {
    if (!loading && !user && !isLoginRoute) {
      router.replace("/admin/login");
    }
  }, [loading, user, isLoginRoute, router]);


  if (isLoginRoute) return <>{children}</>;

  // While resolving the session — or while bouncing an unauthed user — show a spinner.
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-6 h-6 text-[var(--color-brand)] animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOutAdmin();
    router.replace("/admin/login");
  };

  const isActive = (item: (typeof NAV)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const initial = (user.email?.[0] ?? "A").toUpperCase();

  const SidebarInner = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <LogoMark />
        <LogoWordmark />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 pb-2">
          Menu
        </p>
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive({ href, label, icon: Icon, exact });
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                active
                  ? "bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="shrink-0 px-3 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
          Back to site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-900">

      {/* ── Desktop sidebar — fixed, full-height ── */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-60 z-30 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800">
        <SidebarInner />
      </aside>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 z-10 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800">
            <SidebarInner />
          </aside>
        </div>
      )}

      {/* ── Main column — offset by sidebar width on desktop ── */}
      <div className="flex flex-col flex-1 min-h-screen lg:pl-60">

        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-5 py-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 text-[13px]">
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-semibold text-slate-800 dark:text-slate-100 capitalize">
                  {pathname.split("/").filter(Boolean).pop()}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            <span className="hidden sm:block text-[12px] text-slate-400 max-w-[160px] truncate">
              {user.email}
            </span>
            <div className="w-7 h-7 rounded-full bg-[var(--color-brand)]/15 flex items-center justify-center text-[var(--color-brand)] text-[11px] font-bold select-none">
              {initial}
            </div>
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
