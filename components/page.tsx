import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import TechStackGrid from "@/components/TechStackGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Technologies — HM Tech",
  description: "The modern, scalable, and robust technologies we use to build high-performant solutions.",
};

export default function TechnologiesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <SectionHeading eyebrow="Our Tech Stack" title="Built with the best in class." align="center" />
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Built with the<span className="text-gradient"> best in class.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            We leverage a curated set of modern, scalable technologies to build robust and high-performant solutions that feel dimensional and are a joy to use.
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