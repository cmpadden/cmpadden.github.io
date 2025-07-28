<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});
</script>

<template>
  <section class="py-2">
    <div class="container mx-auto space-y-4">

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div v-for="(article, ix) of articles" :key="ix">
          <NuxtLink :to="article.path">
            <div
              class="h-full space-y-4 dark:bg-orange-400/50 p-4 text-gray-700 dark:text-white drop-shadow-lg hover:ring-1 hover:ring-gray-300 dark:hover:ring-white"
            >
              <div>
                <div class="line-clamp-2 flex-1 text-lg font-bold md:text-xl">
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
                  <span v-if="ix === 0" class="bg-orange-400 text-sm px-2">Latest!</span>
                </div>
              </div>
              <div class="line-clamp-3 text-sm text-gray-700 dark:text-gray-100">
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
