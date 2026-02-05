import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      source: '**/*.md',
      type: 'page',
      schema: z.object({
        // required
        tags: z.array(z.string()),
        categories: z.array(z.string()),
        date: z.date(),

        // optional/expanded
        title: z.string().optional(),
        description: z.string().optional(),
        cover_image: z.string().optional(),
        // legacy compatibility
        img: z.string().optional(),

        // external linking
        external_url: z.string().url().optional(),
        external_site: z.string().optional(),

        // seo
        canonical_url: z.string().url().optional(),
        draft: z.boolean().optional(),
      })
    })
  }
})
