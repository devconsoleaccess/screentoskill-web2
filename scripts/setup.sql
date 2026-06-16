-- ─────────────────────────────────────────────────────────────────────────────
-- ScreenToSkill admin setup
-- Run this once in the Supabase Dashboard → SQL Editor → New query → Run.
-- It fixes the empty users list in the admin panel and provisions the audio
-- storage bucket used for question MP3 uploads.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) USERS TABLE ACCESS ───────────────────────────────────────────────────────
-- The admin panel now signs in, so it queries as the `authenticated` role.
-- Previously only `anon` could read, which is why the list came back empty.

alter table public.users enable row level security;

-- Anonymous visitors may still register (insert) from the public form.
drop policy if exists "Public can register" on public.users;
create policy "Public can register"
  on public.users
  for insert
  to anon
  with check (true);

-- Logged-in admins can read all registrations.
drop policy if exists "Authenticated can read users" on public.users;
create policy "Authenticated can read users"
  on public.users
  for select
  to authenticated
  using (true);

-- OPTIONAL HARDENING (recommended):
-- Stop the public anon key from reading registrant PII. Only enable this once
-- your live site is using the new (logged-in) admin panel. Uncomment to apply:
--
-- drop policy if exists "Anon can read users" on public.users;


-- 2) QUESTION AUDIO STORAGE BUCKET ────────────────────────────────────────────
-- Public-read bucket for question MP3s (so uploaded clips can be played back).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'question-audio',
  'question-audio',
  true,
  10485760,                                -- 10 MB max per file
  array['audio/mpeg', 'audio/mp3']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Anyone can play (read) the audio files.
drop policy if exists "Public read question-audio" on storage.objects;
create policy "Public read question-audio"
  on storage.objects
  for select
  using (bucket_id = 'question-audio');

-- Logged-in admins can upload / replace / delete audio.
drop policy if exists "Admins manage question-audio" on storage.objects;
create policy "Admins manage question-audio"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'question-audio')
  with check (bucket_id = 'question-audio');
