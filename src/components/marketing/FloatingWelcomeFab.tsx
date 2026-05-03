"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FloatingWelcomeFab() {
  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 right-4 z-40 md:bottom-10 md:right-8"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.35 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-auto"
      >
        <Link
          href="/build/event"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0f172a] bg-yellow-300 text-2xl shadow-[0_8px_0_#0f172a] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          aria-label="Start building a gift"
          title="Start building a gift"
        >
          <span aria-hidden>🎁</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
