import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { absoluteUrl } from "../../shared/site";

export function legacyRedirects(articles: { slug: string; path: string }[]) {
  return [
    { from: "/articles", to: "/blog/" },
    { from: "/atom", to: "/atom.xml" },
    ...articles.map(({ slug, path }) => ({
      from: `/articles/${slug}`,
      to: path,
    })),
  ];
}

export function writeStaticRedirects(
  publicDir: string,
  redirects: { from: string; to: string }[],
) {
  for (const { from, to } of redirects) {
    // These values come from our validated manifest, never request input.
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Page moved</title>
<link rel="canonical" href="${absoluteUrl(to)}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head><body><p>This page has moved to <a href="${to}">${to}</a>.</p></body></html>`;
    const output = join(publicDir, from, "index.html");
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, html);
  }
}
