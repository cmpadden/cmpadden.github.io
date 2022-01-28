<template>
  <div class="bg-gradient-to-b from-green-800 to-gray-800">
    <div class="h-screen grid place-items-center">
      <div id="canvas" class="border-2 border-white" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'light',
  mounted() {
    const sketch = (s) => {
      const HEIGHT = s.windowWidth >= 400 ? 400 : 200
      const WIDTH = s.windowWidth >= 400 ? 800 : 200

      const AMPLITUDE = HEIGHT / 4
      const BALLWIDTH = HEIGHT / 6
      const BALLHEIGHT = HEIGHT / 6
      const LAMBDA = WIDTH / 3

      let ballX = -BALLWIDTH
      let ballY = HEIGHT / 2
      let R = s.random(255)
      let G = s.random(255)
      let B = s.random(255)

      s.setup = () => {
        // s.createCanvas(s.windowWidth, s.windowHeight)
        s.createCanvas(WIDTH, HEIGHT)
      }

      s.draw = () => {
        s.noStroke()

        s.fill(s.color(R, G, B))
        s.ellipse(ballX, ballY, BALLWIDTH, BALLHEIGHT)

        // ballY = 150 * s.sin(ballX / 50) + s.windowHeight / 2
        ballY = AMPLITUDE * s.sin(ballX * (s.TWO_PI / LAMBDA)) + HEIGHT / 2

        // compute R color channel based on ball's Y position
        R = s.map(
          ballY,
          -AMPLITUDE + HEIGHT / 2,
          AMPLITUDE + HEIGHT / 2,
          0,
          255
        )

        // ballX = (ballX + 1) % s.windowWidth
        ballX = ballX >= WIDTH + BALLWIDTH ? -BALLWIDTH : ballX + 1
      }

      s.mousePressed = () => {
        R = s.random(255)
        G = s.random(255)
        B = s.random(255)
      }

      // s.windowResized = () => {
      //   s.resizeCanvas(s.windowWidth, s.windowHeight)
      // }
    }

    // eslint-disable-next-line no-new
    new this.$p5(sketch, 'canvas')
  },
  data() {
    return {}
  },
})
</script>


