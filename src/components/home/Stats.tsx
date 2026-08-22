import { PackageCheck, Globe2, TrendingUp, HeartHandshake } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { STATS } from "@/lib/constants";

const ICONS = { PackageCheck, Globe2, TrendingUp, HeartHandshake };

export default function Stats() {
  return (
    <section className="py-16">
      <div className="wrap">
        <div className="grid grid-cols-2 divide-y divide-white/8 rounded-3xl border border-white/8 bg-white/[0.015] md:grid-cols-4 md:divide-y-0 md:divide-x">
          {STATS.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="flex flex-col items-center gap-2 px-6 py-9 text-center">
                  <Icon size={18} className="mb-1 text-glow-2" strokeWidth={1.6} />
                  <b className="font-heading text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-white">{s.value}</b>
                  <p className="font-display text-[11px] uppercase tracking-[0.1em] text-muted">{s.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
