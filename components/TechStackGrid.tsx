"use client";

import { Code, Database, Dna, Figma, GitBranch, Server, Wind, Framer, Cloud, GitFork, Zap } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const technologies = [
  { name: "React", icon: Dna },
  { name: "Next.js", icon: Code },
  { name: "Node.js", icon: Server },
  { name: "TypeScript", icon: Code },
  { name: "Python", icon: Code },
  { name: "AWS", icon: Cloud },
  { name: "Docker", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "Tailwind CSS", icon: Wind },
  { name: "PostgreSQL", icon: Database },
  { name: "GraphQL", icon: GitBranch },
  { name: "Kubernetes", icon: Server },
  { name: "Figma", icon: Figma },
  { name: "Vercel", icon: Zap },
  { name: "Redis", icon: Database },
  { name: "Git", icon: GitFork },
  { name: "Framer Motion", icon: Framer },
  { name: "Sanity.io", icon: Code }, // Using Code as a generic icon for content platforms
  { name: "Stripe", icon: Code }, // Using Code as a generic icon for payment platforms
];

export default function TechStackGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {technologies.map((tech) => (
        <TiltCard
          key={tech.name}
          // Added a small class to ensure consistent height for all cards
          // This helps maintain a clean grid layout when content varies slightly
          // You can adjust this or remove if not needed based on final content
          className="h-full"
        >
          <div className="flex flex-col items-center justify-center p-6">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-iris-gradient text-white shadow-iris-sm">
              <tech.icon className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-center font-display text-base font-semibold text-ink">
              {tech.name}
            </h3>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}