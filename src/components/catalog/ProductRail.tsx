"use client";

import { motion } from "framer-motion";
import type { GiftItem } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";

export function ProductRail({
  title,
  subtitle,
  items,
  qtyOf,
  onAdd,
  onInc,
  onDec,
  badgeForSku,
}: {
  title: string;
  subtitle?: string;
  items: GiftItem[];
  qtyOf: (sku: string) => number;
  onAdd: (sku: string) => void;
  onInc: (sku: string) => void;
  onDec: (sku: string) => void;
  badgeForSku?: (sku: string) => string | undefined;
}) {
  return (
    <section className="space-y-3">
      <div className="px-1">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {subtitle ? (
          <p className="text-xs text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 pl-1 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <motion.div
            key={item.sku}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
          >
            <ProductCard
              className="w-[220px] shrink-0 md:w-[240px]"
              item={item}
              selectedQty={qtyOf(item.sku)}
              onAdd={() => onAdd(item.sku)}
              onInc={() => onInc(item.sku)}
              onDec={() => onDec(item.sku)}
              badge={badgeForSku?.(item.sku)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
