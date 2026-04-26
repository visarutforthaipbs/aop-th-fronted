import { cache } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

function buildUrl(endpoint) {
  if (!API_URL) return endpoint;
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_URL}${cleanEndpoint}`;
}

// Generic function to fetch from WordPress API
export async function fetchFromApi(endpoint, token = null, options = {}) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const { tags = [], revalidate = 60 } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(buildUrl(endpoint), {
      headers,
      next: { revalidate, tags },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch failed for ${endpoint}:`, error);
    return null;
  }
}

// Helper to extract tags from campaign
const extractTags = (campaign) => {
  if (!campaign) return null;
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
  if (!result || !Array.isArray(result)) return [];
  return result.map(extractTags);
}

// Fetch single campaign by ID
export const getCampaignById = cache(async (id) => {
  if (!id) return null;
  const campaign = await fetchFromApi(
    `/wp/v2/campaigns/${id}?_embed`,
    null,
    { tags: ["campaigns"] }
  );
  return campaign ? extractTags(campaign) : null;
});

// Fetch all articles (optionally filtered by category)
export async function getAllArticles(token, categoryId = null, perPage = 100) {
  let endpoint = `/wp/v2/articles?per_page=${perPage}&_embed`;
  if (categoryId) {
    endpoint += `&categories=${categoryId}`;
  }
  const result = await fetchFromApi(endpoint, token, { tags: ["articles"] });
  return Array.isArray(result) ? result : [];
}

// Fetch article categories
export async function getArticleCategories() {
  const result = await fetchFromApi(
    "/wp/v2/categories?per_page=100",
    null,
    { tags: ["categories", "articles"] }
  );
  return Array.isArray(result) ? result : [];
}

// Fetch articles by category slug
export async function getArticlesByCategorySlug(categorySlug, perPage = 6) {
  const categories = await fetchFromApi(
    `/wp/v2/categories?slug=${encodeURIComponent(categorySlug)}`,
    null,
    { tags: ["categories"] }
  );
  
  if (!categories || !categories[0]) return [];
  
  const result = await fetchFromApi(
    `/wp/v2/articles?categories=${categories[0].id}&per_page=${perPage}&_embed`,
    null,
    { tags: ["articles"] }
  );
  return Array.isArray(result) ? result : [];
}

// Fetch single article by ID
export const getArticleById = cache(async (id, token) => {
  if (!id) return null;
  const article = await fetchFromApi(
    `/wp/v2/articles/${id}?_embed`,
    token,
    { tags: ["articles"] }
  );
  return article || null;
});

// Fetch all news posts
export async function getAllNews(page = 1, perPage = 10) {
  const result = await fetchFromApi(
    `/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`,
    null,
    { tags: ["posts"] }
  );

  if (!result || !Array.isArray(result)) return [];

  return result.map(post => ({
    ...post,
    featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  }));
}

// Fetch featured media by ID
export async function getMediaById(id) {
  if (!id) return null;
  return fetchFromApi(`/wp/v2/media/${id}`);
}

// Search across all content
export async function searchContent(query, page = 1) {
  const result = await fetchFromApi(
    `/wp/v2/search?search=${encodeURIComponent(query)}&page=${page}`
  );
  return Array.isArray(result) ? result : [];
}
