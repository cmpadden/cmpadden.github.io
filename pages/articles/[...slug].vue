<script setup lang="ts">
// <ContentDoc /> could have been used directly, but we want to populate the `title`
// and `date` values which has to take place outside of the `ContentDoc` component.
const route = useRoute();

const { data } = await useAsyncData("page-data", () =>
  queryContent(route.path).findOne()
);
</script>

<template>
  <div class="container mx-auto px-2">
    <div class="mx-6 md:mx-12">
      <article class="shadow-lg bg-gray-200 mb-10 p-10">
        <h1 class="font-bold text-3xl text-gray-700">{{ data.title }}</h1>
        <p class="text-sm text-gray-600 flex items-center mb-4">{{ data.date }}</p>
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
  </div>
</template>