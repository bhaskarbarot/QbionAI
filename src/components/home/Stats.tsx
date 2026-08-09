import Reveal from "@/components/shared/Reveal";
import { STATS } from "@/lib/constants";

export default function Stats() {
  return (
    <section className="py-20">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="liquid-glass rounded-2xl px-6 py-8 text-center">
                <b className="text-gradient font-heading text-[clamp(1.8rem,3.4vw,2.6rem)]">{s.value}</b>
                <p className="mt-2 font-display text-xs uppercase tracking-[0.12em] text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
