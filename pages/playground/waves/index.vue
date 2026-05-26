<script setup>
definePageMeta({ layout: "light" });
const PLAYGROUND_ORIGIN = "https://cmpadden.github.io/p5";
const pagePath = "/experiments/waves.html";
const src = `${PLAYGROUND_ORIGIN}${pagePath}?embed=1&v=embed-shell-2`;
</script>

<template>
  <div class="space-y-4 py-4 text-white">
    <header class="mx-auto max-w-5xl">
      <h1 class="font-mono text-2xl font-bold">Trigonometry Waves</h1>
      <p class="mt-1 font-mono text-sm text-white/70">
        Adjust amplitude, wavelength, and diameter to compare sine, cosine, and
        tangent motion.
      </p>
    </header>
    <iframe
      :src="src"
      title="Wave playground"
      class="mx-auto block h-[54rem] w-full max-w-5xl border-2"
      loading="lazy"
    />
  </div>
</template>
