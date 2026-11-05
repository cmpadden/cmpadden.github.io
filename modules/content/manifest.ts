import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const frontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  cover_image: z.string().optional(),
  img: z.string().optional(),
  external_url: z.url().optional(),
  external_site: z.string().optional(),
  canonical_url: z.url().optional(),
  draft: z.boolean().optional(),
});

// The same validated publication policy drives all build and runtime consumers.
// Draft preview must be explicitly requested by the development module only.
export function loadArticleSources(rootDir: string, includeDrafts = false) {
  const directory = join(rootDir, "content/blog");
  return readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const { data, content } = matter(
        readFileSync(join(directory, name), "utf8"),
      );
      const frontmatter = frontmatterSchema.parse(data);
      const slug = z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .parse(name.replace(/\.md$/, ""));
      return { slug, path: `/blog/${slug}/`, frontmatter, content };
    })
    .filter(({ frontmatter }) => includeDrafts || !frontmatter.draft)
    .sort(
      (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
    );
}
