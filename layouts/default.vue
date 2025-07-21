<template>
    <div class="bg-gradient-to-b from-orange-500 to-red-500">
        <div class="p-[10px]">
            <main class="flex h-[calc(100vh-20px)] flex-col rounded-3xl bg-background dark:bg-background-dark font-display">
                <Header />
                <main class="flex-1 overflow-scroll no-scrollbar">
                    <slot />
                </main>
                <Footer />
            </main>
        </div>
    </div>
</template>
