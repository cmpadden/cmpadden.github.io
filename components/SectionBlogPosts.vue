<template>
  <section class="container mx-auto mb-4">
    <div class="mx-6 md:mx-12 p-2">
      <h1 class="text-4xl font-bold leading-tight text-white py-4">
        Latest Blog Posts
      </h1>

      <div v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'posts-slug', params: { slug: article.slug } }">
          <div
            class="
              shadow-lg
              hover:bg-blue-200
              text-white
              hover:text-black
              mb-2
              border
            "
          >
            <div class="flex">
              <div class="flex-grow py-4 pl-4">
                <div class="font-bold text-xl">
                  {{ article.title }}
                </div>

                <div class="text-sm">
                  {{ article.date }}
                </div>
              </div>

              <div
                v-if="article.tags.includes('tip')"
                class="flex flex-wrap content-center p-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 hover:text-yellow-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['articles'],
}
</script>
