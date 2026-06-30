// app/api/admin/reward-settings/route.ts
// Single-row (id = 1) reward / conversion-rate settings.
import { NextResponse } from "next/server";
import { requireAdmin, fail, assert } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const SETTINGS_ID = 1;

// ── Read the current settings row ──────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const { data, error } = await supabaseAdmin
      .from("reward_settings")
      .select("*")
      .eq("id", SETTINGS_ID)
      .maybeSingle();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return fail(err);
  }
}

// ── Update the settings row ────────────────────────────────────────────────────
export async function PATCH(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();

    const xp_per_unit = Number(body.xp_per_unit);
    const currency_per_unit = Number(body.currency_per_unit);
    const min_redeem_xp = Number(body.min_redeem_xp);

    assert(Number.isInteger(xp_per_unit) && xp_per_unit > 0, "XP per unit must be a positive integer.");
    assert(Number.isFinite(currency_per_unit) && currency_per_unit >= 0, "Currency per unit must be 0 or more.");
    assert(typeof body.currency_symbol === "string" && body.currency_symbol.trim(), "Currency symbol is required.");
    assert(Number.isInteger(min_redeem_xp) && min_redeem_xp >= 0, "Minimum redeem XP must be 0 or more.");

    const patch = {
      xp_per_unit,
      currency_per_unit,
      currency_symbol: String(body.currency_symbol).trim(),
      min_redeem_xp,
      is_redemption_enabled: Boolean(body.is_redemption_enabled),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("reward_settings")
      .update(patch)
      .eq("id", SETTINGS_ID)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return fail(err);
  }
}
