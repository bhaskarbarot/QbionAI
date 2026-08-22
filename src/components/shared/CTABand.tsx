import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import Button from "@/components/shared/Button";
import { SITE } from "@/lib/constants";

export default function CTABand() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal>
          <div className="liquid-glass relative overflow-hidden rounded-[32px] px-8 py-14 md:px-14">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(600px 300px at 10% 0%, rgba(22,163,74,0.16), transparent 60%), radial-gradient(500px 260px at 95% 100%, rgba(163,230,53,0.1), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg text-left">
                <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] text-white">
                  Let&rsquo;s Build Your Next AI Product
                </h2>
                <p className="mt-4 text-[15px] text-muted">
                  Tell us what you&rsquo;re trying to ship. We reply within 2 working days.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-4">
                <Button href="/contact" size="lg">
                  Start a Project <ArrowUpRight size={17} />
                </Button>
                <Button href={`mailto:${SITE.email}`} variant="ghost" size="lg">
                  {SITE.email}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
