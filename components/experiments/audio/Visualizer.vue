<script setup lang="ts">
import type { AudioSamples } from "../../../composables/useAudioMonitor";
const props = defineProps<{
  mode: "waveform" | "frequency" | "spectrogram";
  samples: AudioSamples | null;
}>();
const canvas = ref<HTMLCanvasElement | null>(null);
let context: CanvasRenderingContext2D | null = null;
let width = 0,
  height = 0;
let observer: ResizeObserver | undefined;

function draw() {
  if (!context || !canvas.value || !props.samples || !width || !height) return;
  const ctx = context;
  const { waveform, frequency } = props.samples;
  if (props.mode === "spectrogram") {
    // Scroll the existing bitmap instead of redrawing 4,608 historical circles.
    const row = Math.max(1, Math.round(height / 36));
    ctx.drawImage(canvas.value, 0, -row);
    const bins = 128;
    for (let i = 0; i < bins; i++) {
      const amplitude =
        frequency[Math.floor((i * frequency.length) / bins)] || 0;
      ctx.fillStyle = `rgb(${amplitude},0,${amplitude})`;
      ctx.fillRect(
        (i * width) / bins,
        height - row,
        Math.ceil(width / bins),
        row,
      );
    }
    return;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  if (props.mode === "waveform") {
    ctx.strokeStyle = "rgb(255,0,255)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < waveform.length; i++) {
      const x = (i * width) / (waveform.length - 1);
      const y = ((waveform[i] || 0) * height) / 255;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  } else {
    // Aggregate bins to actual display width; bars never get negative widths.
    const bins = Math.min(128, Math.floor(width / 3));
    for (let i = 0; i < bins; i++) {
      const begin = Math.floor((i * frequency.length) / bins);
      const end = Math.floor(((i + 1) * frequency.length) / bins);
      let value = 0;
      for (let j = begin; j < end; j++)
        value = Math.max(value, frequency[j] || 0);
      const h = (value * height) / 255;
      ctx.fillStyle = `rgb(${value},0,${value})`;
      ctx.fillRect(
        (i * width) / bins,
        height - h,
        Math.max(1, width / bins - 1),
        h,
      );
    }
  }
}

onMounted(() => {
  const element = canvas.value!;
  context = element.getContext("2d");
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = element.width = Math.round(element.clientWidth * ratio);
    height = element.height = Math.round(element.clientHeight * ratio);
    draw();
  };
  observer = new ResizeObserver(resize);
  observer.observe(element);
  resize();
});
watch(() => props.samples, draw, { flush: "post" });
onBeforeUnmount(() => {
  observer?.disconnect();
  context = null;
});
</script>

<template>
  <canvas
    ref="canvas"
    class="h-72 w-full border-2 border-gray-400"
    :aria-label="`${mode} audio visualization`"
    role="img"
  />
</template>
