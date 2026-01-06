import { getAllCampaigns, getAllNews, getAuthToken } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import TimelineSection from "@/components/home/TimelineSection";
import NewsSection from "@/components/home/NewsSection";
import QuickLinksSection from "@/components/home/QuickLinksSection";

export default async function Home() {
  const token = await getAuthToken();

  // Fetch data with error handling
  let featuredCampaign = null;
  let latestNews = [];

  try {
    const campaigns = await getAllCampaigns(token);
    featuredCampaign = campaigns && campaigns.length > 0 ? campaigns[0] : null;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
  }

  try {
    const news = await getAllNews(1, 3);
    latestNews = news || [];
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div className="min-h-screen">
      <HeroSection featuredCampaign={featuredCampaign} />
      <TimelineSection />
      <NewsSection latestNews={latestNews} />
      <QuickLinksSection />
    </div>
  );
}
