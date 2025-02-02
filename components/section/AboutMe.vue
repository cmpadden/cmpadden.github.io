<template>
  <section class="">
    <div class="lg:text-normal space-y-4 text-justify text-white sm:text-base">
      <template v-if="false">
        <div>
          I am a
          <span class="inline-block w-48">
            <HeadlessTransitionRoot
              as="template"
              appear
              :show="show"
              enter="transition transform duration-300 ease-out"
              enter-from="translate-y-2 opacity-0"
              enter-to="translate-x-0 opacity-100"
              leave="transition transform duration-300 ease-in"
              leave-from="opacity-100"
              leave-to="-translate-y-2 opacity-0"
            >
              <div
                class="w-48 bg-white px-2 text-center font-extrabold tracking-wide text-black shadow-xl"
              >
                {{ occupation }}
              </div>
            </HeadlessTransitionRoot>
          </span>
        </div>
      </template>
      <div>
        I help educate data engineers while building the future of data
        orchestration at
        <a
          class="border-b-2 border-orange-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://dagster.io/"
          >Dagster</a
        >.
      </div>
      <div>
        Previously, I worked at
        <a
          class="border-b-2 border-orange-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.gemini.com/"
          >Gemini</a
        >
        building the data platform that provided company-wide insights into the
        exchange and business. At Georgetown University's
        <a
          class="border-b-2 border-orange-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://mccourt.georgetown.edu/research/the-massive-data-institute/"
          >Massive Data Institute</a
        >
        building data warehousing, processing solutions, and portals to aid
        social scientists and researchers to leverage large-scale organic data.
        And previously I provided consulting for financial institutions and
        government agencies in the D.C. area around data practices, and identity
        and access management.
      </div>
    </div>
  </section>
</template>
