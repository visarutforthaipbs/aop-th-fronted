import { getArticleBySlug, getAllArticles } from "@/lib/api";
import { notFound } from "next/navigation";
import ArticleDetailClient from "./ArticleDetailClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assemblyofthepoor.org";

function stripHtml(text = "") {
  return text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export async function generateStaticParams() {
  const articles = await getAllArticles(null);

  if (!articles) return [];

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  let decodedSlug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    notFound();
  }

  const article = await getArticleBySlug(decodedSlug, null);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = stripHtml(article.title?.rendered || article.title || "Article");
  const description = stripHtml(article.excerpt?.rendered || article.content?.rendered || "").slice(0, 180)
    || "อ่านบทความและแถลงการณ์จากสมัชชาคนจน";
  const featuredImage = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/mobile-version-hero.jpg";
  const url = `${SITE_URL}/media/articles/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: featuredImage,
          alt: title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featuredImage],
    },
  };
}

export default async function ArticleDetail({ params }) {
  const { slug } = params;
  let decodedSlug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    notFound();
  }

  const article = await getArticleBySlug(decodedSlug, null);

  if (!article) {
    notFound();
  }

  // Fetch related articles sorted by shared categories first, then recency
  const allArticles = await getAllArticles(null);
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .map((a) => ({
      ...a,
      featured_image: a._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      relevance: (a.categories || []).filter((cat) =>
        (article.categories || []).includes(cat)
      ).length,
    }))
    .sort((a, b) => {
      if (b.relevance !== a.relevance) return b.relevance - a.relevance;
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 3);

  const title = stripHtml(article.title?.rendered || article.title || "");
  const description = stripHtml(article.excerpt?.rendered || article.content?.rendered || "").slice(0, 180)
    || "อ่านบทความและแถลงการณ์จากสมัชชาคนจน";
  const featuredImage = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/mobile-version-hero.jpg";
  const url = `${SITE_URL}/media/articles/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    image: featuredImage,
    datePublished: article.date,
    dateModified: article.modified || article.date,
    author: {
      "@type": "Organization",
      name: "สมัชชาคนจน",
    },
    publisher: {
      "@type": "Organization",
      name: "สมัชชาคนจน",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/favicon-white.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
