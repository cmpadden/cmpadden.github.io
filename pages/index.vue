<script setup>
const { data: articles } = await useFetch("/api/articles", {
  default: () => [],
  transform: (articles) => articles.slice(0, 5),
});

useSeoMeta({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  ogTitle: DEFAULT_TITLE,
  ogDescription: DEFAULT_DESCRIPTION,
  ogImage: imageUrl(),
  ogUrl: absoluteUrl("/"),
  twitterCard: "summary_large_image",
  twitterTitle: DEFAULT_TITLE,
  twitterDescription: DEFAULT_DESCRIPTION,
  twitterImage: imageUrl(),
});

useHead({
  link: [{ rel: "canonical", href: absoluteUrl("/") }],
});
</script>

<template>
  <div class="min-h-screen">
    <div class="container pb-2 pt-6">
      <h2 id="blog" class="font-pixelify text-3xl font-bold text-white">
        <a href="#blog">Blog</a>
      </h2>
    </div>
    <SectionBlogPosts :articles="articles" :show_dates="true" />
    <div class="container pb-2 pt-8">
      <h2
        id="experiments"
        class="font-pixelify text-3xl font-bold text-white"
      >
        <a href="#experiments">Experiments</a>
      </h2>
    </div>
    <SectionExperiments :limit="6" showImages tightTop />
  </div>
</template>
