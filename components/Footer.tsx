import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, getCopyrightNotice } from "@/lib/site";

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm5.78 14.1c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08.99-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.28.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.34 1.46.28.14.44.12.6-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/technologies", label: "Technologies" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Software Development" },
      { href: "/services", label: "Web Development" },
      { href: "/services", label: "AI & Automation" },
      { href: "/services", label: "Digital Marketing" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: WhatsappIcon, href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="border-t border-iris-100 bg-mist">
      <div className="container-px mx-auto max-w-7xl py-16 text-center md:text-left">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_1fr]">
          <div className="flex flex-col items-center md:items-start">
            <Image src="/logo.png" alt="HM Tech" width={150} height={78} className="h-11 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">
              {siteConfig.description}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-iris-600">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex justify-center gap-3 md:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={
                    label === "WhatsApp"
                      ? "grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-iris-sm"
                      : "grid h-9 w-9 place-items-center rounded-full border border-iris-200 text-iris-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-iris-400 hover:bg-iris-50 hover:shadow-iris-sm"
                  }
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
            <p className="eyebrow">Contact Us</p>
            <ul className="mt-4 flex flex-col items-center space-y-3 md:items-start">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm text-ink/70 hover:text-iris-700">
                  <Mail className="h-4 w-4 shrink-0" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center gap-2 text-sm text-ink/70 hover:text-iris-700">
                  <Phone className="h-4 w-4 shrink-0" /> {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-ink/70">
                <MapPin className="h-4 w-4 shrink-0" /> {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-iris-100 pt-8 text-xs text-ink/50 md:flex-row">
          <p>{getCopyrightNotice()}</p>
          <p className="font-mono tracking-wide">{siteConfig.tagline.toUpperCase()}</p>
        </div>
      </div>
    </footer>
  );
}
