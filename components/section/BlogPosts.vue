<script setup lang="ts">
import type { BlogArticleSummary } from "../../modules/content/runtime/types/blog-article";

defineProps<{
  articles: BlogArticleSummary[];
  show_dates?: boolean;
}>();
</script>

<template>
  <section class="container space-y-2">
    <div class="grid grid-cols-1 gap-2">
      <BlogArticleCard
        v-for="article in articles"
        :key="article._id"
        :article="article"
        :show-date="show_dates"
      />
    </div>
    <MoreLink to="/blog">More</MoreLink>
  </section>
</template>
