"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CTASection({
  title = "Have a product that deserves a better build?",
  description = "Tell us where it hurts. We'll come back with a point of view within one business day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-py container-px mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] bg-iris-gradient px-8 py-16 text-center md:px-16 md:py-20"
      >
        <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-ink/10 blur-3xl" />
        <p className="eyebrow !text-white/70">Let&apos;s talk</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-white md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 md:text-base">
          {description}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-iris-700 shadow-lg transition-transform hover:scale-[1.03]"
        >
          Start a project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
