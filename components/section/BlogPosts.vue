<template>
  <section class="container mx-auto">
    <h1 class="py-4 text-4xl font-bold leading-tight text-white">
      Latest Blog Posts
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div v-for="(article, ix) of articles" :key="ix">
        <NuxtLink :to="article._path">
          <div
            class="text-white bg-black border border-slate-700 bg-opacity-70 rounded-lg drop-shadow-lg hover:bg-opacity-100 transition duration-500"
          >
            <div class="p-4 flex items-baseline">
              <div class="flex-1 text-xl font-bold">{{ article.title }}</div>
              <div class="bg-teal-700 text-base px-2 hidden md:block">
                {{ article.date }}
              </div>
            </div>

            <div class="text-sm p-4">
              <div class="line-clamp-3">
                {{ article.description }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <NuxtLink to="/articles" class="text-blue-400 hover:text-blue-200">
      More Posts...
    </NuxtLink>
  </section>
</template>

<script>
export default {
  props: ["articles"],
};
</script>
