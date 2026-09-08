"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
};

export default function Parallax({
  children,
  speed = 0.3,
  className = "",
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = direction === "up" ? -180 * speed : 180 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}