"use client";

/**
 * ScrollProgress - a thin gradient bar pinned to the top of the viewport that
 * tracks how far through the page you are. Doubles as a cue that the 3D scene
 * behind the page is scroll-driven.
 */

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-iris-gradient shadow-[0_0_18px_rgba(139,92,246,0.9)]"
    />
  );
}
