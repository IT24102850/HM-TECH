import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import TechStackGrid from "@/components/TechStackGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Technologies — HM Tech",
  description: "The modern, scalable, and robust stack we use to build high-quality digital solutions.",
};

export default function TechnologiesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white/[0.04] backdrop-blur-xl px-3 py-1.5 shadow-iris-sm">
            Our Stack
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Tools we use to build
            <span className="text-gradient"> dimensional software.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            We choose technologies that are proven at scale, backed by strong communities, and prioritize an excellent developer experience.
          </p>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        <TechStackGrid />
      </section>

      <CTASection />
    </>
  );
}