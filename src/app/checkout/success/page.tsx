"use client";

import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useThemeEvent } from "@/components/providers/ThemeProvider";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export default function CheckoutSuccessPage() {
  const reset = useGiftBuilderStore((s) => s.reset);
  const { setEventSlug } = useThemeEvent();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-cream via-[#f3ecff] to-blush px-4 py-16">
      <GlassPanel className="max-w-md p-8 text-center shadow-float">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Thank you
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Your gift is in motion
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Demo flow complete. Wire Stripe, transactional email, and fulfillment
          webhooks to go live — totals already match server-side recomputation.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => {
              reset();
              setEventSlug(undefined);
            }}
            className="inline-flex justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Start another gift
          </Link>
          <Link
            href="/build/event"
            className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
          >
            Keep exploring occasions
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
}
