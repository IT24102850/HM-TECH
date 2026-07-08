"use client";

import { Code, Database, Dna, Figma, GitBranch, Server, Wind } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const technologies = [
  { name: "React", icon: Dna },
  { name: "Next.js", icon: Code },
  { name: "Node.js", icon: Server },
  { name: "TypeScript", icon: Code },
  { name: "Python", icon: Code },
  { name: "AWS", icon: Server },
  { name: "Docker", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "Tailwind CSS", icon: Wind },
  { name: "PostgreSQL", icon: Database },
  { name: "GraphQL", icon: GitBranch },
  { name: "Kubernetes", icon: Server },
  { name: "Figma", icon: Figma },
];

export default function TechStackGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {technologies.map((tech) => (
        <TiltCard key={tech.name}>
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
      <TiltCard>
        <div className="flex flex-col items-center justify-center p-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-iris-50 to-iris-100 text-iris-400">
            <span className="font-bold text-2xl">?</span>
          </div>
          <h3 className="mt-4 text-center font-display text-base font-semibold text-ink">
            And more...
          </h3>
        </div>
      </TiltCard>
    </div>
  );
}