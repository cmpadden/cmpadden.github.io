<template>
  <main class="flex flex-col min-h-screen bg-background font-display">
    <Header />
    <main class="flex-1 mt-4">
      <slot />
    </main>
    <Footer />
  </main>
</template>
