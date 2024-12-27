<template>
  <div>
    <div class="relative mb-3 flex w-full flex-wrap items-stretch">
      <input
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        placeholder="Search Articles"
        class="relative w-full rounded border border-gray-400 bg-white p-3 text-sm text-gray-600 placeholder-gray-400 outline-none focus:outline-none focus:ring"
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
      searchQuery: "",
      articles: [],
    };
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = [];
        return;
      }
      this.articles = await this.$content("articles")
        .limit(6)
        .search(searchQuery)
        .fetch();
    },
  },
};
</script>
