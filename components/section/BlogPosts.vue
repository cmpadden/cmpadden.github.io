<script setup>
const props = defineProps({
  articles: Object,
  show_dates: false,
});

function externalSite(article) {
  if (!article?.external_url) return "";
  if (article?.external_site) return article.external_site;
  try {
    const u = new URL(article.external_url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return article.external_url;
  }
}
</script>

<template>
  <section class="container space-y-2">
    <div class="grid grid-cols-1 gap-3">
      <div v-for="(article, ix) of articles" :key="ix">
        <NuxtLink :to="article.path">
          <div
            class="h-full space-y-2 bg-black/50 p-3 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
          >
            <div class="flex items-center gap-2">
              <div
                class="line-clamp-1 flex-1 text-lg font-bold md:text-xl"
                :title="article.title"
              >
                {{ article.title }}
              </div>
              <div class="flex items-center gap-2 md:ml-auto">
                <ExternalIndicator
                  v-if="article.external_url"
                  :site="externalSite(article)"
                />
              </div>
            </div>
            <template v-if="show_dates">
              <NuxtTime
                :datetime="article.date"
                class="text-xs text-gray-300"
                year="numeric"
                month="short"
                day="2-digit"
              />
            </template>
            <div class="line-clamp-3 text-sm text-gray-100">
              {{
                article.description ||
                article.meta?.excerpt?.children?.[0]?.value
              }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <MoreLink to="/blog">See more posts</MoreLink>
  </section>
</template>
