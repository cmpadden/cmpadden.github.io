<script setup lang="ts">
// <ContentDoc /> could have been used directly, but we want to populate the `title`
// and `date` values which has to take place outside of the `ContentDoc` component.
const route = useRoute();

const { data } = await useAsyncData("page-data", () =>
  queryContent(route.path).findOne(),
);
</script>

<template>
  <div class="container mx-auto">
    <article class="shadow-lg bg-gray-200 mb-10 p-10">
      <!-- https://content.nuxt.com/components/content-slot -->
      <div class="flex flex-auto">
        <!-- header image -->
        <template v-if="data.cover_image">
          <img
            class="m-4 h-16 rounded-full border-2 border-black"
            :src="data.cover_image"
            alt="Dall-E Generated Image of Fennel and a Hammer"
          />
        </template>

        <!-- header title / subtitle -->
        <div class="flex items-center">
          <div>
            <h1 class="font-bold text-3xl text-gray-700">{{ data.title }}</h1>
            <p class="text-sm text-gray-600 flex items-center">
              {{ data.date }}
            </p>
          </div>
        </div>
      </div>
      <!-- https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width -->
      <article class="prose max-w-none">
        <ContentRenderer
          class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
          :value="data"
        >
          <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
      </article>
    </article>
  </div>
</template>
