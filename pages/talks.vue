<script setup>
const talks = [
    {
        title: 'Dagster Deep Dive: Data Quality - Building Reliable Data Platforms',
        date: new Date(2024, 8, 6),
        href: 'https://github.com/dagster-io/talks/blob/main/slides/deep-dive-data-quality.pdf'
    },
    {
        title: 'MotherDuck and Dagster: From local development to production',
        date: new Date(2024, 4, 18),
        href: 'https://github.com/dagster-io/talks/blob/main/slides/motherduck-dagster-evidence-hybrid-compute.pdf'
    },
    {
        title: 'Dagster Deep Dive: Thinking in Partitions',
        date: new Date(2024, 3, 5),
        href: 'https://github.com/dagster-io/talks/blob/main/slides/03-deep-dive-partitions.pdf'
    }
]

const formatDate = function (date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
</script>
<template>
    <div class="text-white font-mono container mx-auto">
        <h1 class="text-2xl font-extrabold font-orange-500 mb-8">Talks &amp; Presentations</h1>
        <div class="grid grid-cols-5 gap-y-2 md:gap-y-4">
            <template v-for="(talk, ix) in talks" :key="ix">
                <div class="col-span-5 md:col-span-1 font-bold">{{ formatDate(talk.date) }}</div>
                <div class="col-span-5 md:col-span-4">
                    <a class="underline underline-offset-4 decoration-dotted decoration-2 hover:text-orange-500 hover:cursor-pointer"
                        :href="talk.href">
                        {{ talk.title }}
                    </a>
                </div>
            </template>
        </div>
    </div>
</template>
