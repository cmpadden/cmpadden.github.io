<template>
  <body class="bg-background font-display flex min-h-screen flex-col">
    <Header />
    <main class="mt-5 flex-1">
      <div class="flex justify-center">
        <Transition
          appear
          enter="transition transform duration-300 ease-out"
          enter-from="translate-x-8 opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition transform duration-300 ease-in"
          leave-from="opacity-100"
          leave-to="-translate-x-8 opacity-0"
        >
          <div class="rounded-xl bg-black/50 p-7 text-center shadow-lg">
            <div class="text-6xl font-extrabold tracking-widest text-white">
              Yikes!
            </div>
            <div class="text-base text-gray-200">
              Either the page you're looking for doesn't exist, or something has
              gone terribly wrong.
            </div>
          </div>
        </Transition>
      </div>
    </main>
  </body>
</template>
