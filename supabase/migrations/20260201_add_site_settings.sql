create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  contact_form_endpoint text default '',
  contact_form_success_message text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "Admins can manage site settings" on public.site_settings;
drop policy if exists "Public can read site settings" on public.site_settings;

create policy "Admins can manage site settings"
  on public.site_settings
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read site settings"
  on public.site_settings
  for select
  using (true);
