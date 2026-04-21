import { getAllCampaigns, getAllArticles, getArticlesByCategorySlug } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import InFocusSection from "@/components/home/InFocusSection";
import NewsSection from "@/components/home/NewsSection";
import QuickLinksSection from "@/components/home/QuickLinksSection";
import TimelineSection from "@/components/home/TimelineSection";

export default async function Home() {
  // Fetch data with error handling
  let featuredCampaign = null;
  let latestNews = [];
  let inFocusArticles = [];

  try {
    const campaigns = await getAllCampaigns();
    featuredCampaign = campaigns && campaigns.length > 0 ? campaigns[0] : null;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
  }

  try {
    const articles = await getAllArticles(null, null, 6);
    latestNews = (articles || []).map(article => ({
      ...article,
      featured_image: article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  try {
    const focusArticles = await getArticlesByCategorySlug("infocus", 6);
    inFocusArticles = (focusArticles || []).map(article => ({
      ...article,
      featured_image: article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error("Error fetching in-focus articles:", error);
  }

  return (
    <div className="min-h-screen">
      <HeroSection featuredCampaign={featuredCampaign} />
      <InFocusSection articles={inFocusArticles} />
      <NewsSection latestNews={latestNews} />
      <TimelineSection />
      <QuickLinksSection />
    </div>
  );
}
