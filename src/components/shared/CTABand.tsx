import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import Button from "@/components/shared/Button";
import { SITE } from "@/lib/constants";

export default function CTABand() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal>
          <div className="liquid-glass relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(600px 300px at 20% 0%, rgba(22,163,74,0.16), transparent 60%), radial-gradient(500px 260px at 85% 100%, rgba(163,230,53,0.1), transparent 60%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-xl text-[clamp(1.8rem,3.6vw,2.6rem)] text-white">
                Let&rsquo;s build your next AI product
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] text-muted">
                Tell us what you&rsquo;re trying to ship. We&rsquo;ll reply within one business day.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" size="lg">
                  Start a project <ArrowUpRight size={17} />
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
