import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-black text-brand-green-dark/20 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-brand-black mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-brand-green-dark text-white px-6 py-3 rounded-full font-bold hover:bg-brand-black transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center bg-white border border-gray-200 text-brand-black px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
