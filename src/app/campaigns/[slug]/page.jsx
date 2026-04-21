import {
  getCampaignBySlug,
  getAllCampaigns,
} from "@/lib/api";
import { notFound } from "next/navigation";
import CampaignDetailClient from "./CampaignDetailClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assemblyofthepoor.org";

function stripHtml(text = "") {
  return text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export async function generateStaticParams() {
  const campaigns = await getAllCampaigns();
  if (!campaigns) return [];
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    return {
      title: "Campaign Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = stripHtml(campaign.title?.rendered || campaign.title || "Campaign");
  const description = stripHtml(campaign.excerpt?.rendered || campaign.content?.rendered || "").slice(0, 180)
    || "ติดตามรายละเอียดงานของเราของสมัชชาคนจน";
  const featuredImage = campaign._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/mobile-version-hero.jpg";
  const url = `${SITE_URL}/campaigns/${campaign.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: featuredImage,
          alt: title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featuredImage],
    },
  };
}

export default async function CampaignDetail({ params }) {
  const { slug } = params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const featuredImage =
    campaign._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  const title = stripHtml(campaign.title?.rendered || campaign.title || "Campaign");
  const description = stripHtml(campaign.excerpt?.rendered || campaign.content?.rendered || "").slice(0, 180)
    || "ติดตามรายละเอียดงานของเราของสมัชชาคนจน";
  const url = `${SITE_URL}/campaigns/${campaign.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: title,
    description: description,
    image: featuredImage || "/images/mobile-version-hero.jpg",
    url: url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampaignDetailClient campaign={campaign} featuredImage={featuredImage} />
    </>
  );
}
