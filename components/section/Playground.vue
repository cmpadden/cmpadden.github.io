<template>
  <!-- <section class="container mx-auto text-white bg-[url('/images/topography.svg')]"> -->
  <section class="border-b-2 border-b-emerald-900 bg-emerald-950 py-8">
    <div class="container mx-auto space-y-4 text-white">
      <h1 class="text-3xl font-bold leading-tight text-white">
        {{ title }}
      </h1>
      <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <nuxt-link
          v-for="link in filtered_links"
          :key="link.title"
          :to="link.link"
        >
          <div
            class="h-full rounded-xl bg-black bg-opacity-70 drop-shadow-lg hover:ring-1 hover:ring-white"
          >
            <div class="p-4">
              <h3 class="pb-2 text-xl font-bold">{{ link.title }}</h3>
              <div class="text-base font-light" v-html="link.description"></div>
            </div>
            <div v-if="showImages">
              <img
                class="max-h-64 w-full rounded-b-xl object-cover shadow-lg"
                :src="link.img || 'images/placeholder.png'"
              />
            </div>
          </div>
        </nuxt-link>
      </div>
      <div>
        <NuxtLink
          v-if="linkToPlayground"
          to="/playground"
          class="text-blue-400 hover:text-blue-200"
        >
          More Experiments...
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
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
  },
  data() {
    return {
      title: "Experiments",
      links: [
        {
          title: "Metronome",
          description: "A simple metronome for tracking tempo.",
          link: "/playground/metronome",
          img: "/images/previews/metronome.png",
        },
        {
          title: "1000 French Conjugations",
          description:
            "Search and explore the conjugations of 1000 French verbs",
          link: "/playground/french",
          img: "/images/previews/french-conjugations.png",
        },
        {
          title: "Noise Mountains",
          description:
            "Visualize a gradient of colored waves generated with Perlin noise",
          link: "/playground/palettes/mountains",
          img: "/images/previews/noise.png",
        },
        {
          title: "Microphone Audio Visuals",
          description:
            "Visualize the audio from your microphone as a waveform, frequency bars, and a spectrogram",
          link: "/playground/audio",
          img: "/images/previews/microphone.png",
        },
        {
          title: "Trigonometric Waves",
          description:
            "Demonstration of using p5.js within Vue.js to visualize trigonometric functions",
          link: "/playground/waves",
          img: "/images/previews/waves.png",
        },
        {
          title: "MIDI Chord Identifier",
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
      ],
    };
  },
  computed: {
    filtered_links() {
      if (this.limit === null || this.limit <= 0) {
        return this.links;
      } else {
        return this.links.slice(0, this.limit);
      }
    },
  },
};
</script>
