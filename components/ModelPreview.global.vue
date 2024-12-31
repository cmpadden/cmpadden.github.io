<template>
    <div id="canvas" class="h-64" />
</template>

<script setup lang="ts">
const { $p5 } = useNuxtApp();

const { path, backgroundColor = 100 } = defineProps < { path: string, backgroundColor?: Number } > ()

onMounted(() => {
console.log(backgroundColor);
    const sketch = (s) => {
        const c = document.getElementById("canvas");

        const WIDTH = c.clientWidth;
        const HEIGHT = c.clientHeight;

        let model;
        let angle;
        let rotate = true;

        s.preload = () => {
            model = s.loadModel(path, true);
        };

        s.setup = () => {
            s.createCanvas(WIDTH, HEIGHT, s.WEBGL);
        };

        s.mouseClicked = () => {
            rotate = false; // disable object rotation on click
        };

        s.draw = () => {
            s.background(backgroundColor);
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
    new $p5(sketch, "canvas");
});
</script>
