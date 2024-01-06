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
      <!-- https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width -->
      <article class="prose prose-sm max-w-none prose-a:no-underline prose-a:text-blue-800 hover:prose-a:text-blue-600">
        <ContentRenderer>
          <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
      </article>
    </article>
  </div>
</template>
