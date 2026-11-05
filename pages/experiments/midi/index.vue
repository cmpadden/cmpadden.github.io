<script setup lang="ts">
definePageMeta({ layout: "light" });
usePageSeo({
  title: "MIDI events",
  description: "View messages from a connected MIDI controller.",
  path: "/experiments/midi/",
});
type MidiEvent = {
  time: number;
  command: number;
  note: number;
  velocity: number;
  source: string;
};
const events = shallowRef<MidiEvent[]>([]);
const {
  supported,
  starting,
  midi,
  inputs,
  outputs,
  error,
  connect,
  disconnect,
} = useMidi((event) => {
  const data = event.data;
  if (!data) return;
  events.value = [
    ...events.value.slice(-14),
    {
      time: event.timeStamp,
      command: data[0] || 0,
      note: data[1] || 0,
      velocity: data[2] || 0,
      source: (event.target as MIDIInput | null)?.name || "Unknown device",
    },
  ];
});
const noteNames = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];
const noteName = (value: number) =>
  `${noteNames[value % 12]} (${Math.floor(value / 12) - 1})`;
const commandName = (command: number, velocity: number) => {
  const type = command & 0xf0;
  if (type === 0x80 || (type === 0x90 && velocity === 0)) return "Note Off";
  return type === 0x90 ? "Note On" : String(command);
};
</script>

<template>
  <section
    class="min-h-96 bg-gradient-to-b from-green-100 to-green-50 p-5 text-slate-900"
  >
    <h1 class="mb-5 text-3xl font-bold">MIDI Events</h1>
    <p v-if="supported === false">Web MIDI is not supported in this browser.</p>
    <div v-else class="space-x-3">
      <button
        type="button"
        class="rounded bg-green-800 px-4 py-2 text-white disabled:opacity-50"
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
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-green-800 text-white">
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Command</th>
              <th scope="col">Note</th>
              <th scope="col">Velocity</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!events.length">
              <td colspan="5" class="p-5">Press a key, or turn a knob!</td>
            </tr>
            <tr v-for="(event, index) in events" :key="index">
              <td>{{ event.time.toFixed(2) }}</td>
              <td>{{ commandName(event.command, event.velocity) }}</td>
              <td>
                {{
                  [0x80, 0x90].includes(event.command & 0xf0)
                    ? noteName(event.note)
                    : "—"
                }}
              </td>
              <td>{{ event.velocity }}</td>
              <td>{{ event.source }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </section>
</template>
