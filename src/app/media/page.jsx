"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Media() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Fetch categories on initial mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch articles when filter changes
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const url = filter === "all"
          ? "/api/articles"
          : `/api/articles?category=${filter}`;

        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [filter]);

  // Get category name by ID for display
  const getCategoryName = (article) => {
    const categoryInfo = article.categories_info?.[0];
    return categoryInfo?.name || "บทความ";
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
              MEDIA CENTER
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              ห้องสื่อสมัชชาคนจน
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              คลังความรู้ เอกสาร บทความ ภาพถ่าย วิดีโอ และสื่อต่างๆ
              ที่บันทึกการต่อสู้ของเรา
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-24 z-40 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {/* "All" button */}
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${filter === "all"
                ? "bg-brand-green-dark text-brand-white shadow-md transform scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-brand-white hover:text-brand-green-dark"
                }`}
            >
              ทั้งหมด
            </button>

            {/* Dynamic category buttons */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id.toString())}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${filter === category.id.toString()
                  ? "bg-brand-green-dark text-brand-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-brand-white hover:text-brand-green-dark"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-brand-green-dark"></div>
              <p className="mt-6 text-gray-500 font-medium">
                กำลังโหลดข้อมูล...
              </p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((item) => (
                <Link
                  key={item.id}
                  href={`/media/articles/${item.slug}`} // Assuming all items link to article detail for now
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                    {item.featured_image ? (
                      <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <Image
                          src={item.featured_image}
                          alt={
                            item.title?.rendered?.replace(/<[^>]+>/g, "") ||
                            item.title
                          }
                          width={400}
                          height={224}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-brand-white/30 flex items-center justify-center text-brand-green-dark/30">
                        <svg
                          className="w-16 h-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                    )}

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center mb-3 space-x-2">
                        {item.date && (
                          <span className="text-xs font-semibold text-brand-green-dark bg-brand-white/20 px-2 py-1 rounded-full">
                            {new Date(item.date).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                        {/* Category badge */}
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {getCategoryName(item)}
                        </span>
                      </div>

                      <h3
                        className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors leading-tight line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: item.title?.rendered || item.title,
                        }}
                      />

                      <div
                        className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed text-sm"
                        dangerouslySetInnerHTML={{
                          __html: (item.excerpt?.rendered || item.excerpt || "").replace(/<[^>]+>/g, ""),
                        }}
                      />

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
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
                ไม่พบข้อมูลในหมวดหมู่นี้
              </h3>
              <p className="text-gray-500">
                ยังไม่มีข้อมูลในหมวดหมู่ที่เลือก หรือกำลังอยู่ในระหว่างการปรับปรุง
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
