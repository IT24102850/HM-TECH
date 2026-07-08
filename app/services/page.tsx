import type { Metadata } from "next";
import { ArrowUpRight, Check, Boxes, Cpu, LayoutGrid } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services — HM Tech",
  description: "End-to-end product engineering, from strategy and design to development and deployment.",
};

export const services = [
  {
    icon: LayoutGrid,
    title: "Product Strategy & Design",
    copy: "We'll help you define the problem, map your users' needs, and design a product that's not just functional, but delightful to use.",
  },
  {
    icon: Cpu,
    title: "Full-Stack Engineering",
    copy: "From database to deployment, our senior-only team builds robust, scalable systems that are built to last and easy to maintain.",
  },
  {
    icon: Boxes,
    title: "3D & Motion",
    copy: "We bring products to life with interactive 3D graphics and fluid animations that create memorable, dimensional experiences.",
  },
];

const tiers = [
  {
    name: "Staff Augmentation",
    price: "Hourly",
    features: ["Senior-only engineers", "Flexible, on-demand capacity", "Seamless team integration"],
    cta: "Book a call",
  },
  {
    name: "Dedicated Team",
    price: "Retainer",
    features: ["Full product team (Eng, PM, Design)", "Weekly sprint cadence", "Dedicated Slack channel"],
    cta: "Start a project",
    featured: true,
  },
  {
    name: "Full Product Build",
    price: "Fixed Scope",
    features: ["End-to-end build, launch & handoff", "Fixed timeline & budget", "Perfect for new products or MVPs"],
    cta: "Start a project",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            Our Services
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            One team for your
            <span className="text-gradient"> entire product.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            No handoffs between a design agency and a dev shop — the same senior team designs, builds, and ships your product from start to finish.
          </p>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s) => (
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

      <section className="section-py container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Engagement Tiers" title="Find the right fit." align="center" />
        <div className="mt-12 grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className={`card-surface p-7 ${t.featured ? "border-2 border-iris-500 shadow-iris" : ""}`}>
              <h3 className="font-display text-xl font-semibold text-ink">{t.name}</h3>
              <p className="mt-2 font-mono text-sm text-ink/60">{t.price}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-ink/80">
                    <Check className="h-4 w-4 shrink-0 text-iris-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`mt-7 w-full ${t.featured ? "btn-primary" : "btn-secondary"}`}>
                {t.cta} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
        ))}
      </section>

      <section className="section-py container-px mx-auto max-w-7xl bg-mist">
        <SectionHeading
          eyebrow="Our Philosophy"
          title="The principles that guide our choices."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {philosophy.map((p) => (
            <div key={p.title} className="card-surface p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}