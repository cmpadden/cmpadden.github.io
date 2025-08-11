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
  selectedCategories.value = [route.query.category];
}

const selectedTags = ref([]);
if (route.query.tag) {
  selectedTags.value = [route.query.tag];
}

const showTags = ref(true);

const { data: articles } = await useAsyncData("articles", () =>
  queryCollection("content").order("date", "DESC").all(),
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
  <section class="container mx-auto font-mono text-white">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-4 lg:col-span-3">
        <div class="grid grid-cols-10 gap-y-4 lg:gap-y-6">
          <template v-for="article in visibleArticles" :key="article._id">
            <NuxtTime
              :datetime="article.date"
              class="col-span-10 lg:col-span-2"
              year="numeric"
              month="short"
              day="2-digit"
            />
            <div class="col-span-10 lg:col-span-8">
              <div class="flex-col space-y-2">
                <NuxtLink class="text-orange-500" :to="article.path">{{
                  article.title
                }}</NuxtLink>
                <ContentRenderer
                  v-if="article.meta?.excerpt"
                  :value="article.meta.excerpt"
                  class="line-clamp-5 text-xs text-gray-400"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
      <div
        class="col-span-4 border-l pl-4 border-gray-700 lg:col-span-1"
      >
        <div class="my-2 space-y-2">
          <p class="text-xl font-bold">Categories</p>
          <div
            v-for="category in categories"
            :key="category"
            :class="{
              'bg-orange-500 text-white': selectedCategories.includes(category),
            }"
            class="cursor-pointer p-1 text-sm hover:bg-orange-500 hover:text-white text-gray-400"
            @click="toggleCategory(category)"
          >
            {{ category }}
          </div>
        </div>

        <div v-if="showTags" class="my-2 space-y-2">
          <p class="text-xl font-bold">Tags</p>
          <div
            v-for="(tag, ix) in tags"
            :key="ix"
            :class="{
              'bg-orange-500 text-white': selectedTags.includes(tag),
            }"
            class="cursor-pointer select-none p-1 text-sm hover:bg-orange-500 hover:text-white text-gray-400"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
