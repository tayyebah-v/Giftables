import type { DeliveryTier } from "@/lib/catalog";
import { DELIVERY_PRICES } from "@/lib/catalog";

export type SelectionInput = {
  packagingSlug?: string;
  packagingAddonSlugs: string[];
  gifts: { sku: string; qty: number }[];
  globalAddonSlugs: string[];
  deliveryTier?: DeliveryTier;
  bundleDiscountCents?: number;
};

export type CatalogMaps = {
  packagingBySlug: Record<string, { priceCents: number }>;
  addOnBySlug: Record<string, { priceCents: number; kind: string }>;
  giftBySku: Record<string, { priceCents: number }>;
  deliveryByTier: Record<DeliveryTier, number>;
};

export function computeTotals(input: SelectionInput, catalog: CatalogMaps) {
  let merchandiseCents = 0;

  if (input.packagingSlug) {
    merchandiseCents +=
      catalog.packagingBySlug[input.packagingSlug]?.priceCents ?? 0;
  }
  for (const slug of input.packagingAddonSlugs) {
    merchandiseCents += catalog.addOnBySlug[slug]?.priceCents ?? 0;
  }
  for (const g of input.gifts) {
    const unit = catalog.giftBySku[g.sku]?.priceCents ?? 0;
    merchandiseCents += unit * Math.max(0, g.qty);
  }
  for (const slug of input.globalAddonSlugs) {
    merchandiseCents += catalog.addOnBySlug[slug]?.priceCents ?? 0;
  }

  const discountCents = Math.max(0, input.bundleDiscountCents ?? 0);
  const afterDiscountCents = Math.max(0, merchandiseCents - discountCents);

  const deliveryCents = input.deliveryTier
    ? catalog.deliveryByTier[input.deliveryTier] ??
      DELIVERY_PRICES[input.deliveryTier]
    : 0;

  const taxCents = 0;
  const totalCents = afterDiscountCents + deliveryCents + taxCents;

  return {
    merchandiseCents,
    discountCents,
    subtotalCents: afterDiscountCents,
    deliveryCents,
    taxCents,
    totalCents,
  };
}

export function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
