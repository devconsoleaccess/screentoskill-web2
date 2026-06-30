// lib/rewardsTypes.ts
// Shared types for the rewards admin pages (settings, catalog, redemptions).

export interface RewardSettings {
  id: number;
  xp_per_unit: number;
  currency_per_unit: number;
  currency_symbol: string;
  min_redeem_xp: number;
  is_redemption_enabled: boolean;
  updated_at?: string | null;
}

export type RewardType = "cash" | "voucher" | "coupon" | "custom";

export interface RewardCatalogItem {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  cost_xp: number;
  reward_type: RewardType;
  reward_value: number;
  stock: number | null; // null = unlimited
  is_active: boolean;
  sort_order: number;
  created_at?: string;
}

export type RedemptionStatus = "pending" | "approved" | "rejected" | "fulfilled";

export interface Redemption {
  id: string;
  created_at: string;
  updated_at?: string | null;
  user_id: string;
  reward_id: string | null;
  cost_xp: number;
  reward_value: number | null;
  status: RedemptionStatus;
  // UPI/email/phone — may be a plain string or a JSON object (e.g. { upi_id, … }).
  redemption_details: string | Record<string, unknown> | null;
  admin_note: string | null;
  // joined
  reward?: { title: string | null } | null;
  profile?: { name: string | null; email: string | null } | null;
}

/** Money value of an XP cost, given the conversion settings. */
export function xpToMoney(costXp: number, settings: RewardSettings | null): number {
  if (!settings || !settings.xp_per_unit) return 0;
  return (costXp / settings.xp_per_unit) * settings.currency_per_unit;
}

/** Format a money amount with the configured currency symbol. */
export function formatMoney(amount: number, settings: RewardSettings | null): string {
  const symbol = settings?.currency_symbol ?? "₹";
  return `${symbol}${amount.toFixed(2)}`;
}
