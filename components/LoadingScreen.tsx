"use client";

/**
 * LoadingScreen - a short black-out with a counting percentage and an
 * expanding ring, so the WebGL layer has a beat to compile shaders before the
 * hero is revealed. Exits by wiping upward.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 1600;
/** Hard cutoff: the overlay is gone by now no matter what. */
const HARD_DISMISS = DURATION + 1100;

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  /** Removes the overlay from the tree outright, bypassing the exit animation. */
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setIsLoading(false);
      }
    };

    frame = requestAnimationFrame(tick);

    /* This overlay sits at z-100 across the whole viewport, so while it is
       mounted it swallows every click on the site. It used to be dismissed
       only by the rAF loop above, and its exit animation needs rAF as well -
       so anything that stalls rAF (a background tab, an occluded window, a
       long shader compile) left an invisible sheet over the page and nothing
       was clickable. Timers keep running in those conditions, so they, not
       animation frames, are what guarantee the overlay goes away. */
    const soft = window.setTimeout(() => setIsLoading(false), DURATION + 120);
    const hard = window.setTimeout(() => setRemoved(true), HARD_DISMISS);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(soft);
      window.clearTimeout(hard);
    };
  }, []);

  if (removed) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            // Stop intercepting clicks the instant the wipe starts, rather
            // than when it finishes.
            pointerEvents: "none",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] grid place-items-center bg-paper"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_65%)] blur-2xl" />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative grid place-items-center"
            >
              {/* expanding rings */}
              <motion.span
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute h-24 w-24 rounded-full border border-iris-300"
              />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute h-20 w-20 rounded-full border-2 border-transparent border-t-iris-600 border-r-gold"
              />
              <img
                src="/favicon_io/android-chrome-512x512.png"
                alt=""
                className="relative z-10 h-11 w-11"
              />
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-iris-600">
                Innovate. Build. Transform.
              </p>
              <p className="font-display text-3xl font-semibold text-gradient tabular-nums">
                {progress}%
              </p>
              <div className="h-px w-48 overflow-hidden bg-iris-100">
                <motion.div
                  className="h-full bg-iris-gradient"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
