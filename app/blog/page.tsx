import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import TiltCard from "@/components/TiltCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Blog — HM Tech",
  description:
    "Insights on technology trends, AI adoption, and web development from the HM Tech team.",
  openGraph: {
    title: "Blog — HM Tech",
    description:
      "Insights on technology trends, AI adoption, and web development from the HM Tech team.",
  },
};

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-4xl pb-6 pt-16 text-center md:pt-24">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            Blog
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Ideas on technology,
            <span className="text-gradient"> AI, and growth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            Practical perspectives from the team building your software —
            no fluff, no filler.
          </p>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <TiltCard className="h-full">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                  <post.icon className="h-6 w-6" />
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-iris-500">
                  {post.category}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                  {post.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-iris-100 pt-5 text-xs text-ink/45">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-iris-700">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        title="Have a project idea after reading this?"
        description="Tell us what you're building — we'll tell you honestly what it takes to ship it well."
      />
    </>
  );
}
