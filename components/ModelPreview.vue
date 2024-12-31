<template>
    <div id="canvas" class="h-full" />
</template>

<script setup>
const { $p5 } = useNuxtApp();

const props = defineProps({
    path: String,
});

onMounted(() => {
    const sketch = (s) => {
        const c = document.getElementById("canvas");

        const WIDTH = c.clientWidth;
        const HEIGHT = c.clientHeight;

        let model;
        let angle;
        let rotate = true;

        s.preload = () => {
            model = s.loadModel(props.path, true);
        };

        s.setup = () => {
            s.createCanvas(WIDTH, HEIGHT, s.WEBGL);
        };

        s.mouseClicked = () => {
            rotate = false; // disable object rotation on click
        };

        s.draw = () => {
            s.background(100);
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
