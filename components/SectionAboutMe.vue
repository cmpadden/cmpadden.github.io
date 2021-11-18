<template>
  <section class="container mx-auto mb-4">
    <div class="mx-6 md:mx-12">
      <div class="flex flex-wrap">
        <div class="w-full md:w-2/3">
          <div class="p-2">
            <h1 class="text-4xl font-bold leading-tight text-white pb-4">
              Who&#183;Am&#183;I
            </h1>
            <div
              class="
                sm:text-base
                lg:text-lg
                font-medium
                tracking-wide
                text-white
              "
            >
              I am a
              <span class="gradient-highlight"
                >data engineer and web developer</span
              >
              working at Georgetown University's
              <a
                class="border-b-2 border-blue-200"
                target="_blank"
                rel="noopener noreferrer"
                href="https://mccourt.georgetown.edu/research/the-massive-data-institute/"
                >Massive Data Institute</a
              >
              in the McCourt School of Public Policy, with a primary focus on
              building data warehousing and processing solutions for social
              scientists and researchers to leverage large-scale organic data.
            </div>
          </div>
        </div>
        <div
          class="
            hidden
            md:block
            w-full
            md:w-1/3
            p-12
            flex flex-col
            justify-center
            items-center
          "
        >
          <img
            class="
              object-center object-cover
              rounded-full
              h-40
              w-40
              ring ring-blue-200
            "
            src="https://avatars.githubusercontent.com/u/5807118?v=4"
            alt="Colton Padden Avatar"
          />
        </div>
      </div>
    </div>
  </section>
</template>
