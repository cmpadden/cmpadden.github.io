<template>
  <div class="font-mono flex flex-col h-screen">
    <!-- flex layout reference: https://play.tailwindcss.com/uOnWQzR9tl -->
    <div class="flex flex-1 overflow-hidden">
      <!-- sidebar -->
      <div class="flex bg-orange-500 w-20">
        <div
          class="w-20 absolute bottom-10 transform -rotate-90 whitespace-nowrap"
        >
          <div class="text-4xl font-bold text-white">
            1000 French Conjugations
          </div>
        </div>
      </div>
      <!-- main content -->
      <div class="flex flex-1 flex-col overflow-y-auto bg-orange-100 p-8">
        <template v-if="word">
          <!-- dismissible instructions -->
          <div class="flex p-4 bg-orange-500 rounded-xl">
            <div class="text-center text-white text-xl italic">
              Click a word to the left or right to cycle through the 1000 most
              popular French verb conjugations!
            </div>
          </div>

          <!-- window over words -->
          <div class="flex p-4">
            <div
              class="flex-1 text-center text-gray-400 text-2xl select-none"
              @click="decWordIndex"
            >
              {{ wordPrev ? wordPrev.word : '-' }}
            </div>
            <div class="flex-1 text-center text-cyan-600 text-3xl font-bold">
              <span class="text-orange-500"> #{{ word.word_popularity }}</span>
              {{ word.word }}
            </div>
            <div
              class="flex-1 text-center text-gray-400 text-2xl select-none"
              @click="incWordIndex"
            >
              {{ wordNext ? wordNext.word : '-' }}
            </div>
          </div>

          <!-- conjugations -->
          <div
            class="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-3 xl:grid-cols-4"
          >
            <div v-for="(conjs, tense) in word.conjugations" :key="tense">
              <div
                class="p-4 space-y-3 border-2 border-cyan-600 dark:border-cyan-300 rounded-md h-full shadow shadow-orange-500 bg-white"
              >
                <h1
                  class="text-2xl font-semibold text-gray-700 capitalize dark:text-white"
                >
                  {{ tense }}
                </h1>

                <div class="text-gray-500 dark:text-gray-300">
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

<script lang="ts">
import Vue from 'vue'

// @ts-ignore
import conjugations from '~/static/1000_french_conjugations.json'

export default Vue.extend({
  layout: 'light',
  data() {
    return {
      wordIndex: 0,
      conjugations,
    }
  },
  computed: {
    word(): string {
      return this.conjugations[this.wordIndex]
    },
    wordPrev(): string | undefined {
      if (this.wordIndex === 0) {
        return undefined
      } else {
        return this.conjugations[this.wordIndex - 1]
      }
    },
    wordNext(): string | undefined {
      if (this.wordIndex + 1 === this.conjugations.length) {
        return undefined
      } else {
        return this.conjugations[this.wordIndex + 1]
      }
    },
  },
  methods: {
    incWordIndex() {
      if (this.wordIndex < this.conjugations.length - 1) {
        this.wordIndex += 1
      }
    },
    decWordIndex() {
      if (this.wordIndex > 0) {
        this.wordIndex -= 1
      }
    },
  },
})
</script>
