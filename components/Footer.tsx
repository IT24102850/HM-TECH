import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/technologies", label: "Technologies" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Product engineering" },
      { href: "/services", label: "3D & motion design" },
      { href: "/services", label: "Platform modernization" },
      { href: "/services", label: "Design systems" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-iris-100 bg-mist">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <Image src="/logo.png" alt="HM Tech" width={132} height={68} className="h-9 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">
              A product engineering studio building premium, dimensional web
              experiences for teams who refuse to ship average.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-iris-200 text-iris-700 transition-colors hover:bg-iris-100"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-ink/70 hover:text-iris-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow">Start building</p>
            <p className="mt-4 text-sm text-ink/70">
              Have a brief in mind? Tell us about it and we&apos;ll reply within
              one business day.
            </p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-iris-700">
              Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-iris-100 pt-8 text-xs text-ink/50 md:flex-row">
          <p>© {new Date().getFullYear()} HM Tech. All rights reserved.</p>
          <p className="font-mono tracking-wide">INNOVATE. BUILD. TRANSFORM.</p>
        </div>
      </div>
    </footer>
  );
}
