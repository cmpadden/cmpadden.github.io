# cmpadden.github.io

A personal website built with Nuxt 4, Vue, and Tailwind CSS. Routes are file-based in `pages/`; reusable layouts and UI live in `layouts/` and `components/`. Blog posts are Markdown files in `content/blog/`, parsed by `modules/content.ts` and served through the generated article API. Server endpoints and feed/sitemap routes are under `server/`. Public types and site/route metadata live in `shared/`. The existing root-level Nuxt app structure is intentional; moving it under `app/` is optional organization, not a performance optimization.

## Setup

Install dependencies with pnpm:

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

The development site is available at http://localhost:3000. Drafts are excluded by default. To preview a draft by its slug locally, explicitly opt in:

```bash
NUXT_PREVIEW_DRAFTS=1 pnpm dev
```

Production builds always omit drafts, even if this environment variable is set. `modules/content/manifest.ts` validates frontmatter and owns publication policy; prerender routes, article APIs, feeds, sitemap, and legacy redirects all use it. `shared/site.ts` is the source of truth for the production origin and static page routes.

## Build and static generation

```bash
pnpm build
pnpm generate
pnpm preview
```

Build, generate, and dev automatically create responsive image derivatives in `public/images/generated/` (ignored by Git). GitHub Pages deploys `.output/public`; it does not run a Nitro server. Legacy `/articles/…` and `/atom/` URLs therefore have generated HTML redirects as well as Nitro HTTP redirects. The feed is `/atom.xml` so static hosting serves it as XML. Robots and sitemap are generated from shared site metadata.

## Validation

```bash
pnpm typecheck
pnpm test                                  # publication/SEO unit tests
pnpm exec playwright install chromium      # once locally
pnpm build
pnpm test:e2e --project=server              # production Nitro + browser/API tests
pnpm generate
pnpm test:output                           # generated publication/asset assertions
pnpm test:e2e --project=static              # real static hosting, without SPA fallback
```

CI runs this sequence on pull requests and main; only a successful main build is deployed. Browser tests mock audio/MIDI devices to check cleanup, pending permissions, and hot-plugging without requiring hardware. Real-device behavior should still be smoke-tested when changing the experiments.
