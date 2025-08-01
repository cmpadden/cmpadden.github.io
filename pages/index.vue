<script setup>
const data = await queryCollection("content")
  .order("date", "DESC")
  .limit(6)
  .all();
</script>

<template>
  <div>
    <div
      class="bg-orange-400 bg-[url('/images/noise.svg')] dark:bg-emerald-950"
    >
      <section
        class="bg-gradient-to-b from-background to-transparent py-2 dark:from-background-dark"
      >
        <div class="container mx-auto my-12">
          <img
            src="/images/blog_and_experiments.svg"
            class="mx-auto max-h-24"
          />
        </div>
      </section>
      <SectionBlogPosts :articles="data" :show_dates="true" />
      <SectionPlayground :limit="8" showImages linkToPlayground />
    </div>
  </div>
</template>
