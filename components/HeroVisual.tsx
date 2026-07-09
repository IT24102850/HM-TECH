"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BrainCircuit, Smartphone } from "lucide-react";

// The 3D canvas is client-only and fairly heavy — load it lazily so it
// never touches the server render, and doesn't block the rest of the hero.
const Laptop3D = dynamic(() => import("@/components/Laptop3D"), {
  ssr: false,
});

const codeLines = [
  { text: "const build = () => {", color: "#8B5CF6" },
  { text: "  deploy(app).then(", color: "#E5E7EB" },
  { text: "    () => scale(∞)", color: "#34D399" },
  { text: "  );", color: "#E5E7EB" },
];

function CodeEditorCard({ reduceMotion }: { reduceMotion: boolean }) {
  const container: Variants = {
    animate: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.35,
        repeat: reduceMotion ? 0 : Infinity,
        repeatDelay: reduceMotion ? 0 : 1.6,
      },
    },
  };
  const line: Variants = {
    initial: { opacity: reduceMotion ? 1 : 0.15, x: reduceMotion ? 0 : -8 },
    animate: {
      opacity: [reduceMotion ? 1 : 0.15, 1, 1, reduceMotion ? 1 : 0.15],
      x: [reduceMotion ? 0 : -8, 0, 0, reduceMotion ? 0 : -8],
      transition: { duration: reduceMotion ? 0 : 3.2, ease: "easeInOut" },
    },
  };

  return (
    <div
      className="absolute -left-4 top-8 hidden w-52 rounded-xl bg-zinc-900/95 p-3 shadow-iris backdrop-blur sm:block md:-left-8 md:top-16"
      aria-hidden="true"
    >
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
      </div>
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="space-y-1 font-mono text-[10.5px] leading-relaxed"
      >
        {codeLines.map((l, i) => (
          <motion.div key={i} variants={line} style={{ color: l.color }}>
            {l.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function AIBadge({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      className="absolute -right-2 top-2 hidden sm:block md:right-2"
      aria-hidden="true"
    >
      <div className="relative grid h-14 w-14 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-iris-gradient"
          initial={{ opacity: 0.4, scale: reduceMotion ? 1 : 0.85 }}
          animate={
            reduceMotion
              ? { opacity: 0.4, scale: 1 }
              : { opacity: [0.4, 0.05, 0.4], scale: [0.85, 1.35, 0.85] }
          }
          transition={{
            duration: reduceMotion ? 0 : 2.6,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="relative grid h-14 w-14 place-items-center rounded-full bg-iris-gradient shadow-iris">
          <BrainCircuit className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function DeviceCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="absolute bottom-6 right-4 hidden rounded-2xl border border-iris-100 bg-white/95 p-3 shadow-iris-sm backdrop-blur sm:block md:bottom-10 md:right-0"
      aria-hidden="true"
      initial={{ y: reduceMotion ? 0 : 6 }}
      animate={reduceMotion ? { y: 0 } : { y: [6, -6, 6] }}
      transition={{
        duration: reduceMotion ? 0 : 5,
        repeat: reduceMotion ? 0 : Infinity,
        ease: "easeInOut",
        delay: reduceMotion ? 0 : 1.1,
      }}
    >
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-iris-100">
        <Smartphone className="h-4.5 w-4.5 text-iris-700" />
      </div>
    </motion.div>
  );
}

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = Boolean(prefersReducedMotion);

  return (
    <div className="relative h-[440px] w-full md:h-[580px]">
      {/* 3D canvas — kept at full height on tablet+, shorter on phones via
          the container above so it doesn't dominate the mobile viewport. */}
      <div className="absolute inset-0">
        <Laptop3D />
      </div>

      <CodeEditorCard reduceMotion={reduceMotion} />
      <AIBadge reduceMotion={reduceMotion} />
      <DeviceCard reduceMotion={reduceMotion} />
    </div>
  );
}