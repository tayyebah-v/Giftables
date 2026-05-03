import { NextResponse } from "next/server";
import { PACKAGING } from "@/lib/catalog";

export function GET() {
  return NextResponse.json({ packaging: PACKAGING });
}
