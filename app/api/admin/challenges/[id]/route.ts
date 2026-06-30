// app/api/admin/challenges/[id]/route.ts
// Update (incl. inline is_active toggle) + delete a single challenge.
import { NextResponse } from "next/server";
import { requireAdmin, fail, assert } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buildChallengePatch } from "@/lib/challengeValidation";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    const { id } = await params;
    const body = await req.json();
    const patch = buildChallengePatch(body, true);
    assert(Object.keys(patch).length > 0, "No valid fields to update.");

    const { data, error } = await supabaseAdmin
      .from("challenges")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return fail(err);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    const { id } = await params;
    const { error } = await supabaseAdmin.from("challenges").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return fail(err);
  }
}
