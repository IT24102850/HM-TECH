import SectionHeading from "@/components/SectionHeading";
import TechStackGrid from "@/components/TechStackGrid";

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Arsenal"
          title="Technologies We Master"
          description="We build with modern, battle-tested tools that deliver exceptional performance, scalability, and developer experience."
          align="center"
        />

        <div className="mt-16">
          <TechStackGrid />
        </div>
      </div>
    </div>
  );
}