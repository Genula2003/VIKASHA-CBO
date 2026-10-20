import { Skeleton } from "@/components/ui/Skeleton";

export default function BillingRulesLoading() {
  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Executive Command Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white space-y-4">
        <div className="space-y-3 max-w-xl">
          <Skeleton variant="dark" className="w-56 h-6 rounded-full" />
          <Skeleton variant="dark" className="w-72 h-10 rounded-xl" />
          <Skeleton variant="dark" className="w-full h-4 rounded" />
        </div>
      </div>

      {/* Rules Config Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 max-w-2xl">
        <div className="space-y-2 pb-4 border-b border-gray-100">
          <Skeleton className="w-44 h-6 rounded-lg" />
          <Skeleton className="w-72 h-3.5 rounded" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="w-28 h-3 rounded" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-36 h-3 rounded" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-40 h-3 rounded" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <Skeleton className="w-full h-12 rounded-xl mt-6" />
        </div>
      </div>
    </div>
  );
}
