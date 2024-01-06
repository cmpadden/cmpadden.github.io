// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "nuxt-headlessui"],
  // Optionally change the default prefix.
  headlessui: {
    prefix: "Headless",
  },
  content: {
    // Disable highlighting until interoperability with by the Tailwind Typography plugin is sorted
    highlight: false
    // highlight: {
    //   theme: 'solarized-dark',
    //   preload: [
    //       'bash',
    //       'json',
    //       'lisp',
    //       'lua',
    //       'python',
    //       'shell',
    //       'js',
    //       'ts',
    //   ]
    // }
  },
  nitro: {
    // render server-side routes as static content
    prerender: {
      routes: ['/sitemap.xml', '/atom']
    }
  }
});
