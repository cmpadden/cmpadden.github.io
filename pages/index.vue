<template>
  <div>
    <SectionAboutMe />
    <SectionInterests />
    <SectionBlogPosts :articles="articles" />
    <SectionPlayground />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, _ }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'date', 'img', 'slug', 'author', 'tags'])
      .sortBy('date', 'desc')
      .limit(5)
      .fetch()

    return {
      articles,
    }
  },
})
</script>
