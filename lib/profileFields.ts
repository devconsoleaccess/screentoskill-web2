// lib/profileFields.ts
// The `profiles` table schema varies between projects — the name and email
// columns may be called different things. These helpers detect and read those
// columns from an actual row, so the admin routes don't hard-code a column name
// that might not exist (which makes PostgREST reject the whole query).

export const NAME_CANDIDATES = [
  "name", "full_name", "fullname", "display_name", "username", "first_name", "fname",
];

export const EMAIL_CANDIDATES = [
  "email", "email_address", "user_email", "mail", "email_id", "emailid",
];

/** Pick the first non-empty name-like field from a profile row. */
export function pickName(row: Record<string, any> | null | undefined): string | null {
  if (!row) return null;
  for (const c of NAME_CANDIDATES) {
    if (row[c]) return String(row[c]);
  }
  // Fall back to first + last name if present.
  const first = row.first_name ?? row.fname;
  const last = row.last_name ?? row.lname;
  if (first || last) return [first, last].filter(Boolean).join(" ");
  return null;
}

/** Pick the first non-empty email-like field from a profile row. */
export function pickEmail(row: Record<string, any> | null | undefined): string | null {
  if (!row) return null;
  for (const c of EMAIL_CANDIDATES) {
    if (row[c]) return String(row[c]);
  }
  return null;
}

/**
 * Given the keys present on a profiles row, return the searchable columns
 * (name + email variants that actually exist).
 */
export function searchableProfileColumns(cols: string[]): string[] {
  const wanted = new Set([...NAME_CANDIDATES, ...EMAIL_CANDIDATES]);
  return cols.filter((c) => wanted.has(c));
}
