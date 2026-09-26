type PageSeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Apply the site's standard title, social metadata, and canonical URL. */
export function usePageSeo({
  title,
  description,
  path,
  image,
}: PageSeoOptions) {
  const fullTitle = pageTitle(title);
  const socialImage = imageUrl(image);
  const canonical = absoluteUrl(path);

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: socialImage,
    ogUrl: canonical,
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: socialImage,
  });

  useHead({ link: [{ rel: "canonical", href: canonical }] });
}
