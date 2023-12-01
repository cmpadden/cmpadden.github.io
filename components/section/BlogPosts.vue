<template>
  <section class="border-b-2 border-b-emerald-900 py-8">
    <div class="container mx-auto space-y-4">
      <h1 class="text-3xl font-bold leading-tight text-white">
        Latest Blog Posts
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div v-for="(article, ix) of articles" :key="ix">
          <NuxtLink :to="article._path">
            <div
              class="p-4 space-y-4 text-white bg-black bg-opacity-70 rounded-xl drop-shadow-lg hover:ring-1 hover:ring-white"
            >
              <div class="flex items-baseline">
                <div class="flex-1 text-xl font-bold">{{ article.title }}</div>
                <div
                  v-if="show_date"
                  class="bg-teal-700 text-base px-2 hidden md:block"
                >
                  {{ article.date }}
                </div>
              </div>

              <div class="text-sm line-clamp-3">
                {{ article.description }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div>
        <NuxtLink to="/articles" class="text-blue-400 hover:text-blue-200 mt-8">
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
