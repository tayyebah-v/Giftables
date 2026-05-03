"use client";

import { create } from "zustand";
import type { DeliveryTier, EventSlug } from "@/lib/catalog";
import { ADD_ONS } from "@/lib/catalog";

export type CartGift = { sku: string; qty: number };

type GiftBuilderState = {
  eventSlug?: EventSlug;
  packagingSlug?: string;
  packagingAddonSlugs: string[];
  gifts: CartGift[];
  globalAddonSlugs: string[];
  deliveryTier?: DeliveryTier;
  budgetCents: number;
  bundleDiscountCents: number;
  activeBundleSlug?: string;
  setEvent: (slug: EventSlug) => void;
  setPackaging: (slug: string) => void;
  togglePackagingAddon: (slug: string) => void;
  upsertGift: (sku: string, qty: number) => void;
  toggleGlobalAddon: (slug: string) => void;
  setDelivery: (tier: DeliveryTier) => void;
  setBudget: (cents: number) => void;
  applyBundle: (args: {
    slug: string;
    packagingSlug: string;
    packagingAddonSlugs: string[];
    giftSkus: string[];
    discountCents: number;
    globalAddonSlugs?: string[];
  }) => void;
  clearBundle: () => void;
  reset: () => void;
};

const initial = {
  packagingAddonSlugs: [] as string[],
  gifts: [] as CartGift[],
  globalAddonSlugs: [] as string[],
  budgetCents: 8000,
  bundleDiscountCents: 0,
};

export const useGiftBuilderStore = create<GiftBuilderState>()((set) => ({
  ...initial,
  setEvent: (slug) =>
    set({
      eventSlug: slug,
      packagingSlug: undefined,
      packagingAddonSlugs: [],
      gifts: [],
      globalAddonSlugs: [],
      deliveryTier: undefined,
      bundleDiscountCents: 0,
      activeBundleSlug: undefined,
    }),
  setPackaging: (slug) =>
    set((s) => ({
      packagingSlug: slug,
      packagingAddonSlugs: s.packagingAddonSlugs.filter((addonSlug) => {
        const def = ADD_ONS.find((a) => a.slug === addonSlug);
        if (!def || def.kind !== "packaging_extra") return true;
        if (!def.compatiblePackagingSlugs?.length) return true;
        return def.compatiblePackagingSlugs.includes(slug);
      }),
    })),
  togglePackagingAddon: (slug) =>
    set((s) => ({
      packagingAddonSlugs: s.packagingAddonSlugs.includes(slug)
        ? s.packagingAddonSlugs.filter((x) => x !== slug)
        : [...s.packagingAddonSlugs, slug],
    })),
  upsertGift: (sku, qty) =>
    set((s) => ({
      gifts:
        qty <= 0
          ? s.gifts.filter((g) => g.sku !== sku)
          : [{ sku, qty }, ...s.gifts.filter((g) => g.sku !== sku)],
    })),
  toggleGlobalAddon: (slug) =>
    set((s) => ({
      globalAddonSlugs: s.globalAddonSlugs.includes(slug)
        ? s.globalAddonSlugs.filter((x) => x !== slug)
        : [...s.globalAddonSlugs, slug],
    })),
  setDelivery: (tier) => set({ deliveryTier: tier }),
  setBudget: (cents) => set({ budgetCents: cents }),
  applyBundle: ({
    slug,
    packagingSlug,
    packagingAddonSlugs,
    giftSkus,
    discountCents,
    globalAddonSlugs,
  }) =>
    set({
      activeBundleSlug: slug,
      packagingSlug,
      packagingAddonSlugs,
      gifts: giftSkus.map((sku) => ({ sku, qty: 1 })),
      globalAddonSlugs: globalAddonSlugs ?? [],
      bundleDiscountCents: discountCents,
    }),
  clearBundle: () =>
    set({
      activeBundleSlug: undefined,
      bundleDiscountCents: 0,
    }),
  reset: () => set({ ...initial, eventSlug: undefined }),
}));
