-- ============================================================
--  GLOMA INTERNATIONAL — Database setup
--  Paste this whole file into Supabase → SQL Editor → Run.
--  Safe to run more than once.
-- ============================================================

-- ---------- 1. SITE SETTINGS (one row: social links + stats) ----------
create table if not exists site_settings (
  id int primary key default 1,
  facebook_url text default '',
  instagram_url text default '',
  youtube_url text default '',
  tiktok_url text default '',
  whatsapp_url text default '',
  stat_years int default 5,
  stat_projects int default 200,
  stat_team int default 25,
  stat_satisfaction int default 98,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

-- ---------- 2. WORKS (portfolio projects) ----------
create table if not exists works (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default '',
  description text default '',
  image_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- 3. VIDEOS ----------
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  video_url text default '',       -- YouTube/Facebook embed link OR uploaded file link
  thumbnail_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- 4. TESTIMONIALS ----------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default '',
  quote text not null,
  avatar_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- 5. CAMPAIGNS (case studies) ----------
create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  result text default '',
  description text default '',
  metrics jsonb default '[]'::jsonb,   -- e.g. [{"num":"2M+","label":"Reach"}]
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
--  SECURITY (Row Level Security)
--  Rule: EVERYONE can READ. Only LOGGED-IN admin can CHANGE.
-- ============================================================
alter table site_settings enable row level security;
alter table works         enable row level security;
alter table videos        enable row level security;
alter table testimonials  enable row level security;
alter table campaigns     enable row level security;

do $$
declare t text;
begin
  foreach t in array array['site_settings','works','videos','testimonials','campaigns']
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

-- ============================================================
--  STORAGE (a public bucket called "media" for images/videos)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read"  on storage.objects;
drop policy if exists "media admin insert" on storage.objects;
drop policy if exists "media admin update" on storage.objects;
drop policy if exists "media admin delete" on storage.objects;

create policy "media public read"  on storage.objects for select using (bucket_id = 'media');
create policy "media admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "media admin update" on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'media');

-- ============================================================
--  DONE!  ✅
-- ============================================================
