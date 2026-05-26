<script setup>
const articles = (await queryCollection("content").order("date", "DESC").all())
  .filter((article) => !article.draft)
  .slice(0, 3);

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
  <div class="noise-bg min-h-screen bg-emerald-950">
    <section class="bg-gradient-to-b from-background to-transparent py-2">
      <div class="container my-7">
        <div class="text-orange-500">
          <Logo />
        </div>
      </div>
    </section>
    <SectionBlogPosts :articles="articles" :show_dates="true" />
    <SectionPlayground :limit="6" showImages linkToPlayground />
  </div>
</template>
