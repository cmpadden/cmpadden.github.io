import tailwindcss from "@tailwindcss/vite";
import { loadArticleSources } from "./modules/content/manifest";
import {
  legacyRedirects,
  writeStaticRedirects,
} from "./modules/content/redirects";
import { PAGE_ROUTES } from "./shared/site";

const articles = loadArticleSources(process.cwd());
const redirects = legacyRedirects(articles);

export default defineNuxtConfig({
  ssr: true,
  components: true,
  css: ["~/assets/css/tailwind.css"],
  modules: ["./modules/content", "@comark/nuxt"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
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
          href: "/atom.xml",
        },
      ],
      bodyAttrs: { class: "bg-background" },
    },
  },

  vite: { plugins: [tailwindcss()] },

  nitro: {
    // Explicit publication manifest: drafts cannot enter output via crawling.
    prerender: {
      crawlLinks: false,
      routes: [
        ...PAGE_ROUTES,
        ...articles.map(({ path }) => path),
        "/sitemap.xml",
        "/robots.txt",
        "/atom.xml",
      ],
    },
  },

  // Actual HTTP redirects when running Nitro; HTML counterparts for Pages below.
  routeRules: Object.fromEntries(
    redirects.flatMap(({ from, to }) => [
      [from, { redirect: { to, statusCode: 301 as const } }],
      [`${from}/`, { redirect: { to, statusCode: 301 as const } }],
    ]),
  ),

  hooks: {
    "nitro:init"(nitro) {
      nitro.hooks.hook("prerender:done", () => {
        writeStaticRedirects(nitro.options.output.publicDir, redirects);
      });
    },
  },

  compatibilityDate: "2025-06-03",
});
