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
    title: "tabs.garden",
    description: "A simple site for guitar tabs",
    link: "/playground/tabs-garden",
    img: "/images/previews/tabs-garden.webp",
  },
  {
    title: "Conway",
    description: "Conway's game of life written in vanilla Javascript",
    link: "/playground/conway",
    img: "/images/previews/conway.webp",
  },
  {
    title: "wm.spoon",
    description: "Window manager for Hammer Spoon written in Lua",
    link: "https://github.com/cmpadden/wm.spoon",
    img: "/images/previews/wm.spoon.webp",
  },
  {
    title: "Metronome",
    description: "A simple metronome for tracking tempo in the browser",
    link: "/playground/metronome",
    img: "/images/previews/metronome.webp",
  },
  {
    title: "Conjugations",
    description: "Search and explore the conjugations of 1000 French verbs",
    link: "/playground/french",
    img: "/images/previews/french-conjugations.webp",
  },
  {
    title: "Mountains",
    description:
      "Visualize a gradient of colored waves generated with Perlin noise",
    link: "/playground/palettes/mountains",
    img: "/images/previews/noise.webp",
  },
  {
    title: "Spectrogram",
    description:
      "Visualize the audio from your microphone as a waveform, frequency bars, and a spectrogram",
    link: "/playground/audio",
    img: "/images/previews/microphone.webp",
  },
  {
    title: "Waves",
    description:
      "Demonstration of using p5.js within Vue.js to visualize trigonometric functions",
    link: "/playground/waves",
    img: "/images/previews/waves.webp",
  },
  {
    title: "MIDI Chords",
    description:
      "Identify the chords being played by your attached MIDI device",
    link: "/playground/chords",
    img: "/images/previews/chord-identifier.webp",
  },
  {
    title: "MIDI Events",
    description:
      "View the MIDI events triggered by a MIDI-controller through the Web MIDI API",
    link: "/playground/midi",
    img: "/images/previews/midi-events.webp",
  },
  {
    title: "Matrix Multiplication",
    description: "Step through the process of matrix multiplication",
    link: "/playground/matrix",
    img: "/images/previews/matrix-multiplication.webp",
  },
  {
    title: "Sequence Plotter",
    description:
      "Plot the fist 10,000 digits of Pi, or any sequence of digits, in 2-dimensional space",
    link: "/playground/plotter",
    img: "/images/previews/plotter.webp",
  },
];

const route = useRoute();

const filtered_links = computed(() => {
  if (props.limit === null || props.limit <= 0) {
    return links;
  } else {
    return links.slice(0, props.limit);
  }
});
</script>

<template>
  <section
    class="to-background-dark bg-gradient-to-b from-transparent text-white"
  >
    <div class="container mx-auto py-8 text-white">
      <div class="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <nuxt-link
          class="relative text-orange-500 ring-2 ring-white hover:text-white hover:ring-orange-500"
          v-for="link in filtered_links"
          :key="link.title"
          :to="link.link"
        >
          <svg class="absolute right-0 top-0 size-8" viewBox="0 0 100 100">
            <polygon points="0,0 0,100 100,100" fill="currentColor" />
          </svg>
          <img
            class="h-64 w-full bg-gray-800 object-cover grayscale hover:grayscale-0"
            :src="link.img || 'images/placeholder.png'"
            :alt="link.title"
            loading="lazy"
            decoding="async"
          />
          <div
            class="absolute bottom-2 flex w-full items-center justify-center px-2"
          >
            <div
              class="w-full bg-black bg-[url('/images/noise.svg')] px-6 py-2"
            >
              <h3 class="text-xl font-bold text-white">
                {{ link.title }}
              </h3>
              <div
                class="line-clamp-1 text-sm text-gray-300"
                v-html="link.description"
              ></div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <MoreLink to="/playground" v-if="route.path !== '/playground'"
        >See more experiments</MoreLink
      >
    </div>
  </section>
</template>
