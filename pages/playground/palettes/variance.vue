<template>
  <div class="bg-gradient-to-b from-green-800 to-gray-800">
    <div class="h-screen grid place-items-center">
      <div class="font-mono text-white">
        <div class="mb-2 border-2 border-white">
          <div id="canvas" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({ layout: "light" });
export default {
  data() {
    return {};
  },
  mounted() {
    const PALETTE = [
      "#FFBA08",
      "#FAA307",
      "#F48C06",
      "#E85D04",
      "#DC2F02",
      "#D00000",
      "#9D0208",
      "#6A040F",
      "#370617",
      "#03071E",
    ];

    const sketch = (s) => {
      // const HEIGHT = s.windowWidth
      // const WIDTH = s.windowWidth

      const hexToInts = (h) => {
        return s.unhex([h.slice(1, 3), h.slice(3, 5), h.slice(5, 7)]);
      };

      const rgbVariance = (rgb, variance) => {
        return rgb.map((c) => {
          const v = s.floor(c + s.random(-variance, variance));
          if (v < 0) {
            return 0;
          } else if (v > 255) {
            return 255;
          } else {
            return v;
          }
        });
      };

      const HEIGHT = 400;
      const WIDTH = 400;

      s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT);
        s.frameRate(5);
      };

      s.draw = () => {
        s.background(0, 0, 0);
        s.noStroke();
        s.noFill();

        const DIVISIONS = 9;

        const width = WIDTH / DIVISIONS;
        for (let i = 0; i <= DIVISIONS; i++) {
          for (let j = 0; j <= DIVISIONS; j++) {
            // color based on grid column, modulo required because we have 9 color choices
            const hexColor = PALETTE[j % 9];

            // add subtle variation to each color
            s.fill(rgbVariance(hexToInts(hexColor), 15));

            s.square(i * width, j * width, width);
          }
        }
      };
    };

    // eslint-disable-next-line no-new
    new this.$p5(sketch, "canvas");
  },
};
</script>
