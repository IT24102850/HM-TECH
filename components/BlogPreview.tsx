"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import TiltCard from "@/components/TiltCard";

export default function BlogPreview() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {blogPosts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`}>
            <TiltCard className="h-full">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                <post.icon className="h-6 w-6" />
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-iris-500">
                {post.category}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                {post.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-iris-100 pt-5 text-xs text-ink/45">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-iris-700">
                  Read <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </TiltCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
