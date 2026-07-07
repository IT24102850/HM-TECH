"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "120+", label: "Products shipped" },
  { value: "48", label: "Teams partnered with" },
  { value: "6.2M", label: "Users reached" },
  { value: "99.95%", label: "Avg. platform uptime" },
];

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <p className="font-display text-3xl font-semibold text-gradient md:text-4xl">
            {s.value}
          </p>
          <p className="mt-1.5 text-sm text-ink/55">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
