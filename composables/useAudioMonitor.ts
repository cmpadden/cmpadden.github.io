import { onScopeDispose, ref, shallowRef } from "vue";

export type AudioSamples = {
  waveform: Uint8Array<ArrayBuffer>;
  frequency: Uint8Array<ArrayBuffer>;
};
export type AudioSummary = {
  mean: string;
  min: number;
  max: number;
  length: number;
  preview: string;
};

function summarize(data: Uint8Array): AudioSummary {
  let total = 0,
    min = 255,
    max = 0;
  for (const value of data) {
    total += value;
    min = Math.min(min, value);
    max = Math.max(max, value);
  }
  return {
    mean: (total / data.length).toFixed(2),
    min,
    max,
    length: data.length,
    preview: `${Array.from(data.slice(0, 4)).join(",")} … ${Array.from(data.slice(-4)).join(",")}`,
  };
}

export function useAudioMonitor() {
  const enabled = ref(false);
  const starting = ref(false);
  const error = ref("");
  const samples = shallowRef<AudioSamples | null>(null);
  const summaries = shallowRef<{
    waveform: AudioSummary[];
    frequency: AudioSummary[];
  }>({ waveform: [], frequency: [] });
  let stream: MediaStream | undefined;
  let context: AudioContext | undefined;
  let source: MediaStreamAudioSourceNode | undefined;
  let analyser: AnalyserNode | undefined;
  let frame: number | undefined;
  let generation = 0;
  let disposed = false;

  function stop() {
    generation++;
    enabled.value = false;
    starting.value = false;
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    source?.disconnect();
    analyser?.disconnect();
    source = undefined;
    analyser = undefined;
    stream?.getTracks().forEach((track) => track.stop());
    stream = undefined;
    const oldContext = context;
    context = undefined;
    if (oldContext && oldContext.state !== "closed")
      void oldContext.close().catch(() => {});
  }

  async function start() {
    if (disposed || starting.value || enabled.value) return;
    const current = ++generation;
    starting.value = true;
    error.value = "";
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
        throw new Error("Audio monitoring is not supported in this browser.");
      }
      const acquired = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (disposed || current !== generation) {
        acquired.getTracks().forEach((track) => track.stop());
        return;
      }
      stream = acquired;
      const audioContext = new AudioContext();
      context = audioContext;
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source = audioContext.createMediaStreamSource(acquired);
      source.connect(analyser);
      await audioContext.resume();
      if (disposed || current !== generation) return;
      enabled.value = true;
      starting.value = false;
      summaries.value = { waveform: [], frequency: [] };
      let lastDraw = -Infinity;
      let lastSummary = -Infinity;
      const poll = (time: number) => {
        if (current !== generation || !analyser) return;
        // One owned loop, capped at 30fps. Typed samples are not deep-reactive.
        if (time - lastDraw >= 1000 / 30) {
          lastDraw = time;
          const waveform = new Uint8Array(analyser.fftSize);
          const frequency = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteTimeDomainData(waveform);
          analyser.getByteFrequencyData(frequency);
          samples.value = { waveform, frequency };
          // Tables update at 10Hz; calculations are not repeated in templates.
          if (time - lastSummary >= 100) {
            lastSummary = time;
            summaries.value = {
              waveform: [
                ...summaries.value.waveform.slice(-9),
                summarize(waveform),
              ],
              frequency: [
                ...summaries.value.frequency.slice(-9),
                summarize(frequency),
              ],
            };
          }
        }
        frame = requestAnimationFrame(poll);
      };
      frame = requestAnimationFrame(poll);
    } catch (cause) {
      if (current !== generation || disposed) return;
      stop();
      error.value =
        cause instanceof Error ? cause.message : "Unable to enable microphone.";
    }
  }

  onScopeDispose(() => {
    disposed = true;
    stop();
  });
  return { enabled, starting, error, samples, summaries, start, stop };
}
