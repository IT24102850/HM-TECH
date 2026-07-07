import type { Metadata } from "next";
import { Compass, Heart, Layers, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import StatsStrip from "@/components/StatsStrip";
import TiltCard from "@/components/TiltCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About — HM Tech",
  description: "Meet the studio behind HM Tech and the principles that shape every build.",
};

const values = [
  {
    icon: Compass,
    title: "Clarity before code",
    copy: "We don't start building until the problem, the user, and the metric that matters are written down in one page everyone agrees on.",
  },
  {
    icon: Layers,
    title: "Craft is not optional",
    copy: "Spacing, motion, and load time are product decisions, not polish. We treat them with the same rigor as the backend.",
  },
  {
    icon: Users,
    title: "Your team, stronger",
    copy: "We document, pair, and hand over cleanly. A good engagement leaves your team more capable than it found them.",
  },
  {
    icon: Heart,
    title: "Long-term over billable",
    copy: "We'd rather tell you a feature isn't worth building than pad a scope. Trust compounds; invoices don't.",
  },
];

const timeline = [
  { year: "2019", title: "Founded as a two-person engineering pair", copy: "Started building bespoke internal tools for early-stage fintechs." },
  { year: "2021", title: "First full product launches", copy: "Grew into a nine-person studio shipping consumer and B2B platforms end to end." },
  { year: "2023", title: "3D & motion practice formalized", copy: "Brought WebGL and interaction design in-house instead of outsourcing it." },
  { year: "2026", title: "40+ engineers and designers", copy: "Working across fintech, healthtech, and logistics with senior-only staffing." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            About HM Tech
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            A small studio, built for
            <span className="text-gradient"> outsized software.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            HM Tech exists because most digital products stop at
            &ldquo;functional.&rdquo; We think the interface is part of the
            product, not a coat of paint on top of it — so we staff every
            engagement with engineers and designers who obsess over both.
          </p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl border-y border-iris-100 py-14">
        <StatsStrip />
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we believe"
          title="Four principles that shape every engagement."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <TiltCard key={v.title}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{v.copy}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl bg-mist">
        <SectionHeading
          eyebrow="Our path"
          title="From a two-person pair to a senior product studio."
          align="center"
        />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute bottom-0 left-[27px] top-0 w-px bg-iris-100 md:left-1/2" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <div
                key={t.year}
                className={`relative flex flex-col gap-2 md:flex-row md:items-start md:gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
                }`}
              >
                <div className="flex items-center gap-4 md:w-1/2 md:justify-end md:[&.reverse]:justify-start">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-iris-gradient font-mono text-xs font-semibold text-white shadow-iris-sm">
                    {t.year}
                  </span>
                  <div className="md:hidden">
                    <h3 className="font-display text-lg font-semibold text-ink">{t.title}</h3>
                  </div>
                </div>
                <div className="card-surface flex-1 p-6 md:mt-0">
                  <h3 className="hidden font-display text-lg font-semibold text-ink md:block">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{t.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want the team behind these numbers on your product?"
        description="Tell us about your roadmap — we'll tell you honestly if we're the right fit."
      />
    </>
  );
}
