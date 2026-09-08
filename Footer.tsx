import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} HM-TECH Inc. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="/services" className="text-xs hover:underline underline-offset-4">
          Services
        </Link>
        <Link href="/technologies" className="text-xs hover:underline underline-offset-4">
          Technologies
        </Link>
        <Link href="/about" className="text-xs hover:underline underline-offset-4">
          About
        </Link>
      </nav>
    </footer>
  );
}