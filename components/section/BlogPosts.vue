<script setup>
const props = defineProps({
  articles: [],
  show_dates: false,
});
</script>

<template>
  <section class="bg-gradient-to-b from-background to-transparent">
    <div class="container mx-auto space-y-4">
      <NuxtLink
        to="/articles"
        class="font-mono text-3xl font-semibold text-white underline decoration-orange-500 underline-offset-4"
      >
        blog posts
      </NuxtLink>

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="(article, ix) of articles" :key="ix">
          <NuxtLink :to="article._path">
            <div
              class="space-y-4 rounded-xl bg-black bg-opacity-70 p-4 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
            >
              <div class="">
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

              <div class="line-clamp-3 text-sm">
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
