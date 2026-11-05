import assert from "node:assert/strict";
import { test } from "node:test";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadArticleSources } from "../../modules/content/manifest";
import {
  legacyRedirects,
  writeStaticRedirects,
} from "../../modules/content/redirects";
import {
  absoluteUrl,
  canonicalPath,
  PAGE_ROUTES,
  SITE_ORIGIN,
} from "../../shared/site";
import { articleDescription, pageTitle, imageUrl } from "../../utils/seo";

test("canonical URLs use the production origin and static-host slash conventions", () => {
  assert.equal(SITE_ORIGIN, "https://colton.foo");
  assert.equal(pageTitle("Blog"), "Blog | Colton Padden");
  assert.equal(
    imageUrl("/images/example.webp"),
    "https://colton.foo/images/example.webp",
  );
  assert.equal(absoluteUrl("/blog"), "https://colton.foo/blog/");
  assert.equal(absoluteUrl("/atom.xml"), "https://colton.foo/atom.xml");
  assert.equal(
    absoluteUrl("/images/cover.webp"),
    "https://colton.foo/images/cover.webp",
  );
  assert.equal(
    absoluteUrl("https://example.com/article"),
    "https://example.com/article",
  );
  assert.equal(canonicalPath("blog?q=1#heading"), "/blog/?q=1#heading");
  assert.ok(PAGE_ROUTES.every((route) => canonicalPath(route) === route));
});

test("publication policy excludes drafts before parsing or serializing their bodies", () => {
  const all = loadArticleSources(process.cwd(), true);
  const published = loadArticleSources(process.cwd());
  assert.ok(all.some(({ frontmatter }) => frontmatter.draft));
  assert.ok(published.length < all.length);
  assert.ok(published.every(({ frontmatter }) => !frontmatter.draft));
  const redirects = legacyRedirects(published);
  for (const draft of all.filter(({ frontmatter }) => frontmatter.draft)) {
    assert.ok(!redirects.some(({ from }) => from.includes(draft.slug)));
  }
  assert.ok(
    redirects.some(({ from, to }) => from === "/articles" && to === "/blog/"),
  );
  assert.ok(
    redirects.some(({ from, to }) => from === "/atom" && to === "/atom.xml"),
  );
});

test("invalid metadata fails the publication manifest", () => {
  const root = mkdtempSync(join(tmpdir(), "publication-"));
  try {
    mkdirSync(join(root, "content/blog"), { recursive: true });
    writeFileSync(
      join(root, "content/blog/bad.md"),
      "---\ndate: invalid\n---\nbody",
    );
    assert.throws(() => loadArticleSources(root));
  } finally {
    rmSync(root, { recursive: true });
  }
});

test("static redirects use the configured output directory without a dist alias", () => {
  const root = mkdtempSync(join(tmpdir(), "redirect-"));
  try {
    writeStaticRedirects(
      root,
      legacyRedirects([{ slug: "example", path: "/blog/example/" }]),
    );
    assert.match(
      readFileSync(join(root, "articles/index.html"), "utf8"),
      /https:\/\/colton.foo\/blog\//,
    );
    assert.match(
      readFileSync(join(root, "articles/example/index.html"), "utf8"),
      /location.replace\("\/blog\/example\/" \+ location.search \+ location.hash\)/,
    );
    assert.match(
      readFileSync(join(root, "atom/index.html"), "utf8"),
      /\/atom.xml/,
    );
  } finally {
    rmSync(root, { recursive: true });
  }
});

test("article descriptions use the custom module's top-level excerpt", () => {
  assert.equal(
    articleDescription({ title: "Title", excerpt: "Useful summary" }),
    "Useful summary",
  );
  assert.equal(
    articleDescription({
      title: "Title",
      description: "Explicit",
      excerpt: "Other",
    }),
    "Explicit",
  );
  assert.ok(articleDescription({ excerpt: "a ".repeat(200) }).length <= 155);
});
