<template>
  <button
    @click="toggleTheme"
    class="flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 hover:bg-orange-500/20 bg-gray-100/10 dark:bg-gray-800/20"
    :title="$colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun icon for light mode -->
    <svg
      v-if="$colorMode.value === 'dark'"
      class="w-5 h-5 text-yellow-500 dark:text-yellow-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    
    <!-- Moon icon for dark mode -->
    <svg
      v-else
      class="w-5 h-5 text-gray-700 dark:text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup>
const { $colorMode } = useNuxtApp()

const toggleTheme = () => {
  $colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>