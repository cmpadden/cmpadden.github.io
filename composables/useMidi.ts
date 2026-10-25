import { onMounted, onScopeDispose, ref, shallowRef } from "vue";

export function useMidi(
  onMessage: (event: MIDIMessageEvent) => void,
  onDevicesChanged?: () => void,
) {
  const supported = ref<boolean | null>(null);
  const starting = ref(false);
  const midi = shallowRef<MIDIAccess>();
  const inputs = shallowRef<MIDIInput[]>([]);
  const outputs = shallowRef<MIDIOutput[]>([]);
  const error = ref("");
  const attached = new Set<MIDIInput>();
  let generation = 0;
  let disposed = false;

  function detach(input: MIDIInput) {
    input.removeEventListener("midimessage", onMessage);
    void input.close().catch(() => {});
    attached.delete(input);
  }
  function syncDevices() {
    const connected = Array.from(midi.value?.inputs.values() || []).filter(
      (input) => input.state === "connected",
    );
    for (const input of attached) if (!connected.includes(input)) detach(input);
    for (const input of connected) {
      if (!attached.has(input)) {
        input.addEventListener("midimessage", onMessage);
        attached.add(input);
      }
    }
    inputs.value = connected;
    outputs.value = Array.from(midi.value?.outputs.values() || []).filter(
      (output) => output.state === "connected",
    );
    onDevicesChanged?.();
  }
  function disconnect() {
    generation++;
    starting.value = false;
    midi.value?.removeEventListener("statechange", syncDevices);
    for (const input of attached) detach(input);
    midi.value = undefined;
    inputs.value = [];
    outputs.value = [];
    onDevicesChanged?.();
  }
  async function connect() {
    if (disposed || starting.value || midi.value) return;
    const current = ++generation;
    starting.value = true;
    error.value = "";
    try {
      if (!navigator.requestMIDIAccess)
        throw new Error("Web MIDI is not supported in this browser.");
      const access = await navigator.requestMIDIAccess();
      if (disposed || current !== generation) return;
      midi.value = access;
      access.addEventListener("statechange", syncDevices);
      syncDevices();
    } catch (cause) {
      if (current === generation && !disposed)
        error.value =
          cause instanceof Error
            ? cause.message
            : "Unable to access MIDI devices.";
    } finally {
      if (current === generation) starting.value = false;
    }
  }
  onMounted(() => {
    supported.value = typeof navigator.requestMIDIAccess === "function";
  });
  onScopeDispose(() => {
    disposed = true;
    disconnect();
  });
  return {
    supported,
    starting,
    midi,
    inputs,
    outputs,
    error,
    connect,
    disconnect,
  };
}
