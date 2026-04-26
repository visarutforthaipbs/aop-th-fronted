import { cache } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
if (!API_URL) {
  console.error("NEXT_PUBLIC_API_URL is not configured");
}

function buildUrl(endpoint) {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_URL}${cleanEndpoint}`;
}

// Function to get JWT token for authenticated requests
export async function getAuthToken() {
  const username = process.env.WP_USER;
  const password = process.env.WP_PASS;

  if (!username || !password) {
    console.error("WordPress credentials not set in environment variables");
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(buildUrl("/jwt-auth/v1/token"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error(
        `Authentication failed. Status: ${response.status} ${response.statusText}`
      );
      const errorBody = await response.text();
      console.error(`Response body: ${errorBody}`);
      throw new Error("Failed to authenticate");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

// Generic function to fetch from WordPress API
export async function fetchFromApi(endpoint, token = null, options = {}) {
  const { tags = [], revalidate = 60 } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(endpoint), {
    headers,
    next: { revalidate, tags },
  });

  if (!response.ok) {
    const error = new Error(`API request failed: ${response.statusText}`);
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

// Helper to extract tags from campaign
const extractTags = (campaign) => {
  let tags_data = [];
  if (campaign._embedded && campaign._embedded['wp:term']) {
    const allTerms = campaign._embedded['wp:term'].flat();
    tags_data = allTerms
      .filter(t => t.taxonomy === 'post_tag')
      .map(t => ({ id: t.id, name: t.name, slug: t.slug }));
  }
  return { ...campaign, tags_data };
};

// Fetch all campaigns
export async function getAllCampaigns() {
  const result = await fetchFromApi(
    "/wp/v2/campaigns?per_page=100&_embed",
    null,
    { tags: ["campaigns"] }
  );
  if (!result) return [];
  return result.map(extractTags);
}

// Fetch single campaign by slug
export const getCampaignBySlug = cache(async (slug) => {
  const campaigns = await fetchFromApi(
    `/wp/v2/campaigns?slug=${encodeURIComponent(slug)}&_embed`,
    null,
    { tags: ["campaigns"] }
  );
  return campaigns && campaigns.length > 0 ? extractTags(campaigns[0]) : null;
});

// Fetch all articles (optionally filtered by category)
export async function getAllArticles(token, categoryId = null, perPage = 100) {
  let endpoint = `/wp/v2/articles?per_page=${perPage}&_embed`;
  if (categoryId) {
    endpoint += `&categories=${categoryId}`;
  }
  const result = await fetchFromApi(endpoint, token, { tags: ["articles"] });
  return result || [];
}

// Fetch article categories (using standard WordPress categories)
export async function getArticleCategories() {
  const result = await fetchFromApi(
    "/wp/v2/categories?per_page=100",
    null,
    { tags: ["categories", "articles"] }
  );
  return result || [];
}

// Fetch articles by category slug
export async function getArticlesByCategorySlug(categorySlug, perPage = 6) {
  // First resolve slug to category ID
  const categories = await fetchFromApi(
    `/wp/v2/categories?slug=${encodeURIComponent(categorySlug)}`,
    null,
    { tags: ["categories"] }
  );
  if (!categories || categories.length === 0) return [];
  const categoryId = categories[0].id;
  const result = await fetchFromApi(
    `/wp/v2/articles?categories=${categoryId}&per_page=${perPage}&_embed`,
    null,
    { tags: ["articles"] }
  );
  return result || [];
}

// Fetch single article by slug
export const getArticleBySlug = cache(async (slug, token) => {
  const articles = await fetchFromApi(
    `/wp/v2/articles?slug=${encodeURIComponent(slug)}&_embed`,
    token,
    { tags: ["articles"] }
  );
  return articles && articles.length > 0 ? articles[0] : null;
});

// Fetch all news posts
export async function getAllNews(page = 1, perPage = 10) {
  const result = await fetchFromApi(
    `/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`,
    null,
    { tags: ["posts"] }
  );

  if (!result) return [];

  // Transform to include featured_image at root
  return result.map(post => ({
    ...post,
    featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  }));
}

// Fetch single news post by slug
export async function getNewsBySlug(slug) {
  const posts = await fetchFromApi(
    `/wp/v2/posts?slug=${encodeURIComponent(slug)}`,
    null,
    { tags: ["posts"] }
  );
  return posts && posts.length > 0 ? posts[0] : null;
}

// Fetch page by slug
export async function getPageBySlug(slug) {
  const pages = await fetchFromApi(
    `/wp/v2/pages?slug=${encodeURIComponent(slug)}`,
    null,
    { tags: ["pages"] }
  );
  return pages && pages.length > 0 ? pages[0] : null;
}

// Fetch media items
export async function getAllMedia(token, page = 1, perPage = 20) {
  const result = await fetchFromApi(`/wp/v2/media?page=${page}&per_page=${perPage}`, token);
  return result || [];
}

// Fetch featured media by ID
export async function getMediaById(id) {
  return fetchFromApi(`/wp/v2/media/${id}`);
}

// Search across all content
export async function searchContent(query, page = 1) {
  const result = await fetchFromApi(
    `/wp/v2/search?search=${encodeURIComponent(query)}&page=${page}`
  );
  return result || [];
}
