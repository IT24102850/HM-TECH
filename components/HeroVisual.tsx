"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Smartphone } from "lucide-react";
import Laptop3D from "./Laptop3D";

export default function HeroVisual() {
  return (
    <div className="relative h-[420px] w-full md:h-[560px]">
      <Laptop3D />

      {/* Floating Code Editor */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="absolute -right-6 top-12 hidden w-64 rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl md:block"
        style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.4)" }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <div className="font-mono text-xs text-white/50">app.tsx</div>
        </div>
        <div className="mt-3 space-y-1.5 font-mono text-xs text-emerald-400">
          {["const project = {", "  team: 'HM Tech',", "  status: 'deployed',", "  ai: true", "}"].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 4,
                duration: 0.2,
              }}
            >
              <span style={{ textShadow: "0 0 8px currentColor" }}>{line}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.9, 1, 0.9],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.2 }}
        className="absolute -left-4 top-1/3 hidden md:block"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/80 bg-gradient-to-br from-violet-600 to-fuchsia-600 p-1 shadow-xl">
          <BrainCircuit className="h-10 w-10 text-white" />
        </div>
      </motion.div>

      {/* Device Sync Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          y: [0, -12, 0],
          opacity: 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute bottom-12 -right-4 hidden w-44 rounded-3xl border border-white/10 bg-zinc-900/90 p-4 shadow-xl backdrop-blur md:block"
      >
        <div className="flex items-center gap-3">
          <Smartphone className="h-8 w-8 text-violet-400" />
          <div>
            <div className="text-sm font-medium text-white">Mobile Sync</div>
            <div className="text-xs text-white/60">Live &bull; 4 devices</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}