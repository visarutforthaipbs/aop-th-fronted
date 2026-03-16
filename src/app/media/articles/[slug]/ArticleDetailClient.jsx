"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getTitle, getContent } from "@/lib/acf";
import th from "@/locales/th";
import en from "@/locales/en";

export default function ArticleDetailClient({ article, relatedArticles }) {
    const { lang } = useLanguage();
    const t = lang === "en" ? en : th;

    const title = getTitle(article, lang);
    const content = getContent(article, lang);

    const featuredImage =
        article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    const authorName =
        article._embedded?.author?.[0]?.name || t.articleDetail.author;

    const date = new Date(article.date).toLocaleDateString(
        lang === "en" ? "en-US" : "th-TH",
        { year: "numeric", month: "long", day: "numeric" }
    );

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px]">
                {featuredImage ? (
                    <>
                        <Image
                            src={featuredImage}
                            alt={title.replace(/<[^>]+>/g, "")}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                    </>
                ) : (
                    <div className="absolute inset-0 bg-brand-green-dark">
                        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/media"
                            className="inline-flex items-center text-white/80 hover:text-brand-white mb-6 transition-colors font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t.articleDetail.backToMedia}
                        </Link>

                        <h1
                            className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 shadow-sm"
                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)", lineHeight: "1.3" }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />

                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-light">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-brand-white text-brand-black flex items-center justify-center font-bold text-lg">
                                    {authorName.charAt(0)}
                                </div>
                                <span className="font-medium">{authorName}</span>
                            </div>
                            <span className="hidden md:inline w-1 h-1 bg-white/50 rounded-full"></span>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <main className="max-w-4xl mx-auto px-6 md:px-8 py-16 -mt-10 relative z-20 bg-white rounded-t-3xl shadow-xl md:shadow-none md:bg-transparent md:rounded-none md:mt-0 lg:py-24">
                <div className="md:bg-white md:p-12 md:rounded-3xl md:shadow-xl">
                    <article
                        className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:font-bold prose-headings:text-brand-black 
              prose-p:text-gray-700 prose-p:leading-8 prose-p:font-light 
              prose-a:text-brand-green-dark prose-a:font-bold hover:prose-a:text-brand-black prose-a:no-underline hover:prose-a:underline
              prose-strong:font-bold prose-strong:text-brand-green-dark
              prose-img:rounded-3xl prose-img:shadow-lg prose-img:my-10
              prose-blockquote:border-l-4 prose-blockquote:border-brand-white prose-blockquote:pl-6 prose-blockquote:italic
              [&>p]:mb-8 font-thai-sarabun"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* Tags / Share */}
                    <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm">{t.articleDetail.tagAOP}</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm">{t.articleDetail.tagArticle}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 text-sm font-medium">{t.articleDetail.share}</span>
                            <button className="w-10 h-10 rounded-full bg-gray-100 text-brand-black flex items-center justify-center hover:bg-brand-green-dark hover:text-white transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-100 text-brand-black flex items-center justify-center hover:bg-brand-green-dark hover:text-white transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-100 text-brand-black flex items-center justify-center hover:bg-brand-green-dark hover:text-white transition-all duration-300">
                                <LinkIcon className="w-5 h-5" />
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
                        {relatedArticles.map((relArticle) => (
                            <Link key={relArticle.id} href={`/media/articles/${relArticle.slug}`} className="group">
                                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                                    <div className="h-48 relative overflow-hidden bg-gray-200">
                                        {relArticle.featured_image ? (
                                            <Image
                                                src={relArticle.featured_image}
                                                alt={getTitle(relArticle, lang).replace(/<[^>]+>/g, "")}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-3 text-xs text-brand-green-dark font-semibold">
                                            <span className="bg-brand-white/20 px-2 py-1 rounded-md">
                                                {new Date(relArticle.date).toLocaleDateString(
                                                    lang === "en" ? "en-US" : "th-TH"
                                                )}
                                            </span>
                                        </div>
                                        <h3
                                            className="text-lg font-bold mb-3 text-brand-black leading-tight group-hover:text-brand-green-dark transition-colors line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: getTitle(relArticle, lang) }}
                                        />
                                        <div
                                            className="text-gray-500 text-sm line-clamp-2 mt-auto"
                                            dangerouslySetInnerHTML={{ __html: relArticle.excerpt?.rendered || relArticle.excerpt || "" }}
                                        ></div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
