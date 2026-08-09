import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-medium transition-all duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-gradient-to-r from-violet to-violet-2 text-white shadow-[0_10px_26px_rgba(4,14,9,0.55)] hover:shadow-[0_14px_34px_rgba(6,30,17,0.55)] hover:-translate-y-0.5",
  ghost:
    "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:border-glow/60 hover:bg-white/10 hover:-translate-y-0.5",
  light:
    "bg-white text-space hover:bg-glow-2 hover:text-space hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const cls = clsx(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
