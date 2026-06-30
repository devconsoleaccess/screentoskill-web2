// app/api/admin/profiles/search/route.ts
// Typeahead search over profiles by name or email. The profiles schema varies,
// so we sample one row to learn which name/email columns actually exist, then
// search only those — never referencing a column that would error the query.
import { NextResponse } from "next/server";
import { requireAdmin, fail } from "@/lib/adminApi";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { pickName, pickEmail, searchableProfileColumns } from "@/lib/profileFields";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const url = new URL(req.url);
    const q = (url.searchParams.get("q") ?? "").trim();
    if (q.length < 2) return NextResponse.json({ data: [] });

    // Learn the real column names from a sample row.
    const { data: sample, error: sampleErr } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .limit(1);
    if (sampleErr) throw sampleErr;

    const cols = sample && sample[0] ? Object.keys(sample[0]) : [];
    const searchCols = searchableProfileColumns(cols);
    if (searchCols.length === 0) return NextResponse.json({ data: [] });

    // Build an OR filter across existing name/email columns. Inside .or(),
    // PostgREST uses * (not %) as the ilike wildcard. Strip chars that would
    // break the filter grammar.
    const safe = q.replace(/[,()*]/g, " ").trim();
    const pattern = `*${safe}*`;
    const orExpr = searchCols.map((c) => `${c}.ilike.${pattern}`).join(",");

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .or(orExpr)
      .limit(10);
    if (error) throw error;

    return NextResponse.json({ data: normalize(data) });
  } catch (err) {
    return fail(err);
  }
}

function normalize(rows: any[] | null) {
  return (rows ?? []).map((p) => ({
    id: p.id,
    name: pickName(p),
    email: pickEmail(p),
  }));
}
