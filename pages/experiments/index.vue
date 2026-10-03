<script setup>
const title = "Experiments";
const description =
  "Interactive browser experiments by Colton Padden, including audio visualizers, MIDI tools, generative art, and small utilities.";

usePageSeo({
  title,
  description,
  path: "/experiments",
  image: "/images/previews/conway.webp",
});
</script>

<template>
  <div class="min-h-screen py-3 text-white">
    <div class="container pb-3">
      <h1 class="font-pixelify text-3xl font-bold text-white">Experiments</h1>
    </div>
    <SectionExperiments showImages />
  </div>
</template>
