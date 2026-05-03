"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ADD_ONS, GIFTS, PACKAGING } from "@/lib/catalog";
import { useBuildPricing } from "@/hooks/useBuildPricing";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export default function CheckoutPage() {
  const router = useRouter();
  const pricing = useBuildPricing();
  const eventSlug = useGiftBuilderStore((s) => s.eventSlug);
  const packagingSlug = useGiftBuilderStore((s) => s.packagingSlug);
  const packagingAddonSlugs = useGiftBuilderStore((s) => s.packagingAddonSlugs);
  const gifts = useGiftBuilderStore((s) => s.gifts);
  const globalAddonSlugs = useGiftBuilderStore((s) => s.globalAddonSlugs);
  const deliveryTier = useGiftBuilderStore((s) => s.deliveryTier);
  const bundleDiscountCents = useGiftBuilderStore((s) => s.bundleDiscountCents);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const summaryLines = useMemo(() => {
    const lines: string[] = [];
    if (packagingSlug) {
      const p = PACKAGING.find((x) => x.slug === packagingSlug);
      if (p) lines.push(p.name);
    }
    packagingAddonSlugs.forEach((slug) => {
      const a = ADD_ONS.find((x) => x.slug === slug);
      if (a) lines.push(a.name);
    });
    gifts.forEach((g) => {
      const gi = GIFTS.find((x) => x.sku === g.sku);
      if (gi) lines.push(`${gi.name} ×${g.qty}`);
    });
    globalAddonSlugs.forEach((slug) => {
      const a = ADD_ONS.find((x) => x.slug === slug);
      if (a) lines.push(a.name);
    });
    if (deliveryTier) lines.push(`Delivery: ${deliveryTier}`);
    return lines;
  }, [
    packagingSlug,
    packagingAddonSlugs,
    gifts,
    globalAddonSlugs,
    deliveryTier,
  ]);

  const canPay =
    !!email &&
    !!eventSlug &&
    !!packagingSlug &&
    gifts.length > 0 &&
    !!deliveryTier;

  const pay = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          eventSlug,
          packagingSlug,
          packagingAddonSlugs,
          gifts,
          globalAddonSlugs,
          deliveryTier,
          bundleDiscountCents,
        }),
      });
      const data = (await res.json()) as {
        mode?: string;
        clientSecret?: string | null;
        message?: string;
      };
      if (!res.ok) {
        setMessage(data.message ?? "Unable to start checkout.");
        setLoading(false);
        return;
      }
      if (data.mode === "demo") {
        router.push("/checkout/success");
        return;
      }
      setMessage(
        "Stripe client secret received — mount Payment Element client-side next.",
      );
    } catch {
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-cream via-[#f3ecff] to-blush px-4 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href="/build/delivery"
            className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
          >
            ← Back to delivery
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Checkout
          </span>
        </div>

        <GlassPanel className="p-5 md:p-6">
          <h1 className="text-2xl font-semibold text-slate-900">Almost there</h1>
          <p className="mt-2 text-sm text-slate-600">
            Guest checkout for now — Firebase auth can light up accounts later.
          </p>

          <div className="mt-6 space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Email for confirmations
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none ring-0 focus:border-amber-200"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="mt-6 rounded-2xl border border-white/60 bg-white/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Summary
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {summaryLines.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-4 text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>{pricing.totalLabel}</span>
            </div>
          </div>

          {message ? (
            <p className="mt-4 text-sm text-amber-900">{message}</p>
          ) : null}

          <button
            type="button"
            disabled={!canPay || loading}
            onClick={pay}
            className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? "Processing…" : "Pay securely"}
          </button>
          {!canPay ? (
            <p className="mt-3 text-xs text-rose-700">
              Finish the builder steps (occasion, packaging, gifts, delivery) before
              paying.
            </p>
          ) : null}
        </GlassPanel>
      </div>
    </div>
  );
}
