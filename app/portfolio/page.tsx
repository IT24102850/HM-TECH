import PortfolioGrid from "@/components/PortfolioGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Portfolio | HM Tech",
  description: "Explore HM Tech products across ERP, healthcare, hospitality, education, commerce, logistics, and finance.",
};

export default function PortfolioPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-mist">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-7xl py-20 md:py-28">
          <SectionHeading
            eyebrow="Our portfolio"
            title="Products built for the real world."
            description="From financial control rooms to patient care and last-mile delivery, we design and engineer software that helps ambitious teams move with clarity."
          />
        </div>
      </section>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
        <PortfolioGrid />
      </section>
    </main>
  );
}
