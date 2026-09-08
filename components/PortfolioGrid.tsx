"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Cpu } from "lucide-react";
import { portfolioProjects } from "./portfolioData";

const industries = ["All", ...new Set(portfolioProjects.map((project) => project.industry))];

export default function PortfolioGrid() {
  const [activeIndustry, setActiveIndustry] = useState("All");
  const visibleProjects = portfolioProjects.filter(
    (project) => activeIndustry === "All" || project.industry === activeIndustry,
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" aria-label="Filter portfolio by industry">
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => setActiveIndustry(industry)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeIndustry === industry
                ? "border-iris-700 bg-iris-700 text-white"
                : "border-iris-200 bg-white text-ink/65 hover:border-iris-400 hover:text-ink"
            }`}
          >
            {industry}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {visibleProjects.map((project) => (
          <article key={project.name} className="card-surface overflow-hidden">
            <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${project.accent}`}>
              <img
                src={project.image}
                alt={`${project.name} project preview`}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
                onLoad={(event) => event.currentTarget.classList.add("opacity-100")}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative flex h-full flex-col justify-between p-7 text-white">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
                    {project.industry}
                  </span>
                  <Cpu className="h-6 w-6 text-white/70" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/65">{project.tagline}</p>
                  <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">{project.name}</h2>
                </div>
              </div>
            </div>

            <div className="p-7">
              <p className="text-sm leading-relaxed text-ink/65">{project.description}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">Services</h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink/70">
                    {project.services.map((service) => <li key={service}>{service}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">Technology</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technology.map((technology) => (
                      <span key={technology} className="rounded-md bg-iris-50 px-2.5 py-1 text-xs font-medium text-iris-800">{technology}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-iris-100 pt-5">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">Key features</h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {project.features.map((feature) => (
                    <span key={feature} className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                      <Check className="h-3.5 w-3.5 text-iris-600" /> {feature}
                    </span>
                  ))}
                </div>
              </div>
              <button type="button" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-iris-700 transition-colors hover:text-iris-900">
                Explore project <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}