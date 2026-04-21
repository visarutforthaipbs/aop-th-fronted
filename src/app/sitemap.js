import { getAllCampaigns, getAllArticles } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assemblyofthepoor.org";

export default async function sitemap() {
  const [campaigns, articles] = await Promise.all([
    getAllCampaigns(),
    getAllArticles(null, null, 100),
  ]);

  const staticRoutes = ["", "/about", "/campaigns", "/media", "/contact", "/get-involved", "/search"].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      priority: route === "" ? 1 : 0.8,
    })
  );

  const articleRoutes = (articles || []).map((article) => ({
    url: `${SITE_URL}/media/articles/${article.slug}`,
    lastModified: new Date(article.modified || article.date || Date.now()),
    priority: 0.6,
  }));

  const campaignRoutes = (campaigns || []).map((campaign) => ({
    url: `${SITE_URL}/campaigns/${campaign.slug}`,
    lastModified: new Date(campaign.modified || campaign.date || Date.now()),
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...campaignRoutes];
}
