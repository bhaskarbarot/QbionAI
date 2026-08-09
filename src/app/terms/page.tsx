import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service — Qubion.Ai",
  description: "Terms governing the use of the Qubion.Ai website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" desc="Last updated: August 2026" />
      <section className="py-16">
        <div className="wrap max-w-3xl space-y-8 text-[15px] leading-relaxed text-muted">
          <div>
            <h2 className="mb-2 font-display text-xl text-white">1. Overview</h2>
            <p>
              These terms govern your use of the {SITE.name} website. By using this site, you agree to these
              terms. Engagement-specific terms for paid work are set out separately in a signed statement of
              work or contract.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">2. Use of the site</h2>
            <p>
              You may not use this site to transmit unlawful, harmful or infringing content, or to attempt to
              gain unauthorized access to our systems.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">3. Intellectual property</h2>
            <p>
              All content on this site, including text, graphics and design, is owned by {SITE.name} unless
              otherwise stated and may not be reproduced without permission.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">4. Liability</h2>
            <p>
              This site and its content are provided &ldquo;as is&rdquo; without warranties of any kind. {SITE.name} is
              not liable for any indirect or consequential loss arising from use of this site.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">5. Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a className="text-glow-2 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
