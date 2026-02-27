const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to get JWT token for authenticated requests
export async function getAuthToken() {
  const username = process.env.WP_USER;
  const password = process.env.WP_PASS;

  if (!username || !password) {
    console.error("WordPress credentials not set in environment variables");
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/jwt-auth/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

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
export async function fetchFromApi(endpoint, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from API:", `${API_URL}${endpoint}`, error);
    return null;
  }
}

// Fetch all campaigns
export async function getAllCampaigns() {
  const result = await fetchFromApi("/wp/v2/campaigns?per_page=100&_embed");
  return result || [];
}

// Fetch single campaign by slug
export async function getCampaignBySlug(slug) {
  const campaigns = await fetchFromApi(
    `/wp/v2/campaigns?slug=${encodeURIComponent(slug)}&_embed`
  );
  return campaigns && campaigns.length > 0 ? campaigns[0] : null;
}

// Fetch all articles (optionally filtered by category)
export async function getAllArticles(token, categoryId = null) {
  let endpoint = "/wp/v2/articles?per_page=100&_embed";
  if (categoryId) {
    endpoint += `&categories=${categoryId}`;
  }
  const result = await fetchFromApi(endpoint, token);
  return result || [];
}

// Fetch article categories (using standard WordPress categories)
export async function getArticleCategories() {
  const result = await fetchFromApi("/wp/v2/categories?per_page=100");
  return result || [];
}

// Fetch single article by slug
export async function getArticleBySlug(slug, token) {
  const articles = await fetchFromApi(
    `/wp/v2/articles?slug=${encodeURIComponent(slug)}&_embed`,
    token
  );
  return articles && articles.length > 0 ? articles[0] : null;
}

// Fetch all news posts
export async function getAllNews(page = 1, perPage = 10) {
  const result = await fetchFromApi(`/wp/v2/posts?page=${page}&per_page=${perPage}`);
  return result || [];
}

// Fetch single news post by slug
export async function getNewsBySlug(slug) {
  const posts = await fetchFromApi(
    `/wp/v2/posts?slug=${encodeURIComponent(slug)}`
  );
  return posts && posts.length > 0 ? posts[0] : null;
}

// Fetch page by slug
export async function getPageBySlug(slug) {
  const pages = await fetchFromApi(
    `/wp/v2/pages?slug=${encodeURIComponent(slug)}`
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
