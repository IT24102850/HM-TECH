"use client";

/**
 * SmoothScroll - Lenis, driving the whole document.
 * ------------------------------------------------------------------
 * Lenis performs a real scroll (it moves window.scrollY), so everything
 * downstream keeps working unchanged: framer-motion's useScroll, plain
 * scroll listeners, and the WebGL stage's own scroll sampling.
 *
 * The instance is published on window so the page can drive it (and so an
 * automated pass can scroll deterministically instead of fighting the
 * easing).
 * ------------------------------------------------------------------
 */

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out: fast pickup, long glide, no rubber band.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
    });

    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
