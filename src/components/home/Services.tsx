import Link from "next/link";
import { BrainCircuit, Sparkles, Bot, Megaphone, Check, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { SERVICES } from "@/lib/constants";

const ICONS = { BrainCircuit, Sparkles, Bot, Megaphone };

export default function Services() {
  return (
    <section id="services" className="section py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Four Disciplines. One Embedded Team."
            desc="We don't hand off a deck and disappear. Our pods design, build and operate the systems they ship."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link
                  id={s.slug}
                  href={`/services#${s.slug}`}
                  className="group block h-full rounded-3xl border border-white/8 bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-glow/40 hover:bg-white/[0.045]"
                >
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/30 to-glow-2/10 text-glow-2">
                    <Icon size={22} />
                  </span>
                  <h3 className="mb-2 font-display text-xl text-white">{s.title}</h3>
                  <p className="mb-5 text-[14px] leading-relaxed text-muted">{s.summary}</p>
                  <ul className="mb-6 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[13px] text-white/75">
                        <Check size={14} className="mt-0.5 shrink-0 text-glow-2" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 font-display text-sm font-medium text-glow-2">
                    Learn more
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
