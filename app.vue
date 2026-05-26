<script setup lang="ts">
useSeoMeta({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  ogTitle: DEFAULT_TITLE,
  ogDescription: DEFAULT_DESCRIPTION,
  ogImage: imageUrl(),
  ogImageType: "image/webp",
  twitterCard: "summary_large_image",
  twitterImage: imageUrl(),
  twitterTitle: DEFAULT_TITLE,
  twitterDescription: DEFAULT_DESCRIPTION,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
