<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const counter = ref(0);
const show = ref(true);

const occupations = ["Data Engineer", "Web Developer", "Musician", "Tinkerer"];
const pointer = ref(0);

const occupation = computed(() => occupations[pointer.value]);

onMounted(() => {
  // show for 3 intervals, and hide for 1
  setInterval(function () {
    counter.value++;
    if (counter.value % 3 === 0) {
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
  }, 1000);
});
</script>

<template>
  <section class="container mx-auto mb-8">
    <div class="flex flex-wrap">
      <div class="w-full">
        <!-- <h1 class="pb-4 text-4xl font-bold leading-tight text-white"> -->
        <!--   Who&#183;Am&#183;I -->
        <!-- </h1> -->
        <div
          class="font-medium tracking-wide text-white sm:text-base lg:text-normal pr-4 space-y-4"
        >
          <div>
            I am a
            <span class="w-36 inline-block">
              <HeadlessTransitionRoot
                as="template"
                appear
                :show="show"
                enter="transition transform duration-300 ease-out"
                enter-from="translate-y-3 opacity-0"
                enter-to="translate-x-0 opacity-100"
                leave="transition transform duration-500 ease-in"
                leave-from="opacity-100"
                leave-to="-translate-y-3 opacity-0"
              >
                <div
                  class="shadow-xl bg-gradient-to-r from-sky-700 to-teal-700 px-2 w-36 font-extrabold tracking-wide text-center"
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
