import { getBlogArticleBySlug } from "#content/articles";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: "Article not found",
    });
  }

  return article;
});
