"use client";

import { useState } from "react";
import clsx from "clsx";
import { CASE_STUDIES } from "@/lib/constants";

const FILTERS = ["All", "AI Solutions", "Design", "Automation", "Advertising"];

export default function WorkGrid() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.tag === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={clsx(
              "rounded-full border px-5 py-2 font-display text-sm font-medium transition-all",
              active === f
                ? "border-transparent bg-gradient-to-r from-violet to-glow-2 text-white"
                : "border-white/12 text-muted hover:border-glow/40 hover:text-white"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((c) => (
          <div
            key={c.title}
            className="group overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-glow/40"
          >
            <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/8 bg-gradient-to-br from-violet/25 via-slate to-glow-2/10">
              <span className="font-display text-5xl font-semibold text-white/15 transition group-hover:text-white/25">
                {c.tag}
              </span>
            </div>
            <div className="p-7">
              <p className="mb-2 font-display text-xs uppercase tracking-[0.14em] text-glow-2">
                {c.tag} · {c.client}
              </p>
              <h3 className="mb-5 font-display text-lg text-white">{c.title}</h3>
              <div className="flex gap-8 border-t border-white/8 pt-4">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <b className="block font-display text-xl text-white">{m.value}</b>
                    <span className="text-xs uppercase tracking-wide text-muted-2">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
