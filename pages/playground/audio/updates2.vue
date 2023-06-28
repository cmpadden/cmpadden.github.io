<template>
    <div class="container mx-auto font-mono">
        <div class="text-white bg-background">
            <div class="grid grid-cols-1 gap-4">
                <div class="bg-black/75 p-4 rounded-xl">
                    <div class="font-bold text-xl mb-2">Audio History Buffer</div>
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
                                <tr v-for="(data, ix) in audioBufferHistory.slice(-10)" :key="ix">
                                    <td class="font-bold text-left">{{ ix }}</td>
                                    <td class="text-left">
                                        {{
                                            (
                                                data.reduce((prev, curr) => prev + curr) / data.length
                                            ).toFixed(2)
                                        }}
                                    </td>
                                    <td class="text-left">
                                        {{ Math.min(...data) }}
                                    </td>
                                    <td class="text-left">
                                        {{ Math.max(...data) }}
                                    </td>
                                    <td class="text-left">
                                        {{ data.length }}
                                    </td>
                                    <td class="w-2/3 text-right truncate">
                                        {{ data.slice(0, 8) }} ... {{ data.slice(-8) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="bg-black/75 p-4 rounded-xl">
                    <div class="font-bold text-xl mb-2">Frequency Bar Chart</div>
                    <PlaygroundAudioFrequencyBarGraph2 :audioBufferHistory="audioBufferHistory"
                        class="border-2 border-gray-400" />
                </div>
                <div class="bg-black/75 p-4 rounded-xl">
                    <div class="font-bold text-xl mb-2">Frequency Spectrogram</div>
                    <PlaygroundAudioSpectrogram2 :audioBufferHistory="audioBufferHistory"
                        class="border-2 border-gray-400 h-72" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// definePageMeta({ layout: "light" });

let audioCtx = undefined;
let analyser = undefined;
let source = undefined;
let audioBuffer = undefined;
let audioBufferHistory = ref([]);

const HISTORY_SCROLLBACK = 256;

const poll_byte_frequency_data = () => {
    requestAnimationFrame(poll_byte_frequency_data);

    analyser.getByteFrequencyData(audioBuffer);

    // slice is required to make a copy of the buffer
    audioBufferHistory.value.push(audioBuffer.slice());
    if (audioBufferHistory.value.length > HISTORY_SCROLLBACK) {
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

            // initialize history
            for (let i = 0; i < HISTORY_SCROLLBACK; i++) {
                audioBufferHistory.value.push(
                    new Uint8Array(analyser.frequencyBinCount)
                );
            }

            poll_byte_frequency_data();
        })
        .catch(function (err) {
            console.error(err);
        });
});
</script>
