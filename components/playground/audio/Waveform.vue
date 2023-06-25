<template>
  <div>
    <canvas
      id="waveformCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<script setup>
const props = defineProps({
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

const draw = function (analyser, dataArray, canvas, canvasCtx, bufferLength) {
  requestAnimationFrame(() =>
    draw(analyser, dataArray, canvas, canvasCtx, bufferLength)
  );

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = props.fillStyle;
  canvasCtx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = props.strokeStyle;
  canvasCtx.beginPath();

  const sliceWidth = (props.canvasWidth * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * props.canvasHeight) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
};

onMounted(() => {
  // Reference implementation from Mozilla's MDN
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvas = document.getElementById("waveformCanvas");
      const canvasCtx = canvas.getContext("2d");

      canvasCtx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);

      draw(analyser, dataArray, canvas, canvasCtx, bufferLength);
    })
    .catch(function (err) {
      console.error(err);
    });
});
</script>
