<script setup lang="ts">
import { identify } from "chords.ts";
definePageMeta({ layout: "light" });
usePageSeo({
  title: "MIDI chords",
  description: "Identify chords played on a connected MIDI keyboard.",
  path: "/experiments/chords/",
});
// Key by input + channel + pitch, so one device's Note Off cannot release another.
const activeKeys = reactive(new Map<string, number>());
const {
  supported,
  starting,
  midi,
  inputs,
  outputs,
  error,
  connect,
  disconnect,
} = useMidi(
  (event) => {
    const data = event.data;
    if (!data || data.length < 3) return;
    const command = data[0]! & 0xf0;
    const key = `${(event.target as MIDIInput | null)?.id}:${data[0]! & 0x0f}:${data[1]}`;
    if (command === 0x90 && data[2]! > 0) activeKeys.set(key, data[1]!);
    else if (command === 0x80 || command === 0x90) activeKeys.delete(key);
  },
  () => activeKeys.clear(),
);
const orderedNotes = computed(() =>
  [...new Set(activeKeys.values())].sort((a, b) => a - b),
);
const chord = computed(() =>
  orderedNotes.value.length ? identify(orderedNotes.value).name || "?" : "—",
);
</script>

<template>
  <section
    class="relative min-h-[32rem] overflow-hidden bg-gradient-to-b from-green-900 via-purple-900 to-indigo-900 p-5 text-white"
  >
    <h1 class="mb-5 text-3xl font-bold">MIDI Chords</h1>
    <p v-if="supported === false">Web MIDI is not supported in this browser.</p>
    <div v-else class="space-x-3">
      <button
        type="button"
        class="rounded border px-4 py-2 disabled:opacity-50"
        :disabled="starting || !!midi"
        @click="connect"
      >
        {{ starting ? "Connecting…" : "Enable MIDI" }}
      </button>
      <button
        type="button"
        class="rounded border px-4 py-2 disabled:opacity-50"
        :disabled="!midi && !starting"
        @click="disconnect"
      >
        Disconnect
      </button>
    </div>
    <p v-if="error" role="alert" class="my-3">{{ error }}</p>
    <template v-if="midi">
      <ExperimentsMidiStatus :inputs="inputs" :outputs="outputs" />
      <div class="grid min-h-72 place-items-center">
        <output aria-live="polite" class="text-4xl font-semibold">{{
          chord
        }}</output>
      </div>
      <p>Active notes: {{ orderedNotes.join(", ") || "None" }}</p>
    </template>
  </section>
</template>
