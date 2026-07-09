"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
            className="relative"
          >
            <div className="absolute -inset-4 rounded-full bg-iris-500/10 blur-2xl" />
            <Image src="/logo.png" alt="HM Tech Logo" width={160} height={82} priority className="relative h-16 w-auto md:h-20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}