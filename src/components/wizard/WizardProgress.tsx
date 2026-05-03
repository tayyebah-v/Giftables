"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: 1, label: "Occasion" },
  { n: 2, label: "Package" },
  { n: 3, label: "Dress it up" },
  { n: 4, label: "Gifts" },
  { n: 5, label: "Extras" },
  { n: 6, label: "Delivery" },
];

export function WizardProgress({ current }: { current: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-medium text-slate-700">
        <span>
          Step {current} of {STEPS.length}
        </span>
        <span className="text-slate-500">{STEPS[current - 1]?.label}</span>
      </div>
      <div className="flex gap-1.5">
        {STEPS.map((s) => {
          const done = s.n < current;
          const active = s.n === current;
          const width = done ? "100%" : active ? "78%" : "12%";
          return (
            <div
              key={s.n}
              className="h-2 flex-1 overflow-hidden rounded-full border border-[#0f172a] bg-white"
            >
              <motion.div
                className="h-full rounded-full bg-green-500"
                initial={false}
                animate={{ width, opacity: done || active ? 1 : 0.35 }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
