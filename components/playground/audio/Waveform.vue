<template>
    <div id="waveform-canvas-container" class="bg-green h-full w-full">
        <canvas id="waveformCanvas2" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
</template>

<script setup>
const props = defineProps({
    timeDomainBufferHistory: {
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

onMounted(() => {
    // analyser.fftSize = 2048;

    const canvas = document.getElementById("waveformCanvas2");
    const canvasCtx = canvas.getContext("2d");

    const container = document.getElementById("waveform-canvas-container");
    const canvasHeight = props.canvasHeight
        ? props.canvasHeight
        : container.clientHeight;
    const canvasWidth = props.canvasWidth
        ? props.canvasWidth
        : container.clientWidth;

    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    watch(props.timeDomainBufferHistory, (history) => {
        canvasCtx.fillStyle = props.fillStyle;
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = props.strokeStyle;
        canvasCtx.beginPath();

        const audioBuffer = history.slice(-1)[0];
        const bufferLength = audioBuffer.length;

        const sliceWidth = canvasWidth / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = audioBuffer[i] / 128.0;
            const y = (v * canvasHeight) / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    });
});

onBeforeUnmount(() => { });
</script>
