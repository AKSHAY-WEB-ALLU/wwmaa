-- WWMAA shared state table. Run in Supabase SQL Editor after planning
-- the Supabase Auth migration for WWMAA accounts.
-- This table stores association data; RLS prevents anonymous access.
create table if not exists public.wwmaa_live_state (
  state_key text primary key check (state_key = 'association'),
  payload jsonb not null default '{}'::jsonb,
  updated_by uuid not null references auth.users(id),
  updated_at timestamptz not null default now()
);

alter table public.wwmaa_live_state enable row level security;

-- Signed-in users can read shared state. If you need dojo/role-specific
-- restrictions, replace this policy with a membership-table policy.
drop policy if exists "authenticated members can read WWMAA state" on public.wwmaa_live_state;
create policy "authenticated members can read WWMAA state"
  on public.wwmaa_live_state
  for select
  to authenticated
  using (true);

-- Only authenticated users may write. For production, restrict writes to
-- authorized association administrators using a secure membership/role table.
drop policy if exists "authenticated users can write WWMAA state" on public.wwmaa_live_state;
create policy "authenticated users can write WWMAA state"
  on public.wwmaa_live_state
  for insert
  to authenticated
  with check (auth.uid() = updated_by);

drop policy if exists "authenticated users can update WWMAA state" on public.wwmaa_live_state;
create policy "authenticated users can update WWMAA state"
  on public.wwmaa_live_state
  for update
  to authenticated
  using (true)
  with check (auth.uid() = updated_by);

-- Supabase Realtime must publish this table.
do $$
begin
  alter publication supabase_realtime add table public.wwmaa_live_state;
exception when duplicate_object then
  null;
end $$;
