"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTitle, getExcerpt } from "@/lib/acf";
import th from "@/locales/th";
import en from "@/locales/en";

// Helper function to extract first image from HTML content
function extractFirstImage(htmlContent) {
  if (!htmlContent) return null;
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)['"]/i);
  return imgMatch ? imgMatch[1] : null;
}

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const t = lang === "en" ? en : th;

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch("/api/news");
        const data = await response.json();

        const processedPosts = (data.posts || []).map((post) => ({
          ...post,
          featured_image:
            post.featured_image || extractFirstImage(post.content?.rendered),
        }));

        setPosts(processedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white border border-white/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
              NEWS &amp; UPDATES
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {lang === "en" ? (
                <>News &amp; Updates</>
              ) : (
                <>ข่าวสาร<br />และความเคลื่อนไหว</>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              {lang === "en"
                ? "Follow the latest news, statements, and activities of the Assembly of the Poor"
                : "ติดตามข่าวสาร แถลงการณ์ และกิจกรรมล่าสุดของสมัชชาคนจน เพื่อไม่พลาดทุกการเคลื่อนไหว"}
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-brand-green-dark"></div>
              <p className="mt-6 text-gray-500 font-medium">
                {t.common.loading}
              </p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                    {post.featured_image ? (
                      <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <Image
                          src={post.featured_image}
                          alt={getTitle(post, lang).replace(/<[^>]+>/g, "")}
                          width={400}
                          height={224}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-gray-100/30 flex items-center justify-center text-brand-green-dark/30">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center mb-3">
                        {post.date && (
                          <span className="text-xs font-semibold text-brand-green-dark bg-gray-100/20 px-2 py-1 rounded-full">
                            {new Date(post.date).toLocaleDateString(
                              lang === "en" ? "en-US" : "th-TH",
                              { year: "numeric", month: "short", day: "numeric" }
                            )}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors leading-tight line-clamp-2"
                        style={{ lineHeight: "1.3" }}
                      >
                        {getTitle(post, lang)}
                      </h3>

                      <p className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed text-sm">
                        {getExcerpt(post, lang)}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <span className="text-brand-green-dark font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                          {t.news.readMore}{" "}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
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
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {lang === "en" ? "No news available yet" : "ยังไม่มีข่าวสารในขณะนี้"}
              </h3>
              <p className="text-gray-500">
                {lang === "en" ? "Please check back soon for updates." : "โปรดติดตามการอัพเดทในเร็วๆ นี้"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
