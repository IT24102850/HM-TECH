"use client";

/**
 * MagneticButton - the pointer pulls the element toward it inside a small
 * radius, then it springs back on leave. Wraps a link or a button without
 * changing its markup.
 */

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.35,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = href ? (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      <motion.div style={{ x: sx, y: sy }} className="inline-block">
        {inner}
      </motion.div>
    </div>
  );
}
