import {
  getArticleBySlug,
  getAllArticles,
  getAuthToken,
  getMediaById,
} from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const token = await getAuthToken();
  const articles = await getAllArticles(token);

  if (!articles) return [];

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetail({ params }) {
  const { slug } = params;
  const token = await getAuthToken();
  const article = await getArticleBySlug(decodeURIComponent(slug), token);

  if (!article) {
    notFound();
  }

  let featuredImage = null;
  if (article.featured_media) {
    featuredImage = await getMediaById(article.featured_media);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {featuredImage ? (
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            src={featuredImage.source_url}
            alt={article.title.rendered}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-green-dark text-white text-sm font-bold tracking-wider mb-4 shadow-lg">
                ARTICLE
              </span>
              <h1
                className="text-4xl md:text-6xl font-bold text-white mb-4 leading-relaxed drop-shadow-lg"
                dangerouslySetInnerHTML={{ __html: article.title.rendered }}
              />
              {article.date && (
                <p className="text-gray-200 text-lg font-light flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(article.date).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-brand-green-dark py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-yellow border border-brand-yellow/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
              ARTICLE
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
            {article.date && (
              <p className="text-gray-200 text-lg font-light flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(article.date).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-brand-black prose-p:text-gray-700 prose-p:leading-loose prose-a:text-brand-green-dark prose-a:font-bold hover:prose-a:text-brand-red prose-img:rounded-3xl prose-img:shadow-lg [&>p]:mb-8"
            dangerouslySetInnerHTML={{ __html: article.content.rendered }}
          />

          {/* Back Link */}
          <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center">
            <a
              href="/media/articles"
              className="inline-flex items-center px-8 py-4 bg-gray-100 hover:bg-brand-green-dark text-brand-black hover:text-white rounded-full font-bold transition-all duration-300 group"
            >
              <svg
                className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              กลับไปยังบทความทั้งหมด
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
