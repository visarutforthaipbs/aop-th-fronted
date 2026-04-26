"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { getTitle, getExcerpt } from "@/lib/acf";
import { stripHtml } from "@/lib/utils";
import SkeletonCard from "@/components/SkeletonCard";
import SafeHtml from "@/components/SafeHtml";

const ITEMS_PER_PAGE = 9;

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { lang, t } = useTranslation();

  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/campaigns");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(t.campaigns.loading);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, [t.campaigns.loading]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Generate unique tags from all campaigns dynamically
  const uniqueTagsMap = new Map();
  campaigns.forEach(c => {
    if (c.tags_data) {
      c.tags_data.forEach(tag => {
        uniqueTagsMap.set(tag.id, { id: tag.id.toString(), name: tag.name, slug: tag.slug });
      });
    }
  });

  const themes = [
    { id: "all", name: t.campaigns.all },
    ...Array.from(uniqueTagsMap.values())
  ];

  const filteredCampaigns =
    filter === "all"
      ? campaigns
      : campaigns.filter((c) => {
        return c.tags_data && c.tags_data.some(tag => tag.id.toString() === filter);
      });

  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getCampaignTags = (campaign) => {
    return (campaign.tags_data || []).map((tag) => tag.name);
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
              {t.campaigns.badge}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t.campaigns.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              {t.campaigns.hero.subtitle}
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
                aria-pressed={filter === theme.id}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${filter === theme.id
                  ? "bg-brand-green-dark text-brand-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-brand-white hover:text-brand-green-dark"
                  }`}
              >
                {t.campaigns.tagMap?.[theme.name] || theme.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-24 bg-red-50 rounded-3xl border border-red-100">
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-brand-green-dark font-bold underline"
              >
                {t.common.loading}
              </button>
            </div>
          ) : paginatedCampaigns.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedCampaigns.map((campaign) => {
                  const plainTitle = stripHtml(getTitle(campaign, lang));
                  return (
                    <Link
                      key={campaign.id}
                      href={`/campaigns/${campaign.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                        {campaign._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                          <div className="h-56 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <Image
                              src={campaign._embedded["wp:featuredmedia"][0].source_url}
                              alt={plainTitle}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="h-56 bg-brand-white/30 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                          </div>
                        )}
                        <div className="p-8 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors leading-tight">
                            {plainTitle}
                          </h3>
                          <SafeHtml
                            html={getExcerpt(campaign, lang) || (campaign.content?.rendered || "").replace(/<[^>]+>/g, "").slice(0, 160) + "…"}
                            className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed text-sm"
                          />
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            {getCampaignTags(campaign).length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {campaign.tags_data?.slice(0, 2).map((tag) => (
                                  <span
                                    key={tag.id}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setFilter(tag.id.toString());
                                    }}
                                    className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${filter === tag.id.toString()
                                      ? "bg-brand-green-dark text-white"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                      }`}
                                  >
                                    {t.campaigns.tagMap?.[tag.name] || tag.name}
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
                              {t.campaigns.readMore}{" "}
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
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex justify-center gap-2 mt-12" aria-label="Pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="px-4 py-2 rounded-full bg-white border border-gray-200 text-brand-black font-bold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full font-bold transition-colors ${
                        currentPage === i + 1
                          ? "bg-brand-green-dark text-white"
                          : "bg-white border border-gray-200 text-brand-black hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="px-4 py-2 rounded-full bg-white border border-gray-200 text-brand-black font-bold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    →
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t.campaigns.empty.title}
              </h3>
              <p className="text-gray-500">
                {t.campaigns.empty.subtitle}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-green-dark/20 via-transparent to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold ${t.campaigns.cta.body ? 'mb-6' : 'mb-10'}`}>
            {t.campaigns.cta.heading}
          </h2>
          {t.campaigns.cta.body && (
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              {t.campaigns.cta.body}
            </p>
          )}
          <Link
            href="/get-involved"
            className="inline-block bg-brand-white hover:bg-white text-brand-black font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-white/50 hover:-translate-y-1 text-lg"
          >
            {t.campaigns.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
