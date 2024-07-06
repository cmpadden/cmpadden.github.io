<script setup>
const route = useRoute();

// optionally load `category` or `tag` query parameter when instantiating selection refs
//
// examples
//
//     localhost:3000/articles?category=embedded
//     localhost:3000/articles?tag=embedded

const selectedCategories = ref([]);
if (route.query.category) {
    selectedCategories.value = [route.query.category]
}

const selectedTags = ref([]);
if (route.query.tag) {
    selectedTags.value = [route.query.tag]
}

const { data: articles } = await useAsyncData("articles", () =>
  queryContent()
    .only([
      "_id",
      "_path",
      "title",
      "description",
      "date",
      "img",
      "author",
      "tags",
      "categories",
      "img",
      "excerpt",
      "summary",
    ])
    .sort({ date: -1 })
    .find(),
);

const categories = computed(() => {
  return [
    ...new Set(
      articles.value
        .map((article) => article.categories)
        .flat()
        .sort(),
    ),
  ];
});

const tags = computed(() => {
  return [
    ...new Set(
      articles.value
        .map((article) => article.tags)
        .flat()
        .sort(),
    ),
  ];
});

const visibleArticles = computed(() => {
  return articles.value.filter((article) => {
    if (selectedCategories.value.length > 0) {
      if (
        !selectedCategories.value.every((c) => article.categories.includes(c))
      ) {
        return false;
      }
    }

    if (selectedTags.value.length > 0) {
      if (!selectedTags.value.every((t) => article.tags.includes(t))) {
        return false;
      }
    }

    return true;
  });
});

function toggleTag(tag) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((el) => el !== tag);
  } else {
    selectedTags.value.push(tag);
  }
}

function toggleCategory(cat) {
  if (selectedCategories.value.includes(cat)) {
    selectedCategories.value = selectedCategories.value.filter(
      (el) => el !== cat,
    );
  } else {
    selectedCategories.value.push(cat);
  }
}
</script>

<template>
  <section class="container mx-auto">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-4 lg:col-span-3">
        <div v-for="article of visibleArticles" :key="article._id">
          <div class="rounded-xl bg-black/50 text-white shadow-xl">
            <div class="relative mb-2 h-full">
              <!-- heading -->
              <div class="px-4 py-2">
                <div class="mb-2 text-xl font-bold">
                  <NuxtLink
                    class="border-b-2 border-orange-500 hover:text-orange-500"
                    :to="article._path"
                    >{{ article.title }}</NuxtLink
                  >
                </div>
                <p class="flex items-center text-sm">
                  {{ article.date }}
                </p>
              </div>

              <!-- <div class="mb-3 px-4 pb-12"> -->
              <div class="mb-3 px-4">
                <p class="prose-sm">
                  <ContentRenderer
                    class="prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-2xl"
                    :value="article"
                  >
                    <ContentRendererMarkdown
                      :value="{ body: article.excerpt }"
                    />
                  </ContentRenderer>
                </p>
              </div>

              <!-- temporarily hide tags on posts -->
              <template v-if="false">
                <div class="absolute bottom-0 right-0 mb-4">
                  <span
                    v-for="tag in article.tags"
                    :key="tag"
                    :class="{
                      'bg-orange-500': selectedTags.includes(tag),
                    }"
                    class="mr-2 inline-block select-none bg-black px-3 py-1 text-sm text-orange-200"
                  >
                    <div class="tag">{{ tag }}</div>
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-4 inline-block lg:col-span-1">
        <div class="mb-3 rounded-xl bg-black/50 text-white">
          <p class="mb-0 px-3 py-2 text-xl font-bold">Categories</p>
          <a
            v-for="category in categories"
            :key="category"
            :class="{
              'bg-orange-500': selectedCategories.includes(category),
            }"
            class="block cursor-pointer select-none border-t border-black px-4 py-1 text-orange-200 hover:bg-black"
            @click="toggleCategory(category)"
            >{{ category }}</a
          >
        </div>

        <div class="mb-3 rounded-xl bg-black/50 text-white">
          <p class="mb-0 px-3 py-2 text-xl font-bold">Tags</p>
          <div class="p-2">
            <span
              v-for="(tag, ix) in tags"
              :key="ix"
              :class="{
                'bg-orange-500': selectedTags.includes(tag),
              }"
              class="mb-2 mr-2 inline-flex h-8 cursor-pointer select-none content-center justify-center bg-black px-3 py-2 text-sm leading-4 text-orange-200"
              @click="toggleTag(tag)"
            >
              <div>{{ tag }}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
