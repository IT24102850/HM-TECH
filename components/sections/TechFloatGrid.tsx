"use client";

/**
 * TechFloatGrid - the stack.
 * Scroll: the grid arrives staggered, and the whole block carries a gentle
 * parallax against the section.
 * Idle: each tile floats on its own loop with a per-tile phase offset, so
 * the grid breathes instead of pulsing in unison.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiDocker,
  SiMongodb,
  SiTailwindcss,
  SiPostgresql,
  SiGraphql,
  SiKubernetes,
  SiFigma,
  SiVercel,
  SiRedis,
  SiGit,
  SiStripe,
} from "react-icons/si";
import { Cloud } from "lucide-react";

const tech = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "AWS", icon: Cloud },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Figma", icon: SiFigma },
  { name: "Vercel", icon: SiVercel },
  { name: "Git", icon: SiGit },
  { name: "Stripe", icon: SiStripe },
];

export default function TechFloatGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  // three depth bands drifting at different rates
  const yNear = useTransform(eased, [0, 1], [70, -70]);
  const yMid = useTransform(eased, [0, 1], [40, -40]);
  const yFar = useTransform(eased, [0, 1], [16, -16]);
  const bands = [yNear, yMid, yFar];

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4">
        {tech.map((t, i) => (
          <motion.div
            key={t.name}
            data-anim="tech-tile"
            style={{ y: bands[i % 3] }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: (i % 6) * 0.06 + Math.floor(i / 6) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 4.5 + (i % 5) * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 7) * 0.35,
              }}
              className="group card-surface flex flex-col items-center justify-center gap-3 py-7 transition-colors duration-500 hover:border-gold/30"
            >
              <t.icon className="h-6 w-6 text-iris-500 transition-colors duration-500 group-hover:text-gold md:h-7 md:w-7" />
              <span className="font-mono text-[9px] uppercase tracking-wide2 text-ink/40">
                {t.name}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
