<template>
  <main>
    <Header />
    <div class="container mx-auto h-screen bg-background font-display">
      <div class="flex flex-col border-2 bg-white">
        <slot />
      </div>
    </div>
  </main>
</template>
