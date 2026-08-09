import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <div
          className={clsx(
            "mb-4 inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-glow-2",
            center && "justify-center"
          )}
        >
          <span className="h-[2px] w-5 rounded-full bg-gradient-to-r from-violet to-glow-2" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] text-white">{title}</h2>
      {desc && <p className="mt-4 text-[15px] leading-relaxed text-muted">{desc}</p>}
    </div>
  );
}
