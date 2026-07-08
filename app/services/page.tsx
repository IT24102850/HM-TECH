import type { Metadata } from "next";
import { Check, Code, Smartphone, Bot, Cloud, Briefcase, Megaphone, Palette, BrainCircuit, Clapperboard } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import TiltCard from "@/components/TiltCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services — HM Tech",
  description: "A comprehensive suite of technology services to bring your ideas to life and accelerate your business.",
};

export const services = [
  {
    icon: Code,
    title: "Software Development",
    copy: "Custom software solutions built with modern technologies and best practices.",
  },
  {
    icon: Code,
    title: "Web Development",
    copy: "High-performance websites and web applications that deliver exceptional user experiences.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    copy: "Native and cross-platform mobile apps for iOS and Android that users love.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    copy: "Intelligent automation and AI solutions to streamline processes and boost productivity.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    copy: "Scalable cloud infrastructure and solutions to accelerate business growth.",
  },
  {
    icon: Briefcase,
    title: "ERP Solutions",
    copy: "Custom ERP systems to manage and integrate business operations seamlessly.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    copy: "Data-driven marketing strategies to grow your brand and reach the right audiences.",
  },
  {
    icon: Clapperboard,
    title: "Cinematography",
    copy: "Professional video production and cinematography to bring your brand's story to life.",
  },
  { icon: Palette, title: "UI/UX Design", copy: "Beautiful, intuitive designs that enhance user experience and drive engagement." },
  {
    icon: BrainCircuit,
    title: "IT Consultancy",
    copy: "Expert guidance and consulting to help you make the right technology decisions.",
  },
];

const engagements = [
  {
    name: "Sprint",
    price: "From $18k",
    period: "/ 4-week engagement",
    copy: "A focused build to validate one product surface fast.",
    features: ["1 designer + 1 engineer", "Working prototype in week 2", "Production-ready by week 4"],
    highlighted: false,
  },
  {
    name: "Studio",
    price: "From $42k",
    period: "/ month",
    copy: "An embedded team shipping your roadmap continuously.",
    features: ["Full product pod (design + eng)", "Weekly releases", "Direct Slack access to the team", "Quarterly roadmap planning"],
    highlighted: true,
  },
  {
    name: "Platform",
    price: "Custom",
    period: "/ scoped",
    copy: "Large-scale modernization or multi-product builds.",
    features: ["Multiple pods across workstreams", "Dedicated tech lead", "Infra & security review", "SLA-backed support"],
    highlighted: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            Services
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            One team, from
            <span className="text-gradient"> concept to production.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            Every project draws from the same six disciplines, mixed to fit
            what you actually need — never a fixed package you have to bend
            your problem to fit.
          </p>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <SectionHeading eyebrow="Engagement process" title="How a project moves through our studio." align="center" />
        <div className="mt-14">
          <ProcessTimeline />
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Ways to work together" title="Pick the shape that matches your stage." align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {engagements.map((e) => (
            <div
              key={e.name}
              className={`relative rounded-2xl border p-8 ${
                e.highlighted
                  ? "border-iris-600 bg-ink text-white shadow-iris"
                  : "border-iris-100 bg-white shadow-iris-sm"
              }`}
            >
              {e.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-iris-gradient px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className={`font-display text-xl font-semibold ${e.highlighted ? "text-white" : "text-ink"}`}>
                {e.name}
              </h3>
              <p className={`mt-1 text-sm ${e.highlighted ? "text-white/60" : "text-ink/55"}`}>{e.copy}</p>
              <p className="mt-6">
                <span className={`font-display text-3xl font-semibold ${e.highlighted ? "text-white" : "text-ink"}`}>
                  {e.price}
                </span>
                <span className={`ml-1.5 text-xs ${e.highlighted ? "text-white/50" : "text-ink/45"}`}>{e.period}</span>
              </p>
              <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                {e.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-sm ${
                      e.highlighted ? "text-white/80" : "text-ink/70"
                    }`}
                  >
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${e.highlighted ? "text-iris-300" : "text-iris-600"}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
