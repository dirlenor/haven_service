create table if not exists public.article_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  color text not null default '#d46211',
  created_at timestamptz not null default now()
);

alter table public.article_categories enable row level security;

create policy "Admins can manage article categories"
  on public.article_categories
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read article categories"
  on public.article_categories
  for select
  using (true);
