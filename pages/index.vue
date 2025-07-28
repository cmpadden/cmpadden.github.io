<script setup>
const data = await queryCollection("content")
  .order("date", "DESC")
  .limit(6)
  .all();
</script>

<template>
  <div>
    <div class="bg-orange-400 dark:bg-emerald-950 bg-[url('/images/noise.svg')]">
      <section class="bg-gradient-to-b from-background dark:from-background-dark to-transparent py-2">
        <div class="container mx-auto my-12">
          <img src="/images/blog_and_experiments.svg" class="max-h-24 mx-auto"/>
        </div>
      </section>
      <SectionBlogPosts :articles="data" :show_dates="true" />
      <SectionPlayground :limit="8" showImages linkToPlayground />
    </div>
  </div>
</template>
