import { Feed } from 'feed';
import { queryCollection } from '#imports';

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

    const articles = await queryCollection(event, 'content').all();

    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    articles.forEach((article) => {
      const isExternal = Boolean((article as any).external_url)
      const link = isExternal ? (article as any).external_url : `${BASE_URL}${article.path}`
      const id = link
      const imagePath = (article as any).cover_image || (article as any).img

      feed.addItem({
        title: article.title ? article.title : "Missing Title",
        id,
        link,
        description: (article as any).description,
        author: [
          {
            name: AUTHOR_NAME,
          },
        ],
        date: new Date(article.date),
        image: imagePath ? (imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`) : undefined
      });
    });

    return feed.atom1();
});
