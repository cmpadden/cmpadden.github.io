<script setup>
definePageMeta({ layout: "light" });
const PLAYGROUND_ORIGIN = "https://cmpadden.github.io/p5";
const pagePath = "/experiments/plotter.html";
const src = `${PLAYGROUND_ORIGIN}${pagePath}?embed=1&v=embed-shell-2`;
</script>

<template>
  <div class="container space-y-4 py-4 text-white">
    <header>
      <h1 class="font-mono text-2xl font-bold">Sequence Plotter</h1>
      <p class="mt-1 font-mono text-sm text-white/70">
        Adjust turtle-like motion parameters to draw paths from digit sequences.
      </p>
    </header>
    <iframe
      :src="src"
      title="Sequence plotter"
      class="block h-[48rem] w-full border-2"
      loading="lazy"
    />
  </div>
</template>
