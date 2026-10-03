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
    <div class="container py-3">
      <h2 id="blog" class="font-pixelify text-3xl font-bold text-white">
        <a href="#blog">Blog</a>
      </h2>
    </div>
    <SectionBlogPosts class="pt-3" :articles="articles" :show_dates="true" />
    <div class="container pt-9 pb-3">
      <h2 id="experiments" class="font-pixelify text-3xl font-bold text-white">
        <a href="#experiments">Experiments</a>
      </h2>
    </div>
    <SectionExperiments :limit="6" showImages tightTop />
  </div>
</template>
