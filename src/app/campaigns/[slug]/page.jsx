import {
  getCampaignBySlug,
  getAllCampaigns,
} from "@/lib/api";
import { notFound } from "next/navigation";
import CampaignDetailClient from "./CampaignDetailClient";

export async function generateStaticParams() {
  const campaigns = await getAllCampaigns();
  if (!campaigns) return [];
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export default async function CampaignDetail({ params }) {
  const { slug } = params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const featuredImage =
    campaign._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <CampaignDetailClient campaign={campaign} featuredImage={featuredImage} />
  );
}
