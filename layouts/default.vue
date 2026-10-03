<template>
  <div class="bg-gradient-to-b from-orange-600 to-red-600">
    <div class="p-3">
      <div
        class="bg-background font-display flex h-[calc(100vh-24px)] flex-col"
      >
        <main
          class="site-noise-surface noise-bg no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto bg-black pointer-fine:overscroll-none"
        >
          <Header />
          <div class="flex-1">
            <slot />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  </div>
</template>
