import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { CASE_STUDIES } from "@/lib/constants";

export default function CaseStudies() {
  return (
    <section className="section py-24">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected work" title="Outcomes, not just deliverables" />
            <Button href="/work" variant="ghost">
              View all work <ArrowUpRight size={16} />
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link
                href="/work"
                className="group block h-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-glow/40"
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-white/8 bg-gradient-to-br from-violet/25 via-slate to-glow-2/10">
                  <span className="font-display text-4xl font-semibold text-white/15 transition group-hover:text-white/25">
                    {c.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="mb-2 font-display text-xs uppercase tracking-[0.14em] text-glow-2">{c.tag} · {c.client}</p>
                  <h3 className="mb-5 font-display text-lg text-white">{c.title}</h3>
                  <div className="flex gap-8 border-t border-white/8 pt-4">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <b className="block font-display text-xl text-white">{m.value}</b>
                        <span className="text-xs uppercase tracking-wide text-muted-2">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
