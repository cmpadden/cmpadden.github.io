<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    loading?: "eager" | "lazy";
  }>(),
  { loading: "lazy" },
);

const isLoaded = ref(false);
const image = ref<HTMLImageElement | null>(null);

onMounted(() => {
  if (image.value?.complete) {
    isLoaded.value = true;
  }
});
</script>

<template>
  <div class="relative h-64 w-full overflow-hidden bg-gray-800">
    <div
      v-if="!isLoaded"
      class="image-skeleton absolute inset-0"
      aria-hidden="true"
    />
    <img
      ref="image"
      class="h-full w-full object-cover grayscale transition-opacity duration-300 hover:grayscale-0"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      :src="props.src"
      :alt="props.alt"
      :loading="props.loading"
      decoding="async"
      @load="isLoaded = true"
      @error="isLoaded = true"
    />
  </div>
</template>

<style scoped>
.image-skeleton {
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 20%, rgb(249 115 22 / 0.18), transparent 34%),
    radial-gradient(circle at 70% 80%, rgb(16 185 129 / 0.16), transparent 38%),
    rgb(2 44 34);
}

.image-skeleton::after {
  position: absolute;
  inset: -25%;
  content: "";
  background: linear-gradient(
    105deg,
    transparent 8%,
    rgb(249 115 22 / 0.2) 24%,
    rgb(16 185 129 / 0.2) 48%,
    rgb(255 255 255 / 0.32) 66%,
    transparent 82%
  );
  filter: blur(10px) saturate(1.3);
  transform: translateX(-85%) rotate(3deg);
  animation: image-shimmer 1.6s ease-in-out infinite;
}

@keyframes image-shimmer {
  to {
    transform: translateX(85%) rotate(3deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .image-skeleton::after {
    animation: none;
  }
}
</style>
