<script setup lang="ts">
import type { BlogArticleSummary } from "../../modules/content/runtime/types/blog-article";

withDefaults(
  defineProps<{
    article: BlogArticleSummary;
    showDate?: boolean;
  }>(),
  { showDate: false },
);
</script>

<template>
  <NuxtLink :to="article.path" class="block h-full">
    <article
      class="grid h-full items-start gap-1 text-white"
      :class="showDate ? 'grid-cols-[7.5rem_minmax(0,1fr)]' : 'grid-cols-1'"
    >
      <NuxtTime
        v-if="showDate"
        :datetime="article.date"
        class="whitespace-nowrap pt-1 tabular-nums text-sm text-gray-300"
        year="numeric"
        month="short"
        day="2-digit"
      />
      <div class="flex min-w-0 flex-wrap items-center gap-2">
        <h2
          class="w-fit max-w-[60ch] text-lg font-semibold text-white md:text-xl"
          :title="article.title"
        >
          {{ article.title }}
        </h2>
        <ExternalIndicator
          v-if="article.external_url"
          :site="externalSite(article)"
        />
      </div>
    </article>
  </NuxtLink>
</template>
