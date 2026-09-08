"use client";

/**
 * AnimatedHeadline - splits a headline into words and lifts each one out of a
 * clipped line with a slight 3D rotation, so the title assembles itself
 * instead of fading in as a block. Words listed in `highlight` get the brand
 * gradient.
 */

import { motion } from "framer-motion";

export default function AnimatedHeadline({
  text,
  highlight = [],
  className = "",
  delay = 0,
}: {
  text: string;
  highlight?: string[];
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const highlighted = new Set(highlight.map((w) => w.toLowerCase()));

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
      className={className}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isHot = highlighted.has(clean);
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              variants={{
                hidden: { y: "110%", opacity: 0, rotateX: -55 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  rotateX: 0,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={`inline-block ${isHot ? "text-gradient" : ""}`}
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}
