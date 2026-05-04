"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import SkeletonCard from "@/components/SkeletonCard";

const DEFAULT_SEARCH_IMAGE = "/images/mobile-version-hero.jpg";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);
  const debouncedInput = useDebounce(searchInput, 400);
  const { lang, t } = useTranslation();

  const searchContent = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery.trim())}`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setError(t.search.loading);
    } finally {
      setLoading(false);
    }
  }, [t.search.loading]);

  // Search on initial query (from URL)
  useEffect(() => {
    if (query) {
      setSearchInput(query);
      searchContent(query);
    }
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  // Search on debounced input
  useEffect(() => {
    if (debouncedInput !== query) {
      searchContent(debouncedInput);
    }
  }, [debouncedInput]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-green-dark text-brand-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[1.8]">{t.search.title}</h1>
          {query && <p className="text-xl">{t.search.resultsFor}: &quot;{query}&quot;</p>}
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark focus:border-transparent"
            />
            <button
              onClick={() => searchContent(searchInput)}
              className="bg-brand-green-dark hover:bg-brand-black text-brand-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t.search.button}
            </button>
          </div>
        </div>
      </section>

      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {loading
          ? t.search.searching
          : results.length > 0
            ? `${t.search.found} ${results.length} ${t.search.results}`
            : query
              ? t.search.noResults
              : ""}
      </div>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              <p className="text-gray-600">{t.search.found} {results.length} {t.search.results}</p>
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={result.url}
                  className="group block rounded-2xl border border-gray-200 bg-brand-white shadow-sm hover:shadow-lg hover:border-brand-green-dark/30 transition-all duration-300 overflow-hidden"
                >
                  <article className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
                    <div className="relative h-52 md:h-full min-h-[180px] bg-gray-100">
                      <Image
                        src={result.featured_image || DEFAULT_SEARCH_IMAGE}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        aria-hidden="true"
                      />
                      <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-brand-green-dark/95 px-3 py-1 text-xs font-bold text-brand-white tracking-wide uppercase">
                        {result.subtype || result.type}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold leading-snug text-brand-green-dark group-hover:text-brand-black transition-colors">
                          {result.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-gray-600 line-clamp-3">
                          {result.excerpt || (lang === "en" ? "Click to read this story on the website." : "คลิกเพื่ออ่านเนื้อหาฉบับเต็มบนเว็บไซต์")}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t.search.noResults} &quot;{query}&quot;
              </p>
              <p className="text-gray-500 mt-2">
                {t.search.noResultsTip}
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t.search.startSearch}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Search() {
  return <SearchContent />;
}
