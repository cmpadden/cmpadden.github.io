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
      :class="props.tightTop ? 'pb-8 pt-4' : 'py-8'"
    >
      <div class="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <nuxt-link
          class="relative text-orange-500 ring-2 ring-white hover:text-white hover:ring-orange-500"
          v-for="link in filtered_links"
          :key="link.title"
          :to="link.link"
        >
          <svg class="absolute right-0 top-0 size-8" viewBox="0 0 100 100">
            <polygon points="0,0 0,100 100,100" fill="currentColor" />
          </svg>
          <img
            class="h-64 w-full bg-gray-800 object-cover grayscale hover:grayscale-0"
            :src="link.img || 'images/placeholder.png'"
            :alt="link.title"
            loading="lazy"
            decoding="async"
          />
          <div
            class="absolute bottom-2 flex w-full items-center justify-center px-2"
          >
            <div
              class="noise-bg w-full bg-black/90 px-6 py-2 [--noise-opacity:0.16]"
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
