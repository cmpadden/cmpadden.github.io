<script setup>
const data = await queryCollection("content")
  .order("date", "DESC")
  .limit(4)
  .all();
</script>

<template>
  <div>
    <div class="bg-emerald-950 bg-[url('/images/noise.svg')]">
      <SectionBlogPosts :articles="data" :show_dates="true" />
      <SectionPlayground :limit="9" showImages linkToPlayground />
    </div>
  </div>
</template>
