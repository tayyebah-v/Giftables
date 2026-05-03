"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ADD_ONS, BUNDLES, EVENTS } from "@/lib/catalog";
import { FloatingWelcomeFab } from "@/components/marketing/FloatingWelcomeFab";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";
import { useThemeEvent } from "@/components/providers/ThemeProvider";

export default function LandingPage() {
  const router = useRouter();
  const applyBundle = useGiftBuilderStore((s) => s.applyBundle);
  const setEvent = useGiftBuilderStore((s) => s.setEvent);
  const { setEventSlug } = useThemeEvent();

  const startFresh = () => {
    router.push("/build/event");
  };

  const selectQuickBundle = (slug: string) => {
    const b = BUNDLES.find((x) => x.slug === slug);
    if (!b) return;
    setEvent(b.eventSlug);
    setEventSlug(b.eventSlug);
    const packagingAddonSlugs = b.defaultAddOnSlugs.filter((slug) =>
      ADD_ONS.some((a) => a.slug === slug && a.kind === "packaging_extra"),
    );
    const globalAddonSlugs = b.defaultAddOnSlugs.filter((slug) =>
      ADD_ONS.some((a) => a.slug === slug && a.kind === "global_extra"),
    );
    applyBundle({
      slug: b.slug,
      packagingSlug: b.packagingTypeSlug,
      packagingAddonSlugs,
      giftSkus: b.giftItemSkus,
      discountCents: b.discountCents,
      globalAddonSlugs,
    });
    router.push("/build/gifts");
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute -left-20 top-24 h-52 w-52 rounded-full border-4 border-black/80" />
      <div className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full border-4 border-black/80" />
      <div className="pointer-events-none absolute left-4 top-8 -rotate-6 rounded-full border-2 border-black bg-yellow-300 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
        new drop
      </div>
      <div className="pointer-events-none absolute right-6 top-24 rotate-12 rounded-full border-2 border-black bg-red-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
        trending
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-24 pt-10 md:pt-16">
        <header className="flex items-center justify-between">
          <span className="rounded-xl border-2 border-black bg-white px-3 py-1 text-sm font-black tracking-tight text-slate-900 shadow-[3px_3px_0_#0f172a]">
            Giftables
          </span>
          <Link
            href="/build/event"
            className="rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-[3px_3px_0_#0f172a]"
          >
            Sign in soon
          </Link>
        </header>

        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-5"
          >
            <p className="inline-block w-fit -rotate-2 rounded-md border-2 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-slate-900">
              Mobile-first gifting machine
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
              Sketch your gift. <br />
              Ship it with swagger.
            </h1>
            <p className="max-w-prose rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-[5px_5px_0_#0f172a] md:text-base">
              A whiteboard-style gift builder that feels fast, bold, and fun.
              Pick the occasion, layer the package, and watch prices update live.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={startFresh}
                className="rounded-2xl border-2 border-black bg-yellow-300 px-6 py-3 text-sm font-black text-slate-900 shadow-[5px_5px_0_#0f172a]"
              >
                Start building →
              </button>
              <Link
                href="/build/event"
                className="rounded-2xl border-2 border-black bg-white px-5 py-3 text-sm font-black text-slate-900 shadow-[5px_5px_0_#0f172a]"
              >
                Continue building
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border-2 border-black bg-white px-3 py-1 font-bold text-slate-700">
                PWA-ready
              </span>
              <span className="rounded-full border-2 border-black bg-white px-3 py-1 font-bold text-slate-700">
                Stripe checkout
              </span>
              <span className="rounded-full border-2 border-black bg-white px-3 py-1 font-bold text-slate-700">
                Save-for-later coming
              </span>
            </div>
            <p className="text-xs font-black uppercase tracking-wide text-red-500">
              ↘ Swipe through quick bundles below
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="relative"
          >
            <GlassPanel className="relative overflow-hidden border-black p-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-black bg-slate-100">
                <Image
                  src="/images/hero-gift.png"
                  alt="Sketch-style gift box with red ribbon"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border-2 border-black bg-white p-3 text-sm text-slate-900 shadow-[4px_4px_0_#0f172a]">
                  <p className="font-black">Live price dock</p>
                  <p className="text-xs text-slate-700">
                    Sticky total. Zero surprises.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </section>

        <section id="quick" className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Quick gifts</h2>
              <p className="text-sm text-slate-700">
                One-tap bundles with editable layers.
              </p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {BUNDLES.map((b, i) => (
              <motion.button
                key={b.slug}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                onClick={() => selectQuickBundle(b.slug)}
                className="rounded-3xl border-2 border-black bg-white p-4 text-left shadow-[5px_5px_0_#0f172a] transition hover:-translate-y-0.5"
              >
                <p className="text-xs font-black uppercase tracking-wide text-red-500">
                  {EVENTS.find((e) => e.slug === b.eventSlug)?.shortLabel}
                </p>
                <p className="mt-2 text-base font-black text-slate-900">{b.title}</p>
                <p className="mt-2 text-xs text-slate-700">
                  Packaging + picks + savings baked in.
                </p>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
      <FloatingWelcomeFab />
    </div>
  );
}
