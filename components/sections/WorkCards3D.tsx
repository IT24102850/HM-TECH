"use client";

/**
 * WorkCards3D - featured work.
 * Depth: each card is composed of separate layers (glow, panel, logo, type)
 * that sit at different Z offsets, so the hover tilt moves them by different
 * amounts and the card reads as a real object rather than a flat image.
 * Scroll: cards arrive in a staggered rise, and alternate columns drift at
 * different rates.
 */

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/components/portfolioData";

function WorkCard({ index, project }: { index: number; project: (typeof portfolioProjects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hover, setHover] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (0.5 - py) * 13, ry: (px - 0.5) * 13, mx: px * 100, my: py * 100 });
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
      className="group perspective"
    >
      <motion.div
        data-anim="work-card"
        initial={{ opacity: 0, y: 70, rotateX: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.article
          animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
          transition={{ type: "spring", stiffness: 190, damping: 19, mass: 0.7 }}
          style={{ transformStyle: "preserve-3d" }}
          className="card-surface relative overflow-hidden p-6 transition-shadow duration-500 group-hover:shadow-iris"
        >
          {/* layer 1 — accent wash, sits deepest */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70`}
            style={{ transform: "translateZ(0px)" }}
          />
          {/* layer 2 — pointer glare */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at ${tilt.mx}% ${tilt.my}%, rgba(168,132,47,0.12), transparent 65%)`,
              transform: "translateZ(12px)",
            }}
          />

          {/* layer 3 — logo panel */}
          <div
            className="relative grid h-40 place-items-center overflow-hidden rounded-xl border border-iris-100 bg-iris-50/70"
            style={{ transform: `translateZ(${hover ? 46 : 26}px)`, transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)" }}
          >
            <Image
              src={project.logo}
              alt={project.name}
              width={220}
              height={120}
              className="max-h-24 w-auto object-contain opacity-90 transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </div>

          {/* layer 4 — type, closest to the viewer */}
          <div
            className="relative mt-6"
            style={{ transform: `translateZ(${hover ? 64 : 36}px)`, transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)" }}
          >
            <p className="font-mono text-[9px] uppercase tracking-wide2 text-gold">
              {project.industryShort}
            </p>
            <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink">
              {project.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/45">
              {project.tagline}
            </p>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}

export default function WorkCards3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const yA = useTransform(eased, [0, 1], [50, -50]);
  const yB = useTransform(eased, [0, 1], [14, -14]);

  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {portfolioProjects.slice(0, 6).map((p, i) => (
          <motion.div key={p.slug} style={{ y: i % 2 === 0 ? yA : yB }}>
            <WorkCard index={i} project={p} />
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link href="/portfolio" className="btn-ghost">
          All work <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
