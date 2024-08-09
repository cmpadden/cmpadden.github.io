<script setup>
const talks = [
    {
        title: 'Dagster Deep Dive',
        subtitle: 'Data Quality: Building Reliable Data Platforms',
        date: new Date(2024, 8, 6),
        href: 'https://github.com/dagster-io/talks/blob/main/slides/deep-dive-data-quality.pdf',
        video_href: 'https://www.youtube.com/watch?v=vT0sSKEPE3A'
    },
    {
        title: 'MotherDuck and Dagster',
        subtitle: 'From local development to production',
        date: new Date(2024, 4, 18),
        href: 'https://github.com/dagster-io/talks/blob/main/slides/motherduck-dagster-evidence-hybrid-compute.pdf',
        video_href: 'https://www.youtube.com/watch?v=cOSiMMb_rjk'
    },
    {
        title: 'Dagster Deep Dive',
        subtitle: 'Configurations and Resources',
        date: new Date(2024, 3, 5),
        href: 'https://github.com/dagster-io/talks/blob/main/slides/02-deep-dive-resources.pdf',
        video_href: 'https://www.youtube.com/watch?v=i6m7k16W-yg'
    }
]

const formatDate = function (date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

// todo - self host slides
// todo - modal slides preview

</script>

<template>
    <div class="text-white font-mono container mx-auto">
        <h1 class="text-2xl font-extrabold my-6">Talks</h1>
        <div class="grid grid-cols-10 gap-y-6">
            <template v-for="(talk, ix) in talks" :key="ix">
                <div class="col-span-2">{{ formatDate(talk.date) }}</div>
                <div class="col-span-8">
                    <div class="flex-col space-y-2">
                        <!-- <div class=""> -->
                        <div class="text-orange-500">
                            {{ talk.title }}
                        </div>
                        <div>
                            {{ talk.subtitle }}
                        </div>
                        <div class="flex">
                            <a class="text-xs text-gray-400 uppercase hover:text-orange-500 hover:cursor-pointer"
                                :href="talk.href">
                                [slides]
                            </a>
                            <a class="text-xs text-gray-400 uppercase hover:text-orange-500 hover:cursor-pointer"
                                :href="talk.video_href">
                                [video]
                            </a>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
