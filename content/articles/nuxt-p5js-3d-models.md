---
title: "Render three-dimensional models in NuxtContent with p5js"
date: "2024-12-31"
tags: ["nuxt", "p5js", "3d"]
categories: ["examples"]
---

Three-dimensional models, whether they be of the format `.obj` or `.stl`, can be easily rendered in your Nuxt project by using the [p5js.org](https://p5js.org/) library.

<!--more-->

I've been using p5 for a while now to tinker and explore generative art, some of which can be found in the [/playground](/playground) section of this website. To use it with Nuxt, a [client-side plugin](https://github.com/cmpadden/cmpadden.github.io/blob/70ba674acdbe80c4a41b510a9b54edcddb19f489/plugins/p5.client.js) was created like so:

```js
// plugins/p5.client.js

import p5 from 'p5'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      p5, p5
    }
  }
})
```

As I've been exploring 3d-printing lately, I wanted a way to showcase some of the models I've created directly on this website. So, the `ModelPreview` component was created, which you can see in use below.

<!-- Low poly eevee was used as an example found here: https://www.thingiverse.com/thing:2931434 -->
:ModelPreview{path="/models/eevee.stl" :backgroundColor="50"}

The Vue component was embedded in our markdown using the following syntax is used. The `path` prop with the location of the file we want to render; in this case, that file is served on the website as well in the `public/models` folder.

```
:ModelPreview{path="/models/eevee.stl"}
```

The component was registered globally by using the `ModelPreview.global.vue` filename so that it was accessible in our markdown. Alternatively, this could have been accomplished by placing the component in the `components/content` folder. However, I wanted to use this component in both markdown and Vue files. See the [NuxtContent](https://content.nuxt.com/usage/markdown#vue-components) documentation for more details.

The full source code for the `ModelPreview` component at the time of this writing can be found below. Not too bad!

```javascript
<template>
    <div id="canvas" class="h-64" />
</template>

<script setup lang="ts">
const { $p5 } = useNuxtApp();

const { path, backgroundColor = 100 } = defineProps < { path: string, backgroundColor?: Number } > ()

onMounted(() => {
console.log(backgroundColor);
    const sketch = (s) => {
        const c = document.getElementById("canvas");

        const WIDTH = c.clientWidth;
        const HEIGHT = c.clientHeight;

        let model;
        let angle;
        let rotate = true;

        s.preload = () => {
            model = s.loadModel(path, true);
        };

        s.setup = () => {
            s.createCanvas(WIDTH, HEIGHT, s.WEBGL);
        };

        s.mouseClicked = () => {
            rotate = false; // disable object rotation on click
        };

        s.draw = () => {
            s.background(backgroundColor);
            s.lights();

            if (rotate) {
                angle = s.frameCount * 0.005;
            }
            s.rotateX(angle);
            s.rotateY(angle);
            s.orbitControl();

            s.model(model);
        };
    };

    new $p5(sketch, "canvas");
});
</script>
```
Looking forward to sharing more models soon!
