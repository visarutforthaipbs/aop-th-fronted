export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-brand-green-dark"></div>
      <p className="mt-4 text-gray-500 font-medium">Loading...</p>
    </div>
  );
}
