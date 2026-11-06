// Public route metadata shared by rendering, feeds, sitemap, and build tooling.
export const SITE_ORIGIN = "https://colton.foo";
export const SITE_NAME = "Colton Padden";
export const DEFAULT_SOCIAL_IMAGE = "/images/og-index.webp";
export const SOCIAL_IMAGE_SECTIONS = [
  "about",
  "blog",
  "experiments",
  "talks",
] as const;

export const socialImagePath = (path = "/") => {
  const section = path.split(/[?#]/)[0]?.split("/").filter(Boolean)[0];
  return SOCIAL_IMAGE_SECTIONS.some((name) => name === section)
    ? `/images/generated/og/${section}.webp`
    : DEFAULT_SOCIAL_IMAGE;
};
export const PAGE_ROUTES = [
  "/",
  "/about/",
  "/blog/",
  "/experiments/",
  "/experiments/audio/",
  "/experiments/chords/",
  "/experiments/matrix/",
  "/experiments/midi/",
  "/talks/",
] as const;

export const canonicalPath = (path: string) => {
  const [, pathname = "/", suffix = ""] = path.match(/^([^?#]*)(.*)$/) || [];
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${normalized.endsWith("/") || /\.[^/]+$/.test(normalized) ? normalized : `${normalized}/`}${suffix}`;
};

export const absoluteUrl = (path = "/"): string =>
  /^https?:\/\//.test(path) ? path : `${SITE_ORIGIN}${canonicalPath(path)}`;
