import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Portfolio — HM Tech",
  description: "Selected product launches across fintech, healthtech, logistics, and commerce.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            Portfolio
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Work we&apos;re
            <span className="text-gradient"> proud to put our name on.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            A sample of recent launches. Each one paired a senior product pod
            with a founder or team who cared as much about the details as we
            do.
          </p>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Filter by industry" title="Browse by the problems we've solved." align="center" />
        <div className="mt-12">
          <PortfolioGrid />
        </div>
      </section>

      <CTASection
        title="Want your product in this list next?"
        description="Send us the roadmap and the constraints — we'll tell you what a first sprint could look like."
      />
    </>
  );
}
