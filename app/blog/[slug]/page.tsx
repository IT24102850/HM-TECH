import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — HM Tech Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iris-radial" />
        <div className="container-px relative mx-auto max-w-3xl pb-6 pt-16 md:pt-24">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-iris-700">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <p className="eyebrow mt-8 inline-flex items-center gap-2 rounded-full border border-iris-100 bg-white px-3 py-1.5 shadow-iris-sm">
            {post.category}
          </p>
          <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-ink/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <div className="prose-content mt-10 space-y-5">
            {post.content.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/70">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-py container-px mx-auto max-w-7xl bg-mist">
          <p className="eyebrow text-center">Keep reading</p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="card-surface group flex items-center justify-between gap-4 p-6"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-iris-500">{r.category}</p>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-ink">{r.title}</h3>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-iris-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
