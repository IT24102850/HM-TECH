"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This timer simulates an initial asset loading period.
    // After 1.5 seconds, the loading screen will start its exit animation.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-paper"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-4"
          >
            <div className="absolute -inset-4 rounded-full bg-iris-500/10 blur-2xl" />

            {/* Logo - now on top */}
            <img
              src="/favicon_io/android-chrome-512x512.png"
              alt="Loading Logo"
              className="relative z-10 h-12 w-12"
            />

            {/* Spinner - now below the logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              className="relative h-14 w-14 rounded-full border-4 border-iris-200 border-t-iris-600"
              role="status"
              aria-label="Loading"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}