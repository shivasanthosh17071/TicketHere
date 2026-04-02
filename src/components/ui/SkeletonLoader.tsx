const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`bg-cinema-elevated/60 rounded-lg animate-pulse ${className}`} />
);

export const MovieCardSkeleton = ({ size = "normal" }: { size?: "normal" | "large" }) => {
  const w = size === "large" ? "w-[180px]" : "w-[150px]";
  const h = size === "large" ? "h-[270px]" : "h-[225px]";
  return (
    <div className={`${w} flex-shrink-0`}>
      <Shimmer className={`${h} rounded-xl`} />
      <Shimmer className="h-4 w-3/4 mt-2" />
      <Shimmer className="h-3 w-1/2 mt-1.5" />
      <div className="flex gap-1 mt-1.5">
        <Shimmer className="h-4 w-10" />
        <Shimmer className="h-4 w-10" />
      </div>
    </div>
  );
};

export const HomeSkeleton = () => (
  <div className="px-4 pt-4 space-y-6">
    {/* Search */}
    <Shimmer className="h-12 w-full rounded-xl" />
    {/* Language tabs */}
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(i => (
        <Shimmer key={i} className="h-8 w-16 rounded-full" />
      ))}
    </div>
    {/* Category pills */}
    <div className="flex gap-2">
      {[1, 2, 3, 4].map(i => (
        <Shimmer key={i} className="h-7 w-24 rounded-full" />
      ))}
    </div>
    {/* Now Showing */}
    <div>
      <Shimmer className="h-7 w-40 mb-3" />
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3].map(i => (
          <MovieCardSkeleton key={i} size="large" />
        ))}
      </div>
    </div>
    {/* Trending */}
    <div>
      <Shimmer className="h-7 w-48 mb-3" />
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4].map(i => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export const MovieDetailSkeleton = () => (
  <div>
    <Shimmer className="h-[45vh] min-h-[300px] w-full rounded-none" />
    <div className="px-4 -mt-16 relative z-10 space-y-3">
      <div className="flex gap-2">
        <Shimmer className="h-5 w-10" />
        <Shimmer className="h-5 w-14" />
      </div>
      <Shimmer className="h-10 w-3/4" />
      <Shimmer className="h-5 w-1/2" />
      <div className="flex gap-2">
        <Shimmer className="h-7 w-12 rounded-full" />
        <Shimmer className="h-7 w-12 rounded-full" />
        <Shimmer className="h-7 w-14 rounded-full" />
      </div>
      <Shimmer className="h-4 w-40" />
      <Shimmer className="h-20 w-full mt-6" />
    </div>
  </div>
);

export default Shimmer;
