<script setup>
const pageSeoTitle = "Talks";
const pageSeoDescription =
  "Talks, slide decks, videos, and demos from Colton Padden on data engineering, AI applications, Dagster, and developer education.";

usePageSeo({
  title: pageSeoTitle,
  description: pageSeoDescription,
  path: "/talks",
});

const talks = [
  {
    title: "Building an analytics agent with eve",
    event: "Data Outpost 2026",
    date: new Date("2026-11-04"),
    href_slides: "/slides/data-outpost-2026.pdf",
  },
  {
    title:
      "The eve Framework: Agentic payments and building a shopping assistant",
    event: "NY Stripe Developer Meetup",
    date: new Date("2026-10-22"),
    href_slides: "/slides/stripe-developer-meetup-ny-2026.pdf",
  },
  {
    title: "Enabling community education with a little help from AI",
    event: "All Things Open 2025",
    date: new Date("2025-10-14"),
    href_slides: "/slides/ato-2025.pdf",
    href_video: "https://youtu.be/7Yz6i5YIytA?si=VY7uPOtRPau8Luok",
  },
  {
    title: "Abstractions: Enabling Data Teams Through Reduced Complexity",
    event: "MDS Fest 3.0",
    date: new Date("2025-05-05"),
    href_slides: "/slides/abstractions.pdf",
    href_video:
      "https://www.secoda.co/mds-fest-3-0/abstractions-enabling-data-teams-through-reduced-complexity",
  },
  {
    title: "Building Breakthrough AI Applications with Not Diamond",
    event: "Dagster Deep Dive",
    date: new Date("2025-02-11"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/deep-dive-not-diamond.pdf",
    href_video: "https://www.youtube.com/watch?v=iwAhzS4EMkw",
  },
  {
    title: "Shifting Left and Moving Forward with MotherDuck",
    event: "Dagster Deep Dive",
    date: new Date("2025-01-15"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/88651b705102e0558908e333495b4c21451310ca/slides/deep-dive-motherduck-atproto-demo.pdf",
    href_code:
      "https://github.com/dagster-io/dagster/tree/aadfade92c7faebb0a92bd7006c4eb1934cd1982/examples/docs_projects/project_atproto_dashboard",
    href_video: "https://youtu.be/z3trqkKPbsI?feature=shared",
  },
  {
    title: "Orchestrating ML Workloads with Dagster & Modal",
    event: "Dagster Deep Dive",
    date: new Date("2024-09-24"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/deep-dive-dagster-modal-demo.pdf",
    href_code: "https://github.com/dagster-io/dagster-modal-demo",
  },
  {
    title: "Data Quality: Building Reliable Data Platforms",
    event: "Dagster Deep Dive",
    date: new Date("2024-08-06"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/deep-dive-data-quality.pdf",
    href_video: "https://www.youtube.com/watch?v=vT0sSKEPE3A",
  },
  {
    title: "From local development to production",
    event: "MotherDuck and Dagster",
    date: new Date("2024-04-18"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/motherduck-dagster-evidence-hybrid-compute.pdf",
    href_video: "https://www.youtube.com/watch?v=cOSiMMb_rjk",
    href_code:
      "https://github.com/dagster-io/talks/tree/main/motherduck-dagster-hybrid-compute",
  },
  {
    title: "Configurations and Resources",
    event: "Dagster Deep Dive",
    date: new Date("2024-03-05"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/02-deep-dive-resources.pdf",
    href_video: "https://www.youtube.com/watch?v=i6m7k16W-yg",
    href_code:
      "https://github.com/dagster-io/talks/tree/main/dagster-deep-dives/dagster_deep_dives/resources_and_configurations",
  },
];

const resources = [
  { key: "href_slides", label: "slides" },
  { key: "href_video", label: "video" },
  { key: "href_code", label: "source" },
];

// todo - self host slides
</script>

<template>
  <div class="text-foreground container py-3">
    <h1 class="font-pixelify mb-5 text-3xl font-bold">Talks</h1>
    <div class="grid gap-y-7">
      <div
        v-for="(talk, ix) in talks"
        :key="ix"
        class="grid grid-cols-1 gap-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-5"
      >
        <time
          :datetime="talk.date.toISOString()"
          class="font-mono text-sm whitespace-nowrap text-gray-600 tabular-nums sm:pt-1 dark:text-gray-300"
        >
          {{ formatDate(talk.date) }}
        </time>
        <div class="min-w-0 space-y-1">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 class="text-lg font-semibold md:text-xl">
              {{ talk.title }}
            </h2>
            <div class="flex flex-wrap items-center gap-1.5">
              <a
                v-for="resource in resources.filter(({ key }) => talk[key])"
                :key="resource.key"
                :href="talk[resource.key]"
                :aria-label="`${resource.label} for ${talk.title} (opens in a new tab)`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-6 items-center gap-1 font-mono text-xs font-medium tracking-wide text-gray-600 uppercase transition-colors hover:text-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
              >
                <span class="text-orange-500" aria-hidden="true">[</span>
                {{ resource.label }}
                <span class="text-orange-500" aria-hidden="true">]</span>
              </a>
            </div>
          </div>
          <p class="font-mono text-base text-gray-600 dark:text-gray-400">
            {{ talk.event }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
