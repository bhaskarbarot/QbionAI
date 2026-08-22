"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState<string | null>(null);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  // Next.js's own route-transition scroll restoration sometimes drifts the
  // page down over the ~500ms after a plain (non-hash) navigation, landing
  // on the wrong section. Pin the scroll to the top for that window so it
  // never happens — but only when there's no #hash in the URL, so the
  // working scroll-to-section behavior for Home/Services/Work is untouched.
  useEffect(() => {
    if (window.location.hash) return;
    const start = performance.now();
    let raf: number;
    function pinTop() {
      if (window.scrollY !== 0) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (performance.now() - start < 700) raf = requestAnimationFrame(pinTop);
    }
    raf = requestAnimationFrame(pinTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (lastPathname !== null) setOpen(false);
  }

  function isLinkActive(href: string, label: string) {
    const [linkPath, linkHash] = href.split("#");
    const path = linkPath || "/";
    if (path !== "/") return pathname.startsWith(path);
    if (pathname !== "/") return false;
    if (!linkHash) return true;
    if (label === "Home") return hash === "" || hash === "#home";
    return hash === `#${linkHash}`;
  }

  return (
    <header
      className={clsx(
        "sticky top-0 z-[60] transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-space/85 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl" : "border-b border-transparent bg-space/40 backdrop-blur-md"
      )}
    >
      <div className="wrap flex h-[92px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <Logo size="lg" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href, link.label);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setHash(link.href.includes("#") ? `#${link.href.split("#")[1]}` : "")}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-white/10 text-white" : "text-muted hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/services"
            className="ml-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-violet to-glow-2 px-2.5 py-1 text-[11px] font-semibold text-white"
          >
            <Sparkles size={11} /> New
          </Link>
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
                onClick={() => {
                  setOpen(false);
                  setHash(link.href.includes("#") ? `#${link.href.split("#")[1]}` : "");
                }}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-white/90 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="mt-2 flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-violet to-glow-2 px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Sparkles size={12} /> New
            </Link>
            <Button href="/contact" className="mt-3 w-full">
              Start a Project <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
