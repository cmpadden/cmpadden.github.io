<template>
  <div class="bg-gradient-to-b from-green-800 to-gray-800">
    <div class="h-screen grid place-items-center">
      <div class="font-mono text-white">
        <div class="items-end my-2 md:flex">
          <div class="flex-none md:flex-1">y(x) = A sin((2π / λ) x)</div>
          <div class="hidden md:block">
            <label for="aInput" class="inline-block form-label">A</label>
            <input
              id="aInput"
              v-model.number="wave.amplitude"
              type="number"
              class="w-16 p-2 bg-transparent border-2 border-white focus:outline-none"
            />
            <label for="lInput" class="inline-block form-label">λ</label>
            <input
              id="lInput"
              v-model.number="wave.lambda"
              type="number"
              class="w-16 p-2 bg-transparent border-2 border-white focus:outline-none"
            />
            <label for="dInput" class="inline-block form-label">◒</label>
            <input
              id="dInput"
              v-model.number="wave.diameter"
              type="number"
              class="w-16 p-2 bg-transparent border-2 border-white focus:outline-none"
            />
          </div>
        </div>
        <div class="mb-2 border-2 border-white">
          <PlaygroundWave
            id="canvas1"
            type="sin"
            :diameter="wave.diameter"
            :amplitude="wave.amplitude"
            :lambda="wave.lambda"
          />
        </div>
        <div>y(x) = A cos((2π / λ) x)</div>
        <div class="mb-2 border-2 border-white">
          <PlaygroundWave
            id="canvas2"
            type="cos"
            :diameter="wave.diameter"
            :amplitude="wave.amplitude"
            :lambda="wave.lambda"
          />
        </div>
        <div>y(x) = A tan((2π / λ) x)</div>
        <div class="border-2 border-white">
          <PlaygroundWave
            id="canvas3"
            type="tan"
            :diameter="wave.diameter"
            :amplitude="wave.amplitude"
            :lambda="wave.lambda"
          />
        </div>
        <div class="w-48 my-2 md:w-full">
          Click or tap anywhere to clear the canvas!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'light',
  data() {
    return {
      wave: {
        amplitude: 75,
        lambda: 266,
        diameter: 15,
      },
    }
  },
})
</script>


