"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { portfolioProjects } from "./portfolioData";
import Reveal from "./Reveal";

const filters = ["All", ...portfolioProjects.map((project) => project.industryShort)];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = portfolioProjects.filter(
    (project) => activeFilter === "All" || project.industryShort === activeFilter,
  );

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-2" aria-label="Filter portfolio by industry">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              activeFilter === filter
                ? "border-transparent bg-iris-gradient text-white shadow-iris-sm"
                : "border-iris-200 bg-white text-ink/60 hover:border-iris-400 hover:text-ink"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {visibleProjects.map((project, i) => (
          <Reveal key={project.slug} direction="up" delay={(i % 2) * 0.1} className="h-full">
            <article className="card-surface group flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-iris">
              {/* The marks are dark artwork on white, so the plate stays light
                  even on the dark stage — multiply then merges each logo's own
                  off-white ground into the tint instead of showing a box. */}
              <div className="relative h-72 overflow-hidden bg-white">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
                {/* Portrait art needs an explicitly sized box to letterbox
                    inside; percentage max-* lets tall logos overflow and clip. */}
                <div className="absolute inset-0 px-6 pb-6 pt-14">
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    loading="lazy"
                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <span className="absolute left-5 top-5 rounded-full border border-charcoal/15 bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal backdrop-blur-sm">
                  {project.industry}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-iris-600">
                  {project.tagline}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
                  {project.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">{project.description}</p>

                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">
                      Services
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-ink/70">
                      {project.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">
                      Technology
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technology.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md bg-iris-50 px-2.5 py-1 text-xs font-medium text-iris-800"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-iris-100 pt-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">
                    Key features
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {project.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                        <Check className="h-3.5 w-3.5 shrink-0 text-iris-600" /> {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-iris-700 transition-colors hover:text-iris-900"
                >
                  Build something like {project.name}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
