<template>
  <div class="bg-gradient-to-b from-orange-500 to-red-500">
    <div class="p-[8px]">
      <div
        class="flex h-[calc(100vh-16px)] flex-col bg-background font-display"
      >
        <main class="noise-bg no-scrollbar min-h-0 flex-1 overflow-y-auto bg-emerald-950">
          <Header />
          <slot />
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>
