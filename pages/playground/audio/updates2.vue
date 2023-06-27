<template>
    <div class="text-white bg-gradient-to-b from-red-900 to-gray-900">
        <div class="grid place-items-center p-4">
            <div>
                <div class="font-bold text-xl">Audio History Buffer</div>
                <div>
                    <table class="table-fixed w-full">
                        <thead class="border-b-2">
                            <tr>
                                <th class="text-left">Index</th>
                                <th class="text-left">Mean</th>
                                <th class="text-left">Min</th>
                                <th class="text-left">Max</th>
                                <th class="text-left">Size</th>
                                <th class="w-2/3 text-right">Data Array</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, ix) in audioBufferHistory" :key="ix">
                                <td class="font-bold text-left">{{ ix }}</td>
                                <td class="font-mono text-left">
                                    {{
                                        (
                                            data.reduce((prev, curr) => prev + curr) / data.length
                                        ).toFixed(2)
                                    }}
                                </td>
                                <td class="font-mono text-left">
                                    {{ Math.min(...data) }}
                                </td>
                                <td class="font-mono text-left">
                                    {{ Math.max(...data) }}
                                </td>
                                <td class="font-mono text-left">
                                    {{ data.length }}
                                </td>
                                <td class="w-2/3 font-mono text-right truncate">
                                    {{ data.slice(0, 6) }} ... {{ data.slice(-6) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <PlaygroundAudioFrequencyBarGraph2 :audioBufferHistory="audioBufferHistory" />
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: "light" });

let audioCtx = undefined;
let analyser = undefined;
let source = undefined;
let audioBuffer = undefined;
let audioBufferHistory = ref([]);

const poll_byte_frequency_data = () => {
    requestAnimationFrame(poll_byte_frequency_data);

    analyser.getByteFrequencyData(audioBuffer);

    audioBufferHistory.value.push(audioBuffer);
    if (audioBufferHistory.value.length > 10) {
        audioBufferHistory.value.shift();
    }
};

onMounted(async () => {
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();

            source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            analyser.fftSize = 256;

            audioBuffer = new Uint8Array(analyser.frequencyBinCount);

            poll_byte_frequency_data();
        })
        .catch(function (err) {
            console.error(err);
        });
});
</script>
