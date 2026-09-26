<template>
  <div class="bg-gradient-to-b from-orange-500 to-red-500">
    <div class="p-[8px]">
      <div
        class="flex h-[calc(100vh-16px)] flex-col bg-background font-display"
      >
        <Header />
        <main class="no-scrollbar min-h-0 flex-1 overflow-y-auto">
          <slot />
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>
