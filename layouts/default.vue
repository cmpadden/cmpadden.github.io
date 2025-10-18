<template>
  <div class="bg-gradient-to-b from-orange-500 to-red-500">
    <div class="p-[8px]">
      <main
        class="flex h-[calc(100vh-16px)] flex-col bg-background font-display"
      >
        <Header />
        <main class="no-scrollbar flex-1 overflow-scroll">
          <slot />
        </main>
        <Footer />
      </main>
    </div>
  </div>
</template>
