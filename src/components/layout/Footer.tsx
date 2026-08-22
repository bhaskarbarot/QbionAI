import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { LinkedInIcon, XIcon, InstagramIcon, GitHubIcon } from "@/components/shared/BrandIcons";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/constants";
import Logo from "@/components/shared/Logo";

const SOCIAL_ICONS = { LinkedIn: LinkedInIcon, X: XIcon, Instagram: InstagramIcon, GitHub: GitHubIcon };

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-space-2 pt-15 text-muted">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 380px at 12% 0%, rgba(22,163,74,0.12), transparent 60%), radial-gradient(600px 340px at 90% 100%, rgba(163,230,53,0.08), transparent 60%)",
        }}
      />
      <div className="wrap relative z-10 grid gap-12 pb-0 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center">
            <Logo size="lg" />
          </Link>
          <p className="mt-5 max-w-[36ch] text-sm leading-relaxed">{SITE.description}</p>
          <div className="mt-6 flex gap-2">
            {SITE.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 text-white transition hover:border-transparent hover:bg-gradient-to-br hover:from-violet hover:to-glow-2"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.filter((l) => l.label !== "Home").map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms Of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold text-white">Get In Touch</h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-glow-2" />
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-glow-2" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-glow-2" />
              <span>{SITE.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden pt-2">
        <span
          aria-hidden="true"
          className="pointer-events-none block select-none text-center font-display text-[15vw] font-extrabold leading-[0.85] tracking-tighter text-white/[0.5] sm:text-[15vw]"
        >
          qubion.ai
        </span>
      </div>

      <div className="wrap relative z-10 flex flex-col items-center gap-1.5 pb-8 pt-4 text-center text-xs text-muted-2">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <span>Built with AI accelerated design & engineering.</span>
      </div>
    </footer>
  );
}
