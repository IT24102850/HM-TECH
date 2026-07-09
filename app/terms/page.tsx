import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — HM Tech",
  description: "The terms that govern use of the HM Tech website and services.",
};

export default function TermsPage() {
  return (
    <section className="section-py container-px mx-auto max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-ink/50">Last updated: January 2026</p>

      <div className="prose-content mt-10 space-y-8 text-sm leading-relaxed text-ink/70">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">1. Acceptance of terms</h2>
          <p className="mt-2">
            By accessing this website, you agree to be bound by these terms.
            If you do not agree, please discontinue use of the site.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">2. Use of the site</h2>
          <p className="mt-2">
            Content on this website is provided for general informational
            purposes about {siteConfig.name} and its services. You may not
            reproduce, distribute, or use site content for commercial
            purposes without written permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">3. Project engagements</h2>
          <p className="mt-2">
            Any actual client engagement — scope, pricing, deliverables, and
            timelines — is governed by a separate signed agreement between
            {" "}{siteConfig.name} and the client, not by this website's
            general content.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">4. Limitation of liability</h2>
          <p className="mt-2">
            This website and its content are provided "as is" without
            warranties of any kind. {siteConfig.name} is not liable for any
            damages arising from use of, or inability to use, this site.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">5. Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-iris-700 underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
