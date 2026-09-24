"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/technologies", label: "Technologies" },
  { href: "/contact", label: "Contact" },
];

/**
 * Homepage sections the nav mirrors, each mapped to the nav item that owns it.
 * Every tracked section MUST map to a real link: a section with no owner left
 * no item active at all, so the marker blinked out while scrolling past it.
 * Process belongs to Services, since it describes how the work is done.
 */
const SECTION_OWNER: Record<string, string> = {
  services: "/services",
  process: "/services",
  technologies: "/technologies",
  work: "/portfolio",
};
const TRACKED = Object.keys(SECTION_OWNER);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** Which homepage section the reader is currently in, if any. */
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy: on the homepage the nav follows the reader down the page, so
     Portfolio lights up over the work section, Technologies over the stack,
     and so on. Only the homepage has these sections; every other route falls
     back to matching the path. */
  useEffect(() => {
    if (pathname !== "/") {
      setSection(null);
      return;
    }

    const els = TRACKED.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!els.length) return;

    const pick = () => {
      // The section crossing the upper third of the viewport is the one the
      // reader is actually looking at.
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = el.id;
      }
      setSection((prev) => (prev === current ? prev : current));
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-iris-100 bg-white/80 shadow-[0_14px_50px_-30px_rgba(109,40,217,0.35)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative">
            <span className="absolute -inset-2 rounded-full bg-iris-200/80 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              src="/logo.png"
              alt="HM Tech"
              width={160}
              height={82}
              priority
              className="relative h-12 w-auto transition-transform duration-500 group-hover:scale-105 md:h-16"
            />
          </span>
          <span className="hidden flex-col leading-none lg:flex">
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              HM Tech
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-iris-600">
              Innovate. Build. Transform.
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            // While scrolling the homepage the marker follows the section in
            // view; outside those sections it falls back to the current route,
            // so exactly one item is always marked.
            const owner = section ? SECTION_OWNER[section] : null;
            const active = owner ? l.href === owner : pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group relative py-1 text-sm font-medium transition-colors ${
                    active ? "text-iris-700" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-iris-gradient transition-all duration-300 group-hover:w-full" />
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-iris-gradient shadow-[0_0_10px_rgba(139,92,246,0.45)]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="/contact" className="btn-primary !px-6 !py-3 text-xs">
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-iris-200 bg-white/80 text-ink backdrop-blur-xl md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            id="mobile-navigation"
            className="overflow-hidden border-t border-iris-100 bg-white/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                      pathname === l.href
                        ? "bg-iris-100/70 text-iris-700"
                        : "text-ink/70 hover:bg-iris-50"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Start a project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
