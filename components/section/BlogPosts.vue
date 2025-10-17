<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});
</script>

<template>
  <section class="container mx-auto space-y-2">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div v-for="(article, ix) of articles" :key="ix">
        <NuxtLink :to="article.path">
          <div
            class="h-full space-y-2 rounded-lg bg-orange-500/50 p-4 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
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
                  class="text-sm text-gray-200"
                  year="numeric"
                  month="short"
                  day="2-digit"
                />
                <span v-if="ix === 0" class="text-xs font-bold uppercase italic"
                  >latest</span
                >
              </div>
            </div>
            <div class="line-clamp-3 text-sm text-gray-100">
              {{ article.description }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <MoreLink to="/articles" />
  </section>
</template>
