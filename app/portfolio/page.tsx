import type { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Portfolio — HM Tech",
  description: "A selection of our favorite projects and case studies.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            Our Work
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Products we&apos;re proud to have
            <span className="text-gradient"> shipped.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            From stealth-mode startups to publicly traded companies, we help our clients achieve their goals by building software that matters.
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}