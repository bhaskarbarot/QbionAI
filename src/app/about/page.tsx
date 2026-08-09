import type { Metadata } from "next";
import { Target, Users, Rocket, ShieldCheck } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import Stats from "@/components/home/Stats";
import CTABand from "@/components/shared/CTABand";
import { TEAM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Qubion.Ai",
  description: "The team building AI solutions, design and automation at Qubion.Ai.",
};

const VALUES = [
  { icon: Target, title: "Outcomes over output", text: "We measure ourselves on the metric you care about, not hours logged." },
  { icon: Rocket, title: "Ship in weeks", text: "Every engagement produces something usable in the first two weeks, not the last." },
  { icon: ShieldCheck, title: "No black boxes", text: "You can see, monitor and audit everything we build for you, always." },
  { icon: Users, title: "Embedded, not outsourced", text: "We work inside your tools and rituals like an extension of your team." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We build the AI layer growing companies actually need"
        desc="Qubion.Ai started as a small pod of AI engineers and designers frustrated by how many 'AI projects' never shipped. We exist to close that gap — with production systems, not proofs of concept."
      />

      <section className="py-20">
        <div className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet/25 to-glow-2/15 text-glow-2">
                  <v.icon size={18} />
                </span>
                <h3 className="mb-1.5 font-display text-[15px] text-white">{v.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />

      <section className="section border-t border-white/8 py-24">
        <div className="wrap">
          <Reveal>
            <SectionHeading center eyebrow="The team" title="Small team, senior people" desc="Every project is led by senior AI, design and engineering talent — no layers of account management between you and the people doing the work." />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="text-center">
                <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-violet to-violet-2 font-display text-2xl font-semibold text-white shadow-[0_16px_36px_rgba(4,14,9,0.5)]">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="font-display text-[15px] text-white">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
