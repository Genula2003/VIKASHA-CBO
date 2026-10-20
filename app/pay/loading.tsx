import { Skeleton } from "@/components/ui/Skeleton";

export default function PayLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Top Navbar Placeholder */}
      <header className="h-20 bg-white/90 border-b border-slate-200/90 px-6 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1">
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-16 h-2 rounded" />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Skeleton className="w-20 h-7 rounded-full" />
          <Skeleton className="w-20 h-7 rounded-full" />
          <Skeleton className="w-20 h-7 rounded-full" />
        </div>
      </header>

      {/* Pay Hero Banner */}
      <div className="bg-[#081B38] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Skeleton variant="dark" className="w-48 h-6 rounded-full mx-auto" />
          <Skeleton variant="dark" className="w-80 h-10 rounded-xl mx-auto" />
          <Skeleton variant="dark" className="w-96 h-4 rounded mx-auto" />

          {/* Search Box Skeleton */}
          <div className="max-w-xl mx-auto mt-8">
            <Skeleton variant="dark" className="w-full h-14 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* 3 Step Guidance Cards Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-12 w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-32 h-5 rounded-md" />
            <Skeleton className="w-full h-3 rounded" />
            <Skeleton className="w-4/5 h-3 rounded" />
          </div>
        ))}
      </div>

      {/* Footer Placeholder */}
      <footer className="bg-[#020e1e] py-8 text-center">
        <Skeleton variant="dark" className="w-64 h-4 rounded mx-auto" />
      </footer>
    </div>
  );
}
