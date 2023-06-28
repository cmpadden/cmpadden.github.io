<template>
    <div class="container mx-auto font-mono">
        <div class="text-white bg-background">
            <div class="grid grid-cols-1 gap-4">
                <div class="bg-black/75 p-4 rounded-xl">
                    <div class="font-bold text-xl mb-2">Frequency Domain Bar Chart</div>
                    <PlaygroundAudioFrequencyBarGraph :audioBufferHistory="frequencyDomainBufferHistory"
                        class="border-2 border-gray-400" />
                </div>
                <div class="bg-black/75 p-4 rounded-xl">
                    <div class="font-bold text-xl mb-2">Frequency Domain Spectrogram</div>
                    <PlaygroundAudioSpectrogram :frequencyDomainBufferHistory="frequencyDomainBufferHistory"
                        class="border-2 border-gray-400 h-72" />
                </div>
                <div class="bg-black/75 p-4 rounded-xl">
                    <div class="font-bold text-xl mb-2">Time Domain Waveform</div>
                    <PlaygroundAudioWaveform :timeDomainBufferHistory="timeDomainBufferHistory"
                        strokeStyle="rgb(255, 0, 255)" class="border-2 border-gray-400 h-72" />
                </div>

                <!-- Table -->
                <div class="bg-black/75 p-4 rounded-xl">
                    <div class="font-bold text-xl mb-2">Time Domain Buffer History</div>
                    <div>
                        <table class="table-fixed w-full">
                            <thead class="border-b-2">
                                <tr>
                                    <th class="text-left">Index</th>
                                    <th class="text-left">Mean</th>
                                    <th class="text-left">Min</th>
                                    <th class="text-left">Max</th>
                                    <th class="text-left">FFT</th>
                                    <th class="w-2/3 text-right">Data Array</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, ix) in timeDomainBufferHistory.slice(-5)" :key="ix">
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
            </div>
        </div>
    </div>
</template>

<script setup>
// definePageMeta({ layout: "light" });

let audioCtx = undefined;
let analyser = undefined;
let source = undefined;

let timeDomainBuffer = undefined;
let timeDomainBufferHistory = ref([]);

let frequencyDomainBuffer = undefined;
let frequencyDomainBufferHistory = ref([]);

const HISTORY_SCROLLBACK = 256;

const poll_byte_frequency_data = () => {
    requestAnimationFrame(poll_byte_frequency_data);

    analyser.getByteTimeDomainData(timeDomainBuffer);

    // slice is required to make a copy of the buffer
    timeDomainBufferHistory.value.push(timeDomainBuffer.slice());
    if (timeDomainBufferHistory.value.length > HISTORY_SCROLLBACK) {
        timeDomainBufferHistory.value.shift();
    }

    analyser.getByteFrequencyData(frequencyDomainBuffer);

    frequencyDomainBufferHistory.value.push(frequencyDomainBuffer.slice());
    if (frequencyDomainBufferHistory.value.length > HISTORY_SCROLLBACK) {
        frequencyDomainBufferHistory.value.shift();
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

            // analyser.fftSize = 256;
            analyser.fftSize = 2048;

            timeDomainBuffer = new Uint8Array(analyser.frequencyBinCount);

            frequencyDomainBuffer = new Uint8Array(analyser.frequencyBinCount);

            // initialize history
            for (let i = 0; i < HISTORY_SCROLLBACK; i++) {
                timeDomainBufferHistory.value.push(
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
