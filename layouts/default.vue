<template>
  <div class="bg-gradient-to-b from-orange-600 to-red-600">
    <div class="p-2">
      <div
        class="bg-background font-display flex h-[calc(100vh-16px)] flex-col"
      >
        <main
          class="noise-bg no-scrollbar min-h-0 flex-1 overflow-y-auto bg-emerald-950"
        >
          <Header />
          <slot />
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>
