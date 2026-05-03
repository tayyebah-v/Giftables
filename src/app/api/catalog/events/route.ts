import { NextResponse } from "next/server";
import { EVENTS } from "@/lib/catalog";

export function GET() {
  return NextResponse.json({ events: EVENTS });
}
