const LOGOS = ["Acme Corp", "Outside", "PULSE", "APEX", "Quanta", "Northwind", "Vertex", "Lumen"];

export default function LogoMarquee() {
  const track = [...LOGOS, ...LOGOS];
  return (
    <section className="border-y border-white/8 bg-white/[0.02] py-8">
      <p className="mb-6 text-center font-display text-xs uppercase tracking-[0.22em] text-muted-2">
        Trusted by innovative teams
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-16 [&:hover]:[animation-play-state:paused]">
          {track.map((logo, i) => (
            <span
              key={i}
              className="font-display text-xl font-semibold tracking-tight text-white/35 transition hover:text-white/70"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
