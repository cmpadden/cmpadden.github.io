<template>
  <div class="h-screen bg-gradient-to-b from-green-100 to-green-50">
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
    <div v-else class="flex flex-wrap">
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
                <div v-for="input in inputs" :key="input.id" class="flex">
                  <div class="flex-1">{{ input.manufacturer }}</div>
                  <div class="flex-1">{{ input.name }}</div>
                </div>
              </div>
              <div class="mb-2">
                <div class="font-bold">Outputs:</div>
                <div v-for="output in outputs" :key="output.id" class="flex">
                  <div class="flex-1">{{ output.manufacturer }}</div>
                  <div class="flex-1">{{ output.name }}</div>
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

    <div class="container mx-auto p-8">
      <div class="font-display font-light tracking-wide text-4xl">
        MIDI Events
      </div>
      <table
        class="table-auto w-full bg-green-50 text-sm border-2 border-green-800"
      >
        <thead class="font-semibold uppercase text-white bg-green-800">
          <tr>
            <th class="p-2 text-left">Timestamp</th>
            <th class="p-2 text-left">Command #</th>
            <th class="p-2 text-left">Command</th>
            <th class="p-2 text-left">Note #</th>
            <th class="p-2 text-left">Note</th>
            <th class="p-2 text-left">Velocity</th>
            <th class="p-2 text-right">MIDI Source</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="events.length === 0">
            <td class="text-center p-4 italic" colspan="7">
              Press a key, or turn a knob!
            </td>
          </tr>
          <tr v-for="(event, ix) in events" :key="ix">
            <td class="p-2 text-left">{{ event.timeStamp.toFixed(2) }}</td>
            <td class="p-2 text-left">{{ event.data[0] }}</td>
            <td class="p-2 text-left">{{ event.data[0] | midiCommand }}</td>
            <td class="p-2 text-left">{{ event.data[1] }}</td>
            <td class="p-2 text-left">
              {{
                event.data[0] === 144 || event.data[0] == 128
                  ? (event.data[1] | midiNote)
                  : '-'
              }}
            </td>
            <td class="p-2 text-left">{{ event.data[2] }}</td>
            <td class="p-2 text-right">{{ event.srcElement.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
              this.events.push(event)

              // limit the number of events in the array to 10
              if (this.events.length > 15) {
                this.events.shift()
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
      events: [] as any[],
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
      // http://www.somascape.org/midi/basic/notes.html
      switch (value % 12) {
        case 0:
          return 'C'
        case 1:
          return 'C# / Db'
        case 2:
          return 'D'
        case 3:
          return 'D# / Eb'
        case 4:
          return 'E'
        case 5:
          return 'F'
        case 6:
          return 'F# / Bb'
        case 7:
          return 'G'
        case 8:
          return 'G# / Ab'
        case 9:
          return 'A'
        case 10:
          return 'A# / Bb'
        case 11:
          return 'B'
        default:
          return value
      }
    },
  },
})
</script>
