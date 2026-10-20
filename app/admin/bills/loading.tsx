import { Skeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function BillsLoading() {
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
          <div className="flex items-center gap-3">
            <Skeleton variant="dark" className="w-32 h-11 rounded-xl" />
            <Skeleton variant="dark" className="w-36 h-11 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <TableSkeleton
        rows={10}
        columns={6}
        title="Municipal Invoices"
        showFilterBar={true}
      />
    </div>
  );
}
