import type { Metadata } from "next";
import { Bot, Sparkles, Workflow, Check, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import Button from "@/components/shared/Button";
import CTABand from "@/components/shared/CTABand";
import { PRODUCTS } from "@/lib/constants";

const ICONS = { Bot, Sparkles, Workflow };

export const metadata: Metadata = {
  title: "Product | Qubion.Ai",
  description: "The AI products Qubion.Ai has built in house: Copilot, Canvas and Flow.",
};

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Products Built By Qubion.Ai"
        desc="Alongside client work, we build and run our own AI products. They are proof of how we work, not just a portfolio. Explore what each one does, then talk to us about building something similar for you."
      />

      <section className="py-20">
        <div className="wrap grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const Icon = ICONS[p.icon as keyof typeof ICONS];
            return (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-white/[0.025] p-7">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/30 to-glow-2/10 text-glow-2">
                    <Icon size={22} />
                  </span>
                  <h2 className="mb-2 font-heading text-xl text-white">{p.name}</h2>
                  <p className="mb-4 font-display text-[13px] font-medium text-glow-2">{p.tagline}</p>
                  <p className="mb-6 text-[14px] leading-relaxed text-muted">{p.summary}</p>
                  <ul className="mb-8 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/80">
                        <Check size={14} className="mt-0.5 shrink-0 text-glow-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant="ghost" className="w-full">
                    Get In Touch <ArrowUpRight size={16} />
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTABand />
    </>
  );
}
