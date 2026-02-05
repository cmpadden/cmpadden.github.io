<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});
</script>

<template>
  <section class="container mx-auto space-y-2">
    <div class="grid grid-cols-1 gap-3">
      <div v-for="(article, ix) of articles" :key="ix">
        <NuxtLink :to="article.path">
          <div
            class="h-full space-y-2 bg-black/50 p-3 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
          >
            <div class="flex items-center gap-2">
              <div
                class="line-clamp-1 flex-1 text-lg font-bold md:text-xl"
                :title="article.title"
              >
                {{ article.title }}
              </div>
              <template v-if="article.external_url">
                <span
                  class="rounded border border-orange-500/30 bg-orange-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-orange-300"
                  >External</span
                >
              </template>
              <template v-if="show_dates">
                <NuxtTime
                  :datetime="article.date"
                  class="text-sm text-gray-200"
                  year="numeric"
                  month="short"
                  day="2-digit"
                />
              </template>
            </div>
            <div class="line-clamp-3 text-sm text-gray-100">
              {{
                article.description ||
                article.meta?.excerpt?.children?.[0]?.value
              }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <MoreLink to="/blog">See more posts</MoreLink>
  </section>
</template>
