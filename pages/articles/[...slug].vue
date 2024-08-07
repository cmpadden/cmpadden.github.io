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
      <div class="space-y-6">
        <div class="flex space-x-2">
          <!-- categories -->
          <div>
            <div class="text-xs uppercase text-gray-400">Category</div>
            <!-- columns when small, inline when md or larger -->
            <div
              class="flex flex-col space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0"
            >
              <NuxtLink
                class="w-min rounded-md bg-background px-2 text-sm font-bold text-white hover:cursor-pointer hover:bg-orange-500"
                v-for="(category, ix) in data.categories"
                :key="ix"
                :to="`/articles?category=${category}`"
              >
                {{ category }}
              </NuxtLink>
            </div>
          </div>

          <!-- delimiter -->
          <div class="border-r border-gray-400"></div>

          <!-- tags -->
          <div>
            <div class="text-xs uppercase text-gray-400">Tags</div>
            <!-- columns when small, inline when md or larger -->
            <div
              class="flex flex-col space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0"
            >
              <NuxtLink
                class="w-min rounded-md bg-background px-2 text-sm font-bold text-white hover:cursor-pointer hover:bg-orange-500"
                v-for="(tag, ix) in data.tags"
                :key="ix"
                :to="`/articles?tag=${tag}`"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- title -->
        <div class="flex">
          <!-- https://content.nuxt.com/components/content-slot -->
          <template v-if="data.cover_image">
            <img
              class="mr-4 h-16 border-2 border-black"
              :src="data.cover_image"
            />
          </template>

          <h1 class="text-xl font-bold text-gray-700 md:text-3xl">
            {{ data.title }}
          </h1>
        </div>
        <!-- <div class="text-sm text-gray-600">Published {{ data.date }}</div> -->
      </div>
      <!-- <div class="my-4 border-b border-gray-400" /> -->
      <!--
        - Remove maximum width of prose content: https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width
        - Use prose-pre:bg-white to work with @nuxt/content syntax highlighting, otherwise background-color defaults to `.prose:where(pre)`
      -->
      <article
        class="prose max-w-none prose-a:font-bold prose-a:no-underline hover:prose-a:text-orange-500 prose-pre:bg-white prose-pre:text-black"
      >
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
