import type { Metadata } from "next";
import Image from "next/image";
import { Target, Users, Rocket, ShieldCheck, Box, Layers, Shapes, ArrowUpRight, MapPin } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import Stats from "@/components/home/Stats";
import CTABand from "@/components/shared/CTABand";
import { TEAM, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About | Qubion.Ai",
  description: "Qubion.Ai is an AI solutions, design and automation studio based in Ahmedabad.",
};

const VALUES = [
  { icon: Target, title: "Outcomes Over Output", text: "We measure ourselves on the metric you care about, not hours logged." },
  { icon: Rocket, title: "Ship In Weeks", text: "Every engagement produces something usable in the first two weeks, not the last." },
  { icon: ShieldCheck, title: "No Black Boxes", text: "You can see, monitor and audit everything we build for you, always." },
  { icon: Users, title: "Embedded, Not Outsourced", text: "We work inside your tools and rituals like an extension of your team." },
];

const MARK = [
  {
    icon: Box,
    title: "The Core",
    text: "The cube at the center is an idea, a problem, an ambition or an opportunity. Every engagement starts here.",
  },
  {
    icon: Layers,
    title: "Intelligence Adds Dimension",
    text: "The structure surrounding it is AI, data, creativity and strategy, wrapped around that core idea to give it depth.",
  },
  {
    icon: Shapes,
    title: "Ideas Take Shape",
    text: "The Q Form is Qubion giving structure to possibility, turning a rough concept into something buildable.",
  },
  {
    icon: ArrowUpRight,
    title: "Moving Towards Impact",
    text: "The open extension is deliberate. It's what happens when a finished idea leaves the studio and reaches real users.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We Give Structure To What's Next"
        desc="Qubion.Ai is an AI solutions, design and automation studio. We help ambitious companies turn ideas into shipped products, using AI as the accelerant, not the gimmick."
      >
        <p className="mt-8 flex items-center gap-2 font-display text-xs uppercase tracking-[0.14em] text-muted">
          <MapPin size={14} className="text-glow-2" /> Based In {SITE.location}
        </p>
      </PageHero>

      <section className="section py-24">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="liquid-glass flex aspect-square items-center justify-center overflow-hidden rounded-3xl p-14">
              <Image
                src="/brand/emblem-dark.svg"
                alt="The Qubion mark"
                width={1080}
                height={1080}
                className="h-full w-full rounded-2xl object-contain"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Our Mark" title="A Cube Given Structure" desc="Our name and mark aren't decoration. Every part of it describes how we actually work." />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {MARK.map((m) => (
                <div key={m.title}>
                  <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet/25 to-glow-2/15 text-glow-2">
                    <m.icon size={17} />
                  </span>
                  <h3 className="mb-1.5 font-display text-[15px] text-white">{m.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted">{m.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/8 py-20">
        <div className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet/25 to-glow-2/15 text-glow-2">
                  <v.icon size={18} />
                </span>
                <h3 className="mb-1.5 font-display text-[15px] text-white">{v.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />

      <section className="section border-t border-white/8 py-24">
        <div className="wrap">
          <Reveal>
            <SectionHeading center eyebrow="The Team" title="Small Team, Senior People" desc="Every project is led by senior AI, design and engineering talent. No layers of account management between you and the people doing the work." />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="text-center">
                <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-violet to-violet-2 font-display text-2xl font-semibold text-white shadow-[0_16px_36px_rgba(4,14,9,0.5)]">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="font-display text-[15px] text-white">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
