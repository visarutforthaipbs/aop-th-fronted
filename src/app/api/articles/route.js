import { NextResponse } from "next/server";
import { getAllArticles, getAuthToken } from "@/lib/api";

export async function GET() {
  try {
    const token = await getAuthToken();
    const articles = await getAllArticles(token);

    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json([]);
    }

    const articlesWithImages = articles.map((article) => ({
      ...article,
      featured_image:
        article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    }));

    return NextResponse.json(articlesWithImages || []);
  } catch (error) {
    console.error("Error in articles API:", error);
    return NextResponse.json([], { status: 500 });
  }
}
