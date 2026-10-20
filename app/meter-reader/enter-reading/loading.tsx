import { Skeleton } from "@/components/ui/Skeleton";

export default function EnterReadingLoading() {
  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white space-y-4">
        <div className="space-y-3 max-w-xl">
          <Skeleton variant="dark" className="w-48 h-6 rounded-full" />
          <Skeleton variant="dark" className="w-72 h-10 rounded-xl" />
          <Skeleton variant="dark" className="w-full h-4 rounded" />
        </div>
      </div>

      {/* Search Consumer Form Skeleton */}
      <div className="max-w-3xl mx-auto bg-white rounded-[28px] p-8 md:p-10 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="w-48 h-6 rounded-lg" />
            <Skeleton className="w-64 h-3.5 rounded" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="w-36 h-4 rounded" />
          <Skeleton className="w-full h-14 rounded-2xl" />
          <Skeleton className="w-full h-12 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
