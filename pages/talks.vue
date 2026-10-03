<script setup>
const pageSeoTitle = "Talks";
const pageSeoDescription =
  "Talks, slide decks, videos, and demos from Colton Padden on data engineering, AI applications, Dagster, and developer education.";

useSeoMeta({
  title: pageTitle(pageSeoTitle),
  description: pageSeoDescription,
  ogTitle: pageTitle(pageSeoTitle),
  ogDescription: pageSeoDescription,
  ogImage: imageUrl(),
  ogUrl: absoluteUrl("/talks"),
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle(pageSeoTitle),
  twitterDescription: pageSeoDescription,
  twitterImage: imageUrl(),
});

useHead({
  link: [{ rel: "canonical", href: absoluteUrl("/talks") }],
});

const talks = [
  {
    title: "All Things Open 2025",
    subtitle: "Enabling community education with a little help from AI",
    date: new Date("2025-10-14"),
    href_slides: "/slides/ato-2025.pdf",
    href_video: "https://youtu.be/7Yz6i5YIytA?si=VY7uPOtRPau8Luok",
  },
  {
    title: "MDS Fest 3.0",
    subtitle: "Abstractions: Enabling Data Teams Through Reduced Complexity",
    date: new Date("2025-05-05"),
    href_slides: "/slides/abstractions.pdf",
    href_video:
      "https://www.secoda.co/mds-fest-3-0/abstractions-enabling-data-teams-through-reduced-complexity",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Building Breakthrough AI Applications with Not Diamond",
    date: new Date("2025-02-11"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/main/slides/deep-dive-not-diamond.pdf",
    href_video: "https://www.youtube.com/watch?v=iwAhzS4EMkw",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Shifting Left and Moving Forward with MotherDuck",
    date: new Date("2025-01-15"),
    href_slides:
      "https://github.com/dagster-io/talks/blob/88651b705102e0558908e333495b4c21451310ca/slides/deep-dive-motherduck-atproto-demo.pdf",
    href_code:
      "https://github.com/dagster-io/dagster/tree/aadfade92c7faebb0a92bd7006c4eb1934cd1982/examples/docs_projects/project_atproto_dashboard",
    href_video: "https://youtu.be/z3trqkKPbsI?feature=shared",
  },
  {
    title: "Dagster Deep Dive",
    subtitle: "Orchestrating ML Workloads with Dagster & Modal",
    date: new Date("2024-09-24"),
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

const formatDate = (date) => {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
};

// todo - self host slides
// todo - modal slides preview
</script>

<template>
  <div class="container font-mono text-white">
    <h1 class="my-7 text-2xl font-extrabold">Talks</h1>
    <div class="grid gap-y-7">
      <div
        v-for="(talk, ix) in talks"
        :key="ix"
        class="grid grid-cols-1 gap-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-1"
      >
        <time
          :datetime="talk.date.toISOString()"
          class="font-mono text-sm whitespace-nowrap text-gray-300 tabular-nums sm:pt-1"
        >
          {{ formatDate(talk.date) }}
        </time>
        <div class="flex-col space-y-3">
          <div class="text-white">
            {{ talk.title }}
          </div>
          <div>
            {{ talk.subtitle }}
          </div>
          <div class="flex flex-wrap gap-x-3 gap-y-1">
            <a
              v-if="talk.href_slides"
              class="text-xs text-gray-400 uppercase hover:cursor-pointer hover:text-orange-500"
              :href="talk.href_slides"
            >
              [slide_deck]
            </a>
            <a
              v-if="talk.href_video"
              class="text-xs text-gray-400 uppercase hover:cursor-pointer hover:text-orange-500"
              :href="talk.href_video"
            >
              [video]
            </a>
            <a
              v-if="talk.href_code"
              class="text-xs text-gray-400 uppercase hover:cursor-pointer hover:text-orange-500"
              :href="talk.href_code"
            >
              [source_code]
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
