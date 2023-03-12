<template>
  <div>
    <canvas id="frequencyBarGraphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'FrequencyBarGraph',
  props: {
    canvasWidth: {
      type: Number,
      default: 750,
    },
    canvasHeight: {
      type: Number,
      default: 500,
    },
    fillStyle: {
      type: String,
      default: 'rgba(0,0,0)',
    },
    strokeStyle: {
      type: String,
      default: 'rgb(255, 255, 255)',
    },
  },
  mounted() {

    // Reference implementation from Mozilla's MDN
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#creating_a_frequency_bar_graph

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        this.analyser = this.audioCtx.createAnalyser()

        this.source = this.audioCtx.createMediaStreamSource(stream)
        this.source.connect(this.analyser)

        this.analyser.fftSize = 256

        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)

        this.canvas = document.getElementById("frequencyBarGraphCanvas")
        this.canvasCtx = this.canvas.getContext('2d')

        this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

        this.draw()
      })
      .catch(function (err) {
        console.error(err)
      })
  },
  methods: {
    map(n, nMin, nMax, rMin, rMax) {
      // normalize a number between ranges `nMin` to `nMax` to fall between
      // range `rMin` and `rMax`.
      return ((n - nMin) * (rMax - nMin)) / (nMax - nMin) + rMin
    },
    draw() {
      requestAnimationFrame(this.draw)

      this.analyser.getByteFrequencyData(this.dataArray)

      this.canvasCtx.fillStyle = this.fillStyle
      this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      // var barWidth = (this.canvasWidth / this.bufferLength) * 2.5;
      const barWidth = this.canvasWidth / this.bufferLength
      let x = 0

      for (let i = 0; i < this.bufferLength; i++) {
        const d = this.dataArray[i]

        // frequency data is on a scale from 0 to 255, so we must ensure this
        // fits within the canvas
        const barHeight = this.map(d, 0, 255, 0, this.canvasHeight)

        this.canvasCtx.fillStyle = `rgb(${d},${0},${d})`
        this.canvasCtx.fillRect(
          x,
          this.canvasHeight - barHeight,
          barWidth,
          barHeight
        )

        x += barWidth + 1
      }
    },
  },
}
</script>
