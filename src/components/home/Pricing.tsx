import { Check } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { PRICING } from "@/lib/constants";

export default function Pricing() {
  return (
    <section id="pricing" className="section py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading center eyebrow="Pricing" title="Simple engagement models" desc="Every plan starts with a scoped discovery call — no surprise invoices." />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 ${
                  p.featured
                    ? "liquid-glass border-glow/50"
                    : "border border-white/8 bg-white/[0.02]"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet to-glow-2 px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Most chosen
                  </span>
                )}
                <h3 className="font-display text-lg text-white">{p.name}</h3>
                <div className="my-3 font-display text-3xl font-semibold text-white">
                  {p.price}
                  <span className="text-sm font-normal text-muted"> {p.period}</span>
                </div>
                <p className="mb-6 text-[13px] leading-relaxed text-muted">{p.desc}</p>
                <ul className="mb-8 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/80">
                      <Check size={14} className="mt-0.5 shrink-0 text-glow-2" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant={p.featured ? "primary" : "ghost"} className="w-full">
                  Get started
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
