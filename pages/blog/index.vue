<script setup>
const { data: articles } = await useFetch("/api/articles", {
  default: () => [],
});

const title = "Blog";
const description =
  "Technical articles about programming, data engineering, homelab infrastructure, and creative browser experiments.";

usePageSeo({ title, description, path: "/blog" });

const visibleArticles = computed(() => articles.value);
</script>

<template>
  <section class="noise-bg min-h-screen bg-emerald-950 py-10 text-white">
    <div class="container space-y-8">
      <h1 class="font-pixelify text-3xl font-bold text-white">Blog</h1>
      <div class="space-y-4">
        <div class="grid gap-4">
          <BlogArticleCard
            v-for="article in visibleArticles"
            :key="article._id"
            :article="article"
            show-date
          />
        </div>
      </div>
    </div>
  </section>
</template>
