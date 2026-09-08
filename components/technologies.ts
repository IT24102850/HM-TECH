import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiAmazon,
  SiDocker,
  SiMongodb,
  SiTailwindcss,
  SiPostgresql,
  SiGraphql,
  SiKubernetes,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";

export const categories = ["Frontend", "Backend", "Cloud & DevOps", "Data", "Design"] as const;

export type Technology = {
  name: string;
  category: (typeof categories)[number];
  icon: IconType;
};

export const technologies: Technology[] = [
  { name: "React", category: "Frontend", icon: SiReact },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss },
  { name: "Node.js", category: "Backend", icon: SiNodedotjs },
  { name: "Python", category: "Backend", icon: SiPython },
  { name: "GraphQL", category: "Backend", icon: SiGraphql },
  { name: "PostgreSQL", category: "Data", icon: SiPostgresql },
  { name: "MongoDB", category: "Data", icon: SiMongodb },
  { name: "AWS", category: "Cloud & DevOps", icon: SiAmazon },
  { name: "Docker", category: "Cloud & DevOps", icon: SiDocker },
  { name: "Kubernetes", category: "Cloud & DevOps", icon: SiKubernetes },
  { name: "Figma", category: "Design", icon: SiFigma },
];