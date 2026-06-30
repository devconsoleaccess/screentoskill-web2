// lib/adminApi.ts
// ─────────────────────────────────────────────────────────────────────────────
// Server-side helpers shared by the admin API route handlers.
//   • requireAdmin()  — verifies the caller's Supabase access token. The whole
//                       /admin area is gated behind a Supabase login, so any
//                       authenticated Supabase user counts as an admin (mirrors
//                       the client-side guard in app/admin/layout.tsx).
//   • ApiError / fail — typed errors that map to HTTP status codes.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/** Verify the Bearer token on an incoming request. Throws ApiError(401) if bad. */
export async function requireAdmin(req: Request): Promise<User> {
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) throw new ApiError(401, "Missing authorization token.");

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) throw new ApiError(401, "Invalid or expired session.");
  return data.user;
}

/** Turn any thrown value into a JSON error response with the right status. */
export function fail(err: unknown): NextResponse {
  if (err instanceof ApiError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }

  // Supabase / PostgREST errors are plain objects ({ message, details, hint, code }),
  // not Error instances — surface their text instead of a generic message.
  let message = "Unexpected server error.";
  if (err instanceof Error) {
    message = err.message;
  } else if (err && typeof err === "object") {
    const e = err as Record<string, unknown>;
    const base = (e.message || e.error_description || e.error) as string | undefined;
    if (base) {
      message = base;
      if (e.details) message += ` — ${e.details}`;
      if (e.hint) message += ` (${e.hint})`;
    }
  }

  console.error("[admin api] error:", err);
  return NextResponse.json({ error: message }, { status: 500 });
}

/** Throw a 400 if a condition fails — keeps route validation terse. */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new ApiError(400, message);
}

/**
 * Parse `page` / `pageSize` query params into a Supabase `.range(from, to)`
 * window. Defaults to page 1 with 10 rows; pageSize is clamped to [1, 100].
 */
export function pageRange(req: Request, defaultPageSize = 10): {
  page: number;
  pageSize: number;
  from: number;
  to: number;
} {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get("pageSize")) || defaultPageSize));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  return { page, pageSize, from, to };
}
