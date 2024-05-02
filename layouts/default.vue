<template>
  <div class="bg-orange-500">
    <div class="rounded-3xl border-[10px] border-orange-500">
      <main
        class="flex min-h-screen flex-col rounded-3xl bg-background font-display"
      >
        <Header />
        <main class="flex-1">
          <slot />
        </main>
        <Footer />
      </main>
    </div>
  </div>
</template>
