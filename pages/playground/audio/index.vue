<template>
  <div class="container mx-auto font-mono">
    <div class="bg-background text-white">
      <div class="grid grid-cols-3 gap-4">
        <!-- Controls -->
        <div class="col-span-3 space-x-2">
          <div
            class="inline-block rounded-lg bg-black px-6 py-2 text-sm font-bold uppercase text-white shadow-lg shadow-green-400/25 transition duration-150 ease-in-out hover:cursor-pointer hover:shadow-white/25"
            @click="enable_audio_monitoring"
          >
            Enable
          </div>
          <div
            class="inline-block rounded-lg bg-black px-6 py-2 text-sm font-bold uppercase text-white shadow-lg shadow-red-400/25 transition duration-150 ease-in-out hover:cursor-pointer hover:shadow-white/25"
            @click="disable_audio_monitoring"
          >
            Disable
          </div>
        </div>
        <div class="col-span-3 rounded-xl bg-black/75 p-4 lg:col-span-1">
          <div class="mb-2 text-xl font-bold">Time Domain Waveform</div>
          <PlaygroundAudioWaveform
            :timeDomainBufferHistory="timeDomainBufferHistory"
            strokeStyle="rgb(255, 0, 255)"
            class="h-72 border-2 border-gray-400"
          />
        </div>
        <div class="col-span-3 rounded-xl bg-black/75 p-4 lg:col-span-1">
          <div class="mb-2 text-xl font-bold">Frequency Spectrogram</div>
          <PlaygroundAudioSpectrogram
            :frequencyDomainBufferHistory="frequencyDomainBufferHistory"
            class="h-72 border-2 border-gray-400"
          />
        </div>
        <div class="col-span-3 rounded-xl bg-black/75 p-4 lg:col-span-1">
          <div class="mb-2 text-xl font-bold">Frequency Bar Chart</div>
          <PlaygroundAudioFrequencyBarGraph
            :audioBufferHistory="frequencyDomainBufferHistory"
            class="h-72 border-2 border-gray-400"
          />
        </div>

        <!-- Frequency Domain Table -->
        <div class="col-span-3 rounded-xl bg-black/75 p-4">
          <div class="mb-2 text-xl font-bold">Frequency Buffer History</div>
          <div>
            <table class="w-full table-fixed">
              <thead class="collapse border-b-2 md:visible">
                <tr>
                  <th class="text-left">Index</th>
                  <th class="text-left">Mean</th>
                  <th class="text-left">Min</th>
                  <th class="text-left">Max</th>
                  <th class="text-left">FFT</th>
                  <th class="text-right">Buffer</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, ix) in frequencyDomainBufferHistory.slice(-10)"
                  :key="ix"
                >
                  <td class="text-left font-bold">{{ ix }}</td>
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
                  <td class="truncate text-right">
                    {{ data.slice(0, 4) }} ... {{ data.slice(-4) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Time Domain Table -->
        <div class="col-span-3 rounded-xl bg-black/75 p-4">
          <div class="mb-2 text-xl font-bold">Time Domain Buffer History</div>
          <div>
            <table class="w-full table-fixed">
              <thead class="collapse border-b-2 md:visible">
                <tr>
                  <th class="text-left">Index</th>
                  <th class="text-left">Mean</th>
                  <th class="text-left">Min</th>
                  <th class="text-left">Max</th>
                  <th class="text-left">FFT</th>
                  <th class="text-right">Buffer</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, ix) in timeDomainBufferHistory.slice(-10)"
                  :key="ix"
                >
                  <td class="text-left font-bold">{{ ix }}</td>
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
                  <td class="truncate text-right">
                    {{ data.slice(0, 4) }} ... {{ data.slice(-4) }}
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

<script setup lang="ts">
// definePageMeta({ layout: "light" });

let stream: MediaStream | null = null;
let audioCtx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let source: MediaStreamAudioSourceNode | null = null;

let timeDomainBuffer: Uint8Array | null = null;
let timeDomainBufferHistory = ref<Array<Uint8Array>>([]);

let frequencyDomainBuffer: Uint8Array | null = null;
let frequencyDomainBufferHistory = ref<Array<Uint8Array>>([]);

const HISTORY_SCROLLBACK = 256;

const audioAnalysisEnabled = ref<Boolean>(false);

const poll_byte_frequency_data = () => {
  requestAnimationFrame(poll_byte_frequency_data);

  analyser.getByteTimeDomainData(timeDomainBuffer);

  // slice is required to make a copy of the buffer
  if (timeDomainBuffer !== null) {
    timeDomainBufferHistory.value.push(timeDomainBuffer.slice());
    if (timeDomainBufferHistory.value.length > HISTORY_SCROLLBACK) {
      timeDomainBufferHistory.value.shift();
    }
  }

  analyser.getByteFrequencyData(frequencyDomainBuffer);

  if (frequencyDomainBuffer !== null) {
    frequencyDomainBufferHistory.value.push(frequencyDomainBuffer.slice());
    if (frequencyDomainBufferHistory.value.length > HISTORY_SCROLLBACK) {
      frequencyDomainBufferHistory.value.shift();
    }
  }
};

const enable_audio_monitoring = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((s) => {
      stream = s;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();

      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      // analyser.fftSize = 256;
      analyser.fftSize = 2048;

      timeDomainBuffer = new Uint8Array(analyser.frequencyBinCount);

      frequencyDomainBuffer = new Uint8Array(analyser.frequencyBinCount);

      // initialize time domain history
      for (let i = 0; i < HISTORY_SCROLLBACK; i++) {
        timeDomainBufferHistory.value.push(
          new Uint8Array(analyser.frequencyBinCount),
        );
      }

      // initialize frequency domain history
      for (let i = 0; i < HISTORY_SCROLLBACK; i++) {
        frequencyDomainBufferHistory.value.push(
          new Uint8Array(analyser.frequencyBinCount),
        );
      }

      poll_byte_frequency_data();
    })
    .catch(function (err) {
      console.error(err);
    });
};

const disable_audio_monitoring = () => {
  if (stream !== null && stream.active) {
    stream.getAudioTracks().forEach((track) => {
      track.stop();
    });
  }
};

onUnmounted(() => {
  // disconnect from audio source when leaving the page
  console.log("disabling");
  disable_audio_monitoring();
});
</script>
