<template>
  <div class="">
    <div id="canvas" class="h-96 border-2 border-white" />
  </div>
</template>

<script>
definePageMeta({ layout: "light" });
export default {
  data() {
    return {};
  },
  mounted() {
    const sketch = (s) => {
      const c = document.getElementById("canvas");

      const WIDTH = c.clientWidth;
      const HEIGHT = c.clientHeight;

      let model;
      let angle;
      let rotate = true;

      s.preload = () => {
        model = s.loadModel("models/mac_mini_macbook_stand.stl", true);
      };

      s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT, s.WEBGL);
      };

      s.mouseClicked = () => {
        rotate = false; // disable object rotation on click
      };

      s.draw = () => {
        s.background(200);
        s.lights();

        if (rotate) {
          angle = s.frameCount * 0.005;
        }
        s.rotateX(angle);
        s.rotateY(angle);
        s.orbitControl();

        s.model(model);
      };
    };

    // eslint-disable-next-line no-new
    new this.$p5(sketch, "canvas");
  },
};
</script>
