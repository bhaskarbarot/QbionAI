import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/8 pb-16 pt-16 md:pt-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(560px 320px at 85% -10%, rgba(22,163,74,0.14), transparent 60%)",
        }}
      />
      <div className="wrap relative">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-glow-2">
            <span className="h-[2px] w-5 rounded-full bg-gradient-to-r from-violet to-glow-2" />
            {eyebrow}
          </div>
          <h1 className="text-[clamp(2rem,4.6vw,3.2rem)] text-white">{title}</h1>
          {desc && <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted">{desc}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
