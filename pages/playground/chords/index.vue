<template>
  <div class="h-screen bg-gradient-to-b from-green-900 via-purple-900 to-indigo-900 text-white">
    <!-- Message for unsupported browsers -->
    <div
      v-if="typeof midi === 'undefined'"
      class="font-light tracking-wide text-center p-4"
    >
      Unfortunately, the Web MIDI API is
      <a
        class="text-blue-500 underline"
        href="https://developer.mozilla.org/en-US/docs/Web/API/MIDIMessageEvent#browser_compatibility"
        >not supported</a
      >
      in all browsers...
    </div>

    <!-- Main application -->
    <div v-else>
      <div class="flex flex-wrap">
        <div class="absolute bottom-16 right-2">
          <div
            v-bind:class="{ hidden: !tooltip, block: tooltip }"
            class="bg-yellow-200 border-2 border-green-800 z-50 font-normal leading-normal text-sm break-words rounded-lg max-w-md"
          >
            <div>
              <div
                class="bg-green-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid uppercase rounded-t-lg"
              >
                MIDI Status
              </div>

              <div class="text-orange-900 font-mono p-3">
                <div class="font-bold mb-2">
                  Enabled:
                  <span>
                    {{ typeof midi !== 'undefined' ? 'Yep!' : 'Nope' }}
                  </span>
                </div>
                <div class="mb-2">
                  <div class="font-bold">Inputs:</div>
                  <div
                    v-if="inputs.length === 0"
                    class="text-center p-4 italic"
                  >
                    No input devices detected :(
                  </div>
                  <div v-else>
                    <div v-for="input in inputs" :key="input.id" class="flex">
                      <div class="flex-1">{{ input.manufacturer }}</div>
                      <div class="flex-1">{{ input.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <div class="font-bold">Outputs:</div>
                  <div
                    v-if="outputs.length === 0"
                    class="text-center p-4 italic"
                  >
                    No output devices detected :(
                  </div>
                  <div v-else>
                    <div
                      v-for="output in outputs"
                      :key="output.id"
                      class="flex"
                    >
                      <div class="flex-1">{{ output.manufacturer }}</div>
                      <div class="flex-1">{{ output.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-2 right-2">
          <button
            ref="btnRef"
            @click="tooltip = !tooltip"
            class="bg-green-800 text-white hover:text-yellow-200 py-1 px-2 rounded-lg shadow hover:shadow-lg"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 20 20"
              class="w-10 h-10"
            >
              <g fill="none">
                <path
                  d="M2.5 4a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-15zm.5 6h2v3.5a.5.5 0 0 0 1 0V10h2v3.5a.5.5 0 0 0 1 0V10h2v3.5a.5.5 0 0 0 1 0V10h2v3.5a.5.5 0 0 0 1 0V10h2v5H3v-5zm2.75-2.5a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5zm6.25-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-3 .251a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div class="grid place-items-center h-screen">
        <div>
          <div class="text-center font-semibold tracking-wide text-4xl">
            <!-- <div v-if="activeKeys.size === 0">-</div> -->
            <transition
              enter-active-class="duration-500 ease-out"
              enter-class="transform opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="duration-500"
              leave-class="opacity-100"
              leave-to-class="transform opacity-0"
            >
              <!-- note: keys are required for transitions to apply on elements with the same tag -->
              <div v-if="activeKeys.size !== 0">
                {{ chord() || '?' }}
              </div>
            </transition>
          </div>
          <!-- <div class="flex"> -->
          <!--   <div v-for="key in activeKeys.entries()" :key="key[0]" class="p-4"> -->
          <!--     {{ key[0] }} -->
          <!--   </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// http://www.somascape.org/midi/basic/notes.html
const NOTE_MAPPINGS = [
  'C',
  'C# / Db',
  'D',
  'D# / Eb',
  'E',
  'F',
  'F# / Bb',
  'G',
  'G# / Ab',
  'A',
  'A# / Bb',
  'B',
]

export default Vue.extend({
  layout: 'light',
  mounted() {
    // not all browsers support `requestMIDIAccess`
    if (typeof navigator.requestMIDIAccess !== 'undefined') {
      navigator.requestMIDIAccess().then(
        (access: WebMidi.MIDIAccess) => {
          this.midi = access
          this.midi.inputs.forEach((entry: any) => {
            entry.onmidimessage = (event: any) => {
              // key pressed -- add key to active keys
              if (event.data[0] === 144) {
                this.activeKeys.set(event.data[1], event.data)
                this.$forceUpdate()
              }
              // key released -- remove key from active keys
              if (event.data[0] === 128) {
                this.activeKeys.delete(event.data[1])
                this.$forceUpdate()
              }
            }
          })
        },
        (error) => {
          console.error(error)
        }
      )
    }
  },
  data() {
    return {
      tooltip: false,
      midi: undefined as undefined | WebMidi.MIDIAccess,
      activeKeys: new Map<number, object>(),
    }
  },
  computed: {
    inputs(): WebMidi.MIDIInput[] | undefined {
      if (typeof this.midi !== 'undefined') {
        return Array.from(this.midi.inputs.values())
      }
      return undefined
    },
    outputs(): WebMidi.MIDIOutput[] | undefined {
      if (typeof this.midi !== 'undefined') {
        return Array.from(this.midi.outputs.values())
      }
      return undefined
    },
  },
  methods: {
    chord(): string | undefined {
      // NOTE: this was made a `method` opposed to a `computed` property as it
      // was note reacting to changes to the underlying data. There was an attempt to
      // resolve this by using `Vue.delete` on the `activeKeys` and to run a
      // `this.$forceUpdate()` but neither of these solutions worked.

      // starting with the bass note of the chord, determine the chord shape.
      // For example, a C-major chord will have a bass note of C, and a shape
      // of [0, 4, 7].

      const orderedNotes = Array.from(this.activeKeys.keys()).sort()

      const bassNote: number = orderedNotes[0]
      const bassNoteLetter: string = NOTE_MAPPINGS[bassNote % 12]

      // NOTE: we don't always want to look at the bass note to determine the
      // chord, but instead need to take into consideration inverted chords

      const normalizedNotes: string = orderedNotes
        .map((n) => n - bassNote)
        .join(' ')

      const CHORD_MAPPINGS = new Map<string, string>(
        Object.entries({
          '0 2 7': 'sus 2',
          '0 3 7 11': 'Minor Major 7th',
          '0 3 7': 'Minor',
          '0 4 7 11': 'Major 7th',
          '0 4 7': 'Major',
          '0 4 8': 'Augmented',
          '0 5 7': 'sus 4',
        })
      )
      const chord = CHORD_MAPPINGS.get(normalizedNotes)

      return chord ? `${bassNoteLetter} ${chord}` : undefined
    },
  },
  filters: {
    midiCommand: (value: number) => {
      // https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message
      switch (value) {
        case 144:
          return 'Note On'
        case 128:
          return 'Note Off'
        default:
          return value
      }
    },
    midiNote: (value: number) => {
      // construct note octave string representation where the index of MIDI
      // note modulus 12 corresponds with note letter
      return `${NOTE_MAPPINGS[value % 12]} (${Math.floor(value / 12) - 2})`
    },
  },
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
