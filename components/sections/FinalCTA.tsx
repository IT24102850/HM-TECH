"use client";

/**
 * FinalCTA - the close.
 * Scroll: the panel scales up dramatically from 0.82 as it enters, and a
 * hard specular sweep runs across it once it lands. The sweep is a skewed
 * gradient bar animated on a scroll-triggered key, so it fires with the
 * reveal rather than on a loop.
 */

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-140px" });
  // "center center" never resolves for the last block on the page, so the
  // panel would sit at opacity 0 forever. Anchoring to the element's top
  // crossing the viewport is well defined wherever it lands.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="perspective">
      <motion.div
        data-anim="cta"
        style={{ scale, opacity }}
        className="relative overflow-hidden rounded-[2rem] border border-iris-100 bg-[linear-gradient(135deg,rgba(245,242,254,0.96),rgba(255,255,255,0.98))] px-8 py-20 text-center shadow-film md:px-16 md:py-28"
      >
        {/* ambient pools */}
        <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-iris-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />

        {/* light sweep, fires once when the panel lands */}
        {inView && (
          <motion.div
            aria-hidden
            initial={{ x: "-130%" }}
            animate={{ x: "230%" }}
            transition={{ duration: 1.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.14),rgba(168,132,47,0.1),transparent)]"
          />
        )}

        <p className="eyebrow-gold relative">Let&apos;s build</p>
        <h2 className="relative mx-auto mt-7 max-w-3xl font-serif text-4xl font-normal leading-[1.12] text-ink md:text-6xl">
          Ready to transform
          <br />
          your business?
        </h2>
        <p className="relative mx-auto mt-7 max-w-md text-sm leading-relaxed text-ink/45 md:text-base">
          Tell us where it hurts. You get a considered point of view within one
          business day.
        </p>

        <div className="relative mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/services" className="btn-ghost">
            What we do
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
