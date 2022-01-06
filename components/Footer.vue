<template>
  <footer
    class="bg-gradient-to-l from-blackish to-pink-600 w-full text-center p-4 pin-b text-xs text-white"
  >
    <div>&#169; Colton Padden</div>
    <div class="pb-2">
      Made with
      <a href="https://nuxtjs.org/" class="underline hover:text-blue-400"
        >NuxtJS</a
      >
      &amp;
      <a href="https://windicss.org/" class="underline hover:text-blue-400"
        >Windi CSS</a
      >
    </div>
    <CarbonBadge :dark="true" />
  </footer>
</template>
