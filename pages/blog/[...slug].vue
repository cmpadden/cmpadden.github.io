<script setup lang="ts">
import type { BlogArticle } from "../../modules/content/runtime/types/blog-article";

const route = useRoute();

const slug = computed(() => {
  const value = route.params.slug;
  return Array.isArray(value) ? value.filter(Boolean).join("/") : value;
});

const { data: page } = await useFetch<BlogArticle>(
  () => `/api/articles/${slug.value}`,
);

const isExternal = computed(() => Boolean(page.value?.external_url));
const isDraft = computed(() => Boolean(page.value?.draft));
const title = computed(() => pageTitle(page.value?.title));
const description = computed(() => articleDescription(page.value));
const canonical = computed(() => {
  const article = page.value;

  return (
    article?.canonical_url || article?.external_url || absoluteUrl(route.path)
  );
});
const socialImage = computed(() =>
  imageUrl(page.value?.cover_image || page.value?.img),
);
const publishedDate = computed(() =>
  page.value?.date ? new Date(page.value.date).toISOString() : undefined,
);
const tags = computed(() => page.value?.tags ?? []);
const categories = computed(() => page.value?.categories ?? []);
const jsonLd = computed(() => {
  if (!page.value || isExternal.value) {
    return undefined;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: page.value.title,
    description: description.value,
    datePublished: publishedDate.value,
    dateModified: publishedDate.value,
    mainEntityOfPage: absoluteUrl(route.path),
    url: absoluteUrl(route.path),
    image: socialImage.value,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    keywords: [...tags.value, ...categories.value].join(", "),
  };
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: socialImage,
  ogUrl: canonical,
  ogType: "article",
  articlePublishedTime: publishedDate,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: socialImage,
});

useHead(() => ({
  link: [{ rel: "canonical", href: canonical.value }],
  meta: [
    isDraft.value
      ? { name: "robots", content: "noindex,nofollow" }
      : isExternal.value
        ? { name: "robots", content: "noindex,follow" }
        : undefined,
  ].filter(Boolean) as any,
  script: jsonLd.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(jsonLd.value),
        },
      ]
    : [],
}));
</script>

<template>
  <div v-if="page" class="min-h-screen pt-9">
    <div
      class="container mb-11 space-y-7 bg-black/75 py-7 text-white backdrop-blur-sm"
    >
      <div class="space-y-3">
        <!-- title -->
        <div class="flex">
          <template v-if="page.cover_image || page.img">
            <img
              class="mr-5 h-16 border-2 border-black"
              :src="page.cover_image || page.img"
            />
          </template>

          <h1 class="text-2xl font-bold md:text-3xl">
            {{ page.title }}
          </h1>
        </div>

        <!-- Post metadata -->
        <div class="flex items-center gap-3 text-sm text-gray-300">
          <NuxtTime
            :datetime="page.date"
            class="whitespace-nowrap tabular-nums"
            year="numeric"
            month="short"
            day="2-digit"
          />
          <span aria-hidden="true">·</span>
          <span>{{ page.readingTimeMinutes }} min read</span>
        </div>
      </div>

      <!-- external banner and CTA (below title/date, above content) -->
      <div
        v-if="page.external_url"
        class="flex items-center justify-between gap-5 rounded border border-orange-500/30 bg-orange-500/10 p-3"
      >
        <div class="text-sm text-gray-200">
          The original version of this article can be found on the

          <a
            :href="page.external_url"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-orange-300"
          >
            {{ externalSite(page) }}
          </a>
          blog.
        </div>
      </div>

      <!--
        - Remove maximum width of prose content: https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width
      -->
      <article
        class="prose prose-headings:text-white prose-h2:mt-5 prose-h2:mb-3 prose-h3:mt-5 prose-h3:mb-3 prose-h3:text-orange-100 prose-p:my-3 prose-a:font-bold prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-200 prose-blockquote:text-gray-400 prose-strong:text-gray-100 prose-code:text-white prose-pre:bg-black/70 prose-li:my-0 max-w-[1024px] text-gray-300"
      >
        <MarkdownDocument v-if="page?.document" :value="page.document" />
      </article>
    </div>
  </div>
</template>

<style>
/*
 * Keep code block line boxes compact when syntax highlighting wraps lines.
 */
pre code .line {
  min-height: 0.25rem !important;
}
</style>
