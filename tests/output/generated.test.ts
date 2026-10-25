import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadArticleSources } from "../../modules/content/manifest";
import { PAGE_ROUTES, absoluteUrl } from "../../shared/site";

const output = ".output/public";
const read = (path: string) => readFileSync(join(output, path), "utf8");

test("all public routes and published articles have HTML and current canonicals", () => {
  for (const path of [
    ...PAGE_ROUTES,
    ...loadArticleSources(process.cwd()).map((a) => a.path),
  ]) {
    const html = read(`${path}/index.html`);
    assert.ok(html.includes('<link rel="canonical" href='), path);
    if (!html.includes('name="robots" content="noindex,follow"')) {
      assert.ok(html.includes(`href="${absoluteUrl(path)}"`), path);
    }
    assert.ok(
      !html.includes('rel="canonical" href="https://cmpadden.github.io'),
      path,
    );
  }
});

test("drafts leave no HTML, payload, legacy redirect, or serialized body in the output", () => {
  const drafts = loadArticleSources(process.cwd(), true).filter(
    (a) => a.frontmatter.draft,
  );
  const files = readdirSync(output, { recursive: true }).filter((p) =>
    /\.(?:html|json|xml)$/.test(String(p)),
  );
  for (const draft of drafts) {
    assert.ok(!existsSync(join(output, "blog", draft.slug)));
    assert.ok(!existsSync(join(output, "articles", draft.slug)));
    for (const file of files)
      assert.ok(!read(String(file)).includes(draft.slug), String(file));
  }
});

test("feeds, robots, sitemap and legacy index are valid static artifacts", () => {
  assert.match(
    read("atom.xml"),
    /<feed xmlns="http:\/\/www.w3.org\/2005\/Atom"/,
  );
  assert.ok(!read("atom.xml").includes("https://cmpadden.github.io/blog"));
  assert.match(
    read("robots.txt"),
    /Sitemap: https:\/\/colton.foo\/sitemap.xml/,
  );
  assert.ok(!read("sitemap.xml").includes("https://cmpadden.github.io"));
  assert.match(read("articles/index.html"), /url=\/blog\//);
  assert.match(read("atom/index.html"), /url=\/atom.xml/);
  assert.ok(existsSync(join(output, "404.html")));
});

test("responsive images stay within budget and HTML is visible without hydration", () => {
  const files = readdirSync(join(output, "images/generated")).filter((name) =>
    name.endsWith(".webp"),
  );
  assert.ok(files.length >= 30);
  for (const name of files)
    assert.ok(
      statSync(join(output, "images/generated", name)).size <= 100_000,
      name,
    );
  assert.ok(statSync(join(output, "images/generated/noise.png")).size < 20_000);
  const html = read("experiments/index.html");
  assert.match(html, /srcset="[^"]+320w[^"]+640w[^"]+960w/);
  assert.ok(!html.includes("opacity-0"));
  assert.equal([...html.matchAll(/loading="eager"/g)].length, 1);
});
