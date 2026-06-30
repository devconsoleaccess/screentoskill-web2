// app/api/admin/notifications/send/route.ts
// Send a notification to all users or a single user:
//   1) INSERT one `notifications` row per target user (in-app inbox).
//   2) Look up FCM tokens in `user_fcm_tokens` and push via FCM HTTP v1.
// Returns a summary: in-app rows created + push tokens notified.
import { NextResponse } from "next/server";
import { requireAdmin, fail, assert } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendFcmToTokens } from "@/lib/fcm";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TYPES = ["announcement", "promo", "reward", "system"];

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();

    const audience = body.audience; // "all" | "single"
    const type = body.type;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const message = typeof body.body === "string" ? body.body.trim() : "";

    assert(audience === "all" || audience === "single", "Invalid audience.");
    assert(TYPES.includes(type), "Invalid notification type.");
    assert(title, "Title is required.");
    assert(message, "Body is required.");

    // ── Resolve target user ids ──
    let userIds: string[] = [];
    if (audience === "single") {
      assert(typeof body.user_id === "string" && body.user_id, "Select a user to notify.");
      userIds = [body.user_id];
    } else {
      // Page through profiles so very large user bases still resolve fully.
      const PAGE = 1000;
      for (let offset = 0; ; offset += PAGE) {
        const { data, error } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .range(offset, offset + PAGE - 1);
        if (error) throw error;
        const ids = (data ?? []).map((p: any) => p.id).filter(Boolean);
        userIds.push(...ids);
        if (!data || data.length < PAGE) break;
      }
    }

    assert(userIds.length > 0, "No target users found.");

    // ── 1) In-app notification rows ──
    const rows = userIds.map((user_id) => ({
      user_id,
      type,
      title,
      body: message,
      read: false,
    }));

    let inAppCreated = 0;
    const INSERT_BATCH = 500;
    for (let i = 0; i < rows.length; i += INSERT_BATCH) {
      const slice = rows.slice(i, i + INSERT_BATCH);
      const { error, count } = await supabaseAdmin
        .from("notifications")
        .insert(slice, { count: "exact" });
      if (error) throw error;
      inAppCreated += count ?? slice.length;
    }

    // ── 2) FCM push ──
    const { data: tokenRows, error: tokErr } = await supabaseAdmin
      .from("user_fcm_tokens")
      .select("token")
      .in("user_id", userIds);
    if (tokErr) throw tokErr;

    const tokens = (tokenRows ?? []).map((t: any) => t.token).filter(Boolean);

    let pushResult = { sent: 0, failed: 0, invalidTokens: [] as string[] };
    let pushError: string | null = null;

    if (tokens.length > 0) {
      try {
        pushResult = await sendFcmToTokens(tokens, {
          title,
          body: message,
          data: { type, channel: "engagement" },
        });
        // Prune tokens FCM rejected as unregistered.
        if (pushResult.invalidTokens.length > 0) {
          await supabaseAdmin.from("user_fcm_tokens").delete().in("token", pushResult.invalidTokens);
        }
      } catch (e) {
        // In-app rows already landed; report the push failure without 500-ing.
        pushError = e instanceof Error ? e.message : "Push delivery failed.";
      }
    }

    return NextResponse.json({
      audience,
      targetedUsers: userIds.length,
      inAppCreated,
      tokensFound: tokens.length,
      pushSent: pushResult.sent,
      pushFailed: pushResult.failed,
      prunedTokens: pushResult.invalidTokens.length,
      pushError,
    });
  } catch (err) {
    return fail(err);
  }
}
