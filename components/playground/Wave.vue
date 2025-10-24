<template>
  <!-- canvas requires a unique ID for rendering -->
  <div :id="id" />
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "canvas",
    },
    canvasHeight: {
      type: Number,
      default: 250,
    },
    type: {
      type: String,
      default: "sin", // sin, cos, tan
    },
    diameter: {
      type: Number,
      default: 15,
    },
    amplitude: {
      type: Number,
      default: 75,
    },
    lambda: {
      type: Number,
      default: 266,
    },
  },
  data() {
    return {
      p5Instance: null,
    };
  },
  async mounted() {
    const p5 = await this.$p5();

    const sketch = (s) => {
      const HEIGHT = s.windowWidth >= 450 ? this.canvasHeight : 200;
      const WIDTH = s.windowWidth >= 450 ? 800 : 300;

      let x = 0;
      let y = HEIGHT / 2;

      // let R = Math.round(s.random(255))
      // let G = Math.round(s.random(255))
      // let B = Math.round(s.random(255))

      let R = 0;
      const G = 100;
      const B = 125;

      s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT);
        x = -this.diameter;
      };

      s.draw = () => {
        if (this.type === "sin") {
          y = this.amplitude * s.sin(x * (s.TWO_PI / this.lambda)) + HEIGHT / 2;
        } else if (this.type === "cos") {
          y = this.amplitude * s.cos(x * (s.TWO_PI / this.lambda)) + HEIGHT / 2;
        } else if (this.type === "tan") {
          y = this.amplitude * s.tan(x * (s.TWO_PI / this.lambda)) + HEIGHT / 2;
        } else {
          // unsupported wave type
          y = HEIGHT / 2;
        }

        // compute R color channel based on ball's Y position
        R = Math.round(
          s.map(
            y,
            -this.amplitude + HEIGHT / 2,
            this.amplitude + HEIGHT / 2,
            0,
            255,
          ),
        );

        x = x >= WIDTH + this.diameter ? -this.diameter : x + 1;

        s.noStroke();
        s.fill(s.color(R, G, B));
        s.ellipse(x, y, this.diameter, this.diameter);
      };

      s.mousePressed = () => {
        s.clear();
      };
    };

    this.p5Instance = new p5(sketch, this.id);
  },
  beforeUnmount() {
    this.p5Instance?.remove?.();
    this.p5Instance = null;
  },
};
</script>
