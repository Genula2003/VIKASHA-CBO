import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "shimmer" | "pulse" | "subtle" | "dark";
  circle?: boolean;
}

/**
 * Core GPU-accelerated Skeleton primitive with light/dark theme awareness
 * and strict accessibility semantics.
 */
export function Skeleton({
  className = "",
  variant = "shimmer",
  circle = false,
  ...props
}: SkeletonProps) {
  const variantClass =
    variant === "dark"
      ? "skeleton-shimmer-dark rounded-xl"
      : variant === "subtle"
      ? "skeleton-shimmer-subtle rounded-xl"
      : variant === "pulse"
      ? "animate-pulse bg-slate-200 rounded-xl"
      : "skeleton-shimmer rounded-xl";

  const shapeClass = circle ? "rounded-full" : "";

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading content..."
      className={`${variantClass} ${shapeClass} ${className}`}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Standard KPI and Service Card Skeleton
 */
export function CardSkeleton({
  variant = "stat",
  className = "",
}: {
  variant?: "stat" | "service" | "action";
  className?: string;
}) {
  if (variant === "stat") {
    return (
      <div
        role="status"
        aria-busy="true"
        className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden space-y-4 ${className}`}
      >
        <div className="flex items-center justify-between">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <Skeleton className="w-16 h-4 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-24 h-3 rounded" />
          <Skeleton className="w-32 h-8 rounded-lg" />
          <Skeleton className="w-40 h-3 rounded" />
        </div>
      </div>
    );
  }

  if (variant === "action") {
    return (
      <div
        role="status"
        aria-busy="true"
        className={`rounded-3xl bg-[#0B132B] p-8 shadow-lg text-white border border-gray-800 space-y-4 ${className}`}
      >
        <Skeleton variant="dark" className="w-12 h-12 rounded-2xl" />
        <Skeleton variant="dark" className="w-48 h-7 rounded-lg" />
        <Skeleton variant="dark" className="w-full max-w-sm h-4 rounded" />
        <Skeleton variant="dark" className="w-36 h-10 rounded-xl mt-4" />
      </div>
    );
  }

  // "service" variant
  return (
    <div
      role="status"
      aria-busy="true"
      className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm p-6 space-y-4 ${className}`}
    >
      <Skeleton className="w-full h-44 rounded-2xl" />
      <Skeleton className="w-3/4 h-5 rounded-lg" />
      <Skeleton className="w-full h-3 rounded" />
      <Skeleton className="w-5/6 h-3 rounded" />
      <div className="pt-2 flex items-center justify-between">
        <Skeleton className="w-24 h-4 rounded-full" />
        <Skeleton className="w-20 h-8 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Data Table Skeleton matching admin directory, invoices, arrears, and payments
 */
export function TableSkeleton({
  rows = 6,
  columns = 5,
  title = "Loading records...",
  showFilterBar = true,
  className = "",
}: {
  rows?: number;
  columns?: number;
  title?: string;
  showFilterBar?: boolean;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <Skeleton className="w-36 h-4 rounded-md" />
            <Skeleton className="w-56 h-3 rounded-md" />
          </div>
        </div>
        <Skeleton className="w-28 h-8 rounded-xl" />
      </div>

      {/* Filter / Search Bar */}
      {showFilterBar && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Skeleton className="h-11 rounded-xl w-full" />
          <Skeleton className="h-11 rounded-xl w-full" />
          <Skeleton className="h-11 rounded-xl w-full" />
        </div>
      )}

      {/* Table Grid */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-100 text-left text-xs">
          <thead className="bg-[#F8FAFC]">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="py-3.5 px-4">
                  <Skeleton className="h-3 w-20 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: columns }).map((_, c) => (
                  <td key={c} className="py-4 px-4">
                    <div className="space-y-1">
                      <Skeleton
                        className={`h-3.5 rounded ${
                          c === 0 ? "w-28" : c === 1 ? "w-36" : "w-20"
                        }`}
                      />
                      {c === 1 && <Skeleton className="h-2.5 w-24 rounded" />}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="w-32 h-4 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-20 h-9 rounded-xl" />
          <Skeleton className="w-20 h-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * User / Consumer Profile Skeleton
 */
export function ProfileSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 ${className}`}
    >
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-40 h-5 rounded-lg" />
          <Skeleton className="w-28 h-3.5 rounded" />
          <Skeleton className="w-20 h-5 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="space-y-1.5">
          <Skeleton className="w-20 h-3 rounded" />
          <Skeleton className="w-36 h-4 rounded" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="w-20 h-3 rounded" />
          <Skeleton className="w-36 h-4 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Full Dashboard Skeleton for Admin Command Center & Meter Reader Portal
 */
export function DashboardSkeleton({
  title = "Command Center",
  subtitle = "Real-time monitoring and utility operations...",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div role="status" aria-busy="true" className="space-y-8 bg-[#F8FAFC]">
      {/* Executive Command Header Banner */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <Skeleton variant="dark" className="w-48 h-6 rounded-full" />
            <Skeleton variant="dark" className="w-64 h-10 rounded-xl" />
            <Skeleton variant="dark" className="w-full h-4 rounded" />
            <Skeleton variant="dark" className="w-4/5 h-4 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton variant="dark" className="w-32 h-11 rounded-xl" />
            <Skeleton variant="dark" className="w-40 h-11 rounded-xl" />
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton variant="stat" />
        <CardSkeleton variant="stat" />
        <CardSkeleton variant="stat" />
        <CardSkeleton variant="stat" />
      </div>

      {/* Analytics & Table Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-40 h-5 rounded-lg" />
            <Skeleton className="w-24 h-4 rounded" />
          </div>
          <Skeleton className="w-full h-64 rounded-2xl" />
        </div>
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <Skeleton className="w-32 h-5 rounded-lg" />
          <div className="space-y-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="space-y-1">
                  <Skeleton className="w-24 h-3.5 rounded" />
                  <Skeleton className="w-16 h-2.5 rounded" />
                </div>
                <Skeleton className="w-12 h-6 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Official E-Bill Receipt Skeleton (for /bill/[token] and payment confirmation)
 */
export function BillReceiptSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="min-h-screen bg-[#F7F7F4] py-12 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="w-48 h-6 rounded-md" />
              <Skeleton className="w-64 h-3 rounded" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="w-32 h-9 rounded-lg" />
            <Skeleton className="w-28 h-9 rounded-lg" />
          </div>
        </div>

        {/* Bill Container */}
        <div className="border border-[#E2E0D8] shadow-sm rounded-2xl overflow-hidden bg-white">
          <div className="bg-[#0A1120] text-white p-6 sm:p-8 flex flex-row justify-between items-center">
            <div className="space-y-2">
              <Skeleton variant="dark" className="w-44 h-5 rounded-full" />
              <Skeleton variant="dark" className="w-56 h-8 rounded-lg" />
              <Skeleton variant="dark" className="w-36 h-3 rounded" />
            </div>
            <Skeleton variant="dark" className="w-24 h-8 rounded-full" />
          </div>

          <div className="p-6 sm:p-8 space-y-6 divide-y divide-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="w-28 h-3 rounded" />
                  <Skeleton className="w-40 h-6 rounded" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="w-28 h-3 rounded" />
                  <Skeleton className="w-48 h-5 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="w-28 h-3 rounded" />
                  <Skeleton className="w-32 h-5 rounded" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="w-28 h-3 rounded" />
                  <Skeleton className="w-32 h-5 rounded" />
                </div>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-6 space-y-3">
              <Skeleton className="w-32 h-4 rounded" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="w-48 h-3.5 rounded" />
                  <Skeleton className="w-20 h-3.5 rounded" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="w-40 h-3.5 rounded" />
                  <Skeleton className="w-16 h-3.5 rounded" />
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <Skeleton className="w-32 h-6 rounded" />
                  <Skeleton className="w-28 h-6 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Consumer Bill Card Skeleton (Matches /pay account search result card exactly - Zero CLS)
 */
export function ConsumerBillCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_20px_50px_rgba(8,27,56,0.08)] space-y-6 ${className}`}
    >
      {/* Account Info Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-2xl" />
          <div className="space-y-1.5">
            <Skeleton className="w-36 h-5 rounded-md" />
            <Skeleton className="w-24 h-3 rounded" />
          </div>
        </div>
        <Skeleton className="w-28 h-7 rounded-full" />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="w-28 h-3 rounded" />
            <Skeleton className="w-52 h-6 rounded" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-28 h-3 rounded" />
            <Skeleton className="w-64 h-4 rounded" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-24 h-3 rounded" />
            <Skeleton className="w-36 h-4 rounded" />
          </div>
        </div>

        {/* Bill Balance Box */}
        <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="w-28 h-3 rounded" />
            <Skeleton className="w-16 h-5 rounded-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-48 h-8 rounded-lg" />
            <Skeleton className="w-32 h-3 rounded" />
          </div>
          <div className="pt-2 border-t border-slate-200/60 flex justify-between">
            <Skeleton className="w-28 h-3 rounded" />
            <Skeleton className="w-20 h-3 rounded" />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Skeleton className="w-44 h-4 rounded" />
        <Skeleton className="w-full sm:w-48 h-12 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Field Officer Record Reading Skeleton (for /meter-reader/enter-reading)
 */
export function ConsumerRecordSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="bg-white rounded-[28px] p-8 md:p-10 shadow-sm border border-gray-100 space-y-6"
    >
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="w-48 h-6 rounded-lg" />
          <Skeleton className="w-36 h-3.5 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 p-5 rounded-2xl bg-gray-50 border border-gray-100">
          <Skeleton className="w-32 h-3 rounded" />
          <Skeleton className="w-40 h-7 rounded" />
          <Skeleton className="w-24 h-3 rounded" />
        </div>
        <div className="space-y-3 p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
          <Skeleton className="w-36 h-3 rounded" />
          <Skeleton className="w-full h-12 rounded-xl" />
        </div>
      </div>

      <Skeleton className="w-full h-12 rounded-2xl" />
    </div>
  );
}

/**
 * Generic Full Page Skeleton with optional Sidebar
 */
export function PageSkeleton({
  hasSidebar = false,
  children,
}: {
  hasSidebar?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      aria-busy="true"
      className="min-h-screen bg-[#F8FAFC] flex flex-col overflow-hidden"
    >
      {/* Top Header Placeholder */}
      <header className="h-16 bg-white border-b border-gray-200/80 px-6 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-36 h-4 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-24 h-7 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-6 md:p-8 max-w-[1440px] mx-auto w-full space-y-6">
        {children || <DashboardSkeleton />}
      </main>
    </div>
  );
}
