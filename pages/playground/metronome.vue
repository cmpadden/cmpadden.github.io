<script setup>
// Feature Ideas
// - start/stop button
// - different beep on 5th tick
// - tap to find bpm
// - show clickeable sequencer (eg. [x][ ][ ][ ])

definePageMeta({ layout: "empty" });

const params = reactive({
  frequency: 440,
  frequency_min: 20,
  frequency_max: 1000,
  frequency_steps: 20,
  bpm: 90,
  paused: true,
});

let audio_context;
let oscillator;
let gain_node;
let metronome_interval_id;

const bpm_to_ms = (bpm) => {
  if (bpm <= 0) {
    return 0;
  }
  return (60 / bpm) * 1000;
};

const start = () => {
  clearInterval(metronome_interval_id);
  if (!params.paused) {
    metronome_interval_id = setInterval(() => {
      oscillator.frequency.value = params.frequency;

      // fade-in and fade-out to prevent undesired click
      gain_node.gain.setValueAtTime(0, audio_context.currentTime);
      gain_node.gain.linearRampToValueAtTime(
        1,
        audio_context.currentTime + 0.05,
      );
      gain_node.gain.linearRampToValueAtTime(
        0,
        audio_context.currentTime + 0.1,
      );
    }, bpm_to_ms(params.bpm));
  }
};

const toggle = () => {
  params.paused = !params.paused;
  start();
};

const adjust_bpm = (value) => {
  params.bpm += value;
  start(); // re-start interval w/ new bpm value
};

onMounted(() => {
  audio_context = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audio_context.createOscillator();
  gain_node = audio_context.createGain();
  gain_node.gain.value = 0;
  gain_node.connect(audio_context.destination);
  oscillator.connect(gain_node);
  oscillator.type = "sine";
  oscillator.frequency.value = params.frequency;
  oscillator.start();

  start();
});
</script>

<template>
  <main class="flex h-screen justify-center bg-white">
    <div class="space-y-2 p-2">
      <!-- start / stop -->
      <div>
        <button
          class="button p-2 text-xs font-bold lowercase text-white"
          :class="{
            'bg-green-900': params.paused,
            'bg-red-900': !params.paused,
          }"
          @click="toggle"
        >
          {{ params.paused ? "resume" : "stop" }}
        </button>
      </div>

      <!-- bpm controls -->
      <div class="flex justify-center border-2 border-gray-400 p-2">
        <div class="flex space-x-2">
          <div class="flex items-center">
            <button
              class="button rounded-full bg-gradient-to-r from-red-500 to-blue-500 px-2 text-white"
              @click="adjust_bpm(-10)"
            >
              -
            </button>
          </div>
          <div class="text-[72px] font-bold">
            {{ params.bpm.toString().padStart(3, "&ensp;")
            }}<span class="text-[16px]">bpm</span>
          </div>

          <div class="flex items-center">
            <button
              class="button rounded-full bg-gradient-to-r from-red-500 to-blue-500 px-2 text-white"
              @click="adjust_bpm(10)"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Frequency -->
      <div class="border-2 border-gray-400 p-2">
        <div class="flex">
          <div class="flex-1 font-bold">
            Frequency
            <span class="bg-yellow-200 px-2"> {{ params.frequency }} </span>
          </div>
        </div>
        <div class="flex space-x-2">
          <div>{{ params.frequency_min }}Hz</div>
          <input
            type="range"
            v-model="params.frequency"
            :min="params.frequency_min"
            :max="params.frequency_max"
            :step="params.frequency_steps"
            class="accent-red-500"
          />
          <div>{{ params.frequency_max }}Hz</div>
        </div>
      </div>
    </div>
  </main>
</template>
