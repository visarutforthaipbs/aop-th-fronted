import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Force dynamic rendering since we use request.url
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "20";

  try {
    // Build the endpoint URL
    let endpoint = `${API_URL}/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`;

    if (category && category !== "all") {
      endpoint += `&categories=${category}`;
    }

    // Fetch posts
    const postsResponse = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!postsResponse.ok) {
      throw new Error(`Failed to fetch posts: ${postsResponse.statusText}`);
    }

    const posts = await postsResponse.json();

    // Transform posts to include featured image
    const transformedPosts = posts.map((post) => ({
      ...post,
      featured_image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      categories_info: post._embedded?.["wp:term"]?.[0] || [],
    }));

    // Fetch categories
    const categoriesResponse = await fetch(
      `${API_URL}/wp/v2/categories?per_page=100`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    let categories = [];
    if (categoriesResponse.ok) {
      categories = await categoriesResponse.json();
    }

    return NextResponse.json({
      posts: transformedPosts,
      categories: categories,
    });
  } catch (error) {
    console.error("Error in news API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch news", posts: [], categories: [] },
      { status: 500 }
    );
  }
}
