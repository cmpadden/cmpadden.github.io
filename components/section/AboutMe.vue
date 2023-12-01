<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const counter = ref(0);
const show = ref(true);

const occupations = ["Data Engineer", "Web Developer", "Musician", "Tinkerer"];
const pointer = ref(0);

const occupation = computed(() => occupations[pointer.value]);

const INTERVAL_DURATION = 1000;
const INTERVALS_VISIBLE = 4;

onMounted(() => {
  // show for 3 intervals, and hide for 1
  setInterval(function () {
    counter.value++;
    if (counter.value % INTERVALS_VISIBLE === 0) {
      show.value = false;
    } else {
      // update computed `occupation` value when show goes from false -> true
      // to prevent property from updating during transition duration
      if (!show.value) {
        if (pointer.value === occupations.length - 1) {
          pointer.value = 0;
        } else {
          pointer.value++;
        }
      }

      show.value = true;
    }
  }, INTERVAL_DURATION);
});
</script>

<template>
  <section class="container mx-auto pb-8">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div
          class="lg:text-normal space-y-4 font-medium tracking-wide text-white sm:text-base"
        >
          <div>
            I am a
            <span class="inline-block w-36">
              <HeadlessTransitionRoot
                as="template"
                appear
                :show="show"
                enter="transition transform duration-300 ease-out"
                enter-from="translate-y-2 opacity-0"
                enter-to="translate-x-0 opacity-100"
                leave="transition transform duration-300 ease-in"
                leave-from="opacity-100"
                leave-to="-translate-y-2 opacity-0"
              >
                <div
                  class="w-36 bg-white px-2 text-center font-extrabold tracking-wide text-black shadow-xl"
                >
                  {{ occupation }}
                </div>
              </HeadlessTransitionRoot>
            </span>
            helping build the future of finance at
            <a
              class="border-b-2 border-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.gemini.com/"
              >Gemini</a
            >.
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
