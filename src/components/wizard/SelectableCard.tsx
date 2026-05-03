"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

export function SelectableCard({
  selected,
  title,
  subtitle,
  meta,
  onSelect,
  imageUrl,
  badge,
}: {
  selected: boolean;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  onSelect: () => void;
  imageUrl?: string;
  badge?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      layout
      className={[
        "relative w-full overflow-hidden rounded-3xl border-2 p-4 text-left transition-colors",
        selected
          ? "border-[#22c55e] bg-[#f0fdf4] shadow-[0_8px_0_#14532d]"
          : "border-[#0f172a] bg-white shadow-[0_8px_0_#0f172a]",
      ].join(" ")}
    >
      {badge ? (
        <span className="absolute right-3 top-3 rounded-full border border-[#0f172a] bg-[#dcfce7] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#14532d]">
          {badge}
        </span>
      ) : null}
      {imageUrl ? (
        <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 400px"
          />
        </div>
      ) : null}
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      {subtitle ? (
        <div className="mt-1 text-xs leading-relaxed text-slate-600">
          {subtitle}
        </div>
      ) : null}
      {meta ? <div className="mt-2 text-xs text-slate-500">{meta}</div> : null}
    </motion.button>
  );
}
