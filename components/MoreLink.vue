<script setup>
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
      class="flex items-center text-sm font-bold text-white hover:text-orange-500"
    >
      <span><slot></slot></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="ml-1 size-4"
        aria-hidden="true"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        <path
          fill-rule="evenodd"
          d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </NuxtLink>
  </div>
</template>
