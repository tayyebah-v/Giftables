"use client";

import { useEffect } from "react";

/**
 * Registers a minimal service worker in production for installable / offline shell.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
      } catch {
        // Non-fatal: hosting or HTTPS requirements may block registration.
      }
    };

    void register();
  }, []);

  return null;
}
