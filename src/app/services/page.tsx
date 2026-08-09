import type { Metadata } from "next";
import { BrainCircuit, Sparkles, Workflow, Target, Check } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import Pricing from "@/components/home/Pricing";
import CTABand from "@/components/shared/CTABand";
import { SERVICES } from "@/lib/constants";

const ICONS = { BrainCircuit, Sparkles, Workflow, Target };

export const metadata: Metadata = {
  title: "Services — Qubion.Ai",
  description: "AI solutions, AI-powered design, automation and performance advertising from Qubion.Ai.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four disciplines that compound"
        desc="Every engagement pulls from the same embedded team — so your AI product, brand and growth systems stay in sync instead of fighting each other."
      />

      <div>
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS];
          return (
            <section
              key={s.slug}
              id={s.slug}
              className={`scroll-mt-24 py-20 ${i % 2 === 1 ? "bg-white/[0.015]" : ""} ${
                i !== SERVICES.length - 1 ? "border-b border-white/8" : ""
              }`}
            >
              <div className="wrap grid items-center gap-12 md:grid-cols-2">
                <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/30 to-glow-2/10 text-glow-2">
                    <Icon size={26} />
                  </span>
                  <h2 className="mb-4 text-[clamp(1.6rem,3vw,2.2rem)] text-white">{s.title}</h2>
                  <p className="mb-6 max-w-[52ch] text-[15px] leading-relaxed text-muted">{s.summary}</p>
                  <ul className="space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[14px] text-white/85">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-glow-2">
                          <Check size={12} className="text-white" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.1} className={i % 2 === 1 ? "md:order-1" : ""}>
                  <div className="liquid-glass flex aspect-[4/3] items-center justify-center rounded-3xl">
                    <Icon size={64} className="text-glow-2 opacity-40" strokeWidth={1.2} />
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <Pricing />
      <CTABand />
    </>
  );
}
