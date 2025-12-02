export function LivreurCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <div className="h-6 w-32 rounded bg-gray-200"></div>
      </div>
      <div className="space-y-2">
        <div className="h-20 rounded bg-gray-100"></div>
        <div className="h-20 rounded bg-gray-100"></div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="h-9 flex-1 rounded bg-gray-200"></div>
        <div className="h-9 w-9 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

export function LivreurCardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <LivreurCardSkeleton key={i} />
      ))}
    </>
  );
}
