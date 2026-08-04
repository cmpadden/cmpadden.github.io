export type BlogArticle = {
  _id: string;
  slug: string;
  path: string;
  document: unknown;
  excerpt: string;
  title?: string;
  description?: string;
  date: string;
  tags: string[];
  categories: string[];
  cover_image?: string;
  img?: string;
  external_url?: string;
  external_site?: string;
  canonical_url?: string;
  draft?: boolean;
};

export type BlogArticleSummary = Omit<BlogArticle, "document">;
