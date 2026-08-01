import { getAllBlogArticleSummaries } from "#content/articles";

export default defineEventHandler(() => {
  return getAllBlogArticleSummaries();
});
