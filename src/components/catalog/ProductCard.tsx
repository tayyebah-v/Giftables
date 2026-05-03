"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GiftItem } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing/computeTotals";

export function ProductCard({
  item,
  selectedQty,
  onAdd,
  onInc,
  onDec,
  badge,
  className = "",
}: {
  item: GiftItem;
  selectedQty: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
  badge?: string;
  className?: string;
}) {
  return (
    <motion.div
      layout
      className={`relative flex w-full flex-col overflow-hidden rounded-3xl border-2 border-[#0f172a] bg-white shadow-[0_8px_0_#0f172a] ${className}`}
    >
      {badge ? (
        <span className="absolute left-3 top-3 z-10 rounded-full border border-[#0f172a] bg-[#dcfce7] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#14532d]">
          {badge}
        </span>
      ) : null}
      <div className="relative aspect-square w-full bg-slate-100">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="240px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-600">
            {item.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-900">
            {formatMoney(item.priceCents)}
          </span>
          {selectedQty <= 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="rounded-xl border-2 border-[#0f172a] bg-[#22c55e] px-3 py-1.5 text-xs font-semibold text-[#052e16]"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border-2 border-[#0f172a] bg-white px-2 py-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={onDec}
                className="h-7 w-7 rounded-full border border-[#0f172a] bg-white text-sm font-bold text-slate-800"
              >
                −
              </button>
              <span className="min-w-[1.25rem] text-center text-xs font-semibold text-slate-900">
                {selectedQty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={onInc}
                className="h-7 w-7 rounded-full border border-[#0f172a] bg-[#22c55e] text-sm font-bold text-[#052e16]"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
