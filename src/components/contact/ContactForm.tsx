"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/shared/Button";

const SERVICES = ["AI Solutions", "AI-Powered Design", "Automation", "Performance Advertising", "Not sure yet"];
const BUDGETS = ["Under ₹1,50,000", "₹1,50,000 – ₹4,50,000", "₹4,50,000 – ₹10,00,000", "₹10,00,000+"];

type Status = "idle" | "loading" | "success" | "error";

const fieldCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-[14px] text-white placeholder:text-muted-2 outline-none transition focus:border-glow/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(74,222,128,0.16)]";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!agree) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
      setAgree(false);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="liquid-glass flex flex-col items-center rounded-3xl px-8 py-14 text-center">
        <CheckCircle2 size={40} className="mb-4 text-emerald-400" />
        <h3 className="mb-2 font-display text-xl text-white">Message sent</h3>
        <p className="max-w-sm text-[14px] text-muted">
          Thanks for reaching out — we&rsquo;ll reply within one business day.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-glass rounded-3xl p-6 sm:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Full name *
          </label>
          <input id="name" name="name" required placeholder="Priya Sharma" autoComplete="name" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Work email *
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Company
          </label>
          <input id="company" name="company" placeholder="Company name" autoComplete="organization" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+91 90000 00000" autoComplete="tel" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Service you need
          </label>
          <select id="service" name="service" defaultValue="" className={fieldCls}>
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-space-2">{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Estimated budget
          </label>
          <select id="budget" name="budget" defaultValue="" className={fieldCls}>
            <option value="" disabled>Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-space-2">{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
          Project details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          placeholder="What are you trying to build, and what would a good outcome look like?"
          className={`${fieldCls} min-h-[130px] resize-y`}
        />
      </div>

      <label className="mt-5 flex items-start gap-3 text-[13px] text-muted">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-violet"
        />
        I agree to be contacted about my inquiry and accept the{" "}
        <a href="/privacy" className="text-glow-2 hover:underline">Privacy Policy</a>.
      </label>
      {touched && !agree && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle size={12} /> Please accept the privacy policy to continue.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-rose-400">
          <AlertCircle size={14} /> {errorMsg}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 size={17} className="animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
      <p className="mt-4 font-display text-xs text-muted-2">We reply within one business day, guaranteed.</p>
    </form>
  );
}
