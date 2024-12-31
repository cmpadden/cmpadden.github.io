<script setup>
definePageMeta({ layout: "none" });
</script>

<template>
    <div class="container mx-auto m-8 space-y-4 text-white">
        <div class="text-2xl font-bold">
            <code>.stl</code> Model Render Demo
        </div>
        <div class="font-body">
            Model(s) automatically rotates around the <code>X</code> and <code>Y</code> axes. <span
                class="text-orange-500">Click</span> and <span class="text-orange-500">drag</span> the
            model to disable the rotation, and control it manually.
        </div>
        <div>
            This demo is powered by the <a class="underline text-blue-500" href="https://p5js.org">p5js</a> WEBGL
            renderer.
        </div>
        <div class="h-96 border-2 border-white">
            <ModelPreview path="/models/mac_mini_macbook_stand.stl" />
        </div>
    </div>
</template>
