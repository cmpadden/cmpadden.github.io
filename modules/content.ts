import {
  addServerScanDir,
  addServerTemplate,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit";
import { parseMarkdown } from "comark";
import highlight from "comark/plugins/highlight";
import tokyoNight from "shiki/themes/tokyo-night.mjs";
import type { BlogArticle } from "../shared/types/article";
import { loadArticleSources } from "./content/manifest";

function readingTimeMinutes(body: string) {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~]/g, " ");
  const wordCount =
    text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(wordCount / 225));
}

function excerptFromBody(body: string) {
  const summary = body.split(/<!--\s*more\s*-->/i)[0] || body;

  return summary
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function parseArticle({
  slug,
  path,
  frontmatter,
  content,
}: ReturnType<typeof loadArticleSources>[number]): Promise<BlogArticle> {
  const document = await parseMarkdown(content.trim(), {
    plugins: [
      highlight({
        themes: {
          light: tokyoNight,
          dark: tokyoNight,
        },
      }),
    ],
  });

  return {
    ...frontmatter,
    _id: `content:blog:${slug}`,
    slug,
    path,
    document,
    excerpt: excerptFromBody(content),
    readingTimeMinutes: readingTimeMinutes(content),
    date: frontmatter.date.toISOString(),
  };
}

async function loadArticles(rootDir: string, previewDrafts: boolean) {
  return Promise.all(
    loadArticleSources(rootDir, previewDrafts).map(parseArticle),
  );
}

export default defineNuxtModule({
  meta: {
    name: "content",
  },
  setup(_, nuxt) {
    const resolver = createResolver(import.meta.url);

    addServerTemplate({
      filename: "#content/articles",
      async getContents() {
        const previewDrafts =
          nuxt.options.dev && process.env.NUXT_PREVIEW_DRAFTS === "1";
        const articles = await loadArticles(
          nuxt.options.rootDir,
          previewDrafts,
        );

        return `const articles = ${JSON.stringify(articles, null, 2)}

const articleSummaries = articles.map(({ _id, path, title, date, external_url, external_site, draft }) => ({
  _id, path, title, date, external_url, external_site, draft
}))

export function getAllBlogArticles(options = {}) {
  if (options.includeDrafts) {
    return articles
  }

  return articles.filter((article) => !article.draft)
}

export function getAllBlogArticleSummaries(options = {}) {
  if (options.includeDrafts) {
    return articleSummaries
  }

  return articleSummaries.filter((article) => !article.draft)
}

export function getBlogArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug)
}
`;
      },
    });

    addServerScanDir(resolver.resolve("./content/runtime/server"));
  },
});
