<script setup lang="ts">
const title = "Colton Padden's: Blog & Experiments";
const description = "The blog, portfolio, and repository of experiments by Colton Padden.";
const preview_image = "/images/og-index.png";

useSeoMeta({
  'title': title,
  'description': description,
  'og:title': title,
  'og:description': description,
  'og:image': preview_image,
  'twitter:card': "summary_large_image",
  'twitter:image': preview_image,
  'twitter:title': title,
  'twitter:description': description,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
