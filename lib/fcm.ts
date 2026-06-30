// lib/fcm.ts
// ─────────────────────────────────────────────────────────────────────────────
// Minimal Firebase Cloud Messaging HTTP v1 sender. Server-ONLY.
//
// We avoid pulling in firebase-admin: we mint a short-lived Google OAuth2 access
// token directly from the service-account JSON (a JWT signed with the account's
// private key, RS256), then POST to the FCM v1 endpoint. Zero extra deps.
//
// Config — set ONE of these in .env.local:
//   FIREBASE_SERVICE_ACCOUNT       = the raw service-account JSON, or
//   FIREBASE_SERVICE_ACCOUNT_BASE64 = the same JSON, base64-encoded (handy for
//                                     one-line env vars / hosting dashboards).
// ─────────────────────────────────────────────────────────────────────────────
import crypto from "crypto";

interface ServiceAccount {
  project_id: string;
  client_email: string;
  private_key: string;
}

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const FCM_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";

let cachedAccount: ServiceAccount | null = null;
let cachedToken: { value: string; expiresAt: number } | null = null;

function loadServiceAccount(): ServiceAccount {
  if (cachedAccount) return cachedAccount;

  const raw =
    process.env.FIREBASE_SERVICE_ACCOUNT ||
    (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
      ? Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8")
      : "");

  if (!raw) {
    throw new Error(
      "Firebase service account not configured. Set FIREBASE_SERVICE_ACCOUNT (or _BASE64) in .env.local."
    );
  }

  let parsed: ServiceAccount;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is not valid JSON.");
  }
  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    throw new Error("Service account JSON is missing project_id / client_email / private_key.");
  }
  // .env files commonly store the key with literal "\n" — normalise to newlines.
  parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  cachedAccount = parsed;
  return parsed;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/** Mint (and cache) an OAuth2 access token for the FCM scope. */
async function getAccessToken(account: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt - 60 > now) return cachedToken.value;

  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: account.client_email,
      scope: FCM_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signingInput = `${header}.${claims}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(signingInput)
    .sign(account.private_key);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) {
    throw new Error(`Could not obtain FCM access token: ${json.error_description || json.error || res.status}`);
  }

  cachedToken = { value: json.access_token, expiresAt: now + (json.expires_in ?? 3600) };
  return cachedToken.value;
}

export interface FcmMessage {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface FcmSendResult {
  sent: number;
  failed: number;
  invalidTokens: string[]; // tokens FCM reports as unregistered — safe to delete
}

/**
 * Send a notification to many device tokens. Returns counts plus the list of
 * tokens FCM rejected as unregistered/invalid (so the caller can prune them).
 * Sends are issued concurrently in capped batches.
 */
export async function sendFcmToTokens(
  tokens: string[],
  message: FcmMessage
): Promise<FcmSendResult> {
  const result: FcmSendResult = { sent: 0, failed: 0, invalidTokens: [] };
  const unique = Array.from(new Set(tokens.filter(Boolean)));
  if (unique.length === 0) return result;

  const account = loadServiceAccount();
  const accessToken = await getAccessToken(account);
  const endpoint = `https://fcm.googleapis.com/v1/projects/${account.project_id}/messages:send`;

  const sendOne = async (token: string) => {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token,
            notification: { title: message.title, body: message.body },
            data: message.data ?? {},
          },
        }),
      });
      if (res.ok) {
        result.sent++;
        return;
      }
      result.failed++;
      const err = await res.json().catch(() => ({}));
      const status = err?.error?.details?.[0]?.errorCode || err?.error?.status;
      if (status === "UNREGISTERED" || status === "INVALID_ARGUMENT" || res.status === 404) {
        result.invalidTokens.push(token);
      }
    } catch {
      result.failed++;
    }
  };

  // Cap concurrency so a large audience doesn't open thousands of sockets at once.
  const BATCH = 50;
  for (let i = 0; i < unique.length; i += BATCH) {
    await Promise.all(unique.slice(i, i + BATCH).map(sendOne));
  }
  return result;
}
