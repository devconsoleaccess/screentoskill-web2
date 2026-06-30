-- ─────────────────────────────────────────────────────────────────────────────
-- ScreenToSkill — rewards / challenges / notifications schema (reference).
--
-- The mobile app already owns most of these tables. This script is idempotent
-- (CREATE TABLE IF NOT EXISTS / INSERT … ON CONFLICT) so running it against an
-- existing project is safe — it only fills in anything missing. The admin API
-- routes use the SERVICE-ROLE key and therefore bypass RLS; no extra policies
-- are required for the admin panel itself.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) Reward settings — single row, id = 1 ─────────────────────────────────────
create table if not exists public.reward_settings (
  id                    int primary key default 1,
  xp_per_unit           int           not null default 100,
  currency_per_unit     numeric(12,2) not null default 10,
  currency_symbol       text          not null default '₹',
  min_redeem_xp         int           not null default 0,
  is_redemption_enabled boolean       not null default true,
  updated_at            timestamptz   default now()
);
-- Ensure the singleton row exists.
insert into public.reward_settings (id) values (1) on conflict (id) do nothing;

-- 2) Rewards catalog ──────────────────────────────────────────────────────────
create table if not exists public.rewards_catalog (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  icon          text,                       -- Feather icon name
  image_url     text,
  cost_xp       int  not null check (cost_xp > 0),
  reward_type   text not null default 'cash', -- cash | voucher | coupon | custom
  reward_value  numeric(12,2) not null default 0 check (reward_value >= 0),
  stock         int,                          -- null = unlimited
  is_active     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz default now()
);

-- 3) Reward redemptions ───────────────────────────────────────────────────────
create table if not exists public.reward_redemptions (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null,
  reward_id          uuid references public.rewards_catalog(id) on delete set null,
  cost_xp            int  not null,
  reward_value       numeric(12,2),
  status             text not null default 'pending', -- pending|approved|rejected|fulfilled
  redemption_details text,                            -- UPI / email / phone
  admin_note         text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

-- 4) Points ledger + balance (refund target) ──────────────────────────────────
create table if not exists public.point_transactions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null,
  points     int  not null,        -- positive = grant, negative = spend
  reason     text not null,        -- e.g. 'admin_grant'
  meta       jsonb,                -- e.g. { "refund_for": "<redemption_id>" }
  created_at timestamptz default now()
);

create table if not exists public.user_points (
  user_id      uuid primary key,
  total_points int not null default 0
);

-- 5) Challenges ───────────────────────────────────────────────────────────────
create table if not exists public.challenges (
  id          uuid primary key default gen_random_uuid(),
  icon        text,                              -- Feather icon name
  title       text not null,
  description text,
  goal        int  not null default 1 check (goal > 0),
  points      int  not null default 0 check (points >= 0),
  category    text not null default 'learning', -- learning | focus | other
  frequency   text not null default 'daily',    -- one_time | daily
  is_active   boolean not null default true
);

-- 6) Notifications inbox + device tokens ──────────────────────────────────────
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null,
  type       text not null,            -- announcement | promo | reward | system
  title      text not null,
  body       text not null,
  read       boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists public.user_fcm_tokens (
  user_id uuid not null,
  token   text not null,
  primary key (user_id, token)
);

-- NOTE: `profiles` is assumed to already exist (id uuid PK = auth.users.id,
-- plus name / full_name and email columns). The admin routes read it but never
-- create it.
