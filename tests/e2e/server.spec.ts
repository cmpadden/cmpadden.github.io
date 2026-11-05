import { test, expect } from "@playwright/test";
import { loadArticleSources } from "../../modules/content/manifest";

test("Nitro returns 404 for missing and draft articles, including HTML requests", async ({
  request,
}) => {
  const drafts = loadArticleSources(process.cwd(), true).filter(
    (a) => a.frontmatter.draft,
  );
  for (const slug of ["does-not-exist", ...drafts.map((a) => a.slug)]) {
    expect((await request.get(`/api/articles/${slug}`)).status()).toBe(404);
    const html = await request.get(`/blog/${slug}/`);
    expect(html.status()).toBe(404);
    expect(await html.text()).toContain("Page not found");
  }
});

test("article summaries are limited and exclude full bodies and excerpts", async ({
  request,
}) => {
  const response = await request.get("/api/articles?limit=5");
  expect(response.ok()).toBeTruthy();
  const articles = await response.json();
  expect(articles).toHaveLength(5);
  for (const article of articles) {
    expect(article).not.toHaveProperty("document");
    expect(article).not.toHaveProperty("excerpt");
    expect(article.path).toMatch(/\/$/);
  }
  expect((await request.get("/api/articles?limit=-1")).status()).toBe(400);
});

test("server redirects and XML MIME types are correct", async ({ request }) => {
  for (const [from, to] of [
    ["/articles/", "/blog/"],
    ["/articles/nuxt-v3-migration/", "/blog/nuxt-v3-migration/"],
    ["/atom/", "/atom.xml"],
  ]) {
    const response = await request.get(from!, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe(to);
  }
  expect((await request.get("/atom.xml")).headers()["content-type"]).toContain(
    "application/atom+xml",
  );
  expect(
    (await request.get("/robots.txt")).headers()["content-type"],
  ).toContain("text/plain");
});
