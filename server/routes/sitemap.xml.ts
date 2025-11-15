import { SitemapStream, streamToPromise } from 'sitemap';
import { queryCollection } from '#imports';

export default defineEventHandler(async (event) => {
    const articles = await queryCollection(event, 'content').all();

    const sitemap = new SitemapStream({ hostname: 'https://cmpadden.github.io' });

    sitemap.write({ url: '/' });
    sitemap.write({ url: '/blog' });
    sitemap.write({ url: '/playground' });
    sitemap.write({ url: '/playground/plotter' });
    sitemap.write({ url: '/playground/palettes/mountains' });
    sitemap.write({ url: '/playground/audio' });
    sitemap.write({ url: '/playground/waves' });
    sitemap.write({ url: '/playground/chords' });
    sitemap.write({ url: '/playground/midi' });
    sitemap.write({ url: '/playground/french' });
    sitemap.write({ url: '/playground/matrix' });

    // Dynamically generate routes for Nuxt markdown content
    articles.forEach((article) => sitemap.write({ url: article.path, changefreq: 'monthly' }));
    sitemap.end();

    return (await streamToPromise(sitemap));
});
