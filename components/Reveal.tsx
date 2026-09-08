"use client";

/**
 * Reveal - one scroll-entrance primitive used across every section, so the
 * whole page animates with a single consistent motion language instead of
 * ad-hoc transitions per component.
 */

import { motion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "flip";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
  scale: {},
  flip: {},
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
      scale: direction === "scale" ? 0.9 : 1,
      rotateX: direction === "flip" ? -35 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const inner = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-70px" }}
      variants={variants}
      className={direction === "flip" ? "h-full" : className}
      style={direction === "flip" ? { transformStyle: "preserve-3d" } : undefined}
    >
      {children}
    </motion.div>
  );

  // Perspective has to live on the PARENT for a child's rotateX to read as
  // depth rather than a flat squash, so flip gets its own wrapper.
  if (direction === "flip") {
    return (
      <div className={className} style={{ perspective: 1100 }}>
        {inner}
      </div>
    );
  }

  return inner;
}

/** Staggers a list of children through the same entrance. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
