<script setup>
import { ChevronRightIcon } from "@heroicons/vue/16/solid";

const props = defineProps({
  articles: [],
  show_dates: false, });
</script>

<template>
  <section class="bg-emerald-950 bg-[url('/images/noise.svg')] text-white">
    <div class="container mx-auto space-y-4">
      <h1 class="text-3xl font-bold leading-tight text-white">
        Blog Posts
      </h1>

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="(article, ix) of articles" :key="ix">
          <!--
              Specify `external` to force the link to be considered as external. This
              resolves an issue where navigating to a blog post would load the previous
              post if the user clicked the back button -- this unexpected behavior is
              still not entirely understood, but at least this is a workaround.
          -->
          <NuxtLink :to="article._path" external>
            <div
              class="space-y-4 rounded-xl bg-black bg-opacity-70 p-4 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
            >
              <div class="">
                <div class="flex-1 text-lg font-bold md:text-xl">
                  {{ article.title }}
                </div>
                <div v-if="show_dates" class="text-sm font-light text-gray-400">
                  {{
                    new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                </div>
              </div>

              <div class="line-clamp-3 text-sm">
                {{ article.description }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div>
        <NuxtLink to="/articles" class="mt-4 flex text-red-200 hover:text-red-400 font-bold">
          More <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
