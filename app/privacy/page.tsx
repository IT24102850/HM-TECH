import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — HM Tech",
  description: "How HM Tech collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <section className="section-py container-px mx-auto max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-ink/50">Last updated: January 2026</p>

      <div className="prose-content mt-10 space-y-8 text-sm leading-relaxed text-ink/70">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">1. Information we collect</h2>
          <p className="mt-2">
            When you fill out a form on this site — such as our contact form —
            we collect the information you provide directly, including your
            name, email address, company, and project details. We also
            collect standard technical data (browser type, device, pages
            visited) through normal web server logs and analytics.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">2. How we use it</h2>
          <p className="mt-2">
            We use the information you submit solely to respond to your
            inquiry, provide requested services, and improve this website.
            We do not sell your personal information to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">3. Cookies</h2>
          <p className="mt-2">
            This site may use essential cookies for functionality and
            anonymous analytics cookies to understand how visitors use the
            site. You can disable cookies in your browser settings at any
            time.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">4. Data retention & your rights</h2>
          <p className="mt-2">
            We retain contact form submissions only as long as needed to
            respond to your inquiry or fulfill a contract. You may request
            access to, correction of, or deletion of your personal data at
            any time by contacting us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-iris-700 underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">5. Changes to this policy</h2>
          <p className="mt-2">
            We may update this policy from time to time. Material changes
            will be reflected with an updated "last updated" date at the top
            of this page.
          </p>
        </section>
      </div>
    </section>
  );
}
