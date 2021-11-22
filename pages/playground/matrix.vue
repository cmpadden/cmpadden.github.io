<template>
  <div class="m-4 space-y-4">
    <!-- Instructions -->
    <div class="m-2 w-4/5">
      Walk through the steps of matrix multiplication with randomly generated
      matrices. Press the <em>Spacebar</em> or click the
      <em class="bg-blue-200 text-blue-800">buttons</em> to iterate through the
      steps.
    </div>

    <!-- Buttons -->
    <div class="m-2 inline-flex space-x-2">
      <button
        class="
          bg-blue-200
          text-blue-800
          hover:bg-blue-800 hover:text-blue-200
          font-bold
          py-2
          px-4
        "
        :disabled="!started"
        :class="{ 'opacity-25 cursor-not-allowed': !started }"
        @click="decStep"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        v-if="!done"
        class="
          bg-blue-200
          text-blue-800
          hover:bg-blue-800 hover:text-blue-200
          font-bold
          py-2
          px-4
        "
        @click="matmul(a, b)"
      >
        Start
      </button>
      <button
        v-if="done"
        class="
          bg-orange-200
          text-orange-800
          hover:bg-blue-800 hover:text-blue-200
          font-bold
          py-2
          px-4
        "
        @click="generateRandomMatrices"
      >
        Again!
      </button>
      <button
        class="
          bg-blue-200
          text-blue-800
          hover:bg-blue-800 hover:text-blue-200
          font-bold
          py-2
          px-4
        "
        :disabled="!started"
        :class="{ 'opacity-25 cursor-not-allowed': !started }"
        @click="incStep"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <!-- Matrices -->
    <div class="flex flex-wrap">
      <div class="w-34 sm:w-min m-2 border border-gray-400">
        <div class="font-bold text-center bg-gray-200 p-4">Matrix A</div>
        <div class="p-4 flex justify-center items-center">
          <table class="text-center">
            <tr v-for="(row, i) in a" :key="i">
              <td
                v-for="(col, j) in a[i]"
                :key="j"
                :class="{
                  'text-green-600':
                    step && i == step['row_a'] && j == step['col_a'],
                  'bg-orange-100': step && i == step['row_a'],
                }"
                class="p-2"
              >
                {{ a[i][j] }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="w-34 sm:w-min m-2 border border-gray-400">
        <div class="font-bold text-center bg-gray-200 p-4">Matrix B</div>
        <div class="p-4 flex justify-center items-center">
          <table class="text-center">
            <tr v-for="(row, i) in b" :key="i">
              <td
                v-for="(col, j) in b[i]"
                :key="j"
                :class="{
                  'text-green-600':
                    step && i == step['row_b'] && j == step['col_b'],
                  'bg-orange-100': step && j == step['col_b'],
                }"
                class="p-2"
              >
                {{ b[i][j] }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Result -->
      <div
        v-if="started"
        class="w-72 sm:w-min m-2 border border-gray-400"
        :class="{ 'bg-green-200': done }"
      >
        <div class="font-bold text-center bg-gray-200 p-4">Result</div>
        <div class="p-4 flex justify-center items-center">
          <table class="text-center">
            <tr v-for="(row, i) in step['c']" :key="i">
              <td v-for="(col, j) in step['c'][i]" :key="j" class="p-2">
                {{ step['c'][i][j] }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Log of all steps -->
      <div
        v-if="started"
        class="w-72 m-2 p-2 border border-gray-400 bg-gray-100"
      >
        <div class="font-bold text-center">Steps</div>
        <div class="font-mono">
          <div v-for="(s, i) in step['all_steps']" :key="i">
            {{ s }}
          </div>
          <div v-if="done" class="italic text-green-600">Done!</div>
        </div>
      </div>
    </div>

    <!-- Debug -->
    <div v-if="false" class="border border-gray-400 p-2">
      {{ step }}
    </div>
  </div>
</template>

<script>
// detect accelerometer shake as alternative to space bar?
export default {
  layout: 'light',
  data() {
    return {
      ix: 0,
      a: [],
      b: [],
      timeline: [],
    }
  },
  computed: {
    step() {
      if (this.timeline.length > 0) {
        return this.timeline[this.ix]
      }
      return {}
    },
    done() {
      return this.timeline.length - 1 === this.ix
    },
    started() {
      return this.timeline.length > 0
    },
  },
  mounted() {
    this.generateRandomMatrices()
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.incStep()
      } else if (e.key === 'Escape') {
        this.ix = 0
      }
    })
  },
  methods: {
    randomMatrix(n, m) {
      const matrix = []
      for (let i = 0; i < n; i++) {
        matrix.push(
          Array(m)
            .fill()
            .map(() => Math.round(Math.random() * 10))
        )
      }
      return matrix
    },
    generateRandomMatrices() {
      this.a = this.randomMatrix(3, 4)
      this.b = this.randomMatrix(4, 3)
      this.timeline = []
      this.ix = 0
    },
    matmul(a, b) {
      // watch out -- spaghetti below...

      // Construct a list of the steps required to perform matrix
      // multiplication. This will be used to step through the state/timeline of
      // the matrix multiplication process.
      this.timeline = []

      // Resulting matrix will have the same number of columns as matrix A, and
      // the same number of rows as matrix B
      const c = []
      for (let i = 0; i < a.length; i++) {
        c.push(Array(b[i].length).fill(0))
      }

      const steps = Array(a.length * b[0].length)

      a.forEach((_, i) => {
        b[i].forEach((_, j) => {
          // keep track of multiplication operations
          const multis = []

          a[i].forEach((_, k) => {
            // compose multiplication steps (+=)
            multis.push(`${a[j][k]}*${b[k][i]}`)
            c[j][i] += a[j][k] * b[k][i]

            // update steps as multiplication and addition steps are introduced
            steps[i * a.length + j] = `${multis.join(' + ')} = ${c[j][i]}`

            // clone the result array, otherwise it will be passed by reference
            const cCopy = JSON.parse(JSON.stringify(c))

            this.timeline.push({
              row_a: j,
              col_a: k,
              row_b: k,
              col_b: i,
              row_c: j,
              col_c: i,
              cur_a: a[j][k],
              cur_b: b[k][i],
              cur_c: c[j][i],
              c: cCopy,
              all_steps: steps.slice(),
            })
          })
        })
      })
    },
    incStep() {
      if (this.ix !== this.timeline.length - 1) {
        this.ix += 1
      }
    },
    decStep() {
      if (this.ix > 0) {
        this.ix -= 1
      }
    },
  },
}
</script>
