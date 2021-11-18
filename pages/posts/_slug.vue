<template>
  <div class="container mx-auto px-2">
    <div class="mx-6 md:mx-12">
      <article class="shadow-lg bg-gray-200 mb-10 p-10">
        <h1 class="font-bold sm:text-2xl md:text-3xl lg:text-4xl text-gray-700">
          {{ article.title }}
        </h1>
        <p class="sm:text-xs text-sm text-gray-600 flex items-center mb-4">
          {{ formatDate(article.updatedAt) }}
        </p>
        <!-- https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width -->
        <article class="prose-sm md:prose max-w-none">
          <nuxt-content :document="article" />
        </article>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
