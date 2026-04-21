"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24">
      <h2 className="text-3xl font-bold text-brand-black mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        We apologize for the inconvenience. Please try again or go back home.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center bg-brand-green-dark text-white px-6 py-3 rounded-full font-bold hover:bg-brand-black transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center bg-white border border-gray-200 text-brand-black px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
