<script setup>
definePageMeta({ layout: "empty" });
const P5_ORIGIN = "https://cmpadden.github.io/p5";
const viewerBase = `${P5_ORIGIN}/experiments/model-viewer.html`;
const modelPath = `${P5_ORIGIN}/models/mac_mini_macbook_stand.stl`;
const query = new URLSearchParams({ path: modelPath, bg: "30" });
const fullUrl = `${viewerBase}?${query.toString()}`;
query.set("embed", "1");
query.set("v", "embed-shell-2");
const src = `${viewerBase}?${query.toString()}`;
</script>

<template>
  <div class="container m-8 space-y-4 text-white">
    <div class="text-2xl font-bold"><code>.stl</code> Model Render Demo</div>
    <div class="font-body">
      Models auto-rotate until you click the canvas. Use the iframe menu to open
      the standalone p5 site in a new tab when embedding elsewhere.
    </div>
    <div>
      Powered by the vanilla
      <a
        class="text-blue-500 underline"
        href="https://p5js.org"
        target="_blank"
        rel="noreferrer"
        >p5js</a
      >
      WEBGL renderer.
    </div>
    <div class="h-[28rem] border-2 border-white">
      <iframe
        :src="src"
        title="STL demo"
        class="h-full w-full"
        loading="lazy"
      />
    </div>
    <a
      :href="fullUrl"
      target="_blank"
      rel="noreferrer"
      class="inline-flex items-center gap-2 text-orange-400 underline"
    >
      Launch in the p5 repo
    </a>
  </div>
</template>
