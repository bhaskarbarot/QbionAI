import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { PROCESS } from "@/lib/constants";

export default function Process() {
  return (
    <section className="section border-y border-white/8 bg-white/[0.015] py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading center eyebrow="How We Work" title="A Process Built For Speed Without The Chaos" />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="relative border-t-2 border-white/12 pt-6">
                <span className="absolute -top-[13px] left-0 bg-space px-0 pr-3 font-display text-sm font-semibold text-glow-2">
                  {p.step}
                </span>
                <h3 className="mb-2 font-display text-lg text-white">{p.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
