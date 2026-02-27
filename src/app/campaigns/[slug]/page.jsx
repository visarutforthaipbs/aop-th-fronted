import {
  getCampaignBySlug,
  getAllCampaigns,
} from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  const campaigns = await getAllCampaigns();

  if (!campaigns) return [];

  return campaigns.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export default async function CampaignDetail({ params }) {
  const { slug } = params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  // Fetch featured image if available
  let featuredImage = null;
  if (campaign._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    featuredImage = {
      source_url: campaign._embedded["wp:featuredmedia"][0].source_url,
    };
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Image */}
      {featuredImage && (
        <section className="relative h-[50vh] min-h-[400px] md:min-h-[500px] lg:h-[600px] w-full overflow-hidden flex items-end">
          <Image
            src={featuredImage.source_url}
            alt={campaign.title.rendered}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-brand-green-dark border border-brand-green-dark/50 text-brand-white text-sm font-bold tracking-wider">
                แคมเปญรณรงค์
              </span>
              {campaign.tags_data?.map((tag) => (
                <span key={tag.id} className="inline-block py-1.5 px-4 rounded-full bg-white/20 border border-white/30 text-brand-white text-sm font-medium tracking-wider backdrop-blur-sm">
                  {tag.name}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-white leading-tight">
              {campaign.title.rendered}
            </h1>
          </div>
        </section>
      )}

      {/* Content Section */}
      <article className="py-20 md:py-32 bg-brand-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!featuredImage && (
            <div className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block py-1.5 px-4 rounded-full bg-brand-green-dark text-brand-white text-sm font-bold tracking-wider">
                  แคมเปญรณรงค์
                </span>
                {campaign.tags_data?.map((tag) => (
                  <span key={tag.id} className="inline-block py-1.5 px-4 rounded-full bg-gray-100 border border-gray-200 text-brand-black text-sm font-medium tracking-wider">
                    {tag.name}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-black leading-tight">
                {campaign.title.rendered}
              </h1>
            </div>
          )}

          {/* ACF Fields - Campaign Details */}
          {campaign.acf && !Array.isArray(campaign.acf) && (
            <div className="bg-brand-white/20 border border-brand-white rounded-[24px] p-8 md:p-10 mb-16 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/pattern/pattern-green.svg')] opacity-5 -translate-y-1/2 translate-x-1/3"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-8 border-b border-brand-green-dark/20 pb-4 relative z-10">
                รายละเอียดการดำเนินการ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 relative z-10">
                {campaign.acf.campaign_goal && (
                  <div>
                    <h3 className="text-xs font-bold text-brand-green-dark uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-white"></span> เป้าหมาย
                    </h3>
                    <p className="text-lg text-brand-black font-medium leading-relaxed">
                      {campaign.acf.campaign_goal}
                    </p>
                  </div>
                )}
                {campaign.acf.start_date && (
                  <div>
                    <h3 className="text-xs font-bold text-brand-green-dark uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-white"></span> วันที่เริ่มต้น
                    </h3>
                    <p className="text-lg text-brand-black font-medium leading-relaxed">{campaign.acf.start_date}</p>
                  </div>
                )}
                {campaign.acf.location && (
                  <div>
                    <h3 className="text-xs font-bold text-brand-green-dark uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-white"></span> สถานที่
                    </h3>
                    <p className="text-lg text-brand-black font-medium leading-relaxed">{campaign.acf.location}</p>
                  </div>
                )}
                {campaign.acf.status && (
                  <div>
                    <h3 className="text-xs font-bold text-brand-green-dark uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-white"></span> สถานะ
                    </h3>
                    <span className="inline-block bg-gray-100 text-brand-black px-4 py-1.5 rounded-full text-sm font-bold border border-brand-white">
                      {campaign.acf.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div
            className="prose prose-lg md:prose-xl max-w-none 
                       prose-headings:text-brand-green-dark prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-12
                       prose-h1:text-4xl md:prose-h1:text-5xl 
                       prose-h2:text-3xl md:prose-h2:text-4xl 
                       prose-h3:text-2xl md:prose-h3:text-3xl 
                       prose-p:text-brand-black prose-p:leading-relaxed prose-p:mb-6
                       prose-a:text-brand-green-dark prose-a:font-semibold hover:prose-a:text-brand-green-dark transition-colors
                       prose-strong:text-brand-black prose-strong:font-bold
                       prose-ul:list-disc prose-ol:list-decimal prose-ul:mb-8 prose-ol:mb-8
                       prose-li:text-brand-black prose-li:marker:text-brand-green-dark
                       prose-img:rounded-[24px] prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: campaign.content.rendered }}
          />

          {/* Additional ACF Fields */}
          {campaign.acf && !Array.isArray(campaign.acf) && campaign.acf.additional_info && (
            <div className="mt-20 bg-brand-white border border-gray-100 rounded-[24px] p-8 md:p-12 shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 border-b border-gray-100 pb-4">
                ข้อมูลเพิ่มเติม
              </h2>
              <div
                className="prose prose-lg max-w-none prose-headings:text-brand-black prose-p:text-gray-700 prose-a:text-brand-green-dark"
                dangerouslySetInnerHTML={{
                  __html: campaign.acf.additional_info,
                }}
              />
            </div>
          )}

          {/* Back to Campaigns */}
          <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center text-center">
            <a
              href="/campaigns"
              className="inline-flex items-center justify-center bg-brand-green-dark hover:bg-brand-black text-brand-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:-translate-y-1"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              กลับไปยังหน้างานรณรงค์ทั้งหมด
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
