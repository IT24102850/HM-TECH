"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { IconType } from "react-icons";
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

type Technology = {
  name: string;
  icon: IconType;
  color: string;
};

const tech: Technology[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#0A0A14" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "AWS", icon: Cloud, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Vercel", icon: SiVercel, color: "#0A0A14" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
];

export default function TechFloatGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  // ONE parallax offset for the whole grid. Giving each tile its own band
  // pulled the rows apart, so a row of icons sat at six different heights and
  // read as a broken layout rather than as depth. The separation that sells
  // depth belongs between the grid and the section behind it.
  const y = useTransform(eased, [0, 1], [42, -42]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ y }}
        className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4"
      >
        {tech.map((technology, index) => (
          <motion.div
            key={technology.name}
            data-anim="tech-tile"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: (index % 6) * 0.06 + Math.floor(index / 6) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* gentle idle float, small enough that a row still reads as a row */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4.5 + (index % 5) * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 7) * 0.35,
              }}
              className="group card-surface flex min-h-36 flex-col items-center justify-center gap-3 px-3 py-6 transition-colors duration-500 hover:border-gold/50"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-iris-sm ring-1 ring-iris-100 transition-transform duration-500 group-hover:scale-105 md:h-14 md:w-14">
                <technology.icon
                  className="h-6 w-6 md:h-7 md:w-7"
                  style={{ color: technology.color }}
                />
              </span>
              <span className="text-center font-display text-xs font-semibold text-ink/75 md:text-sm">
                {technology.name}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
