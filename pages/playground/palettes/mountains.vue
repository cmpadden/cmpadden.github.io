<script setup>
definePageMeta({ layout: "light" });
const PLAYGROUND_ORIGIN = "https://cmpadden.github.io/p5";
const pagePath = "/experiments/mountains.html";
const fullUrl = `${PLAYGROUND_ORIGIN}${pagePath}`;
const src = `${fullUrl}?embed=1`;
</script>

<template>
  <div class="">
    <div class="flex flex-col items-center justify-center gap-6 p-6 text-white">
      <div class="w-full max-w-4xl overflow-hidden">
        <iframe
          :src="src"
          title="Perlin Mountains sketch"
          class="h-[48rem] w-full"
          loading="lazy"
        />
      </div>
      <div class="text-center text-lg font-mono">
        Click inside the sketch to redraw the layered waves. Colors and logic now
        live in the standalone p5 playground.
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
