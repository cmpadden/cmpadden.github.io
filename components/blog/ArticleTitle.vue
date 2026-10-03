<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();

const parts = computed(() =>
  (props.title ?? "")
    .split(/(`[^`]+`)/g)
    .filter(Boolean)
    .map((text) => ({
      text: text.startsWith("`") ? text.slice(1, -1) : text,
      isCode: text.startsWith("`"),
    })),
);
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <code v-if="part.isCode" class="font-mono font-semibold">{{
      part.text
    }}</code>
    <span v-else>{{ part.text }}</span>
  </template>
</template>
