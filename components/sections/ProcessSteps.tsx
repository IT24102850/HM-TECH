"use client";

/**
 * ProcessSteps - the three phases.
 * Scroll: the connecting rule draws itself, then each step reveals in
 * sequence, rising out of a backward tilt so the row builds left to right
 * rather than appearing at once.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Innovate",
    icon: Lightbulb,
    copy: "We map the problem, the users and the constraints, then prototype the sharpest answer before writing production code.",
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
    copy: "We launch, instrument and iterate against real usage, handing over a system your team can keep evolving alone.",
  },
];

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });
  const ruleScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="perspective-far relative">
      {/* the rule draws across as the section arrives */}
      <motion.div
        style={{ scaleX: ruleScale }}
        className="absolute left-0 right-0 top-12 hidden h-px origin-left bg-gradient-to-r from-transparent via-iris-400/60 to-transparent md:block"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            data-anim="process-step"
            initial={{ opacity: 0, y: 64, rotateX: -18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.85,
              delay: 0.25 + i * 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="card-surface relative p-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wide2 text-gold">
                {s.n}
              </span>
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-iris-100 bg-iris-50">
                <s.icon className="h-4 w-4 text-iris-600" />
              </div>
            </div>
            <h3 className="mt-8 font-display text-2xl font-medium tracking-tight text-ink">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/45">{s.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
