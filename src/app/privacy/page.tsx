import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Qubion.Ai",
  description: "How Qubion.Ai collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" desc="Last Updated August 2026" />
      <section className="py-16">
        <div className="wrap max-w-3xl space-y-8 text-[15px] leading-relaxed text-muted">
          <div>
            <h2 className="mb-2 font-display text-xl text-white">1. Information we collect</h2>
            <p>
              When you use our contact form or email us, we collect the information you provide directly,
              such as your name, email address, phone number, company and project details. We do not sell
              this information to third parties.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">2. How we use it</h2>
            <p>
              We use the information you submit to respond to inquiries, scope projects and, where you&rsquo;ve
              agreed, to follow up about our services. We may use aggregate analytics that do not identify
              individual visitors to understand how this site is used.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">3. Data retention</h2>
            <p>
              We retain inquiry information for as long as reasonably necessary to respond to you and maintain
              business records, after which it is deleted or anonymized.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">4. Your rights</h2>
            <p>
              You can request access to, correction of, or deletion of your personal data at any time by
              emailing <a className="text-glow-2 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-white">5. Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a className="text-glow-2 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
