<template>
  <div>
    <canvas id="waveformCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Waveform',
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
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        this.analyser = this.audioCtx.createAnalyser()

        this.source = this.audioCtx.createMediaStreamSource(stream)
        this.source.connect(this.analyser)

        this.analyser.fftSize = 2048

        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)

        this.canvas = document.getElementById("waveformCanvas")
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

      this.analyser.getByteTimeDomainData(this.dataArray)

      this.canvasCtx.fillStyle = this.fillStyle
      this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      this.canvasCtx.lineWidth = 2
      this.canvasCtx.strokeStyle = this.strokeStyle
      this.canvasCtx.beginPath()

      const sliceWidth = (this.canvasWidth * 1.0) / this.bufferLength
      let x = 0

      for (let i = 0; i < this.bufferLength; i++) {
        const v = this.dataArray[i] / 128.0
        const y = (v * this.canvasHeight) / 2

        if (i === 0) {
          this.canvasCtx.moveTo(x, y)
        } else {
          this.canvasCtx.lineTo(x, y)
        }

        x += sliceWidth
      }

      this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2)
      this.canvasCtx.stroke()
    },
  },
}
</script>
