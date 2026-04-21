export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-full flex flex-col animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-8 flex-1 flex flex-col gap-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="mt-auto pt-4 border-t border-gray-100 h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
}
