import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — HM Tech",
  description: "Start a conversation with the HM Tech product team.",
};

const info = [
  { icon: Mail, label: "Email", value: "hello@hmtech.studio" },
  { icon: Phone, label: "Phone", value: "+1 (415) 555-0148" },
  { icon: MapPin, label: "Studio", value: "San Francisco · Remote-first" },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
      <div className="container-px relative mx-auto max-w-7xl pb-24 pt-16 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            Contact
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Let&apos;s build the
            <span className="text-gradient"> next thing.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
            Tell us what you&apos;re building and what&apos;s in the way.
            We reply with real availability, not a sales deck.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {info.map((i) => (
              <div key={i.label} className="card-surface flex items-center gap-4 p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                  <i.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{i.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{i.value}</p>
                </div>
              </div>
            ))}
            <div className="card-surface p-6">
              <p className="text-sm font-semibold text-ink">Prefer a call first?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                Mention it in the message and we&apos;ll send over a booking
                link for a 30-minute intro with our team lead.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
