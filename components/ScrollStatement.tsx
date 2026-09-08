"use client";

/**
 * ScrollStatement - a line of copy that is scrubbed by scroll position rather
 * than played on a timer. Each word darkens as the section crosses the
 * viewport, so the reader drives the animation and it runs backwards when
 * they scroll up.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export default function ScrollStatement({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.28"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={`flex flex-wrap justify-center font-display text-2xl font-semibold leading-[1.35] tracking-tight text-ink sm:text-3xl md:text-4xl ${className}`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
