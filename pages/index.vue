<script setup>
const data = await queryCollection("content")
  .order("date", "DESC")
  .limit(6)
  .all();
</script>

<template>
  <div class="bg-[url('/images/noise.svg')] bg-emerald-950 min-h-screen">
    <div>
      <section
        class="bg-gradient-to-b to-transparent py-2 from-background"
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
