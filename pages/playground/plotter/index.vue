<script setup>
definePageMeta({ layout: "light" });
const PLAYGROUND_ORIGIN = "https://cmpadden.github.io/p5";
const pagePath = "/experiments/plotter.html";
const fullUrl = `${PLAYGROUND_ORIGIN}${pagePath}`;
const src = `${fullUrl}?embed=1`;
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-6 p-6 text-white">
      <div class="w-full max-w-4xl overflow-hidden">
        <iframe
          :src="src"
          title="Sequence plotter"
          class="h-[48rem] w-full"
          loading="lazy"
        />
      </div>
      <div class="text-center font-mono">
        Adjust turtle-like motion parameters in the dedicated p5 playground. The
        iframe keeps the original Nuxt routes intact.
      </div>
      <a
        :href="fullUrl"
        target="_blank"
        rel="noreferrer"
        class="border-2 border-white px-6 py-2 text-sm uppercase tracking-widest"
      >
        Open full screen
      </a>
    </div>
  </div>
</template>
