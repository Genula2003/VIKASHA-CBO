import { Skeleton, CardSkeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function ArrearsLoading() {
  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Executive Command Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <Skeleton variant="dark" className="w-52 h-6 rounded-full" />
            <Skeleton variant="dark" className="w-80 h-10 rounded-xl" />
            <Skeleton variant="dark" className="w-full h-4 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton variant="dark" className="w-36 h-11 rounded-xl" />
            <Skeleton variant="dark" className="w-40 h-11 rounded-xl" />
          </div>
        </div>
      </div>

      {/* 4 Arrears Aging KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton variant="stat" />
        <CardSkeleton variant="stat" />
        <CardSkeleton variant="stat" />
        <CardSkeleton variant="stat" />
      </div>

      {/* Arrears Accounts Table */}
      <TableSkeleton
        rows={8}
        columns={6}
        title="Overdue Accounts & Disconnection Notices"
        showFilterBar={true}
      />
    </div>
  );
}
