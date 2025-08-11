<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});
</script>

<template>
  <div
    class="container mx-auto mb-10 max-w-[1024px] space-y-6 shadow-lg text-white"
    v-if="page"
  >
    <!-- title -->
    <div class="flex">
      <!-- https://content.nuxt.com/components/content-slot -->
      <template v-if="page.cover_image">
        <img class="mr-4 h-16 border-2 border-black" :src="page.cover_image" />
      </template>

      <h1 class="text-xl font-bold md:text-3xl">
        {{ page.title }}
      </h1>
    </div>

    <!-- Meta -->
    <div class="flex space-x-2">
      <div>
        <div class="mb-2 text-xs uppercase text-gray-400">
          Category
        </div>
        <div class="flex flex-row space-x-2">
          <NuxtLink
            class="mr-2 w-min rounded-md text-sm font-bold hover:cursor-pointer hover:text-orange-500 bg-background"
            v-for="(category, ix) in page.categories"
            :key="ix"
            :to="`/articles?category=${category}`"
          >
            {{ category }}
          </NuxtLink>
        </div>
      </div>

      <div class="border-r border-gray-400"></div>

      <div>
        <div class="mb-2 text-xs uppercase text-gray-400">
          Tags
        </div>
        <div class="flex flex-row md:space-x-2">
          <NuxtLink
            class="mr-2 w-min rounded-md text-sm font-bold hover:cursor-pointer hover:text-orange-500 bg-background"
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
      class="prose max-w-[1024px] prose-h2:mt-8 prose-p:text-justify prose-a:font-bold prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-500 prose-blockquote:text-gray-400 prose-code:text-white prose-pre:bg-black text-gray-300"
    >
      <ContentRenderer v-if="page" :value="page" />
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
