import type { HTMLAttributes } from "react";

export function GlassPanel({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border-2 border-[#0f172a] bg-white shadow-[0_10px_0_#0f172a] ${className}`}
      {...props}
    />
  );
}
