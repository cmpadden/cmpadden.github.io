<template>
    <div class="bg-gradient-to-b from-orange-500 to-red-500">
        <div class="p-[10px]">
            <main class="flex min-h-screen flex-col rounded-3xl bg-background font-display">
                <Header />
                <main class="flex-1">
                    <slot />
                </main>
                <Footer />
            </main>
        </div>
    </div>
</template>
