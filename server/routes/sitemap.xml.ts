import { SitemapStream, streamToPromise } from "sitemap";
import { queryCollection } from "#imports";
import { SITE_ORIGIN } from "~/utils/seo";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/talks",
  "/playground",
  "/playground/audio",
  "/playground/chords",
  "/playground/conway",
  "/playground/french",
  "/playground/matrix",
  "/playground/metronome",
  "/playground/midi",
  "/playground/palettes/mountains",
  "/playground/palettes/variance",
  "/playground/plotter",
  "/playground/stl-model-render",
  "/playground/tabs-garden",
  "/playground/tiling",
  "/playground/waves",
];

export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, "content").all();

  const sitemap = new SitemapStream({ hostname: SITE_ORIGIN });

  STATIC_ROUTES.forEach((url) => sitemap.write({ url }));

  // Dynamically generate routes for Nuxt markdown content. Drafts and
  // external summaries should not be advertised as canonical crawl targets.
  articles
    .filter((a: any) => !a.draft && !a.external_url)
    .forEach((article) =>
      sitemap.write({
        url: article.path,
        changefreq: "monthly",
        lastmod: article.date
          ? new Date(article.date).toISOString()
          : undefined,
      }),
    );
  sitemap.end();

  return await streamToPromise(sitemap);
});
