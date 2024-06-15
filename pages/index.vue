<script setup>
const data = await queryContent()
  .only([
    "_id",
    "_path",
    "title",
    "description",
    "date",
    "img",
    "author",
    "tags",
  ])
  .sort({ date: -1 })
  .limit(4)
  .find();
</script>

<template>
  <div>
    <SectionAboutMe />
    <div class="bg-emerald-950 bg-[url('/images/noise.svg')]">
      <template v-if="false">
        <SectionInterests />
      </template>
      <SectionBlogPosts :articles="data" :show_dates="true" />
      <SectionPlayground :limit="6" showImages linkToPlayground />
    </div>
  </div>
</template>
