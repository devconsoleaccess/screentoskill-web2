// lib/challengeValidation.ts
// Server-side normalisation + validation for `challenges` rows.
import { assert } from "@/lib/adminApi";

const CATEGORIES = ["learning", "focus", "other"];
const FREQUENCIES = ["one_time", "daily"];

export function buildChallengePatch(body: any, partial = false): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  const has = (k: string) => body[k] !== undefined;

  if (!partial || has("title")) {
    assert(typeof body.title === "string" && body.title.trim(), "Title is required.");
    patch.title = body.title.trim();
  }
  if (!partial || has("goal")) {
    const goal = Number(body.goal);
    assert(Number.isInteger(goal) && goal > 0, "Goal must be an integer greater than 0.");
    patch.goal = goal;
  }
  if (!partial || has("points")) {
    const points = Number(body.points);
    assert(Number.isInteger(points) && points >= 0, "Points must be a non-negative integer.");
    patch.points = points;
  }
  if (!partial || has("category")) {
    assert(CATEGORIES.includes(body.category), "Invalid category.");
    patch.category = body.category;
  }
  if (!partial || has("frequency")) {
    assert(FREQUENCIES.includes(body.frequency), "Invalid frequency.");
    patch.frequency = body.frequency;
  }
  if (has("icon")) patch.icon = body.icon?.trim() || null;
  if (has("description")) patch.description = body.description?.trim() || null;
  if (has("is_active")) patch.is_active = Boolean(body.is_active);

  return patch;
}
