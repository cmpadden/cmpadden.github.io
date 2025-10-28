import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'

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

  routeRules: {
    '/articles': { redirect: { to: '/blog', statusCode: 301 } },
  },

  hooks: {
    // Generate HTML redirect files for `/articles/**` to `/blog/**`
    async 'close'() {
      const { readdirSync, statSync } = await import('fs')
      const distBlogPath = join(process.cwd(), 'dist', 'blog')
      const distArticlesPath = join(process.cwd(), 'dist', 'articles')

      try {
        if (!statSync(distBlogPath).isDirectory()) {
          console.log('Blog directory not found, skipping redirect generation')
          return
        }

        const blogDirs = readdirSync(distBlogPath, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)

        console.log(`Generating ${blogDirs.length} redirect files for old /articles paths...`)

        for (const slug of blogDirs) {
          const oldPath = `/articles/${slug}`
          const newPath = `/blog/${slug}`

          const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="${newPath}">
  <meta http-equiv="refresh" content="0; url=${newPath}">
  <script>window.location.href = "${newPath}";</script>
</head>
<body>
  <p>This page has moved to <a href="${newPath}">${newPath}</a>.</p>
</body>
</html>`

          const outputPath = join(distArticlesPath, slug, 'index.html')
          mkdirSync(dirname(outputPath), { recursive: true })
          writeFileSync(outputPath, redirectHtml)
        }

        console.log('Redirect files generated successfully!')
      } catch (error) {
        console.warn('Could not generate redirect files:', error)
      }
    }
  },

  compatibilityDate: '2025-06-03'
});
