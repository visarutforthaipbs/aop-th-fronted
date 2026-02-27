"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch("/api/campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  const themes = [
    { id: "all", name: "ทั้งหมด" },
    { id: "land", name: "ที่ดิน" },
    { id: "dam", name: "เขื่อน" },
    { id: "forest", name: "ป่าชุมชน" },
    { id: "food", name: "อาหาร" },
    { id: "rights", name: "สิทธิ" },
  ];

  const filteredCampaigns =
    filter === "all"
      ? campaigns
      : campaigns.filter((c) => {
        const theme = themes.find((t) => t.id === filter);
        const keyword = theme ? theme.name : filter;
        const title = c.title?.rendered || c.title || "";
        const content = c.content?.rendered || c.content || "";
        return title.includes(keyword) || content.includes(keyword);
      });

  const getCampaignTags = (campaign) => {
    const title = campaign.title?.rendered || campaign.title || "";
    const content = campaign.content?.rendered || campaign.content || "";
    return themes
      .filter((t) => t.id !== "all" && (title.includes(t.name) || content.includes(t.name)))
      .map((t) => t.name);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-white/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-white border border-brand-white/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
              การเคลื่อนไหว
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              งานรณรงค์
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              รวมพลังขับเคลื่อนสังคม
              ติดตามประเด็นปัญหาและการต่อสู้เพื่อความยุติธรรม
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setFilter(theme.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${filter === theme.id
                  ? "bg-brand-green-dark text-brand-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-brand-white hover:text-brand-green-dark"
                  }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-brand-green-dark"></div>
              <p className="mt-6 text-gray-500 font-medium">
                กำลังโหลดข้อมูล...
              </p>
            </div>
          ) : filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <Link
                  key={campaign.id}
                  href={`/campaigns/${campaign.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                    {campaign._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                      <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img
                          src={campaign._embedded["wp:featuredmedia"][0].source_url}
                          alt={campaign.title?.rendered || campaign.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-brand-white/30 flex items-center justify-center">
                        <span className="text-4xl">📢</span>
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors leading-tight">
                        {campaign.title?.rendered || campaign.title}
                      </h3>
                      <div
                        className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html:
                            campaign.excerpt?.rendered || campaign.excerpt || campaign.content?.rendered || campaign.content || "",
                        }}
                      />
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        {getCampaignTags(campaign).length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {getCampaignTags(campaign).slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {getCampaignTags(campaign).length > 2 && (
                              <span className="px-2 py-1 text-gray-400 text-xs">
                                +{getCampaignTags(campaign).length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <span className="text-brand-green-dark font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                          อ่านต่อ{" "}
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ไม่พบข้อมูล
              </h3>
              <p className="text-gray-500">
                ไม่พบงานรณรงค์ในหมวดหมู่นี้ ลองเลือกหมวดหมู่ใหม่
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-green-dark/20 via-transparent to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ร่วมเป็นส่วนหนึ่งของการเปลี่ยนแปลง
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            พลังของคุณสำคัญต่อการต่อสู้เพื่อความยุติธรรม
            ไม่ว่าจะด้วยการลงชื่อสนับสนุน การบริจาค หรือการเป็นอาสาสมัคร
          </p>
          <Link
            href="/get-involved"
            className="inline-block bg-brand-white hover:bg-white text-brand-black font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-white/50 hover:-translate-y-1 text-lg"
          >
            ร่วมสนับสนุนเรา
          </Link>
        </div>
      </section>
    </div>
  );
}
