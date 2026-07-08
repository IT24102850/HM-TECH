import type { Metadata } from "next";
import { Code, Database, Wind, Bot, GitBranch, Figma, Framer, Zap, Scale, Feather } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Technologies — HM Tech",
  description:
    "The modern, scalable, and robust technologies we use to build high-performant solutions.",
};

const techCategories = [
  {
    name: "Frontend",
    techs: [
      {
        icon: Code,
        name: "Next.js & React",
        copy: "For building performant, server-rendered React applications with the latest features.",
      },
      {
        icon: Code,
        name: "TypeScript",
        copy: "To ensure type safety and improve developer experience, leading to more robust code.",
      },
      {
        icon: Wind,
        name: "Tailwind CSS",
        copy: "A utility-first CSS framework for rapidly building custom, modern user interfaces.",
      },
      {
        icon: Framer,
        name: "Framer Motion",
        copy: "For creating fluid animations and complex micro-interactions that bring sites to life.",
      },
    ],
  },
  {
    name: "3D & Graphics",
    techs: [
      {
        icon: Bot,
        name: "React Three Fiber",
        copy: "A powerful React renderer for Three.js to create and manage 3D scenes declaratively.",
      },
      {
        icon: Bot,
        name: "Drei",
        copy: "A collection of useful helpers and abstractions for React Three Fiber.",
      },
    ],
  },
  {
    name: "Infrastructure & Tooling",
    techs: [
      {
        icon: Database,
        name: "Vercel",
        copy: "For seamless deployment, hosting, and scaling of our Next.js applications.",
      },
      {
        icon: GitBranch,
        name: "Git & GitHub",
        copy: "For version control and collaborative development, ensuring a streamlined workflow.",
      },
      {
        icon: Figma,
        name: "Figma",
        copy: "For collaborative interface design, prototyping, and a seamless design-to-code handoff.",
      },
    ],
  },
];

const philosophy = [
  {
    icon: Zap,
    title: "Performance by Default",
    copy: "We select frameworks and infrastructure that prioritize speed, ensuring your product is fast and responsive from the very first build.",
  },
  {
    icon: Scale,
    title: "Scalable & Maintainable",
    copy: "Our stack is chosen for its ability to grow with your business. We write clean, well-documented code that's easy for any team to inherit.",
  },
  {
    icon: Feather,
    title: "Delightful Experiences",
    copy: "Great products are more than just functional. We use tools that enable us to create smooth animations and memorable interactions that users love.",
  },
];

export default function TechnologiesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            Our Tech Stack
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Built with the
            <span className="text-gradient"> best in class.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            We leverage a curated set of modern, scalable technologies to build robust and
            high-performant solutions that feel dimensional and are a joy to use.
          </p>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        {techCategories.map((category) => (
          <div key={category.name} className="mb-12 last:mb-0">
            <h2 className="mb-8 font-display text-2xl font-semibold text-ink">{category.name}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.techs.map((tech) => (
                <TiltCard key={tech.name}>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                    <tech.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink">{tech.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{tech.copy}</p>
                </TiltCard>
              ))}
            </div>
          </div>
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