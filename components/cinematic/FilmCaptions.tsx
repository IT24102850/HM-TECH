"use client";

/**
 * FilmCaptions - the type layer over the cinematic stage.
 * ------------------------------------------------------------------
 * The four acts run inside one tall `#film` element with a sticky viewport.
 * Copy for each act is cross-faded on scroll position, so text and camera
 * move as one piece rather than as a caption chasing a video.
 *
 * Deliberately few words: the stage is doing the talking.
 * ------------------------------------------------------------------
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/** Fades a block in over [a,b] and out over [c,d] of film progress. */
function useActOpacity(
  p: MotionValue<number>,
  a: number,
  b: number,
  c: number,
  d: number
) {
  return useTransform(p, [a, b, c, d], [0, 1, 1, 0]);
}

export default function FilmCaptions() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* ACT 0 — title over the orbit */
  const o0 = useActOpacity(scrollYProgress, 0.0, 0.03, 0.18, 0.26);
  const y0 = useTransform(scrollYProgress, [0, 0.26], [0, -70]);
  const track0 = useTransform(scrollYProgress, [0, 0.26], ["0.42em", "0.62em"]);
  const cue0 = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  /* ACT 1 — the story, over the macro glide */
  const o1 = useActOpacity(scrollYProgress, 0.29, 0.34, 0.45, 0.52);
  const y1 = useTransform(scrollYProgress, [0.29, 0.52], [50, -50]);

  /* ACT 2 — engineering callouts, over the assembly */
  const o2 = useActOpacity(scrollYProgress, 0.55, 0.6, 0.71, 0.78);
  const y2 = useTransform(scrollYProgress, [0.55, 0.78], [50, -50]);

  /* ACT 3 — the quiet close */
  const o3 = useActOpacity(scrollYProgress, 0.8, 0.86, 0.96, 1.0);
  const y3 = useTransform(scrollYProgress, [0.8, 1.0], [40, -30]);

  return (
    <section id="film" ref={ref} className="relative h-[480vh]">
      <div className="letterbox sticky top-0 h-screen overflow-hidden">
        {/* ─────────── ACT 0 · HERO ─────────── */}
        <motion.div
          style={{ opacity: o0, y: y0 }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.h1
            style={{ letterSpacing: track0 }}
            className="font-display text-[13vw] font-light leading-none text-ink md:text-[9vw]"
          >
            HM TECH
          </motion.h1>
          <div className="mt-8 h-px w-40 bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
          <p className="mt-8 font-mono text-[10px] uppercase tracking-wide2 text-iris-600 md:text-xs">
            Innovate. Build. Transform.
          </p>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cue0 }}
          className="pointer-events-none absolute bottom-[10vh] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="font-mono text-[9px] uppercase tracking-wide2 text-ink/35">
            Scroll
          </span>
          <span className="relative grid h-10 w-[22px] place-items-start rounded-full border border-iris-300 p-1">
            <motion.span
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-gold"
            />
          </span>
        </motion.div>

        {/* ─────────── ACT 1 · STORY ─────────── */}
        <motion.div
          style={{ opacity: o1, y: y1 }}
          className="pointer-events-none absolute inset-0 flex items-center px-6 md:px-16"
        >
          <div className="max-w-md">
            <p className="eyebrow-gold">01 — Detail</p>
            <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.12] text-ink md:text-6xl">
              Every layer,
              <br />
              engineered.
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-ink/50 md:text-base">
              Live code, trained models, and telemetry running under the same
              pane of glass.
            </p>
            <div className="mt-8 flex flex-col gap-2.5 font-mono text-[10px] uppercase tracking-wide2 text-ink/40">
              <span>— Inference graph</span>
              <span>— Streaming telemetry</span>
              <span>— Circuitry under glass</span>
            </div>
          </div>
        </motion.div>

        {/* ─────────── ACT 2 · ENGINEERING ─────────── */}
        <motion.div
          style={{ opacity: o2, y: y2 }}
          className="pointer-events-none absolute inset-0 flex items-end justify-center px-6 pb-[14vh] md:items-center md:justify-end md:px-16 md:pb-0"
        >
          <div className="max-w-md text-left md:text-right">
            <p className="eyebrow-gold">02 — Assembly</p>
            <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.12] text-ink md:text-6xl">
              Built from
              <br />
              first principles.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-wide2 text-ink/45 md:justify-items-end">
              <span>Code blocks</span>
              <span>API nodes</span>
              <span>AI cores</span>
              <span>UI panels</span>
              <span>Cloud modules</span>
              <span>Data layer</span>
            </div>
          </div>
        </motion.div>

        {/* ─────────── ACT 3 · ATMOSPHERE ─────────── */}
        <motion.div
          style={{ opacity: o3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="eyebrow-gold">03 — The finished thing</p>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl font-normal leading-[1.15] text-ink md:text-6xl">
            Quiet on the surface.
            <br />
            Relentless underneath.
          </h2>
          <Link
            href="/contact"
            className="btn-ghost pointer-events-auto mt-10"
          >
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
