alter table public.articles
  add column if not exists category_color text default '';
