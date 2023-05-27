<template>
  <section class="py-2 md:py-8 text-white bg-mesh-gradient">
    <div class="container mx-auto">
      <div
        class="grid grid-cols-1 space-y-2 md:grid-cols-3 md:space-x-2 md:space-y-0"
      >
        <div>
          <div
            class="h-full bg-black border-2 border-white bg-opacity-70 rounded-lg drop-shadow-lg"
          >
            <h3
              class="p-2 text-xl font-bold text-center border-b-2 border-white"
            >
              Technical Interests
            </h3>
            <ul class="text-base custom-list p-2">
              <li>Data Pipeline Engineering</li>
              <li>Distributed Systems</li>
              <li>Embedded Systems</li>
              <li>Programming Languages</li>
              <li>Developer Tooling</li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="h-full bg-black border-2 border-white bg-opacity-70 rounded-lg drop-shadow-lg"
          >
            <h3
              class="p-2 text-xl font-bold text-center border-b-2 border-white"
            >
              Air Quality
            </h3>
            <p class="p-2 text-base text-center">
              I am a founding member and technical adviser to
              <a class="underline" href="https://guaq.tech"
                >Globally Unified Air Quality</a
              >, a startup aimed at providing low-cost solutions for measuring
              and analysing air-quality conditions around the world.
            </p>
          </div>
        </div>
        <div>
          <div
            class="h-full bg-black border-2 border-white bg-opacity-70 rounded-lg drop-shadow-lg"
          >
            <h3
              class="p-2 text-xl font-bold text-center border-b-2 border-white"
            >
              Consulting
            </h3>
            <p class="p-2 text-base text-center">
              I worked as a technical consultant for financial institutions and
              government agencies in the Washington, D.C. area, providing
              guidance on identity and access management, and big data
              solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* https://hypercolor.dev/mesh
 *
 * bg-teal-700 2 33 58
 * bg-sky-700 3 100 80
 * bg-neutral-600 6 58 12
 * bg-green-900 48 37 92
 * bg-slate-300 88 74 62
 * bg-teal-100 67 90 81
 */
.bg-mesh-gradient {
  background-color: rgb(82, 82, 91);
  background-image: radial-gradient(
      at 2% 33%,
      rgb(15, 118, 110) 0,
      transparent 58%
    ),
    radial-gradient(at 3% 100%, rgb(3, 105, 161) 0, transparent 80%),
    radial-gradient(at 6% 58%, rgb(82, 82, 82) 0, transparent 12%),
    radial-gradient(at 48% 37%, rgb(20, 83, 45) 0, transparent 92%),
    radial-gradient(at 88% 74%, rgb(203, 213, 225) 0, transparent 62%),
    radial-gradient(at 67% 90%, rgb(204, 251, 241) 0, transparent 81%);
}
</style>
