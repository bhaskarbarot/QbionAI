import type { Metadata } from "next";
import { BrainCircuit, Sparkles, Bot, Megaphone, Check } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import CTABand from "@/components/shared/CTABand";
import { SERVICES } from "@/lib/constants";

const ICONS = { BrainCircuit, Sparkles, Bot, Megaphone };

export const metadata: Metadata = {
  title: "Services | Qubion.Ai",
  description: "AI solutions, AI powered design, automation and performance advertising from Qubion.Ai.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four Disciplines That Compound"
        desc="Every engagement pulls from the same embedded team, so your AI product, brand and growth systems stay in sync instead of fighting each other."
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
                  <div className="liquid-glass relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl">
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)",
                        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)",
                      }}
                    />
                    <div className="absolute h-56 w-56 rounded-full bg-gradient-to-br from-violet/25 to-glow-2/10 blur-3xl" />
                    <span className="absolute h-24 w-24 rounded-full border border-glow/25" />
                    <span className="absolute h-40 w-40 rounded-full border border-glow/10" />
                    <span className="relative grid h-24 w-24 place-items-center rounded-3xl border border-white/12 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_20px_50px_rgba(2,6,4,0.5)]">
                      <Icon size={40} className="text-glow-2" strokeWidth={1.4} />
                    </span>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <CTABand />
    </>
  );
}
