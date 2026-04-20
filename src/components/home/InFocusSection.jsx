"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import { StaggerContainer, StaggerItem, SlideUpFadeIn } from "@/components/animations/ScrollAnim";
import { useLanguage } from "@/context/LanguageContext";
import th from "@/locales/th";
import en from "@/locales/en";
import { getTitle, getExcerpt } from "@/lib/acf";

function extractFirstImage(htmlContent) {
    if (!htmlContent) return null;
    const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    return imgMatch ? imgMatch[1] : null;
}

export default function InFocusSection({ articles }) {
    const { lang } = useLanguage();
    const t = lang === "en" ? en : th;

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SlideUpFadeIn className="flex justify-between items-end mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-brand-green-dark/10 text-brand-green-dark text-sm font-bold tracking-wider mb-4">
                            <Eye className="w-4 h-4" strokeWidth={2.5} />
                            <span>IN FOCUS</span>
                        </div>
                        <h2 className="text-4xl font-bold text-brand-black mb-2">
                            {t.inFocus.heading}
                        </h2>
                        <p className="text-gray-500">{t.inFocus.subtitle}</p>
                    </div>
                    <Link
                        href="/media"
                        className="hidden md:inline-flex items-center text-brand-green-dark font-bold hover:text-brand-black transition-colors"
                    >
                        {t.inFocus.viewAll} <span className="ml-2">→</span>
                    </Link>
                </SlideUpFadeIn>

                {articles.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((item) => {
                            const featuredImage = item.featured_image || extractFirstImage(item.content?.rendered) || null;

                            return (
                                <StaggerItem
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group"
                                >
                                    {featuredImage ? (
                                        <div className="relative h-52 overflow-hidden">
                                            <Image
                                                src={featuredImage}
                                                alt={getTitle(item, lang)}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-3 left-3 bg-brand-green-dark text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                                <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                <span>{lang === "en" ? "In Focus" : "ปักหมุด"}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative h-52 bg-gradient-to-br from-brand-green-dark/10 to-brand-green-dark/5 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-brand-green-dark/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                            <div className="absolute top-3 left-3 bg-brand-green-dark text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                                <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                <span>{lang === "en" ? "In Focus" : "ปักหมุด"}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-sm text-gray-400 mb-3 font-medium">
                                            {item.date
                                                ? new Date(item.date).toLocaleDateString(lang === "en" ? "en-US" : "th-TH", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : ""}
                                        </div>
                                        <h3
                                            className="text-lg font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: getTitle(item, lang) }}
                                        />
                                        <div
                                            className="text-gray-600 mb-4 line-clamp-2 flex-1 leading-relaxed text-sm"
                                            dangerouslySetInnerHTML={{ __html: getExcerpt(item, lang) }}
                                        />
                                        <Link
                                            href={`/media/articles/${item.slug}`}
                                            className="inline-flex items-center text-brand-green-dark font-bold text-sm hover:text-brand-black transition-colors mt-auto"
                                        >
                                            {t.inFocus.readMore}{" "}
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500">{t.inFocus.loading}</p>
                    </div>
                )}

                <SlideUpFadeIn className="text-center mt-12 md:hidden">
                    <Link
                        href="/media"
                        className="inline-block bg-brand-green-dark hover:bg-brand-black text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        {t.inFocus.viewAllMobile}
                    </Link>
                </SlideUpFadeIn>
            </div>
        </section>
    );
}
