import { NextResponse } from "next/server";
import { BUNDLES, type EventSlug } from "@/lib/catalog";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const event = searchParams.get("event") as EventSlug | null;
  const bundles = event
    ? BUNDLES.filter((b) => b.eventSlug === event)
    : BUNDLES;
  return NextResponse.json({ bundles });
}
