<script setup lang="ts">
import type { BlogArticleSummary } from "../../modules/content/runtime/types/blog-article";

withDefaults(
  defineProps<{
    article: BlogArticleSummary;
    showDate?: boolean;
  }>(),
  { showDate: false },
);

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
};
</script>

<template>
  <NuxtLink :to="article.path" class="group block h-full">
    <article
      class="grid h-full items-start gap-1 text-white"
      :class="showDate ? 'grid-cols-1 sm:flex sm:gap-5' : 'grid-cols-1'"
    >
      <time
        v-if="showDate"
        :datetime="article.date"
        class="font-mono text-sm whitespace-nowrap text-gray-300 tabular-nums sm:pt-1"
      >
        {{ formatDate(article.date) }}
      </time>
      <div class="flex min-w-0 flex-wrap items-center gap-3">
        <h2
          class="w-fit max-w-[60ch] text-lg font-semibold text-white transition-colors group-hover:text-gray-300 md:text-xl"
          :title="article.title"
        >
          <BlogArticleTitle :title="article.title" />
        </h2>
        <ExternalIndicator
          v-if="article.external_url"
          :site="externalSite(article)"
        />
      </div>
    </article>
  </NuxtLink>
</template>
