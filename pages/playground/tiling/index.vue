<script setup>
definePageMeta({ layout: "light" });
const PLAYGROUND_ORIGIN = "https://cmpadden.github.io/p5";
const pagePath = "/experiments/tiling.html";
const fullUrl = `${PLAYGROUND_ORIGIN}${pagePath}`;
const src = `${fullUrl}?embed=1`;
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-6 p-6 text-white">
      <div class="w-full max-w-4xl overflow-hidden">
        <iframe
          :src="src"
          title="Tiling playground"
          class="h-[48rem] w-full"
          loading="lazy"
        />
      </div>
      <div class="text-center font-mono">
        The tiling demo is now powered by vanilla p5.js and hosted in the
        separate playground project.
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
