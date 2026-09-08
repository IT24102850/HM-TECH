"use client";

/**
 * ParallaxLayer - one depth plane inside a section.
 * ------------------------------------------------------------------
 * Give background, mid-ground and foreground layers different `speed`
 * values and they separate as the section crosses the viewport, which is
 * what reads as depth. Negative speed moves against the scroll.
 *
 * Optional `scaleFrom` and `rotate` let a layer also creep in scale or tilt,
 * which sells parallax on large hero imagery.
 * ------------------------------------------------------------------
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ParallaxLayer({
  children,
  speed = 0.2,
  scaleFrom,
  rotate = 0,
  className = "",
  smooth = true,
}: {
  children: React.ReactNode;
  /** Fraction of the section's travel. 0.3 moves 30% of the scroll distance. */
  speed?: number;
  /** e.g. 1.15 starts slightly enlarged and settles to 1. */
  scaleFrom?: number;
  /** degrees of tilt applied across the travel */
  rotate?: number;
  className?: string;
  smooth?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const eased = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });
  const progress = smooth ? eased : scrollYProgress;

  const distance = 260 * speed;
  const y = useTransform(progress, [0, 1], [distance, -distance]);
  const scale = useTransform(
    progress,
    [0, 1],
    [scaleFrom ?? 1, scaleFrom ? 1 : 1]
  );
  const rotateZ = useTransform(progress, [0, 1], [rotate, -rotate]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ y, scale, rotateZ }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
