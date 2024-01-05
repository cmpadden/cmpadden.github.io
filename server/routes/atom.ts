import { serverQueryContent } from '#content/server';
import { Feed } from 'feed';

const BASE_URL = "https://cmpadden.github.io"
const AUTHOR_NAME = "Colton Padden"

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
        atom: `${BASE_URL}/atom`
      },
      author: {
        name: AUTHOR_NAME,
      }
    });

    const articles = await serverQueryContent(event).find();

    articles.forEach((article) => {
      feed.addItem({
        title: article.title ? article.title : "Missing Title",
        id: article._path,
        link: `${BASE_URL}${article._path}`,
        description: article.description,
        author: [
          {
            name: AUTHOR_NAME,
          },
        ],
        date: new Date(article.date),
        image: article.cover_image ? `${BASE_URL}/${article.cover_image}` : undefined
      });
    });

    return feed.atom1();
});
