<template>
  <body class="flex flex-col min-h-screen font-display bg-background">
    <Header />
    <main class="flex-1 mt-4">
      <div class="flex justify-center">
        <HeadlessTransitionRoot
          show
          appear
          as="template"
          enter="transition transform duration-300 ease-out"
          enter-from="translate-x-8 opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition transform duration-300 ease-in"
          leave-from="opacity-100"
          leave-to="-translate-x-8 opacity-0"
        >
          <div class="bg-black/50 rounded-xl shadow-lg p-6 text-center">
            <div class="text-6xl text-white font-extrabold tracking-widest">
              Yikes!
            </div>
            <div class="text-base text-gray-200">
              Either the page you're looking for doesn't exist, or something has
              gone terribly wrong.
            </div>
          </div>
        </HeadlessTransitionRoot>
      </div>
    </main>
  </body>
</template>
