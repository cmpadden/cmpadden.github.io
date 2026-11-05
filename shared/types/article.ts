import type { MarkdownDocument } from "comark";

export type BlogArticle = {
  _id: string;
  slug: string;
  path: string;
  document: MarkdownDocument;
  excerpt: string;
  readingTimeMinutes: number;
  title: string;
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

// List cards need neither a document AST nor full article excerpts/metadata.
export type BlogArticleSummary = Pick<
  BlogArticle,
  "_id" | "path" | "title" | "date" | "external_url" | "external_site"
>;
