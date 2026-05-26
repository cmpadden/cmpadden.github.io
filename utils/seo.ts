export const SITE_ORIGIN = "https://cmpadden.github.io";
export const SITE_NAME = "Colton Padden";
export const DEFAULT_TITLE = "Colton Padden's Blog & Experiments";
export const DEFAULT_DESCRIPTION =
  "Technical writing, projects, and browser experiments by Colton Padden.";
export const DEFAULT_SOCIAL_IMAGE = "/images/og-index.webp";

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalizedPath}`;
};

export const pageTitle = (title?: string) =>
  title && title !== DEFAULT_TITLE ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

export const imageUrl = (path?: string) =>
  absoluteUrl(path || DEFAULT_SOCIAL_IMAGE);

const collectText = (node: any): string => {
  if (!node) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (typeof node.value === "string") {
    return node.value;
  }

  if (Array.isArray(node.children)) {
    return node.children.map(collectText).filter(Boolean).join(" ");
  }

  return "";
};

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
  meta?: {
    excerpt?: unknown;
  };
}) =>
  article?.description ||
  truncateDescription(collectText(article?.meta?.excerpt)) ||
  (article?.title
    ? `A technical article by Colton Padden: ${article.title}.`
    : DEFAULT_DESCRIPTION);
