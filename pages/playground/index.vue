<template>
  <div class="text-white mx-6 md:mx-12 px-2">
    <div class="grid grid-flow-row auto-rows-max space-y-4">
      <div class="italic">
        This is a home for ideas to incubate until they're refactored
        elsewhere...
      </div>
      <nuxt-link v-for="link in links" :key="link.title" :to="link.link">
        <div class="bg-green-700 bg-opacity-50 h-full p-3 border">
          <h3 class="text-xl font-bold pb-2">{{ link.title }}</h3>
          <div class="text-base font-light" v-html="link.description"></div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: 'MIDI Chord Identifier',
          description: 'Identify the chords being played by your MIDI device',
          link: '/playground/chords',
        },
        {
          title: 'MIDI Events',
          description:
            'View MIDI events triggered by a MIDI-controller through the Web MIDI API',
          link: '/playground/midi',
        },
        {
          title: 'French Conjugations',
          description:
            'Study the conjugations of the top <em>n</em> most popular French verbs',
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
