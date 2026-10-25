<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    loading?: "eager" | "lazy";
  }>(),
  { loading: "lazy" },
);

const generatedBase = computed(() =>
  props.src.startsWith("/images/previews/")
    ? props.src
        .replace("/images/previews/", "/images/generated/")
        .replace(/\.[^.]+$/, "")
    : undefined,
);
const srcset = computed(() =>
  generatedBase.value
    ? [320, 640, 960]
        .map((width) => `${generatedBase.value}-${width}.webp ${width}w`)
        .join(", ")
    : undefined,
);
</script>

<template>
  <div class="relative h-64 w-full overflow-hidden">
    <img
      class="h-full w-full object-cover grayscale hover:grayscale-0"
      :src="generatedBase ? `${generatedBase}-640.webp` : props.src"
      :srcset="srcset"
      sizes="(min-width: 1536px) 312px, (min-width: 1280px) 270px, (min-width: 1024px) 227px, (min-width: 768px) 206px, (min-width: 640px) 184px, calc(100vw - 88px)"
      :alt="props.alt"
      :loading="props.loading"
      :fetchpriority="props.loading === 'eager' ? 'high' : 'auto'"
      width="960"
      height="960"
      decoding="async"
    />
  </div>
</template>
