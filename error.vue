<script setup lang="ts">
import type { NuxtError } from "#app";
const props = defineProps<{ error: NuxtError }>();
const notFound = computed(() => props.error.statusCode === 404);
useSeoMeta({
  title: () =>
    pageTitle(notFound.value ? "Page not found" : "Something went wrong"),
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="bg-background font-display flex min-h-screen flex-col">
    <Header />
    <main class="container mt-5 flex-1">
      <div class="p-7 text-center">
        <h1 class="text-foreground text-6xl font-bold">
          {{ notFound ? "404" : "Something went wrong" }}
        </h1>
        <p class="mt-3 text-gray-700 dark:text-gray-200">
          {{ notFound ? "Page not found" : "Please try again in a moment." }}
        </p>
        <button
          v-if="!notFound"
          type="button"
          class="mt-5 underline"
          @click="clearError({ redirect: '/' })"
        >
          Return home
        </button>
      </div>
    </main>
  </div>
</template>
