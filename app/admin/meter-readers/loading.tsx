import { Skeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function MeterReadersLoading() {
  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Executive Command Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <Skeleton variant="dark" className="w-48 h-6 rounded-full" />
            <Skeleton variant="dark" className="w-64 h-10 rounded-xl" />
            <Skeleton variant="dark" className="w-full h-4 rounded" />
          </div>
          <Skeleton variant="dark" className="w-44 h-12 rounded-xl" />
        </div>
      </div>

      {/* Meter Readers Table */}
      <TableSkeleton
        rows={6}
        columns={5}
        title="Field Staff Directory"
        showFilterBar={false}
      />
    </div>
  );
}
