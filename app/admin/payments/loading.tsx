import { Skeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function PaymentsLoading() {
  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Executive Command Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <Skeleton variant="dark" className="w-56 h-6 rounded-full" />
            <Skeleton variant="dark" className="w-72 h-10 rounded-xl" />
            <Skeleton variant="dark" className="w-full h-4 rounded" />
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 space-y-2">
            <Skeleton variant="dark" className="w-28 h-3 rounded" />
            <Skeleton variant="dark" className="w-40 h-8 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Verified Payments Table */}
      <TableSkeleton
        rows={10}
        columns={6}
        title="Verified Transactions"
        showFilterBar={false}
      />
    </div>
  );
}
