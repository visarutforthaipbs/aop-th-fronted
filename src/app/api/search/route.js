import { NextResponse } from "next/server";
import { fetchFromApi, searchContent } from "@/lib/api";

export const dynamic = "force-dynamic";

const MAX_QUERY_LENGTH = 100;

function decodeEntities(text = "") {
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&hellip;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(html = "") {
  return decodeEntities(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
}

function getContentEndpoint(result) {
  switch (result?.subtype) {
    case "campaign":
    case "campaigns":
      return `/wp/v2/campaigns/${result.id}?_embed`;
    case "article":
    case "articles":
      return `/wp/v2/articles/${result.id}?_embed`;
    case "post":
      return `/wp/v2/posts/${result.id}?_embed`;
    case "page":
      return `/wp/v2/pages/${result.id}?_embed`;
    default:
      return null;
  }
}

async function enrichResult(result) {
  const endpoint = getContentEndpoint(result);
  if (!endpoint) {
    return {
      ...result,
      title: decodeEntities(result?.title || ""),
      excerpt: stripHtml(result?.excerpt || ""),
      featured_image: null,
    };
  }

  const detail = await fetchFromApi(endpoint);
  const excerptText = stripHtml(detail?.excerpt?.rendered || result?.excerpt || "");
  const contentText = stripHtml(detail?.content?.rendered || "");
  const featuredImage = detail?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return {
    ...result,
    title: decodeEntities(detail?.title?.rendered || result?.title || ""),
    excerpt: excerptText || contentText.slice(0, 180),
    featured_image: featuredImage,
  };
}

function extractSlug(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  } catch {
    const cleaned = url.split("?")[0].replace(/\/+$/, "");
    const segments = cleaned.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  }
}

function toFrontendUrl(result) {
  const slug = extractSlug(result?.url);
  if (!slug) return result?.url || "#";

  switch (result?.subtype) {
    case "campaign":
    case "campaigns":
      return `/campaigns/${slug}`;
    case "article":
    case "articles":
      return `/media/articles/${slug}`;
    case "post":
      return `/news/${slug}`;
    case "page":
      return slug === "home" ? "/" : `/${slug}`;
    default:
      return result?.url || "#";
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json([]);
  }

  if (query.length > MAX_QUERY_LENGTH || /[<>]/.test(query)) {
    return NextResponse.json(
      { error: "Invalid query" },
      { status: 400 }
    );
  }

  try {
    const results = await searchContent(query);
    const normalizedResults = await Promise.all(
      (results || []).map(async (result) => {
        const enriched = await enrichResult(result);
        return {
          ...enriched,
          url: toFrontendUrl(result),
        };
      })
    );

    return NextResponse.json(normalizedResults);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
