<template>
  <div>
    <canvas id="spectrogramCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Spectrogram',
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
  },
  data() {
    return {
      dataArray: [],
      dataArrayHistory: [],
    }
  },
  mounted() {
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

        this.canvas = document.getElementById("spectrogramCanvas")
        this.canvasCtx = this.canvas.getContext('2d')

        this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

        this.draw()
      })
      .catch(function (err) {
        console.error(err)
      })
  },
  methods: {
    draw() {
      requestAnimationFrame(this.draw)

      this.analyser.getByteFrequencyData(this.dataArray)

      // Keep history of frequency data for rendering -- note, we use the
      // `slice()` method to create a new copy of the array
      this.dataArrayHistory.push(this.dataArray.slice())
      if (this.dataArrayHistory.length > 256) {
        this.dataArrayHistory.shift()
      }

      this.canvasCtx.fillStyle = this.fillStyle
      this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      const pixelWidth = this.canvasWidth / this.bufferLength
      const pixelHeight = this.canvasHeight / 256

      // for each `y` of history, we increment along the height of the canvas
      // for each `x` we increment along the width
      for (let y = 0; y < this.dataArrayHistory.length; y++) {
        for (let x = 0; x < this.dataArrayHistory[y].length; x++) {
          const d = this.dataArrayHistory[y][x]
          this.canvasCtx.fillStyle = `rgb(${d},${0},${d})`
          this.canvasCtx.fillRect(
            x * pixelWidth,
            y * pixelHeight,
            pixelWidth,
            pixelHeight
          )
        }
      }
    },
  },
}
</script>
