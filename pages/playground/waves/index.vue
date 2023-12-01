<template>
  <div class="bg-gradient-to-b from-green-800 to-gray-800">
    <div class="grid h-screen place-items-center">
      <div class="font-mono text-white">
        <div class="my-2 items-end md:flex">
          <div class="flex-none md:flex-1">y(x) = A sin((2π / λ) x)</div>
          <div class="hidden md:block">
            <label for="aInput" class="form-label inline-block">A</label>
            <input
              id="aInput"
              v-model.number="wave.amplitude"
              type="number"
              class="w-16 border-2 border-white bg-transparent p-2 focus:outline-none"
            />
            <label for="lInput" class="form-label inline-block">λ</label>
            <input
              id="lInput"
              v-model.number="wave.lambda"
              type="number"
              class="w-16 border-2 border-white bg-transparent p-2 focus:outline-none"
            />
            <label for="dInput" class="form-label inline-block">◒</label>
            <input
              id="dInput"
              v-model.number="wave.diameter"
              type="number"
              class="w-16 border-2 border-white bg-transparent p-2 focus:outline-none"
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
        <div class="my-2 w-48 md:w-full">
          Click or tap anywhere to clear the canvas!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({ layout: "light" });
export default {
  data() {
    return {
      wave: {
        amplitude: 75,
        lambda: 266,
        diameter: 15,
      },
    };
  },
};
</script>
