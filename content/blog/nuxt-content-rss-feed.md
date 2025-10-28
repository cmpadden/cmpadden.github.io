---
title: 'How To Add an RSS Feed to a Nuxt Website'
draft: false
date: "2024-01-06"
tags: ["nuxt", "rss"]
categories: ["programming"]
cover_image: '/images/nuxt-content-rss-feed.jpg'
---

If you are a user of [Nuxt Content](https://content.nuxt.com/) and you wish to configure an RSS feed for your website, it's a surprisingly straight forward process! In this article, we will walk through the code changes required to host an RSS feed for both a statically generated, and Universal Nuxt application.

<!--more-->

## Preface

In version 2 of Nuxt, the community module, [nuxt-community/feed-module](https://github.com/nuxt-community/feed-module) was a popular choice for adding an RSS feed to your website. However, there has been an unresolved [open issue](https://github.com/nuxt-community/feed-module/issues/106) since April 1st, 2022 to add support for Nuxt v3. Thankfully, implementing this feature without a module is relatively straight forward.

## Instructions

First, install the [feed](https://www.npmjs.com/package/feed) library into your project:

```shell
npm i -D feed
```

Then, create a `server/` folder in your project if it does not already exist, and create a file named `server/routes/atom.ts`.

Here, we will leverage the `feed` library and construct an XML representation of our Nuxt content. As you can see, we first define our `feed` with metadata associated with our RSS feed. This will be used by RSS readers to provide context to the end user. Then, we query our Nuxt content with `serverQueryContent` and append a `feed.addItem` for each article.

```ts
import { serverQueryContent } from '#content/server';
import { Feed } from 'feed';

const BASE_URL = "https://mywebsite.com"
const AUTHOR_NAME = "Firstname Lastname"

export default defineEventHandler(async (event) => {

    const feed = new Feed({
      title: "My Title",
      description: "My Description",
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
```

And that's just about it! Except, if you are statically generating your website with the `nuxt generate` command, you will need to configure this server-side route to be pre-rendered on site generation.  This is as simple as adding a `nitro` `prerender` definition in your `nuxt.config.ts` file, like so:

```ts
nitro: {
  prerender: {
    routes: ['/atom']
  }
}
```

## Bonus

You may also be interested in adding a `sitemap.xml` to your website. This can be done in almost an identical fashion!

Install the dependency:

```shell
npm i -D sitemap
```

Create a route at `server/routes/sitemap.xml.ts`:

```ts
import { serverQueryContent } from '#content/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export default defineEventHandler(async (event) => {
    const articles = await serverQueryContent(event).find();

    const sitemap = new SitemapStream({ hostname: 'https://my-website.com/' });

    // Add non nuxt content endpoints here
    sitemap.write({ url: '/' });
    sitemap.write({ url: '/blog' });

    // Dynamically generate routes for Nuxt markdown content
    articles.forEach((article) => sitemap.write({ url: article._path, changefreq: 'monthly' }));
    sitemap.end();

    return (await streamToPromise(sitemap));
});
```

And add the `prerender` entry in your `nuxt.config.ts`:

```ts
nitro: {
  prerender: {
    routes: ['/sitemap.xml', '/atom']
  }
}
```
