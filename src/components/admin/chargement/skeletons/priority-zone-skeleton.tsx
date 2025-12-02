export function PriorityZoneSkeleton({ backgroundColor }: { backgroundColor?: string }) {
  return (
    <div
      className={`flex-1 animate-pulse rounded-lg border border-gray-200 p-4 ${backgroundColor || 'bg-gray-50'}`}
    >
      <div className="mb-4 h-6 w-24 rounded bg-gray-200"></div>
      <div className="space-y-2">
        <div className="h-16 rounded bg-gray-200"></div>
        <div className="h-16 rounded bg-gray-200"></div>
        <div className="h-16 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

export function PriorityZonesSkeleton() {
  return (
    <>
      <PriorityZoneSkeleton backgroundColor="bg-red-50" />
      <PriorityZoneSkeleton backgroundColor="bg-yellow-50" />
      <PriorityZoneSkeleton backgroundColor="bg-blue-50" />
      <PriorityZoneSkeleton backgroundColor="bg-orange-50" />
    </>
  );
}
