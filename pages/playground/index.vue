<script setup>
const title = "Playground";
const description =
  "Interactive browser experiments by Colton Padden, including audio visualizers, MIDI tools, generative art, and small utilities.";

useSeoMeta({
  title: pageTitle(title),
  description,
  ogTitle: pageTitle(title),
  ogDescription: description,
  ogImage: imageUrl("/images/previews/conway.webp"),
  ogUrl: absoluteUrl("/playground"),
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle(title),
  twitterDescription: description,
  twitterImage: imageUrl("/images/previews/conway.webp"),
});

useHead({
  link: [{ rel: "canonical", href: absoluteUrl("/playground") }],
});
</script>

<template>
  <div class="noise-bg min-h-screen bg-emerald-950 py-10 text-white">
    <SectionPlayground showImages />
  </div>
</template>
