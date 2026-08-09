import { Star } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="section border-y border-white/8 bg-white/[0.015] py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading center eyebrow="Client voices" title="What it's like to work with us" />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-white/[0.025] p-7">
                <div className="mb-4 flex gap-0.5 text-glow-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="flex-1 text-[15px] leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 border-t border-white/8 pt-4">
                  <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
