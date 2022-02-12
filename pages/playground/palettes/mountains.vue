<template>
  <div class="select-none bg-gradient-to-b from-green-800 to-gray-800">
    <div class="h-screen grid place-items-center">
      <div class="font-mono text-white">
        <div class="mb-2 border-2 border-white">
          <div id="canvas" />
        </div>
        <div class="w-48 my-2 text-center md:w-full">
          Click or tap anywhere to redraw the waves!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'light',
  data() {
    return {}
  },
  mounted() {
    const PALETTE = [
      '#FFBA08',
      '#FAA307',
      '#F48C06',
      '#E85D04',
      '#DC2F02',
      '#D00000',
      '#9D0208',
      '#6A040F',
      '#370617',
      '#03071E',
    ]

    const sketch = (s) => {
      const HEIGHT = 500
      const WIDTH = 500

      const waves = [
        { color: PALETTE[1], min: 0, max: 100, yoff: 2.0 },
        { color: PALETTE[2], min: 100, max: 200, yoff: 2.0 },
        { color: PALETTE[3], min: 200, max: 300, yoff: 2.0 },
        { color: PALETTE[4], min: 300, max: 400, yoff: 2.0 },
        { color: PALETTE[5], min: 400, max: 500, yoff: 2.0 },
      ]

      const drawWave = (opts) => {
        s.fill(opts.color)

        s.beginShape()

        let xoff = 1.0
        for (let x = 0; x <= WIDTH; x += 10) {
          // const xoff = x * s.random(-0.001, 0.001)
          const y = s.map(s.noise(xoff, opts.yoff), 0, 1, opts.min, opts.max)

          s.curveVertex(x, y)
          xoff += s.random(0.25)
        }
        opts.yoff += s.random(-0.001, 0.001)
        s.curveVertex(WIDTH, HEIGHT)
        s.curveVertex(0, HEIGHT)
        s.endShape(s.CLOSE)
      }

      const draw = () => {
        s.clear()
        s.background(PALETTE[0])
        waves.forEach((o) => drawWave(o))
      }

      s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT)
        s.frameRate(5)
        s.smooth()
        s.stroke(255)
        s.strokeWeight(3)
        draw()
      }

      s.mousePressed = () => {
        draw()
      }
    }

    // eslint-disable-next-line no-new
    new this.$p5(sketch, 'canvas')
  },
})
</script>


