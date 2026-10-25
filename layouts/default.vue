<template>
  <div class="site-frame bg-gradient-to-b from-orange-600 to-red-600 p-3">
    <main
      class="site-noise-surface noise-bg min-h-[calc(100dvh-24px)] bg-white dark:bg-black"
    >
      <Header />
      <slot />
    </main>
  </div>
</template>

<style>
/* Preserve the fixed decorative frame while letting the document own scrolling.
 * Nuxt can then reset routes, restore history positions, and follow anchors. */
.site-frame::after {
  content: "";
  position: fixed;
  inset: 0;
  border: 12px solid;
  border-image: linear-gradient(to bottom, #ea580c, #dc2626) 1;
  pointer-events: none;
  z-index: 60;
}
</style>
