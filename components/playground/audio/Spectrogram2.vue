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

const map = (n, nMin, nMax, rMin, rMax) => {
    // normalize a number between ranges `nMin` to `nMax` to fall between
    // range `rMin` and `rMax`.
    return ((n - nMin) * (rMax - nMin)) / (nMax - nMin) + rMin;
};

const HISTORY_WINDOW_SIZE = 36;

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

    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    watch(props.audioBufferHistory, (history) => {
        canvasCtx.fillStyle = props.fillStyle;
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
        const focusedHistory = history.slice(-HISTORY_WINDOW_SIZE);

        const pixelWidth = canvasWidth / 128;
        const pixelHeight = canvasHeight / HISTORY_WINDOW_SIZE;

        // create a circle for each sample point with varying size and color based on
        // amplitude
        for (let x = 0; x < 128; x++) {
            for (let y = 0; y < HISTORY_WINDOW_SIZE; y++) {
                const d = focusedHistory[y][x];
                const r = map(d, 0, 255, 1, 4);
                canvasCtx.fillStyle = `rgb(${d}, 0, ${d})`;
                canvasCtx.beginPath();
                canvasCtx.arc(
                    x * pixelWidth + pixelWidth / 2,
                    y * pixelHeight + pixelHeight / 2,
                    r,
                    0, // arc start
                    2 * Math.PI // arc end
                );
                canvasCtx.fill();
            }
        }
    });

    // legacy version which uses solid rectangles

    // watch(props.audioBufferHistory, (history) => {
    // canvasCtx.fillStyle = props.fillStyle;
    // canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    // const pixelWidth = canvasWidth / history[0].length;
    // const pixelHeight = canvasHeight / history.length;

    // // for each `y` of history, we increment along the height of the canvas
    // // for each `x` we increment along the width
    // for (let y = 0; y < history.length; y++) {
    //     for (let x = 0; x < history[y].length; x++) {
    //         const d = history[y][x];
    //         canvasCtx.fillStyle = `rgb(${d / 2},${d},${d})`;
    //         canvasCtx.fillRect(
    //             x * pixelWidth,
    //             y * pixelHeight,
    //             pixelWidth,
    //             pixelHeight
    //         );
    //     }
    // }
    // });
});
</script>
