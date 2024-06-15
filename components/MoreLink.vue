<script setup>
import { LinkIcon } from "@heroicons/vue/16/solid";

const props = defineProps({
    to: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="flex justify-end">
        <NuxtLink :to="props.to" class="flex items-center font-bold text-sm text-white hover:text-orange-500">
            More
            <LinkIcon class="ml-1 h-5 w-5" aria-hidden="true" />
        </NuxtLink>
    </div>
</template>

