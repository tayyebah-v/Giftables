"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EVENTS, GIFTS, type EventSlug } from "@/lib/catalog";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StepFooter } from "@/components/build/StepFooter";
import { BudgetSlider } from "@/components/catalog/BudgetSlider";
import { FilterBar } from "@/components/catalog/FilterBar";
import type { SortId } from "@/lib/gifts/sortAndFilter";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductRail } from "@/components/catalog/ProductRail";
import {
  filterCategory,
  popular,
  recommendedForEvent,
  sortGifts,
  withinBudget,
} from "@/lib/gifts/sortAndFilter";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export default function GiftsPage() {
  const eventSlug = useGiftBuilderStore((s) => s.eventSlug);
  const budgetCents = useGiftBuilderStore((s) => s.budgetCents);
  const setBudget = useGiftBuilderStore((s) => s.setBudget);
  const gifts = useGiftBuilderStore((s) => s.gifts);
  const upsert = useGiftBuilderStore((s) => s.upsertGift);

  const [category, setCategory] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortId>("recommended");

  const categories = useMemo(() => {
    const s = new Set<string>();
    GIFTS.forEach((g) => g.categories.forEach((c) => s.add(c)));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    const base = filterCategory(GIFTS, category);
    return sortGifts(base, sort, eventSlug as EventSlug | undefined);
  }, [category, sort, eventSlug]);

  const rails = useMemo(() => {
    if (!eventSlug) {
      return {
        popular: popular(GIFTS),
        recommended: popular(GIFTS),
        budget: withinBudget(GIFTS, budgetCents),
      };
    }
    return {
      popular: popular(GIFTS),
      recommended: recommendedForEvent(GIFTS, eventSlug),
      budget: withinBudget(GIFTS, budgetCents),
    };
  }, [eventSlug, budgetCents]);

  const qtyOf = (sku: string) => gifts.find((g) => g.sku === sku)?.qty ?? 0;

  const bump = (sku: string, delta: number) => {
    const next = Math.max(0, qtyOf(sku) + delta);
    upsert(sku, next);
  };

  return (
    <div className="space-y-4">
      <GlassPanel className="p-4 md:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Step 4
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Curated gifts
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Multi-select with live totals. Filters stay gentle — we surface the
            best first.
          </p>
        </div>

        {!eventSlug ? (
          <div className="mt-4 rounded-2xl bg-amber-50/80 p-3 text-sm text-amber-950 ring-1 ring-amber-100">
            Choose an occasion for smarter rails —{" "}
            <Link className="font-semibold underline" href="/build/event">
              step 1
            </Link>
            .
          </div>
        ) : null}

        <div className="mt-5 space-y-4">
          <BudgetSlider valueCents={budgetCents} onChange={setBudget} />
          <FilterBar
            category={category}
            onCategory={setCategory}
            sort={sort}
            onSort={setSort}
            categories={categories}
          />
        </div>
      </GlassPanel>

      <GlassPanel className="space-y-8 p-4 md:p-6">
        <ProductRail
          title="Most popular"
          subtitle="Social proof, softly stated."
          items={rails.popular}
          qtyOf={qtyOf}
          onAdd={(sku) => bump(sku, 1)}
          onInc={(sku) => bump(sku, 1)}
          onDec={(sku) => bump(sku, -1)}
          badgeForSku={(sku) =>
            GIFTS.find((g) => g.sku === sku)?.tags.includes("trending")
              ? "Trending"
              : GIFTS.find((g) => g.sku === sku)?.tags.includes("popular")
                ? "Popular"
                : undefined
          }
        />
        <ProductRail
          title={
            eventSlug
              ? `Recommended for ${
                  EVENTS.find((e) => e.slug === eventSlug)?.shortLabel ??
                  eventSlug
                }`
              : "Recommended picks"
          }
          subtitle="Tuned to the moment you chose."
          items={rails.recommended}
          qtyOf={qtyOf}
          onAdd={(sku) => bump(sku, 1)}
          onInc={(sku) => bump(sku, 1)}
          onDec={(sku) => bump(sku, -1)}
          badgeForSku={() => "For you"}
        />
        <ProductRail
          title="Within your budget"
          subtitle="Splurge-friendly cap, not a cage."
          items={rails.budget}
          qtyOf={qtyOf}
          onAdd={(sku) => bump(sku, 1)}
          onInc={(sku) => bump(sku, 1)}
          onDec={(sku) => bump(sku, -1)}
          badgeForSku={(sku) => {
            const g = GIFTS.find((x) => x.sku === sku);
            return g && g.priceCents <= budgetCents ? "In range" : undefined;
          }}
        />

        <div>
          <h3 className="px-1 text-sm font-semibold text-slate-900">
            All picks ({filtered.length})
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
            {filtered.map((item) => (
              <ProductCard
                key={item.sku}
                item={item}
                selectedQty={qtyOf(item.sku)}
                onAdd={() => bump(item.sku, 1)}
                onInc={() => bump(item.sku, 1)}
                onDec={() => bump(item.sku, -1)}
              />
            ))}
          </div>
        </div>

        <StepFooter
          backHref="/build/packaging/customize"
          nextHref="/build/add-ons"
          nextDisabled={gifts.length === 0}
          nextLabel={gifts.length === 0 ? "Pick a gift" : "Continue"}
        />
      </GlassPanel>
    </div>
  );
}
