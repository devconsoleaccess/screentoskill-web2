// app/api/admin/redemptions/[id]/status/route.ts
// Change a redemption's status (approve / reject / mark fulfilled) with an
// optional admin note. Rejecting refunds the user's XP:
//   • INSERT point_transactions (+cost_xp, reason 'admin_grant', meta.refund_for)
//   • UPDATE user_points.total_points += cost_xp
// The refund only fires on the transition INTO 'rejected', so re-saving a
// rejected redemption never double-refunds.
import { NextResponse } from "next/server";
import { requireAdmin, fail, assert, ApiError } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "approved", "rejected", "fulfilled"];

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    const { id } = await params;
    const body = await req.json();
    const status = body.status;
    const adminNote = typeof body.admin_note === "string" ? body.admin_note.trim() : "";

    assert(STATUSES.includes(status), "Invalid status.");

    // Load the current redemption to know its prior status + cost/user.
    const { data: redemption, error: loadErr } = await supabaseAdmin
      .from("reward_redemptions")
      .select("*")
      .eq("id", id)
      .single();
    if (loadErr || !redemption) throw new ApiError(404, "Redemption not found.");

    const wasRejected = redemption.status === "rejected";
    const willReject = status === "rejected";

    // ── Update the redemption ──
    const { data: updated, error: updErr } = await supabaseAdmin
      .from("reward_redemptions")
      .update({
        status,
        admin_note: adminNote || redemption.admin_note || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();
    if (updErr) throw updErr;

    // ── Refund XP, but only when transitioning into 'rejected' ──
    let refunded = false;
    if (willReject && !wasRejected) {
      const costXp = Number(redemption.cost_xp) || 0;
      const userId = redemption.user_id;

      if (costXp > 0 && userId) {
        // 1) Ledger entry
        const { error: txErr } = await supabaseAdmin.from("point_transactions").insert({
          user_id: userId,
          points: costXp,
          reason: "admin_grant",
          meta: { refund_for: id },
        });
        if (txErr) throw txErr;

        // 2) Bump the balance. Read-modify-write (admin action, low contention).
        const { data: pointsRow } = await supabaseAdmin
          .from("user_points")
          .select("total_points")
          .eq("user_id", userId)
          .maybeSingle();

        if (pointsRow) {
          const { error: balErr } = await supabaseAdmin
            .from("user_points")
            .update({ total_points: (Number(pointsRow.total_points) || 0) + costXp })
            .eq("user_id", userId);
          if (balErr) throw balErr;
        } else {
          const { error: insErr } = await supabaseAdmin
            .from("user_points")
            .insert({ user_id: userId, total_points: costXp });
          if (insErr) throw insErr;
        }
        refunded = true;
      }
    }

    return NextResponse.json({ data: updated, refunded });
  } catch (err) {
    return fail(err);
  }
}
