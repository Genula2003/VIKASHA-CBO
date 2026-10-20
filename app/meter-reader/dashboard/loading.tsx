import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";

export default function MeterReaderDashboardLoading() {
  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <Skeleton variant="dark" className="w-48 h-6 rounded-full" />
            <Skeleton variant="dark" className="w-72 h-10 rounded-xl" />
            <Skeleton variant="dark" className="w-full h-4 rounded" />
          </div>
          <Skeleton variant="dark" className="w-40 h-12 rounded-2xl" />
        </div>
      </div>

      {/* 2 Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <CardSkeleton variant="stat" />
        <CardSkeleton variant="stat" />
      </div>

      {/* 2 Action Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <CardSkeleton variant="action" />
        <CardSkeleton variant="action" />
      </div>
    </div>
  );
}
