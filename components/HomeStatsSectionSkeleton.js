export default function HomeStatsSectionSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 lg:pb-28">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="premium-card premium-card-hover flex min-h-[132px] items-center justify-center p-[18px] text-center">
            <div className="space-y-1.5">
              <div className="mx-auto h-9 w-24 animate-pulse rounded bg-white/10 sm:h-10 sm:w-28" />
              <div className="mx-auto h-4 w-32 animate-pulse rounded bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}