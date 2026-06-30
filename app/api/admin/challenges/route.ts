// app/api/admin/challenges/route.ts
// List + create daily/one-time challenges. Writes use the service-role client.
import { NextResponse } from "next/server";
import { requireAdmin, fail, pageRange } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buildChallengePatch } from "@/lib/challengeValidation";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const url = new URL(req.url);
    const frequency = url.searchParams.get("frequency");
    const { from, to } = pageRange(req);

    let query = supabaseAdmin.from("challenges").select("*", { count: "exact" });
    if (frequency === "daily" || frequency === "one_time") query = query.eq("frequency", frequency);

    const { data, count, error } = await query.order("id", { ascending: true }).range(from, to);
    if (error) throw error;
    return NextResponse.json({ data: data ?? [], count: count ?? 0 });
  } catch (err) {
    return fail(err);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const patch = buildChallengePatch(body, false);
    if (patch.is_active === undefined) patch.is_active = true;

    const { data, error } = await supabaseAdmin
      .from("challenges")
      .insert(patch)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return fail(err);
  }
}
