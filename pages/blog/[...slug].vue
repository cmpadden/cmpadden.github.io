<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

const isExternal = computed(() => Boolean((page.value as any)?.external_url));
const isDraft = computed(() => Boolean((page.value as any)?.draft));
const title = computed(() => pageTitle(page.value?.title));
const description = computed(() => articleDescription(page.value));
const canonical = computed(() => {
  const article = page.value as any;

  return (
    article?.canonical_url || article?.external_url || absoluteUrl(route.path)
  );
});
const socialImage = computed(() =>
  imageUrl((page.value as any)?.cover_image || (page.value as any)?.img),
);
const publishedDate = computed(() =>
  page.value?.date ? new Date(page.value.date).toISOString() : undefined,
);
const tags = computed(() => (page.value as any)?.tags || []);
const categories = computed(() => (page.value as any)?.categories || []);
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

function externalSite(p: any) {
  if (!p?.external_url) return "";
  if (p?.external_site) return p.external_site;
  try {
    const u = new URL(p.external_url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return p.external_url;
  }
}
</script>

<template>
  <div
    class="container mb-10 max-w-[1024px] space-y-6 text-white shadow-lg"
    v-if="page"
  >
    <!-- title -->
    <div class="flex">
      <!-- https://content.nuxt.com/components/content-slot -->
      <template v-if="page.cover_image || page.img">
        <img
          class="mr-4 h-16 border-2 border-black"
          :src="page.cover_image || page.img"
        />
      </template>

      <h1 class="text-2xl font-bold md:text-3xl">
        {{ page.title }}
      </h1>
    </div>

    <!-- Meta -->
    <div class="">
      <div class="flex-row space-x-0 md:flex md:space-x-2">
        <p class="text-sm text-gray-300 md:text-right">
          Published
          <NuxtTime
            :datetime="page.date"
            year="numeric"
            month="short"
            day="2-digit"
          />
        </p>

        <div v-if="false">
          <div class="flex flex-row space-x-2 uppercase">
            <div class="text-xs uppercase text-gray-400">Categories</div>
            <NuxtLink
              class="w-min rounded-md bg-background text-xs font-bold uppercase hover:cursor-pointer hover:text-orange-500"
              v-for="(category, ix) in page.categories"
              :key="ix"
              :to="`/blog?category=${category}`"
            >
              {{ category }}
            </NuxtLink>
          </div>
        </div>

        <div v-if="false">
          <div class="flex flex-row space-x-2 text-xs uppercase">
            <div class="text-xs uppercase text-gray-400">Tags</div>
            <NuxtLink
              class="w-min rounded-md bg-background font-bold hover:cursor-pointer hover:text-orange-500"
              v-for="(tag, ix) in page.tags"
              :key="ix"
              :to="`/blog?tag=${tag}`"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- external banner and CTA (below title/date, above content) -->
    <div
      v-if="page.external_url"
      class="flex items-center justify-between gap-4 rounded border border-orange-500/30 bg-orange-500/10 p-3"
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
        - Use prose-pre:bg-white to work with @nuxt/content syntax highlighting, otherwise background-color defaults to `.prose:where(pre)`
      -->
    <article
      class="prose max-w-[1024px] text-gray-300 prose-h2:mt-8 prose-a:font-bold prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-200 prose-blockquote:text-gray-400 prose-strong:text-gray-100 prose-code:text-white prose-pre:bg-black/70 prose-li:my-0"
    >
      <ContentRenderer v-if="page" :value="page" />
    </article>
  </div>
</template>

<style>
/*
 * For some reason min-height is set to 1rem in ProsePre.vue of @nuxt/content, override this for more suitable code block line height
 * https://github.com/nuxt/content/blob/056da889a28c2f8cfe622a2848a652324b4c32c8/src/runtime/components/Prose/ProsePre.vue#L43
 */
pre code .line {
  min-height: 0.25rem !important;
}
</style>
