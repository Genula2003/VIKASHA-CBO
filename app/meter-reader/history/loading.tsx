import { Skeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function MeterReaderHistoryLoading() {
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

      {/* History Table */}
      <TableSkeleton
        rows={8}
        columns={5}
        title="Field Log History"
        showFilterBar={false}
      />
    </div>
  );
}
