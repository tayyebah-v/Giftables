import { NextResponse } from "next/server";
import { ADD_ONS } from "@/lib/catalog";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind");
  const filtered = kind
    ? ADD_ONS.filter((a) => a.kind === kind)
    : ADD_ONS;
  return NextResponse.json({ addOns: filtered });
}
