import { getArticleById, getAllArticles } from "@/lib/api";
import { notFound } from "next/navigation";
import ArticleDetailClient from "./ArticleDetailClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assemblyofthepoor.org";

function stripHtml(text) {
  if (!text) return "";
  if (typeof text !== "string") {
    // If it's the WP title object { rendered: "..." }
    if (text.rendered) return stripHtml(text.rendered);
    return "";
  }
  return text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles(null);
    if (!articles || !Array.isArray(articles)) return [];

    return articles.map((article) => ({
      slug: article.id.toString(),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for articles:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const article = await getArticleById(slug, null);

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
    const url = `${SITE_URL}/media/articles/${article.id}`;

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
  } catch (error) {
    return { title: "Article" };
  }
}

export default async function ArticleDetail({ params }) {
  const { slug } = params;
  
  const article = await getArticleById(slug, null).catch(() => null);

  if (!article) {
    notFound();
  }

  // Fetch related articles - wrap in try/catch to prevent page 500 if this fails
  let relatedArticles = [];
  try {
    const allArticles = await getAllArticles(null);
    relatedArticles = (allArticles || [])
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
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 3);
  } catch (err) {
    console.error("Error fetching related articles:", err);
  }

  const title = stripHtml(article.title?.rendered || article.title || "");
  const description = stripHtml(article.excerpt?.rendered || article.content?.rendered || "").slice(0, 180)
    || "อ่านบทความและแถลงการณ์จากสมัชชาคนจน";
  const featuredImage = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/mobile-version-hero.jpg";
  const url = `${SITE_URL}/media/articles/${article.id}`;

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
