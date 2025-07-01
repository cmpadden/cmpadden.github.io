<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});
</script>

<template>
  <section class="bg-gradient-to-b from-background dark:from-background-dark to-transparent py-2">
    <div class="container mx-auto space-y-4">

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="(article, ix) of articles" :key="ix">
          <NuxtLink :to="article.path">
            <div
              class="h-full space-y-4 rounded-lg bg-white/80 dark:bg-white/20 p-4 text-gray-700 dark:text-white drop-shadow-lg hover:ring-1 hover:ring-gray-300 dark:hover:ring-white"
            >
              <div>
                <div class="flex-1 text-lg font-bold md:text-xl">
                  {{ article.title }}
                </div>
                <NuxtTime
                  v-if="show_dates"
                  :datetime="article.date" 
                  class="text-sm font-light text-gray-600 dark:text-gray-400"
                  year="numeric"
                  month="short"
                  day="2-digit"
                />
              </div>
              <div class="line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                {{ article.description }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div>
        <MoreLink to="/articles" />
      </div>
    </div>
  </section>
</template>
