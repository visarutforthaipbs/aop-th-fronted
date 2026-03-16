import { getArticleBySlug, getAllArticles } from "@/lib/api";
import { notFound } from "next/navigation";
import ArticleDetailClient from "./ArticleDetailClient";

export async function generateStaticParams() {
  const articles = await getAllArticles(null);

  if (!articles) return [];

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetail({ params }) {
  const { slug } = params;
  const article = await getArticleBySlug(decodeURIComponent(slug), null);

  if (!article) {
    notFound();
  }

  // Fetch related articles
  const allArticles = await getAllArticles(null);
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3)
    .map(a => ({
      ...a,
      featured_image: a._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null
    }));

  return <ArticleDetailClient article={article} relatedArticles={relatedArticles} />;
}
