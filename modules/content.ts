import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  addServerScanDir,
  addServerTemplate,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit";
import { parseMarkdown } from "comark";
import highlight from "comark/plugins/highlight";
import matter from "gray-matter";
import { z } from "zod";
import type { BlogArticle } from "./content/runtime/types/blog-article";

const frontmatterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  cover_image: z.string().optional(),
  img: z.string().optional(),
  external_url: z.string().url().optional(),
  external_site: z.string().optional(),
  canonical_url: z.string().url().optional(),
  draft: z.boolean().optional(),
});

function slugFromFilePath(filePath: string) {
  return filePath.split("/").pop()?.replace(/\.md$/, "") || "";
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

async function parseArticle(
  filePath: string,
  rawMarkdown: string,
): Promise<BlogArticle> {
  const slug = slugFromFilePath(filePath);
  const { data, content } = matter(rawMarkdown);
  const frontmatter = frontmatterSchema.parse(data);
  const document = await parseMarkdown(content.trim(), {
    plugins: [highlight()],
  });

  return {
    ...frontmatter,
    _id: `content:blog:${slug}`,
    slug,
    path: `/blog/${slug}`,
    document,
    excerpt: excerptFromBody(content),
    date: frontmatter.date.toISOString(),
  };
}

async function loadArticles(rootDir: string) {
  const blogContentDir = join(rootDir, "content", "blog");
  const articles = await Promise.all(
    readdirSync(blogContentDir)
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const filePath = join(blogContentDir, fileName);
        return parseArticle(filePath, readFileSync(filePath, "utf8"));
      }),
  );

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
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
        const articles = await loadArticles(nuxt.options.rootDir);

        return `const articles = ${JSON.stringify(articles, null, 2)}

const articleSummaries = articles.map(({ document, ...article }) => article)

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
