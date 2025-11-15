<template>
  <div class="flex h-screen flex-col font-mono">
    <!-- flex layout reference: https://play.tailwindcss.com/uOnWQzR9tl -->
    <div class="flex flex-1 overflow-hidden">
      <!-- sidebar -->
      <div class="flex w-20 bg-amber-500">
        <div
          class="absolute bottom-10 w-20 -rotate-90 transform whitespace-nowrap"
        >
          <div class="text-4xl font-bold text-white">
            1000 French Conjugations
          </div>
        </div>
      </div>

      <!-- main content -->
      <div class="flex flex-1 flex-col overflow-y-auto bg-amber-100 p-8">
        <template v-if="conjugations && conjugations.length > 0 && word">
          <!-- dismissible instructions -->
          <div class="flex rounded-xl bg-amber-500 p-4">
            <div class="text-center text-xl italic text-white">
              Click a word to the left or right to cycle through the 1000 most
              popular French verb conjugations!
            </div>
          </div>

          <!-- search -->

          <div class="inline-flex flex-col justify-center py-4 text-gray-600">
            <input
              v-model="search"
              class="rounded-xl border border-2 border-gray-400 p-2 pl-8 focus:border-amber-500 focus:outline-none"
              type="search"
              autocomplete="off"
              placeholder="Search Words"
            />
            <ul
              v-if="suggestions.length > 0"
              class="mt-2 w-full border border-gray-100 bg-white"
            >
              <li
                v-for="s in suggestions"
                :key="s.word"
                class="relative cursor-pointer py-1 pl-8 pr-2 hover:bg-yellow-50 hover:text-gray-900"
                @click="searchNavigate(s)"
              >
                <svg
                  class="absolute left-2 top-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  />
                </svg>
                {{ s.word }}
              </li>
            </ul>
          </div>

          <!-- window over words -->
          <div class="flex p-4">
            <div
              class="flex-1 cursor-pointer select-none text-center text-2xl text-gray-400"
              @click="decWordIndex"
            >
              {{ wordPrev ? wordPrev.word : "-" }}
            </div>
            <div class="text-cyan-600 flex-1 text-center text-3xl font-bold">
              <span class="text-amber-500"> #{{ word.word_popularity }}</span>
              {{ word.word }}
            </div>
            <div
              class="flex-1 cursor-pointer select-none text-center text-2xl text-gray-400"
              @click="incWordIndex"
            >
              {{ wordNext ? wordNext.word : "-" }}
            </div>
          </div>

          <!-- conjugations -->
          <div
            class="grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4 xl:gap-12"
          >
            <div v-for="(conjs, tense) in word.conjugations" :key="tense">
              <div
                class="border-cyan-600 h-full space-y-3 rounded-md border-2 bg-white p-4 shadow shadow-amber-500"
              >
                <h1 class="text-2xl font-semibold capitalize text-gray-700">
                  {{ tense }}
                </h1>

                <div class="text-gray-500">
                  <p v-for="(conj, ix) in conjs" :key="ix">
                    <i v-for="(comp, ij) in conj" :key="ij">
                      {{ comp.text }}
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="italic">Loading...</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Conjugation = {
  word: string;
  word_popularity: number;
  conjugations: Object;
};

definePageMeta({ layout: "light" });

const wordIndex = ref<number>(0);
const search = ref("");
const suggestions = ref([]);

const { data: conjugations } = await useFetch(
  "/api/french-conjugations",
  {
    transform: (value) => {
      return value as Conjugation[];
    },
  },
);

const word = computed(() => {
  if (conjugations.value) {
    return conjugations.value[wordIndex.value];
  }
});

const wordPrev = computed(() => {
  if (conjugations.value === null) {
    return undefined;
  }
  return wordIndex.value === 0
    ? undefined
    : conjugations.value[wordIndex.value - 1];
});

const wordNext = computed(() => {
  if (conjugations.value === null) {
    return undefined;
  }
  return wordIndex.value + 1 === conjugations.value.length
    ? undefined
    : conjugations.value[wordIndex.value + 1];
});

watch(search, (value: string) => {
  suggestions.value = [];
  if (!value) {
    return;
  }

  let count = 0;
  suggestions.value = conjugations.value.filter((v: Conjugation) => {
    const match = v.word
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .includes(value);
    if (match && count <= 5) {
      count++;
      return true;
    }
    return false;
  });
});

const incWordIndex = () => {
  if (conjugations.value && wordIndex.value < conjugations.value.length - 1) {
    wordIndex.value += 1;
  }
};

const decWordIndex = () => {
  if (wordIndex.value > 0) {
    wordIndex.value -= 1;
  }
};

const searchNavigate = (word: Conjugation) => {
  search.value = "";
  suggestions.value = [];
  wordIndex.value = word.word_popularity - 1;
};
</script>
