"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Smartphone, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import Laptop3D from "./Laptop3D";

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation variants that respect reduced motion
  const floatAnimation = prefersReducedMotion 
    ? { y: 0 }
    : {
        y: [0, -12, 0],
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }
      };

  const pulseAnimation = prefersReducedMotion
    ? { scale: 1, opacity: 1 }
    : {
        scale: [1, 1.12, 1],
        opacity: [0.9, 1, 0.9],
        transition: {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };

  return (
    <div className="relative h-[460px] w-full md:h-[640px] overflow-hidden">
      {/* Main 3D Laptop */}
      <Laptop3D />

      {/* Floating Code Editor - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute left-4 top-8 hidden w-64 rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl md:block"
        style={{ boxShadow: "0 30px 60px -15px rgb(0 0 0 / 0.5)" }}
      >
        <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-2.5">
          <Code2 className="h-4 w-4 text-violet-400" />
          <div className="font-mono text-[10px] text-white/60">hero-visual.tsx</div>
        </div>
        <div className="space-y-1 font-mono text-[12px] text-emerald-300">
          {[
            "const experience = {",
            "  type: 'immersive',",
            "  laptop: 'rotating',",
            "  ai: true",
            "};"
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15 }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Processing Badge */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={pulseAnimation}
        className="absolute -left-4 top-[35%] z-10 hidden md:block"
      >
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-20 blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-2xl">
            <BrainCircuit className="h-8 w-8 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Device Sync Card - Right Side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={floatAnimation}
        className="absolute bottom-12 right-4 hidden w-44 rounded-2xl border border-white/10 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-xl md:block"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 p-2.5">
            <Smartphone className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="text-base font-semibold text-white">Synced Live</div>
            <div className="text-xs text-emerald-400">4 devices connected</div>
            <div className="mt-1 h-1 w-12 rounded bg-emerald-500" />
          </div>
        </div>
      </motion.div>

      {/* Subtle glow ring around laptop area */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial gradient behind the laptop for a subtle glow */}
        <div className="absolute inset-0 bg-iris-radial opacity-50" />
      </div>
    </div>
  );
}