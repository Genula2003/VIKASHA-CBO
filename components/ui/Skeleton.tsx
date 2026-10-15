export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 ${className}`}
      {...props}
    />
  );
}
