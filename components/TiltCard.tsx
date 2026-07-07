"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 14;
    const rx = (0.5 - py) * 14;
    setStyle({ rx, ry, mx: px * 100, my: py * 100 });
  }

  function onLeave() {
    setStyle({ rx: 0, ry: 0, mx: 50, my: 50 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group [perspective:1200px] ${className}`}
    >
      <motion.div
        animate={{ rotateX: style.rx, rotateY: style.ry }}
        transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
          background: `radial-gradient(500px circle at ${style.mx}% ${style.my}%, rgba(139,92,246,0.10), transparent 65%)`,
        }}
        className="card-surface relative h-full overflow-hidden p-7 transition-shadow duration-300 group-hover:shadow-iris"
      >
        {children}
      </motion.div>
    </div>
  );
}
