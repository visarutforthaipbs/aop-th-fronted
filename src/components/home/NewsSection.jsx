"use client";

import Link from "next/link";
import Image from "next/image";
import { StaggerContainer, StaggerItem, SlideUpFadeIn } from "@/components/animations/ScrollAnim";
import { useLanguage } from "@/context/LanguageContext";
import th from "@/locales/th";
import en from "@/locales/en";
import { getTitle, getExcerpt } from "@/lib/acf";

// Helper function to extract first image from HTML content
function extractFirstImage(htmlContent) {
    if (!htmlContent) return null;
    const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    return imgMatch ? imgMatch[1] : null;
}

export default function NewsSection({ latestNews }) {
    const { lang } = useLanguage();
    const t = lang === "en" ? en : th;

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SlideUpFadeIn className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-brand-black mb-2">
                            {t.homeNews.heading}
                        </h2>
                        <p className="text-gray-500">{t.homeNews.subtitle}</p>
                    </div>
                    <Link
                        href="/media"
                        className="hidden md:inline-flex items-center text-brand-green-dark font-bold hover:text-brand-black transition-colors"
                    >
                        {t.homeNews.viewAll} <span className="ml-2">→</span>
                    </Link>
                </SlideUpFadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestNews.length > 0 ? (
                        latestNews.map((item) => {
                            const featuredImage = item.featured_image || extractFirstImage(item.content?.rendered) || '/hero-section-image.jpg';

                            return (
                                <StaggerItem
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group"
                                >
                                    {/* Thumbnail Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={featuredImage}
                                            alt={item.title?.rendered || "News thumbnail"}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="text-sm text-gray-400 mb-4 font-medium">
                                            {item.date
                                                ? new Date(item.date).toLocaleDateString(lang === "en" ? "en-US" : "th-TH", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : ""}
                                        </div>
                                        <h3 className="text-xl font-bold mb-4 text-brand-black group-hover:text-brand-green-dark transition-colors line-clamp-2">
                                            {getTitle(item, lang)}
                                        </h3>
                                        <div
                                            className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed text-sm"
                                        >
                                            {getExcerpt(item, lang)}
                                        </div>
                                        <Link
                                            href={`/media/articles/${item.slug}`}
                                            className="inline-flex items-center text-brand-green-dark font-bold hover:text-brand-black transition-colors mt-auto"
                                        >
                                            {t.homeNews.readMore}{" "}
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
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                ></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </StaggerItem>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500">{t.homeNews.loading}</p>
                        </div>
                    )}
                </StaggerContainer>
                <SlideUpFadeIn className="text-center mt-12 md:hidden">
                    <Link
                        href="/media"
                        className="inline-block bg-brand-green-dark hover:bg-brand-black text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        {t.homeNews.viewAllMobile}
                    </Link>
                </SlideUpFadeIn>
            </div>
        </section>
    );
}
