"use client";

import { AnimatePresence, motion } from "framer-motion";

export function PriceBreakdownSheet({
  open,
  onClose,
  lines,
  totalLabel,
}: {
  open: boolean;
  onClose: () => void;
  lines: { label: string; amount: string }[];
  totalLabel: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="w-full max-w-md rounded-t-3xl border-2 border-[#0f172a] bg-white p-6 shadow-[0_10px_0_#0f172a] md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Price breakdown
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600"
              >
                Close
              </button>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              {lines.map((l) => (
                <li key={l.label} className="flex justify-between gap-4">
                  <span className="text-slate-600">{l.label}</span>
                  <span className="font-medium text-slate-900">{l.amount}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-4 text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>{totalLabel}</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
