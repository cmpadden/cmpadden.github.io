<template>
  <section class="container mx-auto mb-4">
    <div class="px-2 mx-6 text-white md:mx-12">
      <h1 class="py-4 text-4xl font-bold leading-tight text-white">
        Playground
      </h1>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 grid-rows-auto">
        <nuxt-link v-for="link in links" :key="link.title" :to="link.link">
          <div
            class="h-full p-3 bg-black border bg-opacity-30 hover:bg-opacity-70"
          >
            <h3 class="pb-2 text-xl font-bold">{{ link.title }}</h3>
            <div class="text-base font-light" v-html="link.description"></div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: 'Microphone Audio Visuals',
          description:
            'Visualize the audio from your microphone as a waveform, frequency bars, and a spectrogram',
          link: '/playground/audio',
        },
        {
          title: 'Waves',
          description:
            'Demonstration of using p5.js within Vue.js to visualize trigonometric functions',
          link: '/playground/waves',
        },
        {
          title: 'MIDI Chord Identifier',
          description:
            'Identify the chords being played by your attached MIDI device',
          link: '/playground/chords',
        },
        {
          title: 'MIDI Events',
          description:
            'View the MIDI events triggered by a MIDI-controller through the Web MIDI API',
          link: '/playground/midi',
        },
        {
          title: '1000 French Conjugations',
          description:
            'Study the conjugations of the top 1000 most popular French verbs',
          link: '/playground/french',
        },
        {
          title: 'Matrix Multiplication',
          description: 'Step through the process of matrix multiplication',
          link: '/playground/matrix',
        },
      ],
    }
  },
}
</script>
