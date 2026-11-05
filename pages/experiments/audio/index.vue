<script setup lang="ts">
const { enabled, starting, error, samples, summaries, start, stop } =
  useAudioMonitor();
usePageSeo({
  title: "Audio visualizer",
  description:
    "Explore microphone waveforms, frequencies, and a live spectrogram.",
  path: "/experiments/audio/",
});
const visualizations = [
  { mode: "waveform", title: "Time Domain Waveform" },
  { mode: "spectrogram", title: "Frequency Spectrogram" },
  { mode: "frequency", title: "Frequency Bar Chart" },
] as const;
const tables = computed(() => [
  { title: "Frequency Buffer History", rows: summaries.value.frequency },
  { title: "Time Domain Buffer History", rows: summaries.value.waveform },
]);
</script>

<template>
  <section class="container py-5 font-mono">
    <h1 class="sr-only">Audio visualizer</h1>
    <div class="grid grid-cols-3 gap-5 bg-black text-white">
      <div class="col-span-3 space-x-3">
        <button
          type="button"
          class="rounded-lg px-7 py-3 text-sm font-bold uppercase shadow-lg shadow-green-400/25 disabled:opacity-50"
          :disabled="enabled || starting"
          @click="start"
        >
          {{ starting ? "Enabling…" : "Enable" }}
        </button>
        <button
          type="button"
          class="rounded-lg px-7 py-3 text-sm font-bold uppercase shadow-lg shadow-red-400/25 disabled:opacity-50"
          :disabled="!enabled && !starting"
          @click="stop"
        >
          Disable
        </button>
        <p v-if="error" role="alert" class="p-3 text-red-300">{{ error }}</p>
      </div>
      <div
        v-for="visualization in visualizations"
        :key="visualization.mode"
        class="col-span-3 min-w-0 rounded-xl bg-black/75 p-5 lg:col-span-1"
      >
        <h2 class="mb-3 text-xl font-bold">{{ visualization.title }}</h2>
        <ExperimentsAudioVisualizer
          :mode="visualization.mode"
          :samples="samples"
        />
      </div>
      <div
        v-for="table in tables"
        :key="table.title"
        class="col-span-3 overflow-x-auto rounded-xl p-5"
      >
        <h2 class="mb-3 text-xl font-bold">{{ table.title }}</h2>
        <table class="w-full table-fixed text-sm">
          <thead class="border-b-2">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Mean</th>
              <th scope="col">Min</th>
              <th scope="col">Max</th>
              <th scope="col">FFT</th>
              <th scope="col">Buffer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in table.rows" :key="index">
              <td>{{ index }}</td>
              <td>{{ row.mean }}</td>
              <td>{{ row.min }}</td>
              <td>{{ row.max }}</td>
              <td>{{ row.length }}</td>
              <td class="truncate">{{ row.preview }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
