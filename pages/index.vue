<script setup>
const data = await queryCollection("content")
  .order('date', 'DESC')
  .limit(4)
  .all();
</script>

<template>
  <div>
    <template v-if="false">
      <SectionAboutMe />
    </template>
    <div class="bg-emerald-950 bg-[url('/images/noise.svg')]">
      <template v-if="false">
        <SectionInterests />
      </template>
      <SectionBlogPosts :articles="data" :show_dates="true" />
      <SectionPlayground :limit="9" showImages linkToPlayground />
    </div>
  </div>
</template>
