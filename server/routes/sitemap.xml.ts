import { serverQueryContent } from '#content/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export default defineEventHandler(async (event) => {
    const articles = await serverQueryContent(event).find();

    const sitemap = new SitemapStream({ hostname: 'https://cmpadden.github.io' });

    sitemap.write({ url: '/' });
    sitemap.write({ url: '/articles' });
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
    articles.forEach((article) => sitemap.write({ url: article._path, changefreq: 'monthly' }));
    sitemap.end();

    return (await streamToPromise(sitemap));
});
