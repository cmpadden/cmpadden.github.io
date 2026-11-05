export { SITE_ORIGIN, SITE_NAME, absoluteUrl } from "#shared/site";
import { absoluteUrl, SITE_NAME } from "#shared/site";
export const DEFAULT_TITLE = "colton :: blog ∧ experiments";
export const DEFAULT_DESCRIPTION =
  "Technical writing, projects, and browser experiments by Colton Padden.";
export const DEFAULT_SOCIAL_IMAGE = "/images/og-index.webp";

export const pageTitle = (title?: string) =>
  title && title !== DEFAULT_TITLE ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

export const imageUrl = (path?: string) =>
  absoluteUrl(path || DEFAULT_SOCIAL_IMAGE);

const truncateDescription = (value: string) => {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= 155) {
    return normalized;
  }

  return `${normalized.slice(0, 152).trimEnd()}...`;
};

export const articleDescription = (article?: {
  title?: string;
  description?: string;
  excerpt?: string;
}) =>
  article?.description ||
  truncateDescription(article?.excerpt || "") ||
  (article?.title
    ? `A technical article by Colton Padden: ${article.title}.`
    : DEFAULT_DESCRIPTION);
