import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, getCopyrightNotice } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/technologies", label: "Technologies" },
      { href: "/blog", label: "Blog" },
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
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-iris-100 bg-mist">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_1fr]">
          <div>
            <Image src="/logo.png" alt="HM Tech" width={150} height={78} className="h-11 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">
              {siteConfig.description}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-iris-600">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
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
            <p className="eyebrow">Contact Us</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-ink/70 hover:text-iris-700">
                  <Mail className="h-4 w-4 shrink-0" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-2 text-sm text-ink/70 hover:text-iris-700">
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
