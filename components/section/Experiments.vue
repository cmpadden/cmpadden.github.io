<script setup>
import { experimentLinks } from "../../data/experiments";

const props = defineProps({
  showImages: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: null,
  },
  tightTop: {
    type: Boolean,
    default: false,
  },
});

const links = experimentLinks;

const visibleLinks = computed(() => links.filter((link) => !link.hidden));

const filtered_links = computed(() => {
  if (props.limit === null || props.limit <= 0) {
    return visibleLinks.value;
  } else {
    return visibleLinks.value.slice(0, props.limit);
  }
});
</script>

<template>
  <section
    class="to-background-dark bg-gradient-to-b from-transparent text-white"
  >
    <div
      class="container text-white"
      :class="props.tightTop ? 'pt-5 pb-9' : 'py-9'"
    >
      <div class="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <nuxt-link
          class="relative text-orange-500 ring-2 ring-white hover:text-white hover:ring-orange-500"
          v-for="(link, index) in filtered_links"
          :key="link.title"
          :to="link.link"
          :prefetch-on="{ interaction: true }"
        >
          <ExperimentCoverImage
            :src="link.img || '/images/placeholder.png'"
            :alt="link.title"
            :loading="index < 3 ? 'eager' : 'lazy'"
          />
          <div
            class="pointer-events-none absolute inset-0 bg-orange-500/10 mix-blend-color"
          />
          <div
            class="absolute bottom-2 z-10 flex w-full items-center justify-center px-3"
          >
            <div
              class="noise-bg w-full bg-black/90 px-7 py-3 [--noise-opacity:0.16]"
            >
              <h3 class="text-xl font-bold text-white">
                {{ link.title }}
              </h3>
              <div
                class="line-clamp-1 text-sm text-gray-300"
                v-html="link.description"
              ></div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <!-- <MoreLink to="/experiments">More</MoreLink> -->
    </div>
  </section>
</template>
