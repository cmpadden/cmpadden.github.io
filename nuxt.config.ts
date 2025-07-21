// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "nuxt-headlessui"],

  app: {
    head: {
      bodyAttrs: {
        class: 'bg-background dark:bg-background-dark'
      }
    }
  },

  // Color mode configuration
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
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
          theme: {
            light: 'github-light',
            default: 'github-dark'
          },
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
