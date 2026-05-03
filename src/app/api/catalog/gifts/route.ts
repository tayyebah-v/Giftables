import { NextResponse } from "next/server";
import { GIFTS, type EventSlug } from "@/lib/catalog";
import {
  filterCategory,
  sortGifts,
  type SortId,
} from "@/lib/gifts/sortAndFilter";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const event = searchParams.get("event") as EventSlug | null;
  const category = searchParams.get("category") ?? "all";
  const sort = (searchParams.get("sort") ?? "recommended") as SortId;

  const base =
    category === "all"
      ? GIFTS
      : filterCategory(GIFTS, category);

  const gifts = sortGifts(base, sort, event ?? undefined);
  return NextResponse.json({ gifts });
}
