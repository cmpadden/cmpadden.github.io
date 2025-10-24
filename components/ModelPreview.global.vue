<template>
  <div ref="container" class="h-64" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    path: string;
    backgroundColor?: number;
  }>(),
  {
    backgroundColor: 100,
  },
);

const container = ref<HTMLElement | null>(null);
let p5Instance: any = null;

onMounted(async () => {
  if (!container.value) {
    return;
  }

  const { $p5 } = useNuxtApp();
  const p5 = await $p5();
  const host = container.value;

  const sketch = (s: any) => {
    let model;
    let angle = 0;
    let rotate = true;

    const getSize = () => {
      return {
        width: host.clientWidth || 0,
        height: host.clientHeight || 0,
      };
    };

    s.preload = () => {
      model = s.loadModel(props.path, true);
    };

    s.setup = () => {
      const { width, height } = getSize();
      s.createCanvas(width, height, s.WEBGL);
    };

    s.windowResized = () => {
      const { width, height } = getSize();
      s.resizeCanvas(width, height);
    };

    s.mouseClicked = () => {
      rotate = false; // disable object rotation on click
    };

    s.draw = () => {
      const bg = Number(props.backgroundColor ?? 100);

      s.background(bg);
      s.lights();

      if (rotate) {
        angle = s.frameCount * 0.005;
      }

      s.rotateX(angle);
      s.rotateY(angle);
      s.orbitControl();

      if (model) {
        s.model(model);
      }
    };
  };

  p5Instance = new p5(sketch, host);
});

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove?.();
    p5Instance = null;
  }
});
</script>
