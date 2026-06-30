// lib/adminFetch.ts
// ─────────────────────────────────────────────────────────────────────────────
// Client-side fetch wrapper for the admin API routes. Attaches the current
// Supabase access token as a Bearer header so the server can authenticate the
// caller, parses JSON, and throws on non-2xx with the server's error message.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { supabase } from "@/lib/supabase";

export async function adminFetch<T = unknown>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(url, { ...init, headers });

  // 204 / empty body
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = json?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return json as T;
}
