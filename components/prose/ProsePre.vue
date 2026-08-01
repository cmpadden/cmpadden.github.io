<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
    meta?: string | null;
    class?: string | null;
  }>(),
  {
    code: "",
    language: null,
    filename: null,
    highlights: () => [],
    meta: null,
    class: null,
  },
);

const copied = ref(false);
let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

async function copyCode() {
  if (!import.meta.client) return;

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(props.code);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = props.code;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  copied.value = true;

  if (copiedTimeout) {
    clearTimeout(copiedTimeout);
  }

  copiedTimeout = setTimeout(() => {
    copied.value = false;
  }, 1500);
}

onBeforeUnmount(() => {
  if (copiedTimeout) {
    clearTimeout(copiedTimeout);
  }
});
</script>

<template>
  <div class="code-block">
    <button
      type="button"
      class="code-copy-button not-prose"
      :aria-label="copied ? 'Copied code' : 'Copy code'"
      @click="copyCode"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
        />
      </svg>
    </button>
    <pre :class="[props.class, 'code-block-pre']"><slot /></pre>
  </div>
</template>

<style>
.code-block {
  margin-bottom: 1.7142857em;
  margin-top: 1.7142857em;
  max-width: 100%;
  position: relative;
  width: 100%;
}

.code-copy-button {
  background: rgb(0 0 0 / 0.9);
  border: 1px solid rgb(255 255 255 / 0.2);
  color: #fff;
  cursor: pointer;
  padding: 0.25rem;
  position: absolute;
  right: 1.25rem;
  top: 0.5rem;
  transition:
    background-color 150ms ease,
    border-color 150ms ease;
  z-index: 1;
}

.code-copy-button:hover,
.code-copy-button:focus {
  background: #000;
  border-color: rgb(251 146 60);
  outline: none;
}

.code-block-pre {
  box-sizing: border-box;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  max-height: 32rem;
  max-width: 100%;
  overflow: auto;
  padding-right: 4rem !important;
  width: 100%;
}

pre code .line {
  display: block;
}
</style>
