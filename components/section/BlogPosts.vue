<template>
  <section class="border-b-2 border-b-emerald-900 py-8">
    <div class="container mx-auto space-y-4">
      <h1 class="text-3xl font-bold leading-tight text-white">
        Latest Blog Posts
      </h1>

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="(article, ix) of articles" :key="ix">
          <NuxtLink :to="article._path">
            <div
              class="space-y-4 rounded-xl bg-black bg-opacity-70 p-4 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
            >
              <div class="flex items-baseline">
                <div class="flex-1 text-xl font-bold">{{ article.title }}</div>
                <div
                  v-if="show_date"
                  class="hidden bg-teal-700 px-2 text-base md:block"
                >
                  {{ article.date }}
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
        <NuxtLink to="/articles" class="mt-8 text-blue-400 hover:text-blue-200">
          More Posts...
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  articles: [],
});

const show_date = ref(false);

// export default {
//   props: ["articles"],

// };
</script>
