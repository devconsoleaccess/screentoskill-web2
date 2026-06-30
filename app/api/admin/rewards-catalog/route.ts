// app/api/admin/rewards-catalog/route.ts
// List + create rewards in the catalog. Writes use the service-role client.
import { NextResponse } from "next/server";
import { requireAdmin, fail, pageRange } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buildCatalogPatch } from "@/lib/rewardCatalogValidation";

export const dynamic = "force-dynamic";

// ── List (sorted by sort_order, paginated) ──────────────────────────────────────
export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const { from, to } = pageRange(req);

    const { data, count, error } = await supabaseAdmin
      .from("rewards_catalog")
      .select("*", { count: "exact" })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
      .range(from, to);
    if (error) throw error;
    return NextResponse.json({ data: data ?? [], count: count ?? 0 });
  } catch (err) {
    return fail(err);
  }
}

// ── Create ─────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const patch = buildCatalogPatch(body, false);

    if (patch.is_active === undefined) patch.is_active = true;
    if (patch.sort_order === undefined) patch.sort_order = 0;

    const { data, error } = await supabaseAdmin
      .from("rewards_catalog")
      .insert(patch)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return fail(err);
  }
}
