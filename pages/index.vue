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
    <SectionBlogPosts :articles="data" />
    <SectionPlayground :limit="3" showImages linkToPlayground />
  </div>
</template>
