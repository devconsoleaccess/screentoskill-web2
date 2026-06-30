// lib/rewardCatalogValidation.ts
// Server-side normalisation + validation for rewards_catalog rows.
// Shared by the catalog list/create and update/delete route handlers.
import { assert } from "@/lib/adminApi";

const REWARD_TYPES = ["cash", "voucher", "coupon", "custom"];

/**
 * Build a validated column patch from a request body.
 * @param partial when true (edit), only provided fields are validated/included.
 */
export function buildCatalogPatch(body: any, partial = false): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  const has = (k: string) => body[k] !== undefined;

  if (!partial || has("title")) {
    assert(typeof body.title === "string" && body.title.trim(), "Title is required.");
    patch.title = body.title.trim();
  }
  if (!partial || has("cost_xp")) {
    const cost = Number(body.cost_xp);
    assert(Number.isInteger(cost) && cost > 0, "Cost (XP) must be an integer greater than 0.");
    patch.cost_xp = cost;
  }
  if (!partial || has("reward_value")) {
    const val = Number(body.reward_value);
    assert(Number.isFinite(val) && val >= 0, "Reward value must be 0 or more.");
    patch.reward_value = val;
  }
  if (!partial || has("reward_type")) {
    assert(REWARD_TYPES.includes(body.reward_type), "Invalid reward type.");
    patch.reward_type = body.reward_type;
  }
  if (has("description")) patch.description = body.description?.trim() || null;
  if (has("icon")) patch.icon = body.icon?.trim() || null;
  if (has("image_url")) patch.image_url = body.image_url?.trim() || null;
  if (has("stock")) {
    if (body.stock === null || body.stock === "" || body.stock === undefined) {
      patch.stock = null; // blank = unlimited
    } else {
      const stock = Number(body.stock);
      assert(Number.isInteger(stock) && stock >= 0, "Stock must be a non-negative integer (or blank for unlimited).");
      patch.stock = stock;
    }
  }
  if (has("is_active")) patch.is_active = Boolean(body.is_active);
  if (has("sort_order")) {
    const so = Number(body.sort_order);
    assert(Number.isInteger(so), "Sort order must be an integer.");
    patch.sort_order = so;
  }
  return patch;
}
