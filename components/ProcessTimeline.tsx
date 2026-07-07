"use client";

import { motion } from "framer-motion";
import { Lightbulb, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Innovate",
    icon: Lightbulb,
    copy: "We map the problem, the users, and the constraints, then prototype the sharpest possible answer before writing production code.",
  },
  {
    n: "02",
    title: "Build",
    icon: Hammer,
    copy: "Engineers and designers pair inside one sprint cadence, shipping working software every week instead of a single reveal at the end.",
  },
  {
    n: "03",
    title: "Transform",
    icon: Rocket,
    copy: "We launch, instrument, and iterate against real usage data, handing over a system your team can keep evolving on their own.",
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      <div className="absolute left-0 right-0 top-11 hidden h-px bg-gradient-to-r from-transparent via-iris-200 to-transparent md:block" />
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.12 }}
          className="relative card-surface p-7"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-widest text-iris-400">{s.n}</span>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
              <s.icon className="h-5 w-5" />
            </div>
          </div>
          <h3 className="mt-6 font-display text-xl font-semibold text-ink">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.copy}</p>
        </motion.div>
      ))}
    </div>
  );
}
