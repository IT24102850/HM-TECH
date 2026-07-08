import Link from "next/link";
import { ArrowUpRight, Boxes, Cpu, LayoutGrid, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import CubeField from "@/components/CubeField";
import SectionHeading from "@/components/SectionHeading";
import StatsStrip from "@/components/StatsStrip";
import ProcessTimeline from "@/components/ProcessTimeline";
import TiltCard from "@/components/TiltCard";
import CTASection from "@/components/CTASection";

import { services } from "./services/page";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 pb-8 pt-14 md:grid-cols-2 md:pt-20">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
              <Sparkles className="h-3.5 w-3.5" /> Product &amp; 3D Engineering Studio
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              We build software that feels
              <span className="text-gradient"> dimensional.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/60 md:text-lg">
              HM Tech pairs senior engineers with 3D-native designers to ship
              premium web products — the kind that make a homepage feel like
              a demo of what&apos;s next.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn-primary">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/technologies" className="btn-ghost">
                Our Tech Stack
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-ink/45">
              <span className="font-mono tracking-wide">TRUSTED BY TEAMS AT</span>
              <div className="flex gap-5 font-display text-sm font-semibold text-ink/35">
                <span>Ledgerline</span>
                <span>Vitalcare</span>
                <span>Portway</span>
                <span className="hidden sm:inline">Northfield</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <CubeField />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-px mx-auto max-w-7xl border-y border-iris-100 py-14">
        <StatsStrip />
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-py container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Three disciplines. One product team."
            description="No handoffs between a design agency and a dev shop — the same team designs, builds, and ships your product end to end."
          />
          <Link href="/services" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-iris-700 md:inline-flex">
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((s) => (
            <TiltCard key={s.title}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{s.copy}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-py container-px mx-auto max-w-7xl bg-mist">
        <SectionHeading
          eyebrow="How we work"
          title="Innovate. Build. Transform."
          description="Our name is our process — three real phases every engagement moves through, start to handoff."
          align="center"
        />
        <div className="mt-14">
          <ProcessTimeline />
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="section-py container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our Technology Stack"
            title="Built with the best in class."
            description="We leverage modern, scalable technologies to build robust and high-performant solutions."
          />
          <Link href="/technologies" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-iris-700 md:inline-flex">
            Explore our stack <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TRUST */}
      <section className="container-px mx-auto max-w-7xl pb-8">
        <div className="card-surface flex flex-col items-center gap-6 p-10 text-center md:flex-row md:text-left">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-iris-gradient text-white">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">
              Senior engineers only — no bench, no juniors learning on your bill.
            </h3>
            <p className="mt-2 text-sm text-ink/60">
              Every engagement is staffed by people who&apos;ve shipped and
              scaled production systems before, not just prototypes.
            </p>
          </div>
          <Wand2 className="ml-auto hidden h-8 w-8 text-iris-300 md:block" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
