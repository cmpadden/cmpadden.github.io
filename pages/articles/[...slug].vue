<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

//// Redirect missing articles to `/`, or defined redirects to their intended location
//if (page.value === null) {
//  await navigateTo({
//    path: "/",
//  });
//}
</script>

<template>
  <div class="container mx-auto text-gray-900 dark:text-white" v-if="page">
    <article class="mb-10 space-y-6 shadow-sm dark:shadow-lg">
      <!-- title -->
      <div class="flex">
        <!-- https://content.nuxt.com/components/content-slot -->
        <template v-if="page.cover_image">
          <img
            class="mr-4 h-16 border-2 border-black"
            :src="page.cover_image"
          />
        </template>

        <h1 class="text-xl font-bold md:text-3xl">
          {{ page.title }}
        </h1>
      </div>

      <!-- Meta -->
      <div class="flex space-x-2">
        <div>
          <div class="mb-2 text-xs uppercase text-gray-600 dark:text-gray-400">Category</div>
          <div class="flex flex-row space-x-2">
            <NuxtLink
              class="mr-2 w-min rounded-md bg-background dark:bg-background-dark text-sm font-bold hover:cursor-pointer hover:text-orange-500"
              v-for="(category, ix) in page.categories"
              :key="ix"
              :to="`/articles?category=${category}`"
            >
              {{ category }}
            </NuxtLink>
          </div>
        </div>

        <div class="border-r border-gray-400 dark:border-gray-400"></div>

        <div>
          <div class="mb-2 text-xs uppercase text-gray-600 dark:text-gray-400">Tags</div>
          <div class="flex flex-row md:space-x-2">
            <NuxtLink
              class="mr-2 w-min rounded-md bg-background dark:bg-background-dark text-sm font-bold hover:cursor-pointer hover:text-orange-500"
              v-for="(tag, ix) in page.tags"
              :key="ix"
              :to="`/articles?tag=${tag}`"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!--
        - Remove maximum width of prose content: https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width
        - Use prose-pre:bg-white to work with @nuxt/content syntax highlighting, otherwise background-color defaults to `.prose:where(pre)`
      -->
      <article
        class="prose max-w-none text-gray-700 dark:text-gray-300 prose-h2:mt-8 prose-a:font-bold prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-code:text-gray-900 dark:prose-code:text-white prose-pre:bg-gray-100 dark:prose-pre:bg-black"
      >
        <ContentRenderer v-if="page" :value="page" />
      </article>
    </article>
  </div>
</template>

<style>
/*
 * For some reason min-height is set to 1rem in ProsePre.vue of @nuxt/content, override this for more suitable code block line height
 * https://github.com/nuxt/content/blob/056da889a28c2f8cfe622a2848a652324b4c32c8/src/runtime/components/Prose/ProsePre.vue#L43
 */
pre code .line {
  min-height: 0.25rem !important;
}
</style>
