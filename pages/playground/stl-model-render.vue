<script setup>
definePageMeta({ layout: "none" });
</script>

<template>
  <div class="container m-8 mx-auto space-y-4 text-white">
    <div class="text-2xl font-bold"><code>.stl</code> Model Render Demo</div>
    <div class="font-body">
      Model(s) automatically rotates around the <code>X</code> and
      <code>Y</code> axes. <span class="text-orange-500">Click</span> and
      <span class="text-orange-500">drag</span> the model to disable the
      rotation, and control it manually.
    </div>
    <div>
      This demo is powered by the
      <a class="text-blue-500 underline" href="https://p5js.org">p5js</a> WEBGL
      renderer.
    </div>
    <div class="h-96 border-2 border-white">
      <ClientOnly>
        <ModelPreview path="/models/mac_mini_macbook_stand.stl" />
        <template #fallback>
          <div class="flex h-full items-center justify-center bg-gray-800">
            <div class="text-white">Loading 3D model...</div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
