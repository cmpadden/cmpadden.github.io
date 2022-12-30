<template>
  <div class="font-mono text-white bg-gradient-to-b from-red-900 to-gray-900">
    <div class="h-screen grid place-items-center">
      <!-- <div>Raw Data Buffer</div> -->
      <!-- <div class="mb-2 border-2 border-white"> -->
      <!--   <div v-for="(d, ix) in dataArrayHistory" :key="ix">{{ d }}</div> -->
      <!-- </div> -->
      <div>
        <div>Waveform</div>
        <div class="mb-2 border-2 border-white">
          <PlaygroundAudioWaveform :canvas-height="150" />
        </div>
        <div>Frequency Bars</div>
        <div class="mb-2 border-2 border-white">
          <PlaygroundAudioFrequencyBarGraph :canvas-height="250" />
        </div>
        <div>Spectrogram</div>
        <div class="mb-2 border-2 border-white">
          <PlaygroundAudioSpectrogram :canvas-height="250" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({ layout: "light" });
export default {
  data() {
    return {
      dataArray: new Uint8Array(),
      dataArrayHistory: [],
    };
  },
  mounted() {
    // TODO - use a single `dataArray` that is bound to the waveform, frequency, and spectrogram components. Still need
    // to determine how to trigger the render callback on data update...
    // navigator.mediaDevices
    //   .getUserMedia({ audio: true })
    //   .then((stream) => {
    //     this.audioCtx = new window.AudioContext()
    //     this.analyser = this.audioCtx.createAnalyser()
    //     this.source = this.audioCtx.createMediaStreamSource(stream)
    //     this.source.connect(this.analyser)
    //     this.analyser.fftSize = 2048
    //     this.bufferLength = this.analyser.frequencyBinCount
    //     this.dataArray = new Uint8Array(this.bufferLength)
    //     // repeatedly update time domain data
    //     this.analyser_data_callback()
    //   })
    //   .catch(function (err) {
    //     console.error(err)
    //   })
  },
  methods: {
    // analyser_data_callback: function () {
    //   requestAnimationFrame(this.analyser_data_callback)
    //   this.analyser.getByteTimeDomainData(this.dataArray)
    //   // Vue is unable to detect updates to `this.dataArray` from
    //   // `getByteTimeDomainData` causing reactivity issues -- we make a copy
    //   // using `slice` to get around this.
    //   // create copy via `.slice()` and push into history array
    //   this.dataArrayHistory.push(this.dataArray.slice())
    //   if (this.dataArrayHistory.length > 10) {
    //     this.dataArrayHistory.shift()
    //   }
    // },
  },
};
</script>
