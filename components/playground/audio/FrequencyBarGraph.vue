<template>
    <div>
    <div id="bar-graph-container" class="w-full h-full">
        <canvas id="frequencyBarGraphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
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
    },
    canvasHeight: {
        type: Number,
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

const BAR_OFFSET_PX = 2;

const map = (n, nMin, nMax, rMin, rMax) => {
    // normalize a number between ranges `nMin` to `nMax` to fall between
    // range `rMin` and `rMax`.
    return ((n - nMin) * (rMax - nMin)) / (nMax - nMin) + rMin;
};

onMounted(() => {
    const canvas = document.getElementById("frequencyBarGraphCanvas");
    const canvasCtx = canvas.getContext("2d");

    // set width and height of canvas if not defined as a prop
    const container = document.getElementById("bar-graph-container");
    const canvasHeight = props.canvasHeight
        ? props.canvasHeight
        : container.clientHeight;
    const canvasWidth = props.canvasWidth
        ? props.canvasWidth
        : container.clientWidth;

    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    watch(props.audioBufferHistory, (history) => {
        canvasCtx.fillStyle = props.fillStyle;
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

        // the most recent audio buffer is the last item pushed to the array
        const audioBuffer = history.slice(-1)[0];

        const barWidth = canvasWidth / audioBuffer.length - BAR_OFFSET_PX;
        let x = 0;

        for (let i = 0; i < audioBuffer.length; i++) {
            const d = audioBuffer[i];

            // frequency data is on a scale from 0 to 255, so we must ensure this
            // fits within the canvas
            const barHeight = map(d, 0, 255, 0, canvasHeight);

            canvasCtx.fillStyle = `rgb(${d},0,${d})`;
            canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

            x += barWidth + BAR_OFFSET_PX;
        }
    });
});
</script>
