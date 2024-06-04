<script setup>
import { ChevronRightIcon } from "@heroicons/vue/16/solid";

const props = defineProps({
    to: {
        type: String,
        required: true
    }
});
</script>

<template>
    <NuxtLink :to="props.to" class="mt-4 flex font-bold text-orange-200 hover:text-red-200">
        More
        <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
    </NuxtLink>
</template>

