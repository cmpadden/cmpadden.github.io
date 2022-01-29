<template>
  <div class="bg-gradient-to-b from-green-800 to-gray-800">
    <div class="h-screen grid place-items-center">
      <div class="font-mono text-white">
        <div class="items-end my-2 md:flex">
          <div class="flex-none md:flex-1">y(x) = A sin((2π / λ) x)</div>
          <div>
            <label for="aInput" class="inline-block form-label">A</label>
            <input
              id="aInput"
              type="number"
              class="w-16 p-2 bg-transparent border-2 border-white focus:outline-none"
              v-model.number="wave.amplitude"
            />
            <label for="lInput" class="inline-block form-label">λ</label>
            <input
              id="lInput"
              type="number"
              class="w-16 p-2 bg-transparent border-2 border-white focus:outline-none"
              v-model.number="wave.lambda"
            />
            <label for="dInput" class="inline-block form-label">◒</label>
            <input
              id="dInput"
              type="number"
              class="w-16 p-2 bg-transparent border-2 border-white focus:outline-none"
              v-model.number="ball.diameter"
            />
          </div>
        </div>

        <div id="canvas" class="border-2 border-white"></div>
        <div class="w-48 my-2 md:w-full">
          Click or tap anywhere to clear the canvas!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'light',
  mounted() {
    const sketch = (s) => {
      const HEIGHT = s.windowWidth >= 450 ? 400 : 300
      const WIDTH = s.windowWidth >= 450 ? 800 : 300

      let x = 0
      let y = HEIGHT / 2

      s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT)
        this.ball.color.R = Math.round(s.random(255))
        this.ball.color.G = Math.round(s.random(255))
        this.ball.color.B = Math.round(s.random(255))
        this.ball.diameter = Math.round(HEIGHT / 6)
        x = -this.ball.diameter

        this.wave.amplitude = Math.round(HEIGHT / 4)
        this.wave.lambda = Math.round(WIDTH / 3)
      }

      s.draw = () => {
        s.noStroke()

        s.fill(s.color(this.ball.color.R, this.ball.color.G, this.ball.color.B))
        s.ellipse(x, y, this.ball.diameter, this.ball.diameter)

        y =
          this.wave.amplitude * s.sin(x * (s.TWO_PI / this.wave.lambda)) +
          HEIGHT / 2

        // compute R color channel based on ball's Y position
        this.ball.color.R = Math.round(
          s.map(
            y,
            -this.wave.amplitude + HEIGHT / 2,
            this.wave.amplitude + HEIGHT / 2,
            0,
            255
          )
        )

        x = x >= WIDTH + this.ball.diameter ? -this.ball.diameter : x + 1
      }

      // s.mousePressed = () => {
      //   this.ball.color.R = s.random(255)
      //   this.ball.color.G = s.random(255)
      //   this.ball.color.B = s.random(255)
      // }

      s.mousePressed = () => {
        s.clear()
      }

      // s.windowResized = () => {
      //   s.resizeCanvas(s.windowWidth, s.windowHeight)
      // }
    }

    // eslint-disable-next-line no-new
    new this.$p5(sketch, 'canvas')
  },
  data() {
    return {
      wave: {
        amplitude: 0,
        lambda: 0,
      },
      ball: {
        diameter: 0,
        color: {
          R: 0,
          G: 0,
          B: 0,
        },
      },
    }
  },
})
</script>


