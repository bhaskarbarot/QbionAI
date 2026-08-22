import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Button from "@/components/shared/Button";
import CubeField from "@/components/shared/CubeField";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pb-32 md:pt-28">
      <CubeField className="hidden md:block" />

      <div
        className="pointer-events-none absolute left-1/2 top-16 -z-[1] h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-70 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.22), rgba(163,230,53,0.08) 55%, transparent 75%)" }}
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/services"
            className="liquid-glass mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium text-white/85"
          >
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-violet to-glow-2 px-2.5 py-1 text-[11px] font-semibold text-white">
              <Sparkles size={11} /> New
            </span>
            AI agents now shipping for enterprise support teams
          </Link>

          <p className="font-heading mb-3 text-[clamp(1.05rem,2vw,1.35rem)] italic text-glow-2">
            {SITE.tagline}
          </p>

          <h1 className="text-[clamp(2.3rem,6vw,4.4rem)] leading-[1.05] text-white">
            Ship AI products,
            <br />
            not <span className="text-gradient">experiments.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-muted">
            Qubion.Ai builds AI agents, design systems and automation pipelines for
            growing brands, from first prototype to production, in weeks, not quarters.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" size="lg">
              Start a Project <ArrowUpRight size={17} />
            </Button>
            <Button href="/work" variant="ghost" size="lg">
              See Our Work
            </Button>
          </div>

          <div className="mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 font-display text-xs uppercase tracking-[0.08em] text-muted-2">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-glow shadow-[0_0_0_4px_rgba(74,222,128,0.22)]" />
              Available for new projects
            </span>
            <span>60+ products shipped</span>
            <span>38 clients worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
