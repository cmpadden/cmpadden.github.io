<template>
  <div class="select-none bg-gradient-to-b from-green-800 to-gray-800">
    <div class="m-6 grid h-2/3 place-items-center">
      <div class="font-mono text-white">
        <ClientOnly>
          <div id="canvas" class="mb-2 h-96 border-2 border-white" />
          <template #fallback>
            <div class="mb-2 flex h-96 items-center justify-center border-2 border-white bg-gray-800">
              <div class="text-white">Loading mountain visualization...</div>
            </div>
          </template>
        </ClientOnly>
        <div class="my-2 w-48 text-center md:w-full">
          Click or tap anywhere to redraw the waves!
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
    // There is a bug where multiple p5 canvases are created within canvas div if a
    // user closely and re-opens the palettes playground. This is a workaround to
    // remove the children canvas elements within this div.
    document.getElementById("canvas").textContent = "";

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
      // canvas dimensions
      const c = document.getElementById("canvas");
      const WIDTH = c.clientWidth;
      const HEIGHT = c.clientHeight;

      const waves = [
        { color: PALETTE[1], min: 0, max: 0.2, yoff: 2.0 },
        { color: PALETTE[2], min: 0.2, max: 0.4, yoff: 2.0 },
        { color: PALETTE[3], min: 0.4, max: 0.6, yoff: 2.0 },
        { color: PALETTE[4], min: 0.6, max: 0.8, yoff: 2.0 },
        { color: PALETTE[5], min: 0.8, max: 1, yoff: 2.0 },
      ];

      const drawWave = (opts) => {
        s.fill(opts.color);

        s.beginShape();

        let xoff = 1.0;
        for (let x = 0; x <= WIDTH; x += 10) {
          const y = s.map(
            s.noise(xoff, opts.yoff),
            0,
            1,
            opts.min * HEIGHT,
            opts.max * HEIGHT,
          );

          s.curveVertex(x, y);
          xoff += s.random(0.5);
        }
        opts.yoff += s.random(-0.5, 0.5);
        s.curveVertex(WIDTH, HEIGHT);
        s.curveVertex(0, HEIGHT);
        s.endShape(s.CLOSE);
      };

      const draw = () => {
        s.clear();
        s.background(PALETTE[0]);
        waves.forEach((o) => drawWave(o));
      };

      s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT);
        s.frameRate(5);
        s.smooth();
        s.stroke(255);
        s.strokeWeight(3);
        draw();
        s.noLoop();
      };

      s.mousePressed = () => {
        draw();
      };
    };

    // eslint-disable-next-line no-new
    new this.$p5(sketch, "canvas");
  },
};
</script>
