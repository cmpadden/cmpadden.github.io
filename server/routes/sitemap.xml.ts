import { SitemapStream, streamToPromise } from "sitemap";
import { getAllBlogArticles } from "#content/articles";
import { PAGE_ROUTES, SITE_ORIGIN } from "../../shared/site";

export default defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  const articles = getAllBlogArticles();

  const sitemap = new SitemapStream({ hostname: SITE_ORIGIN });

  PAGE_ROUTES.forEach((url) => sitemap.write({ url }));

  // Dynamically generate routes for Nuxt markdown content. Drafts and
  // external summaries should not be advertised as canonical crawl targets.
  articles
    .filter((a) => !a.external_url)
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
