import { getAllBlogArticleSummaries } from "#content/articles";

export default defineEventHandler((event) => {
  const articles = getAllBlogArticleSummaries();
  const { limit } = getQuery(event);
  if (limit === undefined) return articles;
  const count = Number(limit);
  if (!Number.isInteger(count) || count < 1 || count > 100) {
    throw createError({ statusCode: 400, statusMessage: "Invalid article limit" });
  }
  return articles.slice(0, count);
});
