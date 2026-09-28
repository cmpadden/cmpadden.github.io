declare module "#content/articles" {
  import type {
    BlogArticle,
    BlogArticleSummary,
  } from "../modules/content/runtime/types/blog-article";

  type ArticleOptions = { includeDrafts?: boolean };

  export function getAllBlogArticles(options?: ArticleOptions): BlogArticle[];
  export function getAllBlogArticleSummaries(
    options?: ArticleOptions,
  ): BlogArticleSummary[];
  export function getBlogArticleBySlug(slug: string): BlogArticle | undefined;
}
