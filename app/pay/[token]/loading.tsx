import { Skeleton } from "@/components/ui/Skeleton";

export default function TokenPayLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Navbar Placeholder */}
      <header className="h-20 bg-white/90 border-b border-slate-200/90 px-6 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-28 h-5 rounded" />
        </div>
        <Skeleton className="w-24 h-8 rounded-full" />
      </header>

      {/* Main Payment Checkout Skeleton */}
      <div className="max-w-xl mx-auto w-full px-4 py-12 flex-1">
        <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="space-y-1">
              <Skeleton className="w-24 h-3 rounded" />
              <Skeleton className="w-36 h-6 rounded-lg" />
            </div>
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <Skeleton className="w-28 h-3 rounded" />
              <Skeleton className="w-48 h-5 rounded" />
              <Skeleton className="w-32 h-3 rounded" />
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <Skeleton className="w-28 h-3 rounded" />
              <Skeleton className="w-40 h-8 rounded-lg" />
            </div>

            <div className="space-y-2 pt-2">
              <Skeleton className="w-32 h-4 rounded" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
            </div>

            <Skeleton className="w-full h-14 rounded-2xl mt-4" />
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
      <footer className="bg-[#020e1e] py-8 text-center">
        <Skeleton variant="dark" className="w-64 h-4 rounded mx-auto" />
      </footer>
    </div>
  );
}
