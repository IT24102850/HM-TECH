import {
  Boxes,
  Cloud,
  Code,
  Database,
  Figma,
  Layers,
  Server,
  Wind,
  type LucideIcon,
} from "lucide-react";

export type TechCategory =
  | "Frontend"
  | "Backend & Languages"
  | "Cloud & DevOps"
  | "Databases";

export type Technology = {
  name: string;
  icon: LucideIcon;
  category: TechCategory;
};

export const technologies: Technology[] = [
  // Frontend
  {
    name: "React",
    icon: Code,
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: Layers,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: Code,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: Wind,
    category: "Frontend",
  },
  {
    name: "Figma",
    icon: Figma,
    category: "Frontend",
  },
  // Backend & Languages
  {
    name: "Node.js",
    icon: Server,
    category: "Backend & Languages",
  },
  {
    name: "Python",
    icon: Code,
    category: "Backend & Languages",
  },
  {
    name: "GraphQL",
    icon: Code,
    category: "Backend & Languages",
  },
  // Cloud & DevOps
  {
    name: "AWS",
    icon: Cloud,
    category: "Cloud & DevOps",
  },
  {
    name: "Docker",
    icon: Boxes,
    category: "Cloud & DevOps",
  },
  {
    name: "Kubernetes",
    icon: Boxes,
    category: "Cloud & DevOps",
  },
  // Databases
  {
    name: "MongoDB",
    icon: Database,
    category: "Databases",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    category: "Databases",
  },
];

export const categories: TechCategory[] = [
  "Frontend",
  "Backend & Languages",
  "Cloud & DevOps",
  "Databases",
];