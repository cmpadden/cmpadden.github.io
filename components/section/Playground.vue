<script setup>
const props = defineProps({
  showImages: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: null,
  },
  linkToPlayground: {
    type: Boolean,
    default: false,
  },
});

const links = [
  {
    title: "Conway",
    description: "Conway's game of life written in vanilla Javascript",
    link: "/playground/conway",
    img: "/images/previews/conway.png",
  },
  {
    title: "wm.spoon",
    description: "Window manager for Hammer Spoon written in Lua",
    link: "https://github.com/cmpadden/wm.spoon",
    img: "/images/previews/wm.spoon.png",
  },
  {
    title: "Metronome",
    description: "A simple metronome for tracking tempo in the browser",
    link: "/playground/metronome",
    img: "/images/previews/metronome.png",
  },
  {
    title: "Conjugations",
    description: "Search and explore the conjugations of 1000 French verbs",
    link: "/playground/french",
    img: "/images/previews/french-conjugations.png",
  },
  {
    title: "Mountains",
    description:
      "Visualize a gradient of colored waves generated with Perlin noise",
    link: "/playground/palettes/mountains",
    img: "/images/previews/noise.png",
  },
  {
    title: "Spectrogram",
    description:
      "Visualize the audio from your microphone as a waveform, frequency bars, and a spectrogram",
    link: "/playground/audio",
    img: "/images/previews/microphone.png",
  },
  {
    title: "Waves",
    description:
      "Demonstration of using p5.js within Vue.js to visualize trigonometric functions",
    link: "/playground/waves",
    img: "/images/previews/waves.png",
  },
  {
    title: "MIDI Chords",
    description:
      "Identify the chords being played by your attached MIDI device",
    link: "/playground/chords",
    img: "/images/previews/chord-identifier.png",
  },
  {
    title: "MIDI Events",
    description:
      "View the MIDI events triggered by a MIDI-controller through the Web MIDI API",
    link: "/playground/midi",
    img: "/images/previews/midi-events.png",
  },
  {
    title: "Matrix Multiplication",
    description: "Step through the process of matrix multiplication",
    link: "/playground/matrix",
    img: "/images/previews/matrix-multiplication.png",
  },
  {
    title: "Sequence Plotter",
    description:
      "Plot the fist 10,000 digits of Pi, or any sequence of digits, in 2-dimensional space",
    link: "/playground/plotter",
    img: "/images/previews/plotter.png",
  },
];

const filtered_links = computed(() => {
  if (props.limit === null || props.limit <= 0) {
    return links;
  } else {
    return links.slice(0, props.limit);
  }
});
</script>

<template>
  <section class="bg-gradient-to-b from-transparent to-background text-white">
    <div class="container mx-auto space-y-4 py-8 text-white">
      <template v-if="false">
        <NuxtLink
          to="/playground"
          class="font-milk text-2xl text-white underline decoration-orange-500 decoration-2"
        >
          Experiments
        </NuxtLink>
      </template>

      <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <nuxt-link
          class="relative drop-shadow-lg hover:ring-1 hover:ring-white"
          v-for="link in filtered_links"
          :key="link.title"
          :to="link.link"
        >
          <img
            class="grayscale-1 h-full w-full object-cover"
            :src="link.img || 'images/placeholder.png'"
          />
          <div
            class="absolute top-0 flex h-full w-full items-center justify-center bg-gray-500/50"
          >
            <div class="m-2 bg-black/50 p-2">
              <h3 class="text-xl font-bold text-orange-500">
                {{ link.title }}
              </h3>
              <div
                class="line-clamp-2 text-sm text-gray-300"
                v-html="link.description"
              ></div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-if="linkToPlayground">
        <MoreLink to="/playground" />
      </div>
    </div>
  </section>
</template>
