-- ============================================================
--  GLOMA — Upgrade 2: portfolio works + clients + platforms
--  Paste into Supabase → SQL Editor → Run.  Safe to re-run.
-- ============================================================

-- ---------- WORKS: add type + carousel images ----------
alter table works add column if not exists media_type text default 'graphic'; -- 'reel' | 'ad' | 'graphic'
alter table works add column if not exists images jsonb default '[]'::jsonb;   -- list of image URLs (for carousels)

-- ---------- TRUSTED CLIENTS (logos) ----------
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text default '',
  website text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- PLATFORMS WE WORK ON ----------
create table if not exists platforms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text default '',
  description text default '',
  url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- SECURITY for the new tables ----------
alter table clients   enable row level security;
alter table platforms enable row level security;

do $$
declare t text;
begin
  foreach t in array array['clients','platforms']
  loop
    execute format('drop policy if exists "public read" on %I', t);
    execute format('drop policy if exists "admin insert" on %I', t);
    execute format('drop policy if exists "admin update" on %I', t);
    execute format('drop policy if exists "admin delete" on %I', t);

    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('create policy "admin insert" on %I for insert to authenticated with check (true)', t);
    execute format('create policy "admin update" on %I for update to authenticated using (true)', t);
    execute format('create policy "admin delete" on %I for delete to authenticated using (true)', t);
  end loop;
end $$;

-- DONE ✅
