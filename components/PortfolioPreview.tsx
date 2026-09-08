"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "./portfolioData";
import Reveal from "./Reveal";

/**
 * Compact product wall for the home page. Full detail (services, features,
 * stack, industry filtering) lives on /portfolio — this is the teaser.
 */
export default function PortfolioPreview() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {portfolioProjects.map((project, i) => (
        <Reveal key={project.slug} direction="up" delay={(i % 4) * 0.08} className="h-full">
          <Link
            href="/portfolio"
            aria-label={`${project.name} — ${project.industry}`}
            className="card-surface group flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-iris"
          >
            <div className="relative h-44 overflow-hidden bg-white">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
              <div className="absolute inset-0 p-5">
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  loading="lazy"
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">
                {project.industryShort}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                {project.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{project.tagline}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View project <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
