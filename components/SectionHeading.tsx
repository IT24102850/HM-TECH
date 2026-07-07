"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink/60">{description}</p>
      )}
    </motion.div>
  );
}
