<script setup>
import { LinkIcon, CursorArrowRaysIcon } from "@heroicons/vue/16/solid";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex justify-end">
    <NuxtLink
      :to="props.to"
      class="flex items-center text-sm font-bold text-gray-700 dark:text-white hover:text-orange-500"
    >
      <span class="translate-y-0.5">See More</span>
      <CursorArrowRaysIcon class="ml-1 h-5 w-5" aria-hidden="true" />
    </NuxtLink>
  </div>
</template>
