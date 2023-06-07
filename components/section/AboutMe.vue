<script setup lang="ts">
import { ref, onMounted } from "vue";

const ix = ref(0);

const OCCUPATIONS = ["Data Engineer", "Web Developer", "Musician", "Tinkerer"];

const OCCUPATION_INTERVAL = 3000

onMounted(() => {
  setInterval(function () {
    if (ix.value === OCCUPATIONS.length - 1) {
      ix.value = 0;
    } else {
      ix.value = ix.value + 1;
    }
  }, OCCUPATION_INTERVAL);
});
</script>

<template>
  <section class="container mx-auto mb-8">
    <div class="flex flex-wrap">
      <div class="w-full">
        <h1 class="pb-4 text-4xl font-bold leading-tight text-white">
          Who&#183;Am&#183;I
        </h1>
        <div
          class="font-medium tracking-wide text-white sm:text-base lg:text-lg pr-4"
        >
          <p>
            I am a
            <!-- todo - use transition element to rotate between values -->
            <div
              :key="OCCUPATIONS[ix]"
              class="gradient-highlight inline-block"
            >
              {{ OCCUPATIONS[ix] }}
            </div>
            helping build the future of finance at
            <a
              class="border-b-2 border-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.gemini.com/"
              >Gemini</a
            >.
          </p>
          <br />
          <p>
            Previously, I worked at Georgetown University's
            <a
              class="border-b-2 border-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://mccourt.georgetown.edu/research/the-massive-data-institute/"
              >Massive Data Institute</a
            >
            building data warehousing and processing solutions to help social
            scientists and researchers more easily leverage large-scale organic
            data in their research.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
