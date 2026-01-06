import Link from "next/link";
import { getAllNews } from "@/lib/api";

export default async function News() {
  let newsPosts = [];

  try {
    const posts = await getAllNews(1, 20);
    newsPosts = posts || [];
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-yellow border border-brand-yellow/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
            NEWS & UPDATES
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            ข่าวสาร
            <br />
            และความเคลื่อนไหว
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl">
            ติดตามข่าวสาร แถลงการณ์ และกิจกรรมล่าสุดของสมัชชาคนจน
            เพื่อไม่พลาดทุกการเคลื่อนไหว
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPosts.length > 0 ? (
              newsPosts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="p-8 flex flex-col h-full">
                    {post.date && (
                      <div className="flex items-center mb-4">
                        <span className="bg-brand-green-light/20 text-brand-green-dark text-xs font-bold px-3 py-1 rounded-full">
                          {new Date(post.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-4 text-brand-black group-hover:text-brand-green-dark transition-colors line-clamp-2">
                      {post.title?.rendered}
                    </h3>
                    <div
                      className="text-gray-600 mb-6 line-clamp-3 font-light flex-grow"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt?.rendered,
                      }}
                    />
                    <a
                      href={`/news/${post.slug}`}
                      className="inline-flex items-center text-brand-green-dark font-bold hover:text-brand-red transition-colors mt-auto"
                    >
                      อ่านเพิ่มเติม
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                  ยังไม่มีข่าวสารในขณะนี้
                </h3>
                <p className="text-gray-500">โปรดติดตามการอัพเดทในเร็วๆ นี้</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-brand-black text-center">
            หมวดหมู่ข่าว
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-brand-green-light/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                📢
              </div>
              <h3 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors">
                แถลงการณ์สื่อมวลชน
              </h3>
              <p className="text-gray-600 mb-6 font-light">
                แถลงการณ์และข่าวประชาสัมพันธ์อย่างเป็นทางการจากสมัชชาคนจน
              </p>
              <span className="text-brand-red font-bold flex items-center group-hover:translate-x-2 transition-transform">
                ดูทั้งหมด
                <svg
                  className="w-5 h-5 ml-2"
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

            <div className="group bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-brand-green-light/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                🗓️
              </div>
              <h3 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors">
                ประกาศกิจกรรม
              </h3>
              <p className="text-gray-600 mb-6 font-light">
                ตารางกิจกรรม การชุมนุม และงานเสวนาที่จะเกิดขึ้นเร็วๆ นี้
              </p>
              <span className="text-brand-red font-bold flex items-center group-hover:translate-x-2 transition-transform">
                ดูทั้งหมด
                <svg
                  className="w-5 h-5 ml-2"
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
      </section>
    </div>
  );
}
