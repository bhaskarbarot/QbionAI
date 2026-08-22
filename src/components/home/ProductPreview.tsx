import { Search, Settings2, ArrowUpRight, ArrowDownRight, LayoutDashboard, LineChart, Bot, Target, FileCheck2, BellRing } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: LineChart, label: "Analytics" },
  { icon: Bot, label: "AI Agents" },
  { icon: Target, label: "Campaigns" },
  { icon: FileCheck2, label: "Automations" },
  { icon: BellRing, label: "Alerts" },
];

const FEATURES = [
  { icon: LayoutDashboard, title: "Unified dashboard", text: "Every agent, automation and campaign in one live view." },
  { icon: LineChart, title: "Real-time analytics", text: "Track resolution rate, hours saved and ROAS as it happens." },
  { icon: Bot, title: "AI agent monitoring", text: "See exactly what your agents are doing and where they escalate." },
  { icon: BellRing, title: "Automated alerts", text: "Get notified the moment a metric drifts outside target." },
];

export default function ProductPreview() {
  return (
    <section id="product" className="section relative scroll-mt-24 py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Everything You Need"
            title="One Live View Of Every AI System We Build For You"
            desc="No black boxes. Every agent, automation and campaign reports into a dashboard your team can actually read."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="liquid-glass mx-auto max-w-5xl overflow-hidden rounded-3xl">
            <div className="flex">
              <aside className="hidden w-48 shrink-0 border-r border-white/8 p-4 md:block">
                <div className="flex items-center gap-2 px-2 pb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6a6a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffc24d]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4de3a4]" />
                </div>
                <nav className="space-y-1">
                  {SIDEBAR.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] ${
                        item.active ? "bg-white/10 text-white" : "text-muted"
                      }`}
                    >
                      <item.icon size={14} />
                      {item.label}
                    </div>
                  ))}
                </nav>
              </aside>

              <div className="flex-1 p-5 md:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-medium text-white">Site Overview</p>
                    <p className="text-xs text-muted-2">qubionai.in · Jun 24 → Today</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted">
                      <Search size={13} /> Search
                    </div>
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-glow-2 text-white">
                      <Settings2 size={14} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs text-muted">Agent resolution rate</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-semibold text-white">64.2%</span>
                      <span className="flex items-center text-xs font-medium text-emerald-400">
                        <ArrowUpRight size={13} /> 5.6%
                      </span>
                    </div>
                    <svg viewBox="0 0 200 48" className="mt-3 h-12 w-full">
                      <polyline
                        fill="none"
                        stroke="url(#g1)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="0,38 25,30 50,34 75,20 100,26 125,14 150,18 175,8 200,12"
                      />
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#16a34a" />
                          <stop offset="100%" stopColor="#a3e635" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs text-muted">Hours saved / month</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-semibold text-white">312h</span>
                      <span className="flex items-center text-xs font-medium text-rose-400">
                        <ArrowDownRight size={13} /> 2.1%
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-muted">
                      <li className="flex justify-between"><span>Support automation</span><span className="text-white/70">128h</span></li>
                      <li className="flex justify-between"><span>Ops workflows</span><span className="text-white/70">96h</span></li>
                      <li className="flex justify-between"><span>Reporting</span><span className="text-white/70">88h</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs text-muted">Campaign ROAS</p>
                    <span className="font-display text-lg font-semibold text-white">3.4x</span>
                  </div>
                  <svg viewBox="0 0 600 90" className="h-20 w-full" preserveAspectRatio="none">
                    <polyline
                      fill="url(#g3)"
                      stroke="none"
                      points="0,90 0,60 60,66 120,40 180,50 240,30 300,44 360,20 420,34 480,16 540,26 600,10 600,90"
                    />
                    <polyline
                      fill="none"
                      stroke="url(#g2)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,60 60,66 120,40 180,50 240,30 300,44 360,20 420,34 480,16 540,26 600,10"
                    />
                    <defs>
                      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#a3e635" />
                      </linearGradient>
                      <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16a34a" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet/25 to-glow-2/15 text-glow-2">
                  <f.icon size={18} />
                </span>
                <h3 className="mb-1.5 font-display text-[15px] text-white">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
