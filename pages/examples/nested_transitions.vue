<script>
// Reference: https://www.youtube.com/watch?v=8G-1NW5NqO0
// Title: Orchestrating Nested Transitions in Vue.js with Headless UI and Tailwind CSS
import { ref } from "vue";

export default {
  setup() {
    const show = ref(false);
    return {
      show,
    };
  },
};
</script>

<template>
  <div
    class="bg-gradeint-to-r flex min-h-screen items-center justify-center from-blue-400 to-indigo-500"
  >
    <HeadlessTransitionRoot
      as="template"
      :show="show"
      enter="transition transform duration-300 ease-out"
      enter-from="translate-x-4 opacity-0"
      enter-to="translate-x-0 opacity-100"
      leave="transition transform duration-300 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div
        class="flex w-96 items-center space-x-4 rounded-2xl bg-white p-4 shadow-xl"
      >
        <HeadlessTransitionChild
          as="img"
          enter="transition transform duration-300 ease-out"
          enter-from="rotate-90 scale-50 opacity-0"
          enter-to="rotate-0 scale-100 opacity-100"
          leave="transition transform duration-300 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
          class="h-16 w-16 rounded-full ring ring-indigo-500 ring-opacity-50 ring-offset-2"
          src="/images/placeholder.png"
        />
        <HeadlessTransitionChild
          enter="transition transform duration-300 ease-out"
          enter-from="translate-x-12 opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition transform duration-300 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <h1 class="font-medium text-gray-900">Floofy McFloof</h1>
          <p class="mt-0.5 text-gray-500">
            Hey! I'm McFloof and I have been a very good boi this year.
          </p>
        </HeadlessTransitionChild>
      </div>
    </HeadlessTransitionRoot>
    <div
      class="absolute inset-x-0 top-0 my-4 flex w-full items-center justify-center"
    >
      <button
        class="rounded-lg bg-blue-200 px-4 py-1.5 text-sm font-medium text-indigo-900 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        @click="show = !show"
      >
        {{ show ? "Hide" : "Show" }} profile
      </button>
    </div>
  </div>
</template>
