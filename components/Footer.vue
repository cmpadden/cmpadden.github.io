<template>
  <footer
    class="w-full p-4 text-xs text-center text-white bg-gradient-to-l from-blackish to-pink-600 pin-b"
  >
    <div>&#169; Colton Padden</div>
    <div class="pb-2">
      Made with
      <a href="https://nuxtjs.org/" class="underline hover:text-blue-400"
        >NuxtJS</a
      >
      &amp;
      <a href="https://tailwindcss.com/" class="underline hover:text-blue-400"
        >tailwindcss</a
      >
    </div>
    <CarbonBadge :dark="true" />
  </footer>
</template>
