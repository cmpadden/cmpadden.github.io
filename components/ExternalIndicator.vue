<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  site: {
    type: String,
    default: "",
  },
});

const label = computed(() =>
  props.site.toLowerCase().includes("openai")
    ? "OPENAI"
    : props.site.toUpperCase(),
);
</script>

<template>
  <span class="shrink-0 font-mono text-xs font-semibold text-gray-300">[{{ label }}]</span>
</template>
