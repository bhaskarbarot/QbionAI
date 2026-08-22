"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { NAV_LINKS, SITE } from "@/lib/constants";
import Button from "@/components/shared/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (lastPathname !== null) setOpen(false);
  }

  return (
    <header
      className={clsx(
        "sticky top-0 z-[60] transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-space/85 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl" : "border-b border-transparent bg-space/40 backdrop-blur-md"
      )}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/logo-horizontal.svg"
            alt={SITE.name}
            width={1080}
            height={530}
            className="h-8 w-auto object-contain drop-shadow-[0_6px_16px_rgba(74,222,128,0.3)] sm:h-9"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-white/10 text-white" : "text-muted hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" size="md">
            Start a Project <ArrowUpRight size={16} />
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/5 text-white lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-space/95 backdrop-blur-xl lg:hidden">
          <div className="wrap flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-white/90 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-3 w-full">
              Start a Project <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
