import { NextResponse } from "next/server";
import { getAllArticles, getArticleCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

// Extract first image from HTML content as thumbnail fallback
function extractFirstImage(htmlContent) {
  if (!htmlContent) return null;
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : null;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");

    if (categoryId && !/^\d+$/.test(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category", articles: [], categories: [] },
        { status: 400 }
      );
    }

    // Fetch articles (optionally filtered by category)
    const articles = await getAllArticles(null, categoryId);

    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json({ articles: [], categories: [] });
    }

    const articlesWithImages = articles.map((article) => ({
      ...article,
      featured_image:
        article._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        || extractFirstImage(article.content?.rendered)
        || null,
      // Extract category info from embedded data
      categories_info: article._embedded?.["wp:term"]?.[0] || [],
    }));

    // Fetch all categories for the filter
    const categories = await getArticleCategories();

    return NextResponse.json({
      articles: articlesWithImages || [],
      categories: categories || [],
    });
  } catch (error) {
    console.error("Error in articles API:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles", articles: [], categories: [] },
      { status: 500 }
    );
  }
}
