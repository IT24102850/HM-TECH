"use client";

/**
 * ServiceCards3D - the services grid.
 * Scroll: each card fades in, scales up from 0.92 and rises out of a slight
 * backward tilt, staggered across the row.
 * Hover: real 3D tilt toward the pointer with a specular glare, and the
 * content is pushed forward on Z so it separates from the surface.
 */

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/services";

function Card({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hover, setHover] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (0.5 - py) * 16, ry: (px - 0.5) * 16, mx: px * 100, my: py * 100 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
      }}
      className="group perspective h-full"
    >
      <motion.div
        data-anim="service-card"
        initial={{ opacity: 0, y: 56, scale: 0.92, rotateX: -14 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{
          duration: 0.9,
          delay: index * 0.13,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full"
      >
        <motion.div
          animate={{ rotateX: tilt.rx, rotateY: tilt.ry, z: hover ? 40 : 0 }}
          transition={{ type: "spring", stiffness: 210, damping: 18, mass: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
          className="card-surface relative h-full overflow-hidden p-8 transition-shadow duration-500 group-hover:shadow-iris md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(460px circle at ${tilt.mx}% ${tilt.my}%, rgba(139,92,246,0.20), rgba(217,180,106,0.06) 42%, transparent 70%)`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-gold/25 transition-opacity duration-700 group-hover:opacity-100"
          />
          <div className="relative" style={{ transform: "translateZ(46px)" }}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ServiceCards3D() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {services.slice(0, 6).map((s, i) => (
        <Card key={s.title} index={i}>
          <span className="font-mono text-[10px] uppercase tracking-wide2 text-gold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="mt-7 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
            <s.icon className="h-5 w-5 text-iris-500" />
          </div>
          <h3 className="mt-7 font-display text-xl font-medium tracking-tight text-ink">
            {s.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/45">{s.copy}</p>
        </Card>
      ))}
    </div>
  );
}
