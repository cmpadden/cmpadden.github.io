<script setup>
const data = await queryCollection("content")
  .order("date", "DESC")
  .limit(6)
  .all();
</script>

<template>
  <div class="min-h-screen bg-emerald-950 bg-[url('/images/noise.svg')]">
    <section class="bg-gradient-to-b from-background to-transparent py-2">
      <div class="container mx-auto my-12">
        <div class="text-orange-500">
          <Logo />
        </div>
      </div>
    </section>
    <SectionBlogPosts :articles="data" :show_dates="true" />
    <SectionPlayground :limit="8" showImages linkToPlayground />
  </div>
</template>
