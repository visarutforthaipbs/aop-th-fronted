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
    throw new Error("NEXT_PUBLIC_API_URL is not configured. Cannot fetch from API.");
  }

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
    const error = new Error(`API request failed: ${response.statusText} (${response.status}) at ${endpoint}`);
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
  try {
    const result = await fetchFromApi(
      "/wp/v2/campaigns?per_page=100&_embed",
      null,
      { tags: ["campaigns"] }
    );
    if (!result || !Array.isArray(result)) return [];
    return result.map(extractTags);
  } catch (err) {
    console.error("Error in getAllCampaigns:", err);
    return [];
  }
}

// Fetch single campaign by ID
export const getCampaignById = cache(async (id) => {
  try {
    const campaign = await fetchFromApi(
      `/wp/v2/campaigns/${id}?_embed`,
      null,
      { tags: ["campaigns"] }
    );
    return campaign ? extractTags(campaign) : null;
  } catch (error) {
    console.error(`Error fetching campaign ${id}:`, error);
    return null;
  }
});

// Fetch all articles (optionally filtered by category)
export async function getAllArticles(token, categoryId = null, perPage = 100) {
  try {
    let endpoint = `/wp/v2/articles?per_page=${perPage}&_embed`;
    if (categoryId) {
      endpoint += `&categories=${categoryId}`;
    }
    const result = await fetchFromApi(endpoint, token, { tags: ["articles"] });
    return result || [];
  } catch (err) {
    console.error("Error in getAllArticles:", err);
    return [];
  }
}

// Fetch article categories (using standard WordPress categories)
export async function getArticleCategories() {
  try {
    const result = await fetchFromApi(
      "/wp/v2/categories?per_page=100",
      null,
      { tags: ["categories", "articles"] }
    );
    return result || [];
  } catch (err) {
    console.error("Error in getArticleCategories:", err);
    return [];
  }
}

// Fetch articles by category slug
export async function getArticlesByCategorySlug(categorySlug, perPage = 6) {
  try {
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
  } catch (err) {
    console.error("Error in getArticlesByCategorySlug:", err);
    return [];
  }
}

// Fetch single article by ID
export const getArticleById = cache(async (id, token) => {
  try {
    const article = await fetchFromApi(
      `/wp/v2/articles/${id}?_embed`,
      token,
      { tags: ["articles"] }
    );
    return article || null;
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    return null;
  }
});

// Fetch all news posts
export async function getAllNews(page = 1, perPage = 10) {
  try {
    const result = await fetchFromApi(
      `/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`,
      null,
      { tags: ["posts"] }
    );

    if (!result || !Array.isArray(result)) return [];

    // Transform to include featured_image at root
    return result.map(post => ({
      ...post,
      featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
    }));
  } catch (err) {
    console.error("Error in getAllNews:", err);
    return [];
  }
}

// Fetch featured media by ID
export async function getMediaById(id) {
  try {
    return await fetchFromApi(`/wp/v2/media/${id}`);
  } catch (err) {
    console.error(`Error in getMediaById ${id}:`, err);
    return null;
  }
}

// Search across all content
export async function searchContent(query, page = 1) {
  try {
    const result = await fetchFromApi(
      `/wp/v2/search?search=${encodeURIComponent(query)}&page=${page}`
    );
    return result || [];
  } catch (err) {
    console.error("Error in searchContent:", err);
    return [];
  }
}
