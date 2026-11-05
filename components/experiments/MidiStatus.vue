<script setup lang="ts">
defineProps<{ inputs: MIDIInput[]; outputs: MIDIOutput[] }>();
</script>

<template>
  <details class="my-3 rounded border border-current p-3 text-sm">
    <summary class="cursor-pointer font-bold">MIDI Status</summary>
    <div class="mt-3 grid gap-3 sm:grid-cols-2">
      <div>
        <h2 class="font-bold">Inputs</h2>
        <p v-if="!inputs.length">No input devices detected.</p>
        <ul v-else>
          <li v-for="input in inputs" :key="input.id">
            {{ input.manufacturer }} {{ input.name }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="font-bold">Outputs</h2>
        <p v-if="!outputs.length">No output devices detected.</p>
        <ul v-else>
          <li v-for="output in outputs" :key="output.id">
            {{ output.manufacturer }} {{ output.name }}
          </li>
        </ul>
      </div>
    </div>
  </details>
</template>
