import { NextResponse } from "next/server";
import { GIFTS, type EventSlug } from "@/lib/catalog";

type Body = {
  eventSlug?: EventSlug;
  budgetCents?: number;
  cartSkus?: string[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as Body;
  const event = body.eventSlug;
  const budget = body.budgetCents ?? 10_000;

  const scored = GIFTS.map((g) => {
    let score = g.popularityScore;
    if (event && g.recommendedForEventSlugs.includes(event)) score += 25;
    if (g.priceCents <= budget) score += 10;
    if (body.cartSkus?.includes(g.sku)) score -= 40;
    return { sku: g.sku, score };
  }).sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 6).map((s) => s.sku);
  return NextResponse.json({ skus: top });
}
