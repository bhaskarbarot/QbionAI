import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import WorkGrid from "@/components/work/WorkGrid";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTABand from "@/components/shared/CTABand";

export const metadata: Metadata = {
  title: "Work — Qubion.Ai",
  description: "Case studies from AI agents, automation and performance advertising engagements.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Real systems, shipped and running"
        desc="A sample of the AI agents, automations, design systems and campaigns we've shipped for clients across fintech, retail, real estate and healthtech."
      />

      <section className="py-20">
        <div className="wrap">
          <Reveal>
            <WorkGrid />
          </Reveal>
        </div>
      </section>

      <Stats />
      <Testimonials />
      <CTABand />
    </>
  );
}
