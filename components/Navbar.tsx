"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-iris-100 shadow-[0_1px_0_rgba(109,40,217,0.06)]"
          : "bg-white/40 backdrop-blur-sm"
      }`}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="HM Tech" width={132} height={68} priority className="h-9 w-auto md:h-10" />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative py-1 text-sm font-medium transition-colors ${
                    active ? "text-iris-700" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-iris-gradient"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className="hidden md:inline-flex btn-primary !py-3 !px-6 text-xs">
          Start a project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-iris-200 text-ink md:hidden"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-iris-100 bg-white md:hidden"
          >
            <ul className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-xl px-3 py-3 text-base font-medium ${
                      pathname === l.href ? "bg-iris-50 text-iris-700" : "text-ink/80"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/contact" className="btn-primary w-full">
                  Start a project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
