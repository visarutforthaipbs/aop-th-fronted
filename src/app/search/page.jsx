"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchContent(query);
    }
  }, [query]);

  async function searchContent(searchQuery) {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-green-dark text-brand-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[1.8]">ค้นหา</h1>
          {query && <p className="text-xl">ผลการค้นหาสำหรับ: &quot;{query}&quot;</p>}
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="ค้นหาข้อมูล..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-brand-green-dark hover:bg-brand-black text-brand-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              ค้นหา
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green-dark"></div>
              <p className="mt-4 text-gray-600">กำลังค้นหา...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              <p className="text-gray-600">พบ {results.length} ผลลัพธ์</p>
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <Link href={result.url} className="block">
                    <h3 className="text-xl font-semibold mb-2 text-brand-green-dark hover:text-brand-red">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {result.excerpt}
                    </p>
                    <span className="text-sm text-gray-500">{result.type}</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;
              </p>
              <p className="text-gray-500 mt-2">
                ลองใช้คำค้นหาอื่นหรือคำค้นหาที่สั้นกว่า
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                กรอกคำค้นหาเพื่อเริ่มค้นหา
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          กำลังโหลด...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
