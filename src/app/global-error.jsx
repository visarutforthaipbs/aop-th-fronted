"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-brand-black px-4">
        <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          A critical error occurred. Please reload the page.
        </p>
        <button
          onClick={reset}
          className="bg-brand-green-dark text-white px-8 py-3 rounded-full font-bold hover:bg-brand-black transition-colors"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
