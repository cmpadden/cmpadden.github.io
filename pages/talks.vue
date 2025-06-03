<script setup>
const talks = [
  {
    title: "MDS Fest 3.0",
    subtitle: "Abstractions: Enabling Data Teams Through Reduced Complexity",
    date: new Date("2025-5-5"),
    href_slides: "/slides/abstractions.pdf",
    href_video:
      "https://www.secoda.co/mds-fest-3-0/abstractions-enabling-data-teams-through-reduced-complexity",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Building Breakthrough AI Applications with Not Diamond",
    date: new Date("2025-2-11"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/deep-dive-not-diamond.pdf",
    href_video: "https://www.youtube.com/watch?v=iwAhzS4EMkw",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Shifting Left and Moving Forward with MotherDuck",
    date: new Date("2025-1-15"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/88651b705102e0558908e333495b4c21451310ca/slides/deep-dive-motherduck-atproto-demo.pdf",
    href_code:
      "https://github.com/dagster-io/dagster/tree/aadfade92c7faebb0a92bd7006c4eb1934cd1982/examples/docs_projects/project_atproto_dashboard",
    href_video: "https://youtu.be/z3trqkKPbsI?feature=shared",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Orchestrating ML Workloads with Dagster & Modal",
    date: new Date("2024-9-24"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/deep-dive-dagster-modal-demo.pdf",
    href_code: "https://github.com/dagster-io/dagster-modal-demo",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Data Quality: Building Reliable Data Platforms",
    date: new Date("2024-08-06"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/deep-dive-data-quality.pdf",
    href_video: "https://www.youtube.com/watch?v=vT0sSKEPE3A",
  },
  {
    title: "MotherDuck and Dagster",
    subtitle: "From local development to production",
    date: new Date("2024-04-18"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/motherduck-dagster-evidence-hybrid-compute.pdf",
    href_video: "https://www.youtube.com/watch?v=cOSiMMb_rjk",
    href_code:
      "https://github.com/dagster-io/talks/tree/main/motherduck-dagster-hybrid-compute",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Configurations and Resources",
    date: new Date("2024-03-05"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/02-deep-dive-resources.pdf",
    href_video: "https://www.youtube.com/watch?v=i6m7k16W-yg",
    href_code:
      "https://github.com/dagster-io/talks/tree/main/dagster-deep-dives/dagster_deep_dives/resources_and_configurations",
  },
];

// todo - self host slides
// todo - modal slides preview
</script>

<template>
  <div class="container mx-auto font-mono text-white">
    <h1 class="my-6 text-2xl font-extrabold">Talks</h1>
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
              <a
                v-if="talk.href_slides"
                class="text-xs uppercase text-gray-400 hover:cursor-pointer hover:text-orange-500"
                :href="talk.href_slides"
              >
                [slide_deck]
              </a>
              <a
                v-if="talk.href_video"
                class="text-xs uppercase text-gray-400 hover:cursor-pointer hover:text-orange-500"
                :href="talk.href_video"
              >
                [video]
              </a>
              <a
                v-if="talk.href_code"
                class="text-xs uppercase text-gray-400 hover:cursor-pointer hover:text-orange-500"
                :href="talk.href_code"
              >
                [source_code]
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
