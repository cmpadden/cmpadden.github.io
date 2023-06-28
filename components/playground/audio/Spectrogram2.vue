<template>
    <div>
        <div id="spectrogram-canvas-container" class="bg-green h-full w-full">
            <canvas id="spectrogramCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
        </div>
    </div>
</template>

<script setup>
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
});

onMounted(() => {
    const canvas = document.getElementById("spectrogramCanvas");
    const canvasCtx = canvas.getContext("2d");

    // set width and height of canvas if not defined as a prop
    const container = document.getElementById("spectrogram-canvas-container");
    const canvasHeight = props.canvasHeight
        ? props.canvasHeight
        : container.clientHeight;
    const canvasWidth = props.canvasWidth
        ? props.canvasWidth
        : container.clientWidth;

    console.log(canvasHeight, canvasWidth)

    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    watch(props.audioBufferHistory, (history) => {
        canvasCtx.fillStyle = props.fillStyle;
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

        const pixelWidth = canvasWidth / history[0].length;
        const pixelHeight = canvasHeight / history.length;

        // for each `y` of history, we increment along the height of the canvas
        // for each `x` we increment along the width
        for (let y = 0; y < history.length; y++) {
            for (let x = 0; x < history[y].length; x++) {
                const d = history[y][x];
                canvasCtx.fillStyle = `rgb(${d / 2},${d},${d})`;
                canvasCtx.fillRect(
                    x * pixelWidth,
                    y * pixelHeight,
                    pixelWidth,
                    pixelHeight
                );
            }
        }
    });
});
</script>
