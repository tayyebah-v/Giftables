import type { EventSlug, GiftItem } from "@/lib/catalog";

export type SortId = "recommended" | "popular" | "price-asc" | "price-desc";

export function sortGifts(items: GiftItem[], sort: SortId, event?: EventSlug) {
  const copy = [...items];
  if (sort === "popular") {
    copy.sort((a, b) => b.popularityScore - a.popularityScore);
  } else if (sort === "price-asc") {
    copy.sort((a, b) => a.priceCents - b.priceCents);
  } else if (sort === "price-desc") {
    copy.sort((a, b) => b.priceCents - a.priceCents);
  } else if (sort === "recommended" && event) {
    copy.sort((a, b) => {
      const ar = a.recommendedForEventSlugs.includes(event) ? 1 : 0;
      const br = b.recommendedForEventSlugs.includes(event) ? 1 : 0;
      if (ar !== br) return br - ar;
      return b.popularityScore - a.popularityScore;
    });
  } else {
    copy.sort((a, b) => b.popularityScore - a.popularityScore);
  }
  return copy;
}

export function filterCategory(items: GiftItem[], category: string | "all") {
  if (category === "all") return items;
  return items.filter((g) => g.categories.includes(category));
}

export function popular(items: GiftItem[], n = 6) {
  return [...items]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, n);
}

export function recommendedForEvent(items: GiftItem[], event: EventSlug, n = 6) {
  return [...items]
    .filter((g) => g.recommendedForEventSlugs.includes(event))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, n);
}

export function withinBudget(items: GiftItem[], budgetCents: number, n = 8) {
  return [...items]
    .filter((g) => g.priceCents <= budgetCents)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, n);
}
