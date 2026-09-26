<script setup>
const title = "Playground";
const description =
  "Interactive browser experiments by Colton Padden, including audio visualizers, MIDI tools, generative art, and small utilities.";

usePageSeo({
  title,
  description,
  path: "/playground",
  image: "/images/previews/conway.webp",
});
</script>

<template>
  <div class="noise-bg min-h-screen bg-emerald-950 py-10 text-white">
    <SectionPlayground showImages />
  </div>
</template>
