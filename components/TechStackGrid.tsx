"use client";

<<<<<<< Updated upstream
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
  SiFramer,
  SiStripe,
} from "react-icons/si";
import { Cloud } from "lucide-react";
import type { IconType } from "react-icons";
import TiltCard from "@/components/TiltCard";

type Technology = {
  name: string;
  icon: IconType;
  color: string;
};

const technologies: Technology[] = [
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
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
];

export default function TechStackGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {technologies.map((tech) => (
        <TiltCard key={tech.name} className="h-full">
          <div className="flex flex-col items-center justify-center p-6">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-iris-sm ring-1 ring-iris-100 md:h-16 md:w-16">
              <tech.icon className="h-7 w-7 md:h-8 md:w-8" style={{ color: tech.color }} />
            </div>
            <h3 className="mt-4 text-center font-display text-sm font-semibold text-ink md:text-base">
              {tech.name}
            </h3>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}
=======
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { categories, technologies } from "@/lib/technologies";

type Filter = (typeof categories)[number] | "All";

export default function TechStackGrid() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? technologies
        : technologies.filter((t) => t.category === active),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5">
        <button
          onClick={() => setActive("All")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === "All"
              ? "border-iris-600 bg-iris-gradient text-white shadow-iris-sm"
              : "border-iris-200 bg-white text-ink/70 hover:border-iris-400"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === c
                ? "border-iris-600 bg-iris-gradient text-white shadow-iris-sm"
                : "border-iris-200 bg-white text-ink/70 hover:border-iris-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((tech) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TiltCard>
                <div className="flex h-full flex-col items-center justify-center gap-4 py-4">
                  <Icon className="h-10 w-10 text-iris-600" />
                  <span className="text-sm font-medium text-ink">{tech.name}</span>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
>>>>>>> Stashed changes
