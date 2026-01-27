<template>
  <div class="relative h-64 w-full overflow-hidden border border-white/40">
    <iframe
      :src="iframeSrc"
      class="h-full w-full"
      loading="lazy"
      referrerpolicy="no-referrer"
      title="Embedded p5 model preview"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const PLAYGROUND_ORIGIN = "https://cmpadden.github.io/p5";

const props = withDefaults(
  defineProps<{
    path: string;
    backgroundColor?: number;
  }>(),
  {
    backgroundColor: 100,
  },
);

const sanitizePath = (path: string) => {
  const ensureAbsolute = (p: string) => {
    const base = PLAYGROUND_ORIGIN.replace(/\/$/, "");
    const suffix = p.startsWith("/") ? p : `/${p}`;
    return `${base}${suffix}`;
  };

  if (!path) {
    return ensureAbsolute("/models/mac_mini_macbook_stand.stl");
  }
  if (/^https?:/i.test(path)) {
    return path;
  }
  return ensureAbsolute(path);
};

const iframeSrc = computed(() => {
  const modelPath = sanitizePath(props.path);
  const search = new URLSearchParams({
    path: modelPath,
    bg: String(props.backgroundColor ?? 100),
  });
  const viewerBase = `${PLAYGROUND_ORIGIN.replace(/\/$/, "")}/experiments/model-viewer.html`;
  return `${viewerBase}?${search.toString()}`;
});
</script>
