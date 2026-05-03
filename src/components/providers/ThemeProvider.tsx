"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { EventDef, EventSlug } from "@/lib/catalog";
import { getEvent } from "@/lib/catalog";

type ThemeContextValue = {
  event?: EventDef;
  setEventSlug: (slug?: EventSlug) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [eventSlug, setEventSlugState] = useState<EventSlug | undefined>();

  const setEventSlug = useCallback((slug: EventSlug | undefined) => {
    setEventSlugState(slug);
  }, []);

  const value = useMemo(() => {
    const event = eventSlug ? getEvent(eventSlug) : undefined;
    return { event, setEventSlug };
  }, [eventSlug, setEventSlug]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeEvent() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeEvent must be used within ThemeProvider");
  }
  return ctx;
}
