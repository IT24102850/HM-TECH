"use client";

import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, Smartphone, Code2 } from "lucide-react";
import CubeField from "@/components/CubeField";

export default function HeroVisual() {
  return (
    <div className="relative h-[440px] w-full md:h-[580px]">
      {/* 3D cube backdrop */}
      <div className="absolute inset-0 opacity-90">
        <CubeField />
      </div>

      {/* Floating dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute left-2 top-6 w-[190px] rounded-2xl border border-iris-100 bg-white/90 p-4 shadow-iris backdrop-blur-md sm:left-6 sm:top-10 sm:w-[210px]"
        style={{ animation: "float 7s ease-in-out infinite" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-iris-500">Dashboard</span>
          <TrendingUp className="h-3.5 w-3.5 text-iris-600" />
        </div>
        <p className="mt-2 font-display text-xl font-semibold text-ink">$94,540</p>
        <div className="mt-3 flex items-end gap-1.5">
          {[40, 65, 30, 80, 55, 95, 70].map((h, i) => (
            <div
              key={i}
              className="w-2.5 rounded-full bg-iris-gradient"
              style={{ height: `${h * 0.4}px` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating code card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 7 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        className="absolute bottom-16 left-0 w-[170px] rounded-2xl border border-iris-100 bg-ink/95 p-4 shadow-iris backdrop-blur-md sm:bottom-24 sm:w-[190px]"
        style={{ animation: "float 8s ease-in-out infinite 0.5s" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <div className="mt-3 space-y-1.5 font-mono text-[9px] leading-relaxed text-iris-200">
          <p><span className="text-iris-400">const</span> app = build();</p>
          <p className="text-white/40">// shipping premium UI</p>
          <p><span className="text-iris-400">await</span> app.deploy();</p>
        </div>
      </motion.div>

      {/* Floating AI badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        className="absolute right-2 top-1/3 grid h-16 w-16 place-items-center rounded-2xl bg-iris-gradient shadow-iris sm:right-8 sm:h-20 sm:w-20"
        style={{ animation: "float 6s ease-in-out infinite 0.2s" }}
      >
        <BrainCircuit className="h-7 w-7 text-white sm:h-9 sm:w-9" />
      </motion.div>

      {/* Floating device */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
        className="absolute bottom-8 right-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-iris-100 bg-white shadow-iris-sm sm:right-10 sm:h-16 sm:w-16"
        style={{ animation: "float 6.5s ease-in-out infinite 0.8s" }}
      >
        <Smartphone className="h-6 w-6 text-iris-600 sm:h-7 sm:w-7" />
      </motion.div>

      {/* Small coding chip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        className="absolute right-16 top-6 grid h-11 w-11 place-items-center rounded-xl border border-iris-100 bg-white shadow-iris-sm sm:right-24 sm:top-10"
        style={{ animation: "float 5.5s ease-in-out infinite 1s" }}
      >
        <Code2 className="h-5 w-5 text-iris-600" />
      </motion.div>
    </div>
  );
}
