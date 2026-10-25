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
  <div class="text-foreground min-h-screen py-3">
    <div class="container">
      <h1 class="font-pixelify text-foreground text-3xl font-bold">
        Experiments
      </h1>
    </div>
    <SectionExperiments showImages tightTop />
  </div>
</template>
