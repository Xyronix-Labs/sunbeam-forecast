export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Current Weather Skeleton */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-3">
            <div className="h-10 w-40 shimmer rounded-lg" />
            <div className="h-5 w-20 shimmer rounded-lg" />
            <div className="h-6 w-32 shimmer rounded-lg mt-4" />
          </div>
          <div className="h-32 w-32 shimmer rounded-full" />
          <div className="text-center lg:text-right space-y-2">
            <div className="h-20 w-36 shimmer rounded-lg" />
            <div className="h-5 w-28 shimmer rounded-lg" />
          </div>
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5">
            <div className="h-5 w-20 shimmer rounded mb-3" />
            <div className="h-8 w-16 shimmer rounded" />
          </div>
        ))}
      </div>

      {/* Forecast Skeleton */}
      <div className="glass-card rounded-3xl p-6">
        <div className="h-6 w-40 shimmer rounded mb-6" />
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="h-10 w-full shimmer rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
