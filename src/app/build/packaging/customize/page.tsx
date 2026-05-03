"use client";

import { motion } from "framer-motion";
import { ADD_ONS } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing/computeTotals";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StepFooter } from "@/components/build/StepFooter";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export default function CustomizePackagingPage() {
  const packagingSlug = useGiftBuilderStore((s) => s.packagingSlug);
  const selected = useGiftBuilderStore((s) => s.packagingAddonSlugs);
  const toggle = useGiftBuilderStore((s) => s.togglePackagingAddon);

  const options = ADD_ONS.filter((a) => a.kind === "packaging_extra");

  const isDisabled = (slug: string) => {
    const def = options.find((o) => o.slug === slug);
    if (!def?.compatiblePackagingSlugs?.length || !packagingSlug) return false;
    return !def.compatiblePackagingSlugs.includes(packagingSlug);
  };

  return (
    <GlassPanel className="p-4 md:p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Step 3
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Dress the reveal
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Small tactile layers that make unboxing unforgettable.
        </p>
      </div>

      {!packagingSlug ? (
        <p className="mt-4 text-sm text-rose-700">
          Select packaging in step 2 first.
        </p>
      ) : null}

      <div className="mt-6 grid gap-3">
        {options.map((a, i) => {
          const disabled = isDisabled(a.slug);
          const on = selected.includes(a.slug);
          return (
            <motion.button
              key={a.slug}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              disabled={disabled || !packagingSlug}
              onClick={() => toggle(a.slug)}
              className={[
                "flex w-full items-center justify-between rounded-3xl border px-4 py-4 text-left shadow-sm transition",
                disabled
                  ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                  : on
                    ? "border-amber-200/90 bg-white/70 ring-2 ring-amber-100"
                    : "border-white/60 bg-white/40 hover:bg-white/60",
              ].join(" ")}
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{a.name}</p>
                <p className="mt-1 text-xs text-slate-600">{a.description}</p>
                {disabled ? (
                  <p className="mt-1 text-[11px] text-rose-700">
                    Not available for current packaging.
                  </p>
                ) : null}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  +{formatMoney(a.priceCents)}
                </p>
                <p className="text-[11px] text-slate-500">{on ? "Added" : "Tap to add"}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <StepFooter
        backHref="/build/packaging"
        nextHref="/build/gifts"
        nextDisabled={!packagingSlug}
      />
    </GlassPanel>
  );
}
