import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact — Qubion.Ai",
  description: "Tell Qubion.Ai about your AI, design or automation project.",
};

const INFO = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: SITE.location },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building"
        desc="Share a few details about your project and a member of the team will get back to you within one business day."
      />

      <section className="py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            {INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet/25 to-glow-2/15 text-glow-2">
                  <item.icon size={17} />
                </span>
                <div>
                  <p className="font-display text-[13px] text-white">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted hover:text-glow-2">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
