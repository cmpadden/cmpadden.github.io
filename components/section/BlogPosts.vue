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
            <div class="flex">
              <div
                class="line-clamp-1 flex-1 text-lg font-bold md:text-xl"
                :title="article.title"
              >
                {{ article.title }}
              </div>
              <NuxtTime
                v-if="show_dates"
                :datetime="article.date"
                class="text-sm text-gray-200"
                year="numeric"
                month="short"
                day="2-digit"
              />
            </div>
            <div class="line-clamp-3 text-sm text-gray-100">
              {{ article.description }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <MoreLink to="/blog">See all posts</MoreLink>
  </section>
</template>
