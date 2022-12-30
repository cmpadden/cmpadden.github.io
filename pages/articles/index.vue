<template>
  <section class="mx-6 md:mx-12">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-4 lg:col-span-3">
        <div v-for="article of visible_articles" :key="article._id">
          <div>
            <div class="shadow-lg bg-gray-300 h-full relative mb-2">
              <!-- heading -->
              <div class="px-4 py-2">
                <div class="font-bold text-xl">
                  <NuxtLink class="gradient-underline" :to="article._path">{{
                    article.title
                  }}</NuxtLink>
                </div>
                <p class="text-sm text-gray-600 flex items-center">
                  {{ article.date }}
                </p>
              </div>

              <div class="px-4 pt-2 pb-12 mb-3 bg-gray-100">
                <p class="text-gray-700 prose-sm">
                  <ContentRenderer
                    class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
                    :value="article"
                  >
                    <ContentRendererMarkdown
                      :value="{ body: article.excerpt }"
                    />
                  </ContentRenderer>
                </p>
              </div>

              <!-- tags -->
              <div class="mb-6 absolute bottom-0 right-0">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  :class="{
                    'bg-green-100': selected_tags.includes(tag),
                  }"
                  class="inline-block bg-gray-200 px-3 py-1 mr-2 text-sm text-blue-500 mr-2 select-none"
                >
                  <div class="tag">{{ tag }}</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 lg:col-span-1 inline-block">
        <div class="panel mb-3 bg-white">
          <p class="font-bold text-xl bg-gray-300 py-2 px-3 mb-0">Categories</p>
          <a
            v-for="category in categories"
            :key="category"
            :class="{
              'bg-green-100': selected_categories.includes(category),
              'hover:bg-red-100': selected_categories.includes(category),
            }"
            class="block border-t py-1 px-4 hover:bg-purple-200 text-blue-500 cursor-pointer select-none"
            @click="toggle_category(category)"
            >{{ category }}</a
          >
        </div>

        <div class="panel mb-3">
          <p class="font-bold text-xl bg-gray-300 py-2 px-3 mb-0">Tags</p>
          <div class="panel-block bg-gray-100 border p-2">
            <span
              v-for="(tag, ix) in tags"
              :key="ix"
              :class="{
                'bg-green-100': selected_tags.includes(tag),
                'hover:bg-red-100': selected_tags.includes(tag),
              }"
              class="inline-flex py-2 leading-4 mr-2 mb-2 content-center bg-gray-200 justify-center h-8 px-3 text-sm text-blue-500 hover:bg-purple-200 cursor-pointer select-none"
              @click="toggle_tag(tag)"
            >
              <div>{{ tag }}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async setup() {
    const articles = await queryContent()
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
      .limit(5)
      .find();

    return {
      articles,
    };
  },
  data() {
    return {
      selected_tags: [],
      selected_categories: [],
    };
  },
  computed: {
    categories() {
      // unique tags for all articles
      return [
        ...new Set(
          this.articles
            .map((article) => article.categories)
            .flat()
            .sort()
        ),
      ];
    },
    tags() {
      // unique tags for all articles
      return [
        ...new Set(
          this.articles
            .map((article) => article.tags)
            .flat()
            .sort()
        ),
      ];
    },
    visible_articles() {
      return this.articles.filter((article) => {
        // article must contain _every_ category in selected categories
        if (this.selected_categories.length > 0) {
          if (
            !this.selected_categories.every((c) =>
              article.categories.includes(c)
            )
          ) {
            return false;
          }
        }

        // article must contain _every_ tag in selected tags
        if (this.selected_tags.length > 0) {
          if (!this.selected_tags.every((t) => article.tags.includes(t))) {
            return false;
          }
        }

        // if no filtering has occurred, return the article
        return true;
      });
    },
  },
  methods: {
    toggle_tag(tag) {
      if (this.selected_tags.includes(tag)) {
        this.selected_tags = this.selected_tags.filter((el) => el !== tag);
      } else {
        this.selected_tags.push(tag);
      }
    },
    toggle_category(cat) {
      if (this.selected_categories.includes(cat)) {
        this.selected_categories = this.selected_categories.filter(
          (el) => el !== cat
        );
      } else {
        this.selected_categories.push(cat);
      }
    },
  },
};
</script>
