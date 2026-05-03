"use client";

import { useMemo } from "react";
import { catalogMaps } from "@/lib/catalog";
import { computeTotals, formatMoney } from "@/lib/pricing/computeTotals";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export function useBuildPricing() {
  const packagingSlug = useGiftBuilderStore((s) => s.packagingSlug);
  const packagingAddonSlugs = useGiftBuilderStore((s) => s.packagingAddonSlugs);
  const gifts = useGiftBuilderStore((s) => s.gifts);
  const globalAddonSlugs = useGiftBuilderStore((s) => s.globalAddonSlugs);
  const deliveryTier = useGiftBuilderStore((s) => s.deliveryTier);
  const bundleDiscountCents = useGiftBuilderStore((s) => s.bundleDiscountCents);

  return useMemo(() => {
    const catalog = catalogMaps();
    const totals = computeTotals(
      {
        packagingSlug,
        packagingAddonSlugs,
        gifts,
        globalAddonSlugs,
        deliveryTier,
        bundleDiscountCents,
      },
      catalog,
    );
    return {
      ...totals,
      subtotalLabel: formatMoney(totals.subtotalCents),
      deliveryLabel: deliveryTier
        ? formatMoney(totals.deliveryCents)
        : "—",
      totalLabel: formatMoney(totals.totalCents),
      merchandiseLabel: formatMoney(totals.merchandiseCents),
      discountLabel:
        totals.discountCents > 0
          ? `−${formatMoney(totals.discountCents)}`
          : null,
    };
  }, [
    packagingSlug,
    packagingAddonSlugs,
    gifts,
    globalAddonSlugs,
    deliveryTier,
    bundleDiscountCents,
  ]);
}
