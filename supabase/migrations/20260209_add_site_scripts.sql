create table if not exists public.site_scripts (
  id uuid primary key default gen_random_uuid(),
  head_scripts text default '',
  body_scripts text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_scripts_updated_at on public.site_scripts;
create trigger set_site_scripts_updated_at
before update on public.site_scripts
for each row
execute function public.set_updated_at();

alter table public.site_scripts enable row level security;

drop policy if exists "Admins can manage site scripts" on public.site_scripts;
drop policy if exists "Public can read site scripts" on public.site_scripts;

create policy "Admins can manage site scripts"
  on public.site_scripts
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read site scripts"
  on public.site_scripts
  for select
  using (true);
