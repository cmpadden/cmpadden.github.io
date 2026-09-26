import type { BlogArticle } from "../modules/content/runtime/types/blog-article";

export function externalSite(
  article?: Pick<BlogArticle, "external_url" | "external_site">,
) {
  if (!article?.external_url) return "";
  if (article.external_site) return article.external_site;

  try {
    return new URL(article.external_url).hostname.replace(/^www\./, "");
  } catch {
    return article.external_url;
  }
}
