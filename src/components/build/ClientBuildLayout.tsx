"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ADD_ONS, GIFTS, PACKAGING, getEvent } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing/computeTotals";
import { stepFromPathname } from "@/lib/buildSteps";
import { useBuildPricing } from "@/hooks/useBuildPricing";
import { PriceBreakdownSheet } from "@/components/pricing/PriceBreakdownSheet";
import { PriceWidget } from "@/components/pricing/PriceWidget";
import { useThemeEvent } from "@/components/providers/ThemeProvider";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WizardProgress } from "@/components/wizard/WizardProgress";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export function ClientBuildLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const step = stepFromPathname(pathname);
  const { setEventSlug } = useThemeEvent();
  const eventSlug = useGiftBuilderStore((s) => s.eventSlug);
  const packagingSlug = useGiftBuilderStore((s) => s.packagingSlug);
  const packagingAddonSlugs = useGiftBuilderStore((s) => s.packagingAddonSlugs);
  const gifts = useGiftBuilderStore((s) => s.gifts);
  const globalAddonSlugs = useGiftBuilderStore((s) => s.globalAddonSlugs);
  const deliveryTier = useGiftBuilderStore((s) => s.deliveryTier);
  const pricing = useBuildPricing();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (eventSlug) setEventSlug(eventSlug);
  }, [eventSlug, setEventSlug]);

  const eventSurface = eventSlug ? getEvent(eventSlug) : undefined;

  const breakdownLines = useMemo(() => {
    const lines: { label: string; amount: string }[] = [];
    if (packagingSlug) {
      const p = PACKAGING.find((x) => x.slug === packagingSlug);
      if (p) {
        lines.push({
          label: p.name,
          amount: formatMoney(p.basePriceCents),
        });
      }
    }
    for (const slug of packagingAddonSlugs) {
      const a = ADD_ONS.find((x) => x.slug === slug);
      if (a) lines.push({ label: a.name, amount: formatMoney(a.priceCents) });
    }
    for (const g of gifts) {
      const item = GIFTS.find((x) => x.sku === g.sku);
      if (item) {
        lines.push({
          label: `${item.name} ×${g.qty}`,
          amount: formatMoney(item.priceCents * g.qty),
        });
      }
    }
    for (const slug of globalAddonSlugs) {
      const a = ADD_ONS.find((x) => x.slug === slug);
      if (a) lines.push({ label: a.name, amount: formatMoney(a.priceCents) });
    }
    if (pricing.discountCents > 0) {
      lines.push({
        label: "Bundle savings",
        amount: `−${formatMoney(pricing.discountCents)}`,
      });
    }
    if (deliveryTier) {
      lines.push({
        label: `Delivery (${deliveryTier})`,
        amount: formatMoney(pricing.deliveryCents),
      });
    }
    return lines;
  }, [
    packagingSlug,
    packagingAddonSlugs,
    gifts,
    globalAddonSlugs,
    deliveryTier,
    pricing.discountCents,
    pricing.deliveryCents,
  ]);

  const backgroundStyle =
    eventSurface != null
      ? {
          background: `linear-gradient(180deg, ${eventSurface.theme.surface} 0%, ${eventSurface.theme.primary} 42%, #ffffff 100%)`,
        }
      : { background: "linear-gradient(180deg,#faf8f5,#f3ecff 45%,#fce7f3)" };

  return (
    <div
      className="min-h-dvh pb-36 pt-6 md:pb-28"
      style={backgroundStyle}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4">
        <header className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            Home
          </Link>
          <span className="rounded-full bg-white/50 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-white/70">
            Guided builder
          </span>
        </header>
        <GlassPanel className="p-4 md:p-5">
          <WizardProgress current={step} />
        </GlassPanel>
        <main>{children}</main>
      </div>
      <PriceWidget
        totalLabel={pricing.totalLabel}
        subtotalLabel={pricing.subtotalLabel}
        deliveryLabel={pricing.deliveryLabel}
        onOpenBreakdown={() => setSheetOpen(true)}
      />
      <PriceBreakdownSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        lines={breakdownLines}
        totalLabel={pricing.totalLabel}
      />
    </div>
  );
}
