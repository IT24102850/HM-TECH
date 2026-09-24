import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import FilmCaptions from "@/components/cinematic/FilmCaptions";
import ParallaxLayer from "@/components/ParallaxLayer";
import StatsParallax from "@/components/sections/StatsParallax";
import ServiceCards3D from "@/components/sections/ServiceCards3D";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TechFloatGrid from "@/components/sections/TechFloatGrid";
import WorkCards3D from "@/components/sections/WorkCards3D";
import FinalCTA from "@/components/sections/FinalCTA";

/** Shared section header, kept quiet: an index, a rule, very few words. */
function SectionHead({
  index,
  eyebrow,
  title,
  href,
  cta,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div className="max-w-xl">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-wide2 text-gold">
            {index}
          </span>
          <span className="h-px w-10 bg-gold/40" />
          <span className="font-mono text-[10px] uppercase tracking-wide2 text-ink/35">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-7 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
      </div>
      {href && cta && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-ink/50 transition-colors hover:text-gold md:inline-flex"
        >
          {cta}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ══════════════ THE FILM ══════════════
          Four acts pinned against one tall element: orbit, macro glide,
          exploded assembly, atmosphere. The WebGL stage behind the page
          reads this element's scroll position and poses itself to match. */}
      <FilmCaptions />

      {/* ══════════════ STATS ══════════════ */}
      <section id="stats" className="container-px relative mx-auto max-w-7xl border-y border-iris-100 py-20">
        <StatsParallax />
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section id="services" className="section-py container-px relative mx-auto max-w-7xl">
        {/* background depth layer, moves fastest */}
        <ParallaxLayer
          speed={0.5}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-[6%] top-10 h-64 w-64 rounded-full bg-iris-300/30 blur-3xl" />
          <div className="absolute right-[10%] top-40 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.12}>
          <SectionHead
            index="04"
            eyebrow="Capability"
            title="What we build."
            href="/services"
            cta="All services"
          />
        </ParallaxLayer>

        <div className="mt-16">
          <ServiceCards3D />
        </div>
      </section>

      {/* ══════════════ PROCESS ══════════════ */}
      <section id="process" className="section-py container-px relative mx-auto max-w-7xl">
        <ParallaxLayer
          speed={0.4}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="bg-grid absolute inset-0 opacity-50" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.1}>
          <SectionHead
            index="05"
            eyebrow="Method"
            title="Innovate. Build. Transform."
          />
        </ParallaxLayer>

        <div className="mt-20">
          <ProcessSteps />
        </div>
      </section>

      {/* ══════════════ TECHNOLOGY ══════════════ */}
      <section id="technologies" className="section-py container-px relative mx-auto max-w-7xl">
        <ParallaxLayer
          speed={0.55}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-iris-300/25 blur-3xl" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.12}>
          <SectionHead
            index="06"
            eyebrow="Stack"
            title="Chosen, not collected."
            href="/technologies"
            cta="Full stack"
          />
        </ParallaxLayer>

        <div className="mt-16">
          <TechFloatGrid />
        </div>
      </section>

      {/* ══════════════ WORK ══════════════ */}
      <section id="work" className="section-py container-px relative mx-auto max-w-7xl">
        <ParallaxLayer
          speed={0.45}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute right-[8%] top-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.12}>
          <SectionHead
            index="07"
            eyebrow="Selected work"
            title="Shipped, and still running."
            href="/portfolio"
            cta="All work"
          />
        </ParallaxLayer>

        <div className="mt-16">
          <WorkCards3D />
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section id="contact-cta" className="section-py container-px mx-auto max-w-7xl">
        <FinalCTA />
      </section>
    </>
  );
}
