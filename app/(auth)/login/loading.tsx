import { Skeleton } from "@/components/ui/Skeleton";

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 space-y-6">
        <div className="text-center space-y-3">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto" />
          <Skeleton className="w-48 h-7 rounded-lg mx-auto" />
          <Skeleton className="w-64 h-3.5 rounded mx-auto" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Skeleton className="w-24 h-3 rounded" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-24 h-3 rounded" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <Skeleton className="w-full h-12 rounded-xl mt-6" />
        </div>
      </div>
    </div>
  );
}
