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
  <div class="relative h-64 w-full overflow-hidden">
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
