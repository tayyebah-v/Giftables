"use client";

import { AnimatePresence, motion } from "framer-motion";

export function PriceWidget({
  totalLabel,
  subtotalLabel,
  deliveryLabel,
  onOpenBreakdown,
}: {
  totalLabel: string;
  subtotalLabel: string;
  deliveryLabel: string;
  onOpenBreakdown: () => void;
}) {
  return (
    <motion.div
      layout
      className="pointer-events-auto fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-3xl border-2 border-[#0f172a] bg-white p-4 shadow-[0_10px_0_#0f172a] md:right-8 md:left-auto md:mx-0 md:w-[380px]"
      initial={{ y: 28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-600">Your gift</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={totalLabel}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              {totalLabel}
            </motion.p>
          </AnimatePresence>
          <p className="text-xs text-slate-500">
            Merch {subtotalLabel} · Ship {deliveryLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenBreakdown}
          className="rounded-xl border-2 border-[#0f172a] bg-[#22c55e] px-4 py-2 text-sm font-semibold text-[#052e16]"
        >
          Details
        </button>
      </div>
    </motion.div>
  );
}
