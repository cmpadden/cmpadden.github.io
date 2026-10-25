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
  <section class="text-foreground min-h-screen py-3">
    <div class="container space-y-3">
      <h1 class="font-pixelify text-foreground text-3xl font-bold">Blog</h1>
      <div class="space-y-5">
        <div class="grid gap-5">
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
