# cmpadden.github.io

A personal website built with Nuxt 4, Vue, and Tailwind CSS. Routes are file-based in `pages/`; reusable layouts and UI live in `layouts/` and `components/`. Blog posts are Markdown files in `content/blog/`, parsed by `modules/content.ts` and served through the generated article API. Server endpoints and feed/sitemap routes are under `server/`.

## Setup

Install dependencies with pnpm:

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

The development site is available at http://localhost:3000.

## Build and static generation

```bash
pnpm build
pnpm generate
pnpm preview
```

## Layout conventions

- `default`: site frame with Header/Footer and a scrollable content region.
- `light`: Header and centered page content, without the default frame/Footer.
- `empty`: no shared chrome, for standalone experiences.

Page-specific layout selection uses `definePageMeta({ layout: "light" })` or `layout: "empty"`.
