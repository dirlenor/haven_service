-- Schema + RLS for Thai Haven Service CMS (run in Supabase SQL editor)

create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null default '',
  summary text default '',
  hero_image text default '',
  category text default '',
  category_color text default '',
  categories text[] not null default '{}',
  category_colors text[] not null default '{}',
  date date,
  content_html text,
  cta_title text,
  cta_body text,
  cta_button_label text,
  cta_button_href text,
  meta_keywords text default '',
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_date_idx on public.articles (date);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null default '',
  summary text default '',
  hero_image text default '',
  content text,
  sections jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.article_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  color text not null default '#d46211',
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  contact_form_endpoint text default '',
  contact_form_success_message text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_articles_updated_at on public.articles;
create trigger set_articles_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.email = (auth.jwt() ->> 'email')
  );
$$;

alter table public.admin_users enable row level security;
alter table public.articles enable row level security;
alter table public.services enable row level security;
alter table public.article_categories enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Admins can manage admin_users" on public.admin_users;
drop policy if exists "Admins can manage articles" on public.articles;
drop policy if exists "Public can read published articles" on public.articles;
drop policy if exists "Admins can manage services" on public.services;
drop policy if exists "Public can read published services" on public.services;
drop policy if exists "Admins can manage site settings" on public.site_settings;
drop policy if exists "Public can read site settings" on public.site_settings;

create policy "Admins can manage admin_users"
  on public.admin_users
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can manage articles"
  on public.articles
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read published articles"
  on public.articles
  for select
  using (status = 'published');

create policy "Admins can manage services"
  on public.services
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read published services"
  on public.services
  for select
  using (status = 'published');

create policy "Admins can manage article categories"
  on public.article_categories
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read article categories"
  on public.article_categories
  for select
  using (true);

create policy "Admins can manage site settings"
  on public.site_settings
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read site settings"
  on public.site_settings
  for select
  using (true);

-- Storage bucket for CMS images (storage.objects RLS is already enabled by Supabase)
insert into storage.buckets (id, name, public)
values ('cms-public', 'cms-public', true)
on conflict (id) do nothing;

drop policy if exists "Public read cms-public" on storage.objects;
drop policy if exists "Admin upload cms-public" on storage.objects;
drop policy if exists "Admin update cms-public" on storage.objects;
drop policy if exists "Admin delete cms-public" on storage.objects;

create policy "Public read cms-public"
  on storage.objects
  for select
  using (bucket_id = 'cms-public');

create policy "Admin upload cms-public"
  on storage.objects
  for insert
  with check (bucket_id = 'cms-public' and public.is_admin());

create policy "Admin update cms-public"
  on storage.objects
  for update
  using (bucket_id = 'cms-public' and public.is_admin())
  with check (bucket_id = 'cms-public' and public.is_admin());

create policy "Admin delete cms-public"
  on storage.objects
  for delete
  using (bucket_id = 'cms-public' and public.is_admin());

-- Seed allowlisted admin email
insert into public.admin_users (email)
values ('6cat.por@gmail.com')
on conflict (email) do nothing;
