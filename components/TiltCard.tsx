"use client";

/**
 * TiltCard - a glass panel that tilts toward the pointer in real 3D, lifts
 * off the page, and carries a specular glare that tracks the cursor. Content
 * is pushed forward on the Z axis so it separates from the surface instead of
 * looking painted on.
 */

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  intensity = 14,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hover, setHover] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setStyle({
      rx: (0.5 - py) * intensity,
      ry: (px - 0.5) * intensity,
      mx: px * 100,
      my: py * 100,
    });
  }

  function onLeave() {
    setStyle({ rx: 0, ry: 0, mx: 50, my: 50 });
    setHover(false);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      className={`group perspective ${className}`}
    >
      <motion.div
        animate={{
          rotateX: style.rx,
          rotateY: style.ry,
          z: hover ? 34 : 0,
        }}
        transition={{ type: "spring", stiffness: 210, damping: 18, mass: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        className="card-surface relative h-full overflow-hidden p-7 transition-shadow duration-500 group-hover:shadow-iris"
      >
        {/* pointer-tracking glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${style.mx}% ${style.my}%, rgba(139,92,246,0.2), rgba(217,180,106,0.06) 42%, transparent 68%)`,
          }}
        />
        {/* edge highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-gold/25 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative" style={{ transform: "translateZ(42px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
