import Link from "next/link";
import { Mountain } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/technologies", label: "Technologies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm">
      <Link href="/" className="flex items-center justify-center">
        <Mountain className="h-6 w-6" />
        <span className="sr-only">HM-TECH</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}