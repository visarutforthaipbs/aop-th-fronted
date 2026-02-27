import Link from "next/link";

export default function NewsSection({ latestNews }) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-brand-black mb-2">
                            ข่าวสารและความเคลื่อนไหว
                        </h2>
                        <p className="text-gray-500">ติดตามสถานการณ์ล่าสุดจากพื้นที่</p>
                    </div>
                    <Link
                        href="/news"
                        className="hidden md:inline-flex items-center text-brand-green-dark font-bold hover:text-brand-black transition-colors"
                    >
                        ดูทั้งหมด <span className="ml-2">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestNews.length > 0 ? (
                        latestNews.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group"
                            >
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="text-sm text-gray-400 mb-4 font-medium">
                                        {item.date
                                            ? new Date(item.date).toLocaleDateString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                            : ""}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-brand-black group-hover:text-brand-green-dark transition-colors line-clamp-2">
                                        {item.title?.rendered}
                                    </h3>
                                    <div
                                        className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: item.excerpt?.rendered,
                                        }}
                                    />
                                    <Link
                                        href={`/news/${item.slug}`}
                                        className="inline-flex items-center text-brand-green-dark font-bold hover:text-brand-black transition-colors mt-auto"
                                    >
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
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            ></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500">กำลังโหลดข่าวสาร...</p>
                        </div>
                    )}
                </div>
                <div className="text-center mt-12 md:hidden">
                    <Link
                        href="/news"
                        className="inline-block bg-brand-green-dark hover:bg-brand-black text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        ดูข่าวสารทั้งหมด
                    </Link>
                </div>
            </div>
        </section>
    );
}
