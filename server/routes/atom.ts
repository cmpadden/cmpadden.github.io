import { Feed } from "feed";
import { getAllBlogArticles } from "#content/articles";
import { SITE_NAME, SITE_ORIGIN } from "~/utils/seo";

const BASE_URL = SITE_ORIGIN;
const AUTHOR_NAME = SITE_NAME;

export default defineEventHandler(async (event) => {
  const feed = new Feed({
    title: "cmpadden.github.io",
    description: "Colton Padden's Personal Blog",
    id: BASE_URL,
    link: BASE_URL,
    language: "en",
    image: `${BASE_URL}/images/placeholder.png`,
    favicon: `${BASE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${AUTHOR_NAME}`,
    updated: new Date(),
    generator: "Nuxt static site generation + Feed for Node.js",
    feedLinks: {
      atom: `${BASE_URL}/atom`,
    },
    author: {
      name: AUTHOR_NAME,
    },
  });

  const articles = getAllBlogArticles();

  articles.forEach((article) => {
    const isExternal = Boolean(article.external_url);
    const link = isExternal
      ? article.external_url
      : `${BASE_URL}${article.path}`;
    const id = link;
    const imagePath = article.cover_image || article.img;

    feed.addItem({
      title: article.title ? article.title : "Missing Title",
      id,
      link,
      description: article.description || article.excerpt,
      author: [
        {
          name: AUTHOR_NAME,
        },
      ],
      date: new Date(article.date),
      image: imagePath
        ? imagePath.startsWith("http")
          ? imagePath
          : `${BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
        : undefined,
    });
  });

  return feed.atom1();
});
