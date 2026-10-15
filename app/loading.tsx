import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between overflow-x-hidden">
      {/* Header Skeleton Bar */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
        <div className="h-16 w-full rounded-3xl bg-slate-100/90 border border-slate-200/60 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="w-36 h-3" />
              <Skeleton className="w-24 h-2" />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Skeleton className="w-20 h-8 rounded-full" />
            <Skeleton className="w-20 h-8 rounded-full" />
            <Skeleton className="w-20 h-8 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-16 h-8 rounded-full" />
            <Skeleton className="w-24 h-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        <div className="lg:col-span-7 space-y-6">
          <Skeleton className="w-32 h-4 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="w-3/4 h-12 rounded-xl" />
            <Skeleton className="w-1/2 h-12 rounded-xl" />
          </div>
          <Skeleton className="w-4/5 h-4 rounded" />
          <Skeleton className="w-full max-w-xl h-56 rounded-3xl" />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4 items-center lg:items-end">
          <Skeleton className="w-full max-w-[270px] h-20 rounded-2xl" />
          <Skeleton className="w-full max-w-[270px] h-20 rounded-2xl" />
          <Skeleton className="w-full max-w-[270px] h-20 rounded-2xl" />
        </div>
      </div>

      {/* Services Skeleton Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        <div className="space-y-2">
          <Skeleton className="w-28 h-3 rounded" />
          <Skeleton className="w-64 h-8 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
