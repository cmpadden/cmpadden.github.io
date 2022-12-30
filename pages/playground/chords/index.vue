<template>
  <div
    class="h-screen text-white bg-gradient-to-b from-green-900 via-purple-900 to-indigo-900"
  >
    <!-- Message for unsupported browsers -->
    <div
      v-if="typeof midi === 'undefined'"
      class="p-4 font-light tracking-wide text-center"
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
            class="z-50 max-w-md text-sm font-normal leading-normal break-words bg-yellow-200 border-2 border-green-800 rounded-lg"
          >
            <div>
              <div
                class="p-3 mb-0 font-semibold text-white uppercase bg-green-600 border-b border-solid rounded-t-lg opacity-75"
              >
                MIDI Status
              </div>

              <div class="p-3 font-mono text-orange-900">
                <div class="mb-2 font-bold">
                  Enabled:
                  <span>
                    {{ typeof midi !== "undefined" ? "Yep!" : "Nope" }}
                  </span>
                </div>
                <div class="mb-2">
                  <div class="font-bold">Inputs:</div>
                  <div
                    v-if="inputs.length === 0"
                    class="p-4 italic text-center"
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
                    class="p-4 italic text-center"
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
            @click="tooltip = !tooltip"
            class="px-1 text-green-600 border-green-600 rounded-lg shadow bg-green-50 border-3 hover:text-green-500 hover:shadow-lg"
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
      <!-- display active key pressed in the bottom left of the screen -->
      <div class="absolute left-4 bottom-4">
        <div class="flex">
          <div v-for="note in orderedNotes()" :key="note" class="p-4">
            {{ note }}
          </div>
        </div>
      </div>
      <div class="h-screen grid place-items-center">
        <div>
          <div class="text-4xl font-semibold tracking-wide text-center">
            <!-- <div v-if="activeKeys.size === 0">-</div> -->
            <transition
              enter-active-class="duration-500 ease-out"
              enter-class="opacity-0 transform"
              enter-to-class="opacity-100"
              leave-active-class="duration-500"
              leave-class="opacity-100"
              leave-to-class="opacity-0 transform"
            >
              <div v-if="activeKeys.size >= 1">
                {{ chord() || "?" }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { identify } from "chords.ts";

definePageMeta({ layout: "light" });

export default {
  mounted() {
    // not all browsers support `requestMIDIAccess`
    if (typeof navigator.requestMIDIAccess !== "undefined") {
      navigator.requestMIDIAccess().then(
        (access: WebMidi.MIDIAccess) => {
          this.midi = access;
          this.midi.inputs.forEach((entry: any) => {
            entry.onmidimessage = (event: any) => {
              // key pressed -- add key to active keys
              if (event.data[0] === 144) {
                this.activeKeys.set(event.data[1], event.data);
                this.$forceUpdate();
              }
              // key released -- remove key from active keys
              if (event.data[0] === 128) {
                this.activeKeys.delete(event.data[1]);
                this.$forceUpdate();
              }
            };
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  },
  data() {
    return {
      tooltip: false,
      midi: undefined as undefined | WebMidi.MIDIAccess,
      activeKeys: new Map<number, object>(),
    };
  },
  computed: {
    inputs(): WebMidi.MIDIInput[] | undefined {
      if (typeof this.midi !== "undefined") {
        return Array.from(this.midi.inputs.values());
      }
      return undefined;
    },
    outputs(): WebMidi.MIDIOutput[] | undefined {
      if (typeof this.midi !== "undefined") {
        return Array.from(this.midi.outputs.values());
      }
      return undefined;
    },
  },
  methods: {
    orderedNotes(): number[] {
      return Array.from(this.activeKeys.keys()).sort();
    },
    chord(): string | undefined {
      // NOTE: this was made a `method` opposed to a `computed` property as it
      // was note reacting to changes to the underlying data. There was an attempt to
      // resolve this by using `Vue.delete` on the `activeKeys` and to run a
      // `this.$forceUpdate()` but neither of these solutions worked.
      const notes = Array.from(this.activeKeys.keys());

      // chord identification has been refactored into the `chords.ts` library
      return identify(notes).name;
    },
  },
};
</script>
