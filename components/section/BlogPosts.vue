<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});
</script>

<template>
  <section class="bg-gradient-to-b from-background to-transparent">
    <div class="container mx-auto space-y-4">
      <NuxtLink
        to="/articles"
        class="font-mono text-3xl font-semibold text-white underline decoration-orange-500 underline-offset-4 hover:text-orange-500"
      >
        blog posts
      </NuxtLink>

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="(article, ix) of articles" :key="ix">
          <!--
              Specify `external` to force the link to be considered as external. This
              resolves an issue where navigating to a blog post would load the previous
              post if the user clicked the back button -- this unexpected behavior is
              still not entirely understood, but at least this is a workaround.
          -->
          <NuxtLink :to="article._path" external>
            <div
              class="h-full space-y-4 bg-black/70 p-4 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
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
