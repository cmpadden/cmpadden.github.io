import { readdirSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import tailwindcss from "@tailwindcss/vite";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/experiments",
  "/experiments/audio",
  "/experiments/chords",
  "/experiments/matrix",
  "/experiments/midi",
  "/talks",
  "/sitemap.xml",
  "/robots.txt",
  "/atom",
];

const blogRoutes = readdirSync(join(process.cwd(), "content", "blog"))
  .filter((fileName) => fileName.endsWith(".md"))
  .map((fileName) => `/blog/${fileName.replace(/\.md$/, "")}`);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  components: true,
  css: ["~/assets/css/tailwind.css"],
  modules: ["./modules/content", "@comark/nuxt"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      titleTemplate: "%s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "Colton Padden" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
      ],
      link: [
        {
          rel: "alternate",
          type: "application/atom+xml",
          title: "Colton Padden's Blog",
          href: "/atom",
        },
      ],
      bodyAttrs: {
        class: "bg-background",
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    // GitHub Pages serves this as static output. Explicit routes make the
    // generated site independent of the prerenderer's link crawler.
    prerender: {
      crawlLinks: false,
      routes: [...STATIC_ROUTES, ...blogRoutes],
    },
  },

  routeRules: {
    "/articles": { redirect: { to: "/blog", statusCode: 301 } },
  },

  hooks: {
    // Generate HTML redirect files for `/articles/**` to `/blog/**`
    async close() {
      const { statSync, existsSync } = await import("fs");
      const distBlogPath = join(process.cwd(), "dist", "blog");
      const distArticlesPath = join(process.cwd(), "dist", "articles");

      try {
        if (!existsSync(distBlogPath)) {
          console.log("Blog directory not found, skipping redirect generation");
          return;
        }

        if (!statSync(distBlogPath).isDirectory()) {
          console.log(
            "Blog directory path is not a directory, skipping redirect generation",
          );
          return;
        }

        const blogDirs = readdirSync(distBlogPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);

        console.log(
          `Generating ${blogDirs.length} redirect files for old /articles paths...`,
        );

        for (const slug of blogDirs) {
          const oldPath = `/articles/${slug}`;
          const newPath = `/blog/${slug}`;

          const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="${newPath}">
  <meta http-equiv="refresh" content="0; url=${newPath}">
  <script>window.location.href = "${newPath}";</script>
</head>
<body>
  <p>This page has moved to <a href="${newPath}">${newPath}</a>.</p>
</body>
</html>`;

          const outputPath = join(distArticlesPath, slug, "index.html");
          mkdirSync(dirname(outputPath), { recursive: true });
          writeFileSync(outputPath, redirectHtml);
        }

        console.log("Redirect files generated successfully!");
      } catch (error) {
        console.warn("Could not generate redirect files:", error);
      }
    },
  },

  compatibilityDate: "2025-06-03",
});
