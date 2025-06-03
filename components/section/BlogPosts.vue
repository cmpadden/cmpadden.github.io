<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});
</script>

<template>
  <section class="bg-gradient-to-b from-background to-transparent py-2">
    <div class="container mx-auto space-y-4">
      <template v-if="false">
        <NuxtLink
          to="/articles"
          class="font-milk text-xl text-white hover:underline hover:decoration-orange-500 hover:decoration-2"
        >
          Blog Posts
        </NuxtLink>
      </template>

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="(article, ix) of articles" :key="ix">
          <NuxtLink :to="article.path">
            <div
              class="h-full space-y-4 rounded-lg bg-white/20 p-4 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
            >
              <div>
                <div class="flex-1 text-lg font-bold md:text-xl">
                  {{ article.title }}
                </div>
                <div v-if="show_dates" class="text-sm font-light text-gray-400">
                  {{
                    new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                </div>
              </div>

              <div class="line-clamp-3 text-sm text-gray-300">
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
