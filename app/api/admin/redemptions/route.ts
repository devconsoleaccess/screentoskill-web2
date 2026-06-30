// app/api/admin/redemptions/route.ts
// List redemptions with status + date-range filters, enriched with the reward
// title and the redeeming user's name/email. We join in JS rather than relying
// on PostgREST embedding so it works regardless of FK metadata.
import { NextResponse } from "next/server";
import { requireAdmin, fail, pageRange } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { pickName, pickEmail } from "@/lib/profileFields";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "approved", "rejected", "fulfilled"];

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const from = url.searchParams.get("from"); // ISO date (inclusive)
    const to = url.searchParams.get("to");     // ISO date (inclusive)
    const { from: rangeFrom, to: rangeTo } = pageRange(req);

    let query = supabaseAdmin.from("reward_redemptions").select("*", { count: "exact" });

    if (status && STATUSES.includes(status)) query = query.eq("status", status);
    if (from) query = query.gte("created_at", new Date(from).toISOString());
    if (to) {
      // make "to" inclusive of the whole day
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      query = query.lte("created_at", end.toISOString());
    }

    // Newest first. The default "pending first" view is achieved by the page
    // defaulting its status filter to `pending`, so server-side ordering by
    // date is all that's needed (and is paginated at the SQL level below).
    const { data: rows, count, error } = await query
      .order("created_at", { ascending: false })
      .range(rangeFrom, rangeTo);
    if (error) throw error;

    const redemptions = rows ?? [];

    // ── Enrich with reward titles ──
    const rewardIds = Array.from(new Set(redemptions.map((r) => r.reward_id).filter(Boolean)));
    const rewardMap: Record<string, string> = {};
    if (rewardIds.length) {
      const { data: rewards } = await supabaseAdmin
        .from("rewards_catalog")
        .select("id, title")
        .in("id", rewardIds);
      (rewards ?? []).forEach((rw: any) => { rewardMap[rw.id] = rw.title; });
    }

    // ── Enrich with user profiles ──
    const userIds = Array.from(new Set(redemptions.map((r) => r.user_id).filter(Boolean)));
    const profileMap: Record<string, { name: string | null; email: string | null }> = {};
    if (userIds.length) {
      const { data: profiles } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .in("id", userIds);
      (profiles ?? []).forEach((p: any) => {
        profileMap[p.id] = { name: pickName(p), email: pickEmail(p) };
      });
    }

    const enriched = redemptions.map((r) => ({
      ...r,
      reward: { title: r.reward_id ? rewardMap[r.reward_id] ?? null : null },
      profile: profileMap[r.user_id] ?? { name: null, email: null },
    }));

    return NextResponse.json({ data: enriched, count: count ?? 0 });
  } catch (err) {
    return fail(err);
  }
}
