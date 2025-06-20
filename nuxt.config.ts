// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "nuxt-headlessui"],

  app: {
    head: {
      bodyAttrs: {
        class: 'bg-background'
      }
    }
  },

  // Optionally change the default prefix.
  headlessui: {
    prefix: "Headless",
  },

  content: {
    build: {
      markdown: {
        // Disable highlighting until interoperability with by the Tailwind Typography plugin is sorted
        // highlight: false
        highlight: {
          theme: 'github-dark',
          preload: [
              'bash',
              'js',
              'json',
              'lisp',
              'lua',
              'python',
              'shell',
              'ts',
              'vue',
          ]
        },
      },
    },
    // https://github.com/nuxt/content/issues/3249#issuecomment-2778749735
    experimental: { nativeSqlite: true }
  },

  nitro: {
    // render server-side routes as static content
    prerender: {
      routes: ['/sitemap.xml', '/atom']
    }
  },

  compatibilityDate: '2025-06-03'
});
