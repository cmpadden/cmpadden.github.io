<script setup>
const articles = await queryCollection("content")
  .order("date", "DESC")
  .limit(3)
  .all();
</script>

<template>
  <div class="min-h-screen bg-emerald-950 bg-[url('/images/noise.svg')]">
    <section class="bg-gradient-to-b from-background to-transparent py-2">
      <div class="container mx-auto my-7">
        <div class="text-orange-500">
          <Logo />
        </div>
      </div>
    </section>
    <SectionBlogPosts :articles="articles" :show_dates="true" />
    <SectionPlayground :limit="6" showImages linkToPlayground />
  </div>
</template>
