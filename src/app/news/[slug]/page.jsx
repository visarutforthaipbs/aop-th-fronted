import { getNewsBySlug, getAllNews } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";

// Helper function to extract first image from HTML content
function extractFirstImage(htmlContent) {
  if (!htmlContent) return null;
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : null;
}

export async function generateStaticParams() {
  const posts = await getAllNews(1, 100);

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsDetail({ params }) {
  const { slug } = params;

  // Fetch the post with embedded data
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${API_URL}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 0 } }
  );

  const posts = await response.json();
  const post = posts && posts.length > 0 ? posts[0] : null;

  if (!post) {
    notFound();
  }

  // Get featured image from embedded data OR extract first image from content
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    extractFirstImage(post.content?.rendered) ||
    null;

  // Get author name from embedded data
  const authorName = post._embedded?.author?.[0]?.name || "กองเลขาฯ สมัชชาคนจน";

  // Get categories
  const categories = post._embedded?.["wp:term"]?.[0] || [];

  // Format date
  const date = new Date(post.date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch related posts
  const allPosts = await getAllNews(1, 10);
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px]">
        {featuredImage ? (
          <>
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
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
              href="/news"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับหน้าข่าว
            </Link>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-3 py-1 bg-white/90 text-brand-black text-xs font-bold rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 shadow-sm"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)", lineHeight: "1.3" }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-light">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white text-brand-black flex items-center justify-center font-bold text-lg">
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
          {/* Article Body */}
          <article
            className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:font-bold prose-headings:text-brand-black 
              prose-p:text-gray-700 prose-p:leading-8 prose-p:font-light 
              prose-a:text-brand-green-dark prose-a:font-bold hover:prose-a:text-brand-black prose-a:no-underline hover:prose-a:underline
              prose-strong:font-bold prose-strong:text-brand-green-dark
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
              prose-blockquote:border-l-4 prose-blockquote:border-white prose-blockquote:pl-6 prose-blockquote:italic
              [&>p]:mb-8 font-thai-sarabun"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Tags / Share */}
          <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm"
                >
                  #{cat.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm font-medium">แชร์:</span>
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

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-brand-black flex items-center gap-3">
              <span className="w-10 h-1 bg-brand-green-dark rounded-full"></span>
              ข่าวที่เกี่ยวข้อง
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relatedImage = relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || extractFirstImage(relatedPost.content?.rendered);

                return (
                  <Link
                    key={relatedPost.id}
                    href={`/news/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                      {relatedImage ? (
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={relatedImage}
                            alt={relatedPost.title?.rendered || "Related news thumbnail"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gray-100/30 flex items-center justify-center text-brand-green-dark/30">
                          <svg
                            className="w-12 h-12"
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

                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-xs font-semibold text-brand-green-dark bg-gray-100/20 px-2 py-1 rounded-full w-fit mb-3">
                          {new Date(relatedPost.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>

                        <h3
                          className="text-lg font-bold text-brand-black group-hover:text-brand-green-dark transition-colors leading-tight line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: relatedPost.title?.rendered,
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
