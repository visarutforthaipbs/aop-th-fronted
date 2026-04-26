"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-black text-brand-green-dark/20 mb-4">500</h1>
        <h2 className="text-2xl font-bold text-brand-black mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8 font-mono text-sm break-all">
          {error?.message || "An unexpected error occurred while loading this article."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center bg-brand-green-dark text-white px-6 py-3 rounded-full font-bold hover:bg-brand-black transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/media"
            className="inline-flex items-center justify-center bg-white border border-gray-200 text-brand-black px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors"
          >
            Back to Media
          </Link>
        </div>
      </div>
    </div>
  );
}
