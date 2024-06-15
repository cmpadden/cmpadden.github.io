<template>
  <main>
    <div
      class="container mx-auto my-12 h-screen bg-background font-display lg:my-16"
    >
      <div class="flex flex-col border-2 bg-white">
        <slot />
      </div>
    </div>
    <div class="absolute left-2 top-2">
      <nuxt-link
        as="button"
        to="/playground"
        class="inline-flex items-center rounded px-4 py-2 font-bold text-white hover:text-cyan"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-2 h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <span>Back</span>
      </nuxt-link>
    </div>
  </main>
</template>
