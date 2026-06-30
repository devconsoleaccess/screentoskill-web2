// lib/supabaseAdmin.ts
// ─────────────────────────────────────────────────────────────────────────────
// Server-ONLY Supabase client using the service-role key. This key bypasses RLS,
// so it must never be imported into a "use client" component or shipped to the
// browser. Only API route handlers (app/api/**) should import this.
//
// The underlying client is created lazily (on first use) so that a missing
// SUPABASE_SERVICE_ROLE_KEY fails at request time with a clear error — not at
// build time, where `next build` evaluates route modules to collect metadata.
// ─────────────────────────────────────────────────────────────────────────────
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set — add it to .env.local");
  }

  client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

// Proxy that defers client creation until a property is actually accessed.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const c = getClient();
    const value = (c as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? (value as (...args: unknown[]) => unknown).bind(c) : value;
  },
});
