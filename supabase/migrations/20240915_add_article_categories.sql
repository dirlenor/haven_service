alter table public.articles
  add column if not exists categories text[] not null default '{}',
  add column if not exists category_colors text[] not null default '{}';
