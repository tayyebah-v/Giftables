"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function StepFooter({
  backHref,
  nextHref,
  nextLabel = "Continue",
  nextDisabled,
}: {
  backHref?: string;
  nextHref: string;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {backHref ? (
        <Link
          href={backHref}
          className="rounded-2xl border-2 border-[#0f172a] bg-white px-4 py-3 text-sm font-semibold text-[#0f172a]"
        >
          Back
        </Link>
      ) : (
        <span />
      )}
      <motion.div whileTap={{ scale: nextDisabled ? 1 : 0.98 }}>
        {nextDisabled ? (
          <span className="inline-flex cursor-not-allowed rounded-2xl border-2 border-slate-300 bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500">
            {nextLabel}
          </span>
        ) : (
          <Link
            href={nextHref}
            className="inline-flex rounded-2xl border-2 border-[#0f172a] bg-[#22c55e] px-5 py-3 text-sm font-semibold text-[#052e16] shadow-[0_6px_0_#0f172a]"
          >
            {nextLabel}
          </Link>
        )}
      </motion.div>
    </div>
  );
}
