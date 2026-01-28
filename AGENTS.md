# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains the Next.js App Router routes, including preview and admin pages.
- `components/` holds shared UI components used across routes.
- `lib/` contains data access and utility logic (Supabase client, helpers).
- `styles/` is for global styles or CSS modules.
- `public/` stores static assets (images, icons).
- `supabase/` keeps schema and migrations referenced in `SUPABASE_SETUP.md`.
- `legacy/` preserves older pages and content; avoid editing unless needed.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the local Next.js dev server.
- `npm run build` builds the production bundle.
- `npm run start` runs the production server after a build.

There are no scripted lint or test commands in `package.json`.

## Coding Style & Naming Conventions
- JavaScript/JSX is the dominant language; follow existing file conventions.
- Indentation: 2 spaces (match current files).
- Components use PascalCase filenames (for example, `components/Hero.jsx`).
- Route segments and folders in `app/` use lowercase with brackets for dynamic routes (for example, `app/preview/articles/[slug]/page.jsx`).
- No formatter is configured; keep diffs minimal and aligned with nearby code.

## Testing Guidelines
- No automated test framework is configured in this repo.
- When changing UI or data flow, do a quick manual check in the browser and verify key routes (for example, `/`, `/services`, `/admin`).

## Commit & Pull Request Guidelines
- Recent commit messages follow short, imperative sentences (for example, "Update services pagination and templates").
- Keep commits focused; describe what changed and why.
- PRs should include a concise summary, screenshots for UI changes, and any setup or environment notes.

## Security & Configuration Tips
- Use `.env.local` for Supabase credentials as described in `SUPABASE_SETUP.md`.
- Do not commit real secrets; supply them through local env files or deployment settings.
