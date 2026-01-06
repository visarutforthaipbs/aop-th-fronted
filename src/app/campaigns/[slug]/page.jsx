import {
  getCampaignBySlug,
  getAllCampaigns,
  getAuthToken,
  getMediaById,
} from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const token = await getAuthToken();
  const campaigns = await getAllCampaigns(token);

  if (!campaigns) return [];

  return campaigns.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export default async function CampaignDetail({ params }) {
  const { slug } = params;
  const token = await getAuthToken();
  const campaign = await getCampaignBySlug(slug, token);

  if (!campaign) {
    notFound();
  }

  // Fetch featured image if available
  let featuredImage = null;
  if (campaign.featured_media) {
    featuredImage = await getMediaById(campaign.featured_media);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Image */}
      {featuredImage && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={featuredImage.source_url}
            alt={campaign.title.rendered}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-white mb-4">
                {campaign.title.rendered}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!featuredImage && (
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-8">
              {campaign.title.rendered}
            </h1>
          )}

          {/* ACF Fields - Campaign Details */}
          {campaign.acf && (
            <div className="bg-brand-green-light rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-brand-green-dark mb-4">
                รายละเอียดแคมเปญ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaign.acf.campaign_goal && (
                  <div>
                    <h3 className="font-semibold text-brand-black mb-2">
                      เป้าหมาย:
                    </h3>
                    <p className="text-gray-700">
                      {campaign.acf.campaign_goal}
                    </p>
                  </div>
                )}
                {campaign.acf.start_date && (
                  <div>
                    <h3 className="font-semibold text-brand-black mb-2">
                      วันที่เริ่มต้น:
                    </h3>
                    <p className="text-gray-700">{campaign.acf.start_date}</p>
                  </div>
                )}
                {campaign.acf.location && (
                  <div>
                    <h3 className="font-semibold text-brand-black mb-2">
                      สถานที่:
                    </h3>
                    <p className="text-gray-700">{campaign.acf.location}</p>
                  </div>
                )}
                {campaign.acf.status && (
                  <div>
                    <h3 className="font-semibold text-brand-black mb-2">
                      สถานะ:
                    </h3>
                    <p className="text-gray-700">{campaign.acf.status}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: campaign.content.rendered }}
          />

          {/* Additional ACF Fields */}
          {campaign.acf && campaign.acf.additional_info && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-brand-green-dark mb-4">
                ข้อมูลเพิ่มเติม
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: campaign.acf.additional_info,
                }}
              />
            </div>
          )}

          {/* Back to Campaigns */}
          <div className="mt-12 pt-8 border-t">
            <a
              href="/campaigns"
              className="inline-flex items-center text-brand-green-dark hover:text-brand-red font-semibold transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              กลับไปยังงานรณรงค์ทั้งหมด
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
