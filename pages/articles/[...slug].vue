<script setup lang="ts">
// <ContentDoc /> could have been used directly, but we want to populate the `title`
// and `date` values which has to take place outside of the `ContentDoc` component.
const route = useRoute();

const { data } = await useAsyncData("page-data", () =>
  queryContent(route.path).findOne(),
);
</script>

<template>
  <div class="container mx-auto" v-if="data">
    <article class="mb-10 bg-gray-200 p-10 shadow-lg">
      <!-- https://content.nuxt.com/components/content-slot -->
      <div class="flex flex-auto items-center">
        <!-- header image -->
        <template v-if="data.cover_image">
          <img
            class="mr-4 h-16 border-2 border-black"
            :src="data.cover_image"
          />
        </template>

        <!-- header title / subtitle -->
        <div class="flex items-center">
          <div>
            <h1 class="text-xl md:text-3xl font-bold text-gray-700">{{ data.title }}</h1>
            <p class="flex items-center text-sm text-gray-600">
              {{ data.date }}
            </p>
          </div>
        </div>
      </div>
      <!--
        - Remove maximum width of prose content: https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width
        - Use prose-pre:bg-white to work with @nuxt/content syntax highlighting, otherwise background-color defaults to `.prose:where(pre)`
      -->
      <article class="prose prose-sm max-w-none prose-a:no-underline prose-a:text-blue-800 hover:prose-a:text-blue-600 prose-pre:bg-white">
        <ContentRenderer>
          <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
      </article>
    </article>
  </div>
</template>

<style>
/*
   For some reason min-height is set to 1rem in ProsePre.vue of @nuxt/content, override
       this for more suitable code block line height
   https://github.com/nuxt/content/blob/056da889a28c2f8cfe622a2848a652324b4c32c8/src/runtime/components/Prose/ProsePre.vue#L43 */
pre code .line {
    min-height: 0.25rem !important;
}
</style>
