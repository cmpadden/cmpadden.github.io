<template>
  <body class="flex flex-col min-h-screen bg-grayish font-display">
    <Header />
    <main class="flex-1 mt-4">
      <div class="flex justify-center">
        <div class="rounded shadow-lg p-6 text-center">
          <img
            class="object-scale-down h-48 w-full"
            src="/images/randy-jackson.png"
          />
          <div class="font-weight-medium italic text-xl text-white">
            That's a yikes from me, dawg.
          </div>
          <div class="text-base text-gray-200">
            Either the page you're looking for doesn't exist, or something has
            gone terribly wrong.
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </body>
</template>
