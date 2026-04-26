import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-black text-brand-green-dark/20 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-brand-black mb-4">
          Article Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The article you are looking for does not exist or may have been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/media"
            className="inline-flex items-center justify-center bg-brand-green-dark text-white px-6 py-3 rounded-full font-bold hover:bg-brand-black transition-colors"
          >
            Back to Media
          </Link>
        </div>
      </div>
    </div>
  );
}
