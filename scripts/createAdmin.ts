// scripts/createAdmin.ts
// Provision the admin login user in Supabase Auth using the PUBLIC anon key
// (no service-role key required).
//
// Run once:
//
//      npx tsx scripts/createAdmin.ts
//
// Notes:
//   • This uses the normal public sign-up flow (supabase.auth.signUp), so it
//     works with NEXT_PUBLIC_SUPABASE_KEY.
//   • If your project has "Confirm email" ENABLED (Supabase Dashboard →
//     Authentication → Providers → Email), the user is created but cannot log
//     in until the email is confirmed. The script detects this and tells you.
//     Easiest path: turn that setting OFF, then re-run this script.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// ── Minimal .env.local loader (so you don't need dotenv installed) ────────────
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnv();

// ── Credentials ───────────────────────────────────────────────────────────────
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin@screentoskill";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL || !ANON_KEY) {
  console.error(
    "\n✗ Missing env vars.\n" +
      "  Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY in .env.local\n"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log(`→ Provisioning admin user: ${ADMIN_EMAIL}`);

  // 1. Sign the user up via the public endpoint (works with the anon key).
  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    options: { data: { role: "admin" } },
  });

  if (signUpErr && !/already.*registered|already.*exists|user already/i.test(signUpErr.message)) {
    console.error("✗ Sign-up failed:", signUpErr.message);
    process.exit(1);
  }

  if (signUpErr) {
    console.log("• User already exists — verifying login…");
  } else if (signUpData.session) {
    console.log("✓ Admin created and ready (email confirmation is off).");
  } else {
    console.log("✓ Admin sign-up accepted.");
  }

  // 2. Verify we can actually log in (catches the "email not confirmed" case).
  const { error: signInErr } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (signInErr) {
    if (/email not confirmed|not confirmed/i.test(signInErr.message)) {
      console.error(
        "\n⚠ User exists but email is NOT confirmed, so login is blocked.\n" +
          "  Fix it one of these ways:\n" +
          "    a) Supabase Dashboard → Authentication → Providers → Email →\n" +
          "       turn OFF 'Confirm email', then re-run this script, OR\n" +
          "    b) Supabase Dashboard → Authentication → Users → open the user →\n" +
          "       confirm the email there.\n"
      );
      process.exit(1);
    }
    if (/invalid login/i.test(signInErr.message)) {
      console.error(
        "\n✗ The user exists but the password doesn't match.\n" +
          "  Either delete the user in the Dashboard and re-run, or reset the\n" +
          "  password from Authentication → Users.\n"
      );
      process.exit(1);
    }
    console.error("✗ Login check failed:", signInErr.message);
    process.exit(1);
  }

  console.log(
    `\n✓ Done — login verified. Sign in at /admin/login with:\n` +
      `    email:    ${ADMIN_EMAIL}\n` +
      `    password: ${ADMIN_PASSWORD}\n`
  );
  process.exit(0);
}

main();
