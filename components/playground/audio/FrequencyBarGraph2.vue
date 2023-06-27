<template>
    <div>
        <div class="font-bold text-xl text-white">Frequency Bar Graph</div>
        <canvas id="frequencyBarGraphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
</template>

<script setup>
// Reference implementation from Mozilla's MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#creating_a_frequency_bar_graph

const props = defineProps({
    audioBufferHistory: {
        type: Array,
    },
    canvasWidth: {
        type: Number,
        default: 750,
    },
    canvasHeight: {
        type: Number,
        default: 500,
    },
    fillStyle: {
        type: String,
        default: "rgba(0,0,0)",
    },
    strokeStyle: {
        type: String,
        default: "rgb(255, 255, 255)",
    },
});

const map = (n, nMin, nMax, rMin, rMax) => {
    // normalize a number between ranges `nMin` to `nMax` to fall between
    // range `rMin` and `rMax`.
    return ((n - nMin) * (rMax - nMin)) / (nMax - nMin) + rMin;
};

onMounted(() => {
    const canvas = document.getElementById("frequencyBarGraphCanvas");
    const canvasCtx = canvas.getContext("2d");
    // canvasCtx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);

    watch(props.audioBufferHistory, (history) => {
        canvasCtx.fillStyle = props.fillStyle;
        canvasCtx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);

        // const barWidth = props.canvasWidth / props.bufferLength;
        const barWidth = props.canvasWidth / history[0].length - 1;
        let x = 0;

        for (let i = 0; i < 1024; i++) {
            const d = history[0][i];

            // frequency data is on a scale from 0 to 255, so we must ensure this
            // fits within the canvas
            const barHeight = map(d, 0, 255, 0, props.canvasHeight);

            // canvasCtx.fillStyle = `rgb(${d},${0},${d})`;
            canvasCtx.fillStyle = `rgb(255, 255, 255)`;
            canvasCtx.fillRect(
                x,
                props.canvasHeight - barHeight,
                barWidth,
                barHeight
            );

            x += barWidth + 1;
        }
    });
});
</script>
