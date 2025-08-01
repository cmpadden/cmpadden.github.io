<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});
</script>

<template>
  <section class="container mx-auto space-y-2">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div v-for="(article, ix) of articles" :key="ix">
        <NuxtLink :to="article.path">
          <div
            class="h-full space-y-4 rounded-lg p-4 text-gray-700 drop-shadow-lg hover:ring-1 hover:ring-gray-300 dark:bg-orange-400/50 dark:text-white dark:hover:ring-white"
          >
            <div>
              <div
                class="line-clamp-1 flex-1 text-lg font-bold md:text-xl"
                :title="article.title"
              >
                {{ article.title }}
              </div>
              <div class="space-x-2">
                <NuxtTime
                  v-if="show_dates"
                  :datetime="article.date"
                  class="text-sm text-gray-600 dark:text-gray-200"
                  year="numeric"
                  month="short"
                  day="2-digit"
                />
                <span v-if="ix === 0" class="text-xs font-bold uppercase"
                  >[latest]</span
                >
              </div>
            </div>
            <div class="line-clamp-3 text-sm text-gray-700 dark:text-gray-100">
              {{ article.description }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <MoreLink to="/articles" />
  </section>
</template>
