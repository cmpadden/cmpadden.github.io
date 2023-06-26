<template>
    <div>
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
                                    <th class="w-2/3 text-right">Data Array</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, ix) in dataHistory" :key="ix">
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
                                    <td class="w-2/3 font-mono text-right truncate">
                                        {{ data }}
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
definePageMeta({ layout: "light" });

const BUFFER_SIZE = 1024;
const FFT_SIZE = 2048;
const HISTORY_SCROLLBACK = 10;

// TODO - determine if hard-coded buffer length is adequate, or if the value of
// `analyser.frequencyBinCount` is required.
const data = new Uint8Array(BUFFER_SIZE);

const analyser = ref(undefined);

const dataHistory = ref([]);

const analyser_data_callback = function () {
    requestAnimationFrame(() => analyser_data_callback());
    analyser.value.getByteTimeDomainData(data);

    // append analyser data to history array
    dataHistory.value.push(data);
    if (dataHistory.value.length > HISTORY_SCROLLBACK) {
        dataHistory.value.shift();
    }
};

onMounted(async () => {
    // initialize audio context analyser
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new window.AudioContext();
    analyser.value = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser.value);
    analyser.value.fftSize = FFT_SIZE;

    // start animation frame loop
    analyser_data_callback();
});

// TODO - close the audio connection on destruction
</script>
