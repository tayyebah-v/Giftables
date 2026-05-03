"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { EVENTS, type EventSlug } from "@/lib/catalog";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SelectableCard } from "@/components/wizard/SelectableCard";
import { StepFooter } from "@/components/build/StepFooter";
import { useThemeEvent } from "@/components/providers/ThemeProvider";
import { useGiftBuilderStore } from "@/store/useGiftBuilderStore";

export default function EventPage() {
  const router = useRouter();
  const { setEventSlug } = useThemeEvent();
  const storeEvent = useGiftBuilderStore((s) => s.eventSlug);
  const setEvent = useGiftBuilderStore((s) => s.setEvent);
  const [local, setLocal] = useState<EventSlug | undefined>(storeEvent);

  const selected = local;

  const surprise = () => {
    const pick = EVENTS[Math.floor(Math.random() * EVENTS.length)]!.slug;
    setLocal(pick);
    setEvent(pick);
    setEventSlug(pick);
    router.push("/build/packaging");
  };

  const onPick = (slug: EventSlug) => {
    setLocal(slug);
    setEvent(slug);
    setEventSlug(slug);
  };

  const list = useMemo(() => EVENTS, []);

  return (
    <GlassPanel className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-2"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Step 1
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          What are we celebrating?
        </h1>
        <p className="max-w-prose text-sm leading-relaxed text-slate-600">
          Choose the heartbeat of this gift — we will tune packaging, picks, and
          gentle nudges to match.
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {list.map((e, i) => (
          <motion.div
            key={e.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.3 }}
          >
            <SelectableCard
              title={e.shortLabel}
              subtitle={e.description}
              selected={selected === e.slug}
              onSelect={() => onPick(e.slug)}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={surprise}
          className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-white/80 hover:bg-white/90"
        >
          Surprise me
        </button>
        <Link
          href="/#quick"
          className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
        >
          Browse quick gifts
        </Link>
      </div>

      <StepFooter
        backHref="/"
        nextHref="/build/packaging"
        nextDisabled={!selected}
      />
    </GlassPanel>
  );
}
