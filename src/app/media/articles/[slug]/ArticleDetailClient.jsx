"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Breadcrumbs from "@/components/Breadcrumbs";
import SafeHtml from "@/components/SafeHtml";
import { useTranslation } from "@/context/LanguageContext";
import { getTitle, getContent } from "@/lib/acf";
import { stripHtml } from "@/lib/utils";
import { formatLongDate } from "@/lib/date";

export default function ArticleDetailClient({ article, relatedArticles }) {
    const { lang, dateLocale, t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const title = getTitle(article, lang);
    const plainTitle = stripHtml(title);
    const content = getContent(article, lang);

    const featuredImage =
        article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    const authorName =
        article._embedded?.author?.[0]?.name || t.articleDetail.author;

    const date = formatLongDate(article.date, dateLocale);

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = plainTitle;

    const handleShare = (platform) => {
        const url = encodeURIComponent(shareUrl);
        const text = encodeURIComponent(shareText);

        if (platform === "facebook") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");
        } else if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "width=600,height=400");
        } else if (platform === "copy") {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
            } else {
                prompt("Copy this link:", shareUrl);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Breadcrumbs items={[
                    { label: lang === "en" ? "Home" : "หน้าแรก", href: "/" },
                    { label: lang === "en" ? "Media" : "ห้องสื่อ", href: "/media" },
                    { label: plainTitle, href: "#" }
                ]} />
            </div>

            {/* Hero Section */}
            <section className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px]">
                {featuredImage ? (
                    <>
                        <Image
                            src={featuredImage}
                            alt={plainTitle}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-accent via-brand-accent/40 to-transparent opacity-90"></div>
                    </>
                ) : (
                    <div className="absolute inset-0 bg-brand-green-dark">
                        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 z-10">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/media"
                            className="inline-flex items-center text-white/90 hover:text-brand-white mb-6 transition-colors font-bold backdrop-blur-md bg-white/20 px-5 py-2.5 rounded-full text-sm"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t.articleDetail.backToMedia}
                        </Link>

                        <h1
                            className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tighter"
                            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
                        >
                            {plainTitle}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white text-sm md:text-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-black flex items-center justify-center font-black text-xl shadow-lg">
                                    {authorName.charAt(0)}
                                </div>
                                <span className="font-bold">{authorName}</span>
                            </div>
                            <span className="hidden md:inline w-1.5 h-1.5 bg-brand-yellow rounded-full"></span>
                            <span className="font-medium text-white/90">{date}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 -mt-20 relative z-20">
                <div className="bg-white p-6 md:p-16 rounded-[2.5rem] shadow-2xl border border-gray-100">
                    <SafeHtml
                        html={content}
                        className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:font-black prose-headings:text-brand-black prose-headings:tracking-tight
              prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-8
              prose-a:text-brand-green-dark prose-a:font-bold hover:prose-a:text-brand-black prose-a:no-underline hover:prose-a:underline
              prose-strong:font-bold prose-strong:text-brand-accent
              prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-12
              prose-blockquote:border-l-8 prose-blockquote:border-brand-yellow prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic
              font-sans"
                    />

                    {/* Tags / Share */}
                    <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm">{t.articleDetail.tagAOP}</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm">{t.articleDetail.tagArticle}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-gray-500 text-sm font-medium">{t.articleDetail.share}</span>
                            <button
                                onClick={() => handleShare("facebook")}
                                className="w-10 h-10 rounded-full bg-gray-100 text-brand-black flex items-center justify-center hover:bg-brand-green-dark hover:text-white transition-all duration-300"
                                aria-label="Share on Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleShare("twitter")}
                                className="w-10 h-10 rounded-full bg-gray-100 text-brand-black flex items-center justify-center hover:bg-brand-green-dark hover:text-white transition-all duration-300"
                                aria-label="Share on X (Twitter)"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleShare("copy")}
                                className="w-10 h-10 rounded-full bg-gray-100 text-brand-black flex items-center justify-center hover:bg-brand-green-dark hover:text-white transition-all duration-300"
                                aria-label="Copy link to article"
                            >
                                {copied ? (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Related Articles */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-brand-black flex items-center gap-3">
                        <span className="w-10 h-1 bg-brand-green-dark rounded-full"></span>
                        {t.articleDetail.relatedArticles}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedArticles.map((relArticle) => {
                            const relPlainTitle = getTitle(relArticle, lang).replace(/<[^>]+>/g, "");
                            return (
                                <Link key={relArticle.id} href={`/media/articles/${relArticle.id}`} className="group">
                                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                                        <div className="h-48 relative overflow-hidden bg-gray-200">
                                            {relArticle.featured_image ? (
                                                <Image
                                                    src={relArticle.featured_image}
                                                    alt={relPlainTitle}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 mb-3 text-xs text-brand-green-dark font-semibold">
                                                <span className="bg-brand-white/20 px-2 py-1 rounded-md">
                                                    {formatLongDate(relArticle.date, dateLocale)}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-3 text-brand-black leading-tight group-hover:text-brand-green-dark transition-colors line-clamp-2">
                                                {relPlainTitle}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 mt-auto">
                                                {stripHtml(relArticle.excerpt?.rendered || relArticle.excerpt || "")}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
