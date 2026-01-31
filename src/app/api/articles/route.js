import { NextResponse } from "next/server";
import { getAllArticles, getArticleCategories } from "@/lib/api";

// Force dynamic rendering since we use request.url
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");

    // Fetch articles (optionally filtered by category)
    const articles = await getAllArticles(null, categoryId);

    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json({ articles: [], categories: [] });
    }

    const articlesWithImages = articles.map((article) => ({
      ...article,
      featured_image:
        article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
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
    return NextResponse.json({ articles: [], categories: [] }, { status: 500 });
  }
}
