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

## Experiment thumbnails

Experiment thumbnail context and output paths live in `data/experiments.mjs`. Generate an image from that metadata with an optional art-direction adjustment:

```bash
OPENAI_API_KEY=... pnpm generate:experiment-thumbnail -- \
  --experiment "photos.colton.boo" \
  --direction "make the exposure bands diagonal and sparse"
```

Use `--dry-run` to review the resolved prompt without calling the OpenAI Images API. After changing a source thumbnail while the dev server is already running, run `pnpm images:generate` to refresh its derivatives.

The responsive pipeline generates square 320/640/960 WebP variants, with a 100 kB per-variant ceiling. Components declare `srcset`/`sizes`, reserve layout space, and remain visible without JavaScript. Only the first thumbnail is eager; article/experiment links prefetch on interaction rather than visibility.

## Layout conventions

- `default`: fixed decorative frame with Header and **document scrolling**, allowing Nuxt to reset routes, restore back/forward positions, and navigate anchors.
- `light`: Header and centered page content, without the default frame.
- `empty`: no shared chrome, for standalone experiences.

Page-specific layout selection uses `definePageMeta({ layout: "light" })` or `layout: "empty"`.
