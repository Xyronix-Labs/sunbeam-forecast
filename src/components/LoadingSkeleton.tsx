export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Current Weather Skeleton */}
      <div
        className="rounded-3xl p-8"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,212,255,0.1)' }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-3 flex-1">
            <div className="h-4 w-32 shimmer rounded-lg" />
            <div className="h-12 w-52 shimmer rounded-xl" />
            <div className="h-5 w-20 shimmer rounded-lg" />
            <div className="h-6 w-36 shimmer rounded-lg mt-4" />
          </div>
          <div className="h-36 w-36 shimmer rounded-full" />
          <div className="text-center lg:text-right space-y-2 flex-1 flex flex-col items-end">
            <div className="h-24 w-40 shimmer rounded-2xl" />
            <div className="h-5 w-32 shimmer rounded-lg" />
            <div className="h-4 w-24 shimmer rounded-lg" />
          </div>
        </div>
      </div>

      {/* Details header skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-7 w-40 shimmer rounded-lg" />
        <div className="flex-1 h-px shimmer" />
      </div>

      {/* Details Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {Array(10).fill(0).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 space-y-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.08)' }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 shimmer rounded-xl" />
              <div className="h-3 w-16 shimmer rounded" />
            </div>
            <div className="h-7 w-20 shimmer rounded-lg" />
            <div className="h-1 w-full shimmer rounded-full" />
          </div>
        ))}
      </div>

      {/* Hourly header */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 shimmer rounded-xl" />
        <div className="h-7 w-44 shimmer rounded-lg" />
      </div>

      {/* Hourly Skeleton */}
      <div className="flex gap-3 overflow-hidden">
        {Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            className="min-w-[108px] rounded-2xl p-4 flex flex-col items-center gap-2.5 flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.08)' }}
          >
            <div className="h-3 w-10 shimmer rounded" />
            <div className="h-11 w-11 shimmer rounded-full" />
            <div className="h-6 w-12 shimmer rounded-lg" />
          </div>
        ))}
      </div>

      {/* 5-Day Skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 shimmer rounded-xl" />
        <div className="h-7 w-36 shimmer rounded-lg" />
      </div>
      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.08)' }}
      >
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-5 px-6">
            <div className="h-10 w-2/3 shimmer rounded-xl" />
            <div className="h-8 w-20 shimmer rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
