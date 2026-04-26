"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { formatLongDate } from "@/lib/date";
import SafeHtml from "@/components/SafeHtml";
import SkeletonCard from "@/components/SkeletonCard";
import { stripHtml } from "@/lib/utils";

export default function Articles() {
  const { lang, dateLocale, t } = useTranslation();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(t.articles.loading);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [t.articles.loading]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white border border-white/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
            {t.articles.badge}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
            {t.articles.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto">
            {t.articles.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="space-y-12">
              {articles.map((article) => {
                const plainTitle = stripHtml(article.title?.rendered || article.title || "");
                return (
                  <Link
                    key={article.id}
                    href={`/media/articles/${article.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
                      <div className="md:flex items-stretch">
                        {article.featured_image ? (
                          <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                            <Image
                              src={article.featured_image}
                              alt={plainTitle}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors"></div>
                          </div>
                        ) : (
                          <div className="md:w-2/5 h-64 md:h-auto bg-gray-100/20 flex items-center justify-center text-brand-green-dark/30">
                            <svg
                              className="w-24 h-24"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
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

                        <div
                          className={`p-8 md:p-10 flex flex-col justify-center ${article.featured_image ? "md:w-3/5" : "w-full"
                            }`}
                        >
                          <div className="flex items-center mb-4">
                            {article.date && (
                              <span className="bg-gray-100/20 text-brand-green-dark text-sm font-bold px-3 py-1 rounded-full">
                                {formatLongDate(article.date, dateLocale)}
                              </span>
                            )}
                          </div>

                          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-black group-hover:text-brand-green-dark transition-colors leading-tight">
                            {plainTitle}
                          </h2>

                          <SafeHtml
                            html={article.excerpt?.rendered || article.excerpt}
                            className="text-gray-600 mb-6 line-clamp-3 font-light text-lg"
                          />

                          <span className="inline-flex items-center text-brand-green-dark font-bold group-hover:text-brand-black transition-colors mt-auto">
                            {t.articles.readFull}
                            <svg
                              className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
              <div className="mb-4 p-4 bg-gray-50 rounded-full">
                <FileText className="w-16 h-16 text-gray-400" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                {t.articles.empty.title}
              </h3>
              <p className="text-gray-500">{t.articles.empty.subtitle}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
