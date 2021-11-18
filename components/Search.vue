<template>
  <div>
    <div class="relative flex w-full flex-wrap items-stretch mb-3">
      <input
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        placeholder="Search Articles"
        class="
          p-3
          placeholder-gray-400
          text-gray-600
          relative
          bg-white bg-white
          rounded
          text-sm
          border border-gray-400
          outline-none
          focus:outline-none focus:ring
          w-full
        "
      />
    </div>

    <ul v-if="articles.length">
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      articles: [],
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .limit(6)
        .search(searchQuery)
        .fetch()
    },
  },
}
</script>
