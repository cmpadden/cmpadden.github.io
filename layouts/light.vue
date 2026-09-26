<template>
  <main>
    <Header />
    <div
      class="mx-auto min-h-screen w-full max-w-7xl bg-background px-4 font-display sm:px-6 lg:px-8"
    >
      <main class="flex flex-col">
        <slot />
      </main>
    </div>
  </main>
</template>
