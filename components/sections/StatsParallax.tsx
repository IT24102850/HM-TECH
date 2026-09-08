"use client";

/**
 * StatsParallax - the numbers.
 * Scroll: each figure counts up once when it enters, and the four columns
 * drift at alternating rates so the row has depth rather than sitting flat.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 20, suffix: "+", label: "Clients served" },
  { value: 5, suffix: "+", label: "Years shipping" },
  { value: 24, suffix: "/7", label: "Support" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1700;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(eased * value));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <p
      ref={ref}
      data-anim="stat-value"
      className="font-display text-5xl font-light tabular-nums tracking-tight text-ink md:text-6xl"
    >
      {display}
      <span className="text-gold">{suffix}</span>
    </p>
  );
}

export default function StatsParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const yA = useTransform(eased, [0, 1], [60, -60]);
  const yB = useTransform(eased, [0, 1], [24, -24]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-10 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          data-anim="stat-col"
          style={{ y: i % 2 === 0 ? yA : yB }}
          className="text-center md:text-left"
        >
          <CountUp value={s.value} suffix={s.suffix} />
          <div className="rule-gold mt-5 max-w-[70px] md:mx-0" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide2 text-ink/40">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
