<script setup>
const route = useRoute();
const router = useRouter();

const selectedCategories = ref([]);
const selectedTags = ref([]);
const currentPage = ref(1);
const pageSize = 5;

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

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(visibleArticles.value.length / pageSize));
});

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return visibleArticles.value.slice(start, start + pageSize);
});

function toggleTag(tag) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((el) => el !== tag);
  } else {
    selectedTags.value.push(tag);
  }

  currentPage.value = 1;
}

function toggleCategory(cat) {
  if (selectedCategories.value.includes(cat)) {
    selectedCategories.value = selectedCategories.value.filter(
      (el) => el !== cat,
    );
  } else {
    selectedCategories.value.push(cat);
  }

  currentPage.value = 1;
}

function normalizeFilterQuery(value) {
  if (!value) {
    return [];
  }

  const values = Array.isArray(value)
    ? value
    : value.split(",").map((val) => val.trim());

  return [...new Set(values.filter(Boolean))];
}

function queryValueToString(value) {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value.join(",") : value;
}

function normalizePageQuery(value) {
  if (!value) {
    return 1;
  }

  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = parseInt(raw, 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

watch(
  () => route.query.category,
  (value) => {
    selectedCategories.value = normalizeFilterQuery(value);
  },
  { immediate: true },
);

watch(
  () => route.query.tag,
  (value) => {
    selectedTags.value = normalizeFilterQuery(value);
  },
  { immediate: true },
);

watch(
  () => route.query.page,
  (value) => {
    currentPage.value = normalizePageQuery(value);
  },
  { immediate: true },
);

watch(visibleArticles, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

watch(
  [selectedCategories, selectedTags, currentPage],
  () => {
    const nextCategory = selectedCategories.value.join(",");
    const nextTag = selectedTags.value.join(",");
    const nextPage = currentPage.value > 1 ? String(currentPage.value) : "";

    const currentCategory = queryValueToString(route.query.category);
    const currentTag = queryValueToString(route.query.tag);
    const currentPageQuery = Array.isArray(route.query.page)
      ? route.query.page[0]
      : route.query.page || "";

    if (
      nextCategory === currentCategory &&
      nextTag === currentTag &&
      nextPage === currentPageQuery
    ) {
      return;
    }

    const query = { ...route.query };

    if (nextCategory) {
      query.category = nextCategory;
    } else {
      delete query.category;
    }

    if (nextTag) {
      query.tag = nextTag;
    } else {
      delete query.tag;
    }

    if (nextPage) {
      query.page = nextPage;
    } else {
      delete query.page;
    }

    router.replace({ query });
  },
  { deep: true },
);
</script>

<template>
  <section
    class="min-h-screen bg-emerald-950 bg-[url('/images/noise.svg')] py-10 text-white"
  >
    <div class="container mx-auto space-y-8">
      <div class="space-y-4">
        <div class="grid gap-4">
          <NuxtLink
            v-for="article in paginatedArticles"
            :key="article._id"
            :to="article.path"
            class="h-full"
          >
            <div
              class="flex h-full flex-col justify-between space-y-3 bg-black/50 p-4 text-white drop-shadow-lg hover:ring-1 hover:ring-white"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-3">
                  <p class="flex-1 text-xl font-semibold text-orange-400">
                    {{ article.title }}
                  </p>
                  <NuxtTime
                    :datetime="article.date"
                    class="text-sm text-gray-300"
                    year="numeric"
                    month="short"
                    day="2-digit"
                  />
                </div>
              </div>
              <p
                v-if="article.description"
                class="line-clamp-4 text-sm text-gray-100"
              >
                {{ article.description }}
              </p>
              <ContentRenderer
                v-else-if="article.meta?.excerpt"
                :value="article.meta.excerpt"
                class="line-clamp-4 text-sm text-gray-100"
              />
            </div>
          </NuxtLink>
        </div>

        <div class="flex items-center justify-between text-sm text-gray-300">
          <button
            type="button"
            class="border border-white/20 px-3 py-1 text-xs uppercase tracking-wide transition hover:border-orange-400 hover:text-white disabled:cursor-not-allowed disabled:border-white/5 disabled:text-gray-500"
            :disabled="currentPage === 1"
            @click="currentPage > 1 && currentPage--"
          >
            Previous
          </button>
          <p>Page {{ currentPage }} of {{ totalPages }}</p>
          <button
            type="button"
            class="border border-white/20 px-3 py-1 text-xs uppercase tracking-wide transition hover:border-orange-400 hover:text-white disabled:cursor-not-allowed disabled:border-white/5 disabled:text-gray-500"
            :disabled="currentPage === totalPages"
            @click="currentPage < totalPages && currentPage++"
          >
            Next
          </button>
        </div>
      </div>

      <div class="space-y-6 border-t border-white/20 pt-6">
        <div class="grid gap-8 lg:grid-cols-2">
          <div>
            <p class="text-xs uppercase tracking-widest text-gray-300">
              Categories
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                :class="[
                  'border border-white/20 px-4 py-1 text-sm transition hover:border-orange-400 hover:text-white',
                  selectedCategories.includes(category)
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-200',
                ]"
                @click="toggleCategory(category)"
              >
                {{ category }}
              </button>
            </div>
          </div>
          <div v-if="showTags">
            <p class="text-xs uppercase tracking-widest text-gray-300">
              Tags
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="(tag, ix) in tags"
                :key="ix"
                type="button"
                :class="[
                  'border border-white/20 px-4 py-1 text-sm transition hover:border-orange-400 hover:text-white',
                  selectedTags.includes(tag)
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-200',
                ]"
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
