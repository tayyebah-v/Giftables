"use client";

import { motion } from "framer-motion";
import type { DeliveryTier } from "@/lib/catalog";
import { DELIVERY_PRICES } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing/computeTotals";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StepFooter } from "@/components/build/StepFooter";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

const TIERS: { id: DeliveryTier; title: string; copy: string }[] = [
  {
    id: "intra",
    title: "Intra-city",
    copy: "Swift handoff, same metro glow. Typically 1–2 days.",
  },
  {
    id: "inter",
    title: "Inter-city",
    copy: "Wrapped with extra transit care. Typically 3–5 days.",
  },
  {
    id: "intl",
    title: "International",
    copy: "Customs-aware packaging. Timelines vary by region.",
  },
];

export default function DeliveryPage() {
  const tier = useGiftBuilderStore((s) => s.deliveryTier);
  const setDelivery = useGiftBuilderStore((s) => s.setDelivery);

  return (
    <GlassPanel className="p-4 md:p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Step 6
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Delivery cadence
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Finalize shipping band — totals breathe in the floating dock below.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {TIERS.map((t, i) => {
          const active = tier === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => setDelivery(t.id)}
              className={[
                "rounded-3xl border p-4 text-left shadow-sm transition",
                active
                  ? "border-amber-200/90 bg-white/70 ring-2 ring-amber-100"
                  : "border-white/60 bg-white/40 hover:bg-white/60",
              ].join(" ")}
            >
              <p className="text-sm font-semibold text-slate-900">{t.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{t.copy}</p>
              <p className="mt-3 text-sm font-semibold text-slate-900">
                {formatMoney(DELIVERY_PRICES[t.id])}
              </p>
            </motion.button>
          );
        })}
      </div>

      <StepFooter
        backHref="/build/add-ons"
        nextHref="/checkout"
        nextDisabled={!tier}
        nextLabel={tier ? "Checkout" : "Select delivery"}
      />
    </GlassPanel>
  );
}
