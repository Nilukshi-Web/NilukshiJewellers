# NILUKSHI Jewellers

A jewellery showcase and content management site built with [Payload CMS](https://payloadcms.com) 3 and [Next.js](https://nextjs.org) (App Router). Payload's admin panel and the public-facing storefront run as a single Next.js application.

> Looking for a non-technical, "how do I change X on the website" guide? See **[CMS-GUIDE.md](./CMS-GUIDE.md)**. This README is for developers working on the codebase.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **CMS / backend:** Payload CMS 3, served from the same Next.js app
- **Database:** Postgres, via `@payloadcms/db-vercel-postgres`
- **Rich text:** Lexical editor (`@payloadcms/richtext-lexical`)
- **Styling:** Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com/) components
- **File storage:** Local disk by default, AWS S3 (optionally fronted by a CDN) when configured
- **Testing:** Vitest (integration) + Playwright (end-to-end)

## Project structure

```txt
src/
├── app/
│   ├── (frontend)/         # Public website (Next.js routes, rendered by React Server Components)
│   │   ├── page.tsx        # Homepage
│   │   ├── [slug]/         # Dynamic pages (About, Contact, Jewellery, Gems, Silver, Custom, etc.)
│   │   ├── products/       # Product detail pages
│   │   ├── posts/          # Blog
│   │   ├── search/         # Search page
│   │   ├── next/           # Draft preview, live preview & sitemap-adjacent route handlers
│   │   └── (sitemaps)/     # pages/posts/products sitemap.xml routes
│   └── (payload)/          # Payload admin panel + REST/GraphQL API routes
│       ├── admin/          # /admin UI
│       └── api/            # /api/[...slug], /api/graphql, /api/graphql-playground
├── collections/            # Payload collection configs (see below)
├── Header/, Footer/, SiteSettings/   # Payload globals (site-wide singletons)
├── blocks/                 # Layout-builder blocks used by Pages/Posts and their React renderers
├── heros/                  # Hero section variants (High/Medium/Low impact, PostHero)
├── components/             # Shared React components (UI, product card, media, pagination, etc.)
├── access/                 # Reusable Payload access-control functions
├── fields/                 # Reusable field configs (e.g. default Lexical editor config)
├── hooks/                  # Cross-collection hooks (e.g. revalidation, redirects)
├── endpoints/seed/         # Database seed data + seed endpoint
├── plugins/                # Payload plugin registration (index.ts)
├── providers/              # React context providers (theme, header theme)
├── search/                 # Search plugin field overrides / sync
├── utilities/              # Small helpers (URL building, CDN URL rewriting, etc.)
└── payload.config.ts       # Main Payload configuration
```

## Data model

### Collections

| Collection | Purpose |
| --- | --- |
| `users` | Admin/editor accounts with access to the admin panel. |
| `pages` | Layout-builder pages (Home, About, Contact, Jewellery, Gems, Silver, Custom, etc.). Draft + live preview enabled. |
| `posts` | Blog posts. Layout-builder + draft/live preview enabled, related to `categories` and `users` (authors). |
| `products` | Jewellery/gem/silver/custom-commission products. Belongs to a `section` (`jewellery`, `gems`, `silver`, `custom`), optionally a `metal`, and a `product-categories` entry filtered by section. Includes images, price, availability, "featured" flag, description, story text, and an orderable specifications list. |
| `product-categories` | Filter-tab categories for products, scoped to a `section`. |
| `metals` | Metal tone tabs for jewellery (e.g. Yellow/White/Rose Gold), with a name, swatch color, and display order. |
| `categories` | Taxonomy for blog posts (nested docs plugin enabled). |
| `media` | Uploads (images/video) used across pages, posts, and products; supports focal point and image resizing. |

### Globals

| Global | Purpose |
| --- | --- |
| `Header` | Site brand name/tagline, top bar text, and navigation items (including the jewellery mega menu toggle). |
| `Footer` | Footer blurb, column headings, copyright text, and extra nav links. |
| `SiteSettings` | Site-wide contact details (WhatsApp, phone, email, opening hours, address, social links) and templated WhatsApp prefilled messages (general/product/custom). |

### Layout blocks

Pages and posts are built from blocks in `src/blocks/`: `HeroCarousel`, `MetalShowcase`, `FeaturedProducts`, `PromoStrip`, `ProductCatalog`, `CustomCommission`, `ContactChannels`, `Content`, `MediaBlock`, `CallToAction`, `ArchiveBlock`, `RelatedPosts`, `Code`, and `Form` (with per-field-type subcomponents under `blocks/Form/`).

### Plugins (`src/plugins/index.ts`)

- `@payloadcms/plugin-redirects` — manages redirects for `pages`/`posts`, revalidating on change.
- `@payloadcms/plugin-nested-docs` — nested category hierarchies.
- `@payloadcms/plugin-seo` — per-document SEO fields with generated titles/URLs.
- `@payloadcms/plugin-form-builder` — configurable forms (contact, custom enquiry) with submissions.
- `@payloadcms/storage-s3` — enabled automatically when `S3_BUCKET` is set; serves media directly from a CDN when `S3_CDN_URL` is also set.
- `@payloadcms/plugin-search` — search index synced from `posts`.

## Access control

Defined in `src/access/`:

- `anyone` — public read access.
- `authenticated` — requires a logged-in user (used for create/update/delete on most collections).
- `authenticatedOrPublished` — public read access to published documents, full access for logged-in users (used for draft-enabled collections like `pages`/`posts`).

## Environment variables

Copy `.env.example` to `.env` and fill in the required values:

| Variable | Required | Purpose |
| --- | --- | --- |
| `POSTGRES_URL` | Yes | Postgres connection string used by `payload.config.ts` (the `db-vercel-postgres` adapter). `.env.example` shows `DATABASE_URL`/Mongo-style examples from the upstream template — this project uses `POSTGRES_URL`. |
| `PAYLOAD_SECRET` | Yes | Secret used to sign/encrypt JWTs. |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Canonical site URL, used for CORS, SEO, and absolute link generation. |
| `PREVIEW_SECRET` | Yes | Secret used to validate draft/live preview requests. |
| `CRON_SECRET` | For scheduled publishing | Authenticates the Vercel cron job that runs the Payload jobs queue. |
| `VERCEL_PROJECT_PRODUCTION_URL` | Optional | Fallback for `NEXT_PUBLIC_SERVER_URL` when deployed on Vercel (used by sitemap routes and `getURL`). |
| `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Optional | Enables the S3 storage plugin for media uploads. Without these, uploads are stored on local disk. |
| `S3_CDN_URL` | Optional | When set alongside S3 config, media is served directly from this CDN (e.g. a CloudFront domain) instead of proxied through Payload. |

## Quick start

```bash
cp .env.example .env      # then fill in the values above
pnpm install
pnpm dev
```

Open `http://localhost:3000` for the website, or `http://localhost:3000/admin` for the admin panel. Follow the on-screen instructions to create your first admin user.

### Seeding

From the admin dashboard, click "seed database" (see `src/endpoints/seed/`), or run:

```bash
pnpm seed
```

> Seeding is destructive — it drops existing content to populate demo pages, posts, products, and settings.

### Renaming the brand

`scripts/rename-brand.ts` is a one-off migration that rewrites brand strings already stored in the database's `Header`/`Footer`/`SiteSettings` globals (useful after changing the seed data's brand name). Run with:

```bash
pnpm payload run scripts/rename-brand.ts
```

## Available scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server. |
| `pnpm build` | Production build (also runs `next-sitemap` via `postbuild`). |
| `pnpm start` | Serve the production build. |
| `pnpm dev:prod` | Clean build + start, to sanity-check a production build locally. |
| `pnpm generate:types` | Regenerate `payload-types.ts` from the current Payload config. Run after changing collections/globals/fields. |
| `pnpm generate:importmap` | Regenerate the admin panel's import map (`src/app/(payload)/admin/importMap.js`). |
| `pnpm payload` | Run arbitrary Payload CLI commands (e.g. `pnpm payload migrate`). |
| `pnpm seed` | Seed the database with demo content. |
| `pnpm lint` / `pnpm lint:fix` | Lint (and auto-fix) the codebase with ESLint. |
| `pnpm test` | Run integration then end-to-end tests. |
| `pnpm test:int` | Vitest integration tests (`tests/int/`). |
| `pnpm test:e2e` | Playwright end-to-end tests (`tests/e2e/`), covering the frontend and admin panel. |

## Database migrations (Postgres)

This project uses Postgres, which requires schema migrations for production changes (local development can use schema push instead):

```bash
pnpm payload migrate:create   # create a migration after changing collections/fields
pnpm payload migrate          # apply pending migrations (run before `pnpm start` in production)
```

## Testing

- **Integration tests** (`tests/int/`) hit the Payload Local API directly via Vitest — see `vitest.config.mts`.
- **End-to-end tests** (`tests/e2e/`) drive the running app with Playwright, covering both the public frontend and the admin panel — see `playwright.config.ts`.
- Shared test helpers (login, seeding a user) live in `tests/helpers/`.

## Content workflows

- **Drafts & versions:** `pages` and `posts` use Payload's `versions.drafts` so content can be saved privately and previewed before publishing.
- **Live preview:** the admin panel embeds a live preview (`admin.livePreview` in `payload.config.ts`) at mobile/tablet/desktop breakpoints.
- **On-demand revalidation:** `afterChange`/`afterDelete` hooks (see `hooks/` and each collection's `hooks/` folder, e.g. `collections/Products/hooks/revalidateProduct.ts`) trigger Next.js revalidation when published content changes.
- **Redirects:** managed via the `redirects` plugin/collection for `pages` and `posts`.
- **Scheduled publishing:** uses Payload's jobs queue (see `jobs` config in `payload.config.ts`), authenticated either by a logged-in user or the `CRON_SECRET` bearer token (for Vercel cron).
- **SEO & search:** SEO fields are added to relevant collections via the SEO plugin; a search index is synced from `posts` via the search plugin.

## Deployment

The app can be deployed anywhere Next.js runs. On Vercel, use the `db-vercel-postgres` adapter (already configured) with `POSTGRES_URL` set, and optionally the S3 plugin for media storage/CDN. Before going live in production:

1. `pnpm build`
2. `pnpm payload migrate` (apply any pending Postgres migrations)
3. `pnpm start`

## Further reading

- [CMS-GUIDE.md](./CMS-GUIDE.md) — non-technical content-editing guide for site managers.
- [.claude/skills/payload/](./.claude/skills/payload/) — Payload CMS reference used by Claude Code when working in this repo.
- [Payload docs](https://payloadcms.com/docs)
- [Next.js docs](https://nextjs.org/docs)
