import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      source: '**/*.md',
      type: 'page',
      schema: z.object({
        tags: z.array(z.string()),
        categories: z.array(z.string()),
        img: z.string(),
        date: z.date(),
      })
    })
  }
})
