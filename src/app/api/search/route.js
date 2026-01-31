import { NextResponse } from "next/server";
import { searchContent } from "@/lib/api";

// Force dynamic rendering since we use request.url
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchContent(query);
    return NextResponse.json(results || []);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
