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
    <SectionInterests />
    <SectionPlayground :limit="4" showImages linkToPlayground />
    <SectionBlogPosts :articles="data" />
  </div>
</template>
