# Supabase CMS Setup

## 1) Apply schema + RLS
Run the SQL in `supabase/schema.sql` inside Supabase SQL Editor.

## 1.1) If updating existing DB
Run these migrations in SQL Editor when adding new fields later:
- `supabase/migrations/20240915_add_article_category_color.sql`
- `supabase/migrations/20240915_add_article_categories.sql`
- `supabase/migrations/20240915_add_article_categories_table.sql`

## 2) Create admin user
- The SQL seeds `6cat.por@gmail.com` into `admin_users`.
- Create the Auth user with email+password in Supabase Auth (or sign up via `/admin`).

## 3) Configure environment variables
Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 4) Install dependencies
```
npm install
```

## 5) Run the app
```
npm run dev
```

## Notes
- Images are stored in the `cms-public` bucket (public read, admin-only write).
- Articles and services are protected by RLS and only allowlisted admins can write.
