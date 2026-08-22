"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { FAQS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section border-y border-white/8 bg-white/[0.015] py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading center eyebrow="FAQ" title="Questions, Answered" />
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl border-t border-white/8">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="border-b border-white/8">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[15px] font-medium text-white">{item.q}</span>
                  <Plus
                    size={18}
                    className={clsx("shrink-0 text-glow-2 transition-transform duration-300", open && "rotate-45")}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: open ? "200px" : "0px" }}
                >
                  <p className="pb-5 pr-8 text-[14px] leading-relaxed text-muted">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
