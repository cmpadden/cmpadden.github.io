// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "nuxt-headlessui"],
  // Optionally change the default prefix.
  headlessui: {
    prefix: "Headless",
  },
  content: {
    highlight: {
      theme: 'solarized-dark',
      preload: [
          'python',
          'lua',
          'bash',
          'lisp',
      ]
    }
  },
  nitro: {
    // render server-side routes as static content
    prerender: {
      routes: ['/sitemap.xml', 'atom']
    }
  }
});
