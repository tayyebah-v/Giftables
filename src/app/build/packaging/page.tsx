"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PACKAGING } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing/computeTotals";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SelectableCard } from "@/components/wizard/SelectableCard";
import { StepFooter } from "@/components/build/StepFooter";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export default function PackagingPage() {
  const eventSlug = useGiftBuilderStore((s) => s.eventSlug);
  const packagingSlug = useGiftBuilderStore((s) => s.packagingSlug);
  const setPackaging = useGiftBuilderStore((s) => s.setPackaging);

  return (
    <GlassPanel className="p-4 md:p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Step 2
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Choose packaging
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Anchored from {formatMoney(799)} — baskets layer drama, bags keep it
          effortless.
        </p>
      </div>

      {!eventSlug ? (
        <div className="mt-4 rounded-2xl bg-amber-50/80 p-3 text-sm text-amber-950 ring-1 ring-amber-100">
          Pick an occasion first —{" "}
          <Link className="font-semibold underline" href="/build/event">
            go to step 1
          </Link>
          .
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {PACKAGING.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <SelectableCard
              title={p.name}
              subtitle={p.description}
              imageUrl={p.imageUrl}
              selected={packagingSlug === p.slug}
              onSelect={() => setPackaging(p.slug)}
              meta={
                <span className="font-semibold text-slate-800">
                  From {formatMoney(p.basePriceCents)}
                </span>
              }
            />
          </motion.div>
        ))}
      </div>

      <StepFooter
        backHref="/build/event"
        nextHref="/build/packaging/customize"
        nextDisabled={!packagingSlug}
      />
    </GlassPanel>
  );
}
